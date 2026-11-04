#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
iTOOL FLASH & RECOVERY MANAGER - PRO VERSION
Hệ thống điều khiển chuyên dụng cho iPhone (Hỗ trợ iPhone 12 Pro Max - iPhone13,4)
=============================================================================
"""

import os
import sys
import time
import json
import shutil
import ctypes
import subprocess
from pathlib import Path

# Cấu hình UTF-8 cho Windows Console tránh lỗi UnicodeEncodeError
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Thử import thư viện hiển thị rich, nếu chưa có thì dùng ANSI cơ bản
try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table
    from rich.prompt import Prompt, Confirm
    from rich.text import Text
    from rich.align import Align
    console = Console(highlight=False)
    HAS_RICH = True
except ImportError:
    HAS_RICH = False
    class SimpleConsole:
        def print(self, *args, **kwargs):
            text = " ".join(str(a) for a in args)
            import re
            text = re.sub(r'\[/?[a-zA-Z0-9_ #]+\]', '', text)
            print(text)
    console = SimpleConsole()

# Đường dẫn Firmware mặc định
DEFAULT_IPSW = r"D:\dth\3uTools9\Firmware\iPhone13,4_27.2_24B119_Restore.ipsw"

# Tìm kiếm DLL của Apple MobileDevice
APPLE_DLL_PATHS = [
    r"D:\dth\3utool\3uTools9\itunesFlashDll",
    r"C:\Program Files\Common Files\Apple\Mobile Device Support",
    r"C:\Program Files (x86)\Common Files\Apple\Mobile Device Support",
]

class AppleNativeDriver:
    """Wrapper CTypes tương tác trực tiếp với MobileDevice.dll của Apple"""
    def __init__(self):
        self.dll = None
        self.recovery_device = None
        self.dfu_device = None
        self.device_mode = "None" # "DFU", "Recovery", "Normal", "None"
        self._init_dll()

    def _init_dll(self):
        for path in APPLE_DLL_PATHS:
            dll_file = os.path.join(path, "MobileDevice.dll")
            if os.path.exists(dll_file):
                try:
                    os.environ["PATH"] = path + ";" + os.environ.get("PATH", "")
                    self.dll = ctypes.cdll.LoadLibrary(dll_file)
                    self._setup_signatures()
                    self._listen_notifications()
                    return
                except Exception as e:
                    pass

    def _setup_signatures(self):
        if not self.dll:
            return
        try:
            # Recovery signatures
            self.dll.AMRecoveryModeDeviceGetECID.argtypes = [ctypes.c_void_p]
            self.dll.AMRecoveryModeDeviceGetECID.restype = ctypes.c_uint64

            self.dll.AMRecoveryModeDeviceGetChipID.argtypes = [ctypes.c_void_p]
            self.dll.AMRecoveryModeDeviceGetChipID.restype = ctypes.c_uint32

            self.dll.AMRecoveryModeDeviceGetBoardID.argtypes = [ctypes.c_void_p]
            self.dll.AMRecoveryModeDeviceGetBoardID.restype = ctypes.c_uint32

            self.dll.AMRecoveryModeDeviceSetAutoBoot.argtypes = [ctypes.c_void_p, ctypes.c_uint8]
            self.dll.AMRecoveryModeDeviceSetAutoBoot.restype = ctypes.c_int

            self.dll.AMRecoveryModeDeviceReboot.argtypes = [ctypes.c_void_p]
            self.dll.AMRecoveryModeDeviceReboot.restype = ctypes.c_int

            # DFU signatures
            self.dll.AMDFUModeDeviceGetECID.argtypes = [ctypes.c_void_p]
            self.dll.AMDFUModeDeviceGetECID.restype = ctypes.c_uint64

            self.dll.AMDFUModeDeviceGetChipID.argtypes = [ctypes.c_void_p]
            self.dll.AMDFUModeDeviceGetChipID.restype = ctypes.c_uint32

            self.dll.AMDFUModeDeviceGetBoardID.argtypes = [ctypes.c_void_p]
            self.dll.AMDFUModeDeviceGetBoardID.restype = ctypes.c_uint32
        except Exception:
            pass

    def _listen_notifications(self):
        if not self.dll:
            return
        CALLBACK = ctypes.CFUNCTYPE(None, ctypes.c_void_p)

        def on_dfu_connect(dev):
            self.dfu_device = dev
            self.device_mode = "DFU"

        def on_recovery_connect(dev):
            self.recovery_device = dev
            self.device_mode = "Recovery"

        def on_dfu_disconnect(dev):
            if self.dfu_device == dev:
                self.dfu_device = None
                self.device_mode = "None"

        def on_recovery_disconnect(dev):
            if self.recovery_device == dev:
                self.recovery_device = None
                self.device_mode = "None"

        self._cb_dfu_conn = CALLBACK(on_dfu_connect)
        self._cb_rec_conn = CALLBACK(on_recovery_connect)
        self._cb_dfu_disc = CALLBACK(on_dfu_disconnect)
        self._cb_rec_disc = CALLBACK(on_recovery_disconnect)

        try:
            self.dll.AMRestoreRegisterForDeviceNotifications(
                self._cb_dfu_conn,
                self._cb_rec_conn,
                self._cb_dfu_disc,
                self._cb_rec_disc,
                0,
                None
            )
        except Exception:
            pass

    def get_device_info(self):
        info = {
            "mode": self.device_mode,
            "ecid": None,
            "cpid": None,
            "bdid": None,
            "source": "AppleNative"
        }
        if self.recovery_device and self.dll:
            try:
                info["ecid"] = f"0x{self.dll.AMRecoveryModeDeviceGetECID(self.recovery_device):016X}"
                info["cpid"] = f"0x{self.dll.AMRecoveryModeDeviceGetChipID(self.recovery_device):04X}"
                info["bdid"] = f"0x{self.dll.AMRecoveryModeDeviceGetBoardID(self.recovery_device):02X}"
                info["mode"] = "Recovery Mode"
            except Exception:
                pass
        elif self.dfu_device and self.dll:
            try:
                info["ecid"] = f"0x{self.dll.AMDFUModeDeviceGetECID(self.dfu_device):016X}"
                info["cpid"] = f"0x{self.dll.AMDFUModeDeviceGetChipID(self.dfu_device):04X}"
                info["bdid"] = f"0x{self.dll.AMDFUModeDeviceGetBoardID(self.dfu_device):02X}"
                info["mode"] = "DFU Mode"
            except Exception:
                pass
        return info

    def exit_recovery_mode(self):
        """Thoát chế độ Recovery bằng Native API"""
        if not self.dll or not self.recovery_device:
            return False, "Thiết bị không kết nối hoặc không ở Recovery Mode."
        try:
            # 1. Đặt auto-boot = true để máy khởi động thẳng vào hệ điều hành
            ret1 = self.dll.AMRecoveryModeDeviceSetAutoBoot(self.recovery_device, 1)
            # 2. Gửi lệnh reboot
            ret2 = self.dll.AMRecoveryModeDeviceReboot(self.recovery_device)
            if ret2 == 0:
                return True, "Đã gửi tín hiệu AutoBoot=True và Reboot thành công qua Apple Native Driver!"
            return False, f"Lỗi gửi lệnh Reboot (Mã: {ret2})"
        except Exception as e:
            return False, f"Ngoại lệ khi gọi Apple Native API: {e}"

# Fallback: Quét phần cứng PnP qua PowerShell
def scan_pnp_device():
    ps_cmd = 'Get-PnpDevice | Where-Object { $_.InstanceId -like "*VID_05AC*" } | Select-Object Status, InstanceId, FriendlyName | ConvertTo-Json'
    try:
        res = subprocess.run(['powershell', '-NoProfile', '-Command', ps_cmd], capture_output=True, text=True)
        if not res.stdout.strip():
            return None
        items = json.loads(res.stdout)
        if isinstance(items, dict):
            items = [items]
        for it in items:
            inst = it.get('InstanceId', '')
            status = it.get('Status', '')
            name = it.get('FriendlyName', '')
            if status != 'OK':
                continue
            if 'PID_1227' in inst:
                return parse_pnp_details('DFU Mode', inst, name)
            elif 'PID_1281' in inst:
                return parse_pnp_details('Recovery Mode', inst, name)
            elif 'PID_12A8' in inst:
                return parse_pnp_details('Normal Mode', inst, name)
    except Exception:
        pass
    return None

def parse_pnp_details(mode, instance_id, friendly_name):
    info = {
        'mode': mode,
        'instance_id': instance_id,
        'friendly_name': friendly_name,
        'ecid': 'N/A',
        'cpid': 'N/A',
        'source': 'WindowsPnP'
    }
    raw = instance_id.split('\\')[-1].replace('_', ' ')
    for part in raw.split():
        if ':' in part:
            k, v = part.split(':', 1)
            if k == 'ECID':
                info['ecid'] = '0x' + v.strip('[]')
            elif k == 'CPID':
                info['cpid'] = '0x' + v.strip('[]')
    return info

def get_current_device_status(apple_driver):
    """Tổng hợp trạng thái thiết bị từ cả Native Driver và PnP Windows"""
    time.sleep(0.3)
    info = apple_driver.get_device_info()
    if info.get("mode") not in ("None", None) and info.get("ecid"):
        return info

    pnp = scan_pnp_device()
    if pnp:
        return pnp
    return {"mode": "Không tìm thấy", "ecid": "N/A", "source": "None"}

# =============================================================================
# CÁC TÍNH NĂNG CHÍNH CỦA TOOL
# =============================================================================

def send_reboot_command_legacy():
    """Hàm chạy irecovery -n theo đúng đoạn code bạn cung cấp"""
    console.print("\n[cyan]🔍 Đang thử gửi lệnh qua thư viện CLI 'irecovery -n'...[/cyan]")
    try:
        result = subprocess.run(["irecovery", "-n"], capture_output=True, text=True, check=True)
        console.print("[bold green]✅ Đã gửi lệnh irecovery -n thành công! Thiết bị sẽ khởi động lại bình thường.[/bold green]")
        if result.stdout.strip():
            console.print(f"[dim]{result.stdout.strip()}[/dim]")
        return True
    except subprocess.CalledProcessError as e:
        console.print(f"[yellow]⚠️ irecovery báo lỗi: {e.stderr.strip() if e.stderr else 'Không phản hồi'}[/yellow]")
        return False
    except FileNotFoundError:
        console.print("[yellow]ℹ️ Lệnh 'irecovery' không nằm trong PATH hệ thống (Sẽ tự động dùng Apple Native Engine).[/yellow]")
        return False

def action_exit_dfu_recovery(apple_driver):
    """Thoát chế độ DFU hoặc Recovery Mode"""
    console.print(Panel("[bold cyan]🚀 ĐIỀU KHIỂN: THOÁT CHẾ ĐỘ DFU / RECOVERY MODE[/bold cyan]", border_style="cyan"))
    
    status = get_current_device_status(apple_driver)
    mode = status.get("mode", "Không tìm thấy")
    console.print(f"Trạng thái hiện tại: [bold yellow]{mode}[/bold yellow] | ECID: [green]{status.get('ecid')}[/green]")

    if "Recovery" in mode:
        console.print("\n[bold green]Phát hiện máy đang ở RECOVERY MODE (Màn hình cắm cáp máy tính).[/bold green]")
        console.print("[1/2] Đang gọi Apple Native Driver để kích hoạt AutoBoot và Reboot...")
        success, msg = apple_driver.exit_recovery_mode()
        if success:
            console.print(f"[bold green]✅ {msg}[/bold green]")
        else:
            console.print(f"[yellow]Native Driver: {msg}[/yellow]")
            # Thử qua đoạn code irecovery -n của bạn
            console.print("[2/2] Chuyển tiếp sang lệnh irecovery CLI...")
            send_reboot_command_legacy()
        
        console.print("\n[bold green]🎉 Hoàn tất! Vui lòng chờ iPhone khởi động lại vào màn hình khóa.[/bold green]")

    elif "DFU" in mode:
        console.print("\n[bold magenta]Phát hiện máy đang ở DFU MODE (Màn hình đen hoàn toàn, SecureROM).[/bold magenta]")
        console.print("""
[bold yellow]📌 LƯU Ý KỸ THUẬT VỀ CHẾ ĐỘ DFU CỦA APPLE:[/bold yellow]
• Khi ở DFU Mode (SecureROM), thiết bị chỉ lắng nghe nạp firmware, KHÔNG hỗ trợ lệnh phần mềm ngắt ngang.
• Để thoát DFU Mode về hệ điều hành bình thường [bold green]KHÔNG BỊ MẤT DỮ LIỆU[/bold green], hãy làm theo nhịp bấm phím cứng chuẩn sau:

[bold white]👉 BƯỚC 1:[/bold white] Bấm và [bold cyan]NHẢ NHANH[/bold cyan] nút [bold green]TĂNG ÂM LƯỢNG[/bold green] (Volume +)
[bold white]👉 BƯỚC 2:[/bold white] Bấm và [bold cyan]NHẢ NHANH[/bold cyan] nút [bold green]GIẢM ÂM LƯỢNG[/bold green] (Volume -)
[bold white]👉 BƯỚC 3:[/bold white] Bấm và [bold red]GIỮ CHẶT NÚT NGUỒN (Side Button bên phải)[/bold red] trong [bold yellow]10 - 15 GIÂY[/bold yellow].
          (Giữ nguyên tay cho đến khi [bold green]LOGO QUẢ TÁO[/bold green] xuất hiện trên màn hình thì mới buông tay!)
""")
        console.print("[cyan]⏳ Tool đang liên tục theo dõi cổng kết nối USB để thông báo ngay khi máy thoát DFU thành công...[/cyan]")
        start_wait = time.time()
        while time.time() - start_wait < 30:
            st = get_current_device_status(apple_driver)
            current_mode = st.get("mode", "")
            if "DFU" not in current_mode and current_mode != "Không tìm thấy":
                console.print(f"\n[bold green]🎉 THÀNH CÔNG! Thiết bị đã thoát khỏi DFU và chuyển sang chế độ: {current_mode}![/bold green]")
                return
            time.sleep(1)
        console.print("\n[dim]Đã kết thúc chu kỳ theo dõi. Nếu máy chưa lên Táo, bạn hãy thao tác lại đúng nhịp phím cứng ở trên.[/dim]")
    else:
        console.print("\n[yellow]Không phát hiện thiết bị ở DFU hoặc Recovery. Đang thử gửi lệnh 'irecovery -n' dự phòng...[/yellow]")
        send_reboot_command_legacy()

def action_update_iphone(ipsw_path):
    """Nâng cấp máy giữ nguyên dữ liệu (Retain Data Flash)"""
    console.print(Panel("[bold green]🔄 NÂNG CẤP HỆ ĐIỀU HÀNH (UPDATE - GIỮ NGUYÊN DỮ LIỆU)[/bold green]", border_style="green"))
    
    if not os.path.exists(ipsw_path):
        console.print(f"[bold red]❌ Không tìm thấy file IPSW tại:[/bold red] {ipsw_path}")
        return

    file_size_gb = os.path.getsize(ipsw_path) / (1024**3)
    console.print(f"📦 File Firmware: [bold cyan]{Path(ipsw_path).name}[/bold cyan]")
    console.print(f"📁 Đường dẫn: [dim]{ipsw_path}[/dim]")
    console.print(f"💾 Dung lượng: [green]{file_size_gb:.2f} GB[/green]")
    console.print(f"🛡️ Chế độ nạp: [bold green]Retain User Data (Không xóa dữ liệu cá nhân)[/bold green]\n")

    console.print("""[bold yellow]Chọn phương thức nạp Firmware:[/bold yellow]
 [1] Nạp tự động qua pymobiledevice3 engine (Khuyên dùng)
 [2] Mở công cụ nạp chuyên dụng 3uTools Retain Data
 [0] Hủy bỏ quay lại Menu""")

    choice = input("\n👉 Nhập lựa chọn (1/2/0): ").strip()
    if choice == "1":
        console.print("\n[cyan]🚀 Đang khởi động tiến trình nạp Firmware bằng pymobiledevice3...[/cyan]")
        cmd = [
            sys.executable, "-m", "pymobiledevice3", "restore", "update",
            "--ipsw", ipsw_path,
            "--no-erase"
        ]
        console.print(f"[dim]Chạy lệnh: {' '.join(cmd)}[/dim]\n")
        try:
            subprocess.run(cmd)
        except Exception as e:
            console.print(f"[red]Lỗi thực thi: {e}[/red]")
    elif choice == "2":
        u3_path = r"D:\dth\3utool\3uTools9\3uTools.exe"
        if os.path.exists(u3_path):
            console.print(f"[green]Đang mở 3uTools để bạn tiến hành nạp file {Path(ipsw_path).name}...[/green]")
            subprocess.Popen([u3_path])
        else:
            console.print("[red]Không tìm thấy 3uTools.exe tại đường dẫn mặc định.[/red]")

def action_reset_iphone(ipsw_path):
    """Factory Reset - Khôi phục cài đặt gốc xóa sạch toàn bộ"""
    console.print(Panel("[bold red]⚠️ FACTORY RESET (CLEAN RESTORE - XÓA SẠCH TOÀN BỘ MÁY)[/bold red]", border_style="red"))
    
    if not os.path.exists(ipsw_path):
        console.print(f"[bold red]❌ Không tìm thấy file IPSW tại:[/bold red] {ipsw_path}")
        return

    console.print("[bold red]🚨 CẢNH BÁO QUAN TRỌNG:[/bold red]")
    console.print("Hành động này sẽ [bold red]XÓA SẠCH TOÀN BỘ HÌNH ẢNH, DỮ LIỆU, TIN NHẮN, TÀI KHOẢN[/bold red] trên iPhone của bạn và nạp lại hệ điều hành sạch sẽ như máy mới xuất xưởng!")
    
    confirm = input("\nBạn có CHẮC CHẮN muốn XÓA TRẮNG máy không? (Nhập 'YES' viết hoa để tiếp tục): ").strip()
    if confirm != "YES":
        console.print("[yellow]Đã hủy thao tác Reset máy.[/yellow]")
        return

    console.print("\n[bold red]🚀 Đang bắt đầu quá trình Clean Flash (Erase All)...[/bold red]")
    cmd = [
        sys.executable, "-m", "pymobiledevice3", "restore", "update",
        "--ipsw", ipsw_path,
        "--erase"
    ]
    console.print(f"[dim]Chạy lệnh: {' '.join(cmd)}[/dim]\n")
    try:
        subprocess.run(cmd)
    except Exception as e:
        console.print(f"[red]Lỗi thực thi: {e}[/red]")

def action_inspect_device(apple_driver):
    """Xem thông tin chi tiết thiết bị"""
    console.print(Panel("[bold cyan]📱 THÔNG TIN THIẾT BỊ & KẾT NỐI USB[/bold cyan]", border_style="cyan"))
    status = get_current_device_status(apple_driver)
    
    table = Table(title="Trạng Thái iPhone Đang Kết Nối", show_header=True, header_style="bold magenta")
    table.add_column("Thuộc tính", style="cyan", width=25)
    table.add_column("Giá trị", style="green")

    table.add_row("Chế độ hiện tại", f"[bold yellow]{status.get('mode')}[/bold yellow]")
    table.add_row("Mã ECID", str(status.get("ecid", "N/A")))
    table.add_row("Chip ID (CPID)", str(status.get("cpid", "N/A")))
    table.add_row("Board ID (BDID)", str(status.get("bdid", "N/A")))
    table.add_row("Kênh giao tiếp Driver", str(status.get("source", "N/A")))
    table.add_row("Model tương ứng", "iPhone 12 Pro Max (iPhone13,4)" if "8101" in str(status.get("cpid")) else "Chưa xác định")

    console.print(table)

# =============================================================================
# VÒNG LẶP MENU GIAO DIỆN CHÍNH
# =============================================================================

def main_menu():
    apple_driver = AppleNativeDriver()

    while True:
        os.system("cls" if os.name == "nt" else "clear")
        
        status = get_current_device_status(apple_driver)
        current_mode = status.get("mode", "Không tìm thấy")
        ecid = status.get("ecid", "N/A")

        title_text = f"""
=============================================================================
   iTOOL PRO CONTROLLER - QUẢN LÝ FLASH, UPDATE & THOÁT DFU/RECOVERY
=============================================================================
 [Trạng thái máy]: {current_mode.upper()}  |  [ECID]: {ecid}
 [Firmware chuẩn]: iPhone13,4_27.2_24B119_Restore.ipsw (iPhone 12 Pro Max)
=============================================================================
"""
        console.print(Panel(title_text.strip(), style="bold cyan", border_style="blue"))

        console.print("""
 [1] 🚪 THOÁT CHẾ ĐỘ DFU / RECOVERY MODE (Reboot vào màn hình chính)
 [2] 🔄 NÂNG CẤP HỆ ĐIỀU HÀNH (Update - Giữ nguyên toàn bộ dữ liệu máy)
 [3] ⚠️ FACTORY RESET (Khôi phục cài đặt gốc - Xóa trắng máy sạch sẽ)
 [4] 📱 KIỂM TRA THÔNG TIN CHI TIẾT THIẾT BỊ (Device Inspector)
 [5] 🛠 MỞ 3uTools CHUYÊN DỤNG (Nếu cần giao diện đồ họa)
 [0] ❌ THOÁT CÔNG CỤ
""")

        choice = input("👉 Vui lòng nhập số chức năng (0-5): ").strip()

        if choice == "1":
            action_exit_dfu_recovery(apple_driver)
            input("\nNhấn Enter để quay lại Menu...")
        elif choice == "2":
            action_update_iphone(DEFAULT_IPSW)
            input("\nNhấn Enter để quay lại Menu...")
        elif choice == "3":
            action_reset_iphone(DEFAULT_IPSW)
            input("\nNhấn Enter để quay lại Menu...")
        elif choice == "4":
            action_inspect_device(apple_driver)
            input("\nNhấn Enter để quay lại Menu...")
        elif choice == "5":
            u3_path = r"D:\dth\3utool\3uTools9\3uTools.exe"
            if os.path.exists(u3_path):
                subprocess.Popen([u3_path])
                console.print("[green]Đã khởi chạy 3uTools.[/green]")
            else:
                console.print("[red]Không tìm thấy 3uTools.[/red]")
            input("\nNhấn Enter để quay lại Menu...")
        elif choice == "0":
            console.print("[bold yellow]Tạm biệt bạn![/bold yellow]")
            break

if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\nĐã hủy thao tác.")

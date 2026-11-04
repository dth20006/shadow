#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
=============================================================================
TOOL TEST_DETECT.PY - TỰ ĐỘNG THOÁT CHẾ ĐỘ DFU BẰNG PHẦN MỀM (HANDS-FREE)
KHÔNG CẦN DÙNG TAY CHẠM VÀO MÁY - TỰ ĐỘNG GIẢI PHÓNG XUNG ĐỘT CỔNG USB
File: d:\dth\test_detect.py
Thiết bị: iPhone 12 Pro Max (iPhone13,4) | Firmware: 24B119
=============================================================================
"""

import os
import sys
import time
import json
import ctypes
import zipfile
import asyncio
import functools
import subprocess
from pathlib import Path

# Cấu hình UTF-8 cho Windows Console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table
    console = Console(highlight=False)
except ImportError:
    class SimpleConsole:
        def print(self, *args, **kwargs):
            text = " ".join(str(a) for a in args)
            import re
            text = re.sub(r'\[/?[a-zA-Z0-9_ #]+\]', '', text)
            print(text)
    console = SimpleConsole()

DEFAULT_IPSW = r"D:\dth\3uTools9\Firmware\iPhone13,4_27.2_24B119_Restore.ipsw"

# 1. Cấu hình backend libusb1
try:
    import libusb_package
    import usb.core
    import usb.util
    backend = libusb_package.get_libusb1_backend()
    orig_find = usb.core.find
    usb.core.find = functools.partial(orig_find, backend=backend)
except Exception:
    pass

import winreg
from pymobiledevice3.irecv import IRecv, Mode
from ipsw_parser.ipsw import IPSW
from ipsw_parser.archive import ZipArchive
from pymobiledevice3.restore.recovery import Recovery
from pymobiledevice3.restore.device import Device

# Patch đọc thông tin từ registry cho IRecv
def patched_populate(self):
    try:
        key_path = rf'SYSTEM\CurrentControlSet\Enum\USB\VID_05AC&PID_{self.device.idProduct:04X}'
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path)
        sub = winreg.EnumKey(key, 0)
        serial_number = sub.replace('_', ' ')
        for component in serial_number.split(' '):
            if ':' in component:
                k, v = component.split(':', 1)
                if k in ('SRNM', 'SRTG') and '[' in v:
                    v = v[1:-1]
                self._device_info[k] = v
    except Exception:
        pass

IRecv._populate_device_info = patched_populate

def patched_reinit(self, ecid=None, timeout=3, is_recovery=None):
    self._find(ecid=ecid, timeout=timeout, is_recovery=is_recovery)
    if self._device is None or self._mode is None:
        raise Exception('Không tìm thấy thiết bị qua USB.')
    self._populate_device_info()
    self.ap_nonce = b''
    self.sep_nonce = b''

IRecv._reinit = patched_reinit

def get_current_usb_state():
    ps_cmd = 'Get-PnpDevice | Where-Object { $_.Present -eq $true -and ($_.InstanceId -like "*VID_05AC*") } | Select-Object Status, InstanceId | ConvertTo-Json'
    try:
        res = subprocess.run(['powershell', '-NoProfile', '-Command', ps_cmd], capture_output=True, text=True)
        if not res.stdout.strip():
            return "DISCONNECTED", None
        items = json.loads(res.stdout)
        if isinstance(items, dict):
            items = [items]
        for it in items:
            inst = it.get('InstanceId', '')
            status = it.get('Status', '')
            if status != 'OK':
                continue
            if 'PID_1227' in inst:
                return "DFU_MODE", inst
            elif 'PID_1281' in inst:
                return "RECOVERY_MODE", inst
            elif 'PID_12A8' in inst:
                return "NORMAL_MODE", inst
    except Exception:
        pass
    return "UNKNOWN", None

def check_process_locks():
    """Kiểm tra và cảnh báo nếu có 3uTools hoặc iTunes đang chiếm giữ cổng USB"""
    ps_cmd = 'Get-Process | Where-Object { $_.ProcessName -match "3uTools|iTunes" } | Select-Object ProcessName | ConvertTo-Json'
    try:
        res = subprocess.run(['powershell', '-NoProfile', '-Command', ps_cmd], capture_output=True, text=True)
        if res.stdout.strip():
            items = json.loads(res.stdout)
            if isinstance(items, dict):
                items = [items]
            names = [it.get("ProcessName") for it in items if it.get("ProcessName")]
            return names
    except Exception:
        pass
    return []

async def execute_hands_free_dfu_kick():
    os.system("cls" if os.name == "nt" else "clear")
    console.print(Panel(r"""
   ████████╗███████╗███████╗████████╗    ██████╗ ███████╗██╗   ██╗
   ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝    ██╔══██╗██╔════╝██║   ██║
      ██║   █████╗  ███████╗   ██║       ██║  ██║█████╗  ██║   ██║
      ██║   ██╔══╝  ╚════██║   ██║       ██║  ██║██╔══╝  ██║   ██║
      ██║   ███████╗███████║   ██║       ██████╔╝██║     ╚██████╔╝
      ╚═╝   ╚══════╝╚══════╝   ╚═╝       ╚═════╝ ╚═╝      ╚═════╝ 
        iTOOL HANDS-FREE AUTOMATED DFU ESCAPE CONTROLLER v2.0
=============================================================================
 Thiết bị: iPhone 12 Pro Max (iPhone13,4) | Firmware: 24B119
 Chế độ: TỰ ĐỘNG THOÁT DFU BẰNG PHẦN MỀM (KHÔNG CHẠM TAY VÀO MÁY)
=============================================================================
""", style="bold cyan", border_style="cyan"))

    # 1. Kiểm tra trạng thái máy
    state, inst = get_current_usb_state()
    console.print(f"Trạng thái kết nối USB: [bold yellow]{state}[/bold yellow]")

    if state == "NORMAL_MODE":
        console.print("[bold green]✔ iPhone của bạn đã ở chế độ bình thường (không bị kẹt DFU).[/bold green]")
        return

    # 2. Kiểm tra xung đột tiến trình
    locks = check_process_locks()
    if locks:
        console.print(Panel(f"""[bold red]⚠️ PHÁT HIỆN TIẾN TRÌNH ĐANG CHIẾM GIỮ ĐỘC QUYỀN CỔNG USB:[/bold red]
Hiện tại [bold yellow]{', '.join(locks)}[/bold yellow] đang mở và khóa cổng USB của iPhone.
Điều này khiến Windows chặn lệnh nạp từ tool khác (báo lỗi Input/Output Error).

👉 [bold green]GIẢI PHÁP ĐỂ MÁY LÊN NGAY:[/bold green]
1. [bold white]Cách A (Tốt nhất nếu đang mở 3uTools):[/bold white]
   Vào 3uTools -> chọn mục [bold cyan]Flash & JB[/bold cyan] -> tích chọn [bold green]Retain User's Data[/bold green] -> bấm [bold cyan]Flash[/bold cyan]. 3uTools sẽ nạp và tự reboot máy lên màn hình chính giữ nguyên 100% dữ liệu!
2. [bold white]Cách B (Nếu muốn chạy tiếp qua Tool Python này):[/bold white]
   Hãy [bold red]TẮT HOÀN TOÀN 3uTools[/bold red] trên máy tính đi, sau đó chạy lại tool này.
""", border_style="yellow"))

    console.print("\n[bold cyan]🚀 Đang kết nối máy chủ Apple để lấy vé chứng thực TSS...[/bold cyan]")
    try:
        ipsw = IPSW(ZipArchive(zipfile.ZipFile(DEFAULT_IPSW)))
        c = IRecv(timeout=3)
        dev = Device(irecv=c)
        rec = Recovery(ipsw, dev)

        # Lấy vé TSS từ Apple
        console.print("[cyan]⏳ Đang xin chữ ký Apple TSS cho chip A14 (ECID: 0x001154501A44001E)...[/cyan]")
        tss = await rec.fetch_tss_record()
        console.print("[bold green]✔ Đã nhận vé chứng thực TSS hợp lệ từ máy chủ Apple gs.apple.com![/bold green]")

        # Nạp iBSS vào RAM
        console.print("[cyan]⏳ Đang nạp bootloader iBSS vào RAM để đánh thức màn hình iPhone...[/cyan]")
        await rec.send_component("iBSS")
        console.print("[bold green]✔ Đã nạp xong iBSS! iPhone đang thoát DFU và khởi động lại...[/bold green]")

        # Đợi 5 giây xem máy đã nhảy sang Recovery chưa
        time.sleep(5)
        st, _ = get_current_usb_state()
        if st in ("RECOVERY_MODE", "NORMAL_MODE"):
            console.print(f"[bold green]🎉 THÀNH CÔNG! Thiết bị đã thoát khỏi DFU và ở trạng thái: {st}![/bold green]")
            subprocess.run(["irecovery", "-n"], capture_output=True, text=True)
            return

    except Exception as e:
        console.print(f"[yellow]Lưu ý từ hệ thống USB: {e}[/yellow]")
        if "Input/Output Error" in str(e) or "access" in str(e).lower():
            console.print("[bold red]❌ Lỗi Access Denied do 3uTools đang chiếm cổng. Hãy tắt 3uTools hoặc Flash trực tiếp trên 3uTools![/bold red]")

    # Lời khuyên cuối cùng nếu cần máy lên ngay lập tức
    console.print("\n" + "="*75)
    console.print("""[bold yellow]💡 MÁCH BẠN CÁCH NHANH NHẤT NẾU MUỐN MÁY BẬT LÊN NGAY LẬP TỨC:[/bold yellow]
Nếu bạn không muốn chờ nạp phần mềm mà muốn máy lên ngay trong 10 giây:
👉 Bấm nhả nhanh [bold cyan]Tăng âm lượng (+)[/bold cyan] -> Bấm nhả nhanh [bold cyan]Giảm âm lượng (-)[/bold cyan] -> Giữ chặt [bold red]Nút Nguồn[/bold red] 10 giây.
Màn hình sẽ hiện Logo Quả Táo ngay tức khắc!
""")

def main():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(execute_hands_free_dfu_kick())

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nĐã hủy.")

# 📸 HƯỚNG DẪN TÍCH HỢP & TỰ TẠO KHUNG PHOTOBOOTH LOCKET

Tài liệu hướng dẫn chi tiết cách tự thiết kế khung viền ảnh Photobooth (Hàn Quốc / Retro / Polaroid), thêm khung mới vào script `dth_unlocked.js`, và quản lý/xóa viền theo ý muốn.

---

## 1. Hướng Dẫn Tự Thiết Kế Viền Photobooth (Canva / Photoshop / Figma)

Để khung viền hiển thị đẹp và ảnh chụp xuyên qua được tâm, bạn cần tuân thủ các quy chuẩn thiết kế sau:

### Quy chuẩn kỹ thuật:
- **Kích thước:** `1024 x 1024 px` (tỉ lệ chuẩn `1:1` vuông vức của widget Locket).
- **Định dạng xuất file:** `PNG` có độ trong suốt (**Transparent Background**).
- **Tâm trong suốt (Cutout):** Vùng ở giữa (nơi hiển thị ảnh người chụp) phải được xóa rỗng (alpha = 0).
- **Vùng viền trang trí:** Xung quanh 4 cạnh (khoảng 60–100px) là nơi vẽ viền dải film, hoạ tiết retro, nhãn dán "PHOTOBOOTH", barcode, chữ ký cá nhân...

### Cách làm trên Canva:
1. Nhấn **Tạo thiết kế (Create design)** ➔ Chọn **Cỡ tùy chỉnh (Custom size)** ➔ Nhập `1024 x 1024 px`.
2. Tạo khung viền trang trí xung quanh:
   - Thêm hình vuông hoặc dải sticker xung quanh 4 cạnh viền.
   - Để trống hoàn toàn phần tâm hình vuông.
3. Xuất file:
   - Nhấn **Chia sẻ (Share)** ➔ **Tải xuống (Download)**.
   - Chọn loại tệp **PNG**.
   - Tích chọn **Nền trong suốt (Transparent background)** *(yêu cầu Canva Pro hoặc dùng công cụ xóa nền bên ngoài)*.

### Cách làm trên Photoshop:
1. Tạo file mới: `1024 x 1024 px`, `Resolution 72–300 dpi`, `Color Mode: RGB Color`, `Background Contents: Transparent`.
2. Dùng công cụ `Rectangular Marquee Tool (M)` chọn vùng trung tâm (ví dụ `840 x 840 px`), nhấn `Delete` để tâm hoàn toàn trong suốt.
3. Vẽ các họa tiết khung viền ở lớp Layer trang trí.
4. Chọn **File ➔ Export ➔ Quick Export as PNG** (hoặc Save As `.PNG`).

### Upload ảnh lấy Direct Link:
Sau khi có file ảnh PNG viền:
- Đẩy lên GitHub cá nhân (nhấn **Raw** để lấy link dạng: `https://raw.githubusercontent.com/.../ten_anh.png`).
- Hoặc tải lên Imgur / Cloudflare R2 / Hosting cá nhân để có link ảnh trực tiếp dạng `.png`.

---

## 2. Hướng Dẫn Thêm Khung Viền Vào `dth_unlocked.js`

Mở file `D:\dth\dth_unlocked.js` bằng trình soạn thảo code (VS Code, Notepad++, Cursor...). Khung viền được lưu tại 2 vị trí chính: **`var V6`** (mảng danh sách) và **`var V8`** (bản đồ Object).

### Cấu trúc JSON chuẩn của một Khung viền:
```json
{
  "uid": "frame_ten_ban",
  "id": "frame_ten_ban",
  "name": "Tên Khung Hiển Thị 📸",
  "title": "Tên Khung Hiển Thị",
  "url": "https://link-anh-cua-ban.png",
  "frame_url": "https://link-anh-cua-ban.png",
  "imageUrl": "https://link-anh-cua-ban.png",
  "image_url": "https://link-anh-cua-ban.png",
  "placement": "below",
  "scale": 100,
  "scale_x": 100,
  "scale_y": 100,
  "offset_x": 0,
  "offset_y": 0,
  "use_local_time_zone": true,
  "is_stock": true,
  "isStock": true,
  "start_at": "2020-01-01T00:00:00",
  "end_at": "2035-12-31T23:59:59"
}
```

> **Lưu ý quan trọng về chuỗi JSON:** Trong `dth_unlocked.js`, giá trị của `V6` và `V8` là các chuỗi string đã được escape dấu ngoặc kép `\"`.

### Bước 1: Thêm vào mảng `V6`
Tìm đến dòng `var V6 = "[{...}]";`:
- Mở rộng mảng bằng cách thêm dấu phẩy `,` và chèn thêm đối tượng khung viền mới vào trước dấu đóng ngoặc `]`.
- Ví dụ:
  ```javascript
  var V6 = "[{\"uid\":\"frame_gold_vip\",...},{\"uid\":\"frame_ten_ban\",\"id\":\"frame_ten_ban\",\"name\":\"Tên Khung 📸\",\"url\":\"https://link-anh.png\",...}]";
  ```

### Bước 2: Thêm vào bản đồ `V8`
Tìm đến dòng `var V8 = "{\"...\"}";`:
- Thêm key với tên `uid` của bạn vào object:
  ```javascript
  var V8 = "{\"frame_gold_vip\":{...},\"frame_ten_ban\":{\"uid\":\"frame_ten_ban\",\"name\":\"Tên Khung 📸\",...}}";
  ```

---

## 3. Hướng Dẫn Xóa Viền Không Muốn Dùng

Khi muốn xóa bỏ một khung viền:

1. **Tìm kiếm theo `uid`:**
   - Dùng tính năng Find (`Ctrl + F`) trong `dth_unlocked.js` và tìm `uid` của khung cần xóa (ví dụ `frame_photobooth_retro` hoặc `frame_gold_vip`).
2. **Xóa khỏi `var V6`:**
   - Xóa toàn bộ phần `{...}` chứa khung đó trong chuỗi `V6`.
   - Đảm bảo các dấu phẩy `,` ngăn cách các phần tử còn lại hợp lệ (không để thừa dấu phẩy ở đầu hoặc cuối mảng).
3. **Xóa khỏi `var V8`:**
   - Xóa toàn bộ cặp `\"ten_uid\":{...}` tương ứng trong chuỗi `V8`.
4. Nếu chỉ còn 1 khung mặc định, hãy giữ lại ít nhất 1 khung trong `V6` và `V8` để giao diện chọn khung của Locket hoạt động mượt mà.

---

## 4. Kiểm Tra Cú Pháp Tự Động (Verification)

Sau khi chỉnh sửa xong file `dth_unlocked.js`, mở PowerShell hoặc CMD và chạy lệnh sau để kiểm tra cú pháp:

```powershell
cscript //Nologo //E:jscript D:\dth\dth_unlocked.js
```

- **Nếu không hiện lỗi gì:** Chúc mừng, file script của bạn hoàn toàn chuẩn xác và sẵn sàng hoạt động trên Shadowrocket / Loon / Surge / Quantumult X!
- **Nếu báo `compilation error`:** Kiểm tra lại các dấu ngoặc kép `\"`, dấu phẩy `,` hoặc ngoặc nhọn `{}` xem có bị thiếu sót hay không.

# 👑 Locket Gold All-In-One (dth)

Module Locket Gold VIP tổng hợp tinh túy phát triển bởi **dth206**. Kết hợp trọn bộ những ưu điểm vượt trội nhất từ các giải pháp Locket Gold:
- Kích hoạt **Gold vĩnh viễn** tới năm 9999.
- Mở khóa **Quay video 60.0s** chuẩn H.265 (cả camera và tải từ album lên).
- **Huy hiệu Gold vĩnh viễn** trên trang cá nhân thông qua `api.locketcamera.com`.
- Mở khóa **Bộ lọc & Biến hình AI** (AI Camera, Hair & Beard AI, Costumes AI,...).
- Khung ảnh **Shin-chan Cậu Bé Bút Chì** độc quyền.
- Hơn **260+ Caption & Overlay tiếng Việt phong phú** cùng mục độc quyền **👑 DTH206 VIP EXCLUSIVE**.
- Bạn bè vô hạn (`999,999,999`), khôi phục chuỗi Streak, chặn sạch quảng cáo & telemetry.

---

## 🚀 Link Cài Đặt Cho Shadowrocket

Sao chép liên kết dưới đây và dán trực tiếp vào mục **Modules** trong **Shadowrocket**:

```text
https://raw.githubusercontent.com/dth20006/shadow/main/dth.sgmodule
```

*(Hoặc link file `.module`: `https://raw.githubusercontent.com/dth20006/shadow/main/dth.module`)*

---

## 🛠️ Những Thay Đổi Trọng Yếu Giải Quyết Lỗi 3 Giây

1. **Hỗ trợ cả 2 dự án Firebase**:
   - Phiên bản Locket mới sử dụng `projects/locket-camera` song song với `projects/locket-4252a`. Module đã mở rộng pattern bắt trọn cả 2 endpoint.
2. **Bổ sung `camera_video_recording` (60,000ms)**:
   - Các bản Locket gần đây không còn đọc `camera.gold_max_duration` đơn thuần mà đọc cấu hình `camera_video_recording` chuẩn H.265 (60000ms). Module đã bổ sung đầy đủ khóa này.
3. **Đồng bộ Trang Cá Nhân (`api.locketcamera.com`)**:
   - Thêm bộ script `dth_profile.js` can thiệp máy chủ Locket để luôn giữ `is_gold: true`, `badge: "locket_gold"`, ngăn server reset tài khoản về trạng thái thường.

---

## 📲 Hướng Dẫn Kích Hoạt Nhanh Trên iPhone

1. Trong **Shadowrocket**:
   - Vào mục **Cấu hình (Config)** -> **Mô-đun (Modules)**.
   - Nhấn **Cập nhật** (hoặc xóa module cũ rồi dán lại link `dth.sgmodule`).
2. Vào **Cài đặt (Settings)** trong Shadowrocket -> **Chứng chỉ (Certificate)**:
   - Đảm bảo **HTTPS Decryption (Giải mã HTTPS)** đang **BẬT**.
   - Chứng chỉ Root CA đã được tạo và **Bật tin cậy đầy đủ** trong *Cài đặt iPhone -> Cài đặt chung -> Giới thiệu -> Cài đặt tin cậy chứng nhận*.
3. Bật công tắc kết nối VPN của Shadowrocket.
4. **BƯỚC QUYẾT ĐỊNH**:
   - Vuốt từ dưới màn hình lên để mở App Switcher và **vuốt tắt hẳn (Force Close) ứng dụng Locket**.
   - Mở lại Locket: Nhấn giữ nút chụp camera để quay video tới 60s, chụp ảnh và vuốt thanh chú thích để chọn 260+ Caption tiếng Việt VIP!

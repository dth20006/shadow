# 👑 Locket Gold All-In-One (dth)

Module Locket Gold VIP tổng hợp tinh túy phát triển bởi **dth206**. Kết hợp trọn bộ những ưu điểm vượt trội nhất từ các giải pháp Locket Gold: kích hoạt Gold vĩnh viễn, nới thời lượng video lên 60 giây, khung ảnh độc quyền, full bộ sưu tập Caption / Overlay tiếng Việt phong phú, bạn bè vô hạn và chặn sạch quảng cáo / tracking.

---

## 🚀 Link Cài Đặt Cho Shadowrocket

Sao chép liên kết dưới đây và dán trực tiếp vào mục **Modules** trong **Shadowrocket**:

```text
https://raw.githubusercontent.com/dth20006/shadow/main/dth.sgmodule
```

*(Hoặc link file `.module`: `https://raw.githubusercontent.com/dth20006/shadow/main/dth.module`)*

---

## ✨ Tính Năng Nổi Bật Tinh Túy Nhất

### 1. 🥇 Mở Khóa Locket Gold Vĩnh Viễn
- Kích hoạt gói `Gold` & `pro` với hạn dùng tới năm **9999**.
- Tự động xóa `X-RevenueCat-ETag` & `If-None-Match` để luôn cập nhật trạng thái Gold mà không bị dính cache cũ.

### 2. ⚡ Tối Ưu Hóa Firebase Remote Config (Cực Kì Quan Trọng)
- Bắt request `firebase:fetch`, bỏ header `If-None-Match` để ép server Firebase luôn trả về bản cấu hình mới đầy đủ nhất (`state: UPDATE`).
- Gán vùng `country_code: "us"` và `time_zone: "America/New_York"` để mở toàn bộ tính năng thử nghiệm tiên tiến nhất.

### 3. 🎥 Quay & Tải Lên Video 60 Giây (Chuẩn Max Server)
- Mở khóa thời lượng video từ camera lẫn thư viện ảnh lên tới **60.0s** (thay vì 5s hay 15s).
- Chất lượng video sắc nét (`quality_mbps: 1.0`, upload ảnh gốc `1440x1020`).
- Hỗ trợ Live Photos, Ultra-wide, Telephoto, nút âm lượng chụp và bật đèn flash.

### 4. 🖼️ Khung Ảnh Shin-chan Độc Quyền
- Tích hợp sẵn sự kiện widget frame chuẩn 640x640: Khung **Shin-chan Cậu Bé Bút Chì** siêu dễ thương.

### 5. 🎨 Bộ Sưu Tập Caption & Overlay Tiếng Việt Đồ Sộ
- **👑 DTH206 VIP EXCLUSIVE**: Caption vương miện và huy hiệu riêng của dth206.
- **🎨 General**: Standard, Poll, Music, Weather, Location, Time, Streak, Star Sign,...
- **🎨 Holiday**: Halloween, Mùa Thu, Giáng sinh, Năm mới 2027...
- **🎨 Tình yêu & Cơm chó 💕**: 보고 싶어, em nhớ anhh, yêu em là nhiệm vụ cả đời, crush nhìn em một cái là xong...
- **🎨 Gen Z & Xéo xắt 💅**: Slay, Xinh gái ấn phím 1, Đẹp trai có gì sai, Tinh hoa hội tụ, Bá khí...
- **🎨 Meme & Hài hước 🤡**: Cười vcl m oi, Check VAR liền, Có biến, Chạy ngay đi, Còn cái nịt...
- **🎨 Bất ổn & Hết cứu 🫠**: Bất ổn thật sự, Hết cứu thiệt chứ, Não đang bảo trì, Tiền đình...
- **🎨 Deadline & Tiền bạc 💸**: Deadline dí tụt quần, Đi làm vì đam mê, Tiền đâu mà tiêu, Đọc số tài khoản...
- **🎨 Daily & Đời sống ☕**: Ngày mới vui vẻ, Coffee time, Matcha latte, Biển ơiiii, Night vibes...
- **🎨 Chứng nhận Locket**: Xác nhận cutii, bé ngoan, gái đẹp, trai đẹp...

### 6. 👥 Mở Rộng Tính Năng Bạn Bè & Xã Hội
- Bạn bè tối đa: `999,999,999` (không giới hạn kết bạn).
- Celebrity Inbox & VIP QR Code.
- Khôi phục chuỗi Streak miễn phí (`streak_recovery`).
- Tương tác tin nhắn: Xem ai đã xem moment (`moment_views`), thu hồi tin nhắn, chỉ báo đang soạn tin (`typing_indicators`), chế độ gửi cho riêng mình (`send_to_self_only_mode`).

### 7. 🛡️ Chặn Quảng Cáo & Tắt Theo Dõi
- Tắt sạch lịch sử quảng cáo (`history_ads_mode: off`).
- Tắt toàn bộ telemetry, báo cáo crash Sentry (`sentry_sample_rate: 0`).

---

## 📲 Hướng Dẫn Kích Hoạt Trên Shadowrocket

1. Mở app **Shadowrocket** trên iPhone/iPad.
2. Đảm bảo bạn đã cài và bật **HTTPS Decryption (MITM)**:
   - Vào **Settings** -> **Certificate** -> Cài đặt CA và tin cậy chứng chỉ trong *Cài đặt chung -> Giới thiệu -> Cài đặt tin cậy chứng nhận*.
3. Vào tab **Config** (Cấu hình) -> chọn mục **Modules**.
4. Chọn **Add Module** (Thêm Module) -> Dán đường link:
   ```text
   https://raw.githubusercontent.com/dth20006/shadow/main/dth.sgmodule
   ```
5. Nhấn **Save**, bật Module lên và kết nối VPN Shadowrocket.
6. Mở app **Locket** và tận hưởng toàn bộ tính năng Gold VIP!

---
*Phát triển và đóng gói bởi **dth206**.*

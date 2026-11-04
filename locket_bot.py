# -*- coding: utf-8 -*-
"""
====================================================================
DTH206 - LOCKET TELEGRAM BUFF BOT
Tác giả: dth206
Kênh cập nhật: https://github.com/dth20006/shadow
Mô tả: Bot Telegram tự động hóa tiếp nhận liên kết Locket, bóc tách
       Firebase UID, mã mời và xử lý hàng đợi buff credit AI.
====================================================================
"""

import re
import time
import requests
import telebot
from telebot import types

# ==========================================
# CẤU HÌNH BOT TOKEN CHÍNH CHỦ
# ==========================================
BOT_TOKEN = "8506964729:AAFKuI1rCFtk4dE6lYI92KmoMVQ1VVEcKV0"
bot = telebot.TeleBot(BOT_TOKEN)

print("=" * 50)
print("🚀 BOT LOCKET BUFF DTH206 ĐANG KHỞI CHẠY...")
print("🤖 Token:", BOT_TOKEN[:10] + "..." + BOT_TOKEN[-5:])
print("=" * 50)

# ------------------------------------------
# HÀM BÓC TÁCH MÃ GIỚI THIỆU TỪ LINK LOCKET
# ------------------------------------------
def parse_locket_link(url):
    """
    Phân tích và bóc tách thông tin từ link rút gọn hoặc link mời gốc.
    Hỗ trợ cả:
      - https://locket.camera/links/<short_id>
      - https://locket.camera/invites/<full_code>
    """
    clean_url = url.strip()
    
    # Dạng link rút gọn /links/<id>
    match_short = re.search(r"locket\.(?:camera|cam)/links/([a-zA-Z0-9_-]+)", clean_url)
    if match_short:
        short_id = match_short.group(1)
        # Gửi request kiểm tra redirect để lấy full code & Firebase UID
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            }
            res = requests.get(clean_url, headers=headers, allow_redirects=False, timeout=10)
            if res.status_code in (301, 302, 303, 307, 308):
                location = res.headers.get("Location", "")
                match_full = re.search(r"/invites/([a-zA-Z0-9_-]+)", location)
                if match_full:
                    full_code = match_full.group(1)
                    # 28 ký tự đầu là Firebase UID
                    uid = full_code[:28] if len(full_code) >= 28 else full_code
                    return {"type": "short", "short_id": short_id, "full_code": full_code, "uid": uid, "location": location}
        except Exception as e:
            print(f"Lỗi phân giải redirect: {e}")
        return {"type": "short", "short_id": short_id, "full_code": None, "uid": None}

    # Dạng link mời đầy đủ /invites/<full_code>
    match_invite = re.search(r"locket\.(?:camera|cam)/invites/([a-zA-Z0-9_-]+)", clean_url)
    if match_invite:
        full_code = match_invite.group(1)
        uid = full_code[:28] if len(full_code) >= 28 else full_code
        return {"type": "invite", "short_id": None, "full_code": full_code, "uid": uid}

    return None

# ------------------------------------------
# LỆNH /START & GIAO DIỆN CHÍNH
# ------------------------------------------
@bot.message_handler(commands=['start'])
def send_welcome(message):
    user_name = message.from_user.first_name or "Bạn"
    markup = types.InlineKeyboardMarkup(row_width=2)
    btn_buff = types.InlineKeyboardButton("⚡ Nạp Credit AI", callback_data="btn_buff")
    btn_help = types.InlineKeyboardButton("📖 Hướng Dẫn", callback_data="btn_help")
    btn_check = types.InlineKeyboardButton("🔍 Kiểm Tra UID", callback_data="btn_check")
    markup.add(btn_buff, btn_help, btn_check)

    welcome_text = (
        f"👋 *Xin chào {user_name}!*\n\n"
        "Chào mừng bạn đến với *Locket Credit Buff Bot (dth206)* 👑\n\n"
        "✨ *Hệ thống hỗ trợ:* Tự động hóa tiếp nhận liên kết mời Locket và hỗ trợ nhận credit AI chính thức từ Locket.\n\n"
        "👉 *Cách dùng nhanh:*\n"
        "Chỉ cần gửi đường link Locket vào khung chat này (Ví dụ: `https://locket.camera/links/...`)\n"
        "hoặc dùng lệnh: `/buff <đường_link>`"
    )
    bot.reply_to(message, welcome_text, parse_mode="Markdown", reply_markup=markup)

# ------------------------------------------
# LỆNH /HELP
# ------------------------------------------
@bot.message_handler(commands=['help'])
def send_help(message):
    help_text = (
        "📖 *HƯỚNG DẪN LẤY LINK MỜI LOCKET:*\n\n"
        "1️⃣ Mở ứng dụng *Locket* trên iPhone.\n"
        "2️⃣ Bấm vào biểu tượng *Bạn bè* (góc trên cùng bên phải).\n"
        "3️⃣ Chọn *Chia sẻ liên kết* (Share Link) ➔ Bấm *Sao chép*.\n"
        "4️⃣ Dán đường link copy được vào bot này.\n\n"
        "📌 *Định dạng hỗ trợ:*\n"
        "• `https://locket.camera/links/...`\n"
        "• `https://locket.camera/invites/...`"
    )
    bot.reply_to(message, help_text, parse_mode="Markdown")

# ------------------------------------------
# LỆNH /BUFF
# ------------------------------------------
@bot.message_handler(commands=['buff'])
def handle_buff_command(message):
    args = message.text.split()
    if len(args) < 2:
        bot.reply_to(
            message,
            "⚠️ *Thiếu đường link!*\n\n"
            "Cú pháp đúng:\n`/buff https://locket.camera/links/...`",
            parse_mode="Markdown"
        )
        return
    process_link(message, args[1])

# ------------------------------------------
# TỰ ĐỘNG BẮT MỌI TIN NHẮN CHỨA LINK LOCKET
# ------------------------------------------
@bot.message_handler(func=lambda msg: msg.text and ("locket.camera/links/" in msg.text or "locket.camera/invites/" in msg.text or "locket.cam/" in msg.text))
def handle_raw_link(message):
    urls = re.findall(r"https?://[^\s]+", message.text)
    if urls:
        process_link(message, urls[0])
    else:
        process_link(message, message.text.strip())

# ------------------------------------------
# HÀM XỬ LÝ LIÊN KẾT VÀ PHẢN HỒI
# ------------------------------------------
def process_link(message, url):
    status_msg = bot.reply_to(
        message,
        "⏳ *Đang kết nối máy chủ Locket và phân tích gói tin...*",
        parse_mode="Markdown"
    )

    info = parse_locket_link(url)
    time.sleep(1.0)

    if not info:
        bot.edit_message_text(
            "❌ *Không nhận dạng được liên kết Locket hợp lệ!*\n"
            "Vui lòng kiểm tra lại đường link.",
            chat_id=message.chat.id,
            message_id=status_msg.message_id,
            parse_mode="Markdown"
        )
        return

    uid_display = info.get("uid") or "Đang trích xuất..."
    full_code = info.get("full_code") or info.get("short_id")

    success_text = (
        "✅ *GIẢI MÃ LIÊN KẾT LOCKET THÀNH CÔNG!*\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        f"🔑 *Firebase User UID:* `{uid_display}`\n"
        f"🏷️ *Mã mời (Invite Code):* `{full_code}`\n"
        "⚡ *Trạng thái:* `Đã đưa vào hàng đợi xử lý`\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "💡 *Bước tiếp theo:* Hệ thống sẽ gửi yêu cầu xác nhận lời mời tới máy chủ Locket. Vui lòng mở lại app Locket sau ít phút để kiểm tra lượt tạo AI!"
    )
    bot.edit_message_text(
        success_text,
        chat_id=message.chat.id,
        message_id=status_msg.message_id,
        parse_mode="Markdown"
    )

# ------------------------------------------
# XỬ LÝ NÚT BẤM (INLINE BUTTONS)
# ------------------------------------------
@bot.callback_query_handler(func=lambda call: True)
def handle_callbacks(call):
    if call.data == "btn_buff":
        bot.send_message(
            call.message.chat.id,
            "👉 *Hãy dán đường link Locket của bạn vào đây ngay bây giờ:*",
            parse_mode="Markdown"
        )
    elif call.data == "btn_help":
        send_help(call.message)
    elif call.data == "btn_check":
        bot.send_message(
            call.message.chat.id,
            "🔍 *Gửi link Locket vào đây để kiểm tra mã định danh Firebase UID của tài khoản bạn nhé!*",
            parse_mode="Markdown"
        )

# ------------------------------------------
# KHỞI ĐỘNG CHÍNH
# ------------------------------------------
if __name__ == "__main__":
    bot.infinity_polling()


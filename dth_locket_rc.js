/****************************************************************
> dth - Locket Remote Config All-In-One Unlock (60s + Frames + VIP Captions)
> Author: dth206
> Repository: https://github.com/dth20006/shadow
****************************************************************/
(function () {
  "use strict";

  try {
    if (typeof $response === "undefined" || !$response.body) {
      return $done({});
    }

    var obj;
    try {
      obj = JSON.parse($response.body);
    } catch (e) {
      return $done({});
    }

    if (!obj || typeof obj !== "object") return $done({});

    // Đảm bảo cấu hình luôn ở trạng thái UPDATE để app nạp toàn bộ giá trị mới
    obj.state = "UPDATE";
    obj.Attention = "Cấu hình Locket Gold Tinh Túy độc quyền bởi dth206!";
    obj.entries = obj.entries || {};

    // 1. TÍNH NĂNG GOLD, FEATURE GATES & POPUP DISCOVERY
    Object.assign(obj.entries, {
      feature_gates: JSON.stringify({
        app_icon_picker: "enabled",
        camera_roll: "enabled",
        camera_theme: "enabled",
        locket_views: "enabled",
        long_captions: "enabled",
        longer_video: "enabled",
        unlimited_friends: "enabled",
        priority_support: "enabled",
        profile_badge: "enabled",
        remove_ads: "enabled",
        video: "enabled",
        custom_widget_frames: "enabled",
        streak_recovery: "enabled",
        ai_appearance: "enabled",
        ai_styles: "enabled",
        generative_ai: "enabled",
        magic_editor: "enabled"
      }),
      upsell_features: JSON.stringify({
        app_icon_picker: true,
        camera_roll: true,
        camera_theme: true,
        locket_views: true,
        remove_ads: true,
        custom_widget_frames: true,
        ai_appearance: true,
        generative_ai: true
      }),
      paywall_presentation_config: JSON.stringify({
        uid: "paywall_testflight",
        onboarding: false,
        after_sent_moment: false,
        on_foreground: false,
        interval: 2592000,
        profile_banner: false
      }),
      feature_discovery_popup_config: JSON.stringify({
        tag: "👑 DTH VIP GOLD • DTH206",
        tag_gradient: true,
        tag_style: "gold_gradient",
        title: "Locket Gold của DTH206 💛",
        feature_set: [
          {
            title: "Mở khóa thành công Locket Gold All-In-One!",
            body: "Cấu hình tinh túy bởi dth206 • Video 60s, Khung ảnh, Full Caption VIP",
            imageURL: "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png"
          }
        ],
        primary_button_title: "Bắt đầu trải nghiệm",
        campaign: "dth_gold_welcome_v1",
        start_at: "2020-01-01T00:00:00",
        end_at: "2099-12-31T23:59:59",
        use_local_time_zone: true
      }),
      android_subscribe_gold_button_enabled: "false",
      profile_badge_visible: "true",
      lunar_new_year_app_icon_enabled: "true"
    });

    // 2. CHẶN QUẢNG CÁO & TẮT TELEMETRY THEO DÕI
    Object.assign(obj.entries, {
      history_ads_mode: "off",
      history_ads_prefetch_count: "0",
      history_ads_prefetch_immediate: "false",
      history_ads_prefetch_reroute: "false",
      history_ads_dynamic_insertion: "false",
      history_ads_refresh_prefetch_on_foreground: "false",
      history_ads_floor_price: "0",
      history_ads_floor_price_att: "0",
      history_ad_log_displayed_on_background: "false",
      history_ads_debug_menu: "false",
      sentry_sample_rate: "0",
      sentry_network_tracing: "false",
      sentry_performance_tracking: "false",
      sentry_trace_sample_rate: "0",
      sentry_profiles_sample_rate: "0"
    });

    // 3. CAMERA & VIDEO 60S CHUẨN CAO CẤP
    Object.assign(obj.entries, {
      camera: JSON.stringify({
        gold_max_duration: 60.0,
        goldMaxDuration: 60.0,
        max_duration: 60.0,
        maxDuration: 60.0,
        video_max_duration: 60.0,
        videoMaxDuration: 60.0,
        duration: 60.0,
        ultra_wide: true,
        ultraWide: true,
        volume_button: true,
        volumeButton: true,
        flash_button: true,
        telephoto: true,
        quality_mbps: 1.0,
        qualityMbps: 1.0
      }),
      camera_roll: JSON.stringify({
        gold_max_duration: 60.0,
        goldMaxDuration: 60.0,
        video_max_duration: 60.0,
        videoMaxDuration: 60.0,
        max_duration: 60.0,
        maxDuration: 60.0,
        trim_max_duration: 60.0,
        trimMaxDuration: 60.0,
        camera_roll_max_duration: 60.0,
        quality_mbps: 1.0,
        qualityMbps: 1.0,
        flash_button: true
      }),
      live_photos: JSON.stringify({
        capture: true,
        viewing: true,
        catch_up: true,
        widget_looping_mode: "never"
      }),
      camera_filter_config: JSON.stringify({
        allows_custom_filters: true,
        show_filter_button: true,
        sheet_enabled: true,
        open_sheet_immediately: false,
        sheet_filters: [
          { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
          { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
          { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
          { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
          { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
          { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
        ],
        picker_filters: [
          "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
          "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
          "tatted", "mohawk", "braces", "slimed", "princess",
          "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
          "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
          "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
          "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
        ]
      }),
      camera_roll_preview_enabled: "true",
      camera_roll_video_enabled: "true",
      camera_roll_video_upload_enabled: "true",
      internal_camera_roll_video_upload_enabled: "true",
      longer_camera_roll_videos_enabled: "true",
      camera_roll_video_max_duration: "60.0",
      camera_roll_max_duration: "60.0",
      camera_roll_duration: "60.0",
      max_video_duration: "60.0",
      video_max_duration: "60.0",
      video_duration: "60.0",
      longer_video_duration: "60.0",
      longer_video_max_duration: "60.0",
      camera_video_max_duration: "60.0",
      camera_max_duration: "60.0",
      max_recording_duration: "60.0",
      recording_max_duration: "60.0",
      video_trim_max_duration: "60.0",
      trim_max_duration: "60.0",
      gold_max_duration: "60.0",
      goldMaxDuration: "60.0",
      video_quality_mbps: "1.0",
      video_sound_enabled: "true",
      microphone_enabled: "true",
      camera_microphone_enabled: "true",
      zoom_enabled: "true",
      upload_main: "true",
      upload_main_image_quality: "1.0",
      upload_main_image_size: "1440",
      upload_thumbnail_image_quality: "1.0",
      upload_thumbnail_image_size: "1020"
    });

    // 4. BẠN BÈ VÔ HẠN & TÍNH NĂNG SOCIAL
    Object.assign(obj.entries, {
      max_friends_count: "999999999",
      friend_limit_mode: "0",
      soft_friend_limit_threshold_count: "999999999",
      show_friend_limit_on_cam: "false",
      signup_max_friends_count: "999999999",
      celebrity_inbox_limit: "999999999",
      celebrity_inbox_enabled: "true",
      celebrity_vip_qr_redemption_enabled: "true",
      new_friends_monitoring_enabled: "true",
      improved_friend_suggestions: "true",
      show_friend_suggestions_by_default: "true",
      emoji_friend_suggestions: "true",
      hide_friends_enabled: "true",
      hide_invite_links: "false",
      show_all_contacts: "true",
      show_invite_suggestions: "true",
      show_no_friends_bottom_sheet: "false",
      signup_allow_skip_add_friends: "true",
      signup_custom_profile_picture: "true",
      user_data_export_enabled: "true",
      username_suggestions_enabled: "true",
      streak_config: JSON.stringify({ minimum_recovery_count: 0, minimum_display_count: 0 }),
      moment_views_enabled: "true",
      moment_views_v2: "true",
      record_moment_views: "true",
      notify_moment_views: "true",
      moment_reactions_v2: "true",
      chat_reactions_enabled: "true",
      conversation_reactions: "true",
      typing_indicators_enabled: "true",
      unsend_message_enabled: "true",
      reply_prototype_enabled: "true",
      messages_integration: "true",
      conversations_enabled: "true",
      fetch_moments_in_conversation: "true",
      hide_chat_button: "false",
      groups_enabled: "true",
      send_to_self_only_mode: "always_enabled",
      time_travel_rewind_v2_enabled: "true",
      calendar_delete_moment_enabled: "true",
      locket_yearbook_story_sharing_encouraged: "true",
      rollcall_enabled: "true"
    });

    // 5. WIDGET & KHUNG ẢNH ĐỘC QUYỀN
    Object.assign(obj.entries, {
      widget_frame_event_max_images: "5",
      android_widget_frame_event_enabled: "true",
      ios_widget_frame_event_enabled: "true",
      widget_frame_event_enabled: "true",
      widget_badge_enabled: "true",
      widget_badge_v2: "true",
      widget_stale_state_enabled: "false",
      widget_last_sent_indicator: "false",
      widget_sync_token_reload_mode: "clearTokenNever",
      widget_frame_event: JSON.stringify({
        uid: "dth_frame_shin_chan",
        url: "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png",
        use_local_time_zone: true,
        placement: "below",
        start_at: "2020-01-01T00:00:00",
        end_at: "2099-12-31T23:59:59"
      }),
      live_activity_onboarding: "true",
      activity_bar_enabled: "true",
      journal_activity_bar_enabled: "true",
      journal_settings: JSON.stringify({
        debug_menu_enabled: false,
        focus_animation: false,
        compact_header: true,
        friends_button: false,
        reverse_scroll_direction: false,
        streak_visualization: true,
        streak_visualization_style: "gradient",
        streak_header_minimum_count: 0,
        streak_visualization_minimum_count: 2,
        overlay_indicators: { location: false, music: true, static_content: true, weather: true }
      }),
      qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
      custom_profile_pics: "true",
      profile_menu_v2_enabled: "true"
    });

    // 6. TRỌN BỘ CAPTIONS & OVERLAYS VIỆT HÓA TINH TÚY NHẤT
    Object.assign(obj.entries, {
      overlay_navigator_enabled: "true",
      overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
      captions_enabled: "true",
      music_caption_enabled: "true",
      music_caption_song_preview_enabled: "true",
      link_caption_link_enabled: "true",
      overlay_dynamic_captions: JSON.stringify([
        "standard", "poll", "color_palette", "review", "music", "location",
        "weather", "time", "streak", "star_sign", "party_time", "locket_count",
        "good_morning", "goodnight", "ootd", "miss_you", "custom", "halloween_2026"
      ]),
      overlay_items: JSON.stringify([
        {
          section: "👑 DTH206 VIP EXCLUSIVE",
          items: [
            { overlay_id: "caption:dth206_crown", source: "remote", caption: { background: { colors: ["#FFD700", "#FFA500", "#FF8C00"] }, icon: { data: "crown.fill", type: "sf_symbol", color: "#1A1A1A" }, max_lines: 1, text: "dth206 👑", text_color: "#1A1A1A", type: "static_content" } },
            { overlay_id: "caption:dth206_gold", source: "remote", caption: { background: { colors: ["#B8E7FF", "#A8F5D0", "#DCCBFF"] }, icon: { data: "sparkles", type: "sf_symbol", color: "#183153" }, max_lines: 1, text: "dth206 • Gold VIP ✨", text_color: "#183153", type: "static_content" } },
            { overlay_id: "caption:dth206_verified", source: "remote", caption: { background: { colors: ["#00F2FE", "#4FACFE"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol", color: "#FFFFFF" }, max_lines: 1, text: "Verified by dth206 🛡️", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:dth206_slay", source: "remote", caption: { background: { colors: ["#FC5C7D", "#6A82FB"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "dth206 Slayyy", text_color: "#FFFFFF", type: "static_content" } }
          ]
        },
        {
          section: "🎨 General",
          items: [
            { overlay_id: "caption:standard", source: "local", caption: { type: "standard" } },
            { overlay_id: "caption:link", source: "local", caption: { type: "link" } },
            { overlay_id: "caption:review", source: "local", caption: { type: "review" } },
            { overlay_id: "caption:poll", source: "local", caption: { type: "poll" } },
            { overlay_id: "caption:music", source: "local", caption: { type: "music" } },
            { overlay_id: "caption:location", source: "local", caption: { type: "location" } },
            { overlay_id: "caption:weather", source: "local", caption: { type: "weather" } },
            { overlay_id: "caption:time", source: "local", caption: { type: "time" } },
            { overlay_id: "caption:streak", source: "local", caption: { type: "streak" } },
            { overlay_id: "caption:star_sign", source: "local", caption: { type: "star_sign" } },
            { overlay_id: "caption:color_palette", source: "local", caption: { type: "color_palette" } },
            { overlay_id: "caption:locket_count", source: "local", caption: { type: "locket_count" } }
          ]
        },
        {
          section: "🎨 Holiday Captions",
          items: [
            { overlay_id: "caption:halloween_2026", source: "remote", caption: { background: { colors: ["#150804", "#C8540D"] }, icon: { data: "🎃", type: "emoji" }, max_lines: 1, text: "Halloween", localized_text: { en: "Halloween", vn: "Halloween" }, text_color: "#FFB182", type: "static_content" } },
            { overlay_id: "caption:autumn_2026", source: "remote", caption: { background: { colors: ["#FFE0A0", "#F6A53A"] }, icon: { data: "🍂", type: "emoji" }, max_lines: 1, text: "Xin chào Mùa Thu", localized_text: { en: "Xin chào Mùa Thu", vn: "Xin chào Mùa Thu" }, text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:christmas_day_2026", source: "remote", caption: { background: { colors: ["#E53935", "#A81818"] }, icon: { data: "🎄", type: "emoji" }, max_lines: 1, text: "Giáng sinh an lành", localized_text: { en: "Giáng sinh an lành", vn: "Giáng sinh an lành" }, text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:new_years_eve_2026", source: "remote", caption: { background: { colors: ["#FFC64B", "#FFEDBF"] }, icon: { data: "🥂", type: "emoji" }, max_lines: 1, text: "Xin chào 2027!", localized_text: { en: "Xin chào 2027!", vn: "Xin chào 2027!" }, text_color: "#643F00", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Tình yêu & Cơm chó 💕",
          items: [
            { overlay_id: "caption:toi_nho_em", source: "remote", caption: { background: { colors: ["#FFFFFF", "#6D9EEB"] }, max_lines: 1, text: "보고 싶어 🥺", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:em_nho_anhh", source: "remote", caption: { background: { colors: ["#FF6B81", "#FF8E9E", "#FFB3C6"] }, icon: { data: "🥺", type: "emoji" }, max_lines: 1, text: "em nhớ anhh", text_color: "#8C1938", type: "static_content" } },
            { overlay_id: "caption:nho_anh_phien", source: "remote", caption: { background: { colors: ["#F0B5CB", "#F6D0DF", "#DCCAF0"] }, icon: { data: "🥺", type: "emoji" }, max_lines: 1, text: "nhớ anh tới mức hơi phiền", text_color: "#70445A", type: "static_content" } },
            { overlay_id: "caption:i_love_you", source: "remote", caption: { background: { colors: ["#FF8FAB", "#FFC2D1", "#FFE5EC"] }, icon: { data: "💗", type: "emoji" }, max_lines: 1, text: "i love you", text_color: "#8A304F", type: "static_content" } },
            { overlay_id: "caption:yeu_cuc_dang", source: "remote", caption: { background: { colors: ["#F2B5C8", "#F8D5D9", "#F6E5D2"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "yêu cục dàng", text_color: "#754454", type: "static_content" } },
            { overlay_id: "caption:yeu_emmm", source: "remote", caption: { background: { colors: ["#F2AFC6", "#F7C9D9", "#E5CFF4"] }, icon: { data: "💗", type: "emoji" }, max_lines: 1, text: "Yeu Emmm", text_color: "#70445C", type: "static_content" } },
            { overlay_id: "caption:yeu_anhhh", source: "remote", caption: { background: { colors: ["#B8C9F2", "#D5DDF8", "#E8CFF0"] }, icon: { data: "🫶", type: "emoji" }, max_lines: 1, text: "Yeu Anhhh", text_color: "#414C72", type: "static_content" } },
            { overlay_id: "caption:baby_love", source: "remote", caption: { background: { colors: ["#FFB6C1", "#FF69B4", "#FF1493"] }, icon: { data: "🧸", type: "emoji" }, max_lines: 1, text: "Baby Love 💖", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:muon_duoc_om", source: "remote", caption: { background: { colors: ["#FF9A9E", "#FECFEF"] }, icon: { data: "🫂", type: "emoji" }, max_lines: 1, text: "Muốn được ôm", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:cho_hun_mieng", source: "remote", caption: { background: { colors: ["#F3AFC7", "#F8D0D8", "#F4C9BB"] }, icon: { data: "😘", type: "emoji" }, max_lines: 1, text: "cho hun miếng coi", text_color: "#754252", type: "static_content" } },
            { overlay_id: "caption:me_anh_me_ngu", source: "remote", caption: { background: { colors: ["#C4C8EF", "#DED3F4", "#EBCDE4"] }, icon: { data: "💤", type: "emoji" }, max_lines: 1, text: "mê anh hơn mê ngủ", text_color: "#4F4770", type: "static_content" } },
            { overlay_id: "caption:be_be_can_do", source: "remote", caption: { background: { colors: ["#FF8FAB", "#FFC2D1", "#FFE5EC"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "em bé cần được dỗ", text_color: "#812D4A", type: "static_content" } },
            { overlay_id: "caption:iu_thi_noi", source: "remote", caption: { background: { colors: ["#FFD166", "#FFE8A3", "#FFF3D0"] }, icon: { data: "🤭", type: "emoji" }, max_lines: 1, text: "iu thì nói, đừng có ngại", text_color: "#704510", type: "static_content" } },
            { overlay_id: "caption:iu_hong_thi_bao", source: "remote", caption: { background: { colors: ["#FF6B6B", "#FF9999", "#FFD1C9"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "iu hong thì bảo", text_color: "#812626", type: "static_content" } },
            { overlay_id: "caption:anh_thuong_em", source: "remote", caption: { background: { colors: ["#A0C4FF", "#BDE0FE", "#DFF3FF"] }, icon: { data: "🥹", type: "emoji" }, max_lines: 1, text: "anh có thương em thiệt hong", text_color: "#23466F", type: "static_content" } },
            { overlay_id: "caption:yeu_em_nhiem_vu", source: "remote", caption: { background: { colors: ["#B7E4C7", "#D8F3DC", "#F0FFF1"] }, icon: { data: "🫡", type: "emoji" }, max_lines: 1, text: "yêu em là nhiệm vụ cả đời", text_color: "#24563A", type: "static_content" } },
            { overlay_id: "caption:crush_nhin", source: "remote", caption: { background: { colors: ["#CDB4DB", "#E2CFEA", "#F3E5F5"] }, icon: { data: "🫠", type: "emoji" }, max_lines: 1, text: "crush nhìn em một cái là xong", text_color: "#593B68", type: "static_content" } },
            { overlay_id: "caption:ngoai_le_cua_em", source: "remote", caption: { background: { colors: ["#80CBC4", "#B2DFDB", "#E0F2F1"] }, icon: { data: "🫶", type: "emoji" }, max_lines: 1, text: "anh là ngoại lệ của em", text_color: "#205953", type: "static_content" } },
            { overlay_id: "caption:dang_ban_tuong_tu", source: "remote", caption: { background: { colors: ["#1A2980", "#26D0CE"] }, icon: { data: "💭", type: "emoji" }, max_lines: 1, text: "Đang bận tương tư", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:minh_cuoi_nhau", source: "remote", caption: { background: { colors: ["#F0B8CD", "#F7D4DF", "#E7C9EF"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "hông ấy mình cưới nhau đi", text_color: "#70465B", type: "static_content" } },
            { overlay_id: "caption:wedding_time", source: "remote", caption: { background: { colors: ["#FFE4E1", "#E73C7E"] }, icon: { data: "💍", type: "emoji" }, max_lines: 1, text: "Wedding Time!", text_color: "#FFFFFFE6", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Gen Z & Xéo xắt 💅",
          items: [
            { overlay_id: "caption:feeling_cute", source: "remote", caption: { background: { colors: ["#F8BBD0", "#E91E63"] }, icon: { data: "🌷", type: "emoji" }, max_lines: 1, text: "Feeling Cute", text_color: "#FFFFFFE5", type: "static_content" } },
            { overlay_id: "caption:cutie_pie", source: "remote", caption: { background: { colors: ["#FFDEE9", "#FFB6C1", "#FF9AA2"] }, icon: { data: "🎀", type: "emoji" }, max_lines: 1, text: "Cutie Pie 🌸", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:ngoan_xinh_iu", source: "remote", caption: { background: { colors: ["#F3C1D4", "#F8DDE5", "#E8CFF0"] }, icon: { data: "💗", type: "emoji" }, max_lines: 1, text: "ngoan xinh iu của ai đây", text_color: "#71465D", type: "static_content" } },
            { overlay_id: "caption:xinh_dep_tuyet_voi", source: "remote", caption: { background: { colors: ["#FC5C7D", "#6A82FB"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "Xinh đẹp tuyệt vời", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:hom_nay_slay", source: "remote", caption: { background: { colors: ["#C5B5E8", "#DDD0F2", "#F0C9DD"] }, icon: { data: "sparkles", type: "sf_symbol", color: "#514368" }, max_lines: 1, text: "hôm nay cũng slay", text_color: "#514368", type: "static_content" } },
            { overlay_id: "caption:tinh_hoa_hoi_tu", source: "remote", caption: { background: { colors: ["#FFD700", "#FF8C00"] }, icon: { data: "wand.and.sparkles", type: "sf_symbol", color: "#000000E6" }, max_lines: 1, text: "Tinh hoa hội tụ", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:xinh_gai_an_phim_1", source: "remote", caption: { background: { colors: ["#F77062", "#FE5196"] }, icon: { data: "💅", type: "emoji" }, max_lines: 1, text: "Xinh gái ấn phím 1", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:dep_trai_co_gi_sai", source: "remote", caption: { background: { colors: ["#FF5722", "#FFC107"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "Đẹp trai có gì sai", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:vibe_khong_phai_ai", source: "remote", caption: { background: { colors: ["#80D8FF", "#A0F0E0", "#D9FFF5"] }, icon: { data: "🪩", type: "emoji" }, max_lines: 1, text: "vibe này ko phải ai cũng có", text_color: "#174C58", type: "static_content" } },
            { overlay_id: "caption:ba_khi", source: "remote", caption: { background: { colors: ["#8EACCD", "#B5C8DE", "#D7C7E6"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "bá khí ngang ngược", text_color: "#35475D", type: "static_content" } },
            { overlay_id: "caption:flex_den_hoi_tho_cuoi", source: "remote", caption: { background: { colors: ["#00BFA5", "#64E8C8", "#C4FFF0"] }, icon: { data: "💎", type: "emoji" }, max_lines: 1, text: "Flex đến hơi thở cuối", text_color: "#064D43", type: "static_content" } },
            { overlay_id: "caption:hon_hom_qua", source: "remote", caption: { background: { colors: ["#B9D7D0", "#D6E6D7", "#E8DFC6"] }, icon: { data: "🫶", type: "emoji" }, max_lines: 1, text: "tui không hơn ai, tui hơn hôm qua", text_color: "#3F554E", type: "static_content" } },
            { overlay_id: "caption:khong_vua_long", source: "remote", caption: { background: { colors: ["#D5A64B", "#E8C979", "#FFF0BF"] }, icon: { data: "😌", type: "emoji" }, max_lines: 1, text: "sống sao cho vừa lòng thiên hạ? thôi khỏi", text_color: "#594015", type: "static_content" } },
            { overlay_id: "caption:che_manh", source: "remote", caption: { background: { colors: ["#FF4E50", "#F9D423"] }, icon: { data: "👎", type: "emoji" }, max_lines: 1, text: "Chê mạnh", text_color: "#FFFFFF", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Meme & Hài hước 🤡",
          items: [
            { overlay_id: "caption:cuoi_vcl_m_oi", source: "remote", caption: { background: { colors: ["#F7971E", "#FFD200", "#FFEE58"] }, icon: { data: "😂", type: "emoji" }, max_lines: 1, text: "Cười vcl m oi", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:cuoi_xiu", source: "remote", caption: { background: { colors: ["#FFEB3B", "#FF9800"] }, icon: { data: "😎", type: "emoji" }, max_lines: 1, text: "Cười xỉu", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:hong_drama", source: "remote", caption: { background: { colors: ["#8A2387", "#E94057", "#F27121"] }, icon: { data: "🍿", type: "emoji" }, max_lines: 1, text: "Hóng drama", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:check_var", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "📺", type: "emoji" }, max_lines: 1, text: "Check VAR liền", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:co_bien_co_bien", source: "remote", caption: { background: { colors: ["#FF512F", "#F09819", "#FFD200"] }, icon: { data: "light.beacon.max.fill", type: "sf_symbol", color: "#FFFFFFE6" }, max_lines: 1, text: "Có biến có biến", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:so_ho_la_bao", source: "remote", caption: { background: { colors: ["#F5B8A9", "#F6D0B2", "#E8BFCB"] }, icon: { data: "🚨", type: "emoji" }, max_lines: 1, text: "sơ hở là báo", text_color: "#713F40", type: "static_content" } },
            { overlay_id: "caption:chay_ngay_di", source: "remote", caption: { background: { colors: ["#D31027", "#EA384D"] }, icon: { data: "🏃💨", type: "emoji" }, max_lines: 1, text: "Chạy ngay đi", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:con_cai_nit", source: "remote", caption: { background: { colors: ["#D7CCC8", "#8D6E63"] }, icon: { data: "🧶", type: "emoji" }, max_lines: 1, text: "còn cái nịt", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:hay_ra_de_qua_a", source: "remote", caption: { background: { colors: ["#FFF59D", "#80DEEA"] }, icon: { data: "🥺", type: "emoji" }, max_lines: 1, text: "Hay ra dẻ quá à!", text_color: "#000000E6", type: "static_content" } },
            { overlay_id: "caption:ai_muon", source: "remote", caption: { background: { colors: ["#FF6B35", "#FF9F1C", "#FFE0A3"] }, icon: { data: "🤨", type: "emoji" }, max_lines: 1, text: "ủa rồi ai mượn?", text_color: "#6B2814", type: "static_content" } },
            { overlay_id: "caption:be_hong_sai", source: "remote", caption: { background: { colors: ["#F4A7C3", "#FFD1DC", "#FFF0F3"] }, icon: { data: "😌", type: "emoji" }, max_lines: 1, text: "bé hông có sai, tại đời sai", text_color: "#802D50", type: "static_content" } },
            { overlay_id: "caption:xin_vinh_biet_cu", source: "remote", caption: { background: { colors: ["#232526", "#414345"] }, icon: { data: "🕯️", type: "emoji" }, max_lines: 1, text: "Xin vĩnh biệt cụ", text_color: "#FFFFFFE6", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Bất ổn & Hết cứu 🫠",
          items: [
            { overlay_id: "caption:bat_on_that_su", source: "remote", caption: { background: { colors: ["#636363", "#A2AB58"] }, icon: { data: "🫠", type: "emoji" }, max_lines: 1, text: "Bất ổn thật sự", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:nay_la_het_cuu", source: "remote", caption: { background: { colors: ["#607D8B", "#455A64"] }, icon: { data: "bolt.badge.xmark", type: "sf_symbol", color: "#FFFFFFE6" }, max_lines: 1, text: "Này là hết cứu", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:toi_cong_chuyen", source: "remote", caption: { background: { colors: ["#F2B5A7", "#F6D1B5", "#E9C2D5"] }, icon: { data: "💀", type: "emoji" }, max_lines: 1, text: "tới công chuyện nữa rồi", text_color: "#634044", type: "static_content" } },
            { overlay_id: "caption:xiu_ngang", source: "remote", caption: { background: { colors: ["#C0B7E5", "#D8D0F0", "#EACDE2"] }, icon: { data: "💀", type: "emoji" }, max_lines: 1, text: "xĩu ngang xĩu dọc", text_color: "#504567", type: "static_content" } },
            { overlay_id: "caption:bat_luc", source: "remote", caption: { background: { colors: ["#2C3E50", "#3498DB"] }, icon: { data: "🏳️", type: "emoji" }, max_lines: 1, text: "Bất lực", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:nao_bao_tri", source: "remote", caption: { background: { colors: ["#B8E0D2", "#D8EAD8", "#C9D9F0"] }, icon: { data: "🧠", type: "emoji" }, max_lines: 1, text: "não đang bảo trì", text_color: "#35564F", type: "static_content" } },
            { overlay_id: "caption:overthinking_vai_chuong", source: "remote", caption: { background: { colors: ["#2C3E50", "#4CA1AF"] }, icon: { data: "🤯", type: "emoji" }, max_lines: 1, text: "Overthinking vai chưởng", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:tram_cam_nhe", source: "remote", caption: { background: { colors: ["#1F1C2C", "#928DAB"] }, icon: { data: "🫠", type: "emoji" }, max_lines: 1, text: "Trầm cảm nhẹ", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:ai_cuu_tui", source: "remote", caption: { background: { colors: ["#F0B6B6", "#F5D0C3", "#E8C6DE"] }, icon: { data: "sos", type: "sf_symbol", color: "#6A4248" }, max_lines: 1, text: "òi ai cứu tui", text_color: "#6A4248", type: "static_content" } },
            { overlay_id: "caption:da_xem_chua_rep", source: "remote", caption: { background: { colors: ["#2979FF", "#64B5F6", "#BBDEFB"] }, icon: { data: "📱", type: "emoji" }, max_lines: 1, text: "đã xem, chưa rep, đã đau", text_color: "#15345C", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Deadline & Tiền bạc 💸",
          items: [
            { overlay_id: "caption:deadline_ruot", source: "remote", caption: { background: { colors: ["#ED213A", "#93291E"] }, icon: { data: "🔥", type: "emoji" }, max_lines: 1, text: "Deadline dí tụt quần", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:di_lam_vi_dam_me", source: "remote", caption: { background: { colors: ["#FDC830", "#F37335"] }, icon: { data: "🤡", type: "emoji" }, max_lines: 1, text: "Đi làm vì đam mê", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:tien_dau_ma_tieu", source: "remote", caption: { background: { colors: ["#11998E", "#38EF7D"] }, icon: { data: "💸", type: "emoji" }, max_lines: 1, text: "Tiền đâu mà tiêu", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:doc_so_tai_khoan", source: "remote", caption: { background: { colors: ["#1E90FF", "#00D4FF"] }, icon: { data: "💳", type: "emoji" }, max_lines: 1, text: "đọc số tài khoản", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:co_tien_noi_tiep", source: "remote", caption: { background: { colors: ["#075E54", "#16A085", "#B7E4C7"] }, icon: { data: "💸", type: "emoji" }, max_lines: 1, text: "có tiền thì nói chuyện tiếp", text_color: "#FFFFFF", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Daily & Đời sống ☕",
          items: [
            { overlay_id: "caption:ngay_moi_vui_ve", source: "remote", caption: { background: { colors: ["#FFB703", "#FFD166", "#FFF0A8"] }, icon: { data: "☀️", type: "emoji" }, max_lines: 1, text: "Ngày mới vui vẻ", text_color: "#69420A", type: "static_content" } },
            { overlay_id: "caption:coffee_time", source: "remote", caption: { background: { colors: ["#4E342E", "#8D6E63"] }, icon: { data: "☕", type: "emoji" }, max_lines: 1, text: "Coffee Time!", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:matcha_latte", source: "remote", caption: { background: { colors: ["#C8E6C9", "#A5D6A7", "#81C784"] }, icon: { data: "🍃", type: "emoji" }, max_lines: 1, text: "Matcha Latte 🍵", text_color: "#1B5E20E6", type: "static_content" } },
            { overlay_id: "caption:an_com_chua", source: "remote", caption: { background: { colors: ["#FF9800", "#F57C00"] }, icon: { data: "🍽️", type: "emoji" }, max_lines: 1, text: "Ăn cơm chưa?", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:bien_oiiii", source: "remote", caption: { background: { colors: ["#56CFE1", "#72EFDD", "#B8F3FF"] }, icon: { data: "🌊", type: "emoji" }, max_lines: 1, text: "Biển ơiiii", text_color: "#124559", type: "static_content" } },
            { overlay_id: "caption:night_vibes", source: "remote", caption: { background: { colors: ["#B993D6", "#8CA6DB", "#C9B1FF"] }, icon: { data: "🪐", type: "emoji" }, max_lines: 1, text: "Night Vibes 🌌", text_color: "#FFFFFFE6", type: "static_content" } },
            { overlay_id: "caption:ngu_ngon", source: "remote", caption: { background: { colors: ["#3F51B5", "#1A237E"] }, icon: { data: "moon.zzz.fill", type: "sf_symbol", color: "#FFFFFFE6" }, max_lines: 1, text: "Ngủ ngon", text_color: "#FFFFFFE6", type: "static_content" } }
          ]
        },
        {
          section: "🎨 Chứng nhận của Locket",
          items: [
            { overlay_id: "caption:locket_cuti", source: "remote", caption: { background: { colors: ["#35B5E8", "#19A1D8"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn cutii", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:locket_xinh", source: "remote", caption: { background: { colors: ["#FFD45C", "#F5B91E"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn xjnh gái", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:locket_dep", source: "remote", caption: { background: { colors: ["#258DEB", "#1672D4"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Locket xác nhận bạn đẹp chai", text_color: "#FFFFFF", type: "static_content" } },
            { overlay_id: "caption:be_ngoan", source: "remote", caption: { background: { colors: ["#E9B9C5", "#D9A4B3"] }, icon: { data: "checkmark.seal.fill", type: "sf_symbol" }, max_lines: 1, text: "Đã xác nhận bạn là bé ngoan", text_color: "#FFFFFF", type: "static_content" } }
          ]
        }
      ])
    });

    return $done({ body: JSON.stringify(obj) });
  } catch (err) {
    return $done({});
  }
})();

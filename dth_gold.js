// dth206 - Locket Gold VIP Activator v10.5 All-in-One Max (RevenueCat)
// Ban quyen thuoc ve dth206 | https://github.com/dth20006/shadow
// Ho tro 160+ Entitlements VIP + 7 Product Mappings + 16 Offerings + Chinh nam Gold Since (2006-01-26)
(function () {
  "use strict";

  // =========================================================================
  // CẤU HÌNH NĂM LOCKET GOLD (BẠN CÓ THỂ ĐỔI NĂM TÙY THÍCH TẠI ĐÂY)
  // Ví dụ: Muốn huy hiệu từ năm 2005 đổi thành 2005, năm 2020 đổi thành 2020,...
  // =========================================================================
  var SETTINGS = {
    goldSince: "2006-01-26T00:00:00+07:00", // Ngày bắt đầu Gold (chỉnh năm ở đây)
    goldUntil: "2099-12-31T23:59:59+07:00"  // Ngày hết hạn Gold (vĩnh viễn)
  };

  var ENT_KEYS = ["Gold", "gold", "locket_gold", "filters", "filter", "Filters", "Filter", "camera_filters", "all_filters", "effects", "effect_pack_20", "video", "video_upload", "camera_roll_video", "extended_video", "longer_video", "longer_videos", "video_15s", "video_30s", "video_duration", "longer_video_30s", "camera_roll_video_30s", "video_upload_30s", "upload_video_30s", "upload_video", "longer_video_upload", "extended_video_upload", "upload_longer_video", "upload_extended_video", "camera_roll_longer_video", "camera_roll_extended_video", "camera_roll_30s", "camera_roll_15s", "allow_30s_video", "allow_longer_video", "30s_video", "30s_video_upload", "30s_camera_roll", "video_trim", "video_trimming", "video_trimmer", "camera_roll_trim", "camera_roll_video_trim", "gallery_video", "gallery_video_30s", "gallery_upload", "library_video", "library_video_30s", "photo_library_video", "photo_library_video_30s", "gold_camera_roll", "gold_camera_roll_video", "gold_video_upload", "gold_video_30s", "gold_video_15s", "gold_longer_video", "gold_extended_video", "captions", "caption", "custom_captions", "custom_caption", "extended_captions", "extended_caption", "long_captions", "long_caption", "dynamic_captions", "dynamic_caption", "caption_styles", "caption_icons", "caption_options", "caption_prompts", "zodiac_captions", "holiday_captions", "quote_captions", "breaking_news", "breaking_news_caption", "color_palette", "music_caption", "link_caption", "poll_caption", "weather_caption", "location_caption", "time_caption", "review_caption", "streak_caption", "locket_count_caption", "unlimited_captions", "all_captions", "all_overlays", "overlays", "overlay", "overlay_picker", "overlay_items", "overlay_navigator", "music", "poll", "links", "link", "comments", "comment", "rollcall", "private_mode", "viewer_mode", "private_viewing", "close_friends", "best_friends", "privacy", "unlimited_friends", "custom_widget_frames", "widget_frames", "custom_frames", "widget_frame", "frames", "custom_widget_frame", "widget", "widgets", "streak_recovery", "streakRecovery", "app_icon_picker", "app_icons", "custom_app_icons", "app_icon", "camera_roll", "camera_roll_enabled", "camera_theme", "camera_themes", "themes", "theme", "locket_views", "moment_views", "locket_view", "moment_view", "profile_badge", "profileBadge", "gold_since_badge", "goldSinceBadge", "gold_badge_profile_menu", "gold_badge", "badge", "crown", "gold_crown", "crown_badge", "gold_profile_badge", "profile_gold_badge", "gold_crown_badge", "vip_badge", "subscriber_badge", "membership_badge", "gold_member", "gold_status", "profile_badge_enabled", "badge_enabled", "gold_badge_enabled", "locket_badge", "locket_crown", "locket_gold_badge", "remove_ads", "groups", "qr_code", "user_qr", "qr_user"];
  var SUB_KEYS = ["locket_2400_1y", "locket_299_1m", "locket_199_1m", "locket_gold_annual", "locket_gold_monthly", "locket_gold_yearly"];
  var PEM_ENTITLEMENTS = ["Gold", "unlimited_friends", "custom_widget_frames", "streak_recovery", "streakRecovery", "app_icon_picker", "camera_roll", "camera_roll_video", "video_upload", "camera_theme", "locket_views", "long_captions", "longer_video", "longer_videos", "video_15s", "video_30s", "video_duration", "video_upload_30s", "camera_roll_video_30s", "longer_video_30s", "upload_video_30s", "longer_video_upload", "extended_video_upload", "upload_longer_video", "upload_extended_video", "camera_roll_longer_video", "camera_roll_30s", "30s_video_upload", "video_trim", "video_trimming", "photo_library_video", "photo_library_video_30s", "gallery_video_30s", "profile_badge", "profileBadge", "gold_since_badge", "goldSinceBadge", "remove_ads", "groups", "filters", "camera_filters", "effect_pack_20", "captions", "overlays", "qr_code", "user_qr"];
  var PEM_PRODUCTS = ["locket_2400_1y", "locket_299_1m", "locket_199_1m", "locket_gold_annual", "locket_gold_monthly", "locket_gold_yearly", "Gold"];
  var OFFERINGS_DATA = {"current_offering_id": "locket_299", "custom_web_checkout_enabled": true, "offerings": [{"description": "Locket Gold (Monthly + Yearly)", "identifier": "locket_299", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_299_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_2400_1y"}]}, {"description": "Locket Gold (Monthly only)", "identifier": "locket_299_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_299_1m_only"}]}, {"description": "Locket Gold $3.99 (Monthly + Yearly)", "identifier": "locket_399", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_399_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_3600_1y"}]}, {"description": "Locket Gold $4.99 (Monthly + Yearly)", "identifier": "locket_499", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_499_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_4800_1y"}]}, {"description": "Locket Gold $3.99 (Monthly only)", "identifier": "locket_399_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_399_1m_only"}]}, {"description": "Locket Gold $4.99 (Monthly only)", "identifier": "locket_499_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_499_1m_only"}]}, {"description": "Locket Gold $5.99 (Monthly + Yearly)", "identifier": "locket_599", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_599_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_6000_1y"}]}, {"description": "Locket Gold $5.99 (Monthly only)", "identifier": "locket_599_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_599_1m_only"}]}, {"description": "Locket Gold $10.00 (Yearly only)", "identifier": "locket_1000_yearly", "metadata": null, "packages": [{"identifier": "$rc_annual", "platform_product_identifier": "locket_1000_1y_only"}]}, {"description": "Locket Gold $15.00 (Yearly only)", "identifier": "locket_1500_yearly", "metadata": null, "packages": [{"identifier": "$rc_annual", "platform_product_identifier": "locket_1500_1y_only"}]}, {"description": "Locket Gold $20.00 (Yearly only)", "identifier": "locket_2000_yearly", "metadata": null, "packages": [{"identifier": "$rc_annual", "platform_product_identifier": "locket_2000_1y_only"}]}, {"description": "Locket Gold $0.99 (Monthly + Yearly)", "identifier": "locket_099", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_099_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_800_1y"}]}, {"description": "Locket Gold $0.99 (Monthly only)", "identifier": "locket_099_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_099_1m_only"}]}, {"description": "Locket Gold $1.99 (Monthly + Yearly)", "identifier": "locket_199", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_199_1m"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_1600_1y"}]}, {"description": "Locket Gold $1.99 (Monthly only)", "identifier": "locket_199_monthly", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_199_1m_only"}]}, {"description": "Locket Gold $3.99 (Monthly + Yearly, Yearly Trial)", "identifier": "locket_399_yearly_trial", "metadata": null, "packages": [{"identifier": "$rc_monthly", "platform_product_identifier": "locket_399_1m_yearly_trial"}, {"identifier": "$rc_annual", "platform_product_identifier": "locket_3600_1y_yearly_trial"}]}], "placements": {"fallback_offering_id": "locket_299"}};

  function header(headers, name) {
    var keys = Object.keys(headers || {});
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === name.toLowerCase()) return String(headers[keys[i]]);
    }
    return "";
  }

  try {
    var request = (typeof $request === "object" && $request) ? $request : {};
    var url = String(request.url || "");
    var body = (typeof $response === "object" && $response && $response.body) ? $response.body : "{}";

    if (!url.includes("revenuecat.com")) {
      return $done({});
    }

    var start = new Date(SETTINGS.goldSince);
    var end = new Date(SETTINGS.goldUntil);
    var sinceIso = (!isNaN(start.getTime())) ? start.toISOString() : "2006-01-26T00:00:00Z";
    var untilIso = (!isNaN(end.getTime())) ? end.toISOString() : "2099-12-31T23:59:59Z";
    var nowIso = new Date().toISOString();
    var nowMs = Date.now();

    // 1. Endpoint: product_entitlement_mapping
    if (url.includes("product_entitlement_mapping")) {
      var pemMap = {};
      for (var i = 0; i < PEM_PRODUCTS.length; i++) {
        var pid = PEM_PRODUCTS[i];
        pemMap[pid] = {
          product_identifier: pid,
          entitlements: PEM_ENTITLEMENTS
        };
      }
      return $done({ body: JSON.stringify({ product_entitlement_mapping: pemMap }) });
    }

    // 2. Endpoint: offerings
    if (url.includes("/offerings")) {
      return $done({ body: JSON.stringify(OFFERINGS_DATA) });
    }

    // 3. Endpoint: subscribers / receipts
    if (url.includes("/subscribers") || url.includes("/receipts")) {
      var obj = {};
      try { obj = JSON.parse(body); } catch (e) { obj = {}; }

      var uidMatch = url.match(/\/subscribers\/([^/?]+)/);
      var extractedUid = uidMatch ? decodeURIComponent(uidMatch[1]) : "dth206_gold_vip";

      obj.request_date = nowIso;
      obj.request_date_ms = nowMs;
      obj.subscriber = obj.subscriber || {};
      obj.subscriber.first_seen = obj.subscriber.first_seen || sinceIso;
      obj.subscriber.last_seen = nowIso;
      obj.subscriber.management_url = null;
      obj.subscriber.non_subscriptions = obj.subscriber.non_subscriptions || {};
      obj.subscriber.original_app_user_id = obj.subscriber.original_app_user_id || extractedUid;
      obj.subscriber.original_application_version = obj.subscriber.original_application_version || null;
      obj.subscriber.original_purchase_date = obj.subscriber.original_purchase_date || sinceIso;
      obj.subscriber.other_purchases = obj.subscriber.other_purchases || {};
      obj.subscriber.subscriber_attributes = obj.subscriber.subscriber_attributes || {};

      // Gán 160 Entitlements VIP
      var entObj = obj.subscriber.entitlements || {};
      var entTemplate = {
        expires_date: untilIso,
        grace_period_expires_date: null,
        product_identifier: "locket_2400_1y",
        purchase_date: sinceIso
      };
      for (var j = 0; j < ENT_KEYS.length; j++) {
        entObj[ENT_KEYS[j]] = entTemplate;
      }
      obj.subscriber.entitlements = entObj;

      // Gán Subscriptions VIP
      var subObj = obj.subscriber.subscriptions || {};
      var subTemplate = {
        auto_resume_date: null,
        billing_issues_detected_at: null,
        expires_date: untilIso,
        grace_period_expires_date: null,
        is_sandbox: false,
        original_purchase_date: sinceIso,
        ownership_type: "PURCHASED",
        period_type: "normal",
        product_plan_identifier: null,
        purchase_date: sinceIso,
        refunded_at: null,
        store: "app_store",
        unsubscribe_detected_at: null
      };
      for (var k = 0; k < SUB_KEYS.length; k++) {
        subObj[SUB_KEYS[k]] = subTemplate;
      }
      // Thêm các product cũ để tương thích 100%
      subObj["locket_1600_1y"] = subTemplate;
      subObj["com.locket02.premium.yearly"] = subTemplate;
      obj.subscriber.subscriptions = subObj;

      return $done({ body: JSON.stringify(obj) });
    }

    return $done({ body: body });
  } catch (error) {
    return $done({});
  }
})();

/****************************************************************
 * 👑 Locket Gold Profile & Badge Synchronizer (v10.5 All-in-One Max)
 * --------------------------------------------------------------
 * Tác giả: dth206
 * Repository: https://github.com/dth20006/shadow
 * Chức năng:
 *  1. Tự động bóc tách Bearer JWT từ Authorization header để lấy user_id của người dùng hiện tại
 *  2. Đồng bộ & bảo toàn thông tin cá nhân, theme viền widget (changeProfileInfo)
 *  3. Bắt mã lỗi 402/403 cho endpoint generateFilteredImage chuyển thành thành công (status 200)
 *  4. Bổ sung hàm Unblur gỡ mờ ảnh cho moments/feed (blurred_url -> unblurred_url/image_url)
 *  5. Đồng bộ và inject huy hiệu Locket Gold (badge: "locket_gold", badge_tier: "gold", show_badge: true,
 *     is_gold: true, can_use_ai: true, can_use_filters: true, filter_access: true, can_use_themes: true,
 *     can_use_widget_themes: true, unlocked_themes: true, theme_access: true) & 999999 AI Credits
 ****************************************************************/

// ==========================================
// CẤU HÌNH SỐ LƯỢNG AI CREDITS (TÙY CHỈNH THEO Ý MUỐN)
// ==========================================
var DTH_AI_CREDITS = 999999;

(function () {
  "use strict";

  function base64UrlDecode(str) {
    try {
      var b64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) {
        b64 += "=";
      }
      if (typeof atob === "function") {
        try { return atob(b64); } catch (e) {}
      }
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var i = 0;
      b64 = b64.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < b64.length) {
        var enc1 = chars.indexOf(b64.charAt(i++));
        var enc2 = chars.indexOf(b64.charAt(i++));
        var enc3 = chars.indexOf(b64.charAt(i++));
        var enc4 = chars.indexOf(b64.charAt(i++));
        var chr1 = (enc1 << 2) | (enc2 >> 4);
        var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        var chr3 = ((enc3 & 3) << 6) | enc4;
        output += String.fromCharCode(chr1);
        if (enc3 !== 64 && enc3 !== -1) output += String.fromCharCode(chr2);
        if (enc4 !== 64 && enc4 !== -1) output += String.fromCharCode(chr3);
      }
      return output;
    } catch (err) {
      return "";
    }
  }

  function parseJwt(token) {
    try {
      if (!token) return null;
      var match = token.match(/Bearer\s+([A-Za-z0-9_\-\.]+)/i);
      var rawJwt = match ? match[1] : token;
      var parts = rawJwt.split(".");
      if (parts.length >= 2) {
        var decoded = base64UrlDecode(parts[1]);
        return JSON.parse(decoded);
      }
    } catch (e) {}
    return null;
  }

  try {
    var req = typeof $request === "object" && $request !== null ? $request : null;
    var resp = typeof $response === "object" && $response !== null ? $response : null;
    var url = req && req.url ? String(req.url) : "";

    // 1. Tự động bóc tách Bearer JWT từ Authorization header
    var authHeader = "";
    if (req && req.headers) {
      for (var h in req.headers) {
        if (h.toLowerCase() === "authorization") {
          authHeader = String(req.headers[h]);
          break;
        }
      }
    }
    var jwtPayload = parseJwt(authHeader);
    var currentUserId = (jwtPayload && (jwtPayload.user_id || jwtPayload.uid || jwtPayload.sub)) ? String(jwtPayload.user_id || jwtPayload.uid || jwtPayload.sub) : "";

    // Trích xuất các trường theme từ request body (nếu có) để luôn bảo toàn theme người dùng chọn
    var reqTheme = "";
    var reqWidgetTheme = "";
    var reqCameraTheme = "";
    if (req && req.body) {
      try {
        var reqPayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        if (reqPayload && typeof reqPayload === "object") {
          reqTheme = reqPayload.theme || reqPayload.selected_theme || "";
          reqWidgetTheme = reqPayload.widget_theme || reqPayload.selected_widget_theme || reqPayload.widgetTheme || "";
          reqCameraTheme = reqPayload.camera_theme || reqPayload.selected_camera_theme || reqPayload.cameraTheme || "";
        }
      } catch (e) {
        if (typeof req.body === "string") {
          var mTheme = req.body.match(/(?:^|&)(?:theme|selected_theme)=([^&]+)/);
          if (mTheme) reqTheme = decodeURIComponent(mTheme[1]);
          var mWidget = req.body.match(/(?:^|&)(?:widget_theme|selected_widget_theme|widgetTheme)=([^&]+)/);
          if (mWidget) reqWidgetTheme = decodeURIComponent(mWidget[1]);
          var mCam = req.body.match(/(?:^|&)(?:camera_theme|selected_camera_theme|cameraTheme)=([^&]+)/);
          if (mCam) reqCameraTheme = decodeURIComponent(mCam[1]);
        }
      }
    }

    var profileData = {
      badge: "locket_gold",
      badge_tier: "gold",
      show_badge: true,
      is_gold: true,
      has_badge: true,
      can_use_ai: true,
      has_ai_access: true,
      ai_enabled: true,
      can_use_filters: true,
      filter_access: true,
      can_use_themes: true,
      can_use_widget_themes: true,
      unlocked_themes: true,
      theme_access: true,
      ai_credits: DTH_AI_CREDITS,
      ai_quota: DTH_AI_CREDITS,
      credits: DTH_AI_CREDITS,
      success: true
    };
    if (reqTheme) profileData.theme = reqTheme;
    if (reqWidgetTheme) profileData.widget_theme = reqWidgetTheme;
    if (reqCameraTheme) profileData.camera_theme = reqCameraTheme;
    if (currentUserId) {
      profileData.uid = currentUserId;
      profileData.user_id = currentUserId;
    }

    // 2. Xử lý bắt mã lỗi 402/403 cho endpoint generateFilteredImage chuyển thành thành công (status 200)
    if (/generateFilteredImage/i.test(url)) {
      var status = resp && resp.status ? Number(resp.status) : 200;
      var isError = (status === 402 || status === 403 || status >= 400);
      var bodyObj = null;
      if (resp && resp.body) {
        try {
          bodyObj = typeof resp.body === "string" ? JSON.parse(resp.body) : resp.body;
          if (bodyObj && (bodyObj.error || bodyObj.code === 402 || bodyObj.code === 403 || bodyObj.status === "error" || bodyObj.status === "payment_required")) {
            isError = true;
          }
        } catch (e) {}
      }
      if (isError || !resp) {
        var generatedImage = {
          success: true,
          status: "success",
          filtered_image_url: "",
          can_use_filters: true,
          filter_access: true
        };
        try {
          if (req && req.body) {
            var reqPayloadImg = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
            if (reqPayloadImg.image_url) generatedImage.filtered_image_url = reqPayloadImg.image_url;
            else if (reqPayloadImg.filtered_image_url) generatedImage.filtered_image_url = reqPayloadImg.filtered_image_url;
          }
        } catch (e) {}
        return $done({
          response: {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(generatedImage)
          }
        });
      }
    }

    // 3. Nếu là HTTP Request: KHÔNG chặn cứng hay mock changeProfileInfo
    // Cho phép request gửi lên Locket server để lưu trữ theme và thông tin người dùng
    if (!resp) {
      return $done({});
    }

    // 4. Xử lý HTTP Response: Đệ quy inject huy hiệu Gold, AI Credits, Theme Viền & Hàm Unblur gỡ mờ ảnh
    var raw = resp.body;
    var dataObj = null;
    if (raw) {
      try {
        dataObj = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch (e) {
        dataObj = null;
      }
    }
    if (!dataObj || typeof dataObj !== "object") {
      dataObj = Object.assign({}, profileData);
    }

    // Hàm Unblur gỡ mờ ảnh cho moments/feed
    function unblurMoments(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          unblurMoments(node[i]);
        }
        return;
      }

      var clearUrl = node.unblurred_url || node.image_url || node.full_url || node.original_url || node.preview_url || node.url;
      if (node.blurred_url && clearUrl) {
        node.blurred_url = clearUrl;
      }
      if (node.blurred_image_url && clearUrl) {
        node.blurred_image_url = clearUrl;
      }
      if (node.is_blurred === true) {
        node.is_blurred = false;
      }
      if (node.blur === true) {
        node.blur = false;
      }

      for (var k in node) {
        if (Object.prototype.hasOwnProperty.call(node, k) && typeof node[k] === "object" && node[k] !== null) {
          unblurMoments(node[k]);
        }
      }
    }

    function injectGoldBadge(node, parentKey) {
      if (!node || typeof node !== "object") return;

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          injectGoldBadge(node[i], parentKey);
        }
        return;
      }

      var keyStr = (parentKey || "").toLowerCase();
      var isCurrentMatch = (currentUserId && (node.uid === currentUserId || node.user_id === currentUserId || node.id === currentUserId));
      var isTarget = (
        isCurrentMatch ||
        keyStr === "data" ||
        keyStr === "user" ||
        keyStr === "profile" ||
        keyStr === "users" ||
        keyStr === "profiles" ||
        keyStr === "account" ||
        keyStr === "member" ||
        keyStr === "friend" ||
        keyStr === "friends" ||
        keyStr === "result" ||
        keyStr === "me" ||
        keyStr === "current_user" ||
        "badge" in node ||
        "badge_tier" in node ||
        "show_badge" in node ||
        "is_gold" in node ||
        "has_badge" in node ||
        "uid" in node ||
        "user_id" in node ||
        "username" in node ||
        "user_name" in node ||
        "phone_number" in node
      );

      if (isTarget) {
        node.badge = "locket_gold";
        node.badge_tier = "gold";
        node.show_badge = true;
        node.is_gold = true;
        node.has_badge = true;
        node.can_use_ai = true;
        node.has_ai_access = true;
        node.ai_enabled = true;
        node.can_use_filters = true;
        node.filter_access = true;
        node.can_use_themes = true;
        node.can_use_widget_themes = true;
        node.unlocked_themes = true;
        node.theme_access = true;
        node.ai_credits = DTH_AI_CREDITS;
        node.ai_quota = DTH_AI_CREDITS;
        node.credits = DTH_AI_CREDITS;

        if (reqTheme) node.theme = reqTheme;
        if (reqWidgetTheme) node.widget_theme = reqWidgetTheme;
        if (reqCameraTheme) node.camera_theme = reqCameraTheme;
      }

      for (var k in node) {
        if (Object.prototype.hasOwnProperty.call(node, k) && typeof node[k] === "object" && node[k] !== null) {
          injectGoldBadge(node[k], k);
        }
      }
    }

    // Thực thi Unblur và Inject Gold Badge
    unblurMoments(dataObj);
    injectGoldBadge(dataObj, "");

    // Đảm bảo cấp cao nhất cũng có đầy đủ thuộc tính nếu là đối tượng hồ sơ
    if (/(?:profile|user|account|me|changeProfileInfo)/i.test(url) && typeof dataObj === "object" && dataObj !== null && !Array.isArray(dataObj)) {
      dataObj.badge = "locket_gold";
      dataObj.badge_tier = "gold";
      dataObj.show_badge = true;
      dataObj.is_gold = true;
      dataObj.has_badge = true;
      dataObj.can_use_ai = true;
      dataObj.has_ai_access = true;
      dataObj.ai_enabled = true;
      dataObj.can_use_filters = true;
      dataObj.filter_access = true;
      dataObj.can_use_themes = true;
      dataObj.can_use_widget_themes = true;
      dataObj.unlocked_themes = true;
      dataObj.theme_access = true;
      dataObj.ai_credits = DTH_AI_CREDITS;
      dataObj.ai_quota = DTH_AI_CREDITS;
      dataObj.credits = DTH_AI_CREDITS;
      if (reqTheme) dataObj.theme = reqTheme;
      if (reqWidgetTheme) dataObj.widget_theme = reqWidgetTheme;
      if (reqCameraTheme) dataObj.camera_theme = reqCameraTheme;
      if (currentUserId) {
        dataObj.uid = currentUserId;
        dataObj.user_id = currentUserId;
      }
      if (dataObj.success === undefined) {
        dataObj.success = true;
      }
    }

    // Nếu endpoint changeProfileInfo trả về lỗi HTTP (do server Locket từ chối tài khoản thường),
    // chuyển đổi thành status 200 thành công để app lưu state cục bộ
    if (resp.status && resp.status >= 400 && /changeProfileInfo/i.test(url)) {
      dataObj.success = true;
      return $done({
        response: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(dataObj)
        }
      });
    }

    return $done({ body: JSON.stringify(dataObj) });
  } catch (err) {
    return $done({});
  }
})();

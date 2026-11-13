/****************************************************************
 * 👑 Locket Gold Profile & Badge Synchronizer (v10.5 All-in-One Max)
 * --------------------------------------------------------------
 * Tác giả: dth206
 * Repository: https://github.com/dth20006/shadow
 * Chức năng:
 *  1. Tự động bóc tách Bearer JWT từ Authorization header để lấy user_id của người dùng hiện tại
 *  2. Giả lập thành công HTTP Request đổi thông tin & huy hiệu (changeProfileInfo)
 *  3. Bắt mã lỗi 402/403 cho endpoint generateFilteredImage chuyển thành thành công (status 200)
 *  4. Bổ sung hàm Unblur gỡ mờ ảnh cho moments/feed (blurred_url -> unblurred_url/image_url)
 *  5. Đồng bộ và inject huy hiệu Locket Gold (badge: "locket_gold", badge_tier: "gold", show_badge: true,
 *     is_gold: true, can_use_ai: true, can_use_filters: true, filter_access: true) & 999999 AI Credits
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
      ai_credits: DTH_AI_CREDITS,
      ai_quota: DTH_AI_CREDITS,
      credits: DTH_AI_CREDITS,
      success: true
    };
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
            var reqPayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
            if (reqPayload.image_url) generatedImage.filtered_image_url = reqPayload.image_url;
            else if (reqPayload.filtered_image_url) generatedImage.filtered_image_url = reqPayload.filtered_image_url;
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

    // 3. Xử lý endpoint /changeProfileInfo hoặc các yêu cầu thông tin hồ sơ dạng request
    if (/changeProfileInfo/i.test(url) || (!resp && /(?:changeProfileInfo|profile|user|account)/i.test(url))) {
      var mockData = {
        data: profileData,
        result: profileData,
        user: profileData,
        profile: profileData,
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
        ai_credits: DTH_AI_CREDITS,
        ai_quota: DTH_AI_CREDITS,
        credits: DTH_AI_CREDITS,
        success: true
      };
      if (currentUserId) {
        mockData.uid = currentUserId;
        mockData.user_id = currentUserId;
      }

      if (!resp || /changeProfileInfo/i.test(url)) {
        return $done({
          response: {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(mockData)
          }
        });
      }
    }

    // 4. Xử lý HTTP Response: Đệ quy inject huy hiệu Gold, AI Credits & Hàm Unblur gỡ mờ ảnh
    if (resp && resp.body) {
      var raw = resp.body;
      var dataObj = typeof raw === "string" ? JSON.parse(raw) : raw;

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
          node.ai_credits = DTH_AI_CREDITS;
          node.ai_quota = DTH_AI_CREDITS;
          node.credits = DTH_AI_CREDITS;
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
      if (/(?:profile|user|account|me)/i.test(url) && typeof dataObj === "object" && dataObj !== null && !Array.isArray(dataObj)) {
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
        dataObj.ai_credits = DTH_AI_CREDITS;
        dataObj.ai_quota = DTH_AI_CREDITS;
        dataObj.credits = DTH_AI_CREDITS;
        if (currentUserId) {
          dataObj.uid = currentUserId;
          dataObj.user_id = currentUserId;
        }
      }

      return $done({ body: JSON.stringify(dataObj) });
    }

    return $done({});
  } catch (err) {
    return $done({});
  }
})();

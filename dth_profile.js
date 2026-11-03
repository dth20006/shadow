/****************************************************************
 * 👑 Locket Gold Profile & Badge Synchronizer (v9.0)
 * --------------------------------------------------------------
 * Tác giả: dth206
 * Repository: https://github.com/dth20006/shadow
 * Chức năng:
 *  1. Giả lập thành công HTTP Request đổi thông tin & huy hiệu (changeProfileInfo)
 *  2. Tự động đồng bộ và inject huy hiệu Locket Gold & AI Credits vĩnh viễn vào
 *     tất cả đối tượng Profile / User / Data của api.locketcamera.com
 ****************************************************************/

// ==========================================
// CẤU HÌNH SỐ LƯỢNG AI CREDITS (TÙY CHỈNH THEO Ý MUỐN)
// ==========================================
var DTH_AI_CREDITS = 999999;

(function () {
  "use strict";

  try {
    var req = typeof $request === "object" && $request !== null ? $request : null;
    var resp = typeof $response === "object" && $response !== null ? $response : null;
    var url = req && req.url ? String(req.url) : "";

    var profileData = {
      badge: "gold",
      badge_tier: "gold",
      is_gold: true,
      has_badge: true,
      can_use_ai: true,
      has_ai_access: true,
      ai_enabled: true,
      ai_credits: DTH_AI_CREDITS,
      ai_quota: DTH_AI_CREDITS,
      credits: DTH_AI_CREDITS,
      success: true
    };

    // 1. Xử lý endpoint /changeProfileInfo hoặc các yêu cầu thông tin hồ sơ dạng request
    if (/changeProfileInfo/i.test(url) || (!resp && /(?:changeProfileInfo|profile|user|account)/i.test(url))) {
      var mockData = {
        data: profileData,
        result: profileData,
        user: profileData,
        profile: profileData,
        badge: "gold",
        badge_tier: "gold",
        is_gold: true,
        has_badge: true,
        can_use_ai: true,
        has_ai_access: true,
        ai_enabled: true,
        ai_credits: DTH_AI_CREDITS,
        ai_quota: DTH_AI_CREDITS,
        credits: DTH_AI_CREDITS,
        success: true
      };

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

    // 2. Xử lý HTTP Response: Đệ quy inject huy hiệu Gold & AI Credits vào user/profile/data
    if (resp && resp.body) {
      var raw = resp.body;
      var dataObj = typeof raw === "string" ? JSON.parse(raw) : raw;

      function injectGoldBadge(node, parentKey) {
        if (!node || typeof node !== "object") return;

        if (Array.isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            injectGoldBadge(node[i], parentKey);
          }
          return;
        }

        var keyStr = (parentKey || "").toLowerCase();
        var isTarget = (
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
          "is_gold" in node ||
          "has_badge" in node ||
          "uid" in node ||
          "user_id" in node ||
          "username" in node ||
          "user_name" in node ||
          "phone_number" in node
        );

        if (isTarget) {
          node.badge = "gold";
          node.badge_tier = "gold";
          node.is_gold = true;
          node.has_badge = true;
          node.can_use_ai = true;
          node.has_ai_access = true;
          node.ai_enabled = true;
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

      injectGoldBadge(dataObj, "");

      // Đảm bảo cấp cao nhất cũng có đầy đủ thuộc tính nếu là đối tượng hồ sơ
      if (/(?:profile|user|account|me)/i.test(url) && typeof dataObj === "object" && dataObj !== null && !Array.isArray(dataObj)) {
        dataObj.badge = "gold";
        dataObj.badge_tier = "gold";
        dataObj.is_gold = true;
        dataObj.has_badge = true;
        dataObj.can_use_ai = true;
        dataObj.has_ai_access = true;
        dataObj.ai_enabled = true;
        dataObj.ai_credits = DTH_AI_CREDITS;
        dataObj.ai_quota = DTH_AI_CREDITS;
        dataObj.credits = DTH_AI_CREDITS;
      }

      return $done({ body: JSON.stringify(dataObj) });
    }

    return $done({});
  } catch (err) {
    return $done({});
  }
})();

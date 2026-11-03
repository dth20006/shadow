/***********************************************
> dth - Locket Gold Activator (RevenueCat)
> Author: dth206
> Repository: https://github.com/dth20006/shadow
> Chức năng: Mở khóa gói Locket Gold vĩnh viễn (9999)
***********************************************/
(function () {
  "use strict";
  try {
    if (typeof $response === "undefined" || !$response || typeof $response.body !== "string") {
      return $done({});
    }

    var obj;
    try {
      obj = JSON.parse($response.body);
    } catch (e) {
      return $done({});
    }

    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      return $done({});
    }

    obj.Attention = "👑 Locket Gold VIP - Kích hoạt thành công bởi dth206!";
    var purchaseDate = "2020-01-01T10:10:14Z";
    var expiresDate = "9999-12-31T23:59:59Z";

    var locketSub1 = {
      auto_resume_date: null,
      display_name: "locket_1600_1y",
      is_sandbox: false,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      management_url: "https://apps.apple.com/account/subscriptions",
      period_type: "normal",
      price: {
        amount: 399000.0,
        currency: "VND"
      },
      expires_date: expiresDate,
      grace_period_expires_date: null,
      refunded_at: null,
      unsubscribe_detected_at: null,
      original_purchase_date: purchaseDate,
      purchase_date: purchaseDate,
      store: "app_store",
      store_transaction_id: "2000001108724193"
    };

    var locketSub2 = Object.assign({}, locketSub1, {
      display_name: "com.locket02.premium.yearly",
      store_transaction_id: "2000001108724194"
    });

    var entGold = {
      grace_period_expires_date: null,
      purchase_date: purchaseDate,
      original_purchase_date: purchaseDate,
      product_identifier: "locket_1600_1y",
      expires_date: expiresDate,
      ownership_type: "PURCHASED",
      store: "app_store"
    };

    var entPro = {
      grace_period_expires_date: null,
      purchase_date: purchaseDate,
      original_purchase_date: purchaseDate,
      product_identifier: "com.locket02.premium.yearly",
      expires_date: expiresDate,
      ownership_type: "PURCHASED",
      store: "app_store"
    };

    obj.subscriber = obj.subscriber || {};
    obj.subscriber.first_seen = purchaseDate;
    obj.subscriber.original_purchase_date = purchaseDate;
    obj.subscriber.management_url = "https://apps.apple.com/account/subscriptions";
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};
    obj.subscriber.other_purchases = obj.subscriber.other_purchases || {};

    // Kích hoạt tất cả các subscriptions & entitlements
    obj.subscriber.subscriptions["locket_1600_1y"] = locketSub1;
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locketSub2;
    obj.subscriber.subscriptions["locket_gold_yearly"] = locketSub1;
    obj.subscriber.subscriptions["locket_gold"] = locketSub1;

    obj.subscriber.entitlements["Gold"] = entGold;
    obj.subscriber.entitlements["pro"] = entPro;
    obj.subscriber.entitlements["vip"] = entGold;
    obj.subscriber.entitlements["VIP"] = entGold;
    obj.subscriber.entitlements["locket_gold"] = entGold;
    obj.subscriber.entitlements["premium"] = entPro;
    obj.subscriber.entitlements["camera_filters"] = entGold;
    obj.subscriber.entitlements["holiday_effects"] = entGold;

    return $done({ body: JSON.stringify(obj) });
  } catch (err) {
    return $done({});
  }
})();

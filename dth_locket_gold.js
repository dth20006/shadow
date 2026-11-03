/***********************************************
> dth - Locket Gold VIP RevenueCat Unlock
> Author: dth206
> Repository: https://github.com/dth20006/shadow
***********************************************/
(function () {
  "use strict";

  try {
    if (typeof $response === "undefined" || !$response.body) {
      return $done({});
    }

    var obj = {};
    try {
      obj = JSON.parse($response.body);
    } catch (e) {
      return $done({});
    }

    obj.Attention = "Locket Gold VIP - Kích hoạt thành công bởi dth206!";

    var purchaseDate = "2020-01-01T10:10:14Z";
    var expiresDate = "9999-12-31T23:59:59Z";
    var PRODUCT_ID = "locket_1600_1y";

    var locketSub = {
      auto_resume_date: null,
      display_name: PRODUCT_ID,
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

    var locketGold = {
      grace_period_expires_date: null,
      purchase_date: purchaseDate,
      original_purchase_date: purchaseDate,
      product_identifier: PRODUCT_ID,
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

    obj.subscriber.subscriptions[PRODUCT_ID] = locketSub;
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locketSub;

    obj.subscriber.entitlements["Gold"] = locketGold;
    obj.subscriber.entitlements["gold"] = locketGold;
    obj.subscriber.entitlements["pro"] = locketGold;
    obj.subscriber.entitlements["ai_features"] = locketGold;
    obj.subscriber.entitlements["locket_gold"] = locketGold;
    obj.subscriber.entitlements["vip"] = locketGold;

    return $done({ body: JSON.stringify(obj) });
  } catch (err) {
    return $done({});
  }
})();

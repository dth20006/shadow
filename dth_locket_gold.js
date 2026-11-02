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

    var obj;
    try {
      obj = JSON.parse($response.body);
    } catch (e) {
      return $done({});
    }

    if (!obj || typeof obj !== "object") return $done({});

    obj.Attention = "Chúc mừng bạn đã mở khóa Locket Gold bởi dth206!";

    var FAR_FUTURE = "9999-12-31T23:59:59Z";
    var PAST = "2020-01-01T00:00:00Z";
    var PRODUCT_ID = "locket_1600_1y";

    var subscriptionData = {
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
      expires_date: FAR_FUTURE,
      grace_period_expires_date: null,
      refunded_at: null,
      unsubscribe_detected_at: null,
      original_purchase_date: PAST,
      purchase_date: PAST,
      store: "app_store",
      store_transaction_id: "2000001108724193"
    };

    var entitlementData = {
      grace_period_expires_date: null,
      purchase_date: PAST,
      product_identifier: PRODUCT_ID,
      expires_date: FAR_FUTURE
    };

    obj.subscriber = obj.subscriber || {};
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};

    // Kích hoạt trọn bộ product và entitlement để tương thích mọi phiên bản Locket
    obj.subscriber.subscriptions[PRODUCT_ID] = subscriptionData;
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = subscriptionData;

    obj.subscriber.entitlements["Gold"] = entitlementData;
    obj.subscriber.entitlements["pro"] = entitlementData;

    return $done({ body: JSON.stringify(obj) });
  } catch (err) {
    return $done({});
  }
})();

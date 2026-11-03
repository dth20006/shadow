// dth206 - Locket Gold VIP Activator (RevenueCat)
// Ban quyen thuoc ve dth206 | https://github.com/dth20006/shadow
(function () {
  "use strict";

  var SETTINGS = {
    goldSince: "2005-11-01T00:00:00+07:00",
    goldUntil: "2099-12-31T23:59:59+07:00"
  };

  function header(headers, name) {
    var keys = Object.keys(headers || {});
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === name.toLowerCase()) return String(headers[keys[i]]);
    }
    return "";
  }
  function record(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  try {
    var request = typeof $request === "object" ? $request : {};
    var url = String(request.url || "");
    var ua = header(request.headers, "user-agent");
    if (!/Locket/i.test(ua) ||
        !/^https:\/\/api\.revenuecat\.com\/v1\/(?:receipts|subscribers\/[^/?]+)\/?(?:\?.*)?$/.test(url)) {
      return $done({});
    }
    if (typeof $response !== "object" || typeof $response.body !== "string") return $done({});
    var payload = JSON.parse($response.body);
    if (!record(payload) || !record(payload.subscriber)) return $done({});
    var subscriber = payload.subscriber;
    if ((subscriber.subscriptions !== undefined && !record(subscriber.subscriptions)) ||
        (subscriber.entitlements !== undefined && !record(subscriber.entitlements))) return $done({});

    var start = new Date(SETTINGS.goldSince);
    var end = new Date(SETTINGS.goldUntil);
    if (!isFinite(start.getTime()) || !isFinite(end.getTime()) || end <= start) return $done({});
    var since = start.toISOString();
    var until = end.toISOString();
    subscriber.subscriptions = subscriber.subscriptions || {};
    subscriber.entitlements = subscriber.entitlements || {};

    var tiers = [
      { product: "locket_1600_1y", entitlement: "Gold" },
      { product: "com.locket02.premium.yearly", entitlement: "pro" }
    ];

    tiers.forEach(function (t) {
      var oldSub = subscriber.subscriptions[t.product];
      subscriber.subscriptions[t.product] = Object.assign({}, record(oldSub) ? oldSub : {}, {
        auto_resume_date: null,
        billing_issues_detected_at: null,
        expires_date: until,
        grace_period_expires_date: null,
        is_sandbox: true,
        original_purchase_date: since,
        ownership_type: "PURCHASED",
        period_type: "normal",
        purchase_date: since,
        refunded_at: null,
        store: "app_store",
        unsubscribe_detected_at: null
      });

      var oldEnt = subscriber.entitlements[t.entitlement];
      subscriber.entitlements[t.entitlement] = Object.assign({}, record(oldEnt) ? oldEnt : {}, {
        product_identifier: t.product,
        purchase_date: since,
        expires_date: until,
        grace_period_expires_date: null
      });
    });

    return $done({ body: JSON.stringify(payload) });
  } catch (error) {
    return $done({});
  }
})();

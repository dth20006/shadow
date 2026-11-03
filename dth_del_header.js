// dth206 - RevenueCat Request Header Optimizer
// Ban quyen thuoc ve dth206 | https://github.com/dth20006/shadow
(function () {
  "use strict";
  try {
    var request = typeof $request === "object" ? $request : {};
    var headers = request.headers || {};
    var keys = Object.keys(headers);
    var ua = "";
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === "user-agent") ua = String(headers[keys[i]]);
    }
    if (!/Locket/i.test(ua) ||
        !/^https:\/\/api\.revenuecat\.com\/v1\/(?:receipts|subscribers\/[^/?]+)\/?(?:\?.*)?$/.test(String(request.url || ""))) {
      return $done({});
    }
    var output = Object.assign({}, headers);
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j].toLowerCase();
      if (k === "x-revenuecat-etag" || k === "if-none-match") delete output[keys[j]];
    }
    return $done({ headers: output });
  } catch (error) {
    return $done({});
  }
})();

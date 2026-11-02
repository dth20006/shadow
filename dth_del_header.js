/***********************************************
> dth - RevenueCat Header Cleaner & US Geo Spoof
> Author: dth206
> Repository: https://github.com/dth20006/shadow
***********************************************/
(function () {
  "use strict";
  try {
    var req = typeof $request === "object" ? $request : {};
    var headers = Object.assign({}, req.headers || {});
    var keys = Object.keys(headers);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i].toLowerCase();
      if (k === "x-revenuecat-etag" || k === "if-none-match") {
        delete headers[keys[i]];
      }
    }

    headers["X-Forwarded-For"] = "8.8.8.8";
    headers["CF-Connecting-IP"] = "8.8.8.8";
    headers["True-Client-IP"] = "8.8.8.8";
    headers["Fastly-Client-IP"] = "8.8.8.8";
    headers["X-Real-IP"] = "8.8.8.8";
    headers["CF-IPCountry"] = "US";

    return $done({ headers: headers });
  } catch (e) {
    return $done({});
  }
})();

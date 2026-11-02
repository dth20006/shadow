/***********************************************
> dth - Delete RevenueCat ETag Header
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
    $done({ headers: headers });
  } catch (err) {
    $done({});
  }
})();

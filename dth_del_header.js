// dth206 - Request Header Optimizer v10.5 All-in-One Max
// Xóa ETag / If-None-Match / If-Modified-Since / x-goog-if-none-match để ép RevenueCat và Firebase luôn trả về HTTP 200 kèm đầy đủ JSON
// Bản quyền thuộc về dth206 | https://github.com/dth20006/shadow

(function () {
  "use strict";

  try {
    var request = (typeof $request === "object" && $request) ? $request : {};
    var headers = request.headers || {};
    var modified = Object.assign({}, headers);

    function setEmptyOrDelete(key) {
      var lower = key.toLowerCase();
      var found = false;
      for (var k in modified) {
        if (k.toLowerCase() === lower) {
          modified[k] = "";
          delete modified[k];
          found = true;
        }
      }
    }

    // Xóa toàn bộ các header gây cache 304
    var targets = [
      "x-revenuecat-etag",
      "if-none-match",
      "if-modified-since",
      "x-goog-if-none-match"
    ];

    for (var i = 0; i < targets.length; i++) {
      setEmptyOrDelete(targets[i]);
    }

    modified["Cache-Control"] = "no-cache";
    modified["Pragma"] = "no-cache";

    return $done({ headers: modified });
  } catch (error) {
    return $done({});
  }
})();

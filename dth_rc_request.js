// dth206 - Firebase Remote Config Request Optimizer
// Ban quyen thuoc ve dth206 | https://github.com/dth20006/shadow
(function () {
  "use strict";
  try {
    var req = typeof $request === "object" ? $request : {};
    var url = String(req.url || "");
    var target = /^https:\/\/firebaseremoteconfig\.googleapis\.com\/v1\/projects\/(?:locket-4252a|locket-camera)\/namespaces\/firebase:fetch(?:\?|$)/;

    if (!target.test(url)) return $done({});
    if (req.method !== "POST") return $done({});

    var headers = Object.assign({}, req.headers || {});
    var keys = Object.keys(headers);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === "if-none-match") {
        delete headers[keys[i]];
      }
    }

    var decoded;
    try {
      decoded = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (e) {}

    if (decoded && typeof decoded === "object" && !Array.isArray(decoded)) {
      var body = Object.assign({}, decoded);
      body.country_code = "us";
      body.time_zone = "America/New_York";
      return $done({ body: JSON.stringify(body), headers: headers });
    }

    return $done({ headers: headers });
  } catch (err) {
    return $done({});
  }
})();

/***********************************************
> dth - Delete RevenueCat ETag & Cache Header
> Author: dth206
> Repository: https://github.com/dth20006/shadow
***********************************************/
function setHeaderValue(e, a, d) {
    var r = a.toLowerCase();
    r in e ? (e[r] = d) : (e[a] = d);
}
var modifiedHeaders = $request.headers || {};
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
setHeaderValue(modifiedHeaders, "x-revenuecat-etag", "");
setHeaderValue(modifiedHeaders, "If-None-Match", "");
setHeaderValue(modifiedHeaders, "if-none-match", "");
$done({ headers: modifiedHeaders });

/***********************************************
> dth - Locket Profile & Gold Badge Keeper
> Author: dth206
> Repository: https://github.com/dth20006/shadow
> Chức năng: Kích hoạt & duy trì huy hiệu Locket Gold vĩnh viễn trên trang cá nhân
***********************************************/
const url = $request ? $request.url : '';

function injectBadge(obj) {
    if (!obj || typeof obj !== 'object') return;

    if ('badge' in obj || 'badge_tier' in obj || 'is_gold' in obj || 'user_name' in obj || 'phone_number' in obj) {
        obj.badge = "locket_gold";
        obj.badge_tier = "gold";
        obj.is_gold = true;
        obj.has_badge = true;
    }

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] === 'object' && obj[key] !== null) {
            injectBadge(obj[key]);
        }
    }
}

// 1. Khi app gửi request đổi thông tin cá nhân (changeProfileInfo)
if (url.includes("changeProfileInfo")) {
    $done({
        response: {
            status: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                data: {
                    badge: "locket_gold",
                    badge_tier: "gold",
                    is_gold: true,
                    has_badge: true,
                    success: true
                },
                result: {
                    badge: "locket_gold",
                    badge_tier: "gold",
                    is_gold: true,
                    has_badge: true,
                    success: true
                }
            })
        }
    });
} else {
    // 2. Chặn các response lấy profile / user info từ api.locketcamera.com
    let body = $response ? $response.body : null;
    if (body) {
        try {
            let obj = JSON.parse(body);
            injectBadge(obj);
            body = JSON.stringify(obj);
        } catch (e) {}
    }
    $done({ body: body });
}

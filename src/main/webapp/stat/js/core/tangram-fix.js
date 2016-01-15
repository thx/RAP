(function () {
    if (window.baidu == null) return;

    // fix baidu.ajax
    var baidu_ajax_get = baidu.ajax.get;
    baidu.ajax.get = function (url, func) {
        var seed = new Date().getTime();
        url += (url.indexOf("?") == -1 ? "?seed" : "&seed") + "=" + seed;
        baidu_ajax_get(url, func);
    };

    var baidu_ajax_post = baidu.ajax.post;
    baidu.ajax.post = function (url, q, func) {
        var seed = new Date().getTime();
        q = ((q == null || baidu.trim(q).length == 0) ? "" : (q + "&")) + "seed" + "=" + seed;
        baidu_ajax_post(url, q, func);
    };

})();

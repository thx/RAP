var baidu = baidu || {version: "1-1-0"};
baidu.ajax = baidu.ajax || {};
baidu.ajax.form = function (a, d) {
    d = d || {};
    var h = a.elements, p = h.length, c = a.getAttribute("method"), g = a.getAttribute("action"), v = d.replacer || function (x, w) {
            return x
        }, s = {}, u = [], n, r, t, o, f, j, k, m, l;

    function q(w, x) {
        u.push(w + "=" + x)
    }

    for (n in d) {
        if (d.hasOwnProperty(n)) {
            s[n] = d[n]
        }
    }
    for (n = 0; n < p; n++) {
        r = h[n];
        o = r.name;
        if (!r.disabled && o) {
            t = r.type;
            f = r.value;
            switch (t) {
                case"radio":
                case"checkbox":
                    if (!r.checked) {
                        break
                    }
                case"textarea":
                case"text":
                case"password":
                case"hidden":
                case"select-one":
                    q(o, v(f, o));
                    break;
                case"select-multiple":
                    j = r.options;
                    m = j.length;
                    for (k = 0; k < m; k++) {
                        l = j[k];
                        if (l.selected) {
                            q(o, v(l.value, o))
                        }
                    }
                    break
            }
        }
    }
    s.data = u.join("&");
    s.method = a.getAttribute("method") || "POST";
    return baidu.ajax.request(g, s)
};
baidu.ajax.get = function (c, a) {
    return baidu.ajax.request(c, {onsuccess: a})
};
baidu.ajax.post = function (c, d, a) {
    return baidu.ajax.request(c, {onsuccess: a, method: "POST", data: d})
};
baidu.ajax.request = function (f, r) {
    function m() {
        if (q.readyState == 4) {
            try {
                var t = q.status
            } catch (s) {
                g("failure");
                return
            }
            g(t);
            if ((t >= 200 && t < 300) || t == 304 || t == 1223) {
                g("success")
            } else {
                g("failure")
            }
            window.setTimeout(function () {
                q.onreadystatechange = new Function();
                if (j) {
                    q = null
                }
            }, 0)
        }
    }

    function d() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (s) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (s) {
                }
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }

    function g(t) {
        t = "on" + t;
        var s = c[t], u = baidu.ajax[t];
        if (s) {
            if (t != "onsuccess") {
                s(q)
            } else {
                s(q, q.responseText)
            }
        } else {
            if (u) {
                if (t == "onsuccess") {
                    return
                }
                u(q)
            }
        }
    }

    r = r || {};
    var l = r.data || "", j = !(r.async === false), k = r.username || "", p = r.password || "", a = (r.method || "GET").toUpperCase(), h = r.headers || {}, c = {}, o, q;
    for (o in r) {
        c[o] = r[o]
    }
    h["X-Request-By"] = "baidu.ajax";
    try {
        q = d();
        if (a == "GET") {
            f += (f.indexOf("?") >= 0 ? "&" : "?");
            if (l) {
                f += l + "&";
                l = null
            }
            f += "b" + (new Date()).getTime() + "=1"
        }
        if (k) {
            q.open(a, f, j, k, p)
        } else {
            q.open(a, f, j)
        }
        if (j) {
            q.onreadystatechange = m
        }
        if (a == "POST") {
            q.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        for (o in h) {
            if (h.hasOwnProperty(o)) {
                q.setRequestHeader(o, h[o])
            }
        }
        g("beforerequest");
        q.send(l);
        if (!j) {
            m()
        }
    } catch (n) {
        g("failure")
    }
    return q
};
baidu.array = baidu.array || {};
baidu.array.each = function (h, f) {
    var d, g, c, a = h.length;
    if ("function" == typeof f) {
        for (c = 0; c < a; c++) {
            g = h[c];
            d = f.call(h, g, c);
            if (d === false) {
                break
            }
        }
    }
    return h
};
baidu.each = baidu.array.each;
baidu.array.filter = function (j, g) {
    var d = [], c = 0, a = j.length, h, f;
    if ("function" == typeof g) {
        for (f = 0; f < a; f++) {
            h = j[f];
            if (true === g.call(j, h, f)) {
                d[c++] = h
            }
        }
    }
    return d
};
baidu.array.find = function (g, d) {
    var f, c, a = g.length;
    if ("function" == typeof d) {
        for (c = 0; c < a; c++) {
            f = g[c];
            if (true === d.call(g, f, c)) {
                return f
            }
        }
    }
    return null
};
baidu.array.indexOf = function (f, g, c) {
    var a = f.length, d = g;
    c = Number(c) || 0;
    c = c < 0 ? Math.ceil(c) : Math.floor(c);
    c = Math.min(Math.max(c, 0), a);
    if ("function" != typeof g) {
        d = function (h) {
            return g === h
        }
    }
    for (; c < a; c++) {
        if (true === d.call(f, f[c], c)) {
            return c
        }
    }
    return -1
};
baidu.array.lastIndexOf = function (d, f) {
    var a = d.length, c = f;
    if ("function" != typeof f) {
        c = function (g) {
            return f === g
        }
    }
    while (a--) {
        if (true === c.call(d, d[a], a)) {
            return a
        }
    }
    return -1
};
baidu.array.remove = function (d, f) {
    var a = d.length, c = f;
    if ("function" != typeof f) {
        c = function (g) {
            return f === g
        }
    }
    while (a--) {
        if (true === c.call(d, d[a], a)) {
            d.splice(a, 1)
        }
    }
};
baidu.array.removeAt = function (c, a) {
    return c.splice(a, 1)[0]
};
baidu.array.unique = function (g, h) {
    var c = g.length, a = g.slice(0), f, d;
    if ("function" != typeof h) {
        h = function (k, j) {
            return k === j
        }
    }
    while (--c > 0) {
        d = a[c];
        f = c - 1;
        while (f--) {
            if (h(d, a[f])) {
                a.splice(c, 1);
                break
            }
        }
    }
    return a
};
baidu.browser = baidu.browser || {};
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = parseFloat(RegExp["\x241"])
}
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = parseFloat(RegExp["\x241"])
}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.ie = baidu.browser.ie = parseFloat(RegExp["\x241"])
}
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = parseFloat(RegExp["\x241"])
    }
} catch (e) {
}
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = parseFloat(RegExp["\x241"])
}
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    baidu.browser.safari = parseFloat(RegExp["\x241"])
}
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function (a) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
};
baidu.cookie.get = function (a) {
    var c = baidu.cookie.getRaw(a);
    if ("string" == typeof c) {
        c = decodeURIComponent(c);
        return c
    }
    return null
};
baidu.cookie.getRaw = function (c) {
    if (baidu.cookie._isValidKey(c)) {
        var d = new RegExp("(^| )" + c + "=([^;]*)(;|\x24)"), a = d.exec(document.cookie);
        if (a) {
            return a[2] || null
        }
    }
    return null
};
baidu.cookie.remove = function (a) {
    baidu.cookie.setRaw(a, "", {expires: new Date(0)})
};
baidu.cookie.set = function (c, d, a) {
    baidu.cookie.setRaw(c, encodeURIComponent(d), a)
};
baidu.cookie.setRaw = function (d, f, c) {
    if (!baidu.cookie._isValidKey(d)) {
        return
    }
    c = c || {};
    var a = c.expires;
    if ("number" == typeof c.expires) {
        a = new Date();
        a.setTime(a.getTime() + c.expires)
    }
    document.cookie = d + "=" + f + (c.path ? "; path=" + c.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (c.domain ? "; domain=" + c.domain : "") + (c.secure ? "; secure" : "")
};
baidu.date = baidu.date || {};
baidu.date.format = function (a, h) {
    if ("string" != typeof h) {
        return a.toString()
    }
    function f(o, n) {
        h = h.replace(o, n)
    }

    var c = baidu.number.pad, j = a.getFullYear(), g = a.getMonth() + 1, m = a.getDate(), k = a.getHours(), d = a.getMinutes(), l = a.getSeconds();
    f(/yyyy/g, c(j, 4));
    f(/yy/g, c(j.toString().slice(2), 2));
    f(/MM/g, c(g, 2));
    f(/M/g, g);
    f(/dd/g, c(m, 2));
    f(/d/g, m);
    f(/HH/g, c(k, 2));
    f(/H/g, k);
    f(/hh/g, c(k % 12, 2));
    f(/h/g, k % 12);
    f(/mm/g, c(d, 2));
    f(/m/g, d);
    f(/ss/g, c(l, 2));
    f(/s/g, l);
    return h
};
baidu.date.parse = function (f) {
    var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ("string" == typeof f) {
        if (a.test(f) || isNaN(Date.parse(f))) {
            var h = f.split(/ |T/), c = h.length > 1 ? h[1].split(/[^\d]/) : [0, 0, 0], g = h[0].split(/[^\d]/);
            return new Date(g[0] - 0, g[1] - 1, g[2] - 0, c[0] - 0, c[1] - 0, c[2] - 0)
        } else {
            return new Date(f)
        }
    }
    return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom._NAME_ATTRS = (function () {
    var a = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.browser.ie < 8) {
        a["for"] = "htmlFor";
        a["class"] = "className"
    } else {
        a.htmlFor = "for";
        a.className = "class"
    }
    return a
})();
baidu.dom._matchNode = function (a, d, f) {
    a = baidu.dom.g(a);
    for (var c = a[f]; c; c = c[d]) {
        if (c.nodeType == 1) {
            return c
        }
    }
    return null
};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function (d, f) {
        if (/color/i.test(d) && f.indexOf("rgb(") != -1) {
            var g = f.split(",");
            f = "#";
            for (var c = 0, a; a = g[c]; c++) {
                a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
                f += a.length == 1 ? "0" + a : a
            }
            f = f.toUpperCase()
        }
        return f
    }
};
baidu.dom._styleFilter.filter = function (c, g, h) {
    for (var a = 0, f = baidu.dom._styleFilter, d; d = f[a]; a++) {
        if (d = d[h]) {
            g = d(c, g)
        }
    }
    return g
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function (a, c) {
        if (c.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
            c = c + "px"
        }
        return c
    }
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 7 ? {
    set: function (a, c) {
        a = a.style;
        if (c == "inline-block") {
            a.display = "inline";
            a.zoom = 1
        } else {
            a.display = c
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (a, c) {
        a.style.display = c == "inline-block" ? "-moz-inline-box" : c
    }
} : null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function (a) {
        var c = a.style.filter;
        c && c.indexOf("opacity=") >= 0 ? (parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
    }, set: function (a, d) {
        var c = a.style;
        c.filter = (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (d == 1 ? "" : "alpha(opacity=" + d * 100 + ")");
        c.zoom = 1
    }
} : null;
baidu.dom._styleFixer.textOverflow = (function () {
    var c = {};

    function a(g) {
        var h = g.length;
        if (h > 0) {
            h = g[h - 1];
            g.length--
        } else {
            h = null
        }
        return h
    }

    function d(g, h) {
        g[baidu.browser.firefox ? "textContent" : "innerText"] = h
    }

    function f(q, k, u) {
        var m = baidu.browser.ie ? q.currentStyle || q.style : getComputedStyle(q, null), t = m.fontWeight, s = "font-family:" + m.fontFamily + ";font-size:" + m.fontSize + ";word-spacing:" + m.wordSpacing + ";font-weight:" + ((parseInt(t) || 0) == 401 ? 700 : t) + ";font-style:" + m.fontStyle + ";font-variant:" + m.fontVariant, g = c[s];
        if (!g) {
            m = q.appendChild(document.createElement("div"));
            m.style.cssText = "float:left;" + s;
            g = c[s] = [];
            for (p = 0; p < 256; p++) {
                p == 32 ? (m.innerHTML = "&nbsp;") : d(m, String.fromCharCode(p));
                g[p] = m.offsetWidth
            }
            d(m, "一");
            g[256] = m.offsetWidth;
            d(m, "一一");
            g[257] = m.offsetWidth - g[256] * 2;
            g[258] = g[".".charCodeAt(0)] * 3 + g[257] * 3;
            q.removeChild(m)
        }
        for (var n = q.firstChild, r = g[256], j = g[257], h = g[258], w = [], u = u ? h : 0; n; n = n.nextSibling) {
            if (k < u) {
                q.removeChild(n)
            } else {
                if (n.nodeType == 3) {
                    for (var p = 0, v = n.nodeValue, l = v.length; p < l; p++) {
                        m = v.charCodeAt(p);
                        w[w.length] = [k, n, p];
                        k -= (p ? j : 0) + (m < 256 ? g[m] : r);
                        if (k < u) {
                            break
                        }
                    }
                } else {
                    m = n.tagName;
                    if (m == "IMG" || m == "TABLE") {
                        m = n;
                        n = n.previousSibling;
                        q.removeChild(m)
                    } else {
                        w[w.length] = [k, n];
                        k -= n.offsetWidth
                    }
                }
            }
        }
        if (k < u) {
            while (m = a(w)) {
                k = m[0];
                n = m[1];
                m = m[2];
                if (n.nodeType == 3) {
                    if (k >= h) {
                        n.nodeValue = n.nodeValue.substring(0, m) + "...";
                        return true
                    } else {
                        if (!m) {
                            q.removeChild(n)
                        }
                    }
                } else {
                    if (f(n, k, true)) {
                        return true
                    } else {
                        q.removeChild(n)
                    }
                }
            }
            q.innerHTML = ""
        }
    }

    return {
        get: function (h, j) {
            var g = baidu.browser;
            return (g.opera ? j.OTextOverflow : g.firefox ? h._baiduOverflow : j.textOverflow) || "clip"
        }, set: function (h, k) {
            var g = baidu.browser;
            if (h.tagName == "TD" || h.tagName == "TH" || g.firefox) {
                h._baiduHTML && (h.innerHTML = h._baiduHTML);
                if (k == "ellipsis") {
                    h._baiduHTML = h.innerHTML;
                    var l = document.createElement("div"), j = h.appendChild(l).offsetWidth;
                    h.removeChild(l);
                    f(h, j)
                } else {
                    h._baiduHTML = ""
                }
            }
            l = h.style;
            g.opera ? (l.OTextOverflow = k) : g.firefox ? (h._baiduOverflow = k) : (l.textOverflow = k)
        }
    }
})();
baidu.dom.addClass = function (f, g) {
    f = baidu.dom.g(f);
    var c = baidu.string.trim, d = c(g).split(/\s+/), a = d.length;
    g = f.className.split(/\s+/).join(" ");
    while (a--) {
        (new RegExp("(^| )" + d[a] + "( |\x24)")).test(g) && d.splice(a, 1)
    }
    f.className = c(g + " " + d.join(" "));
    return f
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.children = function (c) {
    c = baidu.dom.g(c);
    for (var a = [], d = c.firstChild; d; d = d.nextSibling) {
        if (d.nodeType == 1) {
            a.push(d)
        }
    }
    return a
};
baidu.dom.contains = function (a, c) {
    var d = baidu.dom.g;
    a = d(a);
    c = d(c);
    return a.contains ? a != c && a.contains(c) : !!(a.compareDocumentPosition(c) & 16)
};
baidu.dom.first = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "firstChild")
};
baidu.dom.g = function (a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.getAncestorBy = function (a, c) {
    a = baidu.dom.g(a);
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (c(a)) {
            return a
        }
    }
    return null
};
baidu.dom.getAncestorByClass = function (a, c) {
    a = baidu.dom.g(a);
    c = new RegExp("(^|\\s)" + baidu.string.trim(c) + "(\\s|\x24)");
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (c.test(a.className)) {
            return a
        }
    }
    return null
};
baidu.dom.getAncestorByTag = function (c, a) {
    c = baidu.dom.g(c);
    a = a.toUpperCase();
    while ((c = c.parentNode) && c.nodeType == 1) {
        if (c.tagName == a) {
            return c
        }
    }
    return null
};
baidu.dom.getAttr = function (c, a) {
    c = baidu.dom.g(c);
    if ("style" == a) {
        return c.style.cssText
    }
    a = baidu.dom._NAME_ATTRS[a] || a;
    return c.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.getPosition = function (c) {
    var k = baidu.dom.getDocument(c), g = baidu.browser;
    c = baidu.dom.g(c);
    var d = g.isGecko > 0 && k.getBoxObjectFor && baidu.dom.getStyle(c, "position") == "absolute" && (c.style.top === "" || c.style.left === "");
    var j = {left: 0, top: 0};
    var h = (g.ie && !g.isStrict) ? k.body : k.documentElement;
    if (c == h) {
        return j
    }
    var l = null;
    var f;
    if (c.getBoundingClientRect) {
        f = c.getBoundingClientRect();
        j.left = Math.floor(f.left) + Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
        j.top = Math.floor(f.top) + Math.max(k.documentElement.scrollTop, k.body.scrollTop);
        j.left -= k.documentElement.clientLeft;
        j.top -= k.documentElement.clientTop;
        if (g.ie && !g.isStrict) {
            j.left -= 2;
            j.top -= 2
        }
    } else {
        if (k.getBoxObjectFor && !d) {
            f = k.getBoxObjectFor(c);
            var a = k.getBoxObjectFor(h);
            j.left = f.screenX - a.screenX;
            j.top = f.screenY - a.screenY
        } else {
            l = c;
            do {
                j.left += l.offsetLeft;
                j.top += l.offsetTop;
                if (g.isWebkit > 0 && baidu.dom.getStyle(l, "position") == "fixed") {
                    j.left += k.body.scrollLeft;
                    j.top += k.body.scrollTop;
                    break
                }
                l = l.offsetParent
            } while (l && l != c);
            if (g.opera > 0 || (g.isWebkit > 0 && baidu.dom.getStyle(c, "position") == "absolute")) {
                j.top -= k.body.offsetTop
            }
            l = c.offsetParent;
            while (l && l != k.body) {
                j.left -= l.scrollLeft;
                if (!b.opera || l.tagName != "TR") {
                    j.top -= l.scrollTop
                }
                l = l.offsetParent
            }
        }
    }
    return j
};
baidu.dom.getStyle = function (d, c) {
    var h = baidu.dom;
    d = h.g(d);
    c = baidu.string.toCamelCase(c);
    var g = d.style[c];
    if (!g) {
        var a = h._styleFixer[c], f = d.currentStyle || (baidu.browser.ie ? d.style : getComputedStyle(d, null));
        if ("string" == typeof a) {
            g = f[a]
        } else {
            if (a && a.get) {
                g = a.get(d, f)
            } else {
                g = f[c]
            }
        }
    }
    if (a = h._styleFilter) {
        g = a.filter(c, g, "get")
    }
    return g
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom.getWindow = function (a) {
    a = baidu.dom.g(a);
    var c = baidu.dom.getDocument(a);
    return c.parentWindow || c.defaultView || null
};
baidu.dom.hide = function (a) {
    a = baidu.dom.g(a);
    a.style.display = "none";
    return a
};
baidu.hide = baidu.dom.hide;
baidu.dom.insertAfter = function (f, d) {
    var c, a;
    c = baidu.dom.g;
    f = c(f);
    d = c(d);
    a = d.parentNode;
    if (a) {
        a.insertBefore(f, d.nextSibling)
    }
    return f
};
baidu.dom.insertBefore = function (f, d) {
    var c, a;
    c = baidu.dom.g;
    f = c(f);
    d = c(d);
    a = d.parentNode;
    if (a) {
        a.insertBefore(f, d)
    }
    return f
};
baidu.dom.insertHTML = function (g, a, f) {
    g = baidu.dom.g(g);
    if (g.insertAdjacentHTML) {
        g.insertAdjacentHTML(a, f)
    } else {
        var c = g.ownerDocument.createRange();
        c.setStartBefore(g);
        var d = c.createContextualFragment(f), j = g.parentNode, h;
        switch (a.toUpperCase()) {
            case"BEFOREBEGIN":
                j.insertBefore(d, g);
                break;
            case"AFTERBEGIN":
                g.insertBefore(d, g.firstChild);
                break;
            case"BEFOREEND":
                g.appendChild(d);
                break;
            case"AFTEREND":
                (h = g.nextSibling) ? j.insertBefore(d, h) : j.appendChild(d)
        }
    }
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.intersect = function (l, k) {
    var j = baidu.dom.g, h = baidu.dom.getPosition, a = Math.max, d = Math.min;
    l = j(l);
    k = j(k);
    var f = h(l), c = h(k);
    return a(f.left, c.left) <= d(f.left + l.offsetWidth, c.left + k.offsetWidth) && a(f.top, c.top) <= d(f.top + l.offsetHeight, c.top + k.offsetHeight)
};
baidu.dom.last = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "lastChild")
};
baidu.dom.next = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.prev = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
baidu.dom.q = function (k, g, c) {
    var l = [], f = baidu.string.trim, j, h, a, d;
    if (!(k = f(k))) {
        return null
    }
    if ("undefined" == typeof g) {
        g = document
    } else {
        g = baidu.dom.g(g);
        if (!g) {
            return l
        }
    }
    c && (c = f(c).toUpperCase());
    if (g.getElementsByClassName) {
        a = g.getElementsByClassName(k);
        j = a.length;
        for (h = 0; h < j; h++) {
            d = a[h];
            if (c && d.tagName != c) {
                continue
            }
            l[l.length] = d
        }
    } else {
        k = new RegExp("(^|\\s)" + baidu.string.escapeReg(k) + "(\\s|\x24)");
        a = c ? g.getElementsByTagName(c) : (g.all || g.getElementsByTagName("*"));
        j = a.length;
        for (h = 0; h < j; h++) {
            d = a[h];
            k.test(d.className) && (l[l.length] = d)
        }
    }
    return l
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.ready = function () {
    var d = false, g = false, f = [];

    function a() {
        if (!d) {
            d = true;
            for (var k = 0, h = f.length; k < h; k++) {
                try {
                    f[k]()
                } catch (l) {
                }
            }
        }
    }

    function c() {
        if (g) {
            return
        }
        g = true;
        var l = document, j = window, h = baidu.browser.opera;
        if (l.addEventListener && !h) {
            l.addEventListener("DOMContentLoaded", h ? function () {
                if (d) {
                    return
                }
                for (var m = 0; m < l.styleSheets.length; m++) {
                    if (l.styleSheets[m].disabled) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                }
                a()
            } : a, false)
        } else {
            if (baidu.browser.ie && j == top) {
                (function () {
                    if (d) {
                        return
                    }
                    try {
                        l.documentElement.doScroll("left")
                    } catch (m) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    a()
                })()
            } else {
                if (baidu.browser.safari) {
                    var k;
                    (function () {
                        if (d) {
                            return
                        }
                        if (l.readyState != "loaded" && l.readyState != "complete") {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        if (k === undefined) {
                            k = 0;
                            var p = l.getElementsByTagName("style");
                            var n = l.getElementsByTagName("link");
                            if (p) {
                                k += p.length
                            }
                            if (n) {
                                for (var o = 0, m = n.length; o < m; o++) {
                                    if (n[o].getAttribute("rel") == "stylesheet") {
                                        k++
                                    }
                                }
                            }
                        }
                        if (l.styleSheets.length != k) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        a()
                    })()
                }
            }
        }
        j.attachEvent ? j.attachEvent("onload", a) : j.addEventListener("load", a, false)
    }

    return function (h) {
        c();
        d ? h() : (f[f.length] = h)
    }
}();
baidu.dom.remove = function (a) {
    a = baidu.dom.g(a);
    if ("HTML BODY HEAD".indexOf(a.nodeName) == -1) {
        if (baidu.browser.ie) {
            var c = document.createElement("DIV");
            c.appendChild(a);
            c.innerHTML = ""
        } else {
            (c = a.parentNode) && c.removeChild(a)
        }
    }
};
baidu.dom.removeClass = function (c, d) {
    c = baidu.dom.g(c);
    var a = baidu.string.trim;
    c.className = a(c.className.split(/\s+/).join("  ").replace(new RegExp("(^| )(" + a(d).split(/\s+/).join("|") + ")( |\x24)", "g"), " ").replace(/\s+/g, " "));
    return c
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.setAttr = function (c, a, d) {
    c = baidu.dom.g(c);
    if ("style" == a) {
        c.style.cssText = d
    } else {
        a = baidu.dom._NAME_ATTRS[a] || a;
        c.setAttribute(a, d)
    }
    return c
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function (d, a) {
    d = baidu.dom.g(d);
    for (var c in a) {
        baidu.dom.setAttr(d, c, a[c])
    }
    return d
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.setStyle = function (d, c, f) {
    var g = baidu.dom, a;
    d = g.g(d);
    c = baidu.string.toCamelCase(c);
    if (a = g._styleFilter) {
        f = a.filter(c, f, "set")
    }
    a = g._styleFixer[c];
    (a && a.set) ? a.set(d, f) : (d.style[a || c] = f);
    return d
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.setStyles = function (c, d) {
    c = baidu.dom.g(c);
    for (var a in d) {
        baidu.dom.setStyle(c, a, d[a])
    }
    return c
};
baidu.setStyles = baidu.dom.setStyles;
baidu.dom.show = function (a) {
    a = baidu.dom.g(a);
    a.style.display = "";
    return a
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function (a) {
    a = baidu.dom.g(a);
    a.style.display = a.style.display == "none" ? "" : "none";
    return a
};
baidu.event = baidu.event || {};
baidu.event.EventArg = function (d, g) {
    g = g || window;
    d = d || g.event;
    var f = g.document;
    this.target = d.srcElement;
    this.keyCode = d.which;
    for (var a in d) {
        var c = d[a];
        if ("function" != typeof c) {
            this[a] = c
        }
    }
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (d.clientX || 0) + (f.documentElement.scrollLeft || f.body.scrollLeft);
        this.pageY = (d.clientY || 0) + (f.documentElement.scrollTop || f.body.scrollTop)
    }
    this._event = d
};
baidu.event.EventArg.prototype.preventDefault = function () {
    if (this._event.preventDefault) {
        this._event.preventDefault()
    } else {
        this._event.returnValue = false
    }
    return this
};
baidu.event.EventArg.prototype.stopPropagation = function () {
    if (this._event.stopPropagation) {
        this._event.stopPropagation()
    } else {
        this._event.cancelBubble = true
    }
    return this
};
baidu.event.EventArg.prototype.stop = function () {
    return this.stopPropagation().preventDefault()
};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event._unload = function () {
    var d = baidu.event._listeners, a = d.length, c = !!window.removeEventListener, g, f;
    while (a--) {
        g = d[a];
        f = g[0];
        if (f.removeEventListener) {
            f.removeEventListener(g[1], g[3], false)
        } else {
            if (f.detachEvent) {
                f.detachEvent("on" + g[1], g[3])
            }
        }
    }
    if (c) {
        window.removeEventListener("unload", baidu.event._unload, false)
    } else {
        window.detachEvent("onunload", baidu.event._unload)
    }
};
if (window.attachEvent) {
    window.attachEvent("onunload", baidu.event._unload)
} else {
    window.addEventListener("unload", baidu.event._unload, false)
}
baidu.event.get = function (a, c) {
    return new baidu.event.EventArg(a, c)
};
baidu.event.getKeyCode = function (a) {
    return a.which || a.keyCode
};
baidu.event.getPageX = function (c) {
    var a = c.pageX, d = document;
    if (!a && a !== 0) {
        a = (c.clientX || 0) + (d.documentElement.scrollLeft || d.body.scrollLeft)
    }
    return a
};
baidu.event.getPageY = function (c) {
    var a = c.pageY, d = document;
    if (!a && a !== 0) {
        a = (c.clientY || 0) + (d.documentElement.scrollTop || d.body.scrollTop)
    }
    return a
};
baidu.event.getTarget = function (a) {
    return a.target || a.srcElement
};
baidu.event.on = function (c, f, g) {
    f = f.replace(/^on/i, "");
    if ("string" == typeof c) {
        c = baidu.dom.g(c)
    }
    var d = function (h) {
        g.call(c, h)
    }, a = baidu.event._listeners;
    a[a.length] = [c, f, g, d];
    if (c.addEventListener) {
        c.addEventListener(f, d, false)
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + f, d)
        }
    }
    return c
};
baidu.on = baidu.event.on;
baidu.event.preventDefault = function (a) {
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
baidu.event.stop = function (a) {
    var c = baidu.event;
    c.stopPropagation(a);
    c.preventDefault(a)
};
baidu.event.stopPropagation = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
baidu.event.un = function (d, f, h) {
    if ("string" == typeof d) {
        d = baidu.dom.g(d)
    }
    f = f.replace(/^on/i, "");
    var c = baidu.event._listeners, a = c.length, j = !h, g;
    while (a--) {
        g = c[a];
        if (g[1] === f && g[0] === d && (j || g[2] === h)) {
            if (d.removeEventListener) {
                d.removeEventListener(f, g[3], false)
            } else {
                if (d.detachEvent) {
                    d.detachEvent("on" + f, g[3])
                }
            }
            c.splice(a, 1)
        }
    }
    return d
};
baidu.un = baidu.event.un;
baidu.json = baidu.json || {};
baidu.json.decode = function (a) {
    return baidu.json.parse(a)
};
baidu.json.encode = function (a) {
    return baidu.json.stringify(a)
};
baidu.json.parse = function (source) {
    return eval("(" + source + ")")
};
baidu.json.stringify = (function () {
    var c = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

    function a(h) {
        if (/["\\\x00-\x1f]/.test(h)) {
            h = h.replace(/["\\\x00-\x1f]/g, function (j) {
                var k = c[j];
                if (k) {
                    return k
                }
                k = j.charCodeAt();
                return "\\u00" + Math.floor(k / 16).toString(16) + (k % 16).toString(16)
            })
        }
        return '"' + h + '"'
    }

    function f(o) {
        var j = ["["], k = o.length, h, m, n;
        for (m = 0; m < k; m++) {
            n = o[m];
            switch (typeof n) {
                case"undefined":
                case"function":
                case"unknown":
                    break;
                default:
                    if (h) {
                        j.push(",")
                    }
                    j.push(baidu.json.stringify(n));
                    h = 1
            }
        }
        j.push("]");
        return j.join("")
    }

    function d(h) {
        return h < 10 ? "0" + h : h
    }

    function g(h) {
        return '"' + h.getFullYear() + "-" + d(h.getMonth() + 1) + "-" + d(h.getDate()) + "T" + d(h.getHours()) + ":" + d(h.getMinutes()) + ":" + d(h.getSeconds()) + '"'
    }

    return function (m) {
        switch (typeof m) {
            case"undefined":
                return "undefined";
            case"number":
                return isFinite(m) ? String(m) : "null";
            case"string":
                return a(m);
            case"boolean":
                return String(m);
            default:
                if (m === null) {
                    return "null"
                } else {
                    if (m instanceof Array) {
                        return f(m)
                    } else {
                        if (m instanceof Date) {
                            return g(m)
                        } else {
                            var j = ["{"], l = baidu.json.stringify, h, k;
                            for (key in m) {
                                if (m.hasOwnProperty(key)) {
                                    k = m[key];
                                    switch (typeof k) {
                                        case"undefined":
                                        case"unknown":
                                        case"function":
                                            break;
                                        default:
                                            if (h) {
                                                j.push(",")
                                            }
                                            h = 1;
                                            j.push(l(key) + ":" + l(k))
                                    }
                                }
                            }
                            j.push("}");
                            return j.join("")
                        }
                    }
                }
        }
    }
})();
baidu.lang = baidu.lang || {};
baidu.lang.Class = function (a) {
    this.guid = a || baidu.lang.Class.guid();
    baidu.lang._instances[this.guid] = this
};
baidu.lang.Class.guid = function () {
    return "TANGRAM__" + (baidu.lang._insCounter++).toString(36)
};
baidu.lang.Class.create = function (d) {
    var f = new baidu.lang.Class();
    for (var a in d) {
        f[a] = d[a]
    }
    return f
};
baidu.lang.Class.prototype.dispose = function () {
    if (this.guid) {
        delete baidu.lang._instances[this.guid]
    }
    for (var a in this) {
        if (typeof this[a] != "function") {
            delete this[a]
        }
    }
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function (a, c) {
    this.type = a;
    this.returnValue = true;
    this.target = c || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (f, d, c) {
    if (typeof d != "function") {
        return
    }
    if (!this.__listeners) {
        this.__listeners = {}
    }
    var a = this.__listeners, g;
    if (typeof c == "string" && c) {
        if (/[^\w\-]/.test(c)) {
            throw ("nonstandard key:" + c)
        } else {
            d.hashCode = c;
            g = c
        }
    }
    if (f.indexOf("on") != 0) {
        f = "on" + f
    }
    if (typeof a[f] != "object") {
        a[f] = {}
    }
    g = g || baidu.lang.Class.guid();
    d.hashCode = g;
    a[f][g] = d
};
baidu.lang.Class.prototype.removeEventListener = function (d, c) {
    if (typeof c == "function") {
        c = c.hashCode
    } else {
        if (typeof c != "string") {
            return
        }
    }
    if (!this.__listeners) {
        this.__listeners = {}
    }
    if (d.indexOf("on") != 0) {
        d = "on" + d
    }
    var a = this.__listeners;
    if (!a[d]) {
        return
    }
    if (a[d][c]) {
        delete a[d][c]
    }
};
baidu.lang.Class.prototype.dispatchEvent = function (d) {
    if (!this.__listeners) {
        this.__listeners = {}
    }
    var c, a = this.__listeners, f = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    if (typeof this[f] == "function") {
        this[f](d)
    }
    if (typeof a[f] == "object") {
        for (c in a[f]) {
            a[f][c].call(this, d)
        }
    }
    return d.returnValue
};
baidu.lang._insCounter = baidu.lang._insCounter || 1;
baidu.lang._instances = baidu.lang._instances || {};
baidu.lang.inherits = function (j, g, f) {
    var d, h, a = j.prototype, c = new Function();
    c.prototype = g.prototype;
    h = j.prototype = new c();
    for (d in a) {
        h[d] = a[d]
    }
    j.prototype.constructor = j;
    j.superClass = g.prototype;
    if ("string" == typeof f) {
        h._className = f
    }
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.instance = function (a) {
    return baidu.lang._instances[a] || null
};
baidu.lang.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.lang.isElement = function (a) {
    return !!(a && a.nodeName && a.nodeType == 1)
};
baidu.lang.isNumber = function (a) {
    return "[object Number]" == Object.prototype.toString.call(a)
};
baidu.lang.isObject = function (a) {
    return "function" == typeof a || !!(a && "object" == typeof a)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.lang.module = function (f, h, c) {
    c = c || window;
    var j = f.split("."), a = j.length - 1, d, g;
    for (g = 0; g < a; g++) {
        d = j[g];
        if (!c[d]) {
            c[d] = {}
        }
        c = c[d]
    }
    if (!c[j[a]]) {
        c[j[a]] = h
    }
};
baidu.number = baidu.number || {};
baidu.number.comma = function (f, d) {
    var g = String(f).split("."), a = g[0].split("").reverse().join(""), c;
    if (!d || d < 1) {
        d = 3
    }
    c = new RegExp("\\d{" + d + "}", "g");
    a = a.replace(c, function (h) {
        return h + ","
    }).split("").reverse().join("");
    if (a.charAt(0) == ",") {
        a = a.slice(1)
    }
    g[0] = a;
    return g.join(".")
};
baidu.number.pad = function (d, c) {
    var f = "", a = String(d);
    if (a.length < c) {
        f = (new Array(c - a.length + 1)).join("0")
    }
    return f + a
};
baidu.object = baidu.object || {};
baidu.object.clone = function (f) {
    var a = f, c;
    if (!f || f instanceof Number || f instanceof String || f instanceof Boolean) {
        return a
    } else {
        if (f instanceof Array) {
            a = [];
            var d = 0;
            for (c = 0, len = f.length; c < len; c++) {
                a[d++] = baidu.object.clone(f[c])
            }
        } else {
            if ("object" == typeof f) {
                a = {};
                for (c in f) {
                    if (f.hasOwnProperty(c)) {
                        a[c] = baidu.object.clone(f[c])
                    }
                }
            }
        }
    }
    return a
};
baidu.object.extend = function (d, a) {
    for (var c in a) {
        if (a.hasOwnProperty(c)) {
            d[c] = a[c]
        }
    }
};
baidu.extend = baidu.object.extend;
baidu.object.keys = function (f) {
    var a = [], d = 0, c;
    for (c in f) {
        if (f.hasOwnProperty(c)) {
            a[d++] = c
        }
    }
    return a
};
baidu.object.values = function (f) {
    var a = [], d = 0, c;
    for (c in f) {
        if (f.hasOwnProperty(c)) {
            a[d++] = f[c]
        }
    }
    return a
};
baidu.page = baidu.page || {};
baidu.page.getHeight = function () {
    var f = document, a = f.body, d = f.documentElement, c = f.compatMode == "BackCompat" ? a : f.documentElement;
    return Math.max(d.scrollHeight, a.scrollHeight, c.clientHeight)
};
baidu.page.getScrollLeft = function () {
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft
};
baidu.page.getScrollTop = function () {
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop
};
baidu.page.getViewHeight = function () {
    var c = document, a = c.compatMode == "BackCompat" ? c.body : c.documentElement;
    return a.clientHeight
};
baidu.page.getViewWidth = function () {
    var c = document, a = c.compatMode == "BackCompat" ? c.body : c.documentElement;
    return a.clientWidth
};
baidu.page.getWidth = function () {
    var f = document, a = f.body, d = f.documentElement, c = f.compatMode == "BackCompat" ? a : f.documentElement;
    return Math.max(d.scrollWidth, a.scrollWidth, c.clientWidth)
};
baidu.page.loadCssFile = function (c) {
    var a = document.createElement("link");
    a.setAttribute("rel", "stylesheet");
    a.setAttribute("type", "text/css");
    a.setAttribute("href", c);
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.loadJsFile = function (c) {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", c);
    a.setAttribute("defer", "defer");
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.sio = baidu.sio || {};
baidu.sio.callByBrowser = function (c, f) {
    var d = document.createElement("SCRIPT"), a = 0;
    d.onload = d.onreadystatechange = function () {
        if (a) {
            return
        }
        var g = d.readyState;
        if ("undefined" == typeof g || g == "loaded" || g == "complete") {
            a = 1;
            try {
                ("function" == typeof f) && f()
            } finally {
                if (d && d.parentNode) {
                    d.parentNode.removeChild(d)
                }
                d.onload = d.onreadystatechange = null;
                d = null
            }
        }
    };
    d.setAttribute("type", "text/javascript");
    d.setAttribute("src", c);
    document.getElementsByTagName("head")[0].appendChild(d)
};
baidu.sio.callByServer = function (a, h) {
    var f = document.createElement("SCRIPT"), c = "bd__cbs__", g = typeof h, d;
    if ("string" == g) {
        d = h
    } else {
        if ("function" == g) {
            while (1) {
                d = c + Math.floor(Math.random() * 2147483648).toString(36);
                if (!window[d]) {
                    window[d] = function () {
                        try {
                            h.apply(window, arguments)
                        } finally {
                            if (f && f.parentNode) {
                                f.parentNode.removeChild(f)
                            }
                            f = null;
                            window[d] = null
                        }
                    };
                    break
                }
            }
        }
    }
    if ("string" == typeof d) {
        a = a.replace(/(\?|&)callback=[^&]*/, "\x241callback=" + d);
        if (a.search(/(\?|&)callback=/) < 0) {
            a += (a.indexOf("?") < 0 ? "?" : "&");
            a += "callback=" + d
        }
    }
    f.setAttribute("type", "text/javascript");
    f.setAttribute("src", a);
    document.getElementsByTagName("head")[0].appendChild(f)
};
baidu.string = baidu.string || {};
baidu.string.decodeHTML = function (a) {
    return String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.encodeHTML = function (a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.string.escapeReg = function (a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.string.format = function (f, c) {
    f = String(f);
    if (c) {
        if ("[object Object]" == Object.prototype.toString.call(c)) {
            return f.replace(/#\{(.+?)\}/g, function (g, j) {
                var h = c[j];
                if ("function" == typeof h) {
                    h = h(j)
                }
                return ("undefined" == typeof h ? "" : h)
            })
        } else {
            var d = Array.prototype.slice.call(arguments, 1), a = d.length;
            return f.replace(/#\{(\d+)\}/g, function (h, g) {
                g = parseInt(g, 10);
                return (g >= a ? h : d[g])
            })
        }
    }
    return f
};
baidu.format = baidu.string.format;
baidu.string.getByteLength = function (a) {
    return String(a).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.subByte = function (a, d) {
    a = String(a);
    var c = baidu.string.getByteLength, g, k, l, j, f, h;
    if (d < 0 || c(a) <= d) {
        return a
    }
    k = a.length;
    for (g = Math.floor(d / 2) - 1; g < k; g++) {
        l = j || a.substr(0, g);
        f = h || c(l);
        if (f == d) {
            return l
        } else {
            j = a.substr(0, g + 1);
            h = c(j);
            if (h > d) {
                return l
            }
        }
    }
    return a
};
baidu.string.toCamelCase = function (a) {
    return String(a).replace(/[-_]\D/g, function (c) {
        return c.charAt(1).toUpperCase()
    })
};
baidu.string.toHalfWidth = function (a) {
    return String(a).replace(/[\uFF01-\uFF5E]/g, function (d) {
        return String.fromCharCode(d.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
};
baidu.string.trim = function (a) {
    return String(a).replace(new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"), "")
};
baidu.trim = baidu.string.trim;
baidu.string.wbr = function (a) {
    return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.swf = baidu.swf || {};
baidu.swf.create = function (a, d) {
    a = a || {};
    var c = baidu.swf.createHTML(a) || a.errorMessage || "";
    if (d && "string" == typeof d) {
        d = document.getElementById(d)
    }
    if (d) {
        d.innerHTML = c
    } else {
        document.write(c)
    }
};
baidu.swf.createHTML = function (t) {
    t = t || {};
    var m = baidu.swf.version, j = t.ver || "6.0.0", h, f, g, d, l, s, a = {};
    for (d in t) {
        a[d] = t[d]
    }
    t = a;
    if (m) {
        m = m.split(".");
        j = j.split(".");
        for (g = 0; g < 3; g++) {
            h = parseInt(m[g], 10);
            f = parseInt(j[g], 10);
            if (f < h) {
                break
            } else {
                if (f > h) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var o = t.vars, n = ["classid", "codebase", "id", "width", "height", "align"];
    t.align = t.align || "middle";
    t.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    t.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    t.movie = t.url || "";
    delete t.vars;
    delete t.url;
    if ("string" == typeof o) {
        t.flashvars = o
    } else {
        var q = [];
        for (d in o) {
            s = o[d];
            if (s) {
                q.push(d + "=" + encodeURIComponent(s))
            }
        }
        t.flashvars = q.join("&")
    }
    var p = ["<object "];
    for (g = 0, l = n.length; g < l; g++) {
        s = n[g];
        p.push(" ", s, '="', t[s], '"')
    }
    p.push(">");
    var c = {
        wmode: 1,
        scale: 1,
        quality: 1,
        play: 1,
        loop: 1,
        menu: 1,
        salign: 1,
        bgcolor: 1,
        base: 1,
        allowscriptaccess: 1,
        allownetworking: 1,
        allowfullscreen: 1,
        seamlesstabbing: 1,
        devicefont: 1,
        swliveconnect: 1,
        flashvars: 1,
        movie: 1
    };
    for (d in t) {
        s = t[d];
        if (c[d] && s) {
            p.push('<param name="' + d + '" value="' + s + '" />')
        }
    }
    t.src = t.movie;
    t.name = t.id;
    delete t.id;
    delete t.movie;
    delete t.classid;
    delete t.codebase;
    t.type = "application/x-shockwave-flash";
    t.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    p.push("<embed");
    var r;
    for (d in t) {
        s = t[d];
        if (s) {
            if ((new RegExp("^salign\x24", "i")).test(d)) {
                r = s;
                continue
            }
            p.push(" ", d, '="', s, '"')
        }
    }
    if (r) {
        p.push(' salign="', r, '"')
    }
    p.push("></embed></object>");
    return p.join("")
};
baidu.swf.getMovie = function (a) {
    return document[a] || window[a]
};
baidu.swf.version = (function () {
    var j = navigator;
    if (j.plugins && j.mimeTypes.length) {
        var f = j.plugins["Shockwave Flash"];
        if (f && f.description) {
            return f.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var d = 10; d >= 2; d--) {
                try {
                    var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + d);
                    if (h) {
                        var a = h.GetVariable("$version");
                        return a.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (g) {
                }
            }
        }
    }
})();
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function (a) {
    return String(a).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.url.getQueryValue = function (c, d) {
    var f = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(d) + "=([^&]*)(&|\x24)", "");
    var a = c.match(f);
    if (a) {
        return a[2]
    }
    return null
};
baidu.url.jsonToQuery = function (g, f) {
    var c = [], a = 0, d, j, h;
    f = f || function (k) {
            return baidu.url.escapeSymbol(k)
        };
    for (d in g) {
        if (g.hasOwnProperty(d)) {
            j = g[d];
            if (Object.prototype.toString.call(j) == "[object Array]") {
                h = j.length;
                while (h--) {
                    c[a++] = d + "=" + f(j[h], d)
                }
            } else {
                c[a++] = d + "=" + f(j, d)
            }
        }
    }
    return c.join("&")
};
baidu.url.queryToJson = function (a) {
    var g = a.substr(a.indexOf("?") + 1), d = g.split("&"), f = d.length, l = {}, j, h, k, c;
    for (i = 0; i < f; i++) {
        c = d[i].split("=");
        j = c[0];
        h = c[1];
        k = l[j];
        if ("undefined" == typeof k) {
            l[j] = h
        } else {
            if (Object.prototype.toString.call(k) == "[object Array]") {
                k.push(h)
            } else {
                l[j] = [k, h]
            }
        }
    }
    return l
};

baidu.array.unique = function (source, compareFn) {
    var len = source.length,
        result = source.slice(0),
        i, datum;

    if ('function' != typeof compareFn) {
        compareFn = function (item1, item2) {
            return item1 === item2;
        };
    }

    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (compareFn(datum, result[i])) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
};
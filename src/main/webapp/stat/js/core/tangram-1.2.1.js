var baidu = baidu || {version: "1-2-1"};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.browser = baidu.browser || {};
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    baidu.browser.safari = parseFloat(RegExp["\x241"])
}
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = parseFloat(RegExp["\x241"])
}
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = parseFloat(RegExp["\x241"])
}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.ie = baidu.browser.ie = document.documentMode || parseFloat(RegExp["\x241"])
}
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = parseFloat(RegExp["\x241"])
    }
} catch (e) {
}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = parseFloat(RegExp["\x241"])
}
baidu.number = baidu.number || {};
baidu.number.pad = function (C, B) {
    var D = "", A = (C < 0);
    string = String(Math.abs(C));
    if (string.length < B) {
        D = (new Array(B - string.length + 1)).join("0")
    }
    return (A ? "-" : "") + D + string
};
baidu.number.comma = function (D, C) {
    var E = String(D).split("."), A = E[0].split("").reverse().join(""), B;
    if (!C || C < 1) {
        C = 3
    }
    B = new RegExp("\\d{" + C + "}", "g");
    A = A.replace(B, function (F) {
        return F + ","
    }).split("").reverse().join("");
    if (A.charAt(0) == ",") {
        A = A.slice(1)
    }
    E[0] = A;
    return E.join(".")
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function (A) {
    return String(A).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.string = baidu.string || {};
baidu.string.escapeReg = function (A) {
    return String(A).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.url.getQueryValue = function (B, C) {
    var D = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(C) + "=([^&]*)(&|\x24)", "");
    var A = B.match(D);
    if (A) {
        return A[2]
    }
    return null
};
baidu.url.jsonToQuery = function (E, D) {
    var B = [], A = 0, C, G, F;
    D = D || function (H) {
            return baidu.url.escapeSymbol(H)
        };
    for (C in E) {
        if (E.hasOwnProperty(C)) {
            G = E[C];
            if (Object.prototype.toString.call(G) == "[object Array]") {
                F = G.length;
                while (F--) {
                    B[A++] = C + "=" + D(G[F], C)
                }
            } else {
                B[A++] = C + "=" + D(G, C)
            }
        }
    }
    return B.join("&")
};
baidu.url.queryToJson = function (A) {
    var E = A.substr(A.indexOf("?") + 1), C = E.split("&"), D = C.length, I = {}, G, F, H, B;
    for (i = 0; i < D; i++) {
        B = C[i].split("=");
        G = B[0];
        F = B[1];
        H = I[G];
        if ("undefined" == typeof H) {
            I[G] = F
        } else {
            if (Object.prototype.toString.call(H) == "[object Array]") {
                H.push(F)
            } else {
                I[G] = [H, F]
            }
        }
    }
    return I
};
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function (A) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(A)
};
baidu.cookie.setRaw = function (C, D, B) {
    if (!baidu.cookie._isValidKey(C)) {
        return
    }
    B = B || {};
    var A = B.expires;
    if ("number" == typeof B.expires) {
        A = new Date();
        A.setTime(A.getTime() + B.expires)
    }
    document.cookie = C + "=" + D + (B.path ? "; path=" + B.path : "") + (A ? "; expires=" + A.toGMTString() : "") + (B.domain ? "; domain=" + B.domain : "") + (B.secure ? "; secure" : "")
};
baidu.cookie.getRaw = function (B) {
    if (baidu.cookie._isValidKey(B)) {
        var C = new RegExp("(^| )" + B + "=([^;]*)(;|\x24)"), A = C.exec(document.cookie);
        if (A) {
            return A[2] || null
        }
    }
    return null
};
baidu.cookie.get = function (A) {
    var B = baidu.cookie.getRaw(A);
    if ("string" == typeof B) {
        B = decodeURIComponent(B);
        return B
    }
    return null
};
baidu.cookie.set = function (B, C, A) {
    baidu.cookie.setRaw(B, encodeURIComponent(C), A)
};
baidu.cookie.remove = function (B, A) {
    A = A || {};
    A.expires = new Date(0);
    baidu.cookie.setRaw(B, "", A)
};
baidu.json = baidu.json || {};
baidu.json.parse = function (A) {
    if (!/^[\],:{}\s]*$/.test(A.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        return null
    }
    return window.JSON && window.JSON.parse ? window.JSON.parse(A) : (new Function("return " + A))()
};
baidu.json.stringify = (function () {
    var B = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

    function A(F) {
        if (/["\\\x00-\x1f]/.test(F)) {
            F = F.replace(/["\\\x00-\x1f]/g, function (G) {
                var H = B[G];
                if (H) {
                    return H
                }
                H = G.charCodeAt();
                return "\\u00" + Math.floor(H / 16).toString(16) + (H % 16).toString(16)
            })
        }
        return '"' + F + '"'
    }

    function D(K) {
        var G = ["["], H = K.length, F, I, J;
        for (I = 0; I < H; I++) {
            J = K[I];
            switch (typeof J) {
                case"undefined":
                case"function":
                case"unknown":
                    break;
                default:
                    if (F) {
                        G.push(",")
                    }
                    G.push(baidu.json.stringify(J));
                    F = 1
            }
        }
        G.push("]");
        return G.join("")
    }

    function C(F) {
        return F < 10 ? "0" + F : F
    }

    function E(F) {
        return '"' + F.getFullYear() + "-" + C(F.getMonth() + 1) + "-" + C(F.getDate()) + "T" + C(F.getHours()) + ":" + C(F.getMinutes()) + ":" + C(F.getSeconds()) + '"'
    }

    return function (J) {
        switch (typeof J) {
            case"undefined":
                return "undefined";
            case"number":
                return isFinite(J) ? String(J) : "null";
            case"string":
                return A(J);
            case"boolean":
                return String(J);
            default:
                if (J === null) {
                    return "null"
                } else {
                    if (J instanceof Array) {
                        return D(J)
                    } else {
                        if (J instanceof Date) {
                            return E(J)
                        } else {
                            var G = ["{"], I = baidu.json.stringify, F, H;
                            for (key in J) {
                                if (J.hasOwnProperty(key)) {
                                    H = J[key];
                                    switch (typeof H) {
                                        case"undefined":
                                        case"unknown":
                                        case"function":
                                            break;
                                        default:
                                            if (F) {
                                                G.push(",")
                                            }
                                            F = 1;
                                            G.push(I(key) + ":" + I(H))
                                    }
                                }
                            }
                            G.push("}");
                            return G.join("")
                        }
                    }
                }
        }
    }
})();
baidu.json.encode = function (A) {
    return baidu.json.stringify(A)
};
baidu.json.decode = function (A) {
    return baidu.json.parse(A)
};
baidu.date = baidu.date || {};
baidu.date.format = function (A, F) {
    if ("string" != typeof F) {
        return A.toString()
    }
    function D(L, K) {
        F = F.replace(L, K)
    }

    var B = baidu.number.pad, G = A.getFullYear(), E = A.getMonth() + 1, J = A.getDate(), H = A.getHours(), C = A.getMinutes(), I = A.getSeconds();
    D(/yyyy/g, B(G, 4));
    D(/yy/g, B(G.toString().slice(2), 2));
    D(/MM/g, B(E, 2));
    D(/M/g, E);
    D(/dd/g, B(J, 2));
    D(/d/g, J);
    D(/HH/g, B(H, 2));
    D(/H/g, H);
    D(/hh/g, B(H % 12, 2));
    D(/h/g, H % 12);
    D(/mm/g, B(C, 2));
    D(/m/g, C);
    D(/ss/g, B(I, 2));
    D(/s/g, I);
    return F
};
baidu.date.parse = function (C) {
    var A = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ("string" == typeof C) {
        if (A.test(C) || isNaN(Date.parse(C))) {
            var E = C.split(/ |T/), B = E.length > 1 ? E[1].split(/[^\d]/) : [0, 0, 0], D = E[0].split(/[^\d]/);
            return new Date(D[0] - 0, D[1] - 1, D[2] - 0, B[0] - 0, B[1] - 0, B[2] - 0)
        } else {
            return new Date(C)
        }
    }
    return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function (C, D) {
        if (/color/i.test(C) && D.indexOf("rgb(") != -1) {
            var E = D.split(",");
            D = "#";
            for (var B = 0, A; A = E[B]; B++) {
                A = parseInt(A.replace(/[^\d]/gi, ""), 10).toString(16);
                D += A.length == 1 ? "0" + A : A
            }
            D = D.toUpperCase()
        }
        return D
    }
};
baidu.dom._styleFilter.filter = function (B, E, F) {
    for (var A = 0, D = baidu.dom._styleFilter, C; C = D[A]; A++) {
        if (C = C[F]) {
            E = C(B, E)
        }
    }
    return E
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function (A, B) {
        if (B.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(A)) {
            B = B + "px"
        }
        return B
    }
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
    set: function (A, B) {
        A = A.style;
        if (B == "inline-block") {
            A.display = "inline";
            A.zoom = 1
        } else {
            A.display = B
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (A, B) {
        A.style.display = B == "inline-block" ? "-moz-inline-box" : B
    }
} : null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function (A) {
        var B = A.style.filter;
        B && B.indexOf("opacity=") >= 0 ? (parseFloat(B.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
    }, set: function (A, C) {
        var B = A.style;
        B.filter = (B.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (C == 1 ? "" : "alpha(opacity=" + C * 100 + ")");
        B.zoom = 1
    }
} : null;
baidu.dom._styleFixer.textOverflow = (function () {
    var B = {};

    function A(E) {
        var F = E.length;
        if (F > 0) {
            F = E[F - 1];
            E.length--
        } else {
            F = null
        }
        return F
    }

    function C(E, F) {
        E[baidu.browser.firefox ? "textContent" : "innerText"] = F
    }

    function D(M, H, Q) {
        var J = baidu.browser.ie ? M.currentStyle || M.style : getComputedStyle(M, null), P = J.fontWeight, O = "font-family:" + J.fontFamily + ";font-size:" + J.fontSize + ";word-spacing:" + J.wordSpacing + ";font-weight:" + ((parseInt(P) || 0) == 401 ? 700 : P) + ";font-style:" + J.fontStyle + ";font-variant:" + J.fontVariant, E = B[O];
        if (!E) {
            J = M.appendChild(document.createElement("div"));
            J.style.cssText = "float:left;" + O;
            E = B[O] = [];
            for (L = 0; L < 256; L++) {
                L == 32 ? (J.innerHTML = "&nbsp;") : C(J, String.fromCharCode(L));
                E[L] = J.offsetWidth
            }
            C(J, "一");
            E[256] = J.offsetWidth;
            C(J, "一一");
            E[257] = J.offsetWidth - E[256] * 2;
            E[258] = E[".".charCodeAt(0)] * 3 + E[257] * 3;
            M.removeChild(J)
        }
        for (var K = M.firstChild, N = E[256], G = E[257], F = E[258], S = [], Q = Q ? F : 0; K; K = K.nextSibling) {
            if (H < Q) {
                M.removeChild(K)
            } else {
                if (K.nodeType == 3) {
                    for (var L = 0, R = K.nodeValue, I = R.length; L < I; L++) {
                        J = R.charCodeAt(L);
                        S[S.length] = [H, K, L];
                        H -= (L ? G : 0) + (J < 256 ? E[J] : N);
                        if (H < Q) {
                            break
                        }
                    }
                } else {
                    J = K.tagName;
                    if (J == "IMG" || J == "TABLE") {
                        J = K;
                        K = K.previousSibling;
                        M.removeChild(J)
                    } else {
                        S[S.length] = [H, K];
                        H -= K.offsetWidth
                    }
                }
            }
        }
        if (H < Q) {
            while (J = A(S)) {
                H = J[0];
                K = J[1];
                J = J[2];
                if (K.nodeType == 3) {
                    if (H >= F) {
                        K.nodeValue = K.nodeValue.substring(0, J) + "...";
                        return true
                    } else {
                        if (!J) {
                            M.removeChild(K)
                        }
                    }
                } else {
                    if (D(K, H, true)) {
                        return true
                    } else {
                        M.removeChild(K)
                    }
                }
            }
            M.innerHTML = ""
        }
    }

    return {
        get: function (F, G) {
            var E = baidu.browser;
            return (E.opera ? G.OTextOverflow : E.firefox ? F._baiduOverflow : G.textOverflow) || "clip"
        }, set: function (F, H) {
            var E = baidu.browser;
            if (F.tagName == "TD" || F.tagName == "TH" || E.firefox) {
                F._baiduHTML && (F.innerHTML = F._baiduHTML);
                if (H == "ellipsis") {
                    F._baiduHTML = F.innerHTML;
                    var I = document.createElement("div"), G = F.appendChild(I).offsetWidth;
                    F.removeChild(I);
                    D(F, G)
                } else {
                    F._baiduHTML = ""
                }
            }
            I = F.style;
            E.opera ? (I.OTextOverflow = H) : E.firefox ? (F._baiduOverflow = H) : (I.textOverflow = H)
        }
    }
})();
baidu.dom.g = function (A) {
    if ("string" == typeof A || A instanceof String) {
        return document.getElementById(A)
    } else {
        if (A && A.nodeName && (A.nodeType == 1 || A.nodeType == 9)) {
            return A
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom._NAME_ATTRS = (function () {
    var A = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.browser.ie < 8) {
        A["for"] = "htmlFor";
        A["class"] = "className"
    } else {
        A.htmlFor = "for";
        A.className = "class"
    }
    return A
})();
baidu.dom.setAttr = function (B, A, C) {
    B = baidu.dom.g(B);
    if ("style" == A) {
        B.style.cssText = C
    } else {
        A = baidu.dom._NAME_ATTRS[A] || A;
        B.setAttribute(A, C)
    }
    return B
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function (C, A) {
    C = baidu.dom.g(C);
    for (var B in A) {
        baidu.dom.setAttr(C, B, A[B])
    }
    return C
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.getAttr = function (B, A) {
    B = baidu.dom.g(B);
    if ("style" == A) {
        return B.style.cssText
    }
    A = baidu.dom._NAME_ATTRS[A] || A;
    return B.getAttribute(A)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom._matchNode = function (A, C, D) {
    A = baidu.dom.g(A);
    for (var B = A[D]; B; B = B[C]) {
        if (B.nodeType == 1) {
            return B
        }
    }
    return null
};
baidu.dom.prev = function (A) {
    return baidu.dom._matchNode(A, "previousSibling", "previousSibling")
};
(function () {
    var A = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function (B) {
        return String(B).replace(A, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.dom.addClass = function (D, E) {
    D = baidu.dom.g(D);
    var B = baidu.string.trim, C = B(E).split(/\s+/), A = C.length;
    E = D.className.split(/\s+/).join(" ");
    while (A--) {
        (new RegExp("(^| )" + C[A] + "( |\x24)")).test(E) && C.splice(A, 1)
    }
    D.className = B(E + " " + C.join(" "));
    return D
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.hasClass = function (C, D) {
    C = baidu.dom.g(C);
    var B = baidu.string.trim(D).split(/\s+/), A = B.length;
    D = C.className.split(/\s+/).join(" ");
    while (A--) {
        if (!(new RegExp("(^| )" + B[A] + "( |\x24)")).test(D)) {
            return false
        }
    }
    return true
};
baidu.dom.contains = function (A, B) {
    var C = baidu.dom.g;
    A = C(A);
    B = C(B);
    return A.contains ? A != B && A.contains(B) : !!(A.compareDocumentPosition(B) & 16)
};
baidu.dom.getDocument = function (A) {
    A = baidu.dom.g(A);
    return A.nodeType == 9 ? A : A.ownerDocument || A.document
};
baidu.dom.removeClass = function (B, C) {
    B = baidu.dom.g(B);
    var A = baidu.string.trim;
    B.className = A(B.className.split(/\s+/).join("  ").replace(new RegExp("(^| )(" + A(C).split(/\s+/).join("|") + ")( |\x24)", "g"), " ").replace(/\s+/g, " "));
    return B
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.children = function (B) {
    B = baidu.dom.g(B);
    for (var A = [], C = B.firstChild; C; C = C.nextSibling) {
        if (C.nodeType == 1) {
            A.push(C)
        }
    }
    return A
};
baidu.string.toCamelCase = function (A) {
    if (A.indexOf("-") < 0 && A.indexOf("_") < 0) {
        return A
    }
    return A.replace(/[-_][^-_]/g, function (B) {
        return B.charAt(1).toUpperCase()
    })
};
baidu.dom.setStyle = function (C, B, D) {
    var E = baidu.dom, A;
    C = E.g(C);
    B = baidu.string.toCamelCase(B);
    if (A = E._styleFilter) {
        D = A.filter(B, D, "set")
    }
    A = E._styleFixer[B];
    (A && A.set) ? A.set(C, D) : (C.style[A || B] = D);
    return C
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.setStyles = function (B, C) {
    B = baidu.dom.g(B);
    for (var A in C) {
        baidu.dom.setStyle(B, A, C[A])
    }
    return B
};
baidu.setStyles = baidu.dom.setStyles;
baidu.dom.q = function (H, E, B) {
    var I = [], D = baidu.string.trim, G, F, A, C;
    if (!(H = D(H))) {
        return null
    }
    if ("undefined" == typeof E) {
        E = document
    } else {
        E = baidu.dom.g(E);
        if (!E) {
            return I
        }
    }
    B && (B = D(B).toUpperCase());
    if (E.getElementsByClassName) {
        A = E.getElementsByClassName(H);
        G = A.length;
        for (F = 0; F < G; F++) {
            C = A[F];
            if (B && C.tagName != B) {
                continue
            }
            I[I.length] = C
        }
    } else {
        H = new RegExp("(^|\\s)" + baidu.string.escapeReg(H) + "(\\s|\x24)");
        A = B ? E.getElementsByTagName(B) : (E.all || E.getElementsByTagName("*"));
        G = A.length;
        for (F = 0; F < G; F++) {
            C = A[F];
            H.test(C.className) && (I[I.length] = C)
        }
    }
    return I
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.getStyle = function (C, B) {
    var F = baidu.dom;
    C = F.g(C);
    B = baidu.string.toCamelCase(B);
    var E = C.style[B];
    if (!E) {
        var A = F._styleFixer[B], D = C.currentStyle || (baidu.browser.ie ? C.style : getComputedStyle(C, null));
        if ("string" == typeof A) {
            E = D[A]
        } else {
            if (A && A.get) {
                E = A.get(C, D)
            } else {
                E = D[B]
            }
        }
    }
    if (A = F._styleFilter) {
        E = A.filter(B, E, "get")
    }
    return E
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom.getPosition = function (B) {
    var I = baidu.dom.getDocument(B), E = baidu.browser, G = baidu.dom.getStyle;
    B = baidu.dom.g(B);
    var D = E.isGecko > 0 && I.getBoxObjectFor && G(B, "position") == "absolute" && (B.style.top === "" || B.style.left === "");
    var H = {left: 0, top: 0};
    var F = (E.ie && !E.isStrict) ? I.body : I.documentElement;
    if (B == F) {
        return H
    }
    var J = null;
    var C;
    if (B.getBoundingClientRect) {
        C = B.getBoundingClientRect();
        H.left = Math.floor(C.left) + Math.max(I.documentElement.scrollLeft, I.body.scrollLeft);
        H.top = Math.floor(C.top) + Math.max(I.documentElement.scrollTop, I.body.scrollTop);
        H.left -= I.documentElement.clientLeft;
        H.top -= I.documentElement.clientTop;
        if (E.ie && !E.isStrict) {
            H.left -= G(F, "border-left-width");
            H.top -= G(F, "border-top-width")
        }
    } else {
        if (I.getBoxObjectFor && !D) {
            C = I.getBoxObjectFor(B);
            var A = I.getBoxObjectFor(F);
            H.left = C.screenX - A.screenX;
            H.top = C.screenY - A.screenY
        } else {
            J = B;
            do {
                H.left += J.offsetLeft;
                H.top += J.offsetTop;
                if (E.isWebkit > 0 && G(J, "position") == "fixed") {
                    H.left += I.body.scrollLeft;
                    H.top += I.body.scrollTop;
                    break
                }
                J = J.offsetParent
            } while (J && J != B);
            if (E.opera > 0 || (E.isWebkit > 0 && G(B, "position") == "absolute")) {
                H.top -= I.body.offsetTop
            }
            J = B.offsetParent;
            while (J && J != I.body) {
                H.left -= J.scrollLeft;
                if (!b.opera || J.tagName != "TR") {
                    H.top -= J.scrollTop
                }
                J = J.offsetParent
            }
        }
    }
    return H
};
baidu.dom.intersect = function (H, G) {
    var F = baidu.dom.g, E = baidu.dom.getPosition, A = Math.max, C = Math.min;
    H = F(H);
    G = F(G);
    var D = E(H), B = E(G);
    return A(D.left, B.left) <= C(D.left + H.offsetWidth, B.left + G.offsetWidth) && A(D.top, B.top) <= C(D.top + H.offsetHeight, B.top + G.offsetHeight)
};
baidu.dom.last = function (A) {
    return baidu.dom._matchNode(A, "previousSibling", "lastChild")
};
baidu.dom.ready = function () {
    var C = false, E = false, D = [];

    function A() {
        if (!C) {
            C = true;
            for (var G = 0, F = D.length; G < F; G++) {
                D[G]()
            }
        }
    }

    function B() {
        if (E) {
            return
        }
        E = true;
        var I = document, G = window, F = baidu.browser.opera;
        if (I.addEventListener && !F) {
            I.addEventListener("DOMContentLoaded", F ? function () {
                if (C) {
                    return
                }
                for (var J = 0; J < I.styleSheets.length; J++) {
                    if (I.styleSheets[J].disabled) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                }
                A()
            } : A, false)
        } else {
            if (baidu.browser.ie && G == top) {
                (function () {
                    if (C) {
                        return
                    }
                    try {
                        I.documentElement.doScroll("left")
                    } catch (J) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    A()
                })()
            } else {
                if (baidu.browser.safari) {
                    var H;
                    (function () {
                        if (C) {
                            return
                        }
                        if (I.readyState != "loaded" && I.readyState != "complete") {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        if (H === undefined) {
                            H = 0;
                            var M = I.getElementsByTagName("style");
                            var K = I.getElementsByTagName("link");
                            if (M) {
                                H += M.length
                            }
                            if (K) {
                                for (var L = 0, J = K.length; L < J; L++) {
                                    if (K[L].getAttribute("rel") == "stylesheet") {
                                        H++
                                    }
                                }
                            }
                        }
                        if (I.styleSheets.length != H) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        A()
                    })()
                }
            }
        }
        G.attachEvent ? G.attachEvent("onload", A) : G.addEventListener("load", A, false)
    }

    return function (F) {
        B();
        C ? F() : (D[D.length] = F)
    }
}();
baidu.dom.getAncestorByTag = function (B, A) {
    B = baidu.dom.g(B);
    A = A.toUpperCase();
    while ((B = B.parentNode) && B.nodeType == 1) {
        if (B.tagName == A) {
            return B
        }
    }
    return null
};
baidu.dom.getWindow = function (A) {
    A = baidu.dom.g(A);
    var B = baidu.dom.getDocument(A);
    return B.parentWindow || B.defaultView || null
};
baidu.dom.getAncestorBy = function (A, B) {
    A = baidu.dom.g(A);
    while ((A = A.parentNode) && A.nodeType == 1) {
        if (B(A)) {
            return A
        }
    }
    return null
};
baidu.dom.hide = function (A) {
    A = baidu.dom.g(A);
    A.style.display = "none";
    return A
};
baidu.hide = baidu.dom.hide;
baidu.dom.next = function (A) {
    return baidu.dom._matchNode(A, "nextSibling", "nextSibling")
};
baidu.dom.show = function (A) {
    A = baidu.dom.g(A);
    A.style.display = "";
    return A
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function (A) {
    A = baidu.dom.g(A);
    A.style.display = A.style.display == "none" ? "" : "none";
    return A
};
baidu.dom.insertAfter = function (D, C) {
    var B, A;
    B = baidu.dom.g;
    D = B(D) || D;
    C = B(C) || C;
    A = C.parentNode;
    if (A) {
        A.insertBefore(D, C.nextSibling)
    }
    return D
};
baidu.dom.first = function (A) {
    return baidu.dom._matchNode(A, "nextSibling", "firstChild")
};
baidu.dom.insertBefore = function (D, C) {
    var B, A;
    B = baidu.dom.g;
    D = B(D) || D;
    C = B(C) || C;
    A = C.parentNode;
    if (A) {
        A.insertBefore(D, C)
    }
    return D
};
baidu.dom.insertHTML = function (E, A, D) {
    E = baidu.dom.g(E);
    if (E.insertAdjacentHTML) {
        E.insertAdjacentHTML(A, D)
    } else {
        var B = E.ownerDocument.createRange();
        B.setStartBefore(E);
        var C = B.createContextualFragment(D), G = E.parentNode, F;
        switch (A.toUpperCase()) {
            case"BEFOREBEGIN":
                G.insertBefore(C, E);
                break;
            case"AFTERBEGIN":
                E.insertBefore(C, E.firstChild);
                break;
            case"BEFOREEND":
                E.appendChild(C);
                break;
            case"AFTEREND":
                (F = E.nextSibling) ? G.insertBefore(C, F) : G.appendChild(C)
        }
    }
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.remove = function (A) {
    A = baidu.dom.g(A);
    if ("HTML BODY HEAD".indexOf(A.nodeName) == -1) {
        if (baidu.browser.ie) {
            var B = document.createElement("DIV");
            B.appendChild(A);
            B.innerHTML = ""
        } else {
            (B = A.parentNode) && B.removeChild(A)
        }
    }
};
baidu.dom.getAncestorByClass = function (A, B) {
    A = baidu.dom.g(A);
    B = new RegExp("(^|\\s)" + baidu.string.trim(B) + "(\\s|\x24)");
    while ((A = A.parentNode) && A.nodeType == 1) {
        if (B.test(A.className)) {
            return A
        }
    }
    return null
};
baidu.lang = baidu.lang || {};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.instance = function (A) {
    return window[baidu.guid]._instances[A] || null
};
baidu.lang.isNumber = function (A) {
    return "[object Number]" == Object.prototype.toString.call(A)
};
baidu.lang.guid = function () {
    return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36)
};
window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
baidu.lang.Class = function (A) {
    this.guid = A || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var A in this) {
        if (typeof this[A] != "function") {
            delete this[A]
        }
    }
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.inherits = function (G, E, D) {
    var C, F, A = G.prototype, B = new Function();
    B.prototype = E.prototype;
    F = G.prototype = new B();
    for (C in A) {
        F[C] = A[C]
    }
    G.prototype.constructor = G;
    G.superClass = E.prototype;
    if ("string" == typeof D) {
        F._className = D
    }
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.isElement = function (A) {
    return !!(A && A.nodeName && A.nodeType == 1)
};
baidu.lang.module = function (name, module, owner) {
    var packages = name.split("."), len = packages.length - 1, packageName, i = 0;
    if (!owner) {
        try {
            if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])) {
                throw""
            }
            owner = eval(packages[0]);
            i = 1
        } catch (e) {
            owner = window
        }
    }
    for (; i < len; i++) {
        packageName = packages[i];
        if (!owner[packageName]) {
            owner[packageName] = {}
        }
        owner = owner[packageName]
    }
    if (!owner[packages[len]]) {
        owner[packages[len]] = module
    }
};
baidu.lang.decontrol = function (B) {
    var A = window[baidu.guid];
    A._instances && (delete A._instances[B])
};
baidu.lang.isArray = function (A) {
    return "[object Array]" == Object.prototype.toString.call(A)
};
baidu.lang.Event = function (A, B) {
    this.type = A;
    this.returnValue = true;
    this.target = B || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (D, C, B) {
    if (typeof C != "function") {
        return
    }
    !this.__listeners && (this.__listeners = {});
    var A = this.__listeners, E;
    if (typeof B == "string" && B) {
        if (/[^\w\-]/.test(B)) {
            throw ("nonstandard key:" + B)
        } else {
            C.hashCode = B;
            E = B
        }
    }
    D.indexOf("on") != 0 && (D = "on" + D);
    typeof A[D] != "object" && (A[D] = {});
    E = E || baidu.lang.guid();
    C.hashCode = E;
    A[D][E] = C
};
baidu.lang.Class.prototype.removeEventListener = function (C, B) {
    if (typeof B == "function") {
        B = B.hashCode
    } else {
        if (typeof B != "string") {
            return
        }
    }
    !this.__listeners && (this.__listeners = {});
    C.indexOf("on") != 0 && (C = "on" + C);
    var A = this.__listeners;
    if (!A[C]) {
        return
    }
    A[C][B] && delete A[C][B]
};
baidu.lang.Class.prototype.dispatchEvent = function (D, A) {
    if ("string" == typeof D) {
        D = new baidu.lang.Event(D)
    }
    !this.__listeners && (this.__listeners = {});
    A = A || {};
    for (var C in A) {
        typeof D[C] == "undefined" && (D[C] = A[C])
    }
    var C, B = this.__listeners, E = D.type;
    D.target = D.target || this;
    D.currentTarget = this;
    typeof this[E] == "function" && this[E].apply(this, arguments);
    E.indexOf("on") != 0 && (E = "on" + E);
    if (typeof B[E] == "object") {
        for (C in B[E]) {
            B[E][C].apply(this, arguments)
        }
    }
    return D.returnValue
};
baidu.lang.isObject = function (A) {
    return "function" == typeof A || !!(A && "object" == typeof A)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.isString = function (A) {
    return "[object String]" == Object.prototype.toString.call(A)
};
baidu.isString = baidu.lang.isString;
baidu.event = baidu.event || {};
baidu.event.getPageX = function (B) {
    var A = B.pageX, C = document;
    if (!A && A !== 0) {
        A = (B.clientX || 0) + (C.documentElement.scrollLeft || C.body.scrollLeft)
    }
    return A
};
baidu.event.getPageY = function (B) {
    var A = B.pageY, C = document;
    if (!A && A !== 0) {
        A = (B.clientY || 0) + (C.documentElement.scrollTop || C.body.scrollTop)
    }
    return A
};
baidu.event.stopPropagation = function (A) {
    if (A.stopPropagation) {
        A.stopPropagation()
    } else {
        A.cancelBubble = true
    }
};
baidu.event.preventDefault = function (A) {
    if (A.preventDefault) {
        A.preventDefault()
    } else {
        A.returnValue = false
    }
};
baidu.event.stop = function (A) {
    var B = baidu.event;
    B.stopPropagation(A);
    B.preventDefault(A)
};
baidu.event.getTarget = function (A) {
    return A.target || A.srcElement
};
baidu.event.EventArg = function (C, E) {
    E = E || window;
    C = C || E.event;
    var D = E.document;
    this.target = C.srcElement;
    this.keyCode = C.which || C.keyCode;
    for (var A in C) {
        var B = C[A];
        if ("function" != typeof B) {
            this[A] = B
        }
    }
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (C.clientX || 0) + (D.documentElement.scrollLeft || D.body.scrollLeft);
        this.pageY = (C.clientY || 0) + (D.documentElement.scrollTop || D.body.scrollTop)
    }
    this._event = C
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
baidu.event._unload = function () {
    var C = baidu.event._listeners, A = C.length, B = !!window.removeEventListener, E, D;
    while (A--) {
        E = C[A];
        if (E[1] == "unload") {
            continue
        }
        D = E[0];
        if (D.removeEventListener) {
            D.removeEventListener(E[1], E[3], false)
        } else {
            if (D.detachEvent) {
                D.detachEvent("on" + E[1], E[3])
            }
        }
    }
    if (B) {
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
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function (B, D, E) {
    D = D.replace(/^on/i, "");
    if ("string" == typeof B) {
        B = baidu.dom.g(B)
    }
    var C = function (F) {
        E.call(B, F)
    }, A = baidu.event._listeners;
    A[A.length] = [B, D, E, C];
    if (B.addEventListener) {
        B.addEventListener(D, C, false)
    } else {
        if (B.attachEvent) {
            B.attachEvent("on" + D, C)
        }
    }
    return B
};
baidu.on = baidu.event.on;
baidu.event.get = function (A, B) {
    return new baidu.event.EventArg(A, B)
};
baidu.event.un = function (C, D, F) {
    if ("string" == typeof C) {
        C = baidu.dom.g(C)
    }
    D = D.replace(/^on/i, "");
    var B = baidu.event._listeners, A = B.length, G = !F, E;
    while (A--) {
        E = B[A];
        if (E[1] === D && E[0] === C && (G || E[2] === F)) {
            if (C.removeEventListener) {
                C.removeEventListener(D, E[3], false)
            } else {
                if (C.detachEvent) {
                    C.detachEvent("on" + D, E[3])
                }
            }
            B.splice(A, 1)
        }
    }
    return C
};
baidu.un = baidu.event.un;
baidu.event.getKeyCode = function (A) {
    return A.which || A.keyCode
};
baidu.ajax = baidu.ajax || {};
baidu.ajax.request = function (D, O) {
    function J() {
        if (N.readyState == 4) {
            try {
                var Q = N.status
            } catch (P) {
                E("failure");
                return
            }
            E(Q);
            if ((Q >= 200 && Q < 300) || Q == 304 || Q == 1223) {
                E("success")
            } else {
                E("failure")
            }
            window.setTimeout(function () {
                N.onreadystatechange = new Function();
                if (G) {
                    N = null
                }
            }, 0)
        }
    }

    function C() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (P) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (P) {
                }
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }

    function E(Q) {
        Q = "on" + Q;
        var P = B[Q], R = baidu.ajax[Q];
        if (P) {
            if (Q != "onsuccess") {
                P(N)
            } else {
                P(N, N.responseText)
            }
        } else {
            if (R) {
                if (Q == "onsuccess") {
                    return
                }
                R(N)
            }
        }
    }

    O = O || {};
    var I = O.data || "", G = !(O.async === false), H = O.username || "", M = O.password || "", A = (O.method || "GET").toUpperCase(), F = O.headers || {}, B = {}, L, N;
    for (L in O) {
        B[L] = O[L]
    }
    F["X-Request-By"] = "baidu.ajax";
    try {
        N = C();
        if (A == "GET") {
            D += (D.indexOf("?") >= 0 ? "&" : "?");
            if (I) {
                D += I + "&";
                I = null
            }
            if (O.noCache) {
                D += "b" + (new Date()).getTime() + "=1"
            }
        }
        if (H) {
            N.open(A, D, G, H, M)
        } else {
            N.open(A, D, G)
        }
        if (G) {
            N.onreadystatechange = J
        }
        if (A == "POST") {
            N.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        for (L in F) {
            if (F.hasOwnProperty(L)) {
                N.setRequestHeader(L, F[L])
            }
        }
        E("beforerequest");
        N.send(I);
        if (!G) {
            J()
        }
    } catch (K) {
        E("failure")
    }
    return N
};
baidu.ajax.post = function (B, C, A) {
    return baidu.ajax.request(B, {onsuccess: A, method: "POST", data: C})
};
baidu.ajax.get = function (B, A) {
    return baidu.ajax.request(B, {onsuccess: A})
};
baidu.ajax.form = function (A, C) {
    C = C || {};
    var F = A.elements, M = F.length, B = A.getAttribute("method"), E = A.getAttribute("action"), S = C.replacer || function (U, T) {
            return U
        }, P = {}, R = [], K, O, Q, L, D, G, H, J, I;

    function N(T, U) {
        R.push(T + "=" + U)
    }

    for (K in C) {
        if (C.hasOwnProperty(K)) {
            P[K] = C[K]
        }
    }
    for (K = 0; K < M; K++) {
        O = F[K];
        L = O.name;
        if (!O.disabled && L) {
            Q = O.type;
            D = O.value;
            switch (Q) {
                case"radio":
                case"checkbox":
                    if (!O.checked) {
                        break
                    }
                case"textarea":
                case"text":
                case"password":
                case"hidden":
                case"select-one":
                    N(L, S(D, L));
                    break;
                case"select-multiple":
                    G = O.options;
                    J = G.length;
                    for (H = 0; H < J; H++) {
                        I = G[H];
                        if (I.selected) {
                            N(L, S(I.value, L))
                        }
                    }
                    break
            }
        }
    }
    P.data = R.join("&");
    P.method = A.getAttribute("method") || "POST";
    return baidu.ajax.request(E, P)
};
baidu.sio = baidu.sio || {};
baidu.sio._removeScriptTag = function (B) {
    if (B.clearAttributes) {
        B.clearAttributes()
    } else {
        for (var A in B) {
            if (B.hasOwnProperty(A)) {
                delete B[A]
            }
        }
    }
    if (B && B.parentNode) {
        B.parentNode.removeChild(B)
    }
    B = null
};
baidu.sio.callByBrowser = function (C, E) {
    var D = document.createElement("SCRIPT"), B = 0, A;
    D.onload = D.onreadystatechange = function () {
        if (B) {
            return
        }
        var F = D.readyState;
        if ("undefined" == typeof F || F == "loaded" || F == "complete") {
            B = 1;
            try {
                ("function" == typeof E) && E()
            } finally {
                baidu.sio._removeScriptTag(D)
            }
        }
    };
    D.setAttribute("type", "text/javascript");
    D.setAttribute("src", C);
    document.getElementsByTagName("head")[0].appendChild(D)
};
baidu.sio.callByServer = function (B, G) {
    var E = document.createElement("SCRIPT"), C = "bd__cbs__", F = typeof G, D, A;
    if ("string" == F) {
        D = G
    } else {
        if ("function" == F) {
            while (1) {
                D = C + Math.floor(Math.random() * 2147483648).toString(36);
                if (!window[D]) {
                    window[D] = function () {
                        try {
                            G.apply(window, arguments)
                        } finally {
                            baidu.sio._removeScriptTag(E);
                            window[D] = null
                        }
                    };
                    break
                }
            }
        }
    }
    if ("string" == typeof D) {
        B = B.replace(/(\?|&)callback=[^&]*/, "\x241callback=" + D);
        if (B.search(/(\?|&)callback=/) < 0) {
            B += (B.indexOf("?") < 0 ? "?" : "&");
            B += "callback=" + D
        }
    }
    E.setAttribute("type", "text/javascript");
    E.setAttribute("src", B);
    document.getElementsByTagName("head")[0].appendChild(E)
};
baidu.swf = baidu.swf || {};
baidu.swf.version = (function () {
    var F = navigator;
    if (F.plugins && F.mimeTypes.length) {
        var C = F.plugins["Shockwave Flash"];
        if (C && C.description) {
            return C.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var B = 10; B >= 2; B--) {
                try {
                    var E = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + B);
                    if (E) {
                        var A = E.GetVariable("$version");
                        return A.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (D) {
                }
            }
        }
    }
})();
baidu.swf.createHTML = function (P) {
    P = P || {};
    var I = baidu.swf.version, G = P.ver || "6.0.0", F, D, E, C, H, O, A = {};
    for (C in P) {
        A[C] = P[C]
    }
    P = A;
    if (I) {
        I = I.split(".");
        G = G.split(".");
        for (E = 0; E < 3; E++) {
            F = parseInt(I[E], 10);
            D = parseInt(G[E], 10);
            if (D < F) {
                break
            } else {
                if (D > F) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var K = P.vars, J = ["classid", "codebase", "id", "width", "height", "align"];
    P.align = P.align || "middle";
    P.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    P.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    P.movie = P.url || "";
    delete P.vars;
    delete P.url;
    if ("string" == typeof K) {
        P.flashvars = K
    } else {
        var M = [];
        for (C in K) {
            O = K[C];
            if (O) {
                M.push(C + "=" + encodeURIComponent(O))
            }
        }
        P.flashvars = M.join("&")
    }
    var L = ["<object "];
    for (E = 0, H = J.length; E < H; E++) {
        O = J[E];
        L.push(" ", O, '="', P[O], '"')
    }
    L.push(">");
    var B = {
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
    for (C in P) {
        O = P[C];
        C = C.toLowerCase();
        if (B[C] && O) {
            L.push('<param name="' + C + '" value="' + O + '" />')
        }
    }
    P.src = P.movie;
    P.name = P.id;
    delete P.id;
    delete P.movie;
    delete P.classid;
    delete P.codebase;
    P.type = "application/x-shockwave-flash";
    P.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    L.push("<embed");
    var N;
    for (C in P) {
        O = P[C];
        if (O) {
            if ((new RegExp("^salign\x24", "i")).test(C)) {
                N = O;
                continue
            }
            L.push(" ", C, '="', O, '"')
        }
    }
    if (N) {
        L.push(' salign="', N, '"')
    }
    L.push("></embed></object>");
    return L.join("")
};
baidu.swf.getMovie = function (A) {
    return document[A] || window[A]
};
baidu.swf.create = function (A, C) {
    A = A || {};
    var B = baidu.swf.createHTML(A) || A.errorMessage || "";
    if (C && "string" == typeof C) {
        C = document.getElementById(C)
    }
    if (C) {
        C.innerHTML = B
    } else {
        document.write(B)
    }
};
baidu.object = baidu.object || {};
baidu.object.extend = function (C, A) {
    for (var B in A) {
        if (A.hasOwnProperty(B)) {
            C[B] = A[B]
        }
    }
    return C
};
baidu.extend = baidu.object.extend;
baidu.object.each = function (E, C) {
    var B, A, D;
    if ("function" == typeof C) {
        for (A in E) {
            if (E.hasOwnProperty(A)) {
                D = E[A];
                B = C.call(E, D, A);
                if (B === false) {
                    break
                }
            }
        }
    }
    return E
};
baidu.object.keys = function (D) {
    var A = [], C = 0, B;
    for (B in D) {
        if (D.hasOwnProperty(B)) {
            A[C++] = B
        }
    }
    return A
};
baidu.object.values = function (D) {
    var A = [], C = 0, B;
    for (B in D) {
        if (D.hasOwnProperty(B)) {
            A[C++] = D[B]
        }
    }
    return A
};
baidu.object.clone = (function (A) {
    return function (F) {
        var C = F, D, B;
        if (!F || F instanceof Number || F instanceof String || F instanceof Boolean) {
            return C
        } else {
            if (F instanceof Array) {
                C = [];
                var E = 0;
                for (D = 0, B = F.length; D < B; D++) {
                    C[E++] = baidu.object.clone(F[D])
                }
            } else {
                if ("object" == typeof F) {
                    if (A[Object.prototype.toString.call(F)]) {
                        return C
                    }
                    C = {};
                    for (D in F) {
                        if (F.hasOwnProperty(D)) {
                            C[D] = baidu.object.clone(F[D])
                        }
                    }
                }
            }
        }
        return C
    }
})({"[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1});
baidu.string.getByteLength = function (A) {
    return String(A).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.decodeHTML = function (A) {
    return String(A).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.format = function (C, A) {
    C = String(C);
    var B = Array.prototype.slice.call(arguments, 1), D = Object.prototype.toString;
    if (B.length) {
        B = B.length == 1 ? (A !== null && (/\[object Array\]|\[object Object\]/.test(D.call(A))) ? A : B) : B;
        return C.replace(/#\{(.+?)\}/g, function (E, G) {
            var F = B[G];
            if ("[object Function]" == D.call(F)) {
                F = F(G)
            }
            return ("undefined" == typeof F ? "" : F)
        })
    }
    return C
};
baidu.format = baidu.string.format;
baidu.string.wbr = function (A) {
    return String(A).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.string.subByte = function (A, C) {
    A = String(A);
    var B = baidu.string.getByteLength, E, H, I, G, D, F;
    if (C < 0 || B(A) <= C) {
        return A
    }
    H = A.length;
    for (E = Math.floor(C / 2) - 1; E < H; E++) {
        I = G || A.substr(0, E);
        D = F || B(I);
        if (D == C) {
            return I
        } else {
            G = A.substr(0, E + 1);
            F = B(G);
            if (F > C) {
                return I
            }
        }
    }
    return A
};
baidu.string.toHalfWidth = function (A) {
    return String(A).replace(/[\uFF01-\uFF5E]/g, function (B) {
        return String.fromCharCode(B.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
};
baidu.string.encodeHTML = function (A) {
    return String(A).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.page = baidu.page || {};
baidu.page.getHeight = function () {
    var D = document, A = D.body, C = D.documentElement, B = D.compatMode == "BackCompat" ? A : D.documentElement;
    return Math.max(C.scrollHeight, A.scrollHeight, B.clientHeight)
};
baidu.page.loadCssFile = function (B) {
    var A = document.createElement("link");
    A.setAttribute("rel", "stylesheet");
    A.setAttribute("type", "text/css");
    A.setAttribute("href", B);
    document.getElementsByTagName("head")[0].appendChild(A)
};
baidu.page.getScrollLeft = function () {
    var A = document;
    return A.documentElement.scrollLeft || A.body.scrollLeft
};
baidu.page.getViewWidth = function () {
    var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
    return A.clientWidth
};
baidu.page.loadJsFile = function (B) {
    var A = document.createElement("script");
    A.setAttribute("type", "text/javascript");
    A.setAttribute("src", B);
    A.setAttribute("defer", "defer");
    document.getElementsByTagName("head")[0].appendChild(A)
};
baidu.page.getWidth = function () {
    var D = document, A = D.body, C = D.documentElement, B = D.compatMode == "BackCompat" ? A : D.documentElement;
    return Math.max(C.scrollWidth, A.scrollWidth, B.clientWidth)
};
baidu.page.getScrollTop = function () {
    var A = document;
    return A.documentElement.scrollTop || A.body.scrollTop
};
baidu.page.getViewHeight = function () {
    var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
    return A.clientHeight
};
baidu.array = baidu.array || {};
baidu.array.filter = function (G, E) {
    var C = [], B = 0, A = G.length, F, D;
    if ("function" == typeof E) {
        for (D = 0; D < A; D++) {
            F = G[D];
            if (true === E.call(G, F, D)) {
                C[B++] = F
            }
        }
    }
    return C
};
baidu.array.unique = function (E, F) {
    var B = E.length, A = E.slice(0), D, C;
    if ("function" != typeof F) {
        F = function (H, G) {
            return H === G
        }
    }
    while (--B > 0) {
        C = A[B];
        D = B;
        while (D--) {
            if (F(C, A[D])) {
                A.splice(B, 1);
                break
            }
        }
    }
    return A
};
baidu.array.indexOf = function (D, E, B) {
    var A = D.length, C = E;
    B = Number(B) || 0;
    B = B < 0 ? Math.ceil(B) : Math.floor(B);
    B = Math.min(Math.max(B, 0), A);
    if ("function" != typeof E) {
        C = function (F) {
            return E === F
        }
    }
    for (; B < A; B++) {
        if (true === C.call(D, D[B], B)) {
            return B
        }
    }
    return -1
};
baidu.array.remove = function (C, D) {
    var A = C.length, B = D;
    if ("function" != typeof D) {
        B = function (E) {
            return D === E
        }
    }
    while (A--) {
        if (true === B.call(C, C[A], A)) {
            C.splice(A, 1)
        }
    }
};
baidu.array.each = function (F, D) {
    var C, E, B, A = F.length;
    if ("function" == typeof D) {
        for (B = 0; B < A; B++) {
            E = F[B];
            C = D.call(F, E, B);
            if (C === false) {
                break
            }
        }
    }
    return F
};
baidu.each = baidu.array.each;
baidu.array.find = function (E, C) {
    var D, B, A = E.length;
    if ("function" == typeof C) {
        for (B = 0; B < A; B++) {
            D = E[B];
            if (true === C.call(E, D, B)) {
                return D
            }
        }
    }
    return null
};
baidu.array.lastIndexOf = function (C, D) {
    var A = C.length, B = D;
    if ("function" != typeof D) {
        B = function (E) {
            return D === E
        }
    }
    while (A--) {
        if (true === B.call(C, C[A], A)) {
            return A
        }
    }
    return -1
};
baidu.array.removeAt = function (B, A) {
    return B.splice(A, 1)[0]
};
baidu.lang.createClass = function (F, B) {
    B = B || {};
    var G = B.parentClass || baidu.lang.Class;
    var E = function () {
        G.call(this);
        F.apply(this, arguments);
        for (var C = 0, J = E["\x06r"].length; C < J; C++) {
            E["\x06r"][C](this)
        }
    };
    E.options = B.options || {};
    E["\x06r"] = [];
    E.regist = function (C) {
        if (typeof C == "function") {
            E["\x06r"].push(C)
        }
    };
    var I = function () {
    }, H = F.prototype;
    I.prototype = G.prototype;
    var A = E.prototype = new I();
    for (var D in H) {
        A[D] = H[D]
    }
    typeof B.className == "string" && (A._className = B.className);
    A.constructor = H.constructor;
    E.extend = function (J) {
        for (var C in J) {
            E.prototype[C] = J[C]
        }
        return E
    };
    return E
};
baidu.lang.createSingle = function (B) {
    var C = new baidu.lang.Class();
    for (var A in B) {
        C[A] = B[A]
    }
    return C
};
baidu.string.filterFormat = function (C, A) {
    var B = Array.prototype.slice.call(arguments, 1), D = Object.prototype.toString;
    if (B.length) {
        B = B.length == 1 ? (A !== null && (/\[object Array\]|\[object Object\]/.test(D.call(A))) ? A : B) : B;
        return C.replace(/#\{(.+?)\}/g, function (F, I) {
            var K, H, G, E, J;
            K = I.split("|");
            H = B[K[0]];
            if ("[object Function]" == D.call(H)) {
                H = H(I)
            }
            for (G = 1, E = K.length; G < E; ++G) {
                J = baidu.string.filterFormat[K[G]];
                if ("[object Function]" == D.call(J)) {
                    H = J(H)
                }
            }
            return ("undefined" == typeof H ? "" : H)
        })
    }
    return C
};
baidu.string.filterFormat.escapeJs = function (E) {
    if (!E || "string" != typeof E) {
        return E
    }
    var D, A, B, C = [];
    for (D = 0, A = E.length; D < A; ++D) {
        B = E.charCodeAt(D);
        if (B > 255) {
            C.push(E.charAt(D))
        } else {
            C.push("\\x" + B.toString(16))
        }
    }
    return C.join("")
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;
baidu.string.filterFormat.escapeString = function (A) {
    return A.replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/\\/g, "&#92;").replace(/\//g, "&#47;")
};
baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;
baidu.string.filterFormat.toInt = function (A) {
    return parseInt(A, 10) || 0
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;
(function () {
    baidu.page.getMousePosition = function () {
        return {x: baidu.page.getScrollLeft() + A.x, y: baidu.page.getScrollTop() + A.y}
    };
    var A = {x: 0, y: 0};
    baidu.event.on(document, "onmousemove", function (B) {
        B = window.event || B;
        A.x = B.clientX;
        A.y = B.clientY
    })
})();
(function () {
    var I, H, D, C, B, K, E, L;
    baidu.dom.drag = function (N, M) {
        if (!(I = baidu.dom.g(N))) {
            return false
        }
        H = baidu.object.extend({autoStop: true, capture: true, interval: 20}, M);
        K = parseInt(baidu.dom.getStyle(I, "top")) || 0;
        E = parseInt(baidu.dom.getStyle(I, "left")) || 0;
        var O = baidu.page.getMousePosition();
        D = O.x;
        C = O.y;
        clearTimeout(B);
        B = setInterval(A, H.interval);
        H.autoStop && baidu.event.on(document, "mouseup", G);
        baidu.event.on(document.body, "selectstart", F);
        if (H.capture && I.setCapture) {
            I.setCapture()
        } else {
            if (H.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        L = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = "none";
        typeof H.ondragstart == "function" && H.ondragstart(I, H);
        return {stop: J}
    };
    function J() {
        clearTimeout(B);
        if (H.capture && I.releaseCapture) {
            I.releaseCapture()
        } else {
            if (H.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        document.body.style.MozUserSelect = L;
        baidu.event.un(document.body, "selectstart", F);
        typeof H.ondragend == "function" && H.ondragend(I, H)
    }

    function A(Q) {
        var M = H.range, P = baidu.page.getMousePosition(), N = E + P.x - D, O = K + P.y - C;
        if (typeof M == "object" && M && M.length == 4) {
            N = Math.max(M[3], N);
            N = Math.min(M[1] - I.offsetWidth, N);
            O = Math.max(M[0], O);
            O = Math.min(M[2] - I.offsetHeight, O)
        }
        I.style.top = O + "px";
        I.style.left = N + "px";
        typeof H.ondrag == "function" && H.ondrag(I, H)
    }

    function G(M) {
        J();
        baidu.event.un(document, "mouseup", G)
    }

    function F(M) {
        return baidu.event.preventDefault(M, false)
    }
})();
baidu.dom.draggable = function (B, A) {
    A = baidu.object.extend({
        toggle: function () {
            return true
        }
    }, A || {});
    A.autoStop = true;
    if ((B = baidu.dom.g(B)) && baidu.dom.getStyle(B, "position") != "static") {
        baidu.event.on(A.handler || B, "onmousedown", function () {
            if (typeof A.toggle == "function" && !A.toggle()) {
                return
            }
            baidu.dom.drag(B, A)
        })
    }
};
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function () {
    var O = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, I = 0, D = Object.prototype.toString, N = false, H = true;
    [0, 0].sort(function () {
        H = false;
        return 0
    });
    var B = function (V, Q, Y, Z) {
        Y = Y || [];
        Q = Q || document;
        var c = Q;
        if (Q.nodeType !== 1 && Q.nodeType !== 9) {
            return []
        }
        if (!V || typeof V !== "string") {
            return Y
        }
        var W = [], S, f, j, R, U = true, T = B.isXML(Q), a = V, d, h, g, X;
        do {
            O.exec("");
            S = O.exec(a);
            if (S) {
                a = S[3];
                W.push(S[1]);
                if (S[2]) {
                    R = S[3];
                    break
                }
            }
        } while (S);
        if (W.length > 1 && J.exec(V)) {
            if (W.length === 2 && E.relative[W[0]]) {
                f = G(W[0] + W[1], Q)
            } else {
                f = E.relative[W[0]] ? [Q] : B(W.shift(), Q);
                while (W.length) {
                    V = W.shift();
                    if (E.relative[V]) {
                        V += W.shift()
                    }
                    f = G(V, f)
                }
            }
        } else {
            if (!Z && W.length > 1 && Q.nodeType === 9 && !T && E.match.ID.test(W[0]) && !E.match.ID.test(W[W.length - 1])) {
                d = B.find(W.shift(), Q, T);
                Q = d.expr ? B.filter(d.expr, d.set)[0] : d.set[0]
            }
            if (Q) {
                d = Z ? {
                    expr: W.pop(),
                    set: A(Z)
                } : B.find(W.pop(), W.length === 1 && (W[0] === "~" || W[0] === "+") && Q.parentNode ? Q.parentNode : Q, T);
                f = d.expr ? B.filter(d.expr, d.set) : d.set;
                if (W.length > 0) {
                    j = A(f)
                } else {
                    U = false
                }
                while (W.length) {
                    h = W.pop();
                    g = h;
                    if (!E.relative[h]) {
                        h = ""
                    } else {
                        g = W.pop()
                    }
                    if (g == null) {
                        g = Q
                    }
                    E.relative[h](j, g, T)
                }
            } else {
                j = W = []
            }
        }
        if (!j) {
            j = f
        }
        if (!j) {
            B.error(h || V)
        }
        if (D.call(j) === "[object Array]") {
            if (!U) {
                Y.push.apply(Y, j)
            } else {
                if (Q && Q.nodeType === 1) {
                    for (X = 0; j[X] != null; X++) {
                        if (j[X] && (j[X] === true || j[X].nodeType === 1 && B.contains(Q, j[X]))) {
                            Y.push(f[X])
                        }
                    }
                } else {
                    for (X = 0; j[X] != null; X++) {
                        if (j[X] && j[X].nodeType === 1) {
                            Y.push(f[X])
                        }
                    }
                }
            }
        } else {
            A(j, Y)
        }
        if (R) {
            B(R, c, Y, Z);
            B.uniqueSort(Y)
        }
        return Y
    };
    B.uniqueSort = function (R) {
        if (C) {
            N = H;
            R.sort(C);
            if (N) {
                for (var Q = 1; Q < R.length; Q++) {
                    if (R[Q] === R[Q - 1]) {
                        R.splice(Q--, 1)
                    }
                }
            }
        }
        return R
    };
    B.matches = function (Q, R) {
        return B(Q, null, null, R)
    };
    B.find = function (X, Q, Y) {
        var W;
        if (!X) {
            return []
        }
        for (var T = 0, S = E.order.length; T < S; T++) {
            var V = E.order[T], U;
            if ((U = E.leftMatch[V].exec(X))) {
                var R = U[1];
                U.splice(1, 1);
                if (R.substr(R.length - 1) !== "\\") {
                    U[1] = (U[1] || "").replace(/\\/g, "");
                    W = E.find[V](U, Q, Y);
                    if (W != null) {
                        X = X.replace(E.match[V], "");
                        break
                    }
                }
            }
        }
        if (!W) {
            W = Q.getElementsByTagName("*")
        }
        return {set: W, expr: X}
    };
    B.filter = function (c, a, g, U) {
        var S = c, j = [], Y = a, W, Q, X = a && a[0] && B.isXML(a[0]);
        while (c && a.length) {
            for (var Z in E.filter) {
                if ((W = E.leftMatch[Z].exec(c)) != null && W[2]) {
                    var R = E.filter[Z], h, f, T = W[1];
                    Q = false;
                    W.splice(1, 1);
                    if (T.substr(T.length - 1) === "\\") {
                        continue
                    }
                    if (Y === j) {
                        j = []
                    }
                    if (E.preFilter[Z]) {
                        W = E.preFilter[Z](W, Y, g, j, U, X);
                        if (!W) {
                            Q = h = true
                        } else {
                            if (W === true) {
                                continue
                            }
                        }
                    }
                    if (W) {
                        for (var V = 0; (f = Y[V]) != null; V++) {
                            if (f) {
                                h = R(f, W, V, Y);
                                var d = U ^ !!h;
                                if (g && h != null) {
                                    if (d) {
                                        Q = true
                                    } else {
                                        Y[V] = false
                                    }
                                } else {
                                    if (d) {
                                        j.push(f);
                                        Q = true
                                    }
                                }
                            }
                        }
                    }
                    if (h !== undefined) {
                        if (!g) {
                            Y = j
                        }
                        c = c.replace(E.match[Z], "");
                        if (!Q) {
                            return []
                        }
                        break
                    }
                }
            }
            if (c === S) {
                if (Q == null) {
                    B.error(c)
                } else {
                    break
                }
            }
            S = c
        }
        return Y
    };
    B.error = function (Q) {
        throw"Syntax error, unrecognized expression: " + Q
    };
    var E = B.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {"class": "className", "for": "htmlFor"},
        attrHandle: {
            href: function (Q) {
                return Q.getAttribute("href")
            }
        },
        relative: {
            "+": function (W, R) {
                var T = typeof R === "string", V = T && !/\W/.test(R), X = T && !V;
                if (V) {
                    R = R.toLowerCase()
                }
                for (var S = 0, Q = W.length, U; S < Q; S++) {
                    if ((U = W[S])) {
                        while ((U = U.previousSibling) && U.nodeType !== 1) {
                        }
                        W[S] = X || U && U.nodeName.toLowerCase() === R ? U || false : U === R
                    }
                }
                if (X) {
                    B.filter(R, W, true)
                }
            }, ">": function (W, R) {
                var U = typeof R === "string", V, S = 0, Q = W.length;
                if (U && !/\W/.test(R)) {
                    R = R.toLowerCase();
                    for (; S < Q; S++) {
                        V = W[S];
                        if (V) {
                            var T = V.parentNode;
                            W[S] = T.nodeName.toLowerCase() === R ? T : false
                        }
                    }
                } else {
                    for (; S < Q; S++) {
                        V = W[S];
                        if (V) {
                            W[S] = U ? V.parentNode : V.parentNode === R
                        }
                    }
                    if (U) {
                        B.filter(R, W, true)
                    }
                }
            }, "": function (T, R, V) {
                var S = I++, Q = P, U;
                if (typeof R === "string" && !/\W/.test(R)) {
                    R = R.toLowerCase();
                    U = R;
                    Q = M
                }
                Q("parentNode", R, S, T, U, V)
            }, "~": function (T, R, V) {
                var S = I++, Q = P, U;
                if (typeof R === "string" && !/\W/.test(R)) {
                    R = R.toLowerCase();
                    U = R;
                    Q = M
                }
                Q("previousSibling", R, S, T, U, V)
            }
        },
        find: {
            ID: function (R, S, T) {
                if (typeof S.getElementById !== "undefined" && !T) {
                    var Q = S.getElementById(R[1]);
                    return Q ? [Q] : []
                }
            }, NAME: function (S, V) {
                if (typeof V.getElementsByName !== "undefined") {
                    var R = [], U = V.getElementsByName(S[1]);
                    for (var T = 0, Q = U.length; T < Q; T++) {
                        if (U[T].getAttribute("name") === S[1]) {
                            R.push(U[T])
                        }
                    }
                    return R.length === 0 ? null : R
                }
            }, TAG: function (Q, R) {
                return R.getElementsByTagName(Q[1])
            }
        },
        preFilter: {
            CLASS: function (T, R, S, Q, W, X) {
                T = " " + T[1].replace(/\\/g, "") + " ";
                if (X) {
                    return T
                }
                for (var U = 0, V; (V = R[U]) != null; U++) {
                    if (V) {
                        if (W ^ (V.className && (" " + V.className + " ").replace(/[\t\n]/g, " ").indexOf(T) >= 0)) {
                            if (!S) {
                                Q.push(V)
                            }
                        } else {
                            if (S) {
                                R[U] = false
                            }
                        }
                    }
                }
                return false
            }, ID: function (Q) {
                return Q[1].replace(/\\/g, "")
            }, TAG: function (R, Q) {
                return R[1].toLowerCase()
            }, CHILD: function (Q) {
                if (Q[1] === "nth") {
                    var R = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(Q[2] === "even" && "2n" || Q[2] === "odd" && "2n+1" || !/\D/.test(Q[2]) && "0n+" + Q[2] || Q[2]);
                    Q[2] = (R[1] + (R[2] || 1)) - 0;
                    Q[3] = R[3] - 0
                }
                Q[0] = I++;
                return Q
            }, ATTR: function (U, R, S, Q, V, W) {
                var T = U[1].replace(/\\/g, "");
                if (!W && E.attrMap[T]) {
                    U[1] = E.attrMap[T]
                }
                if (U[2] === "~=") {
                    U[4] = " " + U[4] + " "
                }
                return U
            }, PSEUDO: function (U, R, S, Q, V) {
                if (U[1] === "not") {
                    if ((O.exec(U[3]) || "").length > 1 || /^\w/.test(U[3])) {
                        U[3] = B(U[3], null, null, R)
                    } else {
                        var T = B.filter(U[3], R, S, true ^ V);
                        if (!S) {
                            Q.push.apply(Q, T)
                        }
                        return false
                    }
                } else {
                    if (E.match.POS.test(U[0]) || E.match.CHILD.test(U[0])) {
                        return true
                    }
                }
                return U
            }, POS: function (Q) {
                Q.unshift(true);
                return Q
            }
        },
        filters: {
            enabled: function (Q) {
                return Q.disabled === false && Q.type !== "hidden"
            }, disabled: function (Q) {
                return Q.disabled === true
            }, checked: function (Q) {
                return Q.checked === true
            }, selected: function (Q) {
                Q.parentNode.selectedIndex;
                return Q.selected === true
            }, parent: function (Q) {
                return !!Q.firstChild
            }, empty: function (Q) {
                return !Q.firstChild
            }, has: function (S, R, Q) {
                return !!B(Q[3], S).length
            }, header: function (Q) {
                return (/h\d/i).test(Q.nodeName)
            }, text: function (Q) {
                return "text" === Q.type
            }, radio: function (Q) {
                return "radio" === Q.type
            }, checkbox: function (Q) {
                return "checkbox" === Q.type
            }, file: function (Q) {
                return "file" === Q.type
            }, password: function (Q) {
                return "password" === Q.type
            }, submit: function (Q) {
                return "submit" === Q.type
            }, image: function (Q) {
                return "image" === Q.type
            }, reset: function (Q) {
                return "reset" === Q.type
            }, button: function (Q) {
                return "button" === Q.type || Q.nodeName.toLowerCase() === "button"
            }, input: function (Q) {
                return (/input|select|textarea|button/i).test(Q.nodeName)
            }
        },
        setFilters: {
            first: function (R, Q) {
                return Q === 0
            }, last: function (S, R, Q, T) {
                return R === T.length - 1
            }, even: function (R, Q) {
                return Q % 2 === 0
            }, odd: function (R, Q) {
                return Q % 2 === 1
            }, lt: function (S, R, Q) {
                return R < Q[3] - 0
            }, gt: function (S, R, Q) {
                return R > Q[3] - 0
            }, nth: function (S, R, Q) {
                return Q[3] - 0 === R
            }, eq: function (S, R, Q) {
                return Q[3] - 0 === R
            }
        },
        filter: {
            PSEUDO: function (S, X, W, Y) {
                var Q = X[1], R = E.filters[Q];
                if (R) {
                    return R(S, W, X, Y)
                } else {
                    if (Q === "contains") {
                        return (S.textContent || S.innerText || B.getText([S]) || "").indexOf(X[3]) >= 0
                    } else {
                        if (Q === "not") {
                            var T = X[3];
                            for (var V = 0, U = T.length; V < U; V++) {
                                if (T[V] === S) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            B.error("Syntax error, unrecognized expression: " + Q)
                        }
                    }
                }
            }, CHILD: function (Q, T) {
                var W = T[1], R = Q;
                switch (W) {
                    case"only":
                    case"first":
                        while ((R = R.previousSibling)) {
                            if (R.nodeType === 1) {
                                return false
                            }
                        }
                        if (W === "first") {
                            return true
                        }
                        R = Q;
                    case"last":
                        while ((R = R.nextSibling)) {
                            if (R.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case"nth":
                        var S = T[2], Z = T[3];
                        if (S === 1 && Z === 0) {
                            return true
                        }
                        var V = T[0], Y = Q.parentNode;
                        if (Y && (Y.sizcache !== V || !Q.nodeIndex)) {
                            var U = 0;
                            for (R = Y.firstChild; R; R = R.nextSibling) {
                                if (R.nodeType === 1) {
                                    R.nodeIndex = ++U
                                }
                            }
                            Y.sizcache = V
                        }
                        var X = Q.nodeIndex - Z;
                        if (S === 0) {
                            return X === 0
                        } else {
                            return (X % S === 0 && X / S >= 0)
                        }
                }
            }, ID: function (R, Q) {
                return R.nodeType === 1 && R.getAttribute("id") === Q
            }, TAG: function (R, Q) {
                return (Q === "*" && R.nodeType === 1) || R.nodeName.toLowerCase() === Q
            }, CLASS: function (R, Q) {
                return (" " + (R.className || R.getAttribute("class")) + " ").indexOf(Q) > -1
            }, ATTR: function (V, T) {
                var S = T[1], Q = E.attrHandle[S] ? E.attrHandle[S](V) : V[S] != null ? V[S] : V.getAttribute(S), W = Q + "", U = T[2], R = T[4];
                return Q == null ? U === "!=" : U === "=" ? W === R : U === "*=" ? W.indexOf(R) >= 0 : U === "~=" ? (" " + W + " ").indexOf(R) >= 0 : !R ? W && Q !== false : U === "!=" ? W !== R : U === "^=" ? W.indexOf(R) === 0 : U === "$=" ? W.substr(W.length - R.length) === R : U === "|=" ? W === R || W.substr(0, R.length + 1) === R + "-" : false
            }, POS: function (U, R, S, V) {
                var Q = R[2], T = E.setFilters[Q];
                if (T) {
                    return T(U, S, R, V)
                }
            }
        }
    };
    var J = E.match.POS, F = function (R, Q) {
        return "\\" + (Q - 0 + 1)
    };
    for (var L in E.match) {
        E.match[L] = new RegExp(E.match[L].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        E.leftMatch[L] = new RegExp(/(^(?:.|\r|\n)*?)/.source + E.match[L].source.replace(/\\(\d+)/g, F))
    }
    var A = function (R, Q) {
        R = Array.prototype.slice.call(R, 0);
        if (Q) {
            Q.push.apply(Q, R);
            return Q
        }
        return R
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (K) {
        A = function (U, T) {
            var R = T || [], S = 0;
            if (D.call(U) === "[object Array]") {
                Array.prototype.push.apply(R, U)
            } else {
                if (typeof U.length === "number") {
                    for (var Q = U.length; S < Q; S++) {
                        R.push(U[S])
                    }
                } else {
                    for (; U[S]; S++) {
                        R.push(U[S])
                    }
                }
            }
            return R
        }
    }
    var C;
    if (document.documentElement.compareDocumentPosition) {
        C = function (R, Q) {
            if (!R.compareDocumentPosition || !Q.compareDocumentPosition) {
                if (R == Q) {
                    N = true
                }
                return R.compareDocumentPosition ? -1 : 1
            }
            var S = R.compareDocumentPosition(Q) & 4 ? -1 : R === Q ? 0 : 1;
            if (S === 0) {
                N = true
            }
            return S
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            C = function (R, Q) {
                if (!R.sourceIndex || !Q.sourceIndex) {
                    if (R == Q) {
                        N = true
                    }
                    return R.sourceIndex ? -1 : 1
                }
                var S = R.sourceIndex - Q.sourceIndex;
                if (S === 0) {
                    N = true
                }
                return S
            }
        } else {
            if (document.createRange) {
                C = function (T, R) {
                    if (!T.ownerDocument || !R.ownerDocument) {
                        if (T == R) {
                            N = true
                        }
                        return T.ownerDocument ? -1 : 1
                    }
                    var S = T.ownerDocument.createRange(), Q = R.ownerDocument.createRange();
                    S.setStart(T, 0);
                    S.setEnd(T, 0);
                    Q.setStart(R, 0);
                    Q.setEnd(R, 0);
                    var U = S.compareBoundaryPoints(Range.START_TO_END, Q);
                    if (U === 0) {
                        N = true
                    }
                    return U
                }
            }
        }
    }
    B.getText = function (Q) {
        var R = "", T;
        for (var S = 0; Q[S]; S++) {
            T = Q[S];
            if (T.nodeType === 3 || T.nodeType === 4) {
                R += T.nodeValue
            } else {
                if (T.nodeType !== 8) {
                    R += B.getText(T.childNodes)
                }
            }
        }
        return R
    };
    (function () {
        var R = document.createElement("div"), S = "script" + (new Date()).getTime();
        R.innerHTML = "<a name='" + S + "'/>";
        var Q = document.documentElement;
        Q.insertBefore(R, Q.firstChild);
        if (document.getElementById(S)) {
            E.find.ID = function (U, V, W) {
                if (typeof V.getElementById !== "undefined" && !W) {
                    var T = V.getElementById(U[1]);
                    return T ? T.id === U[1] || typeof T.getAttributeNode !== "undefined" && T.getAttributeNode("id").nodeValue === U[1] ? [T] : undefined : []
                }
            };
            E.filter.ID = function (V, T) {
                var U = typeof V.getAttributeNode !== "undefined" && V.getAttributeNode("id");
                return V.nodeType === 1 && U && U.nodeValue === T
            }
        }
        Q.removeChild(R);
        Q = R = null
    })();
    (function () {
        var Q = document.createElement("div");
        Q.appendChild(document.createComment(""));
        if (Q.getElementsByTagName("*").length > 0) {
            E.find.TAG = function (R, V) {
                var U = V.getElementsByTagName(R[1]);
                if (R[1] === "*") {
                    var T = [];
                    for (var S = 0; U[S]; S++) {
                        if (U[S].nodeType === 1) {
                            T.push(U[S])
                        }
                    }
                    U = T
                }
                return U
            }
        }
        Q.innerHTML = "<a href='#'></a>";
        if (Q.firstChild && typeof Q.firstChild.getAttribute !== "undefined" && Q.firstChild.getAttribute("href") !== "#") {
            E.attrHandle.href = function (R) {
                return R.getAttribute("href", 2)
            }
        }
        Q = null
    })();
    if (document.querySelectorAll) {
        (function () {
            var Q = B, S = document.createElement("div");
            S.innerHTML = "<p class='TEST'></p>";
            if (S.querySelectorAll && S.querySelectorAll(".TEST").length === 0) {
                return
            }
            B = function (W, V, T, U) {
                V = V || document;
                if (!U && V.nodeType === 9 && !B.isXML(V)) {
                    try {
                        return A(V.querySelectorAll(W), T)
                    } catch (X) {
                    }
                }
                return Q(W, V, T, U)
            };
            for (var R in Q) {
                B[R] = Q[R]
            }
            S = null
        })()
    }
    (function () {
        var Q = document.createElement("div");
        Q.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!Q.getElementsByClassName || Q.getElementsByClassName("e").length === 0) {
            return
        }
        Q.lastChild.className = "e";
        if (Q.getElementsByClassName("e").length === 1) {
            return
        }
        E.order.splice(1, 0, "CLASS");
        E.find.CLASS = function (R, S, T) {
            if (typeof S.getElementsByClassName !== "undefined" && !T) {
                return S.getElementsByClassName(R[1])
            }
        };
        Q = null
    })();
    function M(R, W, V, Z, X, Y) {
        for (var T = 0, S = Z.length; T < S; T++) {
            var Q = Z[T];
            if (Q) {
                Q = Q[R];
                var U = false;
                while (Q) {
                    if (Q.sizcache === V) {
                        U = Z[Q.sizset];
                        break
                    }
                    if (Q.nodeType === 1 && !Y) {
                        Q.sizcache = V;
                        Q.sizset = T
                    }
                    if (Q.nodeName.toLowerCase() === W) {
                        U = Q;
                        break
                    }
                    Q = Q[R]
                }
                Z[T] = U
            }
        }
    }

    function P(R, W, V, Z, X, Y) {
        for (var T = 0, S = Z.length; T < S; T++) {
            var Q = Z[T];
            if (Q) {
                Q = Q[R];
                var U = false;
                while (Q) {
                    if (Q.sizcache === V) {
                        U = Z[Q.sizset];
                        break
                    }
                    if (Q.nodeType === 1) {
                        if (!Y) {
                            Q.sizcache = V;
                            Q.sizset = T
                        }
                        if (typeof W !== "string") {
                            if (Q === W) {
                                U = true;
                                break
                            }
                        } else {
                            if (B.filter(W, [Q]).length > 0) {
                                U = Q;
                                break
                            }
                        }
                    }
                    Q = Q[R]
                }
                Z[T] = U
            }
        }
    }

    B.contains = document.compareDocumentPosition ? function (R, Q) {
        return !!(R.compareDocumentPosition(Q) & 16)
    } : function (R, Q) {
        return R !== Q && (R.contains ? R.contains(Q) : true)
    };
    B.isXML = function (Q) {
        var R = (Q ? Q.ownerDocument || Q : 0).documentElement;
        return R ? R.nodeName !== "HTML" : false
    };
    var G = function (Q, X) {
        var T = [], U = "", V, S = X.nodeType ? [X] : X;
        while ((V = E.match.PSEUDO.exec(Q))) {
            U += V[0];
            Q = Q.replace(E.match.PSEUDO, "")
        }
        Q = E.relative[Q] ? Q + "*" : Q;
        for (var W = 0, R = S.length; W < R; W++) {
            B(Q, S[W], T)
        }
        return B.filter(U, T)
    };
    baidu.dom.query = B
})();
baidu.page.createStyleSheet = function (A) {
    var F = A || {}, D = F.document || document, C;
    if (baidu.browser.ie) {
        return D.createStyleSheet(F.url, F.index)
    } else {
        C = "<style type='text/css'></style>";
        F.url && (C = "<link type='text/css' rel='stylesheet' href='" + F.url + "'/>");
        baidu.dom.insertHTML(D.getElementsByTagName("HEAD")[0], "beforeEnd", C);
        var B = D.styleSheets[D.styleSheets.length - 1], E = B.rules || B.cssRules;
        return {
            self: B, rules: B.rules || B.cssRules, addRule: function (G, I, H) {
                if (B.addRule) {
                    return B.addRule(G, I, H)
                } else {
                    if (B.insertRule) {
                        isNaN(H) && (H = E.length);
                        return B.insertRule(G + "{" + I + "}", H)
                    }
                }
            }, removeRule: function (G) {
                if (B.removeRule) {
                    B.removeRule(G)
                } else {
                    if (B.deleteRule) {
                        isNaN(G) && (G = 0);
                        B.deleteRule(G)
                    }
                }
            }
        }
    }
};
baidu.lang.isFunction = function (A) {
    return "[object Function]" == Object.prototype.toString.call(A)
};
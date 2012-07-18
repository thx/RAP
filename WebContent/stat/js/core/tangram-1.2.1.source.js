/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isGecko.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */

/**
 * 声明baidu包
 */
var baidu = baidu || {version: "1-2-1"}; // meizz 20100513 将 guid 升级成 \x06
baidu.guid = "$BAIDU$";//提出guid，防止修改window[undefined] 20100504 berg

/**
 * meizz 2010/02/04
 * 顶级域名 baidu 有可能被闭包劫持，而需要页面级唯一信息时需要用到下面这个对象
 */

window[baidu.guid] = window[baidu.guid] || {};

/**
 * 声明baidu.browser包
 */
baidu.browser = baidu.browser || {};

/**
 * 判断是否为isGecko
 */
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isStrict.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为标准模式
 */
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/safari.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为safari浏览器
 */
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    baidu.browser.safari = parseFloat(RegExp['\x241']);
}
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/opera.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为opera浏览器
 */
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = parseFloat(RegExp['\x241']);
}
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/chrome.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/24
 */



/**
 * 判断是否为chrome浏览器
 */
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = parseFloat(RegExp['\x241']);
}
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/ie.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为ie浏览器
 */
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.ie = baidu.browser.ie = document.documentMode || parseFloat(RegExp['\x241']);
}

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/maxthon.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为maxthon浏览器
 */
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = parseFloat(RegExp['\x241']);
    }
} catch (e) {}
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isWebkit.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为isWebkit
 */
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/firefox.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 判断是否为firefox浏览器
 */
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = parseFloat(RegExp['\x241']);
}
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/number/pad.js
 * author: dron, erik, berg
 * version: 1.1.0
 * date: 20100412
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/number.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/2
 */



/**
 * 声明baidu.number包
 */
baidu.number = baidu.number || {};

/**
 * 对目标数字进行0补齐处理
 * 
 * @param {number} source 目标数字
 * @param {number} length 需要输出的长度
 * @return {string} 对目标数字处理后的结果
 */
baidu.number.pad = function (source, length) {
    var pre = "",
        negative = (source < 0);
        string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ?  "-" : "") + pre + string;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/number/comma.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 为目标数字添加逗号分隔
 * 
 * @param {number} source          目标数字
 * @param {number} length optional 两次逗号之间的数字位数
 * @return {string} 对目标数字处理后的结果
 */
baidu.number.comma = function (source, length) {
    var pair = String(source).split('.'), 
        integer = pair[0].split('').reverse().join(''),
        reg;
    
    if (!length || length < 1) {
        length = 3;
    }

    reg = new RegExp('\\d{' + length + '}', 'g');
    integer = integer.replace(reg, 
        function (s) {
            return s + ",";
        }).split('').reverse().join('');
        
    if (integer.charAt(0) == ',') {
        integer = integer.slice(1);
    }
    
    pair[0] = integer;
    return pair.join('.');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/escapeSymbol.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 声明baidu.url包
 */
baidu.url = baidu.url || {};

/**
 * 对字符串进行%&+/#=和空格七个字符转义
 * 
 * 用于get请求转义。
 * 在服务器只接受gbk，并且页面是gbk编码时，可以经过本转义后直接发get请求
 * 
 * @param {string} source 需要转义的字符串
 * @return {string} 转义后的字符串
 */
baidu.url.escapeSymbol = function (source) {
    return String(source).replace(/\%/g, "%25")
                        .replace(/&/g, "%26")
                        .replace(/\+/g, "%2B")
                        .replace(/\ /g, "%20")
                        .replace(/\//g, "%2F")
                        .replace(/\#/g, "%23")
                        .replace(/\=/g, "%3D");
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/getQueryValue.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/escapeReg.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 声明baidu.string包
 */
baidu.string = baidu.string || {};

/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * 主要转义如下的字符： .*+?^=!:${}()|[\]/\
 * 
 * @param {string} source 目标字符串
 * @return {string} 转义后的字符串
 */
baidu.string.escapeReg = function (source) {
    return String(source)
            .replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
};

/**
 * 根据参数名从目标URL中获取参数值
 * 
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 * @return {string|null} 获取的参数值，参数不存在时返回null
 */
baidu.url.getQueryValue = function (url, key) {
    var reg = new RegExp(
                        "(^|&|\\?|#)" 
                        + baidu.string.escapeReg(key) 
                        + "=([^&]*)(&|\x24)", 
                    "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }
    
    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/jsonToQuery.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 将json对象解析成query字符串
 * 使用者应保证提供json对象中key的合法性，该方法对key不进行任何处理
 * 
 * @param {JSON}     json               需要解析的json对象
 * @param {Function} replacer optional  对值进行特殊处理的函数
 * @return {string} 解析结果字符串
 */
baidu.url.jsonToQuery = function (json, replacer) {
    var result = [], 
        len = 0, 
        key, item, itemLen;
    
    replacer = replacer || function (value) {
        return baidu.url.escapeSymbol(value);
    };
        
    for (key in json) {
        if (json.hasOwnProperty(key)) {
            item = json[key];
            // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
            if (Object.prototype.toString.call(item) == '[object Array]') {
                itemLen = item.length;
                while (itemLen--) {
                    result[len++] = key + '=' + replacer(item[itemLen], key);
                }
            } else {
                result[len++] = key + '=' + replacer(item, key);
            }
        }
    }
    return result.join('&');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/queryToJson.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 解析目标URL中的参数成json对象
 * 
 * @param {string} url 目标URL
 * @return {JSON} 解析结果对象
 */
baidu.url.queryToJson = function (url) {
    var query   = url.substr(url.indexOf('?') + 1),
        params  = query.split('&'),
        len     = params.length,
        result  = {},
        key, value, item, param;
    
    for (i = 0; i < len; i++) {
        param   = params[i].split('=');
        key     = param[0];
        value   = param[1];
        
        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (Object.prototype.toString.call(item) == '[object Array]') {
            item.push(value);
        } else { // 这里只可能是string了
            result[key] = [item, value];
        }
    }
    
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/setRaw.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/_isValidKey.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.cookie包
 */
baidu.cookie = baidu.cookie || {};

/**
 * 验证字符串是否合法的cookie键名
 * 
 * @param {string} source 需要遍历的数组
 * @return {boolean} 是否合法的cookie键名
 */
baidu.cookie._isValidKey = function (key) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string
    
    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>
        
    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

/**
 * 设置cookie的值，不对值进行编码
 * 
 * @param {string} key              需要获取Cookie的键名
 * @param {string} value            需要设置的Cookie值
 * @param {Object} options optional 设置Cookie的其他可选参数
 * @config {string}         path    cookie路径
 * @config {Date|number}    expires cookie过期时间. 如果类型是数字的话, 单位是毫秒
 * @config {string}         domain  cookie域名
 * @config {string}         secure  cookie是否安全传输
 */
baidu.cookie.setRaw = function (key, value, options) {
    if (!baidu.cookie._isValidKey(key)) {
        return;
    }
    
    options = options || {};
    //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
    //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的
    
    // 计算cookie过期时间
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }
    
    document.cookie =
        key + "=" + value
        + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "")
        + (options.secure ? "; secure" : ''); 
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/getRaw.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取cookie的值，不对值进行解码
 * 
 * @param {string} key 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值
 */
baidu.cookie.getRaw = function (key) {
    if (baidu.cookie._isValidKey(key)) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);
            
        if (result) {
            return result[2] || null;
        }
    }

    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/get.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取cookie的值，并进行decodeURIComponent解码
 * 
 * @param {string} key 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值
 */
baidu.cookie.get = function (key) {
    var value = baidu.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/set.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 设置cookie的值，并进行encodeURIComponent编码
 * 
 * @param {string} key              需要获取Cookie的键名
 * @param {string} value            需要设置的Cookie值
 * @param {Object} options optional 设置Cookie的其他可选参数
 * @config {string}         path    cookie路径
 * @config {Date|number}    expires cookie过期时间. 如果类型是数字的话, 单位是毫秒
 * @config {string}         domain  cookie域名
 * @config {string}         secure  cookie是否安全传输
 */
baidu.cookie.set = function (key, value, options) {
    baidu.cookie.setRaw(key, encodeURIComponent(value), options);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 删除cookie的值
 * 
 * @param {string} key      需要删除Cookie的键名
 * @param {JSON}   options  cookie对应的 path domain expires 等值
 *
 * 20100402 meizz 在删除 cookie 的时候若指定删除的 cookie 的 domain path 
 * 等信息与原设定的 cookie 信息不致时，是无法删除这个 cookie 的。
 */
baidu.cookie.remove = function (key, options) {
    options = options || {};
    options.expires = new Date(0);
    baidu.cookie.setRaw(key, '', options);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/parse.js
 * author: erik, berg
 * version: 1.2
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.json包
 */
baidu.json = baidu.json || {};

/**
 * 将字符串解析成json对象
 * 
 * @param {string} data 需要解析的字符串
 * @return {Object} 解析结果json对象
 */
baidu.json.parse = function (data) {
    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if (!/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {
        return null;
    }
    //优先使用原生的parse
    return window.JSON && window.JSON.parse ?
        window.JSON.parse( data ) :
        (new Function("return " + data))();
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/stringify.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */



/**
 * 将json对象序列化
 * 
 * @param {Object} value 需要序列化的json对象
 * @return {string} 序列化后的字符串
 */
baidu.json.stringify = (function () {
    /**
     * 字符串处理时需要转义的字符表
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
    
    /**
     * 字符串序列化
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g, 
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00" 
                            + Math.floor(c / 16).toString(16) 
                            + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }
    
    /**
     * 数组序列化
     * @private
     */
    function encodeArray(source) {
        var result = ["["], 
            l = source.length,
            preComma, i, item;
            
        for (i = 0; i < l; i++) {
            item = source[i];
            
            switch (typeof item) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if(preComma) {
                    result.push(',');
                }
                result.push(baidu.json.stringify(item));
                preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }
    
    /**
     * 处理日期序列化时的补零
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }
    
    /**
     * 日期序列化
     * @private
     */
    function encodeDate(source){
        return '"' + source.getFullYear() + "-" 
                + pad(source.getMonth() + 1) + "-" 
                + pad(source.getDate()) + "T" 
                + pad(source.getHours()) + ":" 
                + pad(source.getMinutes()) + ":" 
                + pad(source.getSeconds()) + '"';
    }
    
    return function (value) {
        switch (typeof value) {
        case 'undefined':
            return 'undefined';
            
        case 'number':
            return isFinite(value) ? String(value) : "null";
            
        case 'string':
            return encodeString(value);
            
        case 'boolean':
            return String(value);
            
        default:
            if (value === null) {
                return 'null';
            } else if (value instanceof Array) {
                return encodeArray(value);
            } else if (value instanceof Date) {
                return encodeDate(value);
            } else {
                var result = ['{'],
                    encode = baidu.json.stringify,
                    preComma,
                    item;
                    
                for (key in value) {
                    if (value.hasOwnProperty(key)) {
                        item = value[key];
                        switch (typeof item) {
                        case 'undefined':
                        case 'unknown':
                        case 'function':
                            break;
                        default:
                            if (preComma) {
                                result.push(',');
                            }
                            preComma = 1;
                            result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
            }
        }
    };
})();

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/encode.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/24
 */



/**
 * 将json对象序列化
 * 
 * @param {Object} value 需要序列化的json对象
 * @return {string} 序列化后的字符串
 */
baidu.json.encode = function (value) {
    return baidu.json.stringify(value);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/decode.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 将字符串解析成json对象
 * 
 * @param {string} source 需要解析的字符串
 * @return {Object} 解析结果json对象
 */
baidu.json.decode = function (source) {
    return baidu.json.parse(source);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/format.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * 声明baidu.date包
 */
baidu.date = baidu.date || {};


/**
 * 对目标日期对象进行格式化
 * 
 * @param {string}  source  目标日期对象
 * @param {string}  pattern 日期格式化规则
 * @return {string} 格式化后的字符串
 */
baidu.date.format = function (source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    var pad     = baidu.number.pad,
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(year.toString().slice(2), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/parse.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * 将目标字符串转换成日期对象
 * 
 * @param {string} source 目标字符串
 * @return {Date} 转换后的日期对象
 */
baidu.date.parse = function (source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1 
                        ? d[1].split(/[^\d]/) 
                        : [0, 0, 0],
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, 
                            d0[1] - 1, 
                            d0[2] - 0, 
                            d1[0] - 0, 
                            d1[1] - 0, 
                            d1[2] - 0);
        } else {
            return new Date(source);
        }
    }
    
    return new Date();
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilter/color.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilters.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.dom包
 */
baidu.dom = baidu.dom || {};

/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFilter = baidu.dom._styleFilter || [];


/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function (key, value) {
        if (/color/i.test(key) && value.indexOf("rgb(") != -1) {
            var array = value.split(",");

            value = "#";
            for (var i = 0, color; color = array[i]; i++){
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }

            value = value.toUpperCase();
        }

        return value;
    }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilter/filter.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 为获取和设置样式的过滤器
 * @private
 */
baidu.dom._styleFilter.filter = function (key, value, method) {
    for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
            value = filter(key, value);
        }
    }

    return value;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilter/px.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function (key, value) {
        if (value.constructor == Number 
            && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(key)){
            value = value + "px";
        }

        return value;
    }
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFixer/display.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/24
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFixer.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer = baidu.dom._styleFixer || {};



/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? { // berg: 修改到<8，因为ie7同样存在这个问题，from 先伟
    set: function (element, value) {
        element = element.style;
        if (value == 'inline-block') {
            element.display = 'inline';
            element.zoom = 1;
        } else {
            element.display = value;
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (element, value) {
        element.style.display = value == 'inline-block' ? '-moz-inline-box' : value;
    }
} : null;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All right reserved.
 * 
 * path: baidu/dom/_styleFixer/float.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */

/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFixer/opacity.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */




/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function (element) {
        var filter = element.style.filter;
        filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1";
    },

    set: function (element, value) {
        var style = element.style;
        // 只能Quirks Mode下面生效??
        style.filter = (style.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (value == 1 ? "" : "alpha(opacity=" + value * 100 + ")");
        // IE filters only apply to elements with "layout."
        style.zoom = 1;
    }
} : null;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFixer/textOverflow.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */





/**
 * 提供给setStyle与getStyle使用，在做textOverflow时会向element对象中添加,_baiduOverflow, _baiduHTML两个属性保存原始的innerHTML信息
 */
baidu.dom._styleFixer.textOverflow = (function () {
    var fontSizeCache = {};

    function pop(list) {
        var o = list.length;
        if (o > 0) {
            o = list[o - 1];
            list.length--;
        } else {
            o = null;
        }
        return o;
    }

    function setText(element, text) {
        element[baidu.browser.firefox ? "textContent" : "innerText"] = text;
    }

    function count(element, width, ellipsis) {
        /* 计算cache的名称 */
        var o = baidu.browser.ie ? element.currentStyle || element.style : getComputedStyle(element, null),
            fontWeight = o.fontWeight,
            cacheName =
                "font-family:" + o.fontFamily + ";font-size:" + o.fontSize
                + ";word-spacing:" + o.wordSpacing + ";font-weight:" + ((parseInt(fontWeight) || 0) == 401 ? 700 : fontWeight)
                + ";font-style:" + o.fontStyle + ";font-variant:" + o.fontVariant,
            cache = fontSizeCache[cacheName];

        if (!cache) {
            o = element.appendChild(document.createElement("div"));

            o.style.cssText = "float:left;" + cacheName;
            cache = fontSizeCache[cacheName] = [];

            /* 计算ASCII字符的宽度cache */
            for (i = 0; i < 256; i++) {
                i == 32 ? (o.innerHTML = "&nbsp;") : setText(o, String.fromCharCode(i));
                cache[i] = o.offsetWidth;
            }

            /* 计算非ASCII字符的宽度、字符间距、省略号的宽度 */
            setText(o, "一");
            cache[256] = o.offsetWidth;
            setText(o, "一一");
            cache[257] = o.offsetWidth - cache[256] * 2;
            cache[258] = cache[".".charCodeAt(0)] * 3 + cache[257] * 3;

            element.removeChild(o);
        }

        for (
            /* wordWidth是每个字符或子节点计算之前的宽度序列 */
            var node = element.firstChild, charWidth = cache[256], wordSpacing = cache[257], ellipsisWidth = cache[258],
                wordWidth = [], ellipsis = ellipsis ? ellipsisWidth : 0;
            node;
            node = node.nextSibling
        ) {
            if (width < ellipsis) {
                element.removeChild(node);
            }
            else if (node.nodeType == 3) {
                for (var i = 0, text = node.nodeValue, length = text.length; i < length; i++) {
                    o = text.charCodeAt(i);
                    /* 计算增加字符后剩余的长度 */
                    wordWidth[wordWidth.length] = [width, node, i];
                    width -= (i ? wordSpacing : 0) + (o < 256 ? cache[o] : charWidth);
                    if (width < ellipsis) {
                        break;
                    }
                }
            }
            else {
                o = node.tagName;
                if (o == "IMG" || o == "TABLE") {
                    /* 特殊元素直接删除 */
                    o = node;
                    node = node.previousSibling;
                    element.removeChild(o);
                }
                else {
                    wordWidth[wordWidth.length] = [width, node];
                    width -= node.offsetWidth;
                }
            }
        }

        if (width < ellipsis) {
            /* 过滤直到能得到大于省略号宽度的位置 */
            while (o = pop(wordWidth)) {
                width = o[0];
                node = o[1];
                o = o[2];
                if (node.nodeType == 3) {
                    if (width >= ellipsisWidth) {
                        node.nodeValue = node.nodeValue.substring(0, o) + "...";
                        return true;
                    }
                    else if (!o) {
                        element.removeChild(node);
                    }
                }
                else if (count(node, width, true)) {
                    return true;
                }
                else {
                    element.removeChild(node);
                }
            }

            /* 能显示的宽度小于省略号的宽度，直接不显示 */
            element.innerHTML = "";
        }
    }

    return {
		get: function (element, style) {
            var browser = baidu.browser;
			return (browser.opera ? style.OTextOverflow : browser.firefox ? element._baiduOverflow: style.textOverflow) || "clip";
		},

		set: function (element, value) {
            var browser = baidu.browser;
			if (element.tagName == "TD" || element.tagName == "TH" || browser.firefox) {
				element._baiduHTML && (element.innerHTML = element._baiduHTML);

				if (value == "ellipsis") {
					element._baiduHTML = element.innerHTML;
					var o = document.createElement("div"), width = element.appendChild(o).offsetWidth;
					element.removeChild(o);
					count(element, width);
				}
				else {
					element._baiduHTML = "";
				}
			}

			o = element.style;
			browser.opera ? (o.OTextOverflow = value) : browser.firefox ? (element._baiduOverflow = value) : (o.textOverflow = value);
		}
    };
})();
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/setAttrs.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/g.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 从文档中获取指定的DOM元素
 * 
 * @param {string|HTMLElement} id 元素的id或DOM元素
 * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
 */
baidu.dom.g = function (id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        //todo: 以后把这个判断去掉，不做验证。
        return id;
    }
    return null;
};

// 声明快捷方法
baidu.g = baidu.G = baidu.dom.g;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/setAttr.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_NAME_ATTRS.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */




/**
 * 提供给setAttr与getAttr方法作名称转换使用
 * ie6,7下class要转换成className
 */

baidu.dom._NAME_ATTRS = (function () {
    var result = {
        'cellpadding': 'cellPadding',
        'cellspacing': 'cellSpacing',
        'colspan': 'colSpan',
        'rowspan': 'rowSpan',
        'valign': 'vAlign',
        'usemap': 'useMap',
        'frameborder': 'frameBorder'
    };
    
    if (baidu.browser.ie < 8) {
        result['for'] = 'htmlFor';
        result['class'] = 'className';
    } else {
        result['htmlFor'] = 'for';
        result['className'] = 'class';
    }
    
    return result;
})();

/**
 * 设置DOM元素的属性值
 * 获取元素属性使用getAttr方法
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string}             key     属性名称
 * @param {string}             value   属性值
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.setAttr = function (element, key, value) {
    element = baidu.dom.g(element);

    if ('style' == key){
        element.style.cssText = value;
    } else {
        key = baidu.dom._NAME_ATTRS[key] || key;
        element.setAttribute(key, value);
    }

    return element;
};

// 声明快捷方法
baidu.setAttr = baidu.dom.setAttr;
/**
 * 批量设置DOM元素的属性值
 * 获取元素属性使用getAttr方法
 * 
 * @param {HTMLElement|string} element    目标元素或目标元素的id
 * @param {Object}             attributes 属性集合
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.setAttrs = function (element, attributes) {
    element = baidu.dom.g(element);

    for (var key in attributes) {
        baidu.dom.setAttr(element, key, attributes[key]);
    }

    return element;
};

// 声明快捷方法
baidu.setAttrs = baidu.dom.setAttrs;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getAttr.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 获取DOM元素指定的属性值
 * 设置元素属性使用setAttr方法
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string}             key     属性名称
 * @return {string} DOM元素的属性值，不存在的属性返回null
 */
baidu.dom.getAttr = function (element, key) {
    element = baidu.dom.g(element);

    if ('style' == key){
        return element.style.cssText;
    }

    key = baidu.dom._NAME_ATTRS[key] || key;
    return element.getAttribute(key);
};

// 声明快捷方法
baidu.getAttr = baidu.dom.getAttr;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/prev.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_matchNode.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */



/**
 * 从目标元素指定的方向搜索元素
 *
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             direction 遍历的方向名称，取值为previousSibling,nextSibling
 * @param {string}             start     遍历的开始位置，取值为firstChild,lastChild,previousSibling,nextSibling
 * @return {HTMLElement} 搜索到的元素，如果没有找到，返回 null
 */
baidu.dom._matchNode = function (element, direction, start) {
    element = baidu.dom.g(element);

    for (var node = element[start]; node; node = node[direction]) {
        if (node.nodeType == 1) {
            return node;
        }
    }

    return null;
};

/**
 * 获取目标元素之前的一个元素节点
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 之前的元素节点，如果没有找到，返回 null
 */
baidu.dom.prev = function (element) {
    return baidu.dom._matchNode(element, 'previousSibling', 'previousSibling');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All right reserved.
 * 
 * path: baidu/dom/addClass.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/trim.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/15
 */



(function () {
    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    
    /**
     * 删除目标字符串两端的空白字符
     * 
     * @param {string} source 目标字符串
     * @return {string} 删除两端空白字符后的字符串
     */
    baidu.string.trim = function (source) {
        return String(source)
                .replace(trimer, "");
    };
})();

// 声明快捷方法
baidu.trim = baidu.string.trim;
/**
 * 添加目标元素的className
 * 使用者应保证提供的className合法性，不应包含不合法字符
 * className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html
 * 
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             className 要添加的class。允许同时添加多个class，中间使用空白符分隔
 * @return {string} 被操作的DOM元素
 */
baidu.dom.addClass = function (element, className) {
    element = baidu.dom.g(element);

    var trim = baidu.string.trim,
        classes = trim(className).split(/\s+/), 
        len = classes.length;
    className = element.className.split(/\s+/).join(" ");

    while (len--) {
        (new RegExp("(^| )" + classes[len] + "( |\x24)")).test(className)
            && classes.splice(len, 1);
    }

    element.className = trim(className + ' ' + classes.join(" "));
    return element;
};

// 声明快捷方法
baidu.addClass = baidu.dom.addClass;
/**
 * 判断一个DOM元素或一个字符串内是否存在指定的className
 * @static
 * 
 * @param {HTMLElement|string}  element   目标元素或目标元素的id
 * @param {String|Array}        className 要判断的class，可以是多个className用空格拼接
 * 
 * @return {Boolean}            如果要寻找的classname有一个或多个不在元素的className中，返回false
 */






baidu.dom.hasClass = function (element, className) {
    element = baidu.dom.g(element);
    var classArray = baidu.string.trim(className).split(/\s+/), 
        len = classArray.length;

    className = element.className.split(/\s+/).join(" ");

    while (len--) {
        if(!(new RegExp("(^| )" + classArray[len] + "( |\x24)")).test(className)){
            return false;
        }
    }
    return true;

};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/contains.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 判断一个元素是否包含另一个元素
 * 
 * @param {HTMLElement|string} container 包含的元素或元素的id
 * @param {HTMLElement|string} contained 被包含的元素或元素的id
 * @return {boolean} contained元素是否被包含于container元素的DOM节点上
 */
baidu.dom.contains = function (container, contained) {

    var g = baidu.dom.g;
    container = g(container);
    contained = g(contained);

    return container.contains
        ? container != contained && container.contains(contained)
        : !!(container.compareDocumentPosition(contained) & 16);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getDocument.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取目标元素所属的document对象
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLDocument} element所属的document对象
 */
baidu.dom.getDocument = function (element) {
    element = baidu.dom.g(element);
    return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/removeClass.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 移除目标元素的className
 * 使用者应保证提供的className合法性，不应包含不合法字符
 * className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html
 * 
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             className 要移除的class，允许同时移除多个class，中间使用空白符分隔
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.removeClass = function (element, className) {
    element = baidu.dom.g(element);
    var trim = baidu.string.trim;

    element.className =
        trim(element.className.split(/\s+/).join("  ")
                .replace(
                    new RegExp("(^| )(" 
                        + trim(className).split(/\s+/).join("|") 
                        + ")( |\x24)", "g"), 
                    " ")
                .replace(/\s+/g, ' '));

    return element;
};

// 声明快捷方法
baidu.removeClass = baidu.dom.removeClass;


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/children.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取目标元素的直接子元素列表
 * 
 * @param {HTMLElement|String} element 目标元素或目标元素的id
 * @return {Array} DOM元素列表
 */
baidu.dom.children = function (element) {
    element = baidu.dom.g(element);

    for (var children = [], tmpEl = element.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
        if (tmpEl.nodeType == 1) {
            children.push(tmpEl);
        }
    }
    
    return children;    
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/setStyles.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/setStyle.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */




/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/toCamelCase.js
 * author: erik, berg
 * version: 1.2
 * date: 2010-06-22
 */



/**
 * 将目标字符串进行驼峰化处理
 * todo:考虑以后去掉下划线支持？
 * 
 * @param {string} source 目标字符串
 * @return {string} 驼峰化处理后的字符串
 */
baidu.string.toCamelCase = function (source) {
    //提前判断，提高getStyle等的效率 thanks xianwei
    if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
        return source;
    }
    return source.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
};

/**
 * 设置DOM元素的样式值
 * 
 * @param {HTMLElement|string}  element 目标元素或目标元素的id
 * @param {string}              key     要设置的样式名
 * @param {string}              value   要设置的样式值
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.setStyle = function (element, key, value) {
    var dom = baidu.dom, fixer;
    
    // 放弃了对firefox 0.9的opacity的支持
    element = dom.g(element);
    key = baidu.string.toCamelCase(key);

    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'set');
    }

    fixer = dom._styleFixer[key];
    (fixer && fixer.set) ? fixer.set(element, value) : (element.style[fixer || key] = value);

    return element;
};

// 声明快捷方法
baidu.setStyle = baidu.dom.setStyle;

/**
 * 批量设置DOM元素的样式值
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Object}             styles  要设置的样式集合
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.setStyles = function (element, styles) {
    element = baidu.dom.g(element);

    for (var key in styles) {
        baidu.dom.setStyle(element, key, styles[key]);
    }

    return element;
};

// 声明快捷方法
baidu.setStyles = baidu.dom.setStyles;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/q.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */





/**
 * 通过className获取元素
 * 不保证返回数组中DOM节点的顺序和文档中DOM节点的顺序一致。
 * 
 * @param {string}             className        需要搜索的class，只能指定单一的class，如果为空字符串或者纯空白的字符串，返回null
 * @param {HTMLElement|string} element optional 从这个节点开始搜索，没有的话，默认是document
 * @param {string}             tagName optional 指定要获取元素的标签名，如果没有值或者值为空字符串或者纯空白的字符串，表示不限制
 * @return {Array} 结果的数组，如果没有结果，数组的长度为0，或者是className参数错误，返回null。
 */
baidu.dom.q = function (className, element, tagName) {
    var result = [], 
    trim = baidu.string.trim, 
    len, i, elements, node;

    if (!(className = trim(className))) {
        return null;
    }
    
    // 初始化element参数
    if ('undefined' == typeof element) {
        element = document;
    } else {
        element = baidu.dom.g(element);
        if (!element) {
            return result;
        }
    }
    
    // 初始化tagName参数
    tagName && (tagName = trim(tagName).toUpperCase());
    
    // 查询元素
    if (element.getElementsByClassName) {
        elements = element.getElementsByClassName(className); 
        len = elements.length;
        for (i = 0; i < len; i++) {
            node = elements[i];
            if (tagName && node.tagName != tagName) {
                continue;
            }
            result[result.length] = node;
        }
    } else {
        className = new RegExp(
                        "(^|\\s)" 
                        + baidu.string.escapeReg(className)
                        + "(\\s|\x24)");
        elements = tagName 
                    ? element.getElementsByTagName(tagName) 
                    : (element.all || element.getElementsByTagName("*"));
        len = elements.length;
        for (i = 0; i < len; i++) {
            node = elements[i];
            className.test(node.className) && (result[result.length] = node);
        }
    }

    return result;
};

// 声明快捷方法
baidu.q = baidu.Q = baidu.dom.q;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/intersect.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/12/02
 */


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getPosition.js
 * author: --
 * version: 1.0.0
 * date: 2009/--/--
 */



/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getStyle.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */







/**
 * 获取DOM元素的样式值
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string}             key     要获取的样式名
 * @return {string} 要获取的样式值
 */
baidu.dom.getStyle = function (element, key) {
    var dom = baidu.dom;

    element = dom.g(element);
    key = baidu.string.toCamelCase(key);

    var value = element.style[key];
    
    // 在取不到值的时候，用fixer进行修正
    if (!value) {
        var fixer = dom._styleFixer[key],
        	/* 在IE下，Element没有在文档树上时，没有currentStyle属性 */
    	    style = element.currentStyle || (baidu.browser.ie ? element.style : getComputedStyle(element, null));
            
        if ('string' == typeof fixer) {
            value = style[fixer];
        } else if (fixer && fixer.get) {
            value = fixer.get(element, style);
        } else {
            value = style[key];
        }
    }
    
    /* 检查结果过滤器 */
    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'get');
    }

    return value;
};

// 声明快捷方法
baidu.getStyle = baidu.dom.getStyle;






/*
 * 获取目标元素元素相对于整个文档左上角的位置
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {Object} 
 *   {
 *       left:xx,//{integer} 页面距离页面左上角的水平偏移量
 *       top:xx //{integer} 页面距离页面坐上角的垂直偏移量
 *   }
 */
baidu.dom.getPosition = function (element) {
    var doc = baidu.dom.getDocument(element), 
        browser = baidu.browser,
        getStyle = baidu.dom.getStyle;

    element = baidu.dom.g(element);

    // Gecko browsers normally use getBoxObjectFor to calculate the position.
    // When invoked for an element with an implicit absolute position though it
    // can be off by one. Therefor the recursive implementation is used in those
    // (relatively rare) cases.
    var BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 && 
                                 doc.getBoxObjectFor &&
                                 getStyle(element, 'position') == 'absolute' &&
                                 (element.style.top === '' || element.style.left === '');

    // NOTE(arv): If element is hidden (display none or disconnected or any the
    // ancestors are hidden) we get (0,0) by default but we still do the
    // accumulation of scroll position.

    var pos = {"left":0,"top":0};

    var viewportElement = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement;
    
    if(element == viewportElement){
        // viewport is always at 0,0 as that defined the coordinate system for this
        // function - this avoids special case checks in the code below
        return pos;
    }

    var parent = null;
    var box;

    if(element.getBoundingClientRect){ // IE and Gecko 1.9+
        box = element.getBoundingClientRect();

        pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        pos.top  = Math.floor(box.top)  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop);
	        
        // IE adds the HTML element's border, by default it is medium which is 2px
        // IE 6 and 7 quirks mode the border width is overwritable by the following css html { border: 0; }
        // IE 7 standards mode, the border is always 2px
        // This border/offset is typically represented by the clientLeft and clientTop properties
        // However, in IE6 and 7 quirks mode the clientLeft and clientTop properties are not updated when overwriting it via CSS
        // Therefore this method will be off by 2px in IE while in quirksmode
        pos.left -= doc.documentElement.clientLeft;
        pos.top  -= doc.documentElement.clientTop;

        if(browser.ie && !browser.isStrict){
            pos.left -= getStyle(viewportElement, 'border-left-width');
            pos.top  -= getStyle(viewportElement, 'border-top-width');
        }
    } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT/* && !goog.style.BUGGY_CAMINO_*/){ // gecko
        // Gecko ignores the scroll values for ancestors, up to 1.9.  See:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
        // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

        box = doc.getBoxObjectFor(element);
        var vpBox = doc.getBoxObjectFor(viewportElement);
        pos.left = box.screenX - vpBox.screenX;
        pos.top  = box.screenY - vpBox.screenY;
    } else { // safari/opera
        parent = element;

        do {
            pos.left += parent.offsetLeft;
            pos.top  += parent.offsetTop;
      
            // In Safari when hit a position fixed element the rest of the offsets
            // are not correct.
            if (browser.isWebkit > 0 && getStyle(parent, 'position') == 'fixed') {
                pos.left += doc.body.scrollLeft;
                pos.top  += doc.body.scrollTop;
                break;
            }
            
            parent = parent.offsetParent;
        } while (parent && parent != element);

        // opera & (safari absolute) incorrectly account for body offsetTop
        if(browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') == 'absolute')){
            pos.top  -= doc.body.offsetTop;
        }

        // accumulate the scroll positions for everything but the body element
        parent = element.offsetParent;
        while (parent && parent != doc.body) {
            pos.left -= parent.scrollLeft;
            // see https://bugs.opera.com/show_bug.cgi?id=249965
            if (!b.opera || parent.tagName != 'TR') {
                pos.top -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }

    return pos;
};

/**
 * 检查两个元素是否相交
 * 
 * @param {HTMLElement|string} element1 要检查的元素或要检查的元素id
 * @param {HTMLElement|string} element2 要检查的元素或要检查的元素id
 * @return {boolean} 是否相交
 */
baidu.dom.intersect = function (element1, element2) {
    var g = baidu.dom.g, 
        getPosition = baidu.dom.getPosition, 
        max = Math.max, 
        min = Math.min;

    element1 = g(element1);
    element2 = g(element2);

    var pos1 = getPosition(element1),
        pos2 = getPosition(element2);

    return max(pos1.left, pos2.left) <= min(pos1.left + element1.offsetWidth, pos2.left + element2.offsetWidth)
        && max(pos1.top, pos2.top) <= min(pos1.top + element1.offsetHeight, pos2.top + element2.offsetHeight);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/last.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */



/**
 * 获取目标元素的最后一个子元素节点
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 最后一个子元素，如果没有找到，返回 null
 */
baidu.dom.last = function (element) {
    return baidu.dom._matchNode(element, 'previousSibling', 'lastChild');
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/ready.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */





/**
 * 使函数在页面加载完毕时调用
 * 
 * @param {Function} callback 页面加载完时的回调函数
 */
baidu.dom.ready = function () {
    var isReady = false,
        readyBound = false,
        readyList = [];

    function ready() {
        if (!isReady) {
            isReady = true;
            for (var i = 0, j = readyList.length; i < j; i++) {
                    readyList[i]();
            }
        }
    }

    function bindReady() {
        if (readyBound) {
            return;
        }
        readyBound = true;

        var doc = document, w = window, opera = baidu.browser.opera;

        // Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
        if (doc.addEventListener && !opera) {
            // Use the handy event callback
            doc.addEventListener("DOMContentLoaded", opera ? function () {
                if (isReady) {
                    return;
                }
                for (var i = 0; i < doc.styleSheets.length; i++) {
                    if (doc.styleSheets[i].disabled) {
                        setTimeout( arguments.callee, 0 );
                        return;
                    }
                }
                // and execute any waiting functions
                ready();
            } : ready, false);
        } else if (baidu.browser.ie && w == top) {
            // If IE is used and is not in a frame
            // Continually check to see if the doc is ready
            (function () {
                if (isReady) {
                    return;
                }

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    doc.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                // and execute any waiting functions
                ready();
            })();
        } else if (baidu.browser.safari) {
            var numStyles;
            (function () {
                if (isReady) {
                    return;
                }
                if (doc.readyState != "loaded" && doc.readyState != "complete") {
                    setTimeout( arguments.callee, 0 );
                    return;
                }
                if (numStyles === undefined) {
                    numStyles = 0;
                    var s1 = doc.getElementsByTagName('style');
                    var s2 = doc.getElementsByTagName('link');
                    if (s1) {
                        numStyles += s1.length;
                    }
                    if (s2) {
                        for (var i = 0, j = s2.length; i < j; i ++) {
                            if (s2[i].getAttribute("rel") == "stylesheet") {
                                numStyles ++;
                            }
                        }
                    }
                }
                // numStyles = jQuery("style, link[rel=stylesheet]").length;
                if (doc.styleSheets.length != numStyles) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                // and execute any waiting functions
                ready();
            })();
        }

        // A fallback to window.onload, that will always work
        w.attachEvent ? w.attachEvent("onload", ready) : w.addEventListener("load", ready, false);
    }

    return function (callback) {
        bindReady();
        isReady ? callback() : (readyList[readyList.length] = callback);
    };
}();
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getAncestorByTag.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 获取目标元素指定标签名的最近的祖先元素
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string}             tagName 祖先元素的标签名
 * @return {HTMLElement} 祖先元素，如果找不到返回null
 */
baidu.dom.getAncestorByTag = function (element, tagName) {
    element = baidu.dom.g(element);
    tagName = tagName.toUpperCase();

    while ((element = element.parentNode) && element.nodeType == 1) {
        if (element.tagName == tagName) {
            return element;
        }
    }

    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getWindow.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 获取目标元素所属的window对象
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {Window} element所属的window对象
 */
baidu.dom.getWindow = function (element) {
    element = baidu.dom.g(element);
    var doc = baidu.dom.getDocument(element);
    
    // 没有考虑版本低于safari2的情况
    // @see goog/dom/dom.js#goog.dom.DomHelper.prototype.getWindow
    return doc.parentWindow || doc.defaultView || null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getAncestorBy.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 获取目标元素指定class的最近的祖先元素
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Function}           method  判断祖先元素条件的函数
 * @return {HTMLElement} 祖先元素，如果找不到返回null
 */
baidu.dom.getAncestorBy = function (element, method) {
    element = baidu.dom.g(element);

    while ((element = element.parentNode) && element.nodeType == 1) {
        if (method(element)) {
            return element;
        }
    }

    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/hide.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 隐藏目标元素
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.hide = function (element) {
    element = baidu.dom.g(element);
    element.style.display = "none";

    return element;
};

// 声明快捷方法
baidu.hide = baidu.dom.hide;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/next.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */



/**
 * 获取目标元素之后的一个元素节点
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 之后的元素节点，如果没有找到，返回 null
 */
baidu.dom.next = function (element) {
    return baidu.dom._matchNode(element, 'nextSibling', 'nextSibling');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/show.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 显示目标元素
 * 存在的问题是：如果在CSS中定义的样式是display:none
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.show = function (element) {
    element = baidu.dom.g(element);
    element.style.display = "";

    return element;
};

// 声明快捷方法
baidu.show = baidu.dom.show;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/toggle.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 改变目标元素的显示/隐藏状态
 * 存在的问题是：如果在CSS中定义的样式是display:none
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLElement} 被操作的DOM元素
 */
baidu.dom.toggle = function (element) {
    element = baidu.dom.g(element);
    element.style.display = element.style.display == "none" ? "" : "none";

    return element;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/insertAfter.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 将目标元素添加到基准元素之后
 * 
 * @param {HTMLElement|string} newElement   被添加的目标元素
 * @param {HTMLElement|string} existElement 基准元素
 * @return {HTMLElement} 被添加的DOM元素
 */
baidu.dom.insertAfter = function (newElement, existElement) {
    var g, existParent;
    g = baidu.dom.g;
    //因为baidu.g会过滤textNode，这里兼容textNode
    newElement = g(newElement) || newElement;
    existElement = g(existElement) || existElement;
    existParent = existElement.parentNode;
    
    if (existParent) {
        existParent.insertBefore(newElement, existElement.nextSibling);
    }
    return newElement;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/first.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/18
 */



/**
 * 获取目标元素的第一个子元素节点
 *
 * @param {HTMLElement|String} element 目标元素或目标元素的id
 * @return {HTMLElement} 第一个子元素，如果没有找到，返回 null
 */
baidu.dom.first = function (element) {
    return baidu.dom._matchNode(element, 'nextSibling', 'firstChild');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/insertBefore.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 将目标元素添加到基准元素之前
 * 
 * @param {HTMLElement|string} newElement   被添加的目标元素
 * @param {HTMLElement|string} existElement 基准元素
 * @return {HTMLElement} 被添加的DOM元素
 */
baidu.dom.insertBefore = function (newElement, existElement) {
    var g, existParent;
    g = baidu.dom.g;
    //因为baidu.g会过滤textNode，这里兼容textNode
    newElement = g(newElement) || newElement;
    existElement = g(existElement) || existElement;
    existParent = existElement.parentNode;

    if (existParent) {
        existParent.insertBefore(newElement, existElement);
    }

    return newElement;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/insertHTML.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * 获取目标元素所属的window对象
 * 如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
 *
 * @param {HTMLElement|string} element  目标元素或目标元素的id
 * @param {string}             position 插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string}             html     要插入的html
 */
baidu.dom.insertHTML = function (element, position, html) {
    element = baidu.dom.g(element);

    if (element.insertAdjacentHTML) {
        element.insertAdjacentHTML(position, html);
    } else {
        // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
        // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
        var range = element.ownerDocument.createRange();
        range.setStartBefore(element);
        var fragment = range.createContextualFragment(html),
            parent = element.parentNode, tmpEl;
        switch (position.toUpperCase()) {
            case 'BEFOREBEGIN':
                parent.insertBefore(fragment, element);
                break;
            case 'AFTERBEGIN':
                element.insertBefore(fragment, element.firstChild);
                break;
            case 'BEFOREEND':
                element.appendChild(fragment);
                break;
            case 'AFTEREND':
                (tmpEl = element.nextSibling) ? parent.insertBefore(fragment, tmpEl) : parent.appendChild(fragment);
        }
    }

        // 如果要代码最精简，还有一种写法
        // var fragment = range.createContextualFragment(html),
        //     parent = element.parentNode, tmpEl = element;
        // switch (position.toUpperCase()) {
        //     case 'AFTERBEGIN':
        //         element = element.firstChild;
        //     case 'BEFOREBEGIN':
        //         parent.insertBefore(fragment, element);
        //         break;
        //     case 'BEFOREEND':
        //         element.appendChild(fragment);
        //         break;
        //     case 'AFTEREND':
        //         (element = element.nextSibling) ? parent.insertBefore(fragment, element) : parent.appendChild(fragment);
        // }


        // 增加一次判断，代码可以更少
        // var fragment = range.createContextualFragment(html),
        //     parent = element.parentNode, tmpEl = element;
        // switch (position.toUpperCase()) {
        //     case 'AFTERBEGIN':
        //         element = element.firstChild;
        //         break;
        //     case 'BEFOREEND':
        //         parent = element;
        //         element = null;
        //         break;
        //     case 'AFTEREND':
        //         element = element.nextSibling;
        // }
        // element ? parent.insertBefore(fragment, element) : parent.appendChild(fragment);
};

baidu.insertHTML = baidu.dom.insertHTML;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/remove.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */




/**
 * 从DOM树上移除目标元素
 * 
 * @param {Element|String} element 必需，目标元素或目标元素的id
 * @return {Element} 被操作的DOM元素
 */
baidu.dom.remove = function (element) {
    element = baidu.dom.g(element);

    if ("HTML BODY HEAD".indexOf(element.nodeName) == -1) {
        if (baidu.browser.ie) {
            var tmpEl = document.createElement('DIV');
            tmpEl.appendChild(element);
            tmpEl.innerHTML = '';
        } else {
            (tmpEl = element.parentNode) && tmpEl.removeChild(element);
        }
    }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/getAncestorByClass.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 获取目标元素指定class的最近的祖先元素
 * 使用者应保证提供的className合法性，不应包含不合法字符
 * className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html
 *
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             className 祖先元素的class，只支持单个class
 * @return {HTMLElement} 祖先元素，如果找不到返回null
 */
baidu.dom.getAncestorByClass = function (element, className) {
    element = baidu.dom.g(element);
    className = new RegExp("(^|\\s)" + baidu.string.trim(className) + "(\\s|\x24)");

    while ((element = element.parentNode) && element.nodeType == 1) {
        if (className.test(element.className)) {
            return element;
        }
    }

    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/instance.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/_instances.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.lang包
 */
baidu.lang = baidu.lang || {};


/**
 * 所有类的实例的容器
 * key为每个实例的guid
 */

window[baidu.guid]._instances = window[baidu.guid]._instances || {};

/**
 * 根据参数(guid)的指定，返回对应的实例对象引用
 * 
 * @param {string} guid 需要获取实例的guid
 * @return {Object|null} 如果存在的话，返回;否则返回null。
 */
baidu.lang.instance = function (guid) {
    return window[baidu.guid]._instances[guid] || null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isNumber.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否number类型或Number对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isNumber = function (source) {
    return '[object Number]' == Object.prototype.toString.call(source);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Class.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/guid.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/02/04
 */

/**
 * 产生一个当前页面的唯一标识字符串
 * 
 * @return {String} 返回一个页面唯一的 GUID
 */


baidu.lang.guid = function() {
    return "TANGRAM__" + (window[baidu.guid]._counter ++).toString(36);
};

window[baidu.guid]._counter = window[baidu.guid]._counter || 1;


/**
 * baidu.JS框架的基类
 * @param {string} guid 可以在类的实例化时指定类的guid
 */
baidu.lang.Class = function(guid) {
    this.guid = guid || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this;
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};

/**
 * 释放对象所持有的资源。
 * 主要是自定义事件。
 * 好像没有将_listeners中绑定的事件剔除掉..
 */
baidu.lang.Class.prototype.dispose = function(){
    delete window[baidu.guid]._instances[this.guid];

    for(var property in this){
        if (typeof this[property] != "function"){
            delete this[property];
        }
    }
};

/**
 * 重载了默认的toString方法，使得返回信息更加准确一些。
 * @return {string} 对象的String表示形式
 */
baidu.lang.Class.prototype.toString = function(){
    return "[object " + (this._className || "Object" ) + "]";
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/inherits.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/24
 */



/**
 * 为类型构造器建立继承关系
 * 
 * @param {Function} subClass            子类构造器
 * @param {Function} superClass          父类构造器
 * @param {string}   className optional  类名标识
 */
baidu.lang.inherits = function (subClass, superClass, className) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();
    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    if ("string" == typeof className) {
        proto._className = className;
    }
};

// 声明快捷方法
baidu.inherits = baidu.lang.inherits;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isElement.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否Element对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isElement = function (source) {
    return !!(source && source.nodeName && source.nodeType == 1);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/module.js
 * author: erik, berg
 * version: 1.1.1
 * date: 2010-04-19
 */



/**
 * 增加自定义模块扩展
 * 默认创建在当前作用域
 * 
 * @param {string} name            需要创建的模块名
 * @param {Any}    module          需要创建的模块对象
 * @param {Object} owner optional  模块创建的目标环境
 */
baidu.lang.module = function (name, module, owner) {
    var packages = name.split('.'), 
        len = packages.length - 1,
        packageName, i = 0;        

    //如果没有owner，找当前作用域，如果当前作用域没有此变量，在window创建
    
    if(!owner){
        try{
            if(!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])){
                throw "";
            }
            owner = eval(packages[0]);
            i=1;
        }catch(e){
            owner = window;
        }
    }/*else{
        i = 0;
    }*/
        
    for (; i < len; i++) {
        packageName = packages[i];
        if (!owner[packageName]) {
            owner[packageName] = {};
        }
        owner = owner[packageName];
    }
    
    if (!owner[packages[len]]) {
        owner[packages[len]] = module;
    }
};

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/decontrol.js
 * author: meizz
 * version: 1.1.0
 * $date$
 */



/**
 * 解除 window[baidu.guid]._instances 对类实例的引用关系
 *
 * @param   {String}    guid    类的唯一标识
 */
baidu.lang.decontrol = function(guid) {
    var m = window[baidu.guid];
    m._instances && (delete m._instances[guid]);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isArray.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否Array对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Event.js
 * author: meizz, erik, berg
 * version: 1.1.1
 * date: 2009/11/24
 * modify: 2010/04/19 berg
 */




/**
 * 自定义的事件对象
 * 
 * @config {string}   事件的名称
 * @config {boolean}  当事件发生之后处理结果的返回值
 * @config {Object}   在事件被触发后传递的对象
 * @config {Object}   触发该事件的对象
 */
baidu.lang.Event = function (type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
};

/**
 * 扩展baidu.lang.Class来添加自定义事件
 * 
 * @param {string}   type         自定义事件的名称
 * @param {Function} handler      自定义事件被触发时应该调用的回调函数
 * @param {string}   key optional 绑定到事件上的函数对应的索引key
 */
baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
    if (typeof handler != "function") {
        return;
        // throw("addEventListener:" + handler + " is not a function");
    }

    !this.__listeners && (this.__listeners = {});

    var t = this.__listeners, id;
    if (typeof key == "string" && key) {
        if (/[^\w\-]/.test(key)) {
            throw("nonstandard key:" + key);
        } else {
            handler.hashCode = key; 
            id = key;
        }
    }
    type.indexOf("on") != 0 && (type = "on" + type);

    typeof t[type] != "object" && (t[type] = {});
    id = id || baidu.lang.guid();
    handler.hashCode = id;
    t[type][id] = handler;
};
 
/**
 * 删除自定义事件中绑定的一个回调函数。如果第二个参数handler没有被
 * 绑定到对应的自定义事件中，什么也不做。
 * 
 * @param {string}   type     自定义事件的名称
 * @param {Function} handler  需要删除的自定义事件的函数或者该函数对应的索引key
 */
baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
    if (typeof handler == "function") {
        handler = handler.hashCode;
    } else if (typeof handler != "string") {
        return;
    }

    !this.__listeners && (this.__listeners = {});

    type.indexOf("on") != 0 && (type = "on" + type);

    var t = this.__listeners;
    if (!t[type]) {
        return;
    }
    t[type][handler] && delete t[type][handler];
};


/**
 * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。
 * 
 * 但是这些绑定函数的执行顺序无法保证。
 * 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用
 * 直接绑定到对象上面的自定义事件。例如：
 * myobj.onMyEvent = function(){}
 * myobj.addEventListener("onMyEvent", function(){});
 * 
 * @param {baidu.lang.Event|String}     event   派发的自定义事件类型
 * @param {JSON}                        options 合在event对象传递的参数
 */
baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
    if("string" == typeof event){
        event = new baidu.lang.Event(event);
    }
    !this.__listeners && (this.__listeners = {});

    // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
    options = options || {};
    for (var i in options) {
        typeof event[i] == "undefined" && (event[i] = options[i]);
    }

    var i, t = this.__listeners, p = event.type;
    event.target = event.target || this;
    event.currentTarget = this;

    typeof this[p] == "function" && this[p].apply(this, arguments);

    p.indexOf("on") != 0 && (p = "on" + p);

    if (typeof t[p] == "object") {
        for (i in t[p]) {
            t[p][i].apply(this, arguments);
        }
    }
    return event.returnValue;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isObject.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否Object对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isObject = function (source) {
    return 'function' == typeof source || !!(source && 'object' == typeof source);
};

// 声明快捷方法
baidu.isObject = baidu.lang.isObject;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isString.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 */



/**
 * 判断目标参数是否string类型或String对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};

// 声明快捷方法
baidu.isString = baidu.lang.isString;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/getPageX.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.event包
 */
baidu.event = baidu.event || {};

/**
 * 获取鼠标事件的鼠标x坐标
 * 
 * @param {Event} event 事件对象
 * @return {number} 鼠标事件的鼠标x坐标
 */
baidu.event.getPageX = function (event) {
    var result = event.pageX,
        doc = document;
    if (!result && result !== 0) {
        result = (event.clientX || 0) 
                    + (doc.documentElement.scrollLeft 
                        || doc.body.scrollLeft);
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/getPageY.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */



/**
 * 获取鼠标事件的鼠标y坐标
 * 
 * @param {Event} event 事件对象
 * @return {number} 鼠标事件的鼠标y坐标
 */
baidu.event.getPageY = function (event) {
    var result = event.pageY,
        doc = document;
    if (!result && result !== 0) {
        result = (event.clientY || 0) 
                    + (doc.documentElement.scrollTop 
                        || doc.body.scrollTop);
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/stop.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/stopPropagation.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 停止事件的传播
 * 
 * @param {Event} event 事件对象
 */
baidu.event.stopPropagation = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/preventDefault.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 阻止事件的默认行为
 * 
 * @param {Event} event 事件对象
 */
baidu.event.preventDefault = function (event) {
   if (event.preventDefault) {
       event.preventDefault();
   } else {
       event.returnValue = false;
   }
};

/**
 * 停止事件
 * 
 * @param {Event} event 事件对象
 */
baidu.event.stop = function (event) {
    var e = baidu.event;
    e.stopPropagation(event);
    e.preventDefault(event);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/getTarget.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取事件的触发元素
 * 
 * @param {Event} event 事件对象
 * @return {HTMLElement} 事件的触发元素
 */
baidu.event.getTarget = function (event) {
    return event.target || event.srcElement;
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/EventArg.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */



/**
 * 事件对象构造器
 * 监听框架中事件时需要传入框架window对象
 * 
 * @param {Event}   event        事件对象
 * @param {Window}  win optional 窗口对象，默认为window
 */
baidu.event.EventArg = function (event, win) {
    win = win || window;
    event = event || win.event;
    var doc = win.document;
    
    this.target = event.srcElement;
    this.keyCode = event.which || event.keyCode;
    for (var k in event) {
        var item = event[k];
        // 避免拷贝preventDefault等事件对象方法
        if ('function' != typeof item) {
            this[k] = item;
        }
    }
    
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (event.clientX || 0) 
                        + (doc.documentElement.scrollLeft 
                            || doc.body.scrollLeft);
        this.pageY = (event.clientY || 0) 
                        + (doc.documentElement.scrollTop 
                            || doc.body.scrollTop);
    }
    this._event = event;
};

/**
 * 阻止事件的默认行为
 */
baidu.event.EventArg.prototype.preventDefault = function () {
    if (this._event.preventDefault) {
        this._event.preventDefault();
    } else {
        this._event.returnValue = false;
    }
    return this;
};

/**
 * 停止事件的传播
 */
baidu.event.EventArg.prototype.stopPropagation = function () {
    if (this._event.stopPropagation) {
        this._event.stopPropagation();
    } else {
        this._event.cancelBubble = true;
    }
    return this;
};

/**
 * 停止事件
 */
baidu.event.EventArg.prototype.stop = function () {
    return this.stopPropagation().preventDefault();
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/on.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/_listeners.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/_unload.js
 * author: erik, berg
 * version: 1.1.0
 * date: 2009/12/16
 */



/**
 * 卸载所有事件监听器
 * @private
 */
baidu.event._unload = function () {
    var lis = baidu.event._listeners,
        len = lis.length,
        standard = !!window.removeEventListener,
        item, el;
        
    while (len--) {
        item = lis[len];
        //20100409 berg: 不解除unload的绑定，保证用户的事件一定会被执行
        //否则用户挂载进入的unload事件也可能会在这里被删除
        if(item[1] == 'unload'){
            continue;
        }
        el = item[0];
        if (el.removeEventListener) {
            el.removeEventListener(item[1], item[3], false);
        } else if (el.detachEvent){
            el.detachEvent('on' + item[1], item[3]);
        }
    }
    
    if (standard) {
        window.removeEventListener('unload', baidu.event._unload, false);
    } else {
        window.detachEvent('onunload', baidu.event._unload);
    }
};

// 在页面卸载的时候，将所有事件监听器移除
if (window.attachEvent) {
    window.attachEvent('onunload', baidu.event._unload);
} else {
    window.addEventListener('unload', baidu.event._unload, false);
}

/**
 * 事件监听器的存储表
 * @private
 */
baidu.event._listeners = baidu.event._listeners || [];

/**
 * 为目标元素添加事件监听器
 * 
 * @param {HTMLElement|string|window} element  目标元素或目标元素id
 * @param {string}                    type     事件类型
 * @param {Function}                  listener 事件监听器
 * @return {HTMLElement} 目标元素
 */
baidu.event.on = function (element, type, listener) {
    type = type.replace(/^on/i, '');
    if ('string' == typeof element) {
        element = baidu.dom.g(element);
    }

    var fn = function (ev) {
            // 这里不支持EventArgument
            // 原因是跨frame的时间挂载
            listener.call(element, ev);
        },
        lis = baidu.event._listeners;
    
    // 将监听器存储到数组中
    lis[lis.length] = [element, type, listener, fn];
    
    // 事件监听器挂载
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn);
    } 
    
    return element;
};

// 声明快捷方法
baidu.on = baidu.event.on;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/get.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 获取扩展的事件对象
 * 
 * @param {Event}  event 原生事件对象
 * @param {window} win   窗体对象
 * @return {EventArg} 扩展的事件对象
 */
baidu.event.get = function (event, win) {
    return new baidu.event.EventArg(event, win);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/un.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */



/**
 * 为目标元素移除事件监听器
 * 
 * @param {HTMLElement|string|window} element  目标元素或目标元素id
 * @param {string}                    type     事件类型
 * @param {Function}                  listener 事件监听器
 * @return {HTMLElement} 目标元素
 */
baidu.event.un = function (element, type, listener) {
    if ('string' == typeof element) {
        element = baidu.dom.g(element);
    }
    type = type.replace(/^on/i, '');
    
    var lis = baidu.event._listeners, 
        len = lis.length,
        isRemoveAll = !listener,
        item;
    
    while (len--) {
        item = lis[len];
        
        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            if (element.removeEventListener) {
                element.removeEventListener(type, item[3], false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, item[3]);
            }
            lis.splice(len, 1);
        }
    }
    
    return element;
};

// 声明快捷方法
baidu.un = baidu.event.un;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/getKeyCode.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 获取键盘事件的键值
 * 
 * @param {Event} event 事件对象
 * @return {number} 键盘事件的键值
 */
baidu.event.getKeyCode = function (event) {
    return event.which || event.keyCode;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax/post.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/13
 */



/**
 * 声明baidu.ajax包
 */
baidu.ajax = baidu.ajax || {};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax/request.js
 * author: allstar, erik, berg
 * version: 1.1.1
 * date: 2009/12/02
 */



/**
 * 使用XMLHttpRequest对象发送请求
 * 
 * @param {String} url              需要发送请求的地址
 * @param {Object} options optional 发送请求的其他可选参数
 * @config {boolean}      async      是否是异步请求。默认是异步请求
 * @config {string}       data       需要发送的数据。如果是GET请求的话，不需要这个属性
 * @config {string}       username   用户名
 * @config {string}       password   密码
 * @config {string}       method     请求的类型，默认是GET
 * @config {Object}       headers    要设置的request headers
 * @config {Function}     onsuccess  请求成功之后调用的函数。传递的参数是xhr对象
 * @config {Function}     onfailure  请求失败之后调用的函数。传递的参数是xhr对象
 * @config {Function}     onstatus   请求成功之后调用的函数。传递的参数是xhr对象和状态码
 * @config {Function}     on状态码   如事件是on404时，如果返回码是404，调用这个函数
 * @config {boolean}      noCache    是否需要缓存，默认为false，默认是缓存的
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
baidu.ajax.request = function (url, options) {
    /**
     * readyState发生变更时调用
     * 
     * @ignore
     */
    function stateChangeHandler() {
        if (xhr.readyState == 4) {
            try {
                var stat = xhr.status;
            } catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('failure');
                return;
            }
            
            fire(stat);
            
            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout      
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable
            
            // IE error sometimes returns 1223 when it 
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat == 304
                || stat == 1223) {
                fire('success');
            } else {
                fire('failure');
            }
            
            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             * 
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             * 
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    // 避免内存泄露
                    xhr.onreadystatechange = new Function();
                    if (async) {
                        xhr = null;
                    }
                }, 0);
        }
    }
    
    /**
     * 获取XMLHttpRequest对象
     * 
     * @ignore
     * @return {XMLHttpRequest} XMLHttpRequest对象
     */
    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    
    /**
     * 触发事件
     * 
     * @ignore
     * @param {String} type 事件类型
     */
    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type],
            globelHandler = baidu.ajax[type];
        
        // 不对事件类型进行验证
        if (handler) {
            if (type != 'onsuccess') {
                handler(xhr);
            } else {
                handler(xhr, xhr.responseText);
            }
        } else if (globelHandler) {
            //onsuccess不支持全局事件
            if (type == 'onsuccess') {
                return;
            }
            globelHandler(xhr);
        }
    }
    
    
    options = options || {};
    var data        = options.data || "",
        async       = !(options.async === false),
        username    = options.username || "",
        password    = options.password || "",
        method      = (options.method || "GET").toUpperCase(),
        headers     = options.headers || {},
        eventHandlers = {},
        key, xhr;
    
    for (key in options) {
        // 将options参数中的事件参数复制到eventHandlers对象中
        // 这里复制所有options的成员，eventHandlers有冗余
        // 但是不会产生任何影响，并且代码紧凑
        eventHandlers[key] = options[key];
    }
    
    headers['X-Request-By'] = 'baidu.ajax';
    
    
    try {
        xhr = getXHR();
        
        if (method == 'GET') {
            url += (url.indexOf('?') >= 0 ? '&' : '?');
            if (data) {
                url += data + '&';
                data = null;
            }
            if(options['noCache'])
                url += 'b' + (new Date()).getTime() + '=1';
        }
        
        if (username) {
            xhr.open(method, url, async, username, password);
        } else {
            xhr.open(method, url, async);
        }
        
        if (async) {
            xhr.onreadystatechange = stateChangeHandler;
        }
        
        // 在open之后再进行http请求头设定
        if (method == 'POST') {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        
        for (key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        
        fire('beforerequest');
        xhr.send(data);
        
        if (!async) {
            stateChangeHandler();
        }
    } catch (ex) {
        fire('failure');
    }
    
    return xhr;
};

/**
 * 发送post请求的简单外观接口
 * 
 * @param {string}   url                需要发送请求的地址
 * @param {string}   data               需要发送的数据
 * @param {Function} onsuccess optional 请求成功之后调用的函数。传递的参数是xhr对象
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
baidu.ajax.post = function (url, data, onsuccess) {
    return baidu.ajax.request(
        url, 
        {
            'onsuccess': onsuccess,
            'method': 'POST',
            'data': data
        }
    );
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax/get.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 发送get请求的简单外观接口
 * 
 * @param {string}   url                需要发送请求的地址
 * @param {Function} onsuccess optional 请求成功之后调用的函数
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
baidu.ajax.get = function (url, onsuccess) {
    return baidu.ajax.request(url, {'onsuccess': onsuccess});
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax/form.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */




/**
 * 将一个表单用ajax方式提交
 * 
 * @param {HTMLFormElement} form             需要提交的表单元素
 * @param {Object}          options optional 发送请求的选项参数
 * @config {boolean}  async      是否是异步请求。默认是异步请求
 * @config {string}   username   用户名
 * @config {string}   password   密码
 * @config {Object}   headers    要设置的request headers
 * @config {Function} replacer   对参数值特殊处理的函数
 * @config {Function} onsuccess  请求成功之后调用的函数。传递的参数是xhr对象
 * @config {Function} onfailure  请求失败之后调用的函数。传递的参数是xhr对象
 * @config {Function} onstatus   请求成功之后调用的函数。传递的参数是xhr对象和状态码
 * @config {Function} on状态码    如事件是on404时，如果返回码是404，调用这个函数
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
baidu.ajax.form = function (form, options) {
    options = options || {};
    var elements    = form.elements,
        len         = elements.length,
        method      = form.getAttribute('method'),
        url         = form.getAttribute('action'),
        replacer    = options.replacer || function (value, name) {
            return value;
        },
        sendOptions = {},
        data = [],
        i, item, itemType, itemName, itemValue, 
        opts, oi, oLen, oItem;
        
    /**
     * 向缓冲区添加参数数据
     * @private
     */
    function addData(name, value) {
        data.push(name + '=' + value);
    }
    
    // 复制发送参数选项对象
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            sendOptions[i] = options[i];
        }
    }
    
    for (i = 0; i < len; i++) {
        item = elements[i];
        itemName = item.name;
        
        // 处理：可用并包含表单name的表单项
        if (!item.disabled && itemName) {
            itemType = item.type;
            itemValue = item.value;
        
            switch (itemType) {
            // radio和checkbox被选中时，拼装queryString数据
            case 'radio':
            case 'checkbox':
                if (!item.checked) {
                    break;
                }
                
            // 默认类型，拼装queryString数据
            case 'textarea':
            case 'text':
            case 'password':
            case 'hidden':
            case 'select-one':
                addData(itemName, replacer(itemValue, itemName));
                break;
                
            // 多行选中select，拼装所有选中的数据
            case 'select-multiple':
                opts = item.options;
                oLen = opts.length;
                for (oi = 0; oi < oLen; oi++) {
                    oItem = opts[oi];
                    if (oItem.selected) {
                        addData(itemName, replacer(oItem.value, itemName));
                    }
                }
                break;
            }
        }
    }
    
    // 完善发送请求的参数选项
    sendOptions.data = data.join('&');
    sendOptions.method = form.getAttribute('method') || 'POST';
    
    // 发送请求
    return baidu.ajax.request(url, sendOptions);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/sio/callByBrowser.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/sio.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */



/**
 * 声明baidu.sio包
 */
baidu.sio = baidu.sio || {};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/sio/_removeScriptTag.js
 * author: berg
 * thanks: kexin, xuejian
 * version: 1.0.0
 * date: 20100527
 */



/**
 * 删除script的属性，再删除script标签，以解决修复内存泄漏的问题
 *
 * 
 * @param {object}          scr               script节点
 */
baidu.sio._removeScriptTag = function(scr){
    if (scr.clearAttributes) {
        scr.clearAttributes();
    } else {
        for (var attr in scr) {
            if (scr.hasOwnProperty(attr)) {
                delete scr[attr];
            }
        }
    }
    if(scr && scr.parentNode){
        scr.parentNode.removeChild(scr);
    }
    scr = null;
};

/**
 * 通过script标签加载数据，加载完成由浏览器端触发回调
 * 
 * 如果请求了一个不存在的页面，onsuccess函数也可能被调用（在IE/opera下）。
 * 因此使用者需要在onsuccess函数中判断数据是否正确加载
 * 
 * @param {string}   url                加载数据的url
 * @param {Function} callback optional  数据加载结束时调用的函数
 */
baidu.sio.callByBrowser = function (url, callback) {
    var scr = document.createElement("SCRIPT"),
        scriptLoaded = 0,
        attr;
    
    // IE和opera支持onreadystatechange
    // safari、chrome、opera支持onload
    scr.onload = scr.onreadystatechange = function () {
        // 避免opera下的多次调用
        if (scriptLoaded) {
            return;
        }
        
        var readyState = scr.readyState;
        if ('undefined' == typeof readyState
            || readyState == "loaded"
            || readyState == "complete") {
            scriptLoaded = 1;
            try {
                ('function' == typeof callback) && callback();
            } finally {
                baidu.sio._removeScriptTag(scr);
            }
        }
    };
    
    scr.setAttribute('type', 'text/javascript');
    scr.setAttribute('src', url);
    document.getElementsByTagName("head")[0].appendChild(scr);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/sio/callByServer.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */




/**
 * 通过script标签加载数据，加载完成由服务器端触发回调
 * 
 * @param {string}          url               加载数据的url
 * @param {string|Function} callback optional 服务器端调用的函数或函数名
 */
baidu.sio.callByServer = function (url, callback) {
    var scr = document.createElement("SCRIPT"),
        prefix = "bd__cbs__",
        callbackType = typeof callback,
        callbackName,
        attr;
        
    if ('string' == callbackType) {
        callbackName = callback;
    } else if ('function' == callbackType) {
        while (1) {
            callbackName = prefix 
                + Math.floor(Math.random() * 2147483648).toString(36);
            if (!window[callbackName]) {
                window[callbackName] = function () {
                    try {
                        callback.apply(window, arguments);
                    } finally {
                        baidu.sio._removeScriptTag(scr);
                        window[callbackName] = null;
                    }
                };
                break;
            }
        }
    }
    
    if ('string' == typeof callbackName) {
        url = url.replace(/(\?|&)callback=[^&]*/, '\x241callback=' + callbackName);
        if (url.search(/(\?|&)callback=/) < 0) {
            url += (url.indexOf("?") < 0 ? "?" : "&");
            url += 'callback=' + callbackName;
        }
    }
    
    scr.setAttribute('type', 'text/javascript');
    scr.setAttribute('src', url);
    document.getElementsByTagName("head")[0].appendChild(scr);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/version.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 声明baidu.swf包
 */
baidu.swf = baidu.swf || {};

/**
 * 浏览器支持的flash插件版本
 */
baidu.swf.version = (function () {
    var n = navigator;
    if (n.plugins && n.mimeTypes.length) {
        var plugin = n.plugins["Shockwave Flash"];
        if (plugin && plugin.description) {
            return plugin.description
                    .replace(/([a-zA-Z]|\s)+/, "")
                    .replace(/(\s)+r/, ".") + ".0";
        }
    } else if (window.ActiveXObject && !window.opera) {
        for (var i = 10; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g,'').replace(/,/g,'.');
                }
            } catch(e) {}
        }
    }
})();/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/createHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 创建flash对象的html字符串
 * 
 * @param {Object} options              创建flash的选项参数
 * @config {string} id                  要创建的flash的标识
 * @config {string} url                 flash文件的url
 * @config {string} ver                 最低需要的flash player版本号
 * @config {string} width               flash的宽度
 * @config {string} height              flash的高度
 * @config {string} align               flash的对齐方式
 * @config {string} base                设置用于解析swf文件中的所有相对路径语句的基本目录或URL
 * @config {string} bgcolor             swf文件的背景色
 * @config {string} salign              缩放的swf文件在由width和height设置定义的区域内的位置
 * @config {string} menu                是否显示右键菜单
 * @config {string} loop                播放到最后一帧时是否重新播放
 * @config {string} play                flash是否在浏览器加载时就开始播放
 * @config {string} quality             设置flash播放的画质
 * @config {string} scale               设置flash内容如何缩放来适应设置的宽高
 * @config {string} wmode               flash的显示模式
 * @config {string} allowscriptaccess   flash与页面的通信权限
 * @config {string} allownetworking     设置swf文件中允许使用的网络API
 * @config {string} allowfullscreen     是否允许flash全屏
 * @config {string} seamlesstabbing     允许设置执行无缝跳格，从而使用户能跳出flash应用程序。该参数只能在安装Flash7及更高版本的Windows中使用
 * @config {string} devicefont          静态文本对象是否以设备字体呈现
 * @config {string} swliveconnect       第一次加载flash时浏览器是否应启动Java
 * @config {Object} vars                要传递给flash的参数
 * @return {string} flash对象的html字符串
 */
baidu.swf.createHTML = function (options) {
    options = options || {};
    var version = baidu.swf.version, 
        needVersion = options['ver'] || '6.0.0', 
        vUnit1, vUnit2, i, k, len, item, tmpOpt = {};
    
    // 复制options，避免修改原对象
    for (k in options) {
        tmpOpt[k] = options[k];
    }
    options = tmpOpt;
    
    // 浏览器支持的flash插件版本判断
    if (version) {
        version = version.split('.');
        needVersion = needVersion.split('.');
        for (i = 0; i < 3; i++) {
            vUnit1 = parseInt(version[i], 10);
            vUnit2 = parseInt(needVersion[i], 10);
            if (vUnit2 < vUnit1) {
                break;
            } else if (vUnit2 > vUnit1) {
                return ''; // 需要更高的版本号
            }
        }
    } else {
        return ''; // 未安装flash插件
    }
    
    var vars = options['vars'],
        objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
    
    // 初始化object标签需要的classid、codebase属性值
    options['align']    = options['align'] || 'middle';
    options['classid']  = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
    options['movie']    = options['url'] || '';
    delete options['vars'];
    delete options['url'];
    
    // 初始化flashvars参数的值
    if ('string' == typeof vars) {
        options['flashvars'] = vars;
    } else {
        var fvars = [];
        for (k in vars) {
            item = vars[k];
            if (item) {
                fvars.push(k + "=" + encodeURIComponent(item));
            }
        }
        options['flashvars'] = fvars.join('&');
    }
    
    // 构建IE下支持的object字符串，包括属性和参数列表
    var str = ['<object '];
    for (i = 0, len = objProperties.length; i < len; i++) {
        item = objProperties[i];
        str.push(' ', item, '="', options[item], '"');
    }
    str.push('>');
    var params = {
        'wmode'             : 1,
        'scale'             : 1,
        'quality'           : 1,
        'play'              : 1,
        'loop'              : 1,
        'menu'              : 1,
        'salign'            : 1,
        'bgcolor'           : 1,
        'base'              : 1,
        'allowscriptaccess' : 1,
        'allownetworking'   : 1,
        'allowfullscreen'   : 1,
        'seamlesstabbing'   : 1,
        'devicefont'        : 1,
        'swliveconnect'     : 1,
        'flashvars'         : 1,
        'movie'             : 1
    };
    
    for (k in options) {
        item = options[k];
        k = k.toLowerCase();
        if (params[k] && item) {
            str.push('<param name="' + k + '" value="' + item + '" />');
        }
    }
    
    // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
    options['src']  = options['movie'];
    options['name'] = options['id'];
    delete options['id'];
    delete options['movie'];
    delete options['classid'];
    delete options['codebase'];
    options['type']        = 'application/x-shockwave-flash';
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
    
    
    // 构建embed标签的字符串
    str.push('<embed');
    // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
    // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
    var salign;
    for (k in options) {
        item = options[k];
        if (item) {
            if ((new RegExp("^salign\x24", "i")).test(k)) {
                salign = item;
                continue;
            }
            
            str.push(' ', k, '="', item, '"');
        }
    }
    
    if (salign) {
        str.push(' salign="', salign, '"');
    }
    str.push('></embed></object>');
    
    return str.join('');
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/getMovie.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */



/**
 * 获得flash对象的实例
 * 
 * @param {string} name flash对象的名称
 * @return {HTMLElement} flash对象的实例
 */
baidu.swf.getMovie = function (name) {
    return document[name] || window[name];
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/create.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 在页面中创建一个flash对象
 * 
 * @param {Object} options 创建flash的选项参数
 * @config {string} id                  要创建的flash的标识
 * @config {string} url                 flash文件的url
 * @config {String} errorMessage        未安装flash player或flash player版本号过低时的提示
 * @config {string} ver                 最低需要的flash player版本号
 * @config {string} width               flash的宽度
 * @config {string} height              flash的高度
 * @config {string} align               flash的对齐方式
 * @config {string} base                设置用于解析swf文件中的所有相对路径语句的基本目录或URL
 * @config {string} bgcolor             swf文件的背景色
 * @config {string} salign              缩放的swf文件在由width和height设置定义的区域内的位置
 * @config {string} menu                是否显示右键菜单
 * @config {string} loop                播放到最后一帧时是否重新播放
 * @config {string} play                flash是否在浏览器加载时就开始播放
 * @config {string} quality             设置flash播放的画质
 * @config {string} scale               设置flash内容如何缩放来适应设置的宽高
 * @config {string} wmode               flash的显示模式
 * @config {string} allowscriptaccess   flash与页面的通信权限
 * @config {string} allownetworking     设置swf文件中允许使用的网络API
 * @config {string} allowfullscreen     是否允许flash全屏
 * @config {string} seamlesstabbing     允许设置执行无缝跳格，从而使用户能跳出flash应用程序。该参数只能在安装Flash7及更高版本的Windows中使用
 * @config {string} devicefont          静态文本对象是否以设备字体呈现
 * @config {string} swliveconnect       第一次加载flash时浏览器是否应启动Java
 * @config {Object} vars                要传递给flash的参数
 * @param {HTMLElement|string} target optional 创建flash的父容器元素
 */
baidu.swf.create = function (options, target) {
    options = options || {};
    var html = baidu.swf.createHTML(options) 
               || options['errorMessage'] 
               || '';
                
    if (target && 'string' == typeof target) {
        target = document.getElementById(target);
    }
    
    if (target) {
        target.innerHTML = html;
    } else {
        document.write(html);
    }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/extend.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 声明baidu.object包
 */
baidu.object = baidu.object || {};

/**
 * 将源对象的所有属性拷贝到目标对象中
 * 
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 目标对象
 */
baidu.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    
    return target;
};

// 声明快捷方法
baidu.extend = baidu.object.extend;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/each.js
 * author: berg
 * version: 1.1.1
 * date: 2010-04-19
 */



/**
 * 循环遍历object中的每一个元素
 * 
 * @param {Array}    source   需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数
 * @return {Array} 遍历的数组
 */
baidu.object.each = function (source, iterator) {
    var returnValue, key, item; 
    if ('function' == typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, item, key);
        
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/keys.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标对象的键名列表
 * 
 * @param {Object} source 目标对象
 * @return {Array} 键名列表
 */
baidu.object.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/values.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标对象的值列表
 * 
 * @param {Object} source 目标对象
 * @return {Array} 值列表
 */
baidu.object.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/extend.js
 * author: erik, berg
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 对一个object进行深度拷贝
 * 
 * @param {Any} source 需要进行拷贝的对象
 * @return {Any} 拷贝后的新对象
 */

baidu.object.clone  = (function(buildInObject){
    return function (source) {
        var result = source, i, len;
        if (!source
            || source instanceof Number
            || source instanceof String
            || source instanceof Boolean) {
            return result;
        } else if (source instanceof Array) {
            result = [];
            var resultLen = 0;
            for (i = 0, len = source.length; i < len; i++) {
                result[resultLen++] = baidu.object.clone(source[i]);
            }
        } else if ('object' == typeof source) {
            if(buildInObject[Object.prototype.toString.call(source)]){
                return result;
            }
            result = {};
            for (i in source) {
                if (source.hasOwnProperty(i)) {
                    result[i] = baidu.object.clone(source[i]);
                }
            }
        }
        return result;
    };
})({
    // buildInObject, 用于处理无法遍历Date等对象的问题
    '[object Function]': 1,
    '[object RegExp]'  : 1,
    '[object Date]'    : 1,
    '[object Error]'   : 1 
});
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/getByteLength.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 获取目标字符串在gbk编码下的字节长度
 * 假设：非x00-xff的都是双字节
 * 
 * @param {string} source 目标字符串
 * @return {number} 字节长度
 */
baidu.string.getByteLength = function (source) {
    return String(source).replace(/[^\x00-\xff]/g, "ci").length;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/decodeHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 对目标字符串进行html解码
 * 
 * @param {string} source 目标字符串
 * @return {string} html解码后的字符串
 */
baidu.string.decodeHTML = function (source) {
    return String(source)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
};

baidu.decodeHTML = baidu.string.decodeHTML;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/format.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 对目标字符串进行格式化
 * 
 * @param {string}          source  目标字符串
 * @param {Object|string*}  opts    提供相应数据的对象
 * @return {string} 格式化后的字符串
 */
baidu.string.format = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return source.replace(/#\{(.+?)\}/g, function (match, key){
	    	var replacer = data[key];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(key);
	    	}
	    	return ('undefined' == typeof replacer ? '' : replacer);
    	});
    }
    return source;
};

// 声明快捷方法
baidu.format = baidu.string.format;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/wbr.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 为目标字符串添加<wbr>软换行
 * 
 * @param {string} source 目标字符串
 * @return {string} 添加软换行后的字符串
 */
baidu.string.wbr = function (source) {
    return String(source)
        .replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
        .replace(/><wbr>/g, '>');
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/subByte.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 对目标字符串按gbk编码截取字节长度
 * 
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @return {string} 字符串截取结果
 */
baidu.string.subByte = function (source, length) {
    source = String(source);
    var getLen = baidu.string.getByteLength,
        i, len, current, next, currentLen, nextLen;
        
    if (length < 0 || getLen(source) <= length) {
        return source;
    }
    
    len = source.length;
    for (i = Math.floor(length / 2) - 1; i < len; i++) {
        current = next || source.substr(0, i);
        currentLen = nextLen || getLen(current);
        if (currentLen == length) {
            return current;
        } else {
            next = source.substr(0, i + 1);
            nextLen = getLen(next);

            if (nextLen > length) {
                return current;
            }
        }
    }

    return source;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/toHalfWidth.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 将目标字符串中常见全角字符转换成半角字符
 * 
 * @param {string} source 目标字符串
 * @return {string} 转换后的字符串
 */
baidu.string.toHalfWidth = function (source) {
    return String(source).replace(/[\uFF01-\uFF5E]/g, 
        function(c){
            return String.fromCharCode(c.charCodeAt(0) - 65248);
        }).replace(/\u3000/g," ");
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/encodeHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 对目标字符串进行html编码
 * 
 * @param {string} source 目标字符串
 * @return {string} html编码后的字符串
 */
baidu.string.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;");
};

baidu.encodeHTML = baidu.string.encodeHTML;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getHeight.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/03
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 声明baidu.page包
 */
baidu.page = baidu.page || {};

/**
 * 获取页面高度
 * 
 * @return {number} 页面高度
 */
baidu.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/loadCssFile.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 动态在页面上加载一个外部css文件
 * 
 * @param {String} path css文件路径
 */
baidu.page.loadCssFile = function (path) {
    var element = document.createElement("link");
    
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", path);

    document.getElementsByTagName("head")[0].appendChild(element);        
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getScrollLeft.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取横向滚动量
 * 
 * @return {number} 横向滚动量
 */
baidu.page.getScrollLeft = function () {
    var d = document;
    return d.documentElement.scrollLeft || d.body.scrollLeft;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getViewWidth.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 获取页面视觉区域宽度
 * 
 * @return {number} 页面视觉区域宽度
 */
baidu.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/loadJsFile.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 动态在页面上加载一个外部js文件
 * 
 * @param {String} path js文件路径
 */
baidu.page.loadJsFile = function (path) {
    var element = document.createElement('script');

    element.setAttribute('type', 'text/javascript');
    element.setAttribute('src', path);
    element.setAttribute('defer', 'defer');

    document.getElementsByTagName("head")[0].appendChild(element);    
};/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getWidth.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/03
 */



/**
 * 获取页面宽度
 * 
 * @return {number} 页面宽度
 */
baidu.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getScrollTop.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取纵向滚动量
 * 
 * @return {number} 纵向滚动量
 */
baidu.page.getScrollTop = function () {
    var d = document;
    return d.documentElement.scrollTop || d.body.scrollTop;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getViewHeight.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 获取页面视觉区域高度
 * 
 * @return {number} 页面视觉区域高度
 */
baidu.page.getViewHeight = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/filter.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 声明baidu.array包
 */
baidu.array = baidu.array || {};

/**
 * 从数组中筛选符合条件的元素
 * 
 * @param {Array}    source   需要筛选的数组
 * @param {Function} iterator 对每个数组元素进行筛选的函数
 * @return {Array} 符合条件的数组项集合
 */
baidu.array.filter = function (source, iterator) {
    var result = [],
        resultIndex = 0,
        len = source.length,
        item,
        i;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                // resultIndex用于优化对result.length的多次读取
                result[resultIndex++] = item;
            }
        }
    }
    
    return result;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/unique.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 过滤数组中的相同项
 * 
 * @param {Array}    source             需要过滤相同项的数组
 * @param {Function} compareFn optional 比较2个数组项是否相同的函数
 * @return {Array} 过滤后的新数组
 */
baidu.array.unique = function (source, compareFn) {
    var len = source.length,
        result = source.slice(0),
        i, datum;
        
    if ('function' != typeof compareFn) {
        compareFn = function (item1, item2) {
            return item1 === item2;
        };
    }
    
    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
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
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/indexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 查询数组中指定元素的索引位置
 * 
 * @param {Array}        source             需要查询的数组
 * @param {Any|Function} condition          查询项或查询函数
 * @param {number}       position optional  查询的起始位索引位置
 * @return {number} 指定元素的索引位置
 */
baidu.array.indexOf = function (source, condition, position) {
    var len = source.length,
        iterator = condition;
        
    // 参考ecma262的String.prototype.indexOf实现
    // 为undefined时归0，否则进行ToInteger(参见ecma262 3rd 9.4)
    position = Number(position) || 0;
    position = position < 0 ? Math.ceil(position) : Math.floor(position); 
    position = Math.min(Math.max(position, 0), len);
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    for ( ; position < len; position++) {
        if (true === iterator.call(source, source[position], position)) {
            return position;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 移除数组中的项
 * 
 * @param {Array}        source    需要移除项的数组
 * @param {Any|Function} condition 要移除的项或移除匹配函数
 */
baidu.array.remove = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            source.splice(len, 1);
        }
    }
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/each.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 遍历数组中所有元素
 * 
 * @param {Array}    source   需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数
 * @return {Array} 遍历的数组
 */
baidu.array.each = function (source, iterator) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            returnValue = iterator.call(source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

// 声明快捷方法
baidu.each = baidu.array.each;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/find.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 从数组中寻找符合条件的第一个数组元素
 * 
 * @param {Array}    source   需要查找的数组
 * @param {Function} iterator 对每个数组元素进行查找的函数
 * @return {Any|null} 符合条件的第一个数组元素，找不到时返回null
 */
baidu.array.find = function (source, iterator) {
    var item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                return item;
            }
        }
    }
    
    return null;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/lastIndexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/14
 */



/**
 * 从后往前，查询数组中指定元素的索引位置
 * 
 * @param {Array}        source    需要查询的数组
 * @param {Any|Function} condition 查询项或查询函数
 * @return {number} 指定元素的索引位置
 */
baidu.array.lastIndexOf = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            return len;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/array/removeAt.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */



/**
 * 移除数组中的项
 * 
 * @param {Array}  source 需要移除项的数组
 * @param {number} index  要移除项的索引位置
 * @return {Any} 被移除的数组项
 */
baidu.array.removeAt = function (source, index) {
    return source.splice(index, 1)[0];
};


















/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.lang.createClass
 * @version: 2010-05-13
 */




/**
 * 创建一个类，包括创造类的构造器、继承基类Class
 * 创建新类时都采用这个方法：var newClass = baidu.lang.createClass(fn, className);
 *
 * @param   {function}  constructor 类的构造器函数
 * @param   {JSON}      options   (可选){className, parentClass}
 * @return  {Class} 一个类对象
 */

baidu.lang.createClass = function(constructor, options) {
    options = options || {};
    var parentClass = options.parentClass || baidu.lang.Class;

    // 创建新类的真构造器函数
    var fn = function(){
        // 继承父类的构造器
        parentClass.call(this);
        constructor.apply(this, arguments);
        for (var i=0, n=fn["\x06r"].length; i<n; i++) {
            fn["\x06r"][i](this);
        }
    };

    fn.options = options.options || {};

    // 为以后的模块拆分而做
    fn["\x06r"] = [];
    fn.regist = function(f){if (typeof f == "function") fn["\x06r"].push(f);};

    var C = function(){},
        cp = constructor.prototype;
    C.prototype = parentClass.prototype;

    // 继承父类的原型（prototype)链
    var fp = fn.prototype = new C();

    // 继承传参进来的构造器的 prototype 不会丢
    for (var i in cp) fp[i] = cp[i];

    typeof options.className == "string" && (fp._className = options.className);

    // 修正这种继承方式带来的 constructor 混乱的问题
    fp.constructor = cp.constructor;

    // 给类扩展出一个静态方法，以代替 baidu.object.extend()
    fn.extend = function(json){
        for (var i in json) {
            fn.prototype[i] = json[i];
        }
        return fn;  // 这个静态方法也返回类对象本身
    };

    return fn;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/createSingle.js
 * author: meizz, berg
 * version: 1.1.2
 * date: 2010-05-13
 */




/** 
 * 单例模式：创建一个Class的实例
 * @param {Object} json 直接灌注到这个单例里的预定属性/方法
 */
baidu.lang.createSingle = function (json) {
    var c = new baidu.lang.Class();

    for (var key in json) {
        c[key] = json[key];
    }
    return c;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/10
 */


/**
 * 对目标字符串进行格式化, 含有"|"会执行紧跟的过滤函数
 * 
 * @param {string}          source  目标字符串
 * @param {Object|string*}  opts    提供相应数据的对象
 * @return {string} 格式化后的字符串
 */
baidu.string.filterFormat = function (source, opts) {
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return source.replace(/#\{(.+?)\}/g, function (match, key){
		    var filters, replacer, i, len, func;
	    	filters = key.split("|");
	    	replacer = data[filters[0]];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(key);
	    	}
	    	for(i=1,len = filters.length; i< len; ++i){
	    		func = baidu.string.filterFormat[filters[i]];
	    		if('[object Function]' == toString.call(func)){
	    			replacer = func(replacer);
	    		}
	    	}
	    	return ('undefined' == typeof replacer ? '' : replacer);
    	});
    }
    return source;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/escapeJs.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.escapeJs = function(str){
	if(!str || 'string' != typeof str) return str;
	var i,len,charCode,ret = [];
	for(i=0, len=str.length; i < len; ++i){
		charCode = str.charCodeAt(i);
		if(charCode > 255){
			ret.push(str.charAt(i));
		} else{
			ret.push('\\x' + charCode.toString(16));
		}
	}
	return ret.join('');
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/escapeString.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.escapeString = function(str){
	return str.replace(/"/g,'&#34;')
		.replace(/'/g,"&#39;")
		.replace(/</g,'&#60;')
		.replace(/>/g,'&#62;')
		.replace(/\\/g,'&#92;')
		.replace(/\//g,'&#47;')
};

baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat/toInt.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */


baidu.string.filterFormat.toInt = function(str){
	return parseInt(str, 10) || 0;
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/draggable.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/06/02
 */


/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/drag.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/06/02
 */







﻿/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getMousePosition.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/06/02
 */





/**
 * 取得当前页面里的目前鼠标所在的坐标（x y）
 *
 * @return  {JSON}  当前鼠标的坐标值({x, y})
 */
(function(){

    baidu.page.getMousePosition = function(){
        return {
            x : baidu.page.getScrollLeft() + xy.x,
            y : baidu.page.getScrollTop() + xy.y
        };
    };

    var xy = {x:0, y:0};
    // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
    baidu.event.on(document, "onmousemove", function(e){
        e = window.event || e;
        xy.x = e.clientX;
        xy.y = e.clientY;
    });

})();

/**
 * 拖曳DOM元素
 * @param   {HTMLElement|ID}    element 被拖曳的元素
 * @param   {JSON}              options 拖曳配置项
 *          {autoStop, interval, capture, range, ondragstart, ondragend, ondrag}
 */
(function(){
    var target, // 被拖曳的DOM元素
        op, ox, oy, timer, top, left, mozUserSelect;
    
    baidu.dom.drag = function(element, options) {
        if (!(target = baidu.dom.g(element))) return false;
        op = baidu.object.extend({
            autoStop:true   // false 用户手动结束拖曳 ｜ true 在mouseup时自动停止拖曳
            ,capture : true // 鼠标拖曳粘滞
            ,interval : 20  // 拖曳行为的触发频度（时间：毫秒）
        }, options);

        top = parseInt(baidu.dom.getStyle(target, "top")) || 0;
        left= parseInt(baidu.dom.getStyle(target, "left"))|| 0;

        var xy = baidu.page.getMousePosition();    // 得到当前鼠标坐标值
        ox = xy.x;  oy = xy.y; clearTimeout(timer);

        timer = setInterval(render, op.interval);

        // 这项为 true，缺省在 onmouseup 事件终止拖曳
        op.autoStop && baidu.event.on(document, "mouseup", mouseUp);

        // 在拖曳过程中页面里的文字会被选中高亮显示，在这里修正
        baidu.event.on(document.body, "selectstart", unselect);

        // 设置鼠标粘滞
        if (op.capture && target.setCapture) {
            target.setCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }

        // fixed for firefox
        mozUserSelect = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = "none";

        // ondragstart 事件
        typeof op.ondragstart == "function" && op.ondragstart(target, op);

        return {stop: stop};
    };

    // 停止拖曳
    function stop() {
        clearTimeout(timer);

        // 解除鼠标粘滞
        if (op.capture && target.releaseCapture) {
            target.releaseCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }

        // 拖曳时网页内容被框选
        document.body.style.MozUserSelect = mozUserSelect;
        baidu.event.un(document.body, "selectstart", unselect);

        // ondragend 事件
        typeof op.ondragend == "function" && op.ondragend(target, op);
    }

    // 对DOM元素进行top/left赋新值以实现拖曳的效果
    function render(e) {
        var rg = op.range,
            xy = baidu.page.getMousePosition(),
            el = left + xy.x - ox,
            et = top  + xy.y - oy;

        // 如果用户限定了可拖动的范围
        if (typeof rg == "object" && rg && rg.length == 4) {
            el = Math.max(rg[3], el);
            el = Math.min(rg[1] - target.offsetWidth,  el);
            et = Math.max(rg[0], et);
            et = Math.min(rg[2] - target.offsetHeight, et);
        }

        target.style.top  = et +"px";
        target.style.left = el +"px";

        typeof op.ondrag == "function" && op.ondrag(target, op);
    }

    // 在 document.onmouseup 事件时对事件监听进行对应的解除绑定操作
    function mouseUp(e){
        stop();
        baidu.event.un(document, "mouseup", mouseUp);
    }

    // 对document.body.onselectstart事件进行监听，避免拖曳时文字被选中
    function unselect(e) {
        return baidu.event.preventDefault(e, false);
    }
})();




/**
 * 拖曳DOM元素
 * @param   {HTMLElement|ID}    element 被拖曳的元素
 * @param   {JSON}              options 拖曳配置项
 *          {toggle, autoStop, interval, capture, range, ondragstart, ondragend, ondrag}
 */

baidu.dom.draggable = function(element, options) {
    options = baidu.object.extend({toggle : function(){return true}}, options || {});
    options.autoStop = true;

    // 拖曳只针对有 position 定位的元素
    if ((element = baidu.dom.g(element)) && baidu.dom.getStyle(element, "position") != "static") {
        // 对拖曳的扳机元素监听 onmousedown 事件，以便进行拖曳行为
        baidu.event.on(options.handler || element, "onmousedown", function() {
            // 可以通过配置项里的这个开关函数暂停或启用拖曳功能
            if (typeof options.toggle == "function" && !options.toggle()) return;

            baidu.dom.drag(element, options);
        });
    }
};

/*
 * Tangram
 * code from sizzle add by berg
 * 
 * version: 1.0.0
 * date: 20100525
 */

/**
 * css选择器
 */




/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, extra, prune = true, contextXML = Sizzle.isXML(context),
		soFar = selector, ret, cur, pop, i;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec("");
		m = chunker.exec(soFar);

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var filter = Expr.filter[ type ], found, item, left = match[1];
				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
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
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string",
				elem, i = 0, l = checkSet.length;

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}
			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			return match[1].toLowerCase();
		},
		CHILD: function(match){
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return (/h\d/i).test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},
		input: function(elem){
			return (/input|select|textarea|button/i).test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 === i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;
			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					if ( type === "first" ) { 
						return true; 
					}
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first === 0 ) {
						return diff === 0;
					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [], i = 0;

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.compareDocumentPosition ? -1 : 1;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.sourceIndex ? -1 : 1;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.ownerDocument ? -1 : 1;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; // release memory in IE
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle, div = document.createElement("div");
		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function(query, context, extra, seed){
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && context.nodeType === 9 && !Sizzle.isXML(context) ) {
				try {
					return makeArray( context.querySelectorAll(query), extra );
				} catch(e){}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null; // release memory in IE
	})();
}

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

Sizzle.contains = document.compareDocumentPosition ? function(a, b){
	return !!(a.compareDocumentPosition(b) & 16);
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

Sizzle.isXML = function(elem){
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

baidu.dom.query = Sizzle;

})();

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.page.createStyleSheet
 * @version: 2010-06-12
 */





/**
 * 创建CSS样式集对象 style sheet
 * 
 * @param   {JSON}      options     配置信息
 * @config  {Document}  document    指定在哪个document下创建，默认是当前文档
 * @config  {String}    url         css文件的URL
 * @config  {Number}    index       在文档里的排序索引
 * @return  {Object}                styleSheet对象
 */
baidu.page.createStyleSheet = function(options){
    var op = options || {},
        doc = op.document || document,
        s;

    if (baidu.browser.ie) {
        return doc.createStyleSheet(op.url, op.index);
    } else {
        s = "<style type='text/css'></style>";
        op.url && (s="<link type='text/css' rel='stylesheet' href='"+op.url+"'/>");
        baidu.dom.insertHTML(doc.getElementsByTagName("HEAD")[0],"beforeEnd",s);

        var sheet = doc.styleSheets[doc.styleSheets.length - 1],
            rules = sheet.rules || sheet.cssRules;
        return {
            self : sheet
            ,rules : sheet.rules || sheet.cssRules
            ,addRule : function(selector, style, i) {
                if (sheet.addRule) {
                    return sheet.addRule(selector, style, i);
                } else if (sheet.insertRule) {
                    isNaN(i) && (i = rules.length);
                    return sheet.insertRule(selector +"{"+ style +"}", i);
                }
            }
            ,removeRule : function(i) {
                if (sheet.removeRule) {
                    sheet.removeRule(i);
                } else if (sheet.deleteRule) {
                    isNaN(i) && (i = 0);
                    sheet.deleteRule(i);
                }
            }
        }
    }
};
/*
 * styleSheet对象 有两个方法 
 *  addRule(selector, style, i)
 *  removeRule(i)
 *  这两个方法已经做了浏览器兼容处理
 * 一个集合
 *  rules
 */
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isFunction.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 */



/**
 * 判断目标参数是否为function或Function对象
 * 
 * @param {Any} source 目标参数
 * @return {boolean} 类型判断结果
 */
baidu.lang.isFunction = function (source) {
	// chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' == Object.prototype.toString.call(source);
};


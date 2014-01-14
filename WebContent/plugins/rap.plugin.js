/*******************************************
 *                                         *
 * jQuery初始化方法                          *
 * $.rap && $.rap(projectId);              *
 *                                         *
 *                                         *
 * KISSY初始化方法                           *
 * if (KISSY.rap) {                        *
 *     IO = KISSY.rap(IO, projectId);      *
 * }                                       *
 *                                         *
 * {{projectId}}就是RAP提供的项目ID           *
 *                                         *
 *******************************************/




/**
 * jQuery override
 */
!function() {
    var projectId = 0;
    if (typeof jQuery === 'undefined' || !jQuery.ajax) {
        return; 
    }

    jQuery.rap = function(pId) {
        projectId = pId;
    };

    var ajax = jQuery.ajax;
    jQuery.ajax = function() {
        if (!projectId) {
            ajax.apply(this, arguments);
        }
        var oOptions = arguments[0];
        oOptions.jsonp = '_c';
        oOptions.dataType = 'jsonp';
        var url = oOptions.url;
        if (url.indexOf('http://') > -1) {
            url = url.substring(url.indexOf('/', 7) + 1);
        } else if (url.indexOf('https://') > -1) {
            url = url.substring(url.indexOf('/', 8) + 1);
        }
        if (url.charAt(0) != '/') {
            url = '/' + url;
        }
        url = "http://rap.alibaba-inc.com/mock/76" + url;
        oOptions.url = url;
        ajax.apply(this, arguments);
    };
}();

/**
 * kissy override
 */
 !function() {
    if (typeof KISSY === 'undefined') {
        return;
    }
    KISSY.rap = function(IO, projectId) {
        return function() {
            var oOptions, url;
            if (arguments[0]) {
                oOptions = arguments[0];
                oOptions.type = "get";
                oOptions.jsonp = '_c';
                oOptions.dataType = 'jsonp';
                url = oOptions.url;
                if (url.indexOf('http://') > -1) {
                    url = url.substring(url.indexOf('/', 7) + 1);
                } else if (url.indexOf('https://') > -1) {
                    url = url.substring(url.indexOf('/', 8) + 1);
                }
                if (url.charAt(0) != '/') {
                    url = '/' + url;
                }
                url = "http://rap.alibaba-inc.com/mock/" + projectId + url;
                oOptions.url = url;
            }
            IO.apply(this, arguments);
        };
    };
}();
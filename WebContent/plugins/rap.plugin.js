/**********************************************************************************************************
 *
 * 使用方法
 * 1. 在kissy, jQuery后面引入rap plugin
 *     <script type="text/javascript" src="rap.plugin.js?projectId={{projectId}}&mode={{mode}}"></script>
 *      其中{{projectId}}为RAP提供的项目ID
 *      {{mode}}为RAP路由的工作模式, 默认值为1
 *          0 - 不拦截
 *          1 - 拦截全部
 *          2 - 黑名单中的项不拦截
 *          3 - 仅拦截白名单中的项
 * 2. 引入mock.js
 *     <script src="http://mockjs.com/dist/mock-min.js"></script>
 * 3. 设置黑名单、白名单（可选）
 *     设置黑名单
 *     RAP.setBlackList(arr);
 *     设置白名单
 *     RAP.setWhiteList(arr);
 *     其中arr可以包含匹配字符串，或正则对象，例：['test', /test/g]
 *
 ********************************************************************************************************/
(function() {
    var node = document.getElementById('rap');
    var blackList = [];
    var whiteList = [];
    //var ROOT = 'rap.alibaba-inc.com';
    var ROOT = 'etaoux-bj.taobao.ali.com:8080';
    /**
     * mode value range:
     * 0-disabled
     * 1-intercept all requests
     * 2-black list strategy
     * 3-white list strategy
     */
    var mode = 1;
    var modeList = [0, 1, 2, 3];
    var projectId = 0;

    // console handler
    if (typeof window.console === 'undefined') {
        window.console = {
            log : function(){},
            warn : function(){}
        };
    }

    if (!node) {
        var nodes = document.getElementsByTagName('script');
        node = nodes[nodes.length - 1];
    }
    var ms = node.src.match(/(?:\?|&)projectId=([^&]+)(?:&|$)/);
    if (ms) {
        projectId = ms[1];
    }
    var modePattern = node.src.match(/(?:\?|&)mode=([^&]+)(?:&|$)/);
    if (modePattern) {
        mode = +modePattern[1];
        if (!(mode in modeList)) {
            mode = 1;
        }
    }
    var enable = true;
    console.log('Current RAP work mode:', mode, "(0-disabled, 1-black list, 2-white list, 3-combo)");
    var ens = node.src.match(/(?:\?|&)enable=([^&]+)(?:&|$)/);
    if (ens) {
        enable = ens[1] == 'true';
    }
    if (enable) {
        /**
         * jQuery override
         */
        if (window.jQuery) {
            var ajax = jQuery.ajax;
            jQuery.ajax = function() {
                var oOptions = arguments[0];
                var url = oOptions.url;
                if (route(url) && projectId) {
                    oOptions.jsonp = '_c';
                    oOptions.dataType = 'jsonp';
                    if (url.indexOf('http://') > -1) {
                        url = url.substring(url.indexOf('/', 7) + 1);
                    } else if (url.indexOf('https://') > -1) {
                        url = url.substring(url.indexOf('/', 8) + 1);
                    }
                    if (url.charAt(0) != '/') {
                        url = '/' + url;
                    }
                    url = "http://" + ROOT + "/mockjs/" + projectId + url;
                    oOptions.url = url;
                }
                ajax.apply(this, arguments);
            };
        }


        /**
         * kissy override
         */
        if (window.KISSY) {
            KISSY.use('ajax', function(S, IO) {
                KISSY.IO = KISSY.io = KISSY.ajax = function() {
                    var oOptions, url;
                    if (arguments[0]) {
                        oOptions = arguments[0];
                        url = oOptions.url;
                        if (route(url)) {
                            oOptions.type = "get";
                            oOptions.jsonp = '_c';
                            oOptions.dataType = 'jsonp';
                            if (url.indexOf('http://') > -1) {
                                url = url.substring(url.indexOf('/', 7) + 1);
                            } else if (url.indexOf('https://') > -1) {
                                url = url.substring(url.indexOf('/', 8) + 1);
                            }
                            if (url.charAt(0) != '/') {
                                url = '/' + url;
                            }
                            url = "http://" + ROOT + "/mockjs/" + projectId + url;
                            oOptions.url = url;
                            var oldSuccess = oOptions.success;
                            oOptions.success = function(data) {
                                data = Mock.mock(data);
                                oldSuccess.apply(this, arguments);
                            };
                        }
                    }
                    IO.apply(this, arguments);
                };
            });
        }
    }


    /**
     * router
     *
     * @param  {string} url
     * @return {boolean} true if route to RAP MOCK, other wise do nothing.
     */
    function route(url) {
        var i;
        var o;
        var blackMode;
        var list;

        if (!url || typeof url !== 'string') {
            console.warn("Illegal url:", url);
            return false;
        }

        /**
         * disabled
         */
        if (mode === 0) {
            return false;
        }
        /**
         * intercept all requests
         */
        else if (mode == 1) {
            return true;
        }
        /**
         * black/white list mode
         */
        else if (mode === 2 || mode === 3) {
            blackMode = mode === 2;
            list = blackMode ? blackList : whiteList;
            for (i = 0; i < list.length; i++) {
                o = list[i];
                if (typeof o === 'string' && url.indexOf(o) >= 0) {
                    return !blackMode;
                } else if (typeof o === 'object' && o instanceof RegExp && o.test(url)) {
                    return !blackMode;
                }
            }
            return blackMode;
        }

        return false;
    }

    window.RAP = {
        setBlackList : function(arr) {
            if (arr && arr instanceof Array) {
                blackList = arr;
            }
        },
        setWhiteList : function(arr) {
            if (arr && arr instanceof Array) {
                whiteList = arr;
            }
        },
        getBlackList : function() {
            return blackList;
        },
        getWhiteList : function() {
            return whiteList;
        },
        getMode : function() {
            return mode;
        },
        setMode : function(m) {
            m = +m;
            if (m in modeList) {
                mode = m;
                console.log('RAP work mode switched to ', m);
            } else {
                console.warn('Illegal mode id. Please check.');
            }
        }
    };
})();

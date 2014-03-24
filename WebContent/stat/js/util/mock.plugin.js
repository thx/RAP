/*! rap.plugin Mar.10th 2014 */
(function() {
    var node = null;
    var blackList = [];
    var whiteList = [#foreach($url in $urlList)#if($velocityCount>1),#end"$url"#end];
    var ROOT = 'rap.alibaba-inc.com';
    var LOST = "LOST";
    var PREFIX = "/mockjs/";
    var EMPTY_ARRAY = "EMPTY_ARRAY";
    var TYPE_NOT_EQUAL = "TYPE_NOT_EQUAL";

    /**
     * mode value range: 0-disabled 1-intercept all requests 2-black list
     * strategy 3-white list strategy
     */
    var mode = 3;
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

    var rootPattern = node.src.match(/(?:\?|&)root=([^&]+)(?:&|$)/);
    if (rootPattern) {
        ROOT = rootPattern[1];
    }

    var enable = true;
    console.log('Current RAP work mode:', mode, "(0-disabled, 1-intercept all requests, 21-black list, 3-white list)");
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
                    rapUrlConverterJQuery(oOptions);
                    var oldSuccess = oOptions.success;
                    oOptions.success = function(data) {
                        if (PREFIX == '/mockjs/') {
                            data = Mock.mock(data);
                        }
                        oldSuccess.apply(this, arguments);
                    };
                } else if(isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
                    var checkerOptions = {url : oOptions.url};
                    rapUrlConverterJQuery(checkerOptions);
                    checkerOptions.RAP_NOT_TRACK = true;
                    checkerOptions.success = checkerHandler;
                    // real data checking
                    oldSuccess = oOptions.success;
                    oOptions.success = function() {
                        var realData = arguments[0];
                        checkerOptions.context = {
                            data : realData
                        };
                        // perform real data check
                        ajax.apply(jQuery, [checkerOptions]);
                        oldSuccess.apply(this,arguments);
                    };
                }
                ajax.apply(this, arguments);
            };
        }


        /**
         * kissy override
         */
        if (window.KISSY) {
            KISSY.oldUse = KISSY.use;
            KISSY.oldAdd = KISSY.add;

            KISSY.add('rap_io', function(S, IO) {
                var fn = KISSY.io = KISSY.IO = KISSY.ajax = function(options) {
                    var oOptions, url;
                    var oldSuccess;
                    if (arguments[0]) {
                        oOptions = arguments[0];
                        url = oOptions.url;
                        if (route(url) && !oOptions.RAP_NOT_TRACK) {
                            rapUrlConverterKissy(oOptions);
                            oldSuccess = oOptions.success;
                            oOptions.success = function(data) {
                                if (PREFIX == '/mockjs/') {
                                    data = Mock.mock(data);
                                }
                                oldSuccess.apply(this, arguments);
                            };
                        } else if(isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
                            var checkerOptions = {url:oOptions.url};
                            rapUrlConverterKissy(checkerOptions);
                            checkerOptions.RAP_NOT_TRACK = true;
                            checkerOptions.success = checkerHandler;
                            // real data checking
                            oldSuccess = oOptions.success;
                            oOptions.success = function() {
                                var realData = arguments[0];
                                checkerOptions.context = {
                                    data : realData
                                };
                                // perform real data check
                                IO(checkerOptions);
                                oldSuccess.apply(this,arguments);
                            };

                        }
                    }
                    IO.apply(this, arguments);
                };
                return fn;
            }, {
                requires: ['ajax']
            });


            KISSY.use = function(modules, callback) {
                var args = arguments;
                args[0] = replace(modules);
                KISSY.oldUse.apply(this, args);
            };

            KISSY.add = function(name, fn, options) {
                if (options && options.requires) {

                    for(var i = 0, l = options.requires.length; i < l; i++) {
                        var current = options.requires[i].toLowerCase();

                        if (current == 'io' || current == 'ajax') {
                            options.requires[i] = 'rap_io';
                        }
                    }
                }

                KISSY.oldAdd.apply(this, arguments);
            };

            if (KISSY.IO || KISSY.io || KISSY.ajax) {
                KISSY.use('rap_io', function() {});
            }

        }

    }

    function replace(modules) {
        var splited = modules;
        if (KISSY.isString(modules)) {
            splited = modules.split(',');
        }
        var index = -1;
        for (var i = 0, l = splited.length; i < l; i++) {
            var name = KISSY.trim(splited[i]).toLowerCase();
            if (name === 'ajax' || name === 'io') {
                splited[i] = 'rap_io';
            }
        }
        return splited.join(',');
    }


    function checkerHandler(mockData) {     
        if (PREFIX == '/mockjs/') {
            mockData = Mock.mock(mockData);
        }
        var realData = this.data;
        var validator = new StructureValidator(realData, mockData);
        var result = validator.getResult();
        var realDataResult = result.left;
        var rapDataResult = result.right;
        var i;

        if (realDataResult.length === 0 && rapDataResult.length === 0) {
            console.log('接口结构校验完毕，未发现问题。');
        } else {
            for (i = 0; i < realDataResult.length; i++) {
                validatorResultLog(realDataResult[i]);
            }
            for (i = 0; i < rapDataResult.length; i++) {
                validatorResultLog(rapDataResult[i], true);
            }
        }
    }

    /**
     * is in white list
     *
     */
     function isInWhiteList(url) {
        var i;
        var o;
        for (i = 0; i < whiteList.length; i++) {
            o = whiteList[i];
            if (typeof o === 'string' && url.indexOf(o) >= 0) {
                return true;
            } else if (typeof o === 'object' && o instanceof RegExp && o.test(url)) {
                return true;
            }
        }
        return false;
     }


    /**
     * router
     *
     * @param {string} url
     * @return {boolean} true if route to RAP MOCK, other wise do nothing.
     */
    function route(url, ignoreMode) {
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

    function validatorResultLog(item, isReverse) {

        var eventName;
        if (item.type === LOST) {
            eventName = isReverse ? '未在接口文档中未定义。' : '缺失';
        } else if (item.type === EMPTY_ARRAY) {
            eventName = '数组为空，无法判断其内部的结构。';
            return; // 暂时忽略此种情况
        } else if (item.type === TYPE_NOT_EQUAL) {
            eventName = '数据类型与接口文档中的定义不符';
        }

        console.error('参数 ' + item.namespace + "." + item.property + ' ' + eventName);

    }

    /**
     * convert url from absolute to relative
     */
    function convertUrlToRelative(url) {
        if (!url) {
            throw Error('Illegal url:' + url);
        }
        if (url.indexOf('http://') > -1) {
            url = url.substring(url.indexOf('/', 7) + 1);
        } else if (url.indexOf('https://') > -1) {
            url = url.substring(url.indexOf('/', 8) + 1);
        }
        if (url.charAt(0) != '/') {
            url = '/' + url;
        }
        return url;
    }

    /**
     * convert url to rap mock url (KISSY version)
     * example: www.baidu.com/a => alibaba-inc.com/mock/106/a
     */
    function rapUrlConverterKissy(options) {
        var url = options.url;
        if (!options || typeof options !== 'object') {
            throw Error('illegal option object:' + options);
        }
        options.type = "get";
        options.jsonp = '_c';
        options.dataType = 'jsonp';
        url = convertUrlToRelative(url);
        url = "http://" + ROOT + PREFIX + projectId + url;
        options.url = url;
        return options;
    }

    /**
     * convert url to rap mock url (jQuery version)
     * example: www.baidu.com/a => alibaba-inc.com/mock/106/a
     */
    function rapUrlConverterJQuery(options) {
        var url = options.url;
        if (!options || typeof options !== 'object') {
            throw Error('illegal option object:' + options);
        }
        options.jsonp = '_c';
        options.dataType = 'jsonp';
        url = convertUrlToRelative(url);
        url = "http://" + ROOT + PREFIX + projectId + url;
        options.url = url;
        return options;
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
        },
        setHost : function(h) {
            ROOT = h;
        },
        getHost : function() {
            return ROOT;
        },
        setPrefix: function(p) {
            PREFIX = p;
        },
        getPrefix: function(p) {
            return PREFIX;
        }
    };
})();
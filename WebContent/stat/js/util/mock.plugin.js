
/*! rap.plugin Mar.10th 2014 */
(function() {
    var node = null;
    var blackList = [];
    var whiteList = [#foreach($url in $urlList)#if($velocityCount>1),#end"$url"#end];
    var ROOT = 'rap.alibaba-inc.com';
    var LOST = "LOST";
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
            KISSY.oldUse = KISSY.use;

            function getIOIndex(modules) {
                var splited = modules;
                if (KISSY.isString(modules)) {
                    splited = modules.split(',')
                }
                var index = -1;
                for (var i = 0, l = splited.length; i < l; i++) {
                    var name = KISSY.trim(splited[i]).toLowerCase();
                    if (name === 'ajax' || name === 'io') {
                        index = i;
                        break;
                    } 
                };
                return index;
            }

            function buildRealCallback(ioIndex, oldCallback) {
                return function() {
                    var that = this;
                    var oldIO = arguments[ioIndex];
                    arguments[ioIndex] = KISSY.IO = KISSY.io = KISSY.ajax = function(options) {
                        var oOptions, url;
                        var oldSuccess;
                        if (arguments[0]) {
                            oOptions = arguments[0];
                            url = oOptions.url;
                            if (route(url) && !oOptions.RAP_NOT_TRACK) {
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
                            } else {
                                if (!oOptions.RAP_NOT_TRACK) {
                                    // real data checking
                                    oldSuccess = oOptions.success;
                                    oOptions.success = function() {
                                        var realData = arguments[0];
                                        KISSY.IO({
                                            url : url,
                                            dataType : 'jsonp',
                                            jsonp : '_c',
                                            RAP_NOT_TRACK : true,
                                            success : function(mockData) {
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
                                        });
                                        oldSuccess.apply(this,arguments);
                                    };
                                }
                            }
                        }
                        oldIO.apply(that, arguments);
                    }
                    oldCallback.apply(this, arguments);
                }
            }

            KISSY.use = function(modules, callback) {
                var ioIndex = getIOIndex(modules);
                ioIndex++;

                var callbackIndex = arguments.length - 1;

                var oldCallback = originCallback = arguments[callbackIndex];

                if (KISSY.isObject(originCallback)) {
                    oldCallback = originCallback.success;
                }

                var realCallback = buildRealCallback(ioIndex, oldCallback);

                if (KISSY.isObject(originCallback)) {
                    originCallback.success = realCallback;
                    arguments[callbackIndex] = originCallback;
                } else {
                    arguments[callbackIndex] = realCallback;
                }

                KISSY.oldUse.apply(this, arguments);
            };
        }



    }


    /**
	 * router
	 * 
	 * @param {string}
	 *            url
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
        }
    };
})();
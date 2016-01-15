
(function (window, undefined) {
    var node = null;
    var blackList = [];
    var whiteList = [#foreach($url in $urlList)#if ($velocityCount > 1),#end"$url"#end];

    var ROOT = "$!consts.DOMAIN_URL";
    var LOST = "LOST";
    var PREFIX = "/mockjs/";
    var EMPTY_ARRAY = "EMPTY_ARRAY";
    var TYPE_NOT_EQUAL = "TYPE_NOT_EQUAL";

    /**
     * mode value range: 0-disabled 1-intercept all requests 2-black list
     * strategy 3-white list strategy
     */
    var mode = 3;
    var modeStr = "$!utils.escapeInJ($mode)";
    if (modeStr != "" && (+modeStr >= 0 && +modeStr <= 3)) {
        mode = +modeStr;
    }
    var modeList = [0, 1, 2, 3];
    var projectId = $!projectId;
    var seajsEnabled = $!seajs;
    var enable = $!enable;
    var disableLog = $!disableLog;

    console.log('Current RAP work mode:', mode, "(0-disabled, 1-intercept all requests, 2-black list, 3-white list)");

    function wrapJQuery(jQuery, pId, rootStr) {
        if (pId) {
            projectId = pId;
        }
        if (rootStr) {
            ROOT = rootStr;
        }
        if (jQuery._rap_wrapped) {
            return;
        }
        jQuery._rap_wrapped = true;

        var ajax = jQuery.ajax;
        jQuery.ajax = function () {
            var oOptions = arguments[0];

            // process ajax(url, options) condition
            if (typeof arguments[0] === 'string' &&
                typeof arguments[1] === 'object' &&
                arguments[1].url === undefined) {

                oOptions = arguments[1];
                oOptions.url = arguments[0];
                arguments[0] = oOptions;

            } else if (typeof arguments[0] === 'string' &&
                typeof arguments[1] === undefined) {
                oOptions = arguments[0] = {
                    url: arguments[0]
                };
            }

            var url = oOptions.url;
            var routePassed = route(url) && projectId;
            if (routePassed) {
                rapUrlConverterJQuery(oOptions);
                var oldSuccess1 = oOptions.success;
                oldSuccess1 && (oOptions.success = function (data) {
                    if (PREFIX == '/mockjs/') {
                        data = Mock.mock(data);
                        if (data.__root__) {
                            data = data.__root__;
                        }
                        if (!disableLog) {
                            console.log('请求' + url + '返回的Mock数据:');
                            console.dir(data);
                        }

                    }
                    oldSuccess1.apply(this, arguments);
                });

                var oldComplete = oOptions.complete;
                oldComplete && (oOptions.complete = function (data) {
                    if (PREFIX == '/mockjs/') {
                        data = Mock.mock(data);
                        if (data.__root__) {
                            data = data.__root__;
                        }
                        if (!disableLog) {
                            console.log('请求' + url + '返回的Mock数据:');
                            console.dir(data);
                        }

                    }
                    oldComplete.apply(this, arguments);
                });
            } else if (isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
                var checkerOptions = {url: oOptions.url};
                rapUrlConverterJQuery(checkerOptions);
                checkerOptions.RAP_NOT_TRACK = true;
                checkerOptions.success = checkerHandler;
                // real data checking
                var oldSuccess2 = oOptions.success;
                oOptions.success = function () {
                    var realData = arguments[0];
                    checkerOptions.context = {
                        data: realData,
                        url: oOptions.url
                    };
                    // perform real data check
                    ajax.apply(jQuery, [checkerOptions]);
                    oldSuccess2.apply(this, arguments);
                };
            }
            var rv = ajax.apply(this, arguments);
            if (routePassed) {
                var oldDone = rv.done;
                oldDone && (rv.done = function (data) {
                    var oldCb = arguments[0];
                    var args = arguments;
                    if (oldCb) {
                        args[0] = function (data) {
                            if (PREFIX == '/mockjs/') {
                                data = Mock.mock(data);
                                if (data.__root__) {
                                    data = data.__root__;
                                }
                                if (!disableLog) {
                                    console.log('请求' + url + '返回的Mock数据:');
                                    console.dir(data);
                                }
                            }
                            oldCb.apply(this, arguments);
                        };
                    }
                    oldDone.apply(this, args);
                });
            }


            return rv;
        };
    }

    window.wrapJQueryForRAP = wrapJQuery;

    if (enable) {
        /**
         * jQuery override
         */
        if (window.jQuery) {
            wrapJQuery(window.jQuery);
        }


        /**
         * kissy override
         */
        if (window.KISSY) {
            KISSY.oldUse = KISSY.use;
            KISSY.oldAdd = KISSY.add;

            KISSY.add('rap_io', function (S, IO) {
                var oldIO = IO;
                var key;
                var fn = KISSY.io = KISSY.IO = KISSY.ajax = function (options) {
                    var oOptions, url;
                    if (arguments[0]) {
                        oOptions = arguments[0];
                        url = oOptions.url;
                        if (route(url) && !oOptions.RAP_NOT_TRACK) {
                            rapUrlConverterKissy(oOptions);
                            var oldSuccess1 = oOptions.success;
                            oldSuccess1 && (oOptions.success = function (data) {
                                if (PREFIX == '/mockjs/') {
                                    data = Mock.mock(data);
                                    if (data.__root__) {
                                        data = data.__root__;
                                    }
                                    if (!disableLog) {
                                        console.log('请求' + url + '返回的Mock数据:');
                                        console.dir(data);
                                    }
                                }
                                oldSuccess1.apply(this, arguments);
                            });
                            var oldComplete = oOptions.complete;
                            oldComplete && (oOptions.complete = function (data) {
                                if (PREFIX == '/mockjs/') {
                                    data = Mock.mock(data);
                                    if (data.__root__) {
                                        data = data.__root__;
                                    }
                                    if (!disableLog) {
                                        console.log('请求' + url + '返回的Mock数据:');
                                        console.dir(data);
                                    }

                                }
                                oldComplete.apply(this, arguments);
                            });
                        } else if (isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
                            var checkerOptions = {url: oOptions.url};
                            rapUrlConverterKissy(checkerOptions);
                            checkerOptions.RAP_NOT_TRACK = true;
                            checkerOptions.success = checkerHandler;
                            // real data checking
                            var oldSuccess2 = oOptions.success;
                            oOptions.success = function () {
                                var realData = arguments[0];
                                checkerOptions.context = {
                                    data: realData,
                                    url: oOptions.url
                                };
                                // perform real data check
                                IO(checkerOptions);
                                oldSuccess2.apply(this, arguments);
                            };

                        }
                    }
                    IO.apply(this, arguments);
                };

                for (key in oldIO) {
                    if (oldIO.hasOwnProperty(key)) {
                        fn[key] = oldIO[key];
                    }
                }

                return fn;
            }, {
                requires: ['ajax']
            });


            KISSY.use = function (modules, callback) {
                var args = arguments;
                if (modules instanceof Array || typeof modules === 'string') {
                    args[0] = replace(modules);
                }
                KISSY.oldUse.apply(this, args);
            };

            KISSY.add = function (name, fn, options) {
                if (options && options.requires) {

                    for (var i = 0, l = options.requires.length; i < l; i++) {
                        var current = options.requires[i].toLowerCase();

                        if (current == 'io' || current == 'ajax') {
                            options.requires[i] = 'rap_io';
                        }
                    }
                }

                KISSY.oldAdd.apply(this, arguments);
            };

            if (KISSY.IO || KISSY.io || KISSY.ajax) {
                KISSY.use('rap_io', function () {
                });
            }

        }
    }

    if (window.seajs && window.seajs.use && window.define && window.define.cmd && seajsEnabled != 'false') {

        !function () {
            var oldSeajsUse = seajs.use;
            var initialized = false;
            seajs.use = function () {
                var handler = arguments[arguments.length - 1];
                arguments[arguments.length - 1] = function () {
                    if (!initialized) {
                        for (var i = 0; i < arguments.length; i++) {
                            if (arguments[i] && typeof arguments[i] === 'function' && arguments[i].prototype &&
                                arguments[i].prototype.jquery
                            ) {
                                wrapJQueryForRAP(arguments[i]);
                            }
                        }

                        initialized = true;
                    }
                    handler.apply(this, arguments);
                };
                oldSeajsUse.apply(seajs, arguments);
            }
        }();


        var data = seajs.config().data;
        data.alias = data.alias || {};
        var path = 'http://' + ROOT + '/stat/js/util/jquery-rapped.js';
        data.alias.jquery = data.alias.jQuery = data.alias.jq = data.alias.jQ = data.alias.$ = path;
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
            if (mockData.__root__) {
                mockData = mockData.__root__;
            }
        }
        var realData = this.data;
        var validator = new StructureValidator(realData, mockData);
        var result = validator.getResult();
        var realDataResult = result.left;
        var rapDataResult = result.right;
        var i;
        var log = [];
        var error = false;

        if (realDataResult.length === 0 && rapDataResult.length === 0) {
            log.push('接口结构校验完毕，未发现问题。');
        } else {
            error = true;
            if (this.url) {
                log.push('在校验接口' + this.url + '时发现错误:');
            }
            for (i = 0; i < realDataResult.length; i++) {
                log.push(validatorResultLog(realDataResult[i]));
            }
            for (i = 0; i < rapDataResult.length; i++) {
                log.push(validatorResultLog(rapDataResult[i], true));
            }
        }

        console.info(log.join('\n'));
        if (error === true) {
            console.log('真实数据:');
            console.dir(this.data);
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
            if (typeof o === 'string' && (url.indexOf(o) >= 0 || o.indexOf(url) >= 0)) {
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
        if (url && url.indexOf('?') !== -1) {
            url = url.substring(0, url.indexOf('?'))
        }
        var i;
        var o;
        var blackMode;
        var list;

        url = convertUrlToRelative(url);

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
                o = convertUrlToRelative(list[i]);
                if (typeof o === 'string' && (url.indexOf(o) >= 0 || o.indexOf(url) >= 0)) {
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

        return '参数 ' + item.namespace + "." + item.property + ' ' + eventName;

    }

    /**
     * convert url from absolute to relative
     */
    function convertUrlToRelative(url) {
        if (url instanceof RegExp) {
            return url;
        }
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
     * example: www.baidu.com/a => {domain}/mock/106/a
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
     * example: www.baidu.com/a => {domain}/mock/106/a
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
        initList: function (list) {
            var PARAM_REG = /\/:[^\/]*/g;
            var i, n = list.length, item;
            for (i = 0; i < n; i++) {
                item = list[i];
                if (typeof item === 'string') {
                    if (PARAM_REG.test(item)) {
                        item = new RegExp(item.replace(PARAM_REG, '/\\d+'));
                        list[i] = item;
                    } else if (item.indexOf('reg:') !== -1) {
                        item = item.replace('reg:', '');
                        item = new RegExp(item);
                        list[i] = item;
                    }
                }
            }
            return list;
        },
        setBlackList: function (arr) {
            if (arr && arr instanceof Array) {
                blackList = this.initList(arr);
            }
        },
        setWhiteList: function (arr) {
            if (arr && arr instanceof Array) {
                whiteList = this.initList(arr);
            }
        },
        getBlackList: function () {
            return blackList;
        },
        getWhiteList: function () {
            return whiteList;
        },
        getMode: function () {
            return mode;
        },
        setMode: function (m) {
            m = +m;
            if (m in modeList) {
                mode = m;
                console.log('RAP work mode switched to ', m);
            } else {
                console.warn('Illegal mode id. Please check.');
            }
        },
        setHost: function (h) {
            ROOT = h;
        },
        getHost: function () {
            return ROOT;
        },
        setPrefix: function (p) {
            PREFIX = p;
        },
        getPrefix: function (p) {
            return PREFIX;
        },
        setProjectId: function (id) {
            projectId = id;
        },
        getProjectId: function () {
            return projectId;
        },
        router: function (url) {
            return route(url);
        },
        checkerHandler: function () {
            return checkerHandler.apply(this, arguments);
        }
    };

    RAP.initList(whiteList);
    RAP.wrapJQuery = window.wrapJQueryForRAP;
})(this);
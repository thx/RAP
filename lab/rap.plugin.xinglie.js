/*! rap.plugin May.30th 2014 by 行列 */
(function () {
    var node = null;
    var blackList = [];
    var whiteList = ["/api/dspfilter/zonesizes", "/api/dspfilter/distypes", "/api/dspfilter/screens", "/api/dspfilter/sitetypes", "/api/dspfilter/pagelist", "/api/dspfilter/urls", "/api/dspsettle/account/balance", "/api/dspsettle/account/list", "/api/log", "/api/dspsettle/account/anotice"];

    var ROOT = 'DOMAIN';
    // [DEBUG]
    // ROOT = 'etaoux-bj.taobao.ali.com:8080';
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
            log: function () {
            },
            warn: function () {
            },
            info: function () {
            },
            dir: function () {
            }
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
    console.log('Current RAP work mode:', mode, "(0-disabled, 1-intercept all requests, 2-black list, 3-white list)");
    var ens = node.src.match(/(?:\?|&)enable=([^&]+)(?:&|$)/);
    if (ens) {
        enable = ens[1] == 'true';
    }

    /*function wrapJQuery(jQuery) {
     if (jQuery._rap_wrapped) {
     return;
     }
     jQuery._rap_wrapped = true;

     var ajax = jQuery.ajax;
     jQuery.ajax = function() {
     var oOptions = arguments[0];
     var url = oOptions.url;
     if (route(url) && projectId) {
     rapUrlConverterJQuery(oOptions);
     var oldSuccess1 = oOptions.success;
     oldSuccess1 && (oOptions.success = function(data) {
     if (PREFIX == '/mockjs/') {
     data = Mock.mock(data);
     console.log('请求' + url + '返回的Mock数据:');
     console.dir(data);

     }
     oldSuccess1.apply(this, arguments);
     });

     var oldComplete = oOptions.complete;
     oldComplete && (oOptions.complete = function(data) {
     if (PREFIX == '/mockjs/') {
     data = Mock.mock(data);
     console.log('请求' + url + '返回的Mock数据:');
     console.dir(data);

     }
     oldComplete.apply(this, arguments);
     });
     } else if (isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
     var checkerOptions = {
     url: oOptions.url
     };
     rapUrlConverterJQuery(checkerOptions);
     checkerOptions.RAP_NOT_TRACK = true;
     checkerOptions.success = checkerHandler;
     // real data checking
     var oldSuccess2 = oOptions.success;
     oOptions.success = function() {
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
     ajax.apply(this, arguments);
     };
     }

     window.wrapJQueryForRAP = wrapJQuery;*/
    // ************************************************************************************************
    var guid = +new Date();
    var JSONP = function (url, callback) {
        var me = this;
        var script = document.createElement('script');
        var key = 'jsonp' + guid++;
        var success;
        window[key] = function (data) {
            callback(data);
            delete window[key];
            success = true;
        };
        script.onload = script.onreadystatechange = script.onerror = function () {
            setTimeout(function () {
                script.parentNode.removeChild(script);
                if (!success) {
                    callback('script error');
                    delete window[key];
                }
            }, 0);
        };
        script.src = url + '&_c=' + key;
        document.body.appendChild(script);
    };
    var isFunction = function (f) {
        return Object.prototype.toString.call(f) == '[object Function]';
    };
    var parseURLParamsArray = function (url) {
        var q = url ? url.indexOf("?") : -1;
        if (q == -1) return [];

        var search = url.substr(q + 1);
        var h = search.lastIndexOf("#");
        if (h != -1) search = search.substr(0, h);

        if (!search) return [];

        return parseURLEncodedTextArray(search);
    };

    var parseURLEncodedTextArray = function (text) {
        var maxValueLength = 25000;

        var params = [];

        // Unescape '+' characters that are used to encode a space.
        // See section 2.2.in RFC 3986: http://www.ietf.org/rfc/rfc3986.txt
        text = text.replace(/\+/g, " ");

        var args = text.split("&");
        for (var i = 0; i < args.length; ++i) {
            try {
                var parts = args[i].split("=");
                if (parts.length == 2) {
                    if (parts[1].length > maxValueLength) parts[1] = this.$STR("LargeData");

                    params.push({
                        name: decodeURIComponent(parts[0]),
                        value: [decodeURIComponent(parts[1])]
                    });
                } else params.push({
                    name: decodeURIComponent(parts[0]),
                    value: [""]
                });
            } catch (e) {
                console.log(e);
            }
        }

        params.sort(function (a, b) {
            return a.name <= b.name ? -1 : 1;
        });

        return params;
    }


    // ************************************************************************************************
    // XMLHttpRequestWrapper

    var XMLHttpRequestWrapper = function (activeXObject) {
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // XMLHttpRequestWrapper internal variables

        var xhrRequest = typeof activeXObject != "undefined" ? activeXObject : new _XMLHttpRequest(),

            self = this,

            reqType,
            reqUrl,
            reqStartTS;

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // XMLHttpRequestWrapper internal methods

        var updateSelfPropertiesIgnore = {
            abort: 1,
            channel: 1,
            getAllResponseHeaders: 1,
            getInterface: 1,
            getResponseHeader: 1,
            mozBackgroundRequest: 1,
            multipart: 1,
            onreadystatechange: 1,
            open: 1,
            send: 1,
            setRequestHeader: 1
        };

        var updateSelfProperties = function () {
            if (supportsXHRIterator) {
                for (var propName in xhrRequest) {
                    if (propName in updateSelfPropertiesIgnore) continue;

                    try {
                        var propValue = xhrRequest[propName];

                        if (propValue && !isFunction(propValue)) self[propName] = propValue;
                    } catch (E) {
                        //console.log(propName, E.message);
                    }
                }
            } else {
                // will fail to read these xhrRequest properties if the request is not completed
                if (xhrRequest.readyState == 4) {
                    self.status = xhrRequest.status;
                    self.statusText = xhrRequest.statusText;
                    self.responseText = xhrRequest.responseText;
                    self.responseXML = xhrRequest.responseXML;
                }
            }
        };

        var updateXHRPropertiesIgnore = {
            channel: 1,
            onreadystatechange: 1,
            readyState: 1,
            responseBody: 1,
            responseText: 1,
            responseXML: 1,
            status: 1,
            statusText: 1,
            upload: 1
        };

        var updateXHRProperties = function () {
            for (var propName in self) {
                if (propName in updateXHRPropertiesIgnore) continue;

                try {
                    var propValue = self[propName];

                    if (propValue && !xhrRequest[propName]) {
                        xhrRequest[propName] = propValue;
                    }
                } catch (E) {
                    //console.log(propName, E.message);
                }
            }
        };


        var handleStateChange = function () {
            //Firebug.Console.log(["onreadystatechange", xhrRequest.readyState, xhrRequest.readyState == 4 && xhrRequest.status]);

            self.readyState = xhrRequest.readyState;

            if (xhrRequest.readyState == 4) {
                updateSelfProperties();

                xhrRequest.onreadystatechange = function () {
                };
            }

            //Firebug.Console.log(spy.url + ": " + xhrRequest.readyState);

            self.onreadystatechange();
        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // XMLHttpRequestWrapper public properties and handlers

        this.readyState = 0;

        this.onreadystatechange = function () {
        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // XMLHttpRequestWrapper public methods

        this.open = function (method, url, async, user, password) {
            //Firebug.Console.log("xhrRequest open");

            updateSelfProperties();
            if (route(url) && projectId) {
                url = convertUrlToRelative(url);
                url = "http://" + ROOT + PREFIX + projectId + url;
                console.log(url);
                this.$useJSONP = true;
                this.$url = url;
                return;
            }

            try {
                // xhrRequest.open.apply may not be available in IE
                if (supportsApply) xhrRequest.open.apply(xhrRequest, arguments);
                else xhrRequest.open(method, url, async, user, password);
            } catch (e) {
            }

            xhrRequest.onreadystatechange = handleStateChange;

        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        this.send = function (data) {
            if (this.$useJSONP) {
                var me = this;
                JSONP(me.$url, function (data) {
                    console.log(data);
                    if (data !== 'script error') {
                        data = JSON.stringify(Mock.mock(data));
                    }
                    me.status = 200;
                    me.readyState = 4;
                    me.responseText = data;
                    me.responseXML = data;
                    me.onreadystatechange();
                });
                return;
            }
            //Firebug.Console.log("xhrRequest send");


            updateXHRProperties();

            try {
                xhrRequest.send(data);
            } catch (e) {
                // TODO: xxxpedro XHR throws or not?
                //throw e;
            } finally {
                updateSelfProperties();
            }
        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        this.setRequestHeader = function (header, value) {
            if (this.$useJSONP) return;
            return xhrRequest.setRequestHeader(header, value);
        };


        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        this.abort = function () {
            if (this.$useJSONP) return;
            xhrRequest.abort();
            updateSelfProperties();
        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        this.getResponseHeader = function (header) {
            return xhrRequest.getResponseHeader(header);
        };

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        this.getAllResponseHeaders = function () {
            return xhrRequest.getAllResponseHeaders();
        };

        /**/
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // Clone XHR object

        // xhrRequest.open.apply not available in IE and will throw an error in
        // IE6 by simply reading xhrRequest.open so we must sniff it
        var supportsApply = !isIE6 && xhrRequest && xhrRequest.open && typeof xhrRequest.open.apply != "undefined";

        var numberOfXHRProperties = 0;
        for (var propName in xhrRequest) {
            numberOfXHRProperties++;

            if (propName in updateSelfPropertiesIgnore) continue;

            try {
                var propValue = xhrRequest[propName];

                if (isFunction(propValue)) {
                    if (typeof self[propName] == "undefined") {
                        this[propName] = (function (name, xhr) {

                            return supportsApply ?
                                // if the browser supports apply

                                function () {
                                    return xhr[name].apply(xhr, arguments);
                                } : function (a, b, c, d, e) {
                                return xhr[name](a, b, c, d, e);
                            };

                        })(propName, xhrRequest);
                    }
                } else this[propName] = propValue;
            } catch (E) {
                //console.log(propName, E.message);
            }
        }

        // IE6 does not support for (var prop in XHR)
        var supportsXHRIterator = numberOfXHRProperties > 0;

        /**/

        return this;
    };

    // ************************************************************************************************
    // ActiveXObject Wrapper (IE6 only)

    var _ActiveXObject;
    var isIE6 = /msie 6/i.test(navigator.appVersion);

    if (isIE6) {
        _ActiveXObject = window.ActiveXObject;

        var xhrObjects = " MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP ";

        window.ActiveXObject = function (name) {
            var error = null;

            try {
                var activeXObject = new _ActiveXObject(name);
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    if (xhrObjects.indexOf(" " + name + " ") != -1) return new XMLHttpRequestWrapper(activeXObject);
                    else return activeXObject;
                } else throw error.message;
            }
        };
    }

    // ************************************************************************************************

    // Register the XMLHttpRequestWrapper for non-IE6 browsers
    if (!isIE6) {
        var _XMLHttpRequest = XMLHttpRequest;
        window.XMLHttpRequest = function () {
            return new XMLHttpRequestWrapper();
        };
    }


    // ************************************************************************************************
    if (enable) {
        /**
         * jQuery override
         */
        /*if (window.jQuery) {
         wrapJQuery(window.jQuery);
         }*/


        /**
         * kissy override
         */
        /*if (window.KISSY) {
         KISSY.oldUse = KISSY.use;
         KISSY.oldAdd = KISSY.add;

         KISSY.add('rap_io', function(S, IO) {
         var oldIO = IO;
         var key;
         var fn = KISSY.io = KISSY.IO = KISSY.ajax = function(options) {
         var oOptions, url;
         if (arguments[0]) {
         oOptions = arguments[0];
         url = oOptions.url;
         if (route(url) && !oOptions.RAP_NOT_TRACK) {
         rapUrlConverterKissy(oOptions);
         var oldSuccess1 = oOptions.success;
         oldSuccess1 && (oOptions.success = function(data) {
         if (PREFIX == '/mockjs/') {
         data = Mock.mock(data);
         console.log('请求' + url + '返回的Mock数据:');
         console.dir(data);
         }
         oldSuccess1.apply(this, arguments);
         });
         var oldComplete = oOptions.complete;
         oldComplete && (oOptions.complete = function(data) {
         if (PREFIX == '/mockjs/') {
         data = Mock.mock(data);
         console.log('请求' + url + '返回的Mock数据:');
         console.dir(data);

         }
         oldComplete.apply(this, arguments);
         });
         } else if (isInWhiteList(url) && !oOptions.RAP_NOT_TRACK) {
         var checkerOptions = {
         url: oOptions.url
         };
         rapUrlConverterKissy(checkerOptions);
         checkerOptions.RAP_NOT_TRACK = true;
         checkerOptions.success = checkerHandler;
         // real data checking
         var oldSuccess2 = oOptions.success;
         oOptions.success = function() {
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


         KISSY.use = function(modules, callback) {
         var args = arguments;
         if (modules instanceof Array || typeof modules === 'string') {
         args[0] = replace(modules);
         }
         KISSY.oldUse.apply(this, args);
         };

         KISSY.add = function(name, fn, options) {
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
         KISSY.use('rap_io', function() {});
         }

         }*/
    }

    /*if (window.define && window.define.cmd) {
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
     */

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
     * example: www.baidu.com/a => domain/mock/106/a
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
     * example: www.baidu.com/a => domain/mock/106/a
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
            var i, n = list.length,
                item;
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
        }
    };

    RAP.initList(whiteList);
})();
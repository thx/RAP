/*******************************************
 * *
 * jQuery初始化方法 *
 * $.rap && $.rap(projectId); *
 * *
 * *
 * KISSY初始化方法 *
 * if (KISSY.rap) { *
 * IO = KISSY.rap(IO, projectId); *
 * } *
 * *
 * {{projectId}}就是RAP提供的项目ID *
 * *
 *******************************************/
(function() {
    var node = document.getElementById('rap');
    if (!node) {
        var nodes = document.getElementsByTagName('script');
        node = nodes[nodes.length - 1];
    }
    var projectId = 0;
    var ms = node.src.match(/(?:\?|&)projectId=([^&]+)(?:&|$)/);
    if (ms) {
        projectId = ms[1];
    }
    var enable = true;

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
                url = "http://rap.alibaba-inc.com/mockjs/" + projectId + url;
                oOptions.url = url;
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
                        url = "http://rap.alibaba-inc.com/mockjs/" + projectId + url;
                        oOptions.url = url;
                        var oldSuccess = oOptions.success;
                        oOptions.success = function() {
                            arguments[0] = Mock.mock(arguments[0]);
                            oldSuccess.apply(this, arguments);
                        };
                    }
                    IO.apply(this, arguments);
                };
            });
        }
    }
})();

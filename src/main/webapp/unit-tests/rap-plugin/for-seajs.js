module('Seajs-jQuery-RAP');

test('Seajs+jQuery: basic check', function () {
    stop(4);
    ok(window.wrapJQueryForRAP, 'wrap method exists');
    define('a', function (require) {
        start(1);
        var jq = require('jquery');
        ok(jq.providedByRAP, 'provided by rap');
        ok(jq._rap_wrapped, 'ajax wrapped')
        ok(jq('body')[0] == document.body, 'jquery is loaded by seajs');
    })

    define('b', function (require) {
        start(1);
        var jq = require('jQuery');
        ok(jq.providedByRAP, 'provided by rap');
        ok(jq._rap_wrapped, 'ajax wrapped')
        ok(jq('body')[0] == document.body, 'jQuery is loaded by seajs');
    })

    define('c', function (require) {
        start(1);
        var jq = require('jq');
        ok(jq.providedByRAP, 'provided by rap');
        ok(jq._rap_wrapped, 'ajax wrapped')
        ok(jq('body')[0] == document.body, 'jq is loaded by seajs');
    })

    define('d', function (require) {
        start(1);
        var jq = require('jQ');
        ok(jq.providedByRAP, 'provided by rap');
        ok(jq._rap_wrapped, 'ajax wrapped')
        ok(jq('body')[0] == document.body, 'jQ is loaded by seajs');
    })

    seajs.use(['a', 'b', 'c', 'd'], function (a, b, c, d) {
    });
});


test('Seajs+jQuery: get rap data', function () {
    stop()
    var action = '/base';
    define('e', function (require) {
        var $ = require('jquery');
        equal(RAP.getPrefix(), '/mockjs/', 'PREFIX is /mockjs/');
        $.ajax({
            type: "get",
            url: "/mockjs/base",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok('a' in data, 'mockjs : a is in data');
                ok(KISSY.isNumber(data['a']), 'and dataType is number');
            },
            error: function () {
            }
        });
    })

    seajs.use('e', function () {
    });
})
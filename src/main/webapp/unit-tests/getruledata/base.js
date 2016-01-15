module('get-mockjs-data');

test('jQuery.ajax[ORIGIN] - getMockjsData - get /mockjsdata/projectId/action', function () {
    stop();
    $.ajax({
        type: "get",
        url: "/mockjsdata/114/mockjs/base",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok('a' in data, 'property exists');
            ok(KISSY.isNumber(data.a), 'a is number');
            ok(data.a >= 1 && data.a <= 10, 'a between 1 and 10');
        },
        error: function () {
        }
    });
});


test('jQuery.ajax[RAPPED] - getMockjsData - Action : /mockjs/base', function () {
    stop();
    equal(RAP.getPrefix(), '/mockjs/', 'PREFIX is /mockjs/');
    $.rapAjax({
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
});


test('jQuery.ajax[RAPPED] - getMockjsData - Prefix: /mockjsdata/, Action:/mockjs/base', function () {
    stop();
    equal(RAP.getPrefix(), '/mockjs/', 'PREFIX is /mockjs/');
    var old = RAP.getPrefix();
    RAP.setPrefix('/mockjsdata/')
    $.rapAjax({
        type: "get",
        url: "/mockjs/base",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            RAP.setPrefix(old);
            start();
            ok('a' in data, 'mockjs : a is in data');
            ok(KISSY.isNumber(data['a']), 'and dataType is number');
        },
        error: function () {
        }
    });
});


test('KISSY[ORIGIN] - getMockjsData - get /mockjsdata/projectId/action', function () {
    stop();
    KISSY.oldUse('io', function (S, IO) {
        IO({
            type: "get",
            url: "/mockjsdata/114/mockjs/base",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok('a' in data, 'property exists');
                ok(KISSY.isNumber(data.a), 'a is number');
                ok(data.a >= 1 && data.a <= 10, 'a between 1 and 10');
            },
            error: function () {
            }
        })
    });
});


test('KISSY[RAPPED] - getMockjsData - Action: /mockjs/base', function () {
    stop();
    var base = '/mockjs/base';
    KISSY.use('io', function (S, IO) {
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok('a' in data, 'property exists');
                ok(KISSY.isNumber(data.a), 'a is number');
                ok(data.a >= 1 && data.a <= 10, 'a between 1 and 10');
            },
            error: function () {
            }
        })
    });
});

test('KISSY[RAPPED] - getMockjsData - Prefix: /mockjsdata/, Action: /mockjs/base', function () {
    stop();
    var base = '/mockjs/base';
    KISSY.use('io', function (S, IO) {
        var old = RAP.getPrefix();
        RAP.setPrefix('/mockjsdata/');
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok('a' in data, 'property exists');
                ok(KISSY.isNumber(data.a), 'a is number');
                ok(data.a >= 1 && data.a <= 10, 'a between 1 and 10');
            },
            error: function () {
            }
        })
        RAP.setPrefix(old);
    });
});
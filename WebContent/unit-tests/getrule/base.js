module('get-mockjs-rule');

test('jQuery - getMockjsRule - /mockjs/projectId/action', function () {
    stop();
    $.ajax({
        type: "get",
        url: "/mockjs/114/mockjs/base",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok('a|1-10' in data, 'mockjs rule: a|1-10 is in data');
            ok(KISSY.isNumber(data['a|1-10']), 'and dataType is number');
        },
        error: function () {
        }
    });
});


test('KISSY - getMockjsRule - /mockjs/projectId/action', function () {
    stop();
    var base = '/mockjs/114/mockjs/base';
    KISSY.oldUse('io', function (S, IO) {
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok('a|1-10' in data, 'mockjs rule: a|1-10 is in data');
                ok(KISSY.isNumber(data['a|1-10']), 'and dataType is number');
            },
            error: function () {
            }
        })
    });
});
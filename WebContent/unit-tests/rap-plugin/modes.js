module('rap-plugin-modes');

//mode 0：不走rap，应该404
test('setMode 0 - 404 [KISSY]', function () {
    var old = RAP.getMode();
    RAP.setMode(0);

    stop();
    var action = '/base';
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                start();
                ok(0, 'in here, is not right in this case');
                RAP.setMode(old);
            },
            error: function (data) {
                start();
                ok(1, 'in here, 404 is right in this case');
                RAP.setMode(old);
            }
        })
    })
});

//mode 0：不走rap，应该404
test('setMode 0 - 404 [jQuery]', function () {
    var old = RAP.getMode();
    RAP.setMode(0);

    stop();
    var action = '/base';
    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok(0, 'in here, is not right in this case');
            RAP.setMode(old);
        },
        error: function () {
            start();
            ok(1, 'in here, 404 is right in this case');
            RAP.setMode(old);
        }
    });
});


//mode 0：放行
test('setMode 0 - 200 [KISSY]', function () {
    var old = RAP.getMode();
    RAP.setMode(0);

    stop();
    var action = '/mockjsdata/114/mockjs/base';
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                start();
                ok(1, 'in here, is not right in this case');
                RAP.setMode(old);
            },
            error: function (data) {
                start();
                ok(0, 'in here, 404 is right in this case');
                RAP.setMode(old);
            }
        })
    })
});

//mode 0：放行
test('setMode 0 - 200 [jQuery]', function () {
    var old = RAP.getMode();
    RAP.setMode(0);

    stop();
    var action = '/mockjsdata/114/mockjs/base';
    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok(1, 'in here, is not right in this case');
            RAP.setMode(old);
        },
        error: function () {
            start();
            ok(0, 'in here, 404 is right in this case');
            RAP.setMode(old);
        }
    });
});

//mode 1：拦截所有请求
test('setMode 1 - 200 [KISSY]', function () {
    var old = RAP.getMode();
    RAP.setMode(1);

    stop();
    var action = '/base';
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                start();
                ok(1, 'in here, is right in this case');
                RAP.setMode(old);
            },
            error: function (data) {
                start();
                ok(0, 'in here, 404 is not right in this case');
                RAP.setMode(old);
            }
        })
    })
})

// mode 1：拦截所有请求
test('setMode 1 - 200 [jQuery]', function () {
    var old = RAP.getMode();
    RAP.setMode(1);

    stop();
    var action = '/base';
    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok(1, 'in here, is right in this case');
            RAP.setMode(old);
        },
        error: function () {
            start();
            ok(0, 'in here, 404 is not right in this case');
            RAP.setMode(old);
        }
    });
})


//mode 1：拦截所有请求
test('setMode 1 - 404 [KISSY]', function () {
    var old = RAP.getMode();
    RAP.setMode(1);

    stop();
    var action = '/mockjsdata/114/mockjs/base';
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                start();
                ok(data.isOk === false, 'no matched action');
                equal(data.errMsg, 'no matched action', 'no matched action');
                RAP.setMode(old);
            },
            error: function (data) {
            }
        })
    })
})

// mode 1：拦截所有请求
test('setMode 1 - 404 [jQuery]', function () {
    var old = RAP.getMode();
    RAP.setMode(1);

    stop();
    var action = '/mockjsdata/114/mockjs/base';
    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            start();
            ok(data.isOk === false, 'no matched action');
            equal(data.errMsg, 'no matched action', 'no matched action');
            RAP.setMode(old);
        },
        error: function () {
        }
    });
})
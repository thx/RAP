module('rap-plugin-base');

test('KISSY.use("rap_io"), to see KISSY.io|KISSY.IO|KISSY.ajax', function () {
    stop();
    action = '/base';
    KISSY.use('rap_io', function (S, IO) {
        ok(KISSY.io != undefined, 'got KISSY.io');
        ok(KISSY.ajax != undefined, 'got KISSY.ajax');
        ok(KISSY.IO != undefined, 'got KISSY.IO');

        ok(KISSY.io == IO, 'KISSY.io is rap_io');
        ok(KISSY.ajax == IO, 'KISSY.io is rap_io');
        ok(KISSY.IO == IO, 'KISSY.io is rap_io');

        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                equal(typeof data.a, 'number', 'get data ok by KISSY.use("io")');
                start();
            }
        })
    })
})


test('get data from KISSY.use("io")', function () {
    stop();
    action = '/base';
    KISSY.use('io', function (S, IO) {
        ok(KISSY.io != undefined, 'got KISSY.io');
        ok(KISSY.ajax != undefined, 'got KISSY.ajax');
        ok(KISSY.IO != undefined, 'got KISSY.IO');
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                equal(typeof data.a, 'number', 'get data ok by KISSY.use("io")');
                start();
            }
        })
    })
});

test('get data from KISSY.use("ajax")', function () {
    stop();
    action = '/base';
    KISSY.use('ajax', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                equal(typeof data.a, 'number', 'get data ok by KISSY.use("ajax")');
                start();
            }
        })
    })
});

test('get Data from KISSY.io', function () {
    action = '/base';
    stop();
    KISSY.io({
        url: action,
        dataType: 'json',
        success: function (data) {
            equal(typeof data.a, 'number', 'KISSY.io get data ok: a');
            equal(typeof data.b, 'string', 'KISSY.io get data ok: b');
            ok(KISSY.isObject(data.c), 'c is object');
            start();
        }
    });
});


test('get Data from KISSY.ajax', function () {
    action = '/base';
    stop();
    KISSY.io({
        url: action,
        dataType: 'json',
        success: function (data) {
            equal(typeof data.a, 'number', 'KISSY.ajax get data ok: a');
            equal(typeof data.b, 'string', 'KISSY.ajax get data ok: b');
            ok(KISSY.isObject(data.c), 'c is object');
            start();
        }
    });
});

test('KISSY.use("io", {success: function(S, IO) {}})', function () {
    action = '/base';
    stop();
    KISSY.use("io", {
        success: function (S, IO) {
            ok(KISSY.io != undefined, 'got KISSY.io');
            ok(KISSY.ajax != undefined, 'got KISSY.ajax');
            ok(KISSY.IO != undefined, 'got KISSY.IO');

            IO({
                url: action,
                dataType: 'json',
                success: function (data) {
                    equal(typeof data.a, 'number', 'get data ok');
                    start();
                }
            })
        }
    })
});


test('KISSY.use("ajax", {success: function(S, IO) {}})', function () {
    action = '/base';
    stop();
    KISSY.use("ajax", {
        success: function (S, IO) {
            ok(KISSY.io != undefined, 'got KISSY.io');
            ok(KISSY.ajax != undefined, 'got KISSY.ajax');
            ok(KISSY.IO != undefined, 'got KISSY.IO');

            IO({
                url: action,
                dataType: 'json',
                success: function (data) {
                    equal(typeof data.a, 'number', 'get data ok');
                    start();
                }
            })
        }
    })
});
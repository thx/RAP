module('rap-plugin-whiteList');

test('setWhiteList[ok] in mode 3', function () {
    var old = RAP.getMode();
    RAP.setMode(3);
    var white = RAP.getWhiteList();
    RAP.setWhiteList(['/base']);

    stop(2);
    var action = '/base';
    var counter = 0;
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                counter++;
                start(1);
                ok(1, 'in here, is right in this case');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setWhiteList(white);
                }
            },
            error: function (data) {
                counter++;
                start(1);
                ok(0, 'in here, 404 is not right in this case');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setWhiteList(white);
                }
            }
        })
    })

    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            counter++;
            start(1);
            ok(1, 'in here, is right in this case');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setWhiteList(white);
            }
        },
        error: function () {
            counter++;
            start(1);
            ok(0, 'in here, 404 is not right in this case');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setWhiteList(white);
            }
        }
    });
})

test('setWhiteList[not ok] in mode 3', function () {
    var old = RAP.getMode();
    RAP.setMode(3);

    var white = RAP.getWhiteList();
    RAP.setWhiteList(['/notExistsAction']);

    stop(2);
    var action = '/base';
    var counter = 0;
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                counter++;
                start(1);
                ok(0, 'whiteList mode, url node in list, should not 200');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setWhiteList(white);
                }
            },
            error: function (data) {
                counter++;
                start(1);
                ok(1, 'whiteList mode, url node in list, should 404');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setWhiteList(white);
                }
            }
        })
    })

    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            counter++;
            start(1);
            ok(0, 'whiteList mode, url node in list, should not 200');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setWhiteList(white);
            }
        },
        error: function () {
            counter++;
            start(1);
            ok(1, 'whiteList mode, url node in list, should 404');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setWhiteList(white);
            }
        }
    });
})


module('rap-plugin-blackList');

test('setBlackList[not ok] in mode 2', function () {
    var old = RAP.getMode();
    RAP.setMode(2);

    var black = RAP.getBlackList();
    RAP.setBlackList(['/notExistsAction']);

    stop(2);
    var action = '/base';
    var counter = 0;
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                counter++;
                start(1);
                ok(1, 'in here, is right in this case');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setBlackList(black);
                }
            },
            error: function (data) {
                counter++;
                start(1);
                ok(0, 'in here, 404 is not right in this case');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setBlackList(black);
                }
            }
        })
    })

    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            counter++;
            start(1);
            ok(1, 'in here, is right in this case');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setBlackList(black);
            }
        },
        error: function () {
            counter++;
            start(1);
            ok(0, 'in here, 404 is not right in this case');
            if (counter == 2) {
                RAP.setMode(old);
                RAP.setBlackList(black);
            }
        }
    });
})

test('setWhiteList[ok] in mode 2', function () {
    var old = RAP.getMode();
    RAP.setMode(2);

    var black = RAP.getBlackList();
    RAP.setBlackList(['/base']);

    stop(2);
    var action = '/base';
    var counter = 0;
    KISSY.use('io', function (S, IO) {
        IO({
            url: action,
            dataType: 'json',
            success: function (data) {
                counter++;
                start(1);
                ok(0, 'whiteList mode, url node in list, should not 200');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setBlackList(black);
                }
            },
            error: function (data) {
                counter++;
                start(1);
                ok(1, 'whiteList mode, url node in list, should 404');
                if (counter == 2) {
                    RAP.setMode(old);
                    RAP.setBlackList(black);
                }
            }
        })
    })

    $.rapAjax({
        type: "get",
        url: action,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            counter++;
            start(1);
            ok(0, 'whiteList mode, url node in list, should not 200');
            if (counter == 2) {
                RAP.setMode(old);
            }
        },
        error: function () {
            counter++;
            start(1);
            ok(1, 'whiteList mode, url node in list, should 404');
            if (counter == 2) {
                RAP.setMode(old);
            }
        }
    });
})
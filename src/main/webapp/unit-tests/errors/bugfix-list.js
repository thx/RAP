module('bugfix-BOSN', {
    setup: function () {
        this.oldProjectId = RAP.getProjectId(),
            this.oldMode = RAP.getMode();
        // 项目ID设置为“Bosn修复BUG专用”的ID
        RAP.setProjectId(189);
        // 拦截所有请求
        RAP.setMode(1);
    },
    teardown: function () {
        RAP.setProjectId(this.oldProjectId);
        RAP.setMode(this.oldMode);
    }
});

test('dataTypeBug fix', function () {
    stop();
    KISSY.use('io', function (S, IO) {
        IO({
            url: 'dataTypeBug.do',
            dataType: 'json',
            success: function (data) {
                ok(KISSY.isArray(data.numberArray), 'numberArray is array');
                ok(KISSY.isNumber(data.numberArray[0]), 'numberArray[0] is number');
                ok(KISSY.isArray(data.stringArray), 'stringArray is array');
                ok(KISSY.isString(data.stringArray[0]), 'stringArray[0] is string');
                start();
            }
        })
    })
})


test('paramMockJsTemplate fix', function () {
    stop(2);
    KISSY.use('io', function (S, IO) {
        IO({
            url: 'paramMockJsTemplate.do',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                equal(data.result, 'page is 1008, num is okokok', 'data origin: page is 1008, num is okokok');
                equal(data.result2, '', 'data origin: 1')
                start(1);

                IO({
                    url: 'paramMockJsTemplate.do',
                    data: {
                        num: 111,
                        page: 222
                    },
                    dataType: 'json',
                    success: function (data) {
                        equal(data.result, 'page is 222, num is 111', 'data changed: page is 222, num is 111');
                        equal(data.result2, 222, 'data changed: 222')
                        start(1);
                    }
                })
            }
        })
    })
})


test('unicode fix', function () {
    stop();
    KISSY.use('io', function (S, IO) {
        IO({
            url: 'unicode.do',
            dataType: 'json',
            success: function (data) {
                ok(KISSY.isString(data.string1), 'params are string');
                ok(KISSY.isString(data.string2), 'params are string');
                ok(KISSY.isString(data.string3), 'params are string');
                equal(data.string1, '1233打发打发..*(&(@#*&@(*#&*(', 'string1 is ok');
                equal(data.string2, '9832749802374098324782937flakdsjfldaskjf啊死了都快放假啊老师的看风景阿斯蒂芬(*&(*&', 'string2 is ok');
                equal(data.string3, '哈哈深度开发回家啊说的发来了空间啊说的饭卡上的减肥快乐的撒娇放假', 'string3 is ok');
                start();
            }
        })
    })
})


test('copyFunc fix', function () {
    stop();
    KISSY.use('io', function (S, IO) {
        IO({
            url: 'copyFunc',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                ok(KISSY.isArray(data.obj), 'data.obj is array');
                ok(KISSY.isArray(data.objCopy), 'data.objCopy is array');
                var a = data.obj[0], b = data.objCopy[0];
                for (var prop in a) {
                    ok(prop in b, 'b has ' + prop + ' too');
                }
                for (var prop in b) {
                    ok(prop in a, 'a has ' + prop + ' too');
                }
                for (var prop in a.item) {
                    ok(prop in b.item, 'b.item has ' + prop + ' too');
                    equal(typeof a.item[prop], typeof b.item[prop], 'value type is the same.')
                }
                for (var prop in b.item) {
                    ok(prop in a.item, 'a.item has ' + prop + ' too');
                    equal(typeof a.item[prop], typeof b.item[prop], 'value type is the same.')
                }
                start();
            }
        })
    })
})

module('bugfix');

test('without io: KISSY.use("node", function(S, A) {})', function () {
    stop(4);
    KISSY.use('node', function (S, Node) {
        start(1);
        ok(S.config, 'still has S.config');
    });

    KISSY.use('node, io', function (S, Node) {
        start(1);
        ok(S.config, 'still has S.config');
    });

    KISSY.use('node, io', function (S, Node, IO) {
        start(1);
        ok(S.config, 'still has S.config');
    });

    KISSY.use('node, io, node', function (S, Node, IO, Node) {
        start(1);
        ok(S.config, 'still has S.config');
    });
})

test('KISSY.add using IO', function () {
    stop();
    KISSY.add('tester/module', function (S, Node, IO) {
        ok(KISSY.io != undefined, 'got KISSY.io');
        ok(KISSY.ajax != undefined, 'got KISSY.ajax');
        ok(KISSY.IO != undefined, 'got KISSY.IO');

        IO({
            url: '/base',
            dataType: 'json',
            success: function (data) {
                equal(typeof data.a, 'number', 'get data ok');
                start();
            }
        })
    }, {requires: ['node', 'io']})

    KISSY.use('tester/module', function (S, A) {

    })
})
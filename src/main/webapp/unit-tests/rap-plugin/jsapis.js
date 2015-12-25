module('rap-plugin-jsapis');

test('RAP.set/getWhiteList', function () {
    var old = RAP.getWhiteList();
    var newList = ['a', 'b'];
    RAP.setWhiteList(newList);
    equal(RAP.getWhiteList(), newList, 'get/set ok');
    RAP.setWhiteList(old);
    equal(RAP.getWhiteList(), old, 'recover ok');
});

test('RAP.set/getHost', function () {
    var old = RAP.getHost();
    equal(old, window.location.host, 'old is ok');
    var newHost = 'rap2.ali' + 'bab' + 'a-inc.com';
    RAP.setHost(newHost);
    equal(RAP.getHost(), newHost, 'get/set ok');
    RAP.setHost(old);
    equal(RAP.getHost(), old, 'recover ok');
});

test('RAP.set/getBlackList', function () {
    var old = RAP.getBlackList();
    var newList = ['a', 'b'];
    RAP.setBlackList(newList);
    equal(RAP.getBlackList(), newList, 'get/set ok');
    RAP.setBlackList(old);
    equal(RAP.getBlackList(), old, 'recover ok');
});

test('RAP.set/getMode', function () {
    var old = RAP.getMode();
    var newMode = 3;
    RAP.setMode(newMode);
    equal(RAP.getMode(), newMode, 'get/set ok');
    RAP.setMode(old);
    equal(RAP.getMode(), old, 'recover ok');
});

test('RAP.set/getPrefix', function () {
    var old = RAP.getPrefix();
    equal(old, '/mockjs/', 'old is /mockjs/');
    var newPrefix = '/mockjsdata/';
    RAP.setPrefix(newPrefix);
    equal(RAP.getPrefix(), newPrefix, 'get/set ok');
    RAP.setPrefix(old);
    equal(RAP.getPrefix(), old, 'recover ok');
});

test('RAP.set/white list & black list functions', function () {
    var arr = ['a', 'b', 'c'];
    RAP.setWhiteList(arr);
    var whiteList = RAP.getWhiteList();
    deepEqual(arr, whiteList, 'white list works fine');

    var arr2 = ['a', 'b', 'c'];
    RAP.setBlackList(arr2);
    var blackList = RAP.getBlackList();
    deepEqual(arr2, blackList, 'black list works fined');
});

test('RAP.set/getProjectId', function () {
    var old = RAP.getProjectId();
    equal(old, 114, 'old is 114');
    var newProjectId = 121;
    RAP.setProjectId(newProjectId);
    equal(RAP.getProjectId(), newProjectId, 'get/set ok, new is ' + newProjectId);
    RAP.setProjectId(old);
    equal(RAP.getProjectId(), old, 'recover ok');
});

!function () {
    if (typeof window.console === 'undefined') {
        window.console = {};
    }

    var mockConsoleKeys = ['log', 'info', 'error', 'dir'];

    var k = '';
    for (var i = 0; i < mockConsoleKeys.length; i++) {
        k = mockConsoleKeys[i];
        if (typeof console[k] === 'undefined') {
            console[k] = genereateConsoleMethod(k);
        }
    }

    function genereateConsoleMethod(key) {
        return function (msg) {
            if (window.showConsoleMsg)
                document.body.innerHTML += '<br />[' + key + ']:' + msg;
        };
    }
}();
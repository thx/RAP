var root = /unit-tests/;
RAP.setHost(window.location.host);

function loadScript(s, callback) {
    $.getScript(root + s + '?' + (+new Date)).done(callback);
}


function loadScripts(scripts, callback) {
    // keep in order
    var i = 0;
    loadScript(scripts[i], function () {
        i++;
        if (i == scripts.length) {
            callback();
            return;
        }
        else {
            loadScript(scripts[i], arguments.callee);
        }
    });
}
var root = /unit-tests/;

async.map([
	'getrule/base.js',
	'getruledata/base.js',
	'rap-plugin/base.js'
], function(s, callback) {
	$.getScript(root + s).done(callback);
}, function(err, results) {
});
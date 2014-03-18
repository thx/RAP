var root = /unit-tests/;

async.map([
	'getrule/base.js',
	
	'getruledata/base.js',
	
	'rap-plugin/base.js',
	'rap-plugin/jsapis.js'
], function(s, callback) {
	$.getScript(root + s + '?' + (+new Date)).done(callback);
}, function(err, results) {
});
var root = /unit-tests/;
RAP.setHost(window.location.host);

module('env confirm');
test('no KISSY.io when kissy seed inited', function() {
	ok(KISSY.io === undefined, 'KISSY.io is undefined when kissy seed loaded');
})

async.map([
	'getrule/base.js',
	
	'getruledata/base.js',
	
	'rap-plugin/base.js',
	'rap-plugin/jsapis.js',
	
	'errors/rap-plugin-error.js'
], function(s, callback) {
	$.getScript(root + s + '?' + (+new Date)).done(callback);
}, function(err, results) {
});
module('bugfix');

test('without io: KISSY.use("node", function(S, A) {})', function() {
	stop();
	KISSY.use('node', function(S, Node) {
		start();
		ok(S.config, 'still has S.config');
	});
})
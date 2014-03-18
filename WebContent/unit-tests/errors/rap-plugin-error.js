module('bugfix');

test('without io: KISSY.use("node", function(S, A) {})', function() {
	stop(4);
	KISSY.use('node', function(S, Node) {
		start(1);
		ok(S.config, 'still has S.config');
	});
	
	KISSY.use('node, io', function(S, Node) {
		start(1);
		ok(S.config, 'still has S.config');
	});
	
	KISSY.use('node, io', function(S, Node, IO) {
		start(1);
		ok(S.config, 'still has S.config');
	});
	
	KISSY.use('node, io, node', function(S, Node, IO, Node) {
		start(1);
		ok(S.config, 'still has S.config');
	});
})
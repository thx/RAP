(function($) {
	var URLS = {
		org : {
			home: {
				'projects': '/org/projects.action',
				'productlines': '/org/home/productlines.action',
				'groups': '/org/home/groups.action'
			},
			group: {
				'all':    '/org/group/all.action',
				'update': '/org/group/update.action',
				'delete': '/org/group/delete.action',
				'create': '/org/group/create.action'
			},
			productline: {
				'all':    '/org/productline/all.action',
				'update': '/org/productline/update.action',
				'delete': '/org/productline/delete.action',
				'create': '/org/productline/create.action'
			},
			project: {
				'create': '/project/create.action',
				'delete': '/project/delete.action',
				'update': '/project/update.action',
				'search': '/project/search.action'
			}, 
			account: {
				'all': '/account/all.action'
			}
		},
		workspace: {
			'mine': '/workspace/myWorkspace.action'
		}
	};
	
	// 一个简单的路由对应
	// org.group.all
	// org.productline.update
	$.route = function(path) {
		var splited = path.split('.');
		var base = URLS, i = 0, l = splited.length, c;
		while(i < l) {
			c = splited[i];
			if (i == l - 1) {
				if (c in base) {
					return base[c];
				}
			}
			if (c in base) {
				base = base[c];
				i++;
			} else {
				return null;
			}
		}
	}
	$.route._urls = function() {
		console.log(JSON.stringify(URLS, null, 2))
	};
	
	var regs = {
		id: /(&|\?)?id\s*=\s*([\w\d_-]+)/,
		plid: /(&|\?)?plid\s*=\s*([\w\d_-]+)/
	}
	$.getLoc = function(prop) {
		var reg = regs[prop];
		var matched = reg.exec(window.location.href);
		if (matched) {
			return matched[2];
		} else {
			return '';
		}
	};
	
	$.local = function(key, value) {
		if (arguments.length == 0) {
			console.log($.__locals);
			return;
		}
		if (arguments.length == 1) {
			$.__locals = $.__locals || {};
			return $.__locals[key];
		}
		$.__locals[key] = value;
	};
	
	$.autocomplete = function (modal, users) {
		modal = $(modal);
		var con = modal.find('.accounts-con');
		var inputer = modal.find('.accounts-inputer');
		if (!inputer.data('blur-binded')) {
			inputer.data('blur-binded', 1);
			inputer.on('blur', function() {
				setTimeout(function() {
					con && con.hide();
				}, 200);
			});
		}
		var val = inputer.val().trim();
		if (val == '') {
			return;
		}
		var picked = [];
		var nodes = modal.find('.picked-user');
		for(var i = 0, l = nodes.length; i < l; i++) {
			picked.push($(nodes[i]).data('account'));
		}
		var remained = [];
		users.forEach(function(user) {
			if (remained.length >= 10) {
				return;
			}
			if (picked.indexOf(user.account) != -1) {
				return;
			}
			if (user.account.indexOf(val) != -1) {
				remained.push(user);
			}
		});
		if (remained.length == 0) {
			remained.push({block:true})
		}
		var tmpl = $('#user-auto-list').text();
		var itemTeml = $('#user-item-tmpl').text();
		var html = $.render(tmpl, {
			users: remained
		});
		
		con.show();
		con.html(html);
		var pos = inputer.position();
		con.css({
			left: pos.left,
			top: pos.top + inputer.outerHeight() + 2
		});
		if (!con.data('inited')) {
			con.data('inited', 1);
			con.delegate('li', 'click', function() {
				if ($(this).data('block')) {
					return;
				}
				var node = $(this);
				inputer.before($.render(itemTeml, {
					name: node.data('name'), 
					account: node.data('account')
				}));
				con.hide();
				inputer.val('');
				setTimeout(function() {
					inputer && inputer.focus();
				}, 200);
			});
		}
	}
})($);
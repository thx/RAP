$(function() {
	//$(".content").html('group here');

	/*
	$.post(URLS['update'], {
		id: 1
	}, function(data) {
		console.log(data.isOk);
	}, 'JSON');*/
	
	var plId = $.getLoc('plid');
	if (!plId) {
		alert('亲，没有产品线ID，这不可能吧。。。')
		return;
	}
	
	function showUpdateGroupForm() {
		var prev = $(this).prev();
		prev.fadeIn();
		prev.find('input').val(prev.prev().text()).stop().delay(200, function() {
			$(this).focus();
		});
		$(this).hide();
	}
	
	function showAutocompleter(modal, users) {
		modal = $(modal);
		var con = modal.find('.accounts-con');
		var inputer = modal.find('.accounts');
		if (!inputer.data('blur-binded')) {
			inputer.data('blur-binded', 1);
			inputer.on('blur', function() {
				setTimeout(function() {
					con && con.hide();
				}, 100);
			});
		}
		var val = inputer.val().trim();
		if (val == '') {
			return;
		}
		var picked = [];
		var nodes = modal.find('.picked-user');
		for(var i = 0, l = nodes.length; i < l; i++) {
			picked.push($(nodes[i]).data('name'));
		}
		var remained = [];
		users.forEach(function(user) {
			if (picked.indexOf(user.name) != -1) {
				return;
			}
			if (user.name.indexOf(val) != -1) {
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
					realname: node.data('realname')
				}));
				con.hide();
				inputer.val('');
			});
		}
	}
	
	function bindEvents() {
		$('body')
		.delegate('.update-group', 'click', showUpdateGroupForm)
		.delegate('.cancel-edit', 'click', function() {
			$(this).parent().hide().next().show();
		})
		.delegate('.delete-group', 'click', function() {
			var that = this;
			var con = $(that).parents('h3').next();
			if (con.find('.box').length != 0) {
				con.addClass('shake');
				timer = setTimeout(function() {
					con.removeClass('shake');
				}, 1000);
				return;
			}
			var id = $(this).data('id');
			$.confirm({
				content: '删除以后不能恢复，请谨慎操作',
				title: '您确定要删除此分组吗？',
				confirmText: '删除分组',
				confirmClicked: function() {
					var modal = $(this);
					$.post($.route('org.group.delete'), {
						id: id
					}, function(data) {
						con.parent('.group').hide('slow', function() {
							$(this).remove();
						});
						modal.modal('hide');
					}, "JSON")
				}
			});
		})
		
		.delegate('.create-group', 'click', function() {
			$.confirm({
				content: $('#create-group-tmpl').text(),
				title: '创建分组',
				confirmText: '确认创建',
				showCallback: function() {
					$(this).find('input[type=text]').focus();
				},
				confirmClicked: function() {
					var tmpl = $('#group-tmpl').text();
					var inputer = $(this).find('input[type=text]');
					if (inputer.val().trim() == '') {
						inputer.addClass('shake');
						inputer.focus();
						setTimeout(function() {
							inputer && inputer.removeClass('shake');
						}, 1000);
						return;
					}
					var modal = $(this);
					$.post($.route('org.group.create'), {
						productLineId: plId,
						name: inputer.val().trim()
					}, function(data) {
						var html = $.render(tmpl, data);
						var node = $(html);
						$(".groups").append(node);
						modal.modal('hide');
					}, "JSON")
				}
			});
		})
		.delegate('.box', 'click', function() {
			var box = $(this);
			if (!box.hasClass('box')) {
				box = box.parent('.box');
			}
			var projId = box.data('projid');
			window.location.href= $.route('workspace.mine') + '?projectId=' + projId;
		})
		.delegate('.box-to-add', 'click', function() {
			var that = this;
			
			getUsers(function(users) {
				$.confirm({
					content: $('#create-proj-tmpl').text(),
					title: '创建项目',
					confirmText: '确认创建',
					showCallback: function() {
						var that = this;
						$(this).find('input[type=text]').focus();
						$(this).find('.picking-user').delegate('.unpick-btn', 'click', function() {
							$(this).parent('.picked-user').remove();
						});
						$(this).find('.accounts').keyup(function() {
							showAutocompleter(that, users);
						}).focus(function() {
							showAutocompleter(that, users);
						});
					},
					confirmClicked: function() {
						var inputer = $(this).find('input[type=text]');
						if (inputer.val().trim() == '') {
							inputer.addClass('shake');
							inputer.focus();
							setTimeout(function() {
								inputer && inputer.removeClass('shake');
							}, 1000);
							return;
						}
						var tmpl = $('#create-proj-success-tmpl').text();
						var modal = $(this);
						$.post($.route('org.project.create'), {
							name: inputer.val(),
							desc: $(this).find('textarea.desc').val(),
							accounts: $(this).find('textarea.accounts').val()
						}, function(data) {
							var html = $.render(tmpl, data);
							$(that).before(html);
							modal.modal('hide');
						}, "JSON")
					}
				});
			});
		})
		.delegate('.save-update-group', 'click', function() {
			var jqThis = $(this);
			
			var inputer = jqThis.prev();
			if (inputer.val().trim() == '') {
				inputer.addClass('shake');
				inputer.focus();
				setTimeout(function() {
					inputer && inputer.removeClass('shake');
				}, 1000);
				return;
			}
			
			var id = jqThis.data('id');
			var newValue = inputer.val();
			$.post($.route('org.group.update'), {
				name: newValue,
				id: id
			}, function(data) {
				jqThis.parent().prev().html(newValue);
				jqThis.parent().hide();
				jqThis.parent().next().show();
			}, "JSON");
		});
	}
	var users = [{name: 'wangjeaf1', realname: '王致富'}, 
	             {name: 'zhifu.wzf2', realname: 'wzf2'}, 
	             {name: 'huoyongd3', realname:'活用'},
	             {name: 'wangjeaf', realname: '王致富'}, 
	             {name: 'zhifu.wzf', realname: 'wzf2'}, 
	             {name: 'huoyongd', realname:'活用'}
	];
	
	function getUsers(callback) {
		if (users) {
			callback(users);
			return;
		}
		
		$.get($.route('org.user.all'), function(data) {
			users = data;
			callback(users);
		}, "JSON");
	}
	function render() {
		$.get($.route('org.group.all'), {
			productLineId: plId
		}, function(groups) {
			var tmpl = $('#group-tmpl').text();
			
			var html = $.render(tmpl, groups);
			$(".groups").append(html);
			bindEvents();
		}, 'JSON');
	}
	
	
	render();
});
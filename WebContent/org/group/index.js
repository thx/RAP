$(function() {
	//$(".content").html('group here');

	/*
	$.post(URLS['update'], {
		id: 1
	}, function(data) {
		console.log(data.isOk);
	}, 'JSON');*/
	
	var groups = {
		groups: [
		{
			id: 1,
			name: '测试分组1',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目11',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前',
			    	important: true
			    },
			    {
			    	id: 2,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    },
			    {
			    	id: 3,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    },
			    {
			    	id: 4,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    }
			]
		},{
			id: 1,
			name: '测试分组2',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    }
			]
		},{
			id: 1,
			name: '测试分组3',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    }
			]
		}]
	};
	
	function showUpdateGroupForm() {
		var prev = $(this).prev();
		prev.fadeIn();
		prev.find('input').val(prev.prev().text()).stop().delay(200, function() {
			$(this).focus();
		});
		$(this).hide();
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
			$.confirm({
				content: '删除以后不能恢复，请谨慎操作',
				title: '您确定要删除此分组吗？',
				confirmText: '删除分组',
				confirmClicked: function() {
					con.parent('.group').hide('slow', function() {
						$(this).remove();
					});
					$(this).modal('hide');
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
					var html = $.render(tmpl, {
						groups: [{
							id: 2,
							name: inputer.val()
						}]
					});
					var node = $(html);
					$(".groups").append(node);
					$(this).modal('hide');
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
			
			$.confirm({
				content: $('#create-proj-tmpl').text(),
				title: '创建项目',
				confirmText: '确认创建',
				showCallback: function() {
					$(this).find('input[type=text]').focus();
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
					var data = {
						id: 1,
						name: inputer.val(),
						desc: $(this).find('textarea').val(),
						status: '刚刚创建'
					};
					var html = $.render(tmpl, data);
					$(that).before(html);
					$(this).modal('hide');
				}
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
			
			var newValue = inputer.val();
			jqThis.parent().prev().html(newValue);
			jqThis.parent().hide();
			jqThis.parent().next().show();
		});
	}
	var tmpl = $('#group-tmpl').text();
	
	var html = $.render(tmpl, groups);
	$(".groups").append(html);
	bindEvents();
});
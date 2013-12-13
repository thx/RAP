$(function() {
	//$(".content").html('group here');
	//$.get($.route('org.home.projects'), function(data) {
	//	console.log(data.isOk);
	//}, 'JSON');
	
	var NAME_MAP = {
		'user': '我的项目',
		'star': '重要项目',
		'heart': '我关注的项目'
	};
	
	var data = {
		groups: [
		{
			type: 'user',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目11',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
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
			type: 'heart',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目11',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    },
			    {
			    	id: 2,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    }
			]
		},{
			type: 'star',
			projects: [
			    {
			    	id: 1,
			    	name: '测试项目11',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    },
			    {
			    	id: 2,
			    	name: '测试项目',
			    	desc: '这是一个测试项目',
			    	status: '最近更新：2小时前'
			    }
			]
		}]
	};
	
	function fillNames(groups) {
		groups.forEach(function (group) {
			group.name = NAME_MAP[group.type] || '其他';
		});
	}
	function bindEvents() {
		$('body')
		.delegate('.box', 'click', function() {
			var box = $(this);
			if (!box.hasClass('box')) {
				box = box.parent('.box');
			}
			var projId = box.data('projid');
			window.location.href= $.route('workspace.mine') + '?projectId=' + projId;
		});
	}
	var tmpl = $('#group-tmpl').text();
	fillNames(data.groups);
	var html = $.render(tmpl, data);
	$(".groups").append(html);
	bindEvents();
});
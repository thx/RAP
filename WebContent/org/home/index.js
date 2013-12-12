$(function() {
	//$(".content").html('group here');
	
	var groups = {
		groups: [
		{
			id: 1,
			name: '<i class="glyphicon glyphicon-user"></i> 我的项目',
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
			id: 1,
			name: '<i class="glyphicon glyphicon-heart"></i> 我关注的项目',
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
			id: 1,
			name: '<i class="glyphicon glyphicon-star"></i> 重要项目',
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
	
	function bindEvents() {
		$('body')
		.delegate('.box', 'click', function() {
			var box = $(this);
			if (!box.hasClass('box')) {
				box = box.parent('.box');
			}
			var projId = box.data('projid');
			window.location.href="/rap/project.action?id=" + projId;
		})
	}
	var tmpl = $('#group-tmpl').text();
	
	var html = $.render(tmpl, groups);
	$(".groups").append(html);
	bindEvents();
});
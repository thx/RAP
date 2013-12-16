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
	
	function bindEvents() {
		$('body')
		.delegate('.box', 'click', function() {
			var box = $(this);
			if (!box.hasClass('box')) {
				box = box.parent('.box');
			}
			var projId = box.data('projid');
			window.open($.route('workspace.mine') + '?projectId=' + projId);
		});
	}
	
	function render() {
		var tmpl = $('#group-tmpl').text();
		$.get($.route('org.home.projects'), {}, function(data) {
			data.groups.forEach(function (group) {
				group.name = NAME_MAP[group.type] || '其他';
			});
			var html = $.render(tmpl, data);
			$(".groups").append(html);
			bindEvents();
		}, "JSON");
	}
	
	render();
});
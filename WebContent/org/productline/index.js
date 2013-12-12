$(function() {
	function render() {
		var data = {
			items: [{
				id: 1,
				name: '测试产品线1',
				count: 123
			},
			{
				id: 2,
				name: '测试产品线2',
				count: 123
			},
			{
				id: 3,
				name: '测试产品线3',
				count: 123
			},
			{
				id: 4,
				name: '测试产品线4',
				count: 123
			}]
		};
		
		var tmpl = $('#table-rows').text();
		$('#pl-items').html($.render(tmpl, data));
	}
	
	function createProductline() {
		$.confirm({
			content: $.render($('#create-productline').text(), {}),
			title: '添加产品线',
			confirmText: '确定',
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
				var tmpl = $('#table-rows').text();
				$('#pl-items').append($.render(tmpl, {items:
					[{
						id: 5,
						name: $(this).find('input[type=text]').val(),
						count: 0
					}]
				}
				));
				$(this).modal('hide');
			}
		});
	}
	
	function updateProductline() {
		var jqThis = $(this);
		var id = jqThis.data('id');
		var name = jqThis.parents('.pl-item').find('.name').text();
		$.confirm({
			content: $.render($('#create-productline').text(), {value: name}),
			title: '更新产品线',
			confirmText: '确定',
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
				$('.pl-' + id).find('.name').html($(this).find('input[type=text]').val());
				$(this).modal('hide');
			}
		});
	}
	
	function deleteProductline() {
		var jqThis = $(this);
		var id = jqThis.data('id');
		var name = jqThis.parents('.pl-item').find('.name').text();
		$.confirm({
			content: '删除以后不能恢复，请谨慎操作',
			title: '您确定要删除产品线 ' + name + ' 吗？',
			confirmText: '确定删除',
			confirmClicked: function() {
				var node = $('.pl-' + id);
				node.remove();
				$(this).modal('hide');
			}
		});
	}
	
	function bindEvents() {
		$('body')
			.delegate('.create-btn', 'click', createProductline)
			.delegate('.update-btn', 'click', updateProductline)
			.delegate('.delete-btn', 'click', deleteProductline);
	}
	
	function init() {
		render();
		bindEvents();
	}
	
	init();
});
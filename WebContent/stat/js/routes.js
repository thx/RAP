(function($) {
	var URLS = {
		org : {
			home: {
				'projects': '/rap/org/projects.action'
			},
			group: {
				'all':    '/rap/org/group/all.action',
				'update': '/rap/org/group/update.action',
				'delete': '/rap/org/group/delete.action',
				'create': '/rap/org/group/create.action'
			},
			productline: {
				'all':    '/rap/org/productline/all.action',
				'update': '/rap/org/productline/update.action',
				'delete': '/rap/org/productline/delete.action',
				'create': '/rap/org/productline/create.action'
			}
		},
		workspace: {
			'mine': '/rap/workspace/myWorkspace.action'
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
})($);
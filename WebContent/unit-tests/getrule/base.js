module('get-mockjs-rule');

test('jQuery: get mockjs rule from host by /mockjs/projectId/action', function() {
	stop();
	$.ajax({  
        type : "get",  
        url : "/mockjs/114/mockjs/base",
        dataType : "jsonp",
        jsonp: "callback",
        success : function(data){
        	start();
        	ok('a|1-10' in data, 'mockjs rule: a|1-10 is in data');
        	ok(KISSY.isNumber(data['a|1-10']), 'and dataType is number');
        },  
        error:function(){  
        }  
    });  
});

test('jQuery.ajax(replaced by RAP) - getMockjsData - data rendered in plugin by Mock.mock, Action:/mockjs/base', function() {
	stop();
	equal(RAP.getPrefix(), '/mockjs/', 'PREFIX is /mockjs/');
	$.rapAjax({  
        type : "get",  
        url : "/mockjs/base",  
        dataType : "jsonp",
        jsonp: "callback",
        success : function(data){
        	console.log(data);
        	start();
        	ok('a' in data, 'mockjs : a is in data');
        	ok(KISSY.isNumber(data['a']), 'and dataType is number');
        },  
        error:function(){  
        }  
    });  
});

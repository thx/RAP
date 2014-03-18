module('get-mockjs-rule');

test('get mockjs rule from host by /mockjs/projectId/action', function() {
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
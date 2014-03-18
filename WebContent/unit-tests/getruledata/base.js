module('get-mockjs-rule-data');

test('get mockjs data from host by /mockjsdata/projectId/action', function() {
	stop();
	$.ajax({  
        type : "get",  
        url : "/mockjsdata/114//mockjs/base",  
        dataType : "jsonp",
        jsonp: "callback",
        success : function(data){
        	start();
        	ok('a' in data, 'property exists');
        	ok(KISSY.isNumber(data.a), 'a is number');
        	ok(data.a >= 1 && data.a <= 10, 'a between 1 and 10');
        },  
        error:function(){  
        }  
    });  
});
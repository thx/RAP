module('get-mockjs-rule-data');

test('jQuery - getMockjsData - get "/mockjsdata/projectId/action"', function() {
	stop();
	$.ajax({  
        type : "get",  
        url : "/mockjsdata/114/mockjs/base",  
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

test('KISSY - getMockjsData - get "/mockjsdata/projectId/action"', function() {
	stop();
	KISSY.oldUse('io', function(S, IO) {
		IO({
			type : "get",  
	        url : "/mockjsdata/114/mockjs/base",  
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
		})
	});
});

test('KISSY - getMockjsData - setPrefix("/mockjsdata/") and just get by action', function() {
	stop();
	var base = '/mockjs/base';
	KISSY.use('io', function(S, IO) {
		var old = RAP.getPrefix();
		RAP.setPrefix('/mockjsdata/');
		IO({
			type : "get",  
	        url : base,  
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
		})
		RAP.setPrefix(old);
	});
});
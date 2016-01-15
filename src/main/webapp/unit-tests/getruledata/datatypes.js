module('mockjs-data-validation');

test('DATA_TYPES: exist and type', function () {
    stop();
    var base = '/datatypes';
    KISSY.use('io', function (S, IO) {
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();

                ok('boolean' in data, 'boolean in data');
                ok('string' in data, 'string in data');
                ok('object' in data, 'object in data');
                ok('number' in data, 'number in data');

                ok(KISSY.isNumber(data.number), 'number is number');
                ok(KISSY.isObject(data.object), 'object is object');
                ok(KISSY.isString(data.string), 'string is string');
                ok(KISSY.isBoolean(data.boolean), 'boolean is boolean');
                var obj = data.object;
                ok('d' in obj, 'sub prop');

                ok(KISSY.isNumber(obj.a), 'sub prop is number');
                ok(KISSY.isString(obj.b), 'sub prop is string');
                ok(KISSY.isBoolean(obj.c), 'sub prop is boolean');
                ok(KISSY.isObject(obj.d), 'sub prop is object');

                ok(obj.d.d1, 'd1 in obj.d');
                ok(KISSY.isNumber(obj.d.d1), 'obj.d.d1 is number');

                ok('array_boolean' in data, 'array boolean in data');
                ok('array_string' in data, 'array string in data');
                ok('array_number' in data, 'array number in data');
                ok('array_object' in data, 'array object in data');

                ok(KISSY.isBoolean(data.array_boolean[0]), 'booleans[0] is boolean');
                ok(KISSY.isString(data.array_string[0]), 'strings[0] is string');
                ok(KISSY.isNumber(data.array_number[0]), 'numbers[0] is number');
                ok(KISSY.isObject(data.array_object[0]), 'objects[0] is object');

                var obj = data.array_object[0];
                ok('d' in obj, 'sub prop exist');
                ok(KISSY.isObject(obj.d), 'is object!');
                ok('d1' in obj.d, 'sub sub prop exist');
                ok(KISSY.isNumber(obj.d.d1), 'is number');
            },
            error: function () {
            }
        })
    });
});


test('DATA_TYPES: values', function () {
    stop();
    var base = '/datatypes';
    KISSY.use('io', function (S, IO) {
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();

                ok(data.number >= 1 && data.number <= 20, 'number|1-20');
                ok(data.boolean === true || data.boolean === false, 'boolean is true or false');
                ok(/^B{1,5}$/.test(data.string), 'string is B{1-5}');

                var obj = data.object;
                ok('d' in obj, 'sub prop');

                ok(obj.a >= 1 && obj.a <= 10, 'a|1-10');
                ok(/^A{3,5}$/.test(obj.b), 'string is A{3-5}');
                ok(obj.c === true || obj.c === false, 'sub prop is boolean');

                ok(obj.d.d1 >= 3 && obj.d.d1 <= 10, 'obj.d.d1|3-10');

                var arr = data.array_boolean;
                ok(arr[0] === true, 'a[0] = true');
                ok(arr[1] === false, 'a[1] = false');

                var arr = data.array_string;
                ok(arr[0] == 'a', 'b[0] = a');
                ok(arr[1] == 'b', 'b[1] = b');
                ok(arr[2] == 'c', 'b[2] = c');

                var arr = data.array_number;
                ok(arr[0] == 1, 'b[0] = 1');
                ok(arr[1] == 2, 'b[1] = 2');
                ok(arr[2] == 3, 'b[2] = 3');

                var arr = data.array_object;
                ok(arr.length == 3, 'object length is 3');

                var obj = data.array_object[0];
                ok(obj.a >= 3 && obj.a <= 7, 'a|3-7');
                ok(/^A{4}$/.test(obj.b), 'b is AAAA');
                ok(obj.c === true || obj.c === false, 'c is true or false');
                ok(obj.d.d1 >= 3 && obj.d.d1 <= 7, 'd.d1|3-7');
            },
            error: function () {
            }
        })
    });
});

function propsIn(props, obj, name) {
    for (var i = 0; i < props.length; i++) {
        ok(props[i] in obj, props[i] + ' in ' + name);
    }
}
test('DATA_TYPES: demo data from mockjs.com(import by JSON, Cool~)', function () {
    stop();
    var base = '/mockjs/demo/from/site';
    KISSY.use('io', function (S, IO) {
        IO({
            type: "get",
            url: base,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                start();
                ok(data.data, 'data exists');
                ok(KISSY.isArray(data.data), 'data is array');
                ok(data.data.length >= 1 && data.data.length <= 10, 'data|1-10');
                var pick = data.data[0];
                propsIn(['cn', 'date', 'datetime', 'dummyimage', 'email', 'float1', 'float2', 'float3',
                    'float4', 'grade1', 'grade2', 'img1', 'img2', 'method', 'param', 'published', 'repeat', 'size',
                    'star', 'time'], pick, 'data[0]');
                equal(pick.id, 1, 'id is 1');
                if (data.data.length > 1) {
                    equal(data.data[1].id, 2, 'id increment');
                }
            }
        })
    });
});

// TODO
// @mock=@value@prop test
// 各种mockjs的规则编辑测试
// @mock=和直接写的测试

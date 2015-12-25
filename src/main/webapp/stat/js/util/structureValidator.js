!function () {
    var global = this;
    var LOST = "LOST";
    var EMPTY_ARRAY = "EMPTY_ARRAY";
    var TYPE_NOT_EQUAL = "TYPE_NOT_EQUAL";

    function StructureValidator(o1, o2, leftName, rightName) {
        if (typeof o1 === 'string') {
            try {
                o1 = JSON.parse(o1);
            } catch (ex) {
            }
        }
        if (typeof o2 === 'string') {
            try {
                o2 = JSON.parse(o2);
            } catch (ex) {
            }
        }

        if (!leftName) {
            leftName = 'obj';
        }
        if (!rightName) {
            rightName = 'obj';
        }
        if (this === global) {
            throw Error('Please use "new StructureValidator(o1, o2);"');
        }
        this.o1 = o1;
        this.o2 = o2;
        this._check(o2, o1, 'left', leftName, true);
        this._check(o1, o2, 'right', rightName);
    }

    StructureValidator.prototype.getResult = function () {
        return {
            left: this.left,
            right: this.right
        };
    };

    StructureValidator.prototype.getResultStr = function () {
        var result = this.getResult();
        var left = result.left;
        var right = result.right;
        var i;
        var log = [];

        if (left.length === 0 && right.length === 0) {
            log.push('接口结构校验完毕，未发现问题。');
        } else {
            if (this.url) {
                log.push('在校验接口' + this.url + '时发现错误:');
            }
            for (i = 0; i < left.length; i++) {
                log.push(validatorResultLog(left[i]));
            }
            for (i = 0; i < right.length; i++) {
                log.push(validatorResultLog(right[i], true));
            }
        }

        return log.join("\n");

        function validatorResultLog(item, isReverse) {
            var eventName;
            if (item.type === LOST) {
                eventName = isReverse ? '未在接口文档中未定义。' : '缺失';
            } else if (item.type === EMPTY_ARRAY) {
                eventName = '数组为空，无法判断其内部的结构。';
                return; // 暂时忽略此种情况
            } else if (item.type === TYPE_NOT_EQUAL) {
                eventName = '数据类型与接口文档中的定义不符';
            }
            return '参数 ' + item.namespace + "." + item.property + ' ' + eventName;
        }
    }

    StructureValidator.prototype._check = function (o1, o2, key, keyName, isReverseCheck) {
        var result = [];

        function typeEqual(a, b) {
            if (typeof a != typeof b) {
                return false;
            }
            var m = {}.toString;
            if (m.apply(a) != m.apply(b)) {
                return false;
            }
            return true;
        }

        function isObject(o) {
            return o && typeof o === 'object';
        }

        function isArrayObject(o) {
            return isObject(o) && {}.toString.apply(o) === "[object Array]";
        }

        function checkStructure(oa, ob, ns) {
            var p;
            var l, r;
            for (p in oa) {
                if (oa.hasOwnProperty(p)) {
                    if (!ob.hasOwnProperty(p)) {
                        result.push({
                            type: LOST,
                            property: p,
                            namespace: ns
                        });
                    } else if (!typeEqual(oa[p], ob[p])) {
                        if (!isReverseCheck) {
                            result.push({
                                type: TYPE_NOT_EQUAL,
                                property: p,
                                namespace: ns
                            });
                        }
                    } else if (isArrayObject(oa[p]) && isArrayObject(ob[p])) {
                        var la = oa[p];
                        var lb = ob[p];

                        var length = la.length > lb.length ? la.length : lb.length;


                        for (var i = 0; i < length; i++) {
                            // if la[i] is null, using the first element instead
                            l = la[i] ? la[i] : la[0];
                            r = lb[i] ? lb[i] : lb[0];
                            if (l && r && isObject(l) && isObject(r)) {
                                checkStructure(l, r, ns + '.' + p + '[' + i + ']');
                            } else if (l && !r) {
                                result.push({
                                    type: EMPTY_ARRAY,
                                    property: p,
                                    namespace: ns
                                });
                            }
                        }

                    } else if (isObject(oa[p]) && isObject(ob[p])) {
                        checkStructure(oa[p], ob[p], ns + '.' + p);
                    }
                }
            }
        }

        checkStructure(o1, o2, keyName, result);
        this[key] = result;
    };

    global.StructureValidator = StructureValidator;

    function tester() {

        var o1 = {
            p1: 1,
            p2: 2,
            p3: 3,
            p4: 8,
            obj: [{
                op3: 3,
                op6: 6,
                op7: 7
            }]
        };
        var o2 = {
            p1: 1,
            p2: 5,
            p3: 3,
            p4: 4,
            obj: [{
                op3: 3,
                op6: 6,
                op7: 7
            }, {
                op3: 3,
                op6: 6,
                op77: 7
            }]
        };

        var validator = new StructureValidator(o1, o2);
        console.log('result:');
        console.dir(validator.getResult());
        console.log('resultStr:');
        console.dir(validator.getResultStr());
    }

    //tester();

}();

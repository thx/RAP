!function() {
    var global = this;

    function StructureValidator(o1, o2, leftName, rightName) {
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

    StructureValidator.prototype.getResult = function() {
        return {
            left  : this.left,
            right : this.right
        };
    };

    StructureValidator.prototype._check = function(o1, o2, key, keyName, isReverseCheck) {
        var result = [];
        var LOST = "LOST";
        var EMPTY_ARRAY = "EMPTY_ARRAY";
        var TYPE_NOT_EQUAL = "TYPE_NOT_EQUAL";

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
                            type : LOST,
                            property : p,
                            namespace : ns
                        });
                    } else if (!typeEqual(oa[p], ob[p])) {
                        if (!isReverseCheck) {
                            result.push({
                                type : TYPE_NOT_EQUAL,
                                property : p,
                                namespace : ns
                            });
                        }
                    } else if (isArrayObject(oa[p]) && isArrayObject(ob[p])) {
                        l = oa[p][0];
                        r = ob[p][0];
                        if (l && r) {
                            checkStructure(l, r, ns + '.' + p + '[0]');
                        } else if (l && !r) {
                            result.push({
                                type : EMPTY_ARRAY,
                                property : p,
                                namespace : ns
                            });
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
            p1 : 1, 
            p2 : 2, 
            p3 : 3,
            obj : [{
                op3 : 3,
                op6 : 6,
                op7 : 7
            }]
        };
        var o2 = {
            p1 : 1, 
            p3 : 3, 
            p4 : 4,
            obj : []
        };
    
        var validator = new StructureValidator(o1, o2);
        console.log('result:');
        console.dir(validator.getResult());
    }

    tester();

}();
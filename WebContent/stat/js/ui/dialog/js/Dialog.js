// filename       : Fe/Dialog.all.js
// filesize       : 56356 bytes
// version        : trunk
// generated_time : 20081209-16:47:25

//:FE_TYPE_SYS
/**
 * @fileoverview Fe.Dialog
 * @author <a href="huangfr@msn.com">meizz</a>, leeight
 * @version 1.0
 * @create-date 2008-6-13
 */

/**
 * @fileoverview JavaScript framework \u4e2d\u6240\u6709\u7c7b\u7684\u57fa\u7c7b
 * \u8c03\u7528\u7684\u793a\u4f8b\uff1a

 //nclude("Fe.inherit");
 //nclude("Fe.BaseClass");
 function ChildClass(){
  Fe.BaseClass.call(this);

  //this.property="";
}
 Fe.inherit(ChildClass, Fe.BaseClass, "ChildClass");

 //class method
 ChildClass.prototype.method=function(){};

 * @author meizz
 * @version 20081129
 * @create-date 20050227
 **/
//nclude("Fe");
//nclude("Fe.inherit");

/**
 * @namespace
 * @name Fe
 */

var Fe = Fe || {
        /** @ignore */
        version: "20080809",
        /** @function */
        emptyFn: function () {
        }
    };
Fe.path = '../static/js/ui/dialog/';
//nclude("Fe");


/**
 * function child(){}
 * function parent(){}
 * Fe.inherit(child, parent)
 * @param {Function} child \u5b50\u7c7b
 * @param {Function} parentClass \u7236\u7c7b
 * @param {String} [className] \u5b50\u7c7b\u7684\u540d\u5b57\uff0c\u53ef\u9009
 */

Fe.inherit = function (child, parentClass, className) {
    var op = child.prototype;

    var C = function () {
    };
    C.prototype = parentClass.prototype;

    var np = child.prototype = new C();

    if (typeof className == "string") {
        np._className = className;
    }

    for (var i in op) {
        np[i] = op[i];
    }

    // \u6062\u590d\u5b50\u7c7b\u7684\u6784\u9020\u51fd\u6570
    child.prototype.constructor = op.constructor;

    op = null;

    return np;
};


(function () {
    var counter = 0;
    var instances = {};

    /**
     * Fe.JS\u6846\u67b6\u7684\u57fa\u7c7b
     * @namespace
     * @name Fe.BaseClass
     */
    Fe.BaseClass = function (hc) {
        instances[(this.hashCode = (hc || Fe.BaseClass.guid()))] = this;
    };
    Fe.inherit(Fe.BaseClass, Object);

    /** @ignore */
    Fe.BaseClass.guid = function () {
        return "mz_" + (counter++).toString(36);
    };

    /**
     * \u6839\u636e\u53c2\u6570(hashCode)\u7684\u6307\u5b9a\uff0c\u8fd4\u56de\u5bf9\u5e94\u7684\u5b9e\u4f8b\u5bf9\u8c61\u5f15\u7528
     * @param {String} hashCode \u9700\u8981\u83b7\u53d6\u5b9e\u4f8b\u7684hashCode
     * @return {Object/Null} \u5982\u679c\u5b58\u5728\u7684\u8bdd\uff0c\u8fd4\u56de;\u5426\u5219\u8fd4\u56deNull\u3002
     */
    window.Instance = Fe.instance = Fe.I = function (hashCode) {
        return instances[hashCode];
    };

    /**
     * \u91ca\u653e\u5bf9\u8c61\u6240\u6301\u6709\u7684\u8d44\u6e90\u3002
     * \u4e3b\u8981\u662f\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u3002
     * \u597d\u50cf\u6ca1\u6709\u5c06_listeners\u4e2d\u7ed1\u5b9a\u7684\u4e8b\u4ef6\u5254\u9664\u6389..
     */
    Fe.BaseClass.prototype.dispose = function () {
        if (this.hashCode) {
            delete instances[this.hashCode];
        }

        for (var i in this) {
            if (typeof this[i] != "function") {
                delete this[i];
            }
        }

        if (navigator.userAgent.indexOf("MSIE") > 0 && !window.opera) {
            setTimeout(function () {
                CollectGarbage()
            }, 1);
        }
    };

    /**
     * \u8fd4\u56de\u5bf9\u8c61\u7684hashCode\uff0c\u5982\u679c\u6ca1\u6709\u7684\u8bdd\uff0c\u6dfb\u52a0\u4e00\u4e2a\u65b0\u7684hashCode\u5e76\u5c06\u5176\u8fd4\u56de
     * @return {String} \u5bf9\u8c61\u7684hashCode
     */
    Fe.BaseClass.prototype.getHashCode = function () {
        if (!this.hashCode) {
            instances[(this.hashCode = Fe.BaseClass.guid())] = this;
        }
        return this.hashCode;
    };

    /**
     * \u4eceinstances\u6570\u7ec4\u4e2d\u5c06\u5bf9\u8c61\u7684\u5f15\u7528\u5220\u9664\u6389\u3002
     * \u5220\u9664\u4e4b\u540e\u5c31\u65e0\u6cd5\u4f7f\u7528Fe.I()\u51fd\u6570\u83b7\u53d6\u5bf9\u8c61\u4e86\u3002
     */
    Fe.BaseClass.prototype.decontrol = function () {
        delete instances[this.hashCode];
    };

    /**
     * \u91cd\u8f7d\u4e86\u9ed8\u8ba4\u7684toString\u65b9\u6cd5\uff0c\u4f7f\u5f97\u8fd4\u56de\u4fe1\u606f\u66f4\u52a0\u51c6\u786e\u4e00\u4e9b\u3002
     * @return {String} \u5bf9\u8c61\u7684String\u8868\u793a\u5f62\u5f0f
     */
    Fe.BaseClass.prototype.toString = function () {
        return "[object " + (this._className || "Object" ) + "]";
    };

})();

//nclude("Fe");
//nclude("Fe.BaseClass");


/**
 * \u81ea\u5b9a\u4e49\u7684\u4e8b\u4ef6\u5bf9\u8c61
 * @namespace
 * @name Fe.BaseEvent
 */
Fe.BaseEvent = function (type, target) {
    this.type = type;
    this.target = target || null;
};
Fe.inherit(Fe.BaseEvent, Object, "Fe.BaseEvent");

/**
 * \u5f53\u524d\u5904\u7406\u8be5\u4e8b\u4ef6\u7684\u5bf9\u8c61
 * @type {Fe.BaseClass}
 */
Fe.BaseEvent.prototype.currentTarget = null;

/**
 * \u89e6\u53d1\u8be5\u4e8b\u4ef6\u7684\u5bf9\u8c61
 * @type {Fe.BaseClass}
 */
Fe.BaseEvent.prototype.srcElement = null;

/**
 * \u5f53\u4e8b\u4ef6\u53d1\u751f\u4e4b\u540e\u5904\u7406\u7ed3\u679c\u7684\u8fd4\u56de\u503c
 * @type {Boolean}
 */
Fe.BaseEvent.prototype.returnValue = true;

/**
 * \u6269\u5c55Fe.BaseClass\u6765\u6dfb\u52a0\u81ea\u5b9a\u4e49\u4e8b\u4ef6
 * @param {String} type \u81ea\u5b9a\u4e49\u4e8b\u4ef6\u7684\u540d\u79f0
 * @param {Function} handler \u81ea\u5b9a\u4e49\u4e8b\u4ef6\u88ab\u89e6\u53d1\u65f6\u5e94\u8be5\u8c03\u7528\u7684\u56de\u8c03\u51fd\u6570
 */
Fe.BaseClass.prototype.addEventListener = function (type, handler) {
    if (typeof handler != "function") {
        throw new Error(this + " addEventListener: " + handler + " is not a function");
    }

    var listeners = this._listeners;
    if (!listeners) {
        listeners = this._listeners = {};
    }

    var id = handler.hashCode || (handler.hashCode = Fe.BaseClass.guid());
    if (typeof listeners[type] != "object") {
        listeners[type] = {"_size": 0};
    }

    listeners[type][id] = handler;
    listeners[type]["_size"]++;
};

/**
 * \u5220\u9664\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u4e2d\u7ed1\u5b9a\u7684\u4e00\u4e2a\u56de\u8c03\u51fd\u6570\u3002\u5982\u679c\u7b2c\u4e8c\u4e2a\u53c2\u6570handler\u6ca1\u6709\u88ab
 * \u7ed1\u5b9a\u5230\u5bf9\u5e94\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u4e2d\uff0c\u4ec0\u4e48\u4e5f\u4e0d\u505a\u3002
 * @param {String} type \u81ea\u5b9a\u4e49\u4e8b\u4ef6\u7684\u540d\u79f0
 * @param {Function} handler \u9700\u8981\u5220\u9664\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u7684\u51fd\u6570
 */
Fe.BaseClass.prototype.removeEventListener = function (type, handler) {
    var listeners = this._listeners;
    if (!listeners) {
        listeners = this._listeners = {};
    }

    if (!listeners[type]) {
        return;
    }

    var id = handler.hashCode || (handler.hashCode = Fe.BaseClass.guid());
    if (listeners[type][id]) {
        delete listeners[type][id];
        listeners[type]["_size"]--;
    }

    if (listeners[type]["_size"] <= 0) {
        delete listeners[type];
    }
};

/**
 * \u6d3e\u53d1\u81ea\u5b9a\u4e49\u4e8b\u4ef6\uff0c\u4f7f\u5f97\u7ed1\u5b9a\u5230\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u4e0a\u9762\u7684\u51fd\u6570\u90fd\u4f1a\u88ab\u6267\u884c\u3002
 * \u4f46\u662f\u8fd9\u4e9b\u7ed1\u5b9a\u51fd\u6570\u7684\u6267\u884c\u987a\u5e8f\u65e0\u6cd5\u4fdd\u8bc1\u3002
 * \u5904\u7406\u4f1a\u8c03\u7528\u901a\u8fc7addEventListenr\u7ed1\u5b9a\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u56de\u8c03\u51fd\u6570\u4e4b\u5916\uff0c\u8fd8\u4f1a\u8c03\u7528
 * \u76f4\u63a5\u7ed1\u5b9a\u5230\u5bf9\u8c61\u4e0a\u9762\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u3002\u4f8b\u5982\uff1a
 * myobj.onMyEvent = function(){}
 * myobj.addEventListener("onMyEvent", function(){});
 * @param {Fe.BaseEvent} event \u6d3e\u53d1\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u7c7b\u578b
 */
Fe.BaseClass.prototype.dispatchEvent = function (event) {
    var listeners = this._listeners;
    if (!listeners) {
        listeners = this._listeners = {};
    }

    var type = event.type;
    event.target = event.srcElement = event.target || event.srcElement || this;
    event.currentTarget = this;

    if (typeof this[type] == "function") {
        this[type](event);
    }

    if (typeof listeners[type] == "object") {
        for (var id in listeners[type]) {
            if (typeof listeners[type][id] == "function") {
                listeners[type][id].call(null, event);
            }
        }
    }

    return event.returnValue;
};


//nclude("Fe");

//DOM
/**
 * \u6839\u636e\u53c2\u6570\u83b7\u53d6\u5bf9\u5e94\u7684DOM\u8282\u70b9\u3002
 * \u5982\u679c\u6ca1\u6709el\u6216\u8005\u6ca1\u6709document\uff0c\u5219\u4f1a\u8fd4\u56de\u7a7a\u3002
 * Fe.G("id1") => DOM
 * Fe.G("id1", "id2", "id3") => [DOM1, DOM2, DOM3]
 * @param {String/DOM} arguments \u9700\u8981\u67e5\u627e\u7684\u5bf9\u8c61
 * @return {DOM/Null/Array[DOM]} \u53ef\u80fd\u8fd4\u56deDOM\u8282\u70b9\u7684\u5f15\u7528\uff0c\u53ef\u80fd\u8fd4\u56de\u7a7a\uff0c\u53ef\u80fd\u8fd4\u56de\u6570\u7ec4
 */
Fe.G = function () {
    for (var a = [], i = arguments.length - 1; i > -1; i--) {
        var e = arguments[i];
        a[i] = null;
        if (typeof e == "object" && e && e.dom) {
            a[i] = e.dom;
        } else if ((typeof e == "object" && e && e.tagName) || e == window || e == document) {
            a[i] = e;
        } else if (typeof e == "string" && (e = document.getElementById(e))) {
            a[i] = e;
        }
    }
    return a.length < 2 ? a[0] : a;
};


//nclude("Fe");

/**
 * \u5c06source\u4e2d\u7684\u6240\u6709\u5c5e\u6027\u62f7\u8d1d\u5230target\u4e2d\u3002
 * @param {Object} target \u5c5e\u6027\u7684\u63a5\u6536\u8005
 * @param {Object} source \u5c5e\u6027\u7684\u6765\u6e90
 * @return {Object} \u8fd4\u56de\u7684\u5185\u5bb9\u662fo
 */
Fe.extend = function (target, source) {
    if (target && source && typeof(source) == "object") {
        for (var p in source) {
            target[p] = source[p];
        }

        // For IE the for-in-loop does not contain any properties that are not
        // enumerable on the prototype targetect (for example isPrototypeOf from
        // Object.prototype) and it will also not include 'replace' on targetects that
        // extend String and change 'replace' (not that it is common for anyone to
        // extend anything except Object).

        var prototype_fields = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf'
        ];

        for (var j = 0, key; j < prototype_fields.length; j++) {
            key = prototype_fields[j];
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};


/**
 * \u5982\u679cFe.isIE\u5927\u4e8e\u96f6\uff0c\u5219\u662fIE\u5185\u6838\u6d4f\u89c8\u5668\uff0c\u5e76\u4e14Fe.isIE\u662f\u6d4f\u89c8\u5668\u7684\u7248\u672c\u53f7
 * @type {Number}
 */
Fe.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1 : 0;


//String
/**
 * \u5220\u9664\u5b57\u7b26\u4e32\u4e24\u7aef\u7684\u7a7a\u767d\u5b57\u7b26
 * \u7b97\u6cd5\u53c2\u7167dojo\u4e2dstring.js\uff0c\u6b63\u5219\u8868\u8fbe\u5f0f\u7684\u6269\u5145\u53c2\u7167jsframework\u4e2d\u7684Global.js\u6765\u5b9e\u73b0\u7684
 * \u5173\u4e8e\u591a\u4e2a\u7248\u672ctrim\u5b9e\u73b0\u7684\u6bd4\u8f83\uff0c \u53ef\u4ee5\u53c2\u7167
 * [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript).
 * http://lucaguidi.com/2008/5/28/faster-javascript-trim
 * @param {String} str \u9700\u8981\u5904\u7406\u7684\u5b57\u7b26\u4e32
 * @return {String} \u5904\u7406\u4e4b\u540e\u7684\u5b57\u7b26\u4e32
 */
Fe.trim = function (str) {
    // this is a single line commnet
    /* this
     *
     * is a
     * multi lines commnet
     */
    // /{/.test('x');
    // var a = 10 / 5;
    // var b = a / 2;
    // a /= 2;

    return str.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
};


/**
 * \u5220\u9664HTML\u5143\u7d20\u6307\u5b9a\u7684className
 * @param {String/DOMNode} element \u6307\u5b9a\u8981\u67e5\u627e\u7684DOM\u8282\u70b9\u7684ID\u6216\u8005DOM\u8282\u70b9\u7684\u5f15\u7528
 * @param {String} className \u8981\u5220\u9664\u7684\u6837\u5f0f\u540d\u79f0
 */
Fe.removeClassName = function (element, className) {
    if (!(element = Fe.G(element))) {
        return;
    }
    var t = Fe.trim,
        r = new RegExp("(^|\\s{1,})" + t(className) + "(\\s{1,}|$)", "g");
    element.className = t(element.className.replace(r, "$2"));
};
Fe.rc = Fe.removeClassName;


//nclude("Fe");
//nclude("Fe.G");
//nclude("Fe.trim");

/**
 * \u7ed9\u4e00\u4e2aHTML\u5143\u7d20\u6dfb\u52a0\u6307\u5b9a\u7684className
 * @param {String/DOMNode} element \u6307\u5b9a\u8981\u67e5\u627e\u7684DOM\u8282\u70b9\u7684ID\u6216\u8005DOM\u8282\u70b9\u7684\u5f15\u7528
 * @param {String} className \u9700\u8981\u6dfb\u52a0\u7684\u6837\u5f0f
 */
Fe.addClassName = function (element, className) {
    if (!(element = Fe.G(element))) {
        return;
    }
    var a = element.className.split(" "),
        t = Fe.trim;
    if (!new RegExp("(^|\\s{1,})" + t(className) + "(\\s{1,}|$)").test(element.className)) {
        element.className = t(a.concat(className).join(" "));
    }
};
Fe.ac = Fe.addClassName;


//nclude("Fe");

/**
 * \u683c\u5f0f\u5316\u4e00\u4e2a\u5b57\u7b26\u4e32.\u5b57\u7b26\u4e32\u4e2d\u9700\u8981\u66ff\u6362\u90e8\u5206\u7684\u683c\u5f0f\u662f#{prop_name}.
 * \u6700\u540e\u4f1a\u88abo[prop_name]\u7684\u503c\u66ff\u6362\u3002\u5982\u679co[prop_name]\u4e3a\u7a7a\u7684\u8bdd\uff0c\u5b9e\u9645\u88ab\u66ff\u6362\u7684\u5185\u5bb9\u4e3a\u7a7a
 * \u5982\u679co[prop_name]\u662f\u4e00\u4e2a\u51fd\u6570\u7684\u8bdd\uff0c\u5c31\u4f1a\u628aprop_name\u505a\u4e3a\u53c2\u6570\u4f20\u9012\u8fc7\u53bb\uff0c\u5e76\u7528\u8fd4\u56de\u503c\u66ff\u6362#{prop_name}\u6240\u5728\u7684\u4f4d\u7f6e
 * \u5982\u679co[prop_name]\u4e0d\u662f\u51fd\u6570\u7684\u8bdd\uff0c\u5c31\u4f1a\u7528o[prop_name]\u7684\u503c\u66ff\u6362#{prop_name}\u6240\u5728\u7684\u4f4d\u7f6e.
 * \u4f8b\u5982:
 * console.log(Fe.format("welcome #{name}", { name:"leeight"}));
 *    => welcome leeight
 * console.log(Fe.format("welcome #{name}", {
 * 	name : function(key){ return "leeight" }
 * }));
 *    => welcome leeight
 * \u540c\u65f6\u517c\u5bb9jsframework.js\u4e2d\u7684format\u65b9\u6cd5
 * console.log(Fe.format("welcome #{0}", "leeight"));
 *  => welcome leeight
 * @param {String} str \u9700\u8981\u683c\u5f0f\u5316\u7684\u5b57\u7b26\u4e32
 * @param {Object} json \u9700\u8981\u63d0\u4f9b\u76f8\u5e94\u6570\u636e\u7684\u5bf9\u8c61
 * @return {String} \u683c\u5f0f\u5316\u4e4b\u540e\u7684\u5b57\u7b26\u4e32
 */
Fe.format = function (str, json) {
    if (arguments.length > 1) {
        var m = Fe.format,
            k = /([.*+?^=!:${}()|[\]\/\\])/g,
            l = (m.left_delimiter || "{").replace(k, "\\$1"),
            r = (m.right_delimiter || "}").replace(k, "\\$1");
        var r1 = m._r1 || (m._r1 = new RegExp("#" + l + "([^" + l + r + "]+)" + r, "g")),
            r2 = m._r2 || (m._r2 = new RegExp("#" + l + "(\\d+)" + r, "g"));
        if (typeof(json) == "object") {
            return str.replace(r1, function (a, key) {
                var v = json[key];
                if (typeof v == 'function') {
                    v = v(key);
                }
                return typeof(v) == 'undefined' ? "" : v;
            });
        } else if (typeof(json) != "undefined") {
            // [$1,$$,$_,$1,$2,$3,$4,$5,$6,$7,$8,$9,$`,$&,$+,$']
            // fix this bug by dongjie 20081006
            // THANKS:liangdongjie@baidu.com
            // \u611f\u8c22dongjie\u53d1\u73b0\u4e86\u8fd9\u4e2a\u95ee\u9898\u5e76\u7ed9\u51fa\u4e86\u89e3\u51b3\u7684\u65b9\u6848
            var vs = Array.prototype.slice.call(arguments, 1);
            var vl = vs.length;
            return str.replace(r2, function (a, index) {
                index = parseInt(index, 10);
                return (index >= vl) ? a : vs[index];
            });
        }
    }
    return str;
};

/**
 * \u8bbe\u7f6eFe.format\u51fd\u6570\u6240\u7528\u7684\u5206\u5272\u7b26\u53f7\uff0c\u9ed8\u8ba4\u662f{, }
 * \u56e0\u4e3aFe.format\u4e2d\u6240\u4f7f\u7528\u7684\u6b63\u5219\u662f#{..}\uff0c\u5982\u679c\u4e0d\u60f3\u7528{}\uff0c\u90a3\u4e48
 * \u53ef\u4ee5\u901a\u8fc7\u8fd9\u4e2a\u51fd\u6570\u6765\u8bbe\u7f6e\u3002\u73b0\u5728\u4e3b\u8981\u4f9bbaike\u4f7f\u7528\u3002
 * @param {String} [left] \u5de6\u4fa7\u7684\u5206\u5272\u7b26\u53f7\uff0c\u957f\u5ea6\u662f1
 * @param {String} [right] \u53f3\u4fa7\u7684\u5206\u5272\u7b26\u53f7\uff0c\u957f\u5ea6\u662f1\u3002\u5982\u679c\u6ca1\u6709\u8fd9\u4e2a\u53c2\u6570\u7684\u8bdd\uff0c\u9ed8\u8ba4\u503c\u662fleft\uff0c\u5982\u679cleft\u6ca1\u6709\u7684\u8bdd\uff0c\u9ed8\u8ba4\u503c\u662f}
 * */
Fe.format.delimiter = function (left, right) {
    var me = Fe.format;
    me.left_delimiter = left || "{";
    me.right_delimiter = right || left || "}";
    me._r1 = me._r2 = null;
};


//nclude("Fe");

/**
 * \u83b7\u53d6\u5f53\u524d\u6587\u6863\u7684scroll[Top|Left], documnet[Width|Height], view[Width|Height]\u8fd9\u4e9b\u5c5e\u6027
 * \u53c2\u7167jsframework\u4e2d\u7684Global.js\u6765\u5b9e\u73b0
 * @return {Object} \u8fd4\u56de\u4e00\u4e2a\u5bf9\u8c61body\uff0c\u53ef\u4ee5\u4ecebody\u7684\u5c5e\u6027\u4e2d\u83b7\u53d6\u60f3\u8981\u7684\u5185\u5bb9\u3002\u6bd4\u5982obj.scrollHeight\u7b49\u7b49
 */
Fe.body = function () {
    var W = 0, H = 0, SL = 0, ST = 0, SW = 0, SH = 0;
    var w = window, d = document, dd = d.documentElement;

    W = dd.clientWidth || d.body.clientWidth;
    H = w.innerHeight || dd.clientHeight || d.body.clientHeight;

    ST = d.body.scrollTop || dd.scrollTop;
    SL = d.body.scrollLeft || dd.scrollLeft;

    SW = Math.max(d.body.scrollWidth, dd.scrollWidth || 0);
    SH = Math.max(d.body.scrollHeight, dd.scrollHeight || 0, H);

    return {
        "scrollTop": ST,
        "scrollLeft": SL,
        "documentWidth": SW,
        "documentHeight": SH,
        "viewWidth": W,
        "viewHeight": H
    };
};


//nclude("Fe");

//Array
/**
 * \u5bf9\u4e8e\u6570\u7ec4\u7c7b\u578b\u6216\u8005\u5bf9\u8c61\u7c7b\u578b\u90fd\u63d0\u4f9b\u4e86each\u65b9\u6cd5\u3002
 * @param {Object/Array} obj \u6570\u7ec4\u6216\u8005\u5bf9\u8c61
 * @param {Function} fun \u5bf9\u6bcf\u4e2a\u5143\u7d20\u9700\u8981\u8c03\u7528\u7684\u65b9\u6cd5
 * @return {Object/Array} \u8fd4\u56de\u6700\u5f00\u59cb\u4f20\u5165obj\uff0c\u91cc\u9762\u7684\u5185\u5bb9\u53ef\u80fd\u5df2\u7ecf\u53d1\u751f\u4e86\u6539\u53d8
 */
Fe.each = function (obj, fun) {
    if (typeof fun != 'function') {
        return obj;
    }

    if (obj) {
        if (obj.length === undefined) {
            for (var name in obj) {
                fun.call(obj[name], obj[name], name);
            }
        } else {
            for (var i = 0, length = obj.length; i < length; i++) {
                fun.call(obj[i], obj[i], i);
            }
        }
    }

    return obj;
};


/**
 * \u663e\u793a\u4e00\u4e2a\u6216\u8005DOM\u5143\u7d20
 * \u5b58\u5728\u7684\u95ee\u9898\u662f\uff1a\u5982\u679c\u5728CSS\u4e2d\u5b9a\u4e49\u7684\u6837\u5f0f\u662fdisplay:none
 * \u8c03\u7528\u8fd9\u4e2a\u65b9\u6cd5\u4e0d\u751f\u6548,\u4e0d\u80fd\u5c06DOM\u5143\u7d20\u8bbe\u7f6e\u4e3a\u53ef\u89c1\u6837\u5f0f(FIXME)
 * @param {DOM/String} arguments \u9700\u8981\u9690\u85cf\u7684DOM\u5143\u7d20\u6216\u8005\u5176ID
 */
Fe.show = function () {
    Fe.each(arguments, function (obj) {
        if (obj = Fe.G(obj)) {
            obj.style.display = "";
        }
    });
};


//nclude("Fe");
//nclude("Fe.G");
//nclude("Fe.each");

/**
 * \u9690\u85cf\u4e00\u4e2a\u6216\u591a\u4e2aDOM\u5143\u7d20
 * @param {DOM/String} arguments \u9700\u8981\u9690\u85cf\u7684DOM\u5143\u7d20\u6216\u8005\u5176ID
 */
Fe.hide = function () {
    Fe.each(arguments, function (obj) {
        if (obj = Fe.G(obj)) {
            obj.style.display = "none";
        }
    });
};


/**
 * TODO \u5982\u679chandler\u662f\u4e00\u4e2a\u533f\u540d\u51fd\u6570\uff0c\u5982\u679cun\u5462?
 * \u7ed9\u5143\u7d20el\u7ed1\u5b9a\u4e8b\u4ef6(evt)\u7684\u5904\u7406\u51fd\u6570handler\u3002
 * \u7528\u6cd5\uff1a
 * Fe.on("button", "click", function(){ alert(123); });
 * \u5f15\u5165\u4e86Fe.event.js\u4e4b\u540e,\u63a5\u53e3\u662f\u4e0d\u53d8\u7684,\u4f46\u662f\u63d0\u4f9b\u7684\u529f\u80fd\u66f4\u5f3a,\u53ef\u4ee5\u6709\u6548\u7684<br />
 * \u4fdd\u8bc1\u5185\u5b58\u6cc4\u6f0f\u7684\u95ee\u9898.
 * @param {DOM/String} el DOM\u5143\u7d20\u6216\u8005\u5176ID
 * @param {String} type \u65b9\u6cd5\u7684\u540d\u79f0
 * @param {Function} handler \u4e8b\u4ef6\u7684\u5904\u7406\u51fd\u6570
 * @return {DOM} \u7ed1\u5b9a\u4e8b\u4ef6\u7684\u8282\u70b9
 */
Fe.on = function (el, type, handler) {
    if (!(el = Fe.G(el))) {
        return el;
    }

    type = type.replace(/^on/, "").toLowerCase();

    if (el.attachEvent) {
        // THANKS:linpanhui@baidu.com
        // \u4fee\u6539\u4e86IE\u4e0b\u9762\u7ed1\u5b9a\u4e8b\u4ef6\u7684\u5904\u7406\u60c5\u51b5\u5728\u4e8b\u4ef6\u5904\u7406\u51fd\u6570\u4e2d\u4e5f\u53ef\u4ee5\u4f7f\u7528this\u6765\u4ee3\u8868\u5f53\u524d\u7684\u8282\u70b9\u4e86
        el[type + handler] = function () {
            handler.call(el, window.event);
        };
        el.attachEvent('on' + type, el[type + handler]);
    } else {
        el.addEventListener(type, handler, false);
    }

    return el;
};


/** @ignore */
if (typeof(HTMLElement) != "undefined" && !window.opera) {
    /** @ignore */
    HTMLElement.prototype.insertAdjacentHTML = function (where, html) {
        var e = this.ownerDocument.createRange();
        e.setStartBefore(this);
        e = e.createContextualFragment(html);
        switch (where) {
            case 'beforeBegin':
                this.parentNode.insertBefore(e, this);
                break;
            case 'afterBegin':
                this.insertBefore(e, this.firstChild);
                break;
            case 'beforeEnd':
                this.appendChild(e);
                break;
            case 'afterEnd':
                if (!this.nextSibling) {
                    this.parentNode.appendChild(e);
                } else {
                    this.parentNode.insertBefore(e, this.nextSibling);
                }
                break;
        }
    };
}


/**
 * @fileoverview Fe.Dom
 * @author leeight
 */


//nclude("Fe");

/**
 * \u63d0\u4f9b\u4e00\u4e9b\u5bf9DOM\u8282\u70b9\u8fdb\u884c\u64cd\u4f5c\u7684\u9759\u6001\u51fd\u6570
 * @namespace
 * @name Fe.Dom
 */
Fe.Dom = {};


/**
 * \u52a0\u8f7d\u4e00\u4e2aCSS\u6587\u4ef6
 * @param {String} cssPath css\u6587\u4ef6\u7684\u8def\u5f84
 * @param {String} [uniqueId] \u751f\u6210\u7684<LINK>\u6807\u7b7e\u7684ID
 */
Fe.Dom.loadCssFile = function (cssPath, uniqueId) {
    if (/\w+\.\w+(\?|$)/.test(cssPath)) {
        if (!(typeof(uniqueId) == "string" && uniqueId !== "")) {
            uniqueId = "BdCss_" + cssPath.replace(/\W/g, "");
        }

        var link = document.createElement("LINK");
        link.href = cssPath;
        link.id = uniqueId;
        link.type = "text/css";
        link.rel = "Stylesheet";

        var head = document.getElementsByTagName("HEAD")[0];
        // In opera documents are not guaranteed to have a head element, thus we
        // have to make sure one exists before using it.
        if (!head) {
            var body = document.getElementsByTagName('body')[0];
            head = document.createElement('head');
            body.parentNode.insertBefore(head, body);
        }

        head.insertBefore(link, head.firstChild);
    }
};


/**
 * Fe.DialogFactory \u5bf9\u8bdd\u6846\u7684\u5de5\u5382\u7c7b\uff0c\u7528\u6765\u521b\u5efa\u5bf9\u8bdd\u6846\u7684\u5b9e\u4f8b
 * @constructor
 * @class
 * @name Fe.DialogFactory
 */
Fe.DialogFactory = function () {
    Fe.BaseClass.call(this);
    /**
     * \u5f53\u524d\u5bf9\u8bdd\u6846\u662f\u5426\u662f\u6fc0\u6d3b\u72b6\u6001
     * @type Boolean
     */
    this.active = false;
    /**
     * \u5f53\u524d\u5bf9\u8bdd\u6846\u662f\u5426\u53ef\u4ee5\u7f29\u653e\u5927\u5c0f(\u6682\u4e0d\u652f\u6301)
     * @type Boolean
     */
    this.resizable = false;
    Fe.DialogFactory.dialogs.push(this);
}
Fe.inherit(Fe.DialogFactory, Fe.BaseClass, "Fe.DialogFactory");

/**
 * Fe.DialogFactory\u7684setActive\u65b9\u6cd5\uff0c\u5c06\u5f53\u524d\u7684\u5bf9\u8bdd\u6846\u8bbe\u7f6e\u4e3a\u6fc0\u6d3b\u72b6\u6001\u3002
 * \u5982\u679c\u5b58\u5728\u5176\u5b83\u6fc0\u6d3b\u72b6\u6001\u7684\u5bf9\u8bdd\u6846\uff0c\u4f1a\u5c06\u5176\u8bbe\u7f6e\u4e3a
 * (\u6682\u65f6\u6ca1\u6709\u652f\u6301)
 */
Fe.DialogFactory.prototype.setActive = function () {
    var w = Fe.DialogFactory.currentDialog;
    if (w == this)
        return;
    if (w) {
        var s = Fe.G("FeDialog_" + w.hashCode).style;
        s.zIndex = parseInt(s.zIndex) - 4000;
        Fe.rc("FeDialog_" + w.hashCode, "focused_");
    }
    Fe.ac("FeDialog_" + this.hashCode, "focused_");
    Fe.DialogFactory.currentDialog = this;

    var s = Fe.G("FeDialog_" + this.hashCode).style;
    s.zIndex = parseInt(s.zIndex) + 4000;
};

/**
 * Fe.DialogFactory \u5bf9\u8bdd\u6846\u7684\u6570\u7ec4
 * @type Array
 */
Fe.DialogFactory.dialogs = [];

/**
 * Fe.DialogFactory \u5bf9\u8bdd\u6846\u7684\u6570\u7ec4
 * @type Fe.Dialog
 */
Fe.DialogFactory.currentDialog = null;
Fe.DialogFactory.cssFilePath = Fe.path + "/css/FeDialog.css";
/**
 * Fe.DialogFactory\u7684png\u65b9\u6cd5\uff0c\u7528\u6765\u5224\u65ad\u751f\u6210\u7684\u5bf9\u8bdd\u6846\u662f\u5426\u4f7f\u7528png\u7684\u6548\u679c\u3002
 * \u5982\u679c\u5b58\u5728\u5176\u5b83\u6fc0\u6d3b\u72b6\u6001\u7684\u5bf9\u8bdd\u6846\uff0c\u4f1a\u5c06\u5176\u8bbe\u7f6e\u4e3a
 */
Fe.DialogFactory.png = function () {
    return (Fe.isIE >= 7 || Fe.isIE <= 0);
}

/**
 * Fe.DialogFactory\u7684create\u65b9\u6cd5\uff0c\u5c06\u5f53\u524d\u7684\u5bf9\u8bdd\u6846\u8bbe\u7f6e\u4e3a\u6fc0\u6d3b\u72b6\u6001\u3002
 * \u5982\u679c\u5b58\u5728\u5176\u5b83\u6fc0\u6d3b\u72b6\u6001\u7684\u5bf9\u8bdd\u6846\uff0c\u4f1a\u5c06\u5176\u8bbe\u7f6e\u4e3a
 */
Fe.DialogFactory.prototype.create = function () {
    Fe.Dom.loadCssFile(Fe.DialogFactory.cssFilePath, "CSS_Fe.Dialog");
    var s = ['<div ',
        'id="FeDialog_#{0}" ',
        'class="FeDialog" ',
        'style="position:absolute;z-index:', (52000 + Fe.DialogFactory.dialogs.length), ';display:none" ',
        'onclick="Fe.I(\'#{0}\').click(event)">',
        '<div class="FeDialog_inner', (Fe.DialogFactory.png() ? " png_" : ""), '">',
        '<table class="FeDialog_wrapper" border="0" cellpadding="0" cellspacing="0">',
        '<tr class="top_">',
        '<td class="left_ corner_">&nbsp;</td>',
        '<td class="center_ vertical_">&nbsp;</td>',
        '<td class="right_ corner_">&nbsp;</td>',
        '</tr>',
        '<tr class="middle_">',
        '<td class="left_ horizontal_">&nbsp;</td>',
        '<td class="center_ midland_">',
        '<div class="FeDialog_container">',
        // caption bar
        '<div id="FeDialogCaption_#{0}" class="FeDialogCaption" onselectstart="return false">',
        '<div id="FeDialogControlBar_#{0}" class="FeDialogControlBar">',
        '<a id="FeDialogButtonClose_#{0}" class="close_" href="#" onfocus="this.blur();" onclick="Fe.I(\'#{0}\').onclose(); return false;">',
        '<img alt="close" src="', Fe.path, '/img/blank.gif" />',
        '</a>',
        '</div>',
        '<div id="FeDialogCaptionText_#{0}" onmousedown="Fe.I(\'#{0}\').setActive()" class="FeDialogCaptionText">FeDialog</div>',
        '</div>',
        // content
        '<div id="FeDialogContent_#{0}" class="FeDialogContent">&nbsp;</div>',
        // button bar
        '<div id="FeDialogButtonBar_#{0}" class="FeDialogButtonBar">',
        '<input id="FeDialogButtonAccept_#{0}" type="button" value="\u786e \u5b9a" onclick="Fe.I(\'#{0}\').onaccept()" class="accept_" />',
        '<input id="FeDialogButtonCancel_#{0}" type="button" value="\u53d6 \u6d88" onclick="Fe.I(\'#{0}\').oncancel()" class="cancel_" />',
        '</div>',
        // status bar
        '<div id="FeDialogStatusBar_#{0}" class="FeDialogStatusBar" style="display:none">&nbsp;</div>',
        '</div>',	// end FeDialog_container
        '</td>',	// end td.center_
        '<td class="right_ horizontal_">&nbsp;</td>',
        '</tr>',	// end tr.middle_
        '<tr class="bottom_">',
        '<td class="left_ corner_">&nbsp;</td>',
        '<td class="center_ vertical_">&nbsp;</td>',
        '<td class="right_ corner_">&nbsp;</td>',
        '</tr>',	// end tr.bottom_
        '</table>',		// end table.FeDialog_wrapper
        '</div>',	// end div.FeDialog_inner
        '</div>'];	// end div.FeDialog

    s = Fe.format(s.join(""), this.hashCode);

    if (document.body)
        document.body.insertAdjacentHTML("afterBegin", s);
    else
        document.write(s);
};
new Fe.DialogFactory().create();


/**
 * Fe.DialogFactory\u7684show\u65b9\u6cd5\u3002\u771f\u6b63\u663e\u793a\u4e00\u4e2a\u5bf9\u8bdd\u6846\uff0c\u6e32\u67d3\u5185\u5bb9\uff0c\u5b9a\u4f4d\u4f4d\u7f6e\u3002
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u4e00\u4e9b\u914d\u7f6e\u4fe1\u606f
 * @config {String} [contentType] \u5bf9\u8bdd\u6846\u7684\u7c7b\u578b
 * @config {String} [title] \u5bf9\u8bdd\u6846\u7684\u6807\u9898
 * @config {Number} [width] \u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 * @config {String} [overflow] \u5bf9\u8bdd\u6846\u5185\u5bb9\u6ea2\u51fa\u65f6\u5019\u7684\u5904\u7406\u65b9\u5f0f(visible,hidden,auto...)
 * @config {Number} [height] \u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6
 * @config {Boolean} [resizable] \u5bf9\u8bdd\u6846\u662f\u5426\u53ef\u4ee5\u7f29\u653e\u5927\u5c0f(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [help] \u5bf9\u8bdd\u6846\u662f\u5426\u663e\u793a\u5e2e\u52a9\u6807\u8bc6(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [locked] \u5bf9\u8bdd\u6846\u663e\u793a\u7684\u65f6\u5019\u662f\u5426\u9501\u4f4f\u5c4f\u5e55
 * @config {String} [icon] \u5bf9\u8bdd\u6846\u7684\u56fe\u6807\uff0c\u662f\u4e00\u4e2aurl\u5730\u5740
 * @config {Boolean} [titlebar] \u662f\u5426\u663e\u793a\u6807\u9898\u680f
 * @config {Boolean} [statusbar] \u662f\u5426\u663e\u793a\u72b6\u6001\u680f
 * @config {Boolean} [controlbar] \u662f\u5426\u663e\u793a\u63a7\u5236\u680f
 * @config {Boolean} [buttonbar] \u662f\u5426\u663e\u793a\u6309\u94ae\u64cd\u4f5c\u680f
 * @config {Boolean} [buttonClose] \u662f\u5426\u663e\u793a\u5173\u95ed\u6309\u94ae
 * @config {Boolean} [buttonAccept] \u662f\u5426\u663e\u793a\u786e\u5b9a\u6309\u94ae
 * @config {Boolean} [buttonCancel] \u662f\u5426\u663e\u793a\u53d6\u6d88\u6309\u94ae
 * @config {String} [buttonbarAlign] \u6309\u94ae\u7684\u5bf9\u9f50\u65b9\u5f0f(left, center, right)
 * @config {String} [buttonAcceptValue] \u786e\u5b9a\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 * @config {String} [buttonCancelValue] \u53d6\u6d88\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 */
Fe.DialogFactory.prototype.show = function (op) {
    var me = this;

    function _(id) {
        return Fe.G(id + "_" + me.hashCode)
    }

    // set property
    if (op.icon) {
        _("FeDialogCaption").style.background = "url(" + op.icon + ") no-repeat left 3px";
        _("FeDialogCaptionText").style.paddingLeft = "18px";
    }
    // *
    _("FeDialog").style.font = op.font;
    //_("FeDialog").style.fontSize = "12px";
    _("FeDialogCaptionText").innerHTML = op.title;
    _("FeDialogCaption").style.display = op.titlebar ? "" : "none";
    _("FeDialogStatusBar").style.display = op.statusbar ? "" : "none";
    _("FeDialogControlBar").style.display = op.controlbar ? "" : "none";
    _("FeDialogButtonBar").style.display = op.buttonbar ? "" : "none";
    _("FeDialogButtonClose").style.display = op.buttonClose ? "" : "none";
    _("FeDialogButtonAccept").style.display = op.buttonAccept ? "" : "none";
    _("FeDialogButtonCancel").style.display = op.buttonCancel ? "" : "none";
    _("FeDialogButtonBar").style.textAlign = op.buttonbarAlign;
    _("FeDialogButtonAccept").value = op.buttonAcceptValue;
    _("FeDialogButtonCancel").value = op.buttonCancelValue;
    with (_("FeDialogContent").style) {
        width = op.width;
        height = op.height;
        overflow = op.overflow;
    }
    // */
    if (op.contentType.toLowerCase() == "htmlelement" && !Fe.G(op.content))
        op.contentType = "HTMLString";
    switch (op.contentType.toLowerCase()) {
        case "htmlstring" :
            _("FeDialogContent").innerHTML = op.content;
            break;
        case "htmlelement" :
            var e = Fe.G(op.content);
            this.opContentDisplay = e.style.display;
            e.insertAdjacentHTML("beforeBegin", "<input type='button' id='FeDialogFactoryInset_" + this.hashCode + "' style='width:" + e.offsetWidth + "px; height:" + e.offsetHeight + "px; padding:0; margin:0; border:none; visibility:hidden' />");
            _("FeDialogContent").innerHTML = "";
            e.style.display = "";
            _("FeDialogContent").appendChild(e);
            break;
        default :
            _("FeDialogContent").innerHTML = "<iframe frameborder='0' allowTransparency='true' scrolling='"
                + op.scrolling
                + "' id='FeDialogIframe_"
                + this.hashCode
                + "' name='FeDialog_"
                + this.hashCode
                + "' style='width:"
                + (op.width || "100%")
                + "; height:"
                + (op.height || "100%")
                + "' src='"
                + op.content
                + "'></iframe>";
            break;
    }

    // position 20070613
    var a = Fe.trim(op.position).toLowerCase().split(/\s/);
    var body = Fe.body();
    Fe.show("FeDialog_" + this.hashCode);
    if (Fe.isIE && _("FeDialogContent").offsetWidth < 136)
        _("FeDialogContent").style.width = "130px";
    if (Fe.isIE && _("FeDialogContent").offsetHeight < 50)
        _("FeDialogContent").style.height = "50px";
    var top = (Math.max(
            parseInt((body.viewHeight - _("FeDialog").offsetHeight) / 2), 0) + body.scrollTop)
        + "px";
    var left = (Math.max(
            parseInt((body.viewWidth - _("FeDialog").offsetWidth) / 2), 0) + body.scrollLeft)
        + "px";
    if (a.length == 1) {
        if (a[0] == "" || a[0] == "center") {
        } else if (a[0] == "top")
            top = body.scrollTop + "px";
        else if (a[0] == "bottom")
            top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight)
                + "px";
        else if (a[0] == "left")
            left = body.scrollLeft + "px";
        else if (a[0] == "right")
            left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth)
                + "px";
        else if (/\d+%/.test(a[0]))
            top = a[0];
        else if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[0]))
            top = parseInt(RegExp.$1) + RegExp.$2 || "px";
    } else if (a.length > 1) {
        if (/\d+%/.test(a[0]))
            top = a[0];
        else if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[0]))
            top = parseInt(RegExp.$1) + RegExp.$2 || "px";

        if (/\d+%/.test(a[1]))
            left = a[1];
        else if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[1]))
            left = parseInt(RegExp.$1) + RegExp.$2 || "px";

        if (a[0] == "top" || a[1] == "top")
            top = body.scrollTop + "px";
        if (a[0] == "bottom" || a[1] == "bottom")
            top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight)
                + "px";
        if (a[0] == "left" || a[1] == "left")
            left = body.scrollLeft + "px";
        if (a[0] == "right" || a[1] == "right")
            left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth)
                + "px";
    }
    _("FeDialog").style.top = top;
    _("FeDialog").style.left = left;

    this.active = true;
};

/**
 * Fe.DialogFactory\u7684hide\u65b9\u6cd5\uff0c\u9690\u85cf\u4e00\u4e2a\u5bf9\u8bdd\u6846
 */
Fe.DialogFactory.prototype.hide = function (callback) {
    Fe.hide("FeDialog_" + this.hashCode);
    var me = this;
    if (Fe.G("FeDialogFactoryInset_" + me.hashCode)) {
        var e = Fe.G("FeDialogFactoryInset_" + me.hashCode);
        var t = Fe.G("FeDialogContent_" + me.hashCode).childNodes[0];
        e.parentNode.insertBefore(t, e);
        e.parentNode.removeChild(e);
        t.style.display = me.opContentDisplay;
    }
    if ("function" == typeof(callback))
        callback(me);
    setTimeout(function () {
        me.active = false;
        me.setContent("&nbsp;");
        var e = Fe.G("FeDialogContent_" + me.hashCode);
        if (e) {
            e.style.width = e.style.height = e.style.overflow = "";
        }
    }, 50);
    clearTimeout(this.timer);
};

/**
 * Fe.DialogFactory\u7684dispose\u65b9\u6cd5\u3002\u91ca\u653e\u5bf9\u8bdd\u6846\u6240\u7528\u7684\u8d44\u6e90\u3002
 */
Fe.DialogFactory.prototype.dispose = function () {
    Fe.DialogFactory.dialogs = Fe.DialogFactory.dialogs.remove(this);
    Fe.BaseClass.prototype.dispose.call(this);
};

/**
 * Fe.DialogFactory\u7684setWidth\u65b9\u6cd5\u3002\u8bbe\u7f6e\u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6\u3002
 * @param {Number} w \u9700\u8981\u8bbe\u7f6e\u7684\u5bbd\u5ea6\u503c
 */
Fe.DialogFactory.prototype.setWidth = function (w) {
    var e;
    if (e = Fe.G("FeDialogContent_" + this.hashCode)) {
        e.style.width = w;
    }
};

/**
 * Fe.DialogFactory\u7684setHeight\u65b9\u6cd5\u3002\u8bbe\u7f6e\u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6\u3002
 * @param {Number} h \u9700\u8981\u8bbe\u7f6e\u7684\u9ad8\u5ea6\u503c
 */
Fe.DialogFactory.prototype.setHeight = function (h) {
    var e;
    if (e = Fe.G("FeDialogContent_" + this.hashCode)) {
        e.style.height = h;
    }
};

/**
 * Fe.DialogFactory\u7684setCaption\u65b9\u6cd5\u3002\u8bbe\u7f6e\u5bf9\u8bdd\u6846\u7684\u6807\u9898\u3002
 * @param {String} s \u9700\u8981\u8bbe\u7f6e\u7684\u6807\u9898\u7684\u5185\u5bb9
 */
Fe.DialogFactory.prototype.setCaption = function (s) {
    Fe.G("FeDialogCaptionText_" + this.hashCode).value = s;
}

/**
 * Fe.DialogFactory\u7684setContent\u65b9\u6cd5\u3002\u8bbe\u7f6e\u5bf9\u8bdd\u6846\u7684\u5185\u5bb9\u3002
 * @param {String} s \u9700\u8981\u8bbe\u7f6e\u7684\u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 */
Fe.DialogFactory.prototype.setContent = function (s) {
    Fe.G("FeDialogContent_" + this.hashCode).innerHTML = s;
}

/**
 * Fe.DialogFactory\u7684setStatus\u65b9\u6cd5\u3002\u8bbe\u7f6e\u5bf9\u8bdd\u6846\u7684\u72b6\u6001\u680f\u4fe1\u606f\u3002
 * @param {String} s \u9700\u8981\u8bbe\u7f6e\u7684\u72b6\u6001\u680f\u4fe1\u606f\u7684\u5185\u5bb9
 */
Fe.DialogFactory.prototype.setStatus = function (s) {
    Fe.G("FeDialogStatusText_" + this.hashCode).innerHTML = s;
}

/**
 * @ignore
 */
Fe.DialogFactory.prototype.click = function (e) {
    (window.event || e).cancelBubble = true;
    this.setActive();
};

/**
 * Fe.DialogFactory\u7684resizeBy\u65b9\u6cd5\u3002\u8c03\u6574\u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6\u548c\u5bbd\u5ea6\u3002
 */
Fe.DialogFactory.prototype.resizeBy = function () {
    var me = this,
        layer = "FeDialogLayer_" + this.hashCode;
    Fe.G("FeDialogBgLayer_" + this.hashCode).style.width = Fe.G(layer).offsetWidth + "px";
    Fe.G("FeDialogBgLayer_" + this.hashCode).style.height = Fe.G(layer).offsetHeight + "px";
    if (Fe.isIE && Fe.G("FeDialogBgLayer_" + this.hashCode)) {
        if (Fe.isIE < 5.5) {
            Fe.G("FeDialogLayer_" + this.hashCode).style.width = "130px";
            Fe.G("FeDialog_" + this.hashCode).style.width = Fe.G("FeDialogLayer_" + this.hashCode).offsetWidth + "px";
        }
        var table = Fe.G("FeDialogBgLayer_" + this.hashCode);
        if (table.rows[0].cells[0].currentStyle) {
            var h1 = parseInt(table.rows[0].cells[0].currentStyle.height);
            var h2 = parseInt(table.rows[2].cells[0].currentStyle.height);
            if (!isNaN(h1) && !isNaN(h2)) {
                table.rows[1].cells[1].style.height = (Math.max(Fe.G(layer).offsetHeight - h1 - h2, 12)) + "px";
            }
        }
    }
    if (window.opera && Fe.G("FeDialogLayerTable_" + this.hashCode).offsetWidth < 130)
        Fe.G("FeDialogLayerTable_" + this.hashCode).style.width = "130px";
    this.timer = setTimeout(function () {
        me.resizeBy();
    }, 50);
};

/**
 * Fe.DialogFactory\u7684produce\u65b9\u6cd5\u3002\u521b\u5efa\u4e00\u4e2a\u65b0\u7684Fe.Dialog\u5b9e\u4f8b
 */
Fe.DialogFactory.produce = function () {
    for (var i = 0, n = Fe.DialogFactory.dialogs.length; i < n; i++) {
        if (!Fe.DialogFactory.dialogs[i].active) {
            if (i == (n - 1))
                setTimeout(function () {
                    new Fe.DialogFactory().create();
                }, 20);
            return Fe.DialogFactory.dialogs[i];
        }
    }
    return null;
};
// 20071225
Fe.on(document.body, "onkeydown", function (event) {
    var el = event.target || event.srcElement;
    if (!el)
        return false;
    if (el.tagName.toLowerCase() == 'textarea')
        return false;

    var key = event.which || event.keyCode;
    if (Fe.DialogFactory.currentDialog && Fe.DialogFactory.currentDialog.active) {
        if (key == 27)
            Fe.DialogFactory.currentDialog.oncancel();
        else if (key == 13) {
            Fe.DialogFactory.currentDialog.onaccept();
            // FF2\u6ca1\u6709\u95ee\u9898\uff0cFF3\u51fa\u95ee\u9898\u4e86\uff1f
            try {
                event.keyCode = 0;
            } catch (e) {
            }
            event.returnValue = false;
        }
    }
});


/**
 * \u7ed9\u5143\u7d20el\u89e3\u9664\u4e8b\u4ef6(evt)\u7684\u5904\u7406\u51fd\u6570handler\u3002
 * \u7528\u6cd5\uff1a
 * Fe.un("button", "click", function(){ alert(123); });
 * @param {DOM/String} el DOM\u5143\u7d20\u6216\u8005\u5176ID
 * @param {String} type \u65b9\u6cd5\u7684\u540d\u79f0
 * @param {Function} handler \u4e8b\u4ef6\u7684\u5904\u7406\u51fd\u6570
 * @return {DOM} \u7ed1\u5b9a\u4e8b\u4ef6\u7684\u8282\u70b9
 */
Fe.un = function (el, type, handler) {
    if (!(el = Fe.G(el))) {
        return el;
    }

    type = type.replace(/^on/, "").toLowerCase();

    if (el.attachEvent) {
        el.detachEvent('on' + type, el[type + handler]);
        el[type + handler] = null;
    } else {
        el.removeEventListener(type, handler, false);
    }

    return el;
};


/** @ignore */
function BdLockWindow() {
    this.initialize();
}

/** @ignore */
BdLockWindow.prototype.initialize = function () {
    var div = BdLockWindow.element = document.createElement("DIV");
    div.id = BdLockWindow.id;

    var style = div.style;
    style.zIndex = 1;
    style.top = "0px";
    style.left = "0px";
    style.width = "100%";
    style.height = "100%";
    style.border = "none";
    style.display = "none";
    style.margin = 0;
    style.padding = 0;
    style.position = "absolute";
    style.backgroundColor = "#666699";
    style.backgroundImage = "url(" + Fe.path + "/img/blank.gif)";

    document.body.insertBefore(div, document.body.firstChild);
    BdLockWindow.onResize();
};

/**
 * \u91cd\u65b0\u8c03\u6574\u906e\u7f69\u5c42\u7684\u5927\u5c0f
 */
BdLockWindow.onResize = function () {
    BdLockWindow.element.style.width = "100%";
    BdLockWindow.element.style.height = "100%";

    setTimeout(function () {
        var body = Fe.body();
        var W = body.documentWidth;
        var H = body.documentHeight;
        BdLockWindow.element.style.width = W + "px";
        BdLockWindow.element.style.height = H + "px";
    }, 10);
};

/**@ignore */
BdLockWindow._restore = function (TagName) {
    var s = document.getElementsByTagName(TagName);
    for (var i = s.length - 1; i > -1; i--) {
        s[i].style.visibility = s[i].getAttribute("att_BdLockWindow_v") || "";
        s[i].removeAttribute("att_BdLockWindow_v");
    }
};

/**@ignore */
BdLockWindow._safeguard = function (TagName) {
    var s = document.getElementsByTagName(TagName);
    for (var i = s.length - 1; i > -1; i--) {
        s[i].setAttribute("att_BdLockWindow_v", s[i].style.visibility, 0);
        s[i].style.visibility = "hidden";
    }
};

BdLockWindow.id = "BdLockWindow_" + new Date().getTime().toString(36);

/**
 * \u9501\u4f4f\u5c4f\u5e55
 * @param {Object} options \u4e00\u4e9b\u914d\u7f6e\u4fe1\u606f
 * @config {String} [backgroundColor] \u80cc\u666f\u8272
 * @config {String} [opacity] \u900f\u660e\u5ea6\uff0c\u4f8b\u59820.5
 * @config {String} [zIndex] \u9ad8\u5ea6\u503c
 */
BdLockWindow.lock = function (options) {
    var me = this;
    if (!me.instance) {
        me.instance = new BdLockWindow();
    }

    Fe.show(me.id);
    Fe.on(window, "onresize", me.onResize);
    var style = me.element.style;
    me.onResize();
    var op = Fe.extend({
        zIndex: 1,
        opacity: 0.5
    }, options || {});

    style.zIndex = op.zIndex;
    style.backgroundColor = op.backgroundColor || "#666699";
    if ('opacity' in style) {
        style.opacity = op.opacity;
    } else if ('MozOpacity' in style) {    // Firefox 0.9\u7684\u60c5\u51b5\uff0cFirefox 3.1\u5df2\u7ecf\u4e0d\u652f\u6301\u4e86
        style.MozOpacity = op.opacity;
    } else if ('filter' in style) {
        // \u53ea\u80fdQuirks Mode\u4e0b\u9762\u751f\u6548??
        style.filter = (style.filter || '').replace(/alpha\([^\)]*\)/gi, "") + (op.opacity == 1 ? "" : "alpha(opacity=" + op.opacity * 100 + ")");
        // IE filters only apply to elements with "layout."
        style.zoom = 1;
    }

    /*
     for(var tags = ["SELECT","OBJECT","EMBED"], i = 0, j = tags.length; i < j; i ++){
     this._safeguard(tags[i])
     }
     */
    for (var tags = ["SELECT"], i = 0, j = tags.length; i < j; i++) {
        this._safeguard(tags[i])
    }
};

/**
 * \u5c4f\u5e55\u89e3\u9501
 */
BdLockWindow.unlock = function () {
    if (!this.instance) {
        this.instance = new BdLockWindow();
        return;
    }
    Fe.hide(this.id);
    Fe.un(window, "onresize", this.onResize);
    for (var tags = ["SELECT", "OBJECT", "EMBED"], i = 0, j = tags.length; i < j; i++) {
        this._restore(tags[i])
    }
};


/**
 * Fe.Dialog \u5bf9\u8bdd\u6846\u7684\u57fa\u7c7b
 * @constructor
 * @name Fe.Dialog
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 * @config {String} [contentType] \u5bf9\u8bdd\u6846\u7684\u7c7b\u578b
 * @config {String} [title] \u5bf9\u8bdd\u6846\u7684\u6807\u9898
 * @config {Number} [width] \u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 * @config {String} [overflow] \u5bf9\u8bdd\u6846\u5185\u5bb9\u6ea2\u51fa\u65f6\u5019\u7684\u5904\u7406\u65b9\u5f0f(visible,hidden,auto...)
 * @config {Number} [height] \u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6
 * @config {Boolean} [resizable] \u5bf9\u8bdd\u6846\u662f\u5426\u53ef\u4ee5\u7f29\u653e\u5927\u5c0f(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [help] \u5bf9\u8bdd\u6846\u662f\u5426\u663e\u793a\u5e2e\u52a9\u6807\u8bc6(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [locked] \u5bf9\u8bdd\u6846\u663e\u793a\u7684\u65f6\u5019\u662f\u5426\u9501\u4f4f\u5c4f\u5e55
 * @config {String} [icon] \u5bf9\u8bdd\u6846\u7684\u56fe\u6807\uff0c\u662f\u4e00\u4e2aurl\u5730\u5740
 * @config {Boolean} [titlebar] \u662f\u5426\u663e\u793a\u6807\u9898\u680f
 * @config {Boolean} [statusbar] \u662f\u5426\u663e\u793a\u72b6\u6001\u680f
 * @config {Boolean} [controlbar] \u662f\u5426\u663e\u793a\u63a7\u5236\u680f
 * @config {Boolean} [buttonbar] \u662f\u5426\u663e\u793a\u6309\u94ae\u64cd\u4f5c\u680f
 * @config {Boolean} [buttonClose] \u662f\u5426\u663e\u793a\u5173\u95ed\u6309\u94ae
 * @config {Boolean} [buttonAccept] \u662f\u5426\u663e\u793a\u786e\u5b9a\u6309\u94ae
 * @config {Boolean} [buttonCancel] \u662f\u5426\u663e\u793a\u53d6\u6d88\u6309\u94ae
 * @config {String} [buttonbarAlign] \u6309\u94ae\u7684\u5bf9\u9f50\u65b9\u5f0f(left, center, right)
 * @config {String} [buttonAcceptValue] \u786e\u5b9a\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 * @config {String} [buttonCancelValue] \u53d6\u6d88\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 */
// {contentType title width height scroll resizable help}
Fe.Dialog = function (op) {
    Fe.BaseClass.call(this);
    // this.drag = true;
    this.help = false;
    this.font = "normal 12px sans-serif";

    /**
     * \u5bf9\u8bdd\u6846\u7684\u6807\u9898
     * @type String
     */
    this.title = "Fe.Dialog";
    /**
     * \u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
     * @type Number
     */
    this.width = "";
    /**
     * \u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6
     * @type Number
     */
    this.height = "";

    this.autofit = false;
    /**
     * \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
     * @type String
     */
    this.content = "&nbsp;";
    /**
     * \u5bf9\u8bdd\u6846\u5185\u5bb9\u6ea2\u51fa\u7684\u65f6\u5019\uff0c\u5982\u4f55\u5904\u7406(visible/hidden)
     * @type String
     */
    this.overflow = "visible";
    /**
     * \u5bf9\u8bdd\u6846\u663e\u793a\u7684\u4f4d\u7f6e(length|percentage|alignment)
     * @type String
     */
    this.position = "center"; // length|percentage|alignment
    /**
     * \u662f\u5426\u663e\u793a\u6807\u9898\u680f
     * @type Boolean
     */
    this.titlebar = true;
    this.scrolling = "auto";
    /**
     * \u662f\u5426\u663e\u793a\u6309\u94ae\u680f
     * @type Boolean
     */
    this.buttonbar = false;
    /**
     * \u662f\u5426\u663e\u793a\u72b6\u6001\u680f
     * @type Boolean
     */
    this.statusbar = false;
    this.resizable = false;
    this.controlbar = true;
    /**
     * \u662f\u5426\u663e\u793a"\u5173\u95ed"\u6309\u94ae
     * @type Boolean
     */
    this.buttonClose = true;
    /**
     * \u5bf9\u8bdd\u6846\u7684\u7c7b\u578b(htmlstring,htmlelement,iframe)
     * @type String
     */
    this.contentType = "HTMLString";
    /**
     * \u662f\u5426\u663e\u793a"\u786e\u5b9a"\u6309\u94ae
     * @type Boolean
     */
    this.buttonAccept = false;
    /**
     * \u662f\u5426\u663e\u793a"\u53d6\u6d88"\u6309\u94ae
     * @type Boolean
     */
    this.buttonCancel = false;
    /**
     * \u5bf9\u8bdd\u6846\u5e95\u90e8\u6309\u94ae\u533a\u57df\u7684\u5bf9\u9f50\u65b9\u5f0f(left, right, center)
     * @type  String
     */
    this.buttonbarAlign = "right";
    /**
     * "\u786e\u5b9a"\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
     * @type String
     */
    this.buttonAcceptValue = "\u786e \u5b9a";
    /**
     * "\u53d6\u6d88"\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
     * @type String
     */
    this.buttonCancelValue = "\u53d6 \u6d88";
}
Fe.inherit(Fe.Dialog, Fe.BaseClass, "Fe.Dialog");

/**
 * Fe.Dialog\u7684render\u65b9\u6cd5\uff0c\u7528\u6765\u663e\u793a\u4e00\u4e2a\u5bf9\u8bdd\u6846
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u4e00\u4e9b\u914d\u7f6e\u4fe1\u606f
 * @config {String} [contentType] \u5bf9\u8bdd\u6846\u7684\u7c7b\u578b
 * @config {String} [title] \u5bf9\u8bdd\u6846\u7684\u6807\u9898
 * @config {Number} [width] \u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 * @config {String} [overflow] \u5bf9\u8bdd\u6846\u5185\u5bb9\u6ea2\u51fa\u65f6\u5019\u7684\u5904\u7406\u65b9\u5f0f(visible,hidden,auto...)
 * @config {Number} [height] \u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6
 * @config {Boolean} [resizable] \u5bf9\u8bdd\u6846\u662f\u5426\u53ef\u4ee5\u7f29\u653e\u5927\u5c0f(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [help] \u5bf9\u8bdd\u6846\u662f\u5426\u663e\u793a\u5e2e\u52a9\u6807\u8bc6(\u6682\u672a\u652f\u6301)
 * @config {Boolean} [locked] \u5bf9\u8bdd\u6846\u663e\u793a\u7684\u65f6\u5019\u662f\u5426\u9501\u4f4f\u5c4f\u5e55
 * @config {String} [icon] \u5bf9\u8bdd\u6846\u7684\u56fe\u6807\uff0c\u662f\u4e00\u4e2aurl\u5730\u5740
 * @config {Boolean} [titlebar] \u662f\u5426\u663e\u793a\u6807\u9898\u680f
 * @config {Boolean} [statusbar] \u662f\u5426\u663e\u793a\u72b6\u6001\u680f
 * @config {Boolean} [controlbar] \u662f\u5426\u663e\u793a\u63a7\u5236\u680f
 * @config {Boolean} [buttonbar] \u662f\u5426\u663e\u793a\u6309\u94ae\u64cd\u4f5c\u680f
 * @config {Boolean} [buttonClose] \u662f\u5426\u663e\u793a\u5173\u95ed\u6309\u94ae
 * @config {Boolean} [buttonAccept] \u662f\u5426\u663e\u793a\u786e\u5b9a\u6309\u94ae
 * @config {Boolean} [buttonCancel] \u662f\u5426\u663e\u793a\u53d6\u6d88\u6309\u94ae
 * @config {String} [buttonbarAlign] \u6309\u94ae\u7684\u5bf9\u9f50\u65b9\u5f0f(left, center, right)
 * @config {String} [buttonAcceptValue] \u786e\u5b9a\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 * @config {String} [buttonCancelValue] \u53d6\u6d88\u6309\u94ae\u4e0a\u9762\u7684\u6587\u5b57
 */
Fe.Dialog.prototype.render = function (content, op) {
    if ("undefined" != typeof(content))
        this.content = content;
    if ("object" == typeof(op))
        Fe.extend(this, op);
    // if(!isNaN(parseInt(this.width))) this.width =
    // Math.max(parseInt(this.width), 150);
    if ("number" == typeof(this.width))
        this.width += "px";
    if ("number" == typeof(this.height))
        this.height += "px";
    var me = this,
        d = this.dialog = Fe.DialogFactory.produce();

    /** @ignore */
    d.onaccept = function () {
        me.accept()
    };
    /** @ignore */
    d.oncancel = function () {
        me.cancel()
    };
    /** @ignore */
    d.onclose = function () {
        me.close()
    };
    /** @ignore */
    d.onhelp = function () {
        me.help();
    };

    d.show(this);
    d.setActive();
    if (this.buttonbar && this.buttonAccept)
        Fe.G("FeDialogButtonAccept_" + d.hashCode).focus();

    if (this.locked) {
        BdLockWindow.lock({
            opacity: 0.4,
            backgroundColor: "#FFFFFF",
            zIndex: (52000 - 10)
        });
        this.addEventListener("onclose", function () {
            BdLockWindow.unlock();
        });
    }

    setTimeout(function () {
        me.dispatchEvent(new Fe.BaseEvent("onopen"));
    }, 10);
};
/**
 * Fe.Dialog\u7684setContent\u65b9\u6cd5\uff0c\u7528\u6765\u4fee\u6539\u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 */
Fe.Dialog.prototype.setContent = function (content) {
    this.dialog.setContent(content)
};

/**
 * Fe.Dialog\u7684setCaption\u65b9\u6cd5\uff0c\u7528\u6765\u4fee\u6539\u5bf9\u8bdd\u6846\u7684\u6807\u9898
 * @param {String} caption \u5bf9\u8bdd\u6846\u7684\u6807\u9898
 */
Fe.Dialog.prototype.setCaption = function (caption) {
    this.dialog.setCaption(caption)
};

/**
 * Fe.Dialog\u7684setWidth\u65b9\u6cd5\uff0c\u7528\u6765\u4fee\u6539\u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 * @param {Number} w \u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 */
Fe.Dialog.prototype.setWidth = function (w) {
    this.dialog.setWidth(w)
};

/**
 * Fe.Dialog\u7684setHeight\u65b9\u6cd5\uff0c\u7528\u6765\u4fee\u6539\u5bf9\u8bdd\u6846\u7684\u5bbd\u5ea6
 * @param {Number} h \u5bf9\u8bdd\u6846\u7684\u9ad8\u5ea6
 */
Fe.Dialog.prototype.setHeight = function (h) {
    this.dialog.setHeight(h)
};

/**
 * Fe.Dialog\u7684getIframe\u65b9\u6cd5\uff0c\u7528\u6765\u83b7\u53d6\u5bf9\u8bdd\u6846\u5185\u90e8iframe\u7684\u5bf9\u8c61\u5f15\u7528
 */
Fe.Dialog.prototype.getIframe = function () {
    return Fe.G("FeDialogIframe_" + this.dialog.hashCode);
}

/**
 * Fe.Dialog\u7684close\u65b9\u6cd5\uff0c\u7528\u6765\u5173\u95ed\u5bf9\u8bdd\u6846\uff0c\u5e76\u5206\u53d1onclose\u4e8b\u4ef6
 */
Fe.Dialog.prototype.close = function () {
    var me = this, e = new Fe.BaseEvent("onclose");
    me.dispatchEvent(e);
    if (!e.returnValue)
        return;
    this.dialog.hide(function () {
        me.dispose();
    });
}

/**
 * Fe.Dialog\u7684accept\u65b9\u6cd5\uff0c\u70b9\u51fb\u786e\u5b9a\u6309\u94ae\u7684\u65f6\u5019\u8c03\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u5e76\u5206\u53d1onaccept\u4e8b\u4ef6
 */
Fe.Dialog.prototype.accept = function () {
    var e = new Fe.BaseEvent("onaccept");
    this.dispatchEvent(e);
    if (!e.returnValue)
        return;
    this.close();
};

/**
 * Fe.Dialog\u7684cancel\u65b9\u6cd5\uff0c\u70b9\u51fb\u53d6\u6d88\u6309\u94ae\u7684\u65f6\u5019\u8c03\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u5e76\u5206\u53d1oncancel\u4e8b\u4ef6
 */
Fe.Dialog.prototype.cancel = function () {
    var e = new Fe.BaseEvent("oncancel");
    this.dispatchEvent(e);
    if (!e.returnValue)
        return;
    this.close();
};

/**
 * Fe.Dialog\u7684cancel\u65b9\u6cd5\uff0c\u70b9\u51fb\u6807\u9898\u680f\u4e0a\u9762\u7684\u5e2e\u52a9\u56fe\u6807\u7684\u65f6\u5019\u8c03\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u5e76\u5206\u53d1onhelp\u4e8b\u4ef6\u3002
 * (\u6682\u65f6\u6ca1\u6709\u652f\u6301)
 */
Fe.Dialog.prototype.help = function () {
    this.dispatchEvent(new Fe.BaseEvent("onhelp"));
};


if (Fe.isIE && Fe.isIE < 7) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch (e) {
    }
}
;


/**
 * \u5173\u95ed\u6240\u6709\u7684\u5bf9\u8bdd\u6846
 */
Fe.Dialog.close = function () {
    for (var i = 0, n = Fe.DialogFactory.dialogs.length; i < n; i++) {
        var dialog = Fe.DialogFactory.dialogs[i];
        if (dialog.active && typeof(dialog.onclose == "function")) {
            dialog.onclose();
        }
    }
};


/**
 * Fe.Dialog\u6269\u5c55\u7684\u9759\u6001\u65b9\u6cd5
 * \u6253\u5f00\u4e00\u4e2a\u666e\u901a\u7684Dialog
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 */
Fe.Dialog.open = function (content, op) {
    var dialog = new Fe.Dialog();
    dialog.render(content, op);
    return dialog;
};


/**
 * \u6253\u5f00\u4e00\u4e2a\u7c7b\u4f3calert\u5f62\u5f0f\u7684\u5bf9\u8bdd\u6846
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 */
Fe.Dialog.alert = function (content, op) {
    return this.open(content, Fe.extend({
        buttonbar: true,
        buttonAccept: true
    }, op || {}));
};


/**
 * \u6253\u5f00\u4e00\u4e2a\u7c7b\u4f3cconfirm\u5f62\u5f0f\u7684\u5bf9\u8bdd\u6846
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 */
Fe.Dialog.confirm = function (content, op) {
    return this.open(content, Fe.extend({
        locked: true,
        buttonbar: true,
        buttonAccept: true,
        buttonCancel: true
    }, op || {}));
};


/**
 * \u6253\u5f00\u4e00\u4e2a\u7c7b\u4f3cshowModalDialog\u5f62\u5f0f\u7684\u5bf9\u8bdd\u6846
 * @param {String} content \u5bf9\u8bdd\u6846\u7684\u5185\u5bb9
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 */
Fe.Dialog.showModalDialog = function (content, op) {
    return this.open(content, Fe.extend({
        locked: true,
        position: "center"
    }, op || {}));
};


/**
 * \u63d0\u4ea4form\u5230\u5bf9\u8bdd\u6846
 * @param {Form} form \u5c06form\u63d0\u4ea4\u5230\u5bf9\u8bdd\u6846\u5185\u90e8
 * @param {Object} op \u5bf9\u8bdd\u6846\u7684\u914d\u7f6e\u4fe1\u606f
 */
Fe.Dialog.submit = function (form, op) {
    var dialog = this.open("about:blank", Fe.extend({
        contentType: "page"
    }, op || {}));
    var target = form.target;
    form.target = dialog.getIframe().name;
    form.submit();
    form.target = target;
    return dialog;
};
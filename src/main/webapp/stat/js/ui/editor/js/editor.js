baidu.on = function (H, F, E, G) {
    if (typeof E != "function") {
        return H
    }
    F = F.replace(/^on/i, "").toLowerCase();
    function B(I) {
        return I || window.event
    }

    var D = function (I) {
        E.call(D.src, B(I))
    };
    D.src = H;
    var C = baidu.on._listeners;
    var A = [H, F, E, D];
    C[C.length] = A;
    if (H.attachEvent) {
        H.attachEvent("on" + F, D)
    } else {
        if (H.addEventListener) {
            H.addEventListener(F, D, false)
        }
    }
    return H
};
baidu.on._listeners = [];
baidu.string = baidu.string || {};
baidu.isString = function (A) {
    return (typeof A == "object" && A && A.constructor == String) || typeof A == "string"
};
baidu.G = function () {
    for (var A = [], B = arguments.length - 1; B > -1; B--) {
        var C = arguments[B];
        A[B] = null;
        if (typeof C == "object" && C && C.dom) {
            A[B] = C.dom
        } else {
            if ((typeof C == "object" && C && C.tagName) || C == window || C == document) {
                A[B] = C
            } else {
                if (baidu.isString(C) && (C = document.getElementById(C))) {
                    A[B] = C
                }
            }
        }
    }
    return A.length < 2 ? A[0] : A
};
(function () {
    var B = {};
    baidu.BaseClass = function (C) {
        B[(this.guid = (C || baidu.BaseClass.guid()))] = this
    };
    var A = 0;
    baidu.BaseClass.guid = function () {
        return "MZ__" + (A++).toString(36)
    };
    baidu.BaseClass.create = function (D) {
        var E = new baidu.BaseClass();
        delete B[this.guid];
        for (var C in D) {
            E[C] = D[C]
        }
        return E
    };
    window.Instance = baidu.instance = function (C) {
        return B[C]
    };
    baidu.BaseClass.prototype.dispose = function () {
        if (this.guid) {
            delete B[this.guid]
        }
        for (var C in this) {
            if (typeof this[C] != "function") {
                delete this[C]
            }
        }
    };
    baidu.BaseClass.decontrol = function (C) {
        if (C && C.guid) {
            delete B[C.guid]
        }
    };
    baidu.BaseClass.prototype.toString = function () {
        return "[object " + (this._className || "Object") + "]"
    }
})();
baidu.BaseEvent = function (A, B) {
    this.type = A;
    this.returnValue = true;
    this.target = B || null;
    this.currentTarget = this.srcElement = null
};
baidu.BaseClass.prototype.addEventListener = function (D, C, B) {
    if (typeof C != "function") {
        throw ("addEventListener:" + C + " is not a function")
    }
    if (!this.__listeners) {
        this.__listeners = {}
    }
    var A = this.__listeners, E;
    if (typeof B == "string" && B) {
        if (/[^\w\-]/.test(B)) {
            throw ("nonstandard key:" + B)
        } else {
            C.hashCode = B;
            E = B
        }
    }
    if (D.indexOf("on") != 0) {
        D = "on" + D
    }
    if (typeof A[D] != "object") {
        A[D] = {}
    }
    E = E || baidu.BaseClass.guid();
    C.hashCode = E;
    A[D][E] = C
};
baidu.BaseClass.prototype.removeEventListener = function (C, B) {
    if (typeof B == "function") {
        B = B.hashCode
    } else {
        if (typeof B != "string") {
            return
        }
    }
    if (!this.__listeners) {
        this.__listeners = {}
    }
    if (C.indexOf("on") != 0) {
        C = "on" + C
    }
    var A = this.__listeners;
    if (!A[C]) {
        return
    }
    if (A[C][B]) {
        delete A[C][B]
    }
};
baidu.BaseClass.prototype.dispatchEvent = function (C) {
    if (!this.__listeners) {
        this.__listeners = {}
    }
    var B, A = this.__listeners, D = C.type;
    C.target = C.srcElement = C.target || C.srcElement || this;
    C.currentTarget = this;
    if (typeof this[D] == "function") {
        this[D](C)
    }
    if (typeof A[D] == "object") {
        for (B in A[D]) {
            if (typeof A[D][B] == "function") {
                A[D][B].call(this, C)
            }
        }
    }
    return C.returnValue
};
baidu.extend = function (C, A) {
    if (C && A && typeof (A) == "object") {
        for (var B in A) {
            C[B] = A[B]
        }
    }
    return C
};
baidu.trim = function (B, A) {
    if (A == "left") {
        return B.replace(/(^[\s\t\xa0\u3000]+)/g, "")
    }
    if (A == "right") {
        return B.replace(/([\u3000\xa0\s\t]+$)/g, "")
    }
    return B.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
baidu.addClass = function (A, B) {
    if (!(A = baidu.G(A))) {
        return
    }
    B = baidu.trim(B);
    if (!new RegExp("(^| )" + B.replace(/(\W)/g, "\\\x241") + "( |\x24)").test(A.className)) {
        A.className = baidu.trim(A.className.split(/\s+/).concat(B).join(" "))
    }
};
baidu.ac = baidu.addClass;
baidu.removeClass = function (A, B) {
    if (!(A = baidu.G(A))) {
        return
    }
    B = baidu.trim(B);
    var C = A.className.replace(new RegExp("(^| +)" + B.replace(/(\W)/g, "\\\x241") + "( +|\x24)", "g"), "\x242");
    if (A.className != C) {
        A.className = baidu.trim(C)
    }
};
baidu.rc = baidu.removeClass;
baidu.ui = baidu.ui || {};
baidu.editor = {
    _register: [], register: function (A) {
        this._register[this._register.length] = A
    }, _commands: {}, registCommand: function (B, A) {
        this._commands[B] = A
    }, _queries: {}, registQuery: function (B, A) {
        this._queries[B] = A
    }, _parser: {}, registParser: function (A, B) {
        this._parser[A] = B
    }
};
baidu.editor.EditorConfig = {
    docType: "",
    skinCSS: "../static/js/ui/editor/css/editorarea.css",
    maxUndoCount: 100,
    hotkey: {"ctrl+66": "Bold", "meta+66": "Bold", "ctrl+90": "Undo", "ctrl+89": "Redo", "9": "Bold"}
};
baidu.ie = 0;
if (/MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) && !window.opera) {
    baidu.ie = parseFloat(RegExp.$1)
}
baidu.editor.register(function (C) {
    var A = baidu.editor.EditorConfig.hotkey;
    if (A) {
        function B(H) {
            var D = H;
            H = H.srcElement;
            var G = H.keyCode || H.which;
            if (H.ctrlKey && G == 86 || H.ctrlKey && G == 88 || H.shiftKey && G == 45 || H.shiftKey && G == 46) {
                C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
                setTimeout(function () {
                    C.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
                    C.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
                    C.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"));
                    C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"))
                }, 0);
                D.returnValue = false;
                return false
            }
            if (baidu.ie && G == 8) {
                var I = C.getSelection().getSelectedElement();
                if (I) {
                    C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
                    baidu.dom.element.remove(I, C.document);
                    C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
                    if (H.preventDefault) {
                        H.preventDefault()
                    }
                }
            }
            for (var F in A) {
                if (/^(ctrl|meta)\+(\d+)$/.test(F.toLowerCase()) || /^(\d+)$/.test(F)) {
                    if ((H[RegExp.$1 + "Key"] && G == RegExp.$2) || G == RegExp.$1) {
                        try {
                            C.execCommand(A[F])
                        } catch (E) {
                        }
                        D.returnValue = H.returnValue = false;
                        if (H.preventDefault) {
                            H.preventDefault()
                        }
                        return false
                    }
                }
            }
            return true
        }

        C.addEventListener("onbeforekeydown", B)
    }
});
baidu.inherits = function (A, E, D) {
    var B, F, H = A.prototype, G = function () {
    };
    G.prototype = E.prototype;
    F = A.prototype = new G();
    if (typeof D == "string") {
        F._className = D
    }
    for (B in H) {
        F[B] = H[B]
    }
    A.prototype.constructor = H.constructor;
    A.superClass = E.prototype;
    H = G = null;
    return F
};
(function () {
    function A(C, B) {
        baidu.BaseClass.call(this);
        this.iframe = null;
        this.document = null;
        this.window = null;
        B = B || {};
        this.width = B.width || "";
        this.height = B.height || "";
        this.readyState = 0;
        this.ieBakRange = null;
        this.temp = {scene: {}};
        this.isBlur = true
    }

    baidu.inherits(A, baidu.BaseClass, "baidu.Editor");
    A.prototype.render = function () {
        var D = typeof this.width == "number" ? this.width + "px" : this.width;
        var B = typeof this.height == "number" ? this.height + "px" : this.height;
        B = "height:" + B + ";";
        var C = ["<div id='tangram_editor_container_" + this.guid + "' class='tangram_editor_container' "];
        C.push("style='width:" + D + ";'");
        C.push("><iframe id='tangram_editor_iframe_" + this.guid + "' ");
        C.push("name='tangram_editor_iframe_" + this.guid + "' ");
        C.push("style='width:100%;" + B + "' scroll='no' frameborder='0'></iframe>");
        C.push("</div>");
        this._setReadyState(1);
        this.availableIframe();
        return C.join("")
    };
    A.prototype.availableIframe = function () {
        var B = document.getElementById("tangram_editor_iframe_" + this.guid);
        if (B) {
            this.iframe = B;
            this._setReadyState(3)
        } else {
            var C = this;
            setTimeout(function () {
                C.availableIframe()
            }, 20)
        }
    };
    A.prototype.makeEditable = function (F) {
        var D = this;
        var B = [baidu.editor.EditorConfig.docType];
        B.push("<html><head>");
        if (baidu.editor.EditorConfig.skinCSS) {
            var C = baidu.editor.EditorConfig.skinCSS + (baidu.ie ? "" : "?tmp=" + new Date().getTime());
            B.push("<link rel='stylesheet' type='text/css' href='" + C + "' _bdtmp='true'/>")
        }
        B.push("</head><body>");
        B.push(F || "");
        B.push("</body></html>");
        D.window = D.iframe.contentWindow;
        var E = D.document = D.window.document;
        E.open();
        E.write(B.join(""));
        E.close();
        if (baidu.ie) {
            E.body.disabled = true;
            E.body.contentEditable = true;
            E.body.removeAttribute("disabled");
            D._setReadyState(4)
        } else {
            setTimeout(function () {
                try {
                    E.body.spellcheck = false;
                    E.designMode = "on";
                    var J = false;
                    try {
                        E.execCommand("styleWithCSS", false, J)
                    } catch (H) {
                        E.execCommand("useCSS", false, !J)
                    }
                    var I = false;
                    var G = true;
                    E.execCommand("enableObjectResizing", false, !I);
                    E.execCommand("enableInlineTableEditing", false, !G)
                } catch (H) {
                }
                D._setReadyState(4)
            }, 1)
        }
    };
    A.prototype.execCommand = function (G, D, E) {
        var C = false, F = true;
        this.focus();
        if (this.__hasEnterdExecCommand) {
            F = false
        } else {
            this.__hasEnterdExecCommand = true
        }
        this.dispatchEvent(new baidu.BaseEvent("onbeforeexeccommand", {command: G, topOpearation: F}));
        if (typeof G == "string") {
            var B = baidu.editor._commands;
            if (typeof B[G] == "function") {
                C = B[G].apply(null, [this].concat(Array.prototype.slice.call(arguments, 1)))
            } else {
                C = this.document.execCommand(G, D, E)
            }
        } else {
            if (typeof G == "function") {
                C = G.apply(null, [this].concat(Array.prototype.slice.call(arguments, 1)))
            }
        }
        if (F) {
            this.__hasEnterdExecCommand = false
        }
        this.dispatchEvent(new baidu.BaseEvent("onafterexeccommand", {command: G, topOpearation: F}));
        this.selectionChangeHandler(null, true);
        return C
    };
    A.prototype.queryContextState = function (B) {
        var C = baidu.editor._parser;
        if (typeof C[B] == "function") {
            return C[B](this)
        }
    };
    A.prototype.queryCommandState = function (D) {
        var B = baidu.editor._queries;
        if (typeof B[D] == "function") {
            return B[D](this)
        } else {
            var C = navigator.userAgent;
            if (/(\d+\.\d)\s+safari/i.test(C) && !/chrome/i.test(C) && D.toLowerCase() == "paste") {
                return false
            }
            return this.document.queryCommandEnabled(D) && this.document.queryCommandState(D)
        }
    };
    A.prototype.getContent = function (B) {
        if (!B) {
            var C = this.document.body.innerHTML;
            return C
        } else {
            var C = baidu.editor.EditorConfig.docType;
            C += "<html>";
            C += this.document.documentElement.innerHTML;
            C += "</html>";
            return C
        }
    };
    A.prototype.setContent = function (C) {
        var B = this;
        this.document.body.innerHTML = C;
        setTimeout(function () {
            B.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
            B.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
            B.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"))
        }, 0)
    };
    A.prototype._bindEvent = function () {
        var D = this;

        function E(F) {
            D.selectionChangeHandler(F)
        }

        function B(H) {
            H = D.window.event || H;
            var G = H.keyCode || H.which, F;
            D.dispatchEvent(F = new baidu.BaseEvent("onbeforekeydown", H));
            if (F.returnValue == false) {
                return
            }
            D.dispatchEvent(F = new baidu.BaseEvent("onkeydown", H));
            if (F.returnValue == false) {
                return
            }
            if (G != 27 && G != 16 && G != 17 && G != 18) {
                clearTimeout(B.timer);
                B.timer = setTimeout(function () {
                    E()
                }, 500)
            }
            D.dispatchEvent(new baidu.BaseEvent("onafterkeydown", H))
        }

        function C(F) {
            clearTimeout(C.timer);
            C.timer = setTimeout(function () {
                E()
            }, 20)
        }

        baidu.on(D.document, "mouseup", E);
        baidu.on(D.document, "keydown", B);
        baidu.on(D.document, "mousemove", C);
        baidu.on(D.window, "blur", function () {
            D.dispatchEvent(new baidu.BaseEvent("onblur"));
            D.isBlur = true
        });
        baidu.on(D.window, "focus", function () {
            D.dispatchEvent(new baidu.BaseEvent("onfocus"));
            D.isBlur = false
        });
        if (baidu.ie) {
            setInterval(function () {
                if (!D.isBlur) {
                    D.ieBakRange = D.document.selection.createRange();
                    D.ieBakRangeType = D.document.selection.type
                }
            }, 20)
        }
        this.dispatchEvent(new baidu.BaseEvent("onwysiwygready"))
    };
    A.prototype.selectionChangeHandler = function (H) {
        var G = this.temp.scene;
        var C = this.document.body.innerHTML;
        if (this.temp.innerHTML != C) {
            this.temp.innerHTML = C;
            H = this.window.event || H;
            if (H && H.type && H.type.indexOf("key") >= 0) {
                var E = H.srcElement || H.target;
                if (E) {
                    if (E.nodeType == 3) {
                        E = E.parentNode
                    }
                    var I = E.getElementsByTagName("*").length;
                    if (E.tagName != "HTML" && E == G.target && I == G.count) {
                        return
                    }
                    G.target = E;
                    G.count = I
                }
            }
        } else {
            if (window.getSelection) {
                var B = this.window.getSelection().getRangeAt(0);
                if (B.startContainer == G.startContainer && B.endContainer == G.endContainer) {
                    if (B.collapsed) {
                        return
                    } else {
                        if (B.startOffset == G.startOffset && B.endOffset == G.endOffset) {
                            return
                        }
                    }
                }
                G.endOffset = B.endOffset;
                G.startOffset = B.startOffset;
                G.endContainer = B.endContainer;
                G.startContainer = B.startContainer
            } else {
                if (document.selection) {
                    var F = this.document.selection;
                    var B = F.createRange();
                    var D = F.type.toLowerCase();
                    if (G.type == D) {
                        if (D == "control" && B(0) == G.control) {
                            return
                        } else {
                            if (G.text == B.text && G.parentElement == B.parentElement()) {
                                return
                            }
                        }
                    }
                    G.type = D;
                    if (D == "control") {
                        G.control = B(0)
                    } else {
                        G.text = B.text;
                        G.parentElement = B.parentElement()
                    }
                }
            }
        }
        this.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
        this.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
        this.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"))
    };
    A.prototype._setReadyState = function (B) {
        this.readyState = B;
        this.dispatchEvent(new baidu.BaseEvent("onreadystatechange", B))
    };
    A.prototype.addToolbarItem = function (B) {
        if (B && typeof B.initialize == "function") {
            B.initialize()
        }
    };
    baidu.editor.Editor = A
})();
baidu.editor.create = function (D, A) {
    var E = new baidu.editor.Editor(D, A);
    if (typeof D == "string") {
        D = document.getElementById(D)
    }
    var C = "";
    if (D && D.tagName) {
        if (D.tagName.toLowerCase() == "textarea") {
            C = D.value
        } else {
            C = D.innerHTML
        }
    }
    if (C == "" && A) {
        C = A.content || ""
    }
    if (!baidu.ie && C == "") {
        C = "<br/>"
    }
    var B = baidu.BaseClass.guid();
    E.addEventListener("onreadystatechange", function (H) {
        var G = H.currentTarget;
        switch (G.readyState) {
            case 3:
                G.makeEditable(C);
                break;
            case 4:
                for (var F = baidu.editor._register.length - 1; F >= 0; F--) {
                    baidu.editor._register[F](this)
                }
                G.removeEventListener("onreadystatechange", B);
                G._bindEvent();
                break
        }
    }, B);
    return E
};
baidu.editor.Editor.prototype.focus = function () {
    this.window.focus();
    try {
        if (baidu.ie && this.ieBakRange) {
            this.ieBakRange.select()
        }
    } catch (A) {
    }
};
baidu.dom = baidu.dom || {};
baidu.isElement = function (A) {
    if (A === undefined || A === null) {
        return false
    }
    return A && A.nodeName && A.nodeType == 1
};
baidu.isDocument = function (A) {
    if (A === undefined || A === null) {
        return false
    }
    return A && A.nodeType == 9
};
baidu.dom.getWindow = function (A) {
    if (!baidu.isDocument(A)) {
        throw new Error("[baidu.dom.getWindow] param must be Document")
    }
    return A.parentWindow ? A.parentWindow : (A.defaultView ? A.defaultView : null)
};
baidu.array = baidu.array || {};
baidu.array.each = function (F, D) {
    var C, E, B, A = F.length;
    if ("function" == typeof D) {
        for (B = 0; B < A; B++) {
            E = F[B];
            C = D.call(F, E, B);
            if (C === false) {
                break
            }
        }
    }
    return F
};
baidu.each = baidu.array.each;
baidu.isElement = function (A) {
    if (A === undefined || A === null) {
        return false
    }
    return A && A.nodeName && A.nodeType == 1
};
baidu.isText = function (A) {
    if (A === undefined || A === null) {
        return false
    }
    return A && A.nodeType == 3
};
baidu.browser = baidu.browser || {};
(function () {
    var A = navigator.userAgent;
    baidu.firefox = baidu.browser.firefox = /firefox\/(\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
    baidu.ie = baidu.browser.ie = /msie (\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
    baidu.opera = baidu.browser.opera = /opera\/(\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
    baidu.safari = baidu.browser.safari = (/(\d+\.\d)\s+safari/i.test(A) && !/chrome/i.test(A)) ? parseFloat(RegExp.$1) : 0;
    try {
        baidu.browser.maxthon = /(\d+\.\d)/.test(external.max_version) ? parseFloat(RegExp.$1) : 0
    } catch (B) {
        baidu.browser.maxthon = 0
    }
    baidu.maxthon = baidu.browser.maxthon;
    baidu.isGecko = baidu.browser.isGecko = /gecko/i.test(A) && !/like gecko/i.test(A);
    baidu.isStrict = baidu.browser.isStrict = document.compatMode == "CSS1Compat";
    baidu.isWebkit = baidu.browser.isWebkit = /webkit/i.test(A)
})();
baidu.dom.getDocument = function (A) {
    return A.nodeType == 9 ? A : A.ownerDocument || A.document
};
baidu.dom.getParent = function (B) {
    var A = B.parentNode;
    return (A && baidu.isElement(A)) ? A : null
};
baidu.dom.getParents = function (B) {
    var A = [];
    do {
        A.unshift(B)
    } while (B = baidu.dom.getParent(B));
    return A
};
baidu.dom.getIndex = function (C) {
    var B = C.parentNode && C.parentNode.firstChild;
    var A = -1;
    while (B) {
        A++;
        if (B == C) {
            return A
        }
        B = B.nextSibling
    }
    return -1
};
baidu.dom.getCommonAncestor = function (B, A) {
    B = baidu.isElement(B) ? B : baidu.dom.getParent(B);
    A = baidu.isElement(A) ? A : baidu.dom.getParent(A);
    if (A === B) {
        return B
    }
    if (baidu.dom.element.contains(A, B)) {
        return A
    }
    do {
        if (baidu.dom.element.contains(B, A)) {
            return B
        }
    } while ((B = baidu.dom.getParent(B)));
    return null
};
baidu.dom.insertAfter = function (B, A) {
    A.parentNode.insertBefore(B, A.nextSibling);
    return A
};
baidu.dom.clone = function (C, A, D) {
    var E = C.cloneNode(A);
    if (!D) {
        var B = function (G) {
            if (!baidu.isElement(G)) {
                return
            }
            G.removeAttribute("id", false);
            var H = G.childNodes;
            for (var F = 0; F < H.length; F++) {
                B(H[F])
            }
        };
        B(E)
    }
    return E
};
baidu.dom.getNext = function (B, C) {
    var A = B.nextSibling;
    while (C && A && (baidu.isText(A)) && !baidu.trim(A.nodeValue)) {
        A = A.nextSibling
    }
    return A
};
baidu.dom.getPrevious = function (B, C) {
    var A = B.previousSibling;
    while (C && A && (baidu.isText(A)) && !baidu.trim(A.nodeValue)) {
        A = A.previousSibling
    }
    return A ? A : null
};
baidu.dom.getAddress = function (D, F, G) {
    var C = [], E = F.documentElement;
    while (D && D != E) {
        var A = D.parentNode, B = -1, H = A.firstChild;
        while (H) {
            if (G && H.nodeType == 3 && H.previousSibling && H.previousSibling.nodeType == 3) {
                H = H.nextSibling;
                continue
            }
            B++;
            if (H == D) {
                break
            }
            H = H.nextSibling
        }
        C.unshift(B);
        D = D.parentNode
    }
    return C
};
baidu.dom.getByAddress = function (G, B, H) {
    G = G.documentElement;
    for (var D = 0; G && D < B.length; D++) {
        var F = B[D];
        if (!H) {
            G = G.childNodes[F];
            continue
        }
        var A = -1;
        for (var C = 0; C < G.childNodes.length; C++) {
            var E = G.childNodes[C];
            if (H === true && E.nodeType == 3 && E.previousSibling && E.previousSibling.nodeType == 3) {
                continue
            }
            A++;
            if (A == F) {
                G = E;
                break
            }
        }
    }
    return G ? G : null
};
baidu.dom.text = baidu.dom.text || {};
baidu.dom.text.getLength = function (A) {
    return A.nodeValue.length
};
baidu.dom.text.split = function (E, D, C) {
    if (baidu.ie && D == baidu.dom.text.getLength(E)) {
        var B = C.createTextNode("");
        baidu.dom.insertAfter(B, E);
        return B
    }
    var A = E.splitText(D);
    if (!!document.documentMode) {
        baidu.dom.insertAfter(C.createTextNode(""), A)
    }
    return A
};
baidu.dom.element = baidu.dom.element || {};
baidu.dom.element.getChildCount = function (A) {
    return A.childNodes.length
};
baidu.dom.element.getChild = function (B, A) {
    if (!A.slice) {
        B = B.childNodes[A]
    } else {
        while (A.length > 0 && B) {
            B = B.childNodes[A.shift()]
        }
    }
    return B
};
baidu.dom.element.getName = function (B) {
    var C = B.nodeName.toLowerCase();
    if (baidu.ie) {
        var A = B.scopeName;
        if (A != "HTML") {
            C = A.toLowerCase() + ":" + C
        }
    }
    return C
};
baidu.dom.element.is = function (C) {
    var A = baidu.dom.element.getName(C);
    for (var B = 0; B < arguments.length; B++) {
        if (arguments[B] == A) {
            return true
        }
    }
    return false
};
baidu.dom.element.append = function (C, B, A) {
    if (A) {
        C.insertBefore(B, C.firstChild)
    } else {
        C.appendChild(B)
    }
    return B
};
baidu.dom.element.remove = function (A, B) {
    if (A && A.parentNode && A.nodeName != "BODY") {
        A.parentNode.removeChild(A)
    }
};
baidu.dom.element.contains = baidu.ie || baidu.isWebkit ? function (B, A) {
    return !baidu.isElement(A) ? B.contains(baidu.dom.getParent(A)) : B != A && B.contains(A)
} : function (B, A) {
    return !!(B.compareDocumentPosition(A) & 16)
};
baidu.dom.element.setAttr = function (C, A, D) {
    var B = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        height: "height",
        width: "width",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.isString(A)) {
        if (A == "style") {
            C.style.cssText = D
        } else {
            if (A == "class") {
                C.className = D
            } else {
                if (A == "for") {
                    C.htmlFor = D
                } else {
                    if (A in B) {
                        C.setAttribute(B[A], D)
                    } else {
                        C[A] = D
                    }
                }
            }
        }
    } else {
        for (var E in A) {
            if (typeof A[E] != "function") {
                baidu.setAttr(C, E, A[E])
            }
        }
    }
};
baidu.dom.element.setStyle = function () {
    var C = {}, B = /z-?index|font-?weight|opacity|zoom|line-?height/i, A = function (D, E) {
        return E.charAt(1).toUpperCase()
    };
    return function (G, D, H) {
        if (typeof D == "string") {
            var E;
            if (!(E = C[D])) {
                E = C[D] = D.replace(/(-[a-z])/gi, A)
            }
            var F = G.style;
            if (E == "opacity") {
                if ("opacity" in F) {
                    F.opacity = H
                } else {
                    if ("MozOpacity" in F) {
                        F.MozOpacity = H
                    } else {
                        if ("filter" in F) {
                            F.filter = (F.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (H == 1 ? "" : "alpha(opacity=" + H * 100 + ")");
                            F.zoom = 1
                        }
                    }
                }
            } else {
                if (H && H.constructor == Number && !B.test(D)) {
                    H = H + "px"
                }
                F[E] = H
            }
        } else {
            for (var I in D) {
                if (typeof D[I] != "function") {
                    baidu.setStyle(G, I, D[I])
                }
            }
        }
        return
    }
}();
baidu.dom.element.hasAttribute = function (C, B) {
    var A = C.attributes.getNamedItem(B);
    return !!(A && A.specified)
};
baidu.editor.Range = function (A) {
    var B = this;
    B.startContainer = null;
    B.startOffset = null;
    B.endContainer = null;
    B.endOffset = null;
    B.document = A;
    B.collapsed = true
};
(function () {
    POSITION_AFTER_START = 1;
    POSITION_BEFORE_END = 2;
    POSITION_BEFORE_START = 3;
    POSITION_AFTER_END = 4;
    var B = function (C) {
        C.collapsed = (C.startContainer && C.endContainer && C.startContainer === C.endContainer && C.startOffset == C.endOffset)
    };
    var A = function (M, R, C) {
        M.optimizeBookmark();
        var Z = M.startContainer;
        var O = M.endContainer;
        var T = M.startOffset;
        var I = M.endOffset;
        var Q;
        var J;
        if (baidu.isText(O)) {
            O = baidu.dom.text.split(O, I, this.document)
        } else {
            var V;
            if ((V = baidu.dom.element.getChildCount(O)) > 0) {
                if (I >= V) {
                    O = baidu.dom.element.append(O, M.document.createTextNode(""));
                    J = true
                } else {
                    O = baidu.dom.element.getChild(O, I)
                }
            }
        }
        if (baidu.isText(Z)) {
            baidu.dom.text.split(Z, T, this.document);
            if (Z === O) {
                O = baidu.dom.getNext(Z)
            }
        } else {
            if (!T) {
                Z = Z.insertBefore(M.document.createTextNode(""), Z.firstChild);
                Q = true
            } else {
                if (T >= baidu.dom.element.getChildCount(Z)) {
                    Z = baidu.dom.element.append(Z, M.document.createTextNode(""));
                    Q = true
                } else {
                    Z = baidu.dom.getPrevious(baidu.dom.element.getChild(Z, T))
                }
            }
        }
        var W = baidu.dom.getParents(Z);
        var E = baidu.dom.getParents(O);
        var U, a, Y;
        for (U = 0; U < W.length; U++) {
            a = W[U];
            Y = E[U];
            if (!(a === Y)) {
                break
            }
        }
        var X = C, N, L, G, K;
        for (var S = U; S < W.length; S++) {
            N = W[S];
            if (X && !(N === Z)) {
                L = baidu.dom.element.append(X, baidu.dom.clone(N))
            }
            G = baidu.dom.getNext(N);
            while (G) {
                if (G === E[S] || G === O) {
                    break
                }
                K = baidu.dom.getNext(G);
                if (R == 2) {
                    baidu.dom.element.append(X, baidu.dom.clone(G, true))
                } else {
                    if (R == 1) {
                        baidu.dom.element.append(X, baidu.dom.clone(G, true))
                    }
                    baidu.dom.element.remove(G, C)
                }
                G = K
            }
            if (X) {
                X = L
            }
        }
        X = C;
        for (var P = U; P < E.length; P++) {
            N = E[P];
            if (R > 0 && !(N === O)) {
                L = baidu.dom.element.append(X, baidu.dom.clone(N))
            }
            if (!W[P] || N.parentNode != W[P].parentNode) {
                G = baidu.dom.getPrevious(N);
                while (G) {
                    if (G === W[P] || G === Z) {
                        break
                    }
                    K = baidu.dom.getPrevious(G);
                    if (R == 2) {
                        X.insertBefore(G.cloneNode(true), X.firstChild)
                    } else {
                        baidu.dom.element.remove(G, C);
                        if (R == 1) {
                            X.insertBefore(G, X.firstChild)
                        }
                    }
                    G = K
                }
            }
            if (X) {
                X = L
            }
        }
        if (R == 2) {
            var D = M.startContainer;
            if (baidu.isText(D)) {
                D.data += D.nextSibling.data;
                D.parentNode.removeChild(D.nextSibling)
            }
            var H = M.endContainer;
            if (baidu.isText(H) && H.nextSibling) {
                H.data += H.nextSibling.data;
                H.parentNode.removeChild(H.nextSibling)
            }
        } else {
            if (a && Y && (Z.parentNode != a.parentNode || O.parentNode != Y.parentNode)) {
                var F = baidu.dom.getIndex(Y);
                if (Q && Y.parentNode == Z.parentNode) {
                    F--
                }
                M.setStart(baidu.dom.getParent(Y), F)
            }
            M.collapse(true)
        }
        if (Q) {
            baidu.dom.element.remove(Z, C)
        }
        if (J && O.parentNode) {
            baidu.dom.element.remove(O, C)
        }
    };
    baidu.editor.Range.prototype = {
        deleteContents: function () {
            var C = this.document.createDocumentFragment();
            if (this.collapsed) {
                return
            }
            A(this, 0, C)
        }, cloneContents: function () {
            var C = this.document.createDocumentFragment();
            if (!this.collapsed) {
                A(this, 2, C)
            }
            return C
        }, extractContents: function () {
            var C = this.document.createDocumentFragment();
            if (!this.collapsed) {
                A(this, 1, C)
            }
            return C
        }, clone: function () {
            var C = new baidu.editor.Range(this.document);
            C.startContainer = this.startContainer;
            C.startOffset = this.startOffset;
            C.endContainer = this.endContainer;
            C.endOffset = this.endOffset;
            C.collapsed = this.collapsed;
            return C
        }, collapse: function (C) {
            if (C) {
                this.endContainer = this.startContainer;
                this.endOffset = this.startOffset
            } else {
                this.startContainer = this.endContainer;
                this.startOffset = this.endOffset
            }
            this.collapsed = true
        }, select: baidu.ie ? function () {
            var G = this.collapsed;
            var C;
            var H;
            var K = this.createBookmark();
            var E = K.startNode;
            var I;
            if (!G) {
                I = K.endNode
            }
            var D = this.document.body.createTextRange();
            D.moveToElementText(E);
            D.moveStart("character", 1);
            if (I) {
                var J = this.document.body.createTextRange();
                J.moveToElementText(I);
                D.setEndPoint("EndToEnd", J);
                D.moveEnd("character", -1)
            } else {
                H = this.document.createElement("span");
                H.innerHTML = "&#65279;";
                E.parentNode.insertBefore(H, E);
                var F = this.document.createTextNode("\ufeff");
                E.parentNode.insertBefore(F, E)
            }
            this.setStartBefore(E);
            baidu.dom.element.remove(E, this.document);
            if (G) {
                D.moveStart("character", -1);
                D.select();
                this.document.selection.clear();
                baidu.dom.element.remove(H, this.document)
            } else {
                this.setEndBefore(I);
                baidu.dom.element.remove(I, this.document);
                D.select()
            }
        } : function () {
            var D = this.startContainer;
            if (this.collapsed && baidu.isElement(D) && !baidu.dom.element.getChildCount(D)) {
                baidu.dom.element.append(D, this.document.createTextNode(""))
            }
            var E = this.document.createRange();
            E.setStart(D, this.startOffset);
            try {
                E.setEnd(this.endContainer, this.endOffset)
            } catch (F) {
                if (F.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                    this.collapse(true);
                    E.setEnd(this.endContainer, this.endOffset)
                } else {
                    throw (F)
                }
            }
            var C = baidu.dom.getWindow(this.document).getSelection();
            C.removeAllRanges();
            C.addRange(E)
        }, createBookmark: function (F) {
            var E, C;
            var D;
            var G;
            E = this.document.createElement("span");
            baidu.dom.element.setAttr(E, "_BaiduEditor_bm", 1);
            baidu.dom.element.setStyle(E, "display", "none");
            E.innerHTML = "&nbsp;";
            if (F) {
                D = "_BaiduEditor_bm" + Math.floor(Math.random() * 2147483648).toString(36);
                baidu.dom.element.setAttr(E, "id", D + "S")
            }
            if (!this.collapsed) {
                C = baidu.dom.clone(E);
                C.innerHTML = "&nbsp;";
                if (F) {
                    baidu.dom.element.setAttr(C, "id", D + "E")
                }
                G = this.clone();
                G.collapse();
                G.insertNode(C)
            }
            G = this.clone();
            G.collapse(true);
            G.insertNode(E);
            if (C) {
                this.setStartAfter(E);
                this.setEndBefore(C)
            } else {
                this.moveToPosition(E, POSITION_AFTER_END)
            }
            return {startNode: F ? D + "S" : E, endNode: F ? D + "E" : C, serializable: F}
        }, moveToPosition: function (D, C) {
            this.setStartAt(D, C);
            this.collapse(true)
        }, createBookmark2: function (I) {
            var G = this.startContainer, H = this.endContainer;
            var C = this.startOffset, E = this.endOffset;
            var J, F;
            if (!G || !H) {
                return {start: 0, end: 0}
            }
            if (I) {
                if (baidu.isElement(G)) {
                    J = baidu.dom.element.getChild(G, C);
                    if (J && baidu.isText(J) && C > 0 && baidu.isText(baidu.dom.getPrevious(J))) {
                        G = J;
                        C = 0
                    }
                }
                while (baidu.isText(G) && (F = baidu.dom.getPrevious(G)) && baidu.isText(F)) {
                    G = F;
                    C += baidu.dom.text.getLength(F)
                }
                if (!this.isCollapsed) {
                    if (baidu.isElement(H)) {
                        J = baidu.dom.element.getChild(H, E);
                        if (J && baidu.isText(J) && E > 0 && baidu.isText(baidu.dom.getPrevious(J))) {
                            H = J;
                            E = 0
                        }
                    }
                    while (baidu.isText(H) && (F = baidu.dom.getPrevious(H)) && baidu.isText(F)) {
                        H = F;
                        E += baidu.dom.text.getLength(F)
                    }
                }
            }
            var D = baidu.dom.getAddress(G, this.document, I);
            return {
                start: D,
                end: this.isCollapsed ? D : baidu.dom.getAddress(H, this.document, I),
                startOffset: C,
                endOffset: E,
                normalized: I,
                is2: true
            }
        }, moveToBookmark: function (H) {
            if (H.is2) {
                var I = baidu.dom.getByAddress(this.document, H.start, H.normalized), D = H.startOffset;
                var J = H.end && baidu.dom.getByAddress(this.document, H.end, H.normalized), F = H.endOffset;
                this.setStart(I, D);
                if (J) {
                    this.setEnd(J, F)
                } else {
                    this.collapse(true)
                }
            } else {
                var G = H.serializable, E = G ? this.document.getElementById(H.startNode) : H.startNode, C = G ? this.document.getElementById(H.endNode) : H.endNode;
                this.setStartBefore(E);
                baidu.dom.element.remove(E, this.document);
                if (C) {
                    this.setEndBefore(C);
                    baidu.dom.element.remove(C, this.document)
                } else {
                    this.collapse(true)
                }
            }
        }, setStart: function (D, C) {
            this.startContainer = D;
            this.startOffset = C;
            if (!this.endContainer) {
                this.endContainer = D;
                this.endOffset = C
            }
            B(this)
        }, setEnd: function (C, D) {
            this.endContainer = C;
            this.endOffset = D;
            if (!this.startContainer) {
                this.startContainer = C;
                this.startOffset = D
            }
            B(this)
        }, setStartBefore: function (C) {
            this.setStart(baidu.dom.getParent(C), baidu.dom.getIndex(C))
        }, setStartAfter: function (C) {
            this.setStart(baidu.dom.getParent(C), baidu.dom.getIndex(C) + 1)
        }, setEndAfter: function (C) {
            this.setEnd(baidu.dom.getParent(C), baidu.dom.getIndex(C) + 1)
        }, setEndBefore: function (C) {
            this.setEnd(baidu.dom.getParent(C), baidu.dom.getIndex(C))
        }, setStartAt: function (D, C) {
            switch (C) {
                case POSITION_AFTER_START:
                    this.setStart(D, 0);
                    break;
                case POSITION_BEFORE_END:
                    if (baidu.isText(D)) {
                        this.setStart(D, baidu.dom.text.getLength(D))
                    } else {
                        this.setStart(D, baidu.dom.element.getChildCount(D))
                    }
                    break;
                case POSITION_BEFORE_START:
                    this.setStartBefore(D);
                    break;
                case POSITION_AFTER_END:
                    this.setStartAfter(D)
            }
            B(this)
        }, setEndAt: function (D, C) {
            switch (C) {
                case POSITION_AFTER_START:
                    this.setEnd(D, 0);
                    break;
                case POSITION_BEFORE_END:
                    if (baidu.isText(D)) {
                        this.setEnd(D, baidu.dom.text.getLength(D))
                    } else {
                        this.setEnd(D, baidu.dom.element.getChildCount(D))
                    }
                    break;
                case POSITION_BEFORE_START:
                    this.setEndBefore(D);
                    break;
                case POSITION_AFTER_END:
                    this.setEndAfter(D)
            }
            B(this)
        }, getCommonAncestor: function (D, F) {
            var G = this.startContainer, C = this.endContainer, E;
            if (G === C) {
                if (D && baidu.isElement(G) && this.startOffset == this.endOffset - 1) {
                    E = baidu.dom.element.getChild(G, this.startOffset)
                } else {
                    E = G
                }
            } else {
                E = baidu.dom.getCommonAncestor(G, C)
            }
            return F && !baidu.isElement(E) ? baidu.dom.getParent(E) : E
        }, optimizeBookmark: function () {
            var D = this.startContainer, C = this.endContainer;
            if (baidu.isElement(D) && baidu.dom.element.is(D, "span") && baidu.dom.element.hasAttribute(D, "_BaiduEditor_bm")) {
                this.setStartAt(D, POSITION_BEFORE_START)
            }
            if (C && baidu.isElement(C) && baidu.dom.element.is(C, "span") && baidu.dom.element.hasAttribute(C, "_BaiduEditor_bm")) {
                this.setEndAt(C, POSITION_AFTER_END)
            }
        }, trim: function (F, I) {
            var G = this.startContainer, C = this.startOffset, J = this.collapsed;
            if ((!F || J) && G && baidu.isText(G)) {
                if (!C) {
                    C = baidu.dom.getIndex(G);
                    G = baidu.dom.getParent(G)
                } else {
                    if (C >= baidu.dom.text.getLength(G)) {
                        C = baidu.dom.getIndex(G) + 1;
                        G = baidu.dom.getParent(G)
                    } else {
                        var E = baidu.dom.text.split(G, C, this.document);
                        C = baidu.dom.getIndex(G) + 1;
                        G = baidu.dom.getParent(G);
                        if (!J && this.startContainer === this.endContainer) {
                            this.setEnd(E, this.endOffset - this.startOffset)
                        }
                    }
                }
                this.setStart(G, C);
                if (J) {
                    this.collapse(true)
                }
            }
            var H = this.endContainer;
            var D = this.endOffset;
            if (!(I || J) && H && baidu.isText(H)) {
                if (!D) {
                    D = baidu.dom.getIndex(H);
                    H = baidu.dom.getParent(H)
                } else {
                    if (D >= baidu.dom.text.getLength(H)) {
                        D = baidu.dom.getIndex(H) + 1;
                        H = baidu.dom.getParent(H)
                    } else {
                        baidu.dom.text.split(H, D, this.document);
                        D = baidu.dom.getIndex(H) + 1;
                        H = baidu.dom.getParent(H)
                    }
                }
                this.setEnd(H, D)
            }
        }, insertNode: function (F) {
            this.optimizeBookmark();
            this.trim(false, true);
            var E = this.startContainer;
            var D = this.startOffset;
            var C = baidu.dom.element.getChild(E, D);
            if (C) {
                C.parentNode.insertBefore(F, C)
            } else {
                E.appendChild(F)
            }
            if (baidu.dom.getParent(F) === this.endContainer) {
                this.endOffset++
            }
            this.setStartBefore(F)
        }, getTouchedStartNode: function () {
            var C = this.startContainer;
            if (this.collapsed || !baidu.isElement(C)) {
                return C
            }
            return baidu.dom.element.getChild(C, this.startOffset) || C
        }, getTouchedEndNode: function () {
            var C = this.endContainer;
            if (this.collapsed || !baidu.isElement(C)) {
                return C
            }
            return baidu.dom.element.getChild(this.endOffset - 1) || C
        }, optimize: function () {
            var C = this.startContainer;
            var D = this.startOffset;
            if (!baidu.isElement(C)) {
                if (!D) {
                    this.setStartBefore(C)
                } else {
                    if (D >= baidu.dom.text.getLength(C)) {
                        this.setStartAfter(C)
                    }
                }
            }
            C = this.endContainer;
            D = this.endOffset;
            if (!baidu.isElement(C)) {
                if (!D) {
                    this.setEndBefore(C)
                } else {
                    if (D >= baidu.dom.text.getLength(C)) {
                        this.setEndAfter(C)
                    }
                }
            }
        }, walk: function (L) {
            var E = this.startContainer, H = this.startOffset, M = this.endContainer, I = this.endOffset, K = [{
                n: baidu.firefox && this.startContainer.nodeName.toUpperCase() == "TR" ? baidu.dom.getParent(this.getCommonAncestor(0, 1)) : this.getCommonAncestor(0, 1),
                i: 0
            }], G, J = false;

            function D(P, O, N) {
                try {
                    if (J == -1 && !baidu.dom.element.contains(P, E)) {
                        J = true
                    }
                    if (!J && (baidu.dom.getParent(P) == E && O == H)) {
                        J = true
                    }
                    if (baidu.isText(P) && P == E) {
                        if (baidu.dom.text.getLength(P) == H) {
                            J = -1
                        } else {
                            if (!J) {
                                J = true
                            }
                        }
                    }
                    if (!N) {
                        return
                    }
                    if (baidu.isText(P) && P == M && I == 0) {
                        J = false
                    }
                    if (J == true || (J == -2 && P == M)) {
                        L(P)
                    }
                    if (baidu.dom.getParent(P) == M && O + 1 == I) {
                        J = -2
                    }
                    if (baidu.isText(P) && P == M) {
                        J = false
                    }
                } catch (Q) {
                }
            }

            while (G = K.pop()) {
                var C = G.n, F = cri = G.i;
                D(C, cri, false);
                while (C.childNodes[cri] != undefined) {
                    K.push({n: C, i: cri});
                    C = C.childNodes[cri];
                    D(C, cri, false);
                    F = cri;
                    cri = 0
                }
                D(C, F, true);
                if (K.length) {
                    K[K.length - 1].i++
                }
            }
        }, dispose: function () {
            for (var C in this) {
                if (typeof this[C] != "function") {
                    delete this[C]
                }
            }
        }
    }
})();
var SELECTION_NONE = 0;
var SELECTION_TEXT = 2;
var SELECTION_CONTROL = 3;
var styleObjectElements = {
    img: 1,
    hr: 1,
    li: 1,
    table: 1,
    tr: 1,
    td: 1,
    embed: 1,
    object: 1,
    ol: 1,
    ul: 1,
    a: 1,
    input: 1,
    form: 1,
    select: 1,
    textarea: 1,
    button: 1,
    fieldset: 1,
    th: 1,
    thead: 1,
    tfoot: 1
};
baidu.editor.Editor.prototype.getSelection = function () {
    var B = this;
    if (!B.selection) {
        var A = B.document;
        B.selection = {
            getNative: baidu.ie ? function () {
                return A.selection
            } : function () {
                return baidu.dom.getWindow(A).getSelection()
            }, getNativeRange: function () {
                if (baidu.ie) {
                    var C = this.getNative(), D = C.createRange();
                    if (C.type.toUpperCase() != "CONTROL" && baidu.dom.getDocument(D.parentElement()) != B.document) {
                        range = B.ieBakRange;
                        if (range) {
                            return range
                        }
                    }
                    return D
                } else {
                    throw new Error("[baidu.editor.selection.getNativeRange] only support ie now!")
                }
            }, getType: baidu.ie ? function () {
                var C = SELECTION_NONE;
                try {
                    var E = this.getNative(), F = E.type;
                    if (E.createRange().parentElement) {
                        C = SELECTION_TEXT
                    }
                    if (F.toUpperCase() != "CONTROL" && baidu.dom.getDocument(E.createRange().parentElement()) != B.document) {
                        if (!B.ieBakRange) {
                            return SELECTION_NONE
                        }
                        F = B.ieBakRangeType
                    }
                    if (F == "Text") {
                        C = SELECTION_TEXT
                    }
                    if (F == "Control") {
                        C = SELECTION_CONTROL
                    }
                } catch (D) {
                }
                return C
            } : function () {
                var D = SELECTION_TEXT;
                var F = this.getNative();
                if (!F) {
                    D = SELECTION_NONE
                } else {
                    if (F.rangeCount == 1) {
                        var C = F.getRangeAt(0), E = C.startContainer;
                        if (E == C.endContainer && E.nodeType == 1 && (C.endOffset - C.startOffset) == 1 && styleObjectElements[E.childNodes[C.startOffset].nodeName.toLowerCase()]) {
                            D = SELECTION_CONTROL
                        }
                    }
                }
                return D
            }, getRanges: baidu.ie ? (function () {
                var C = function (I, E) {
                    I = I.duplicate();
                    I.collapse(E);
                    var K = I.parentElement();
                    var F = K.firstChild;
                    var G, H = 0;
                    while (F) {
                        if (F.nodeType == 1) {
                            G = I.duplicate();
                            G.moveToElementText(F);
                            G.collapse();
                            var L = G.compareEndPoints("StartToStart", I);
                            if (L > 0) {
                                break
                            } else {
                                if (L === 0) {
                                    return {container: K, offset: H}
                                }
                            }
                            G = null
                        }
                        F = F.nextSibling;
                        H++
                    }
                    if (!G) {
                        G = I.duplicate();
                        G.moveToElementText(K);
                        G.collapse(false)
                    }
                    G.setEndPoint("StartToStart", I);
                    var D = G.text.length;
                    var J = K.childNodes;
                    while (D > 0 && H--) {
                        F = J[H];
                        D -= F.nodeValue ? F.nodeValue.length : 0
                    }
                    if (D === 0) {
                        return {container: K, offset: H}
                    } else {
                        if (D > 0) {
                            return {container: K, offset: 0}
                        } else {
                            return {container: J[H], offset: -D}
                        }
                    }
                };
                return function () {
                    var F = this.getNative(), K = F && F.createRange(), L = this.getType(), J;
                    if (!F) {
                        return []
                    }
                    if (L != SELECTION_CONTROL && F.createRange().parentElement().ownerDocument != B.document) {
                        K = B.ieBakRange;
                        if (!K) {
                            return []
                        }
                        L = B.ieBakRangeType.toUpperCase() == "CONTROL" ? SELECTION_CONTROL : (B.ieBakRangeType.toUpperCase() == "TEXT" ? SELECTION_TEXT : SELECTION_NONE)
                    }
                    if (L === SELECTION_TEXT) {
                        J = this.createRange();
                        var D = C(K, true);
                        J.setStart(D.container, D.offset);
                        D = C(K);
                        J.setEnd(D.container, D.offset);
                        return [J]
                    } else {
                        if (L == SELECTION_CONTROL) {
                            var E = [];
                            for (var H = 0; H < K.length; H++) {
                                var I = K.item(H), M = I.parentNode, G = 0;
                                J = this.createRange();
                                for (; G < M.childNodes.length && M.childNodes[G] != I; G++) {
                                }
                                J.setStart(M, G);
                                J.setEnd(M, G + 1);
                                E.push(J)
                            }
                            return E
                        }
                    }
                    return []
                }
            })() : function () {
                var C = [];
                var G = this.getNative();
                if (!G) {
                    return []
                }
                for (var E = 0; E < G.rangeCount; E++) {
                    var F = G.getRangeAt(E);
                    var D = this.createRange();
                    D.setStart(F.startContainer, F.startOffset);
                    D.setEnd(F.endContainer, F.endOffset);
                    C.push(D)
                }
                return C
            }, createRange: function () {
                return new baidu.editor.Range(A)
            }, selectRanges: function (C) {
                if (baidu.ie) {
                    if (C[0]) {
                        C[0].select()
                    }
                } else {
                    var G = this.getNative();
                    G.removeAllRanges();
                    for (var E = 0; E < C.length; E++) {
                        var D = C[E];
                        var F = A.createRange();
                        F.setStart(D.startContainer, D.startOffset);
                        F.setEnd(D.endContainer, D.endOffset);
                        G.addRange(F)
                    }
                }
            }, setCursor: function (E, C) {
                var D = this.createRange(A);
                D.setStartAt(E, C);
                D.collapse(true);
                this.selectRanges([D])
            }, selectElement: function (C) {
                var D = this;
                if (baidu.ie) {
                    D.getNative().empty();
                    try {
                        range = A.body.createControlRange();
                        range.addElement(C);
                        range.select()
                    } catch (F) {
                        range = A.body.createTextRange();
                        range.moveToElementText(C);
                        range.select()
                    }
                } else {
                    range = A.createRange();
                    range.selectNode(C);
                    var E = D.getNative();
                    E.removeAllRanges();
                    E.addRange(range)
                }
            }, pasteElements: function (F, C) {
                var E = this;
                range = E.getRanges()[0];
                range.deleteContents();
                for (var D = F.length - 1; D >= 0; D--) {
                    range.insertNode(F[D])
                }
                if (C) {
                    range.setStartBefore(F[F.length - 1]);
                    range.setEndAfter(F[0]);
                    range.select()
                } else {
                    E.setCursor(F[F.length - 1], 4)
                }
            }, pasteElement: function (E, D) {
                var F = this, C = F.getRanges()[0];
                C.deleteContents();
                C.insertNode(E);
                if (D) {
                    B.selection.selectElement(E)
                } else {
                    F.setCursor(E, 4)
                }
            }, getText: function (C) {
                if (baidu.ie) {
                    var D = B.document.selection.createRange(), E = C ? D.text : baidu.trim(D.text);
                    return E.replace("\r\n", "")
                } else {
                    var D = B.window.getSelection().getRangeAt(0), E = C ? D.toString() : baidu.trim(D.toString());
                    return E.replace("\n", "")
                }
            }, getTextNodes: function () {
                var E = this;
                var C = E.getRanges();
                var F = [];
                for (var D = 0; D < C.length; D++) {
                    C[D].walk(function (G) {
                        if (G.nodeType == 3) {
                            F.push(G)
                        }
                    })
                }
                return F
            }, getSelectedElement: function () {
                var D;
                if (this.getType() == SELECTION_CONTROL) {
                    var E = this.getNative();
                    if (baidu.ie) {
                        try {
                            D = E.createRange().item(0)
                        } catch (F) {
                        }
                    } else {
                        var C = E.getRangeAt(0);
                        D = C.startContainer.childNodes[C.startOffset]
                    }
                }
                return D
            }
        }
    }
    return B.selection
};
baidu.editor.Editor.prototype.undo = function () {
    this.execCommand("Undo")
};
baidu.editor.Editor.prototype.redo = function () {
    this.execCommand("Redo")
};
(function () {
    function B(E) {
        var D = this;
        D.editor = E;
        E.addEventListener("onneedsavescene", function (F) {
            D.save(false)
        })
    }

    B.prototype.undoList = [];
    B.prototype.undoIndex = 0;
    B.prototype.getScene = function () {
        var F = {bookmarks: []};
        var D = this.editor.getSelection().getRanges();
        for (var E = D.length - 1; E >= 0; E--) {
            if (D[E]) {
                F.bookmarks.push(D[E].createBookmark2(true))
            } else {
                F.bookmarks.push(false)
            }
        }
        F.content = this.editor.getContent();
        return F
    };
    B.prototype.applyScene = function (G) {
        if (!G) {
            return
        }
        this.editor.setContent(G.content);
        var D = [];
        for (var F = G.bookmarks.length - 1; F >= 0; F--) {
            if (G.bookmarks[F]) {
                var E = this.editor.getSelection().createRange();
                E.moveToBookmark(G.bookmarks[F]);
                D.push(E)
            }
        }
        this.editor.getSelection().selectRanges(D);
        this.undoIndex = G.index;
        this.currentScene = G;
        this.fireChange()
    };
    B.prototype.save = function (E, G, H) {
        var F = this.currentScene;
        if (!G) {
            G = this.getScene()
        }
        if (E && F && F.content == G.content) {
            return
        }
        this.undoList = this.undoList.slice(0, this.undoIndex + 1);
        this.undoList.push(G);
        var D = this.undoList.length;
        if (D > baidu.editor.EditorConfig.maxUndoCount) {
            this.undoList = this.undoList.slice(D - baidu.editor.EditorConfig.maxUndoCount, D)
        }
        this.undoIndex = this.undoList.length - 1;
        this.currentScene = G;
        if (H !== false) {
            this.fireChange()
        }
        return true
    };
    B.prototype.getNextScene = function (E) {
        var D = this.undoList, G = this.currentScene, H, F;
        if (G) {
            if (E) {
                for (F = this.undoIndex - 1; F >= 0; F--) {
                    H = D[F];
                    if (G.content != H.content) {
                        H.index = F;
                        return H
                    }
                }
            } else {
                for (F = this.undoIndex + 1; F < D.length; F++) {
                    H = D[F];
                    if (G.content != H.content) {
                        H.index = F;
                        return H
                    }
                }
            }
        }
        return null
    };
    B.prototype.fireChange = function () {
        this.hasUndo = !!this.getNextScene(true);
        this.hasRedo = !!this.getNextScene(false);
        this.resetType()
    };
    B.prototype.resetType = function () {
        this.typing = false;
        delete this.lastKeystroke;
        this.typesCount = 0;
        this.modifiersCount = 0
    };
    baidu.editor.register(function (F) {
        var E = new B(F);
        F.undoMan = E;
        function D(I) {
            var I = F.window.event || I;
            var H = I.keyCode || I.which;
            modifierCodes = {
                8: 1,
                46: 1
            }, isModifier = H in modifierCodes, wasModifier = E.lastKeyCode in modifierCodes, lastWasSameModifier = isModifier && H == E.lastKeyCode, resetTypingCodes = {
                37: 1,
                38: 1,
                39: 1,
                40: 1
            }, isReset = H in resetTypingCodes, wasReset = E.lastKeyCode in resetTypingCodes, isContent = (!isModifier && !isReset), modifierSnapshot = (isModifier && !lastWasSameModifier), startedTyping = !E.typing || (isContent && (wasModifier || wasReset));
            if (startedTyping || modifierSnapshot) {
                var G = E.getScene();

                function J() {
                    var K = F.getContent();
                    if (G.content != K) {
                        if (!E.save(true, G, false)) {
                            E.undoList = E.undoList.slice(0, E.undoIndex + 1)
                        }
                        E.hasUndo = true;
                        E.hasRedo = false;
                        E.typesCount = 1;
                        E.modifiersCount = 1
                    }
                }

                setTimeout(function () {
                    J()
                }, 0)
            }
            E.lastKeyCode = H;
            if (isModifier) {
                E.typesCount = 0;
                E.modifiersCount++;
                if (E.modifiersCount > 25) {
                    E.save(true);
                    E.modifiersCount = 1
                }
            } else {
                if (!isReset) {
                    E.modifiersCount = 0;
                    E.typesCount++;
                    if (E.typesCount > 25) {
                        E.save(true);
                        E.typesCount = 1
                    }
                }
            }
            E.typing = true
        }

        F.addEventListener("onkeydown", D, false);
        F.addEventListener("onbeforeexeccommand", function (G) {
            if (!G.target.topOpearation || G.target.command == "Undo" || G.target.command == "Redo") {
                return
            }
            E.save(false)
        });
        F.addEventListener("onafterexeccommand", function (G) {
            if (!G.target.topOpearation || G.target.command == "Undo" || G.target.command == "Redo") {
                return
            }
            E.save(false)
        });
        E.save(true)
    });
    function C(D) {
        if (!D.undoMan.hasUndo) {
            return
        }
        if (D.undoMan.undoIndex == D.undoMan.undoList.length - 1) {
            D.undoMan.save(false)
        }
        D.undoMan.applyScene(D.undoMan.getNextScene(true))
    }

    function A(D) {
        if (!D.undoMan.hasRedo) {
            return
        }
        if (D.undoMan.undoIndex == D.undoMan.undoList.length - 1) {
            return
        }
        D.undoMan.applyScene(D.undoMan.getNextScene(false))
    }

    baidu.editor.registCommand("Undo", function (D) {
        C(D)
    });
    baidu.editor.registCommand("Redo", function (D) {
        A(D)
    });
    baidu.editor.registQuery("Undo", function (D) {
        return D.undoMan.hasUndo
    });
    baidu.editor.registQuery("Redo", function (D) {
        return D.undoMan.hasRedo
    })
})();
baidu.editor.Editor.prototype.bold = function () {
    this.execCommand("Bold");
    this.dispatchEvent(new baidu.BaseEvent("onbold"))
};
(function () {
    var J = {};
    var H = 1, B = 2, G = 3, E = 4, F = 5, I = 6;

    function K(N, M, L) {
        var O = this;
        O.context = M, O.range = L;
        O.nodeInRange = function (P) {
            O.context.contains.push(P);
            var Q = P.lastChild;
            while (Q) {
                O.context.contains.push(Q);
                Q = Q.previousSibling
            }
        };
        O.nodePartlyInRange = function (P, Q) {
            O.context.partlyContains.push(P);
            if (Q) {
                var R = P.lastChild;
                while (R) {
                    if (O.process(R) == E) {
                        break
                    }
                    R = R.previousSibling
                }
            } else {
                var R = P.firstChild;
                while (R) {
                    if (O.process(R) == G) {
                        break
                    }
                    R = R.nextSibling
                }
            }
        };
        O.rangeInNode = function (T, U, Q) {
            if (O.context.parents[0] != T) {
                O.context.parents.unshift(T)
            }
            var P = Math.floor((Q + U) / 2);
            while (Q >= U) {
                var S = T.childNodes[P], R = O.compareRangeWithNode(S, L);
                if (R == G) {
                    Q = P - 1
                } else {
                    if (R == E) {
                        U = P + 1
                    } else {
                        if (R == I) {
                            O.rangeInNode(S, 0, S.childNodes.length - 1);
                            break
                        } else {
                            if (R == F) {
                                O.nodeInRange(S);
                                if (U <= P - 1) {
                                    O.rangeInNode(T, U, P - 1)
                                }
                                if (P + 1 <= Q) {
                                    O.rangeInNode(T, P + 1, Q)
                                }
                                break
                            } else {
                                if (R == H) {
                                    O.nodePartlyInRange(S, true);
                                    U = P + 1
                                } else {
                                    if (R == B) {
                                        O.nodePartlyInRange(S, false);
                                        Q = P - 1
                                    }
                                }
                            }
                        }
                    }
                }
                P = Math.floor((Q + U) / 2)
            }
        };
        O.process = function (P) {
            var Q = O.compareRangeWithNode(P, O.range);
            if (Q == F) {
                O.nodeInRange(P)
            } else {
                if (Q == H || Q == B) {
                    O.nodePartlyInRange(P, Q == H)
                } else {
                    if (Q == I) {
                        O.rangeInNode(P, 0, P.childNodes.length - 1)
                    }
                }
            }
            return Q
        };
        O.compareRangeWithNode = function (U, Q) {
            if (baidu.ie) {
                var T = N.document.body.createTextRange();
                if (U.nodeType == 1) {
                    T.moveToElementText(U)
                } else {
                    var R = N.document.createElement("a");
                    U.parentNode.insertBefore(R, U);
                    var a = N.document.body.createTextRange();
                    a.moveToElementText(R);
                    R.parentNode.removeChild(R);
                    T.setEndPoint("StartToStart", a);
                    R = N.document.createElement("a");
                    U.parentNode.insertBefore(R, U.nextSibling);
                    var a = N.document.body.createTextRange();
                    a.moveToElementText(R);
                    R.parentNode.removeChild(R);
                    T.setEndPoint("EndToStart", a)
                }
                var S = Q.compareEndPoints("StartToStart", T), Y = Q.compareEndPoints("EndToStart", T), P = Q.compareEndPoints("StartToEnd", T), V = Q.compareEndPoints("EndToEnd", T)
            } else {
                var Z = N.document.createRange();
                if (baidu.isText(U) && U.parentNode.childNodes.length == 1) {
                    U = U.parentNode
                }
                Z.selectNode(U);
                var X = N.document.createRange();
                X.selectNodeContents(U);
                var W;
                var S = (W = Q.compareBoundaryPoints(Range.START_TO_START, Z)) == Q.compareBoundaryPoints(Range.START_TO_START, X) ? W : 0, P = (W = Q.compareBoundaryPoints(Range.END_TO_START, Z)) == Q.compareBoundaryPoints(Range.END_TO_START, X) ? W : 0, Y = (W = Q.compareBoundaryPoints(Range.START_TO_END, Z)) == Q.compareBoundaryPoints(Range.START_TO_END, X) ? W : 0, V = (W = Q.compareBoundaryPoints(Range.END_TO_END, Z)) == Q.compareBoundaryPoints(Range.END_TO_END, X) ? W : 0
            }
            if (S <= 0 && V >= 0) {
                return F
            }
            if (S >= 0 && V <= 0) {
                return I
            }
            if (S * Y == -1) {
                return B
            }
            if (P * V == -1) {
                return H
            }
            if (S <= 0 && Y <= 0) {
                return G
            }
            if (P >= 0 && V >= 0) {
                return E
            }
        }
    }

    J.w3cParser = function (Q) {
        function R(T) {
            if (T.startContainer.nodeType == 3 && T.startContainer.nodeValue.length == T.startOffset) {
                T.setStartAfter(T.startContainer)
            }
            if (T.endContainer.nodeType == 3 && T.endOffset == 0) {
                T.setEndBefore(T.endContainer)
            }
            return T
        }

        var S = new Array(), P = Q.window.getSelection();
        for (var N = 0; N < P.rangeCount; N++) {
            var L = R(P.getRangeAt(N));
            context = {parents: [], collapsed: false, contains: [], partlyContains: []};
            if (L.collapsed) {
                context.collapsed = true;
                var O = L.startContainer;
                do {
                    context.parents.push(O);
                    O = O.parentNode
                } while (O.parentNode && O.nodeName != "HTML")
            } else {
                var M = L.commonAncestorContainer, O = baidu.isText(M) ? baidu.dom.getParent(M) : M;
                do {
                    context.parents.push(O);
                    O = O.parentNode
                } while (O.parentNode && O.nodeName != "HTML");
                (new K(Q, context, L)).process(M)
            }
            S.push(context)
        }
        return S
    };
    J.ieParser = function (P) {
        var M = "CONTROL", O = P.document.selection, N = O.type, L, Q = [{
            collapsed: [],
            parents: [],
            contains: [],
            partlyContains: []
        }];
        if (N.toUpperCase() != M && O.createRange().parentElement().ownerDocument != P.document) {
            L = P.ieBakRange;
            if (!L) {
                return Q
            }
            N = P.ieBakRangeType
        } else {
            L = O.createRange()
        }
        if (N.toUpperCase() == M) {
            return C(P, L)
        } else {
            return A(P, L)
        }
    };
    function C(P, M) {
        var Q = M.commonParentElement(), O = P.document.selection, N = {
            collapsed: false,
            parents: [],
            contains: [],
            partlyContains: []
        };
        do {
            N.parents.push(Q);
            Q = Q.parentNode
        } while (Q.nodeName.toUpperCase() != "HTML");
        var L = [];
        L.push(M.item(0));
        while (L.length > 0) {
            var Q = L.pop(), R = Q.lastChild;
            while (R) {
                L.push(R);
                R = R.previousSibling
            }
            N.contains.push(Q)
        }
        return [N]
    }

    function A(M, L) {
        var O = new Array();
        context = {collapsed: false, parents: [], contains: [], partlyContains: []};
        if (D(L)) {
            context.collapsed = true
        }
        O.push(context);
        var N = L.parentElement();
        do {
            context.parents.push(N);
            N = N.parentNode
        } while (N.nodeName.toUpperCase() != "HTML");
        (new K(M, context, L)).process(L.parentElement());
        return O
    }

    function D(M) {
        try {
            var L = M.duplicate(), O = M.duplicate();
            L.collapse(true);
            O.collapse(false);
            return L.inRange(O)
        } catch (N) {
            return false
        }
    }

    baidu.editor.Editor.prototype.getContexts = function () {
        var N = this;
        if (!N.contextParserInit) {
            function L() {
                var O;
                if (baidu.ie) {
                    O = J.ieParser(N)
                } else {
                    O = J.w3cParser(N)
                }
                if (O) {
                    N.contextsInfo = O
                }
            }

            N.addEventListener("onbeforeselectionchange", function (O) {
                L()
            });
            L();
            N.contextParserInit = true
        }
        if (!N.contextsObj) {
            N.contextsObj = {
                containNode: function (U, V) {
                    function O(g, a, c) {
                        var Y = [], f = -1;
                        for (var Z = a.length - 1; Z >= 0; Z--) {
                            Y = Y.concat(a[Z])
                        }
                        a = Y;
                        if (!a) {
                            return f
                        }
                        for (var Z = a.length - 1; Z >= 0; Z--) {
                            var b = a[Z];
                            try {
                                if (b.ownerDocument != N.document) {
                                    continue
                                }
                            } catch (d) {
                                continue
                            }
                            if (baidu.isText(b)) {
                                if (baidu.trim(b.nodeValue)) {
                                    b = baidu.dom.getParent(b)
                                }
                            }
                            if (!b) {
                                continue
                            }
                            if (c.toLowerCase().indexOf("," + b.nodeName.toLowerCase() + ",") != -1) {
                                continue
                            }
                            if (g.toLowerCase().indexOf("," + b.nodeName.toLowerCase() + ",") == -1) {
                                if (f == 1) {
                                    return 2
                                }
                                f = 0
                            } else {
                                if (f == 0) {
                                    return 2
                                }
                                f = 1
                            }
                        }
                        return f
                    }

                    U = "," + U + ",";
                    V = "," + V + ",";
                    var Q = this;
                    var S = false, T = false;
                    for (var R = Q.contains.length - 1; R >= 0; R--) {
                        if (Q.contains[R].length) {
                            S = true
                        }
                        if (Q.partlyContains[R].length) {
                            T = true
                        }
                    }
                    if (S || T) {
                        var X = O(U, Q.contains, V), W = O(U, Q.partlyContains, V);
                        if ((W == 2) && (X == -1 || X == 0)) {
                            return 2
                        }
                        if ((W != -1 || X != -1) && (X == 1 || X == -1) && (W == 1 || W == -1)) {
                            return 1
                        }
                        if (W > 0 || X > 0) {
                            return 2
                        }
                    }
                    var P = O(U, Q.parents, V);
                    if (P == 2 || P == 1) {
                        return 3
                    }
                    return 0
                }, walkTextNode: function (Q) {
                    var T = this, O = [];

                    function P(W) {
                        for (var V = W.length - 1; V >= 0; V--) {
                            for (var U = W[V].length - 1; U >= 0; U--) {
                                if (baidu.isText(W[V][U]) && baidu.trim(W[V][U].nodeValue)) {
                                    O.push(W[V][U])
                                }
                            }
                        }
                    }

                    P(T.contains);
                    P(T.partlyContains);
                    for (var R = T.parents.length - 1; R >= 0; R--) {
                        try {
                            if (T.parents[R][0].ownerDocument != N.document) {
                                continue
                            }
                        } catch (S) {
                            continue
                        }
                        if (baidu.isText(T.parents[R][0]) && baidu.trim(T.parents[R][0].nodeValue)) {
                            O.push(T.parents[R][0])
                        }
                    }
                    for (var R = O.length - 1; R >= 0; R--) {
                        Q(O[R])
                    }
                }
            }
        }
        N.contextsObj.collapsed = [];
        N.contextsObj.parents = [];
        N.contextsObj.contains = [];
        N.contextsObj.partlyContains = [];
        for (var M = N.contextsInfo.length - 1; M >= 0; M--) {
            N.contextsObj.collapsed.push(N.contextsInfo[M].collapsed);
            N.contextsObj.parents.push(N.contextsInfo[M].parents);
            N.contextsObj.contains.push(N.contextsInfo[M].contains);
            N.contextsObj.partlyContains.push(N.contextsInfo[M].partlyContains)
        }
        return N.contextsObj
    }
})();
baidu.getStyle = function (C, A) {
    if (C = baidu.G(C)) {
        var B = baidu.isString(A);
        A = B ? [A] : A;
        var G = [];
        var H = function (M, N) {
            return N.charAt(1).toUpperCase()
        };
        var J = function (M) {
            var Q = M.split(",");
            var P = "#", O;
            for (var N = 0; O = Q[N]; N++) {
                O = O.replace(/[^\d]/gi, "");
                O = parseInt(O, 10);
                O = O.toString(16);
                if (O.length == 1) {
                    O = "0" + O
                }
                P += O
            }
            return P.toUpperCase()
        };
        for (var F = 0, D; F < A.length; F = F + 1) {
            var E = A[F].replace(/(-[a-z])/gi, H);
            if ("float" == E) {
                E = baidu.isIE ? "styleFloat" : "cssFloat"
            }
            if ("opacity" == E && baidu.isIE) {
                var L = C.style.filter;
                D = L && L.indexOf("opacity=") >= 0 ? (parseFloat(L.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
            }
            if (D = C.style[E]) {
                G[F] = D
            } else {
                if (C.currentStyle) {
                    D = C.currentStyle[E]
                } else {
                    var I = C.nodeType == 9 ? C : C.ownerDocument || C.document;
                    if (I.defaultView && I.defaultView.getComputedStyle) {
                        var K = I.defaultView.getComputedStyle(C, "");
                        if (K) {
                            D = K[E]
                        }
                    }
                }
            }
            if (/color/i.test(E) && D.indexOf("rgb(") != -1) {
                D = J(D)
            }
            G[F] = D
        }
        if (B) {
            G = G[0]
        }
        return G
    }
};
baidu.editor.registParser("bold", function (A) {
    var B = -1;
    A.getContexts().walkTextNode(function (C) {
        var D = baidu.getStyle(baidu.dom.getParent(C), "font-weight");
        if (((parseInt(D) > 400 || D == "bold") && (C.parentNode.tagName.indexOf("H") !== 0)) && (B == -1 || B == 1)) {
            B = 1
        } else {
            B = 0
        }
    });
    if (B == -1) {
        B = 0
    }
    return B
});
baidu.editor.Editor.prototype.italic = function () {
    this.execCommand("Italic");
    this.dispatchEvent(new baidu.BaseEvent("onitalic"))
};
baidu.editor.registParser("italic", function (A) {
    var B = -1;
    A.getContexts().walkTextNode(function (C) {
        var D = baidu.getStyle(baidu.dom.getParent(C), "font-style");
        if (D == "italic" && (B == -1 || B == 1)) {
            B = 1
        } else {
            B = 0
        }
    });
    if (B == -1) {
        B = 0
    }
    return B
});
baidu.editor.Editor.prototype.underline = function () {
    this.execCommand("Underline");
    this.dispatchEvent(new baidu.BaseEvent("onunderline"))
};
baidu.editor.registParser("underline", function (A) {
    return A.getContexts().containNode("u")
});
baidu.editor.Editor.prototype.fontname = function (A) {
    this.execCommand("FontName", false, A);
    this.dispatchEvent(new baidu.BaseEvent("onfontname"))
};
(function () {
    baidu.editor.Editor.prototype.queryFontname = function () {
        var I = this;
        var B = I.getSelection().getRanges();
        var H = [];
        if (B.length == 1 && B[0].collapsed) {
            var G = B[0];
            var F = G.startContainer;
            while (F.nodeType == 3 && F.parentNode) {
                F = F.parentNode
            }
            var E = baidu.getStyle(F, "font-family");
            return A(E)
        }
        for (var C = 0; C < B.length; C++) {
            var G = B[C];
            G.walk(function (J) {
                if (J.nodeType == 3) {
                    H.push(J)
                }
            })
        }
        var E = null;
        for (var C = 0; C < H.length; C++) {
            var F = H[C];
            var D = A(baidu.getStyle(F.parentNode, "font-family"));
            if (D && E && D != E) {
                return null
            } else {
                if (E == null && D) {
                    E = D
                }
            }
        }
        return E
    };
    function A(B) {
        return B && B.replace(/\'/gi, "")
    }
})();
baidu.editor.Editor.prototype.fontsize = function (A) {
    this.window.focus();
    this.execCommand("FontSize", false, A);
    this.dispatchEvent(new baidu.BaseEvent("onfontsize"))
};
(function () {
    baidu.editor.Editor.prototype.queryFontsize = function () {
        var I = this;
        var D = I.getSelection().getRanges();
        var H = [];
        if (D.length == 1 && D[0].collapsed) {
            var G = D[0];
            var F = G.startContainer;
            while (F.nodeType == 3 && F.parentNode) {
                F = F.parentNode
            }
            var C = baidu.getStyle(F, "font-size");
            return A(C)
        }
        for (var E = 0; E < D.length; E++) {
            var G = D[E];
            G.walk(function (J) {
                if (J.nodeType == 3) {
                    H.push(J)
                }
            })
        }
        var C = null;
        for (var E = 0; E < H.length; E++) {
            var F = H[E];
            var B = A(baidu.getStyle(F.parentNode, "font-size"));
            if (B && C && B != C) {
                return null
            } else {
                if (C == null && B) {
                    C = B
                }
            }
        }
        return C
    };
    function A(C) {
        var D = {"10px": 1, "13px": 2, "16px": 3, "18px": 4, "24px": 5, "32px": 6, "48px": 7};
        var B = {"x-small": 1, small: 2, medium: 3, large: 4, "x-large": 5, "xx-large": 6, "-webkit-xxx-large": 7};
        if (!C) {
            return null
        } else {
            C = C.toLowerCase();
            if (C.indexOf("px") >= 0) {
                return D[C]
            } else {
                if (/^\d+/g.test(C)) {
                    return C
                } else {
                    return B[C]
                }
            }
        }
    }
})();
baidu.editor.Editor.prototype.foreColor = function (A) {
    this.execCommand("ForeColor", false, A);
    this.dispatchEvent(new baidu.BaseEvent("onforecolor"))
};
(function () {
    baidu.editor.Editor.prototype.queryForeColor = function () {
        var H = this, C = H.getSelection(), E = false, F = false, B = C.getRanges(), J = A || function (L) {
                return L
            };

        function K(M) {
            var L;
            while (M.parentNode && !(L = J(baidu.getStyle(M, "color")))) {
                M = M.parentNode
            }
            return L
        }

        if (B.length == 1 && B[0].collapsed) {
            var D = B[0].startContainer;
            if (baidu.isText(D)) {
                D = baidu.dom.getParent(D)
            }
            E = K(D)
        } else {
            var I = C.getTextNodes();
            for (var G = 0; G < I.length; G++) {
                var F = K(I[G]);
                if (F && E && F != E) {
                    return false
                } else {
                    if (!E && F) {
                        E = F
                    }
                }
            }
        }
        return E
    };
    function A(C) {
        var B = {
            aqua: "00FFFF",
            black: "000000",
            blue: "0000FF",
            fuchsia: "FF00FF",
            gray: "808080",
            green: "008000",
            lime: "00FF00",
            maroon: "800000",
            navy: "000080",
            olive: "808000",
            purple: "800080",
            red: "FF0000",
            silver: "C0C0C0",
            teal: "008080",
            white: "FFFFFF",
            yellow: "FFFF00",
            transparent: ""
        };
        if (B[C] == undefined) {
            return C
        }
        return B[C] ? "#" + B[C] : ""
    }
})();
baidu.editor.Editor.prototype.justifyLeft = function () {
    this.execCommand("JustifyLeft", false);
    this.dispatchEvent(new baidu.BaseEvent("onjustifyleft"))
};
baidu.editor.Editor.prototype.justifyCenter = function () {
    this.execCommand("JustifyCenter", false);
    this.dispatchEvent(new baidu.BaseEvent("onjustifycenter"))
};
baidu.editor.Editor.prototype.justifyRight = function () {
    this.execCommand("JustifyRight", false);
    this.dispatchEvent(new baidu.BaseEvent("onjustifyright"))
};
baidu.editor.Editor.prototype.insertImage = function (A) {
    this.execCommand("insertImage", A);
    this.dispatchEvent(new baidu.BaseEvent("oninsertimage"))
};
(function () {
    function B(E, C) {
        var D = E.document.createElement("IMG");
        D.src = C.src;
        if (C.width) {
            D.width = C.width
        }
        if (C.height) {
            D.height = C.height
        }
        E.getSelection().pasteElement(D, true)
    }

    function A(E) {
        var C = E.getSelection().getRanges()[0], D;
        D = C.startContainer;
        if (D.nodeName != "IMG") {
            D = baidu.dom.element.getChild(C.startContainer, C.startOffset)
        }
        if (D && D.nodeName == "IMG") {
            return {src: D.style.backgroundImage || D.src}
        }
    }

    baidu.editor.Editor.prototype.getImage = function () {
        return A(this)
    };
    baidu.editor.registCommand("insertImage", B)
})();
baidu.editor.registParser("image", function (A) {
    return A.getContexts().containNode("img", "p")
});
baidu.editor.toolbar = {};
baidu.editor.toolbar.createElement = function (A) {
    var B = document.createElement(A);
    B.style.MozUserSelect = "none";
    B.unselectable = "on";
    return B
};
function ItemBase(A) {
    baidu.BaseClass.call(this);
    this.name = "";
    this.editor = A
}
baidu.inherits(ItemBase, baidu.BaseClass, "biadu.editor.toolbar.ItemBase");
baidu.editor.toolbar.ItemBase = ItemBase;
baidu.editor.toolbar.Bold = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Bold";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Bold, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Bold");
baidu.editor.toolbar.Bold.prototype.initialize = function () {
    var B = this;
    var A = B.editor;
    var C = false;
    this.button.addEventListener("onconfirm", function () {
        A.bold()
    });
    A.addEventListener("onselectionchange", function (E) {
        var D = A.queryContextState("bold");
        switch (D) {
            case 0:
                C = false;
                break;
            case 1:
                C = true;
                break;
            case 2:
                C = false;
                break;
            case 3:
                C = true;
                break
        }
    });
    A.addEventListener("onbeforeselectionchange", function (D) {
        A.tools.bold.enable()
    });
    A.addEventListener("onafterselectionchange", function (D) {
        if (C) {
            B.button.highlight()
        } else {
            B.button.removeHighlight()
        }
    })
};
baidu.editor.toolbar.Italic = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Italic";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Italic, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Italic");
baidu.editor.toolbar.Italic.prototype.initialize = function () {
    var B = this;
    var A = B.editor;
    var C = false;
    this.button.addEventListener("onconfirm", function () {
        A.italic()
    });
    A.addEventListener("onselectionchange", function (E) {
        var D = A.queryContextState("italic");
        switch (D) {
            case 0:
                C = false;
                break;
            case 1:
                C = true;
                break;
            case 2:
                C = false;
                break;
            case 3:
                C = true;
                break
        }
    });
    A.addEventListener("onbeforeselectionchange", function (D) {
        A.tools.italic.enable()
    });
    A.addEventListener("onafterselectionchange", function (D) {
        if (C) {
            B.button.highlight()
        } else {
            B.button.removeHighlight()
        }
    })
};
baidu.editor.toolbar.Underline = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Underline";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Underline, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Underline");
baidu.editor.toolbar.Underline.prototype.initialize = function () {
    var A = this;
    this.button.addEventListener("onconfirm", function () {
        A.editor.underline()
    });
    A.editor.addEventListener("onselectionchange", function (B) {
        var C = A.editor.queryContextState("underline");
        if (C == 1 || C == 3) {
            isHightlight = true
        } else {
            isHightlight = false
        }
    });
    A.editor.addEventListener("onafterselectionchange", function (B) {
        if (isHightlight) {
            A.button.highlight()
        } else {
            A.button.removeHighlight()
        }
    })
};
baidu.editor.toolbar.Undo = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Undo";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Undo, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Undo");
baidu.editor.toolbar.Undo.prototype.initialize = function () {
    var B = this;
    var A = B.editor;
    this.button.addEventListener("onconfirm", function () {
        A.undo()
    });
    A.addEventListener("onselectionchange", function (C) {
        if (A.queryCommandState("Undo")) {
            A.tools.undo.enable()
        } else {
            A.tools.undo.disable()
        }
    })
};
baidu.editor.toolbar.Redo = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Redo";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Redo, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Redo");
baidu.editor.toolbar.Redo.prototype.initialize = function () {
    var B = this;
    var A = B.editor;
    this.button.addEventListener("onconfirm", function () {
        A.redo()
    });
    A.addEventListener("onselectionchange", function (C) {
        if (A.queryCommandState("Redo")) {
            A.tools.redo.enable()
        } else {
            A.tools.redo.disable()
        }
    })
};
baidu.editor.toolbar.JustifyLeft = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "JustifyLeft";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.JustifyLeft, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.JustifyLeft");
baidu.editor.toolbar.JustifyLeft.prototype.initialize = function () {
    var A = this;
    this.button.addEventListener("onconfirm", function () {
        A.editor.justifyLeft()
    });
    A.editor.addEventListener("onselectionchange", function (B) {
        A.editor.document.queryCommandState("JustifyLeft") ? A.button.highlight() : A.button.removeHighlight()
    })
};
baidu.editor.toolbar.JustifyCenter = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "JustifyCenter";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.JustifyCenter, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.JustifyCenter");
baidu.editor.toolbar.JustifyCenter.prototype.initialize = function () {
    var A = this;
    this.button.addEventListener("onconfirm", function () {
        A.editor.justifyCenter()
    });
    A.editor.addEventListener("onselectionchange", function (B) {
        A.editor.queryCommandState("JustifyCenter") ? A.button.highlight() : A.button.removeHighlight()
    })
};
baidu.editor.toolbar.JustifyRight = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "JustifyRight";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.JustifyRight, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.JustifyRight");
baidu.editor.toolbar.JustifyRight.prototype.initialize = function () {
    var A = this;
    this.button.addEventListener("onconfirm", function () {
        A.editor.justifyRight()
    });
    A.editor.addEventListener("onselectionchange", function (B) {
        A.editor.queryCommandState("JustifyRight") ? A.button.highlight() : A.button.removeHighlight()
    })
};
baidu.editor.toolbar.FontName = function (A, B) {
    baidu.editor.toolbar.ItemBase.call(this, A);
    this.name = "FontName";
    this.combo = B
};
baidu.inherits(baidu.editor.toolbar.FontName, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.FontName");
baidu.editor.toolbar.FontName.prototype.initialize = function () {
    var A = this;
    this.combo.addEventListener("onchange", function () {
        var B = A.combo.getValue();
        A.editor.fontname(B)
    });
    A.editor.addEventListener("onselectionchange", function (C) {
        var B = A.editor.queryFontname();
        A.combo.setValue(B)
    })
};
baidu.editor.toolbar.FontSize = function (A, B) {
    baidu.editor.toolbar.ItemBase.call(this, A);
    this.name = "FontSize";
    this.combo = B
};
baidu.inherits(baidu.editor.toolbar.FontSize, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.FontSize");
baidu.editor.toolbar.FontSize.prototype.initialize = function () {
    var A = this;
    this.combo.addEventListener("onchange", function () {
        var B = A.combo.getValue();
        A.editor.fontsize(B)
    });
    A.editor.addEventListener("onselectionchange", function (B) {
        var C = A.editor.queryFontsize();
        A.combo.setValue(C)
    })
};
baidu.editor.toolbar.ForeColor = function (A, B) {
    baidu.editor.toolbar.ItemBase.call(this, A);
    this.name = "ForeColor";
    this.combo = B
};
baidu.inherits(baidu.editor.toolbar.ForeColor, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.ForeColor");
baidu.editor.toolbar.ForeColor.prototype.initialize = function () {
    var A = this;
    A.combo.addEventListener("onchange", function () {
        A.editor.foreColor(A.combo.getValue())
    });
    A.editor.addEventListener("onselectionchange", function (C) {
        var B = A.editor.queryForeColor("color");
        A.combo.setValue(B ? B.toUpperCase() : "")
    })
};
baidu.editor.toolbar.Image = function (B, A) {
    baidu.editor.toolbar.ItemBase.call(this, B);
    this.name = "Image";
    this.button = A
};
baidu.inherits(baidu.editor.toolbar.Image, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Image");
baidu.editor.toolbar.Image.prototype.initialize = function () {
    var B = this;
    var A = B.editor;
    var C = false;
    this.button.addEventListener("onconfirm", function () {
        var G = this;
        var E = null;
        if (A.queryContextState("image")) {
            E = A.getImage()
        }
        if (!E) {
            var H = A.maxPicNum || 10;
            var I = A.document.getElementsByTagName("img");
            if (I && I.length >= H) {
                var D;
                if (H == 10) {
                    D = Fe.Dialog.alert("对不起，图片总数限制为" + H + "张:( !", {title: "提示", locked: true})
                } else {
                    D = Fe.Dialog.alert("对不起，图片总数限制为" + H + "张:( !", {title: "提示", locked: true})
                }
                D.onopen = function () {
                    document.body.focus()
                };
                D.onclose = function () {
                    A.focus()
                };
                return
            }
        }
        var F;
        if (E) {
            F = E.src
        }
        G.dialog = Fe.Dialog.open("../common/uploadRichTextImage.action" + (E != null ? "#imgUrlValue=" + encodeURIComponent(F) : ""), {
            title: "添加或修改图片",
            width: "380px",
            height: "125px",
            buttonbar: true,
            buttonAccept: true,
            buttonCancel: true,
            locked: true,
            contentType: "HTMLUrl"
        });
        G.dialog.afterUpload = function (J) {
            A.insertImage(J);
            G.dialog.close();
            B.uploadNum++
        };
        G.dialog.onaccept = function (K) {
            var J = G.dialog.window, J = G.dialog.window = (!J) ? G.dialog.getIframe().contentWindow : J, L = J.document;
            J.startUpload(G);
            K.returnValue = false
        };
        G.dialog.onclose = function () {
            A.focus()
        }
    });
    A.addEventListener("onselectionchange", function (E) {
        var D = A.queryContextState("image");
        switch (D) {
            case 0:
                C = false;
                break;
            case 1:
                C = true;
                break;
            case 2:
                C = false;
                break;
            case 3:
                C = true;
                break
        }
    });
    A.addEventListener("onbeforeselectionchange", function (D) {
        A.tools.image.enable()
    });
    A.addEventListener("onafterselectionchange", function (D) {
        if (C) {
            B.button.highlight()
        } else {
            B.button.removeHighlight()
        }
    })
};
(function () {
    baidu.editor.Editor.prototype.getFilter = function () {
        var C = this;
        if (!C._filter) {
            var B = C._filter = new (function () {
                var E = {}, F;
                this.add = function (H, G) {
                    G = G || "key_" + (new Date()).getTime();
                    E[G] = H
                };
                this.remove = function (G) {
                    delete E[G]
                };
                var D = this.builder = new A(C);
                this.filter = function (H) {
                    D._process(H);
                    for (var G in E) {
                        E[G](H)
                    }
                };
                updateTagCount = function (G) {
                    F = C.document.getElementsByTagName("*").length
                };
                C.addEventListener("onafterexeccommand", updateTagCount);
                C.addEventListener("onwysiwygready", updateTagCount);
                C.addEventListener("onselectionchange", function (K) {
                    var G = C.document.getElementsByTagName("*").length, J, I, H;
                    if (baidu.ie) {
                        J = C.document.selection.createRange()
                    } else {
                        J = C.window.getSelection().getRangeAt(0)
                    }
                    if (G == F) {
                        return
                    } else {
                        if (G <= F * 0.8 || G >= F * 1.2) {
                            F = G;
                            I = C.document.body
                        } else {
                            F = G;
                            if (!baidu.ie) {
                                I = baidu.dom.getCommonAncestor(J.startContainer, J.endContainer)
                            } else {
                                H = C.document.selection;
                                if (H.type.toUpperCase() != "CONTROL") {
                                    I = J.parentElement();
                                    if (baidu.dom.getDocument(I) != C.document) {
                                        I = C.document.body
                                    }
                                } else {
                                    I = C.document.body
                                }
                            }
                        }
                    }
                    B.filter(I)
                })
            })()
        }
        return C._filter
    };
    var A = function (E) {
        var D = {};
        var B = {};
        var C = [];
        var G = function () {
            this.attribute = {};
            this.allow = {};
            this.except = {};
            this.text = false;
            this.html = false;
            this.delegates = []
        };
        var F = false;
        this.element = function (J) {
            F = true;
            C = [];
            var I = J.split(",");
            for (var H = 0; H < I.length; H++) {
                I[H] = I[H].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
                C.push(I[H]);
                if (!D[I[H]]) {
                    D[I[H]] = new G()
                }
            }
            return this
        };
        this.allow = function (K) {
            var J = K.split(",");
            for (var I = 0; I < J.length; I++) {
                J[I] = J[I].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
                for (var H = 0; H < C.length; H++) {
                    D[C[H]].allow[J[I]] = true
                }
            }
            return this
        };
        this.except = function (K) {
            var J = K.split(",");
            for (var I = 0; I < J.length; I++) {
                J[I] = J[I].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
                for (var H = 0; H < C.length; H++) {
                    D[C[H]].except[J[I]] = true
                }
            }
            return this
        };
        this.attribute = function (K) {
            var H = K.split(",");
            for (var J = 0; J < H.length; J++) {
                H[J] = H[J].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
                for (var I = 0; I < C.length; I++) {
                    D[C[I]].attribute[H[J]] = true
                }
            }
            return this
        };
        this.text = function () {
            for (var H = 0; H < C.length; H++) {
                D[C[H]].text = true
            }
            return this
        };
        this.html = function () {
            for (var H = 0; H < C.length; H++) {
                D[C[H]].html = true
            }
            return this
        };
        this.delegate = function (I) {
            for (var H = 0; H < C.length; H++) {
                D[C[H]].delegates.push(I)
            }
            return this
        };
        this.eliminate = function (J) {
            F = true;
            C = [];
            var I = J.split(",");
            for (var H = 0; H < I.length; H++) {
                I[H] = I[H].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
                if (!B[I[H]]) {
                    B[I[H]] = true
                }
            }
            return this
        };
        this._process = function (M) {
            if (!F) {
                return
            }
            var L = M.tagName ? D[M.tagName.toLowerCase()] : null;
            while (!L && M.parentNode && M != E.document.body) {
                M = M.parentNode;
                L = M.tagName ? D[M.tagName.toLowerCase()] : null
            }
            L = M.tagName ? D[M.tagName.toLowerCase()] : null;
            if (!L) {
                return
            }
            var P = L.delegates.length;
            for (var N = 0; N < P; N++) {
                L.delegates[N](M)
            }
            var K = M.attributes;
            for (var N = K.length - 1; N >= 0; N--) {
                var J = K[N];
                if (!L.attribute[J.name.toLowerCase()]) {
                    M.removeAttribute(J.name)
                }
            }
            if (M.className && !L.attribute["class"]) {
                M.className = ""
            }
            var I = M.lastChild;
            while (I) {
                var Q = I.previousSibling;
                switch (I.nodeType) {
                    case 1:
                        var H = I.tagName.toLowerCase();
                        if (((L.html && D[H]) || L.allow[H]) && !L.except[H] && !B[H]) {
                            arguments.callee(I)
                        } else {
                            if (L.text && !B[H]) {
                                var O = I.innerHTML;
                                for (key in B) {
                                    O = O.replace(new RegExp("<" + key + "[\\s\\S]*?>[\\s\\S]*?</" + key + ">", "ig"), "")
                                }
                                O = O.replace(/<[\s\S]*?>/ig, "").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                                M.insertBefore(E.document.createTextNode(O), I);
                                M.removeChild(I)
                            } else {
                                M.removeChild(I)
                            }
                        }
                        break;
                    case 3:
                        if (!L.text) {
                            M.removeChild(I)
                        }
                        break
                }
                I = Q
            }
        }
    }
})();
baidu.editor.register(function (A) {
    A.getFilter().builder.element("body").attribute("contentEditable,style").html().text().element("span").attribute("style").html().text().element("pre").attribute("style").html().text().element("center").attribute("style").html().text().element("ul").attribute("style").html().text().element("ol").attribute("style").html().text().element("li").attribute("style").html().text().element("a").attribute("style, href, target").html().text().element("br").element("div").attribute("style, align").html().text().element("h1, h2, h3, h4, h5, h6").attribute("style, align").html().text().element("table").html("tbody, thead, tfoot, tr").attribute("style, cellpadding, cellspacing, border, align").element("tbody").html("thead, tfoot, tr").attribute("style").element("thead, tfoot").html("tr").attribute("style").element("tr").html("th", "td").attribute("style").element("th, td").attribute("style, colspan, rowspan, align").html().text().element("b,strong").attribute("style").html().text().element("i,em").attribute("style").html().text().element("u").attribute("style").html().text().element("font").attribute("face, size, color, style").html().text().element("p").attribute("style,align").html().text().element("img").attribute("src, style, width, height").eliminate("script, style, object, embed, applet, select, input, textarea")
});
function ce(A) {
    var B = document.createElement(A);
    B.style.MozUserSelect = "none";
    B.unselectable = "on";
    return B
}
function stopEvent(A) {
    if (A) {
        A.cancelBubble = true;
        if (A.stopPropagation) {
            A.stopPropagation()
        }
    }
}
function preventDefault(A) {
    A.returnValue = false;
    if (A.preventDefault) {
        A.preventDefault()
    }
}
function Toolbar(B) {
    var A = this;
    A.id = B;
    A.dom = baidu.G(B);
    A.create()
}
baidu.extend(Toolbar.prototype, {
    create: function () {
        this.dom.style.MozUserSelect = "none";
        this.dom.unselectable = "on"
    }, addButton: function (A) {
        if (A && A.getDomObj) {
            this.dom.appendChild(A.getDomObj())
        }
    }, addBar: function () {
        var B = ce("div");
        var A = ce("span");
        baidu.addClass(A, "btn_bar");
        B.appendChild(A);
        A.style.MozUserSelect = "none";
        A.unselectable = "on";
        B.style.MozUserSelect = "none";
        B.unselectable = "on";
        this.dom.appendChild(B)
    }
});
Button.config = {
    hover: "btn_hover",
    active: "btn_active",
    disabled: "btn_disabled",
    highlight: "btn_highlight",
    defaultClassName: "",
    textButton: "btn_text btn_default",
    idPrefix: "toolbar-button-"
};
var buttonCounter = 0;
function Button(A) {
    var B = this;
    buttonCounter++;
    baidu.BaseClass.call(B);
    A = A || {};
    B.id = A.id || Button.config.idPrefix + buttonCounter;
    B.className = A.className || Button.config.defaultClassName;
    B._onclick = A.onclick;
    B.label = A.label;
    B.title = A.title;
    B.button = null;
    B.inner = null;
    B.isDisabled = false;
    B.isHighlight = false;
    B._createWraper()
}
baidu.inherits(Button, baidu.BaseClass, "Button");
baidu.extend(Button.prototype, {
    _createWraper: function () {
        var D = this;
        var C = D.button = ce("div");
        C.id = D.id;
        if (D.label) {
            baidu.addClass(C, Button.config.textButton)
        }
        var B = ce("div");
        var A = D.inner = ce("p");
        C.appendChild(B);
        B.appendChild(A);
        B.title = D.title;
        C.style.MozUserSelect = "none";
        B.style.MozUserSelect = "none";
        A.style.MozUserSelect = "none";
        C.unselectable = "on";
        B.unselectable = "on";
        A.unselectable = "on";
        D.createInner();
        D.registerHandlers();
        return D
    }, createInner: function () {
        var B = this;
        var A = ce("span");
        baidu.addClass(A, B.className);
        A.style.MozUserSelect = "none";
        A.unselectable = "on";
        B.addContent(A);
        if (B.label) {
            A.innerHTML = B.label
        }
    }, addContent: function (A) {
        this.inner.appendChild(A)
    }, registerHandlers: function () {
        var B = this;
        var A = B.button;
        baidu.on(A, "mouseover", function (C) {
            if (B.isDisabled) {
                return
            }
            baidu.addClass(A, Button.config.hover)
        });
        baidu.on(A, "mouseout", function (C) {
            if (B.isDisabled) {
                return
            }
            baidu.removeClass(A, Button.config.hover);
            baidu.removeClass(A, Button.config.active)
        });
        baidu.on(A, "mousedown", function (C) {
            if (B.isDisabled) {
                return
            }
            baidu.addClass(A, Button.config.active)
        });
        baidu.on(A, "mouseup", function (C) {
            if (B.isDisabled) {
                return
            }
            baidu.removeClass(A, Button.config.active)
        });
        baidu.on(A, "click", function (C) {
            if (B.isDisabled) {
                return
            }
            if (B._onclick && typeof B._onclick == "function") {
                B._onclick()
            } else {
                B.confirm()
            }
        })
    }, getDomObj: function () {
        return this.button
    }, highlight: function () {
        this.isHighlight = true;
        baidu.addClass(this.button, Button.config.highlight)
    }, disable: function () {
        this.isDisabled = true;
        baidu.removeClass(this.button, Button.config.highlight);
        baidu.removeClass(this.button, Button.config.hover);
        baidu.addClass(this.button, Button.config.disabled)
    }, removeHighlight: function () {
        this.isHighlight = false;
        baidu.removeClass(this.button, Button.config.highlight)
    }, enable: function () {
        this.isDisabled = false;
        baidu.removeClass(this.button, Button.config.disabled)
    }, confirm: function () {
        this.dispatchEvent(new baidu.BaseEvent("onconfirm"))
    }
});
Select.config = {
    select: "editor-toolbar-select",
    caption: "editor-toolbar-select-caption",
    dropdown: "editor-toolbar-select-dropdown",
    inline: "editor-toolbar-select-inline"
};
var selectListCounter = 0;
baidu.extend(Select.config, Button.config);
function Select(A) {
    var B = this;
    A = A || {};
    B.caption = A.caption || "SELECT";
    B.options = A;
    if (A.list) {
        B.list = A.list
    } else {
        if (A.items) {
            B.list = new List({
                id: (B.id ? "editor-select-list" + B.id : "editor-select-list" + selectListCounter++),
                items: A.items,
                listClassName: A.listClassName,
                itemClassName: A.itemClassName
            })
        } else {
            return false
        }
    }
    B.className = A.className;
    B._onchange = A.onchange;
    Button.call(B, A)
}
baidu.inherits(Select, Button, "Select");
baidu.extend(Select.prototype, {
    createInner: function () {
        var B = this;
        baidu.addClass(B.button, Select.config.select);
        if (B.className) {
            baidu.addClass(B.button, B.className)
        }
        var A = B.oCaption = ce("div");
        baidu.addClass(A, Select.config.inline);
        baidu.addClass(A, Select.config.caption);
        A.innerHTML = B.caption;
        var C = ce("div");
        baidu.addClass(C, Select.config.inline);
        baidu.addClass(C, Select.config.dropdown);
        C.innerHTML = "&nbsp;";
        A.unselectable = "on";
        C.unselectable = "on";
        A.MozUserSelect = "none";
        C.MozUserSelect = "none";
        B.addContent(A);
        B.addContent(C);
        B._registerHanlders()
    }, _registerHanlders: function () {
        var A = this;
        baidu.on(A.button, "mousedown", function (B) {
            if (A.isDisabled) {
                return
            }
            var C = baidu.getPosition(A.button);
            A.list.setPosition({left: C.left, top: (C.top + A.button.offsetHeight)});
            A.list.toggle();
            stopEvent(B)
        });
        baidu.on(A.button, "mouseup", function (B) {
            if (A.isDisabled) {
                return
            }
            stopEvent(B)
        });
        A.list._onclick = function () {
            A.list.hide();
            var B = A.list.getValue();
            A._setCaption(B)
        };
        A.list.addEventListener("onchange", function () {
            A.dispatchEvent(new baidu.BaseEvent("onchange"))
        })
    }, _setCaption: function (B) {
        var A = this;
        if (!B) {
            return false
        }
        if (A.options._setCaption) {
            A.options._setCaption(A.oCaption, B);
            return false
        }
        if (baidu.ie) {
            this.oCaption.innerText = B ? B : this.caption
        } else {
            this.oCaption.innerHTML = B ? B : this.caption
        }
    }, setValue: function (B, C) {
        var A = this;
        A.list.setValue(B, C);
        A._setCaption(B)
    }, getValue: function () {
        return this.list.getValue()
    }
});
List.config = {
    wraper: "editor-toolbar-list",
    outer: "editor-toolbar-list-item",
    hover: "editor-toolbar-list-item-hover",
    selected: "editor-toolbar-list-item-selected",
    idPrefix: "editor-toolbar-list-"
};
List.lists = [];
List.hideAll = function () {
    for (var B = 0; B < List.lists.length; B++) {
        var A = List.lists[B];
        if (A.isShow) {
            A.hide()
        }
    }
};
var listCounter = 0;
function List(A) {
    var B = this;
    baidu.BaseClass.call(B);
    listCounter++;
    A = A || {};
    B.items = A.items || [];
    B.listClassName = A.listClassName;
    B.itemClassName = A.itemClassName;
    B.id = A.id || List.config.idPrefix + listCounter;
    B._onclick = A.onclick;
    B.list = null;
    B._items = [];
    B.isShow = false;
    B.selectedIndex;
    B._createDom();
    List.lists.push(this)
}
baidu.inherits(List, baidu.BaseClass, "List");
baidu.extend(List.prototype, {
    _createDom: function () {
        var D = this;
        var E = D.list = ce("div");
        baidu.addClass(E, List.config.wraper);
        baidu.setStyle(E, "position", "absolute");
        baidu.setStyle(E, "background", "#FFF");
        E.id = D.id;
        if (D.listClassName && typeof D.listClassName == "string") {
            baidu.addClass(E, D.listClassName)
        }
        for (var C = 0, A = D.items.length; C < A; C++) {
            var B = ce("div");
            baidu.addClass(B, List.config.outer);
            if (D.itemClassName && typeof D.itemClassName == "string") {
                baidu.addClass(B, D.itemClassName)
            }
            B.innerHTML = D.items[C].content;
            B.value = D.items[C].value;
            D._items.push({value: D.items[C].value, dom: B});
            B.style.MozUserSelect = "none";
            B.unselectable = "on";
            E.appendChild(B);
            D._registerItemHandlers(C)
        }
        D._registerHandlers();
        D.hide();
        setTimeout(function () {
            document.body.appendChild(E)
        }, 1)
    }, _registerItemHandlers: function (A) {
        var C = this;
        var B = C._items[A];
        baidu.on(B.dom, "mouseover", function (D) {
            baidu.addClass(B.dom, List.config.hover)
        });
        baidu.on(B.dom, "mouseout", function (D) {
            baidu.removeClass(B.dom, List.config.hover)
        });
        baidu.on(B.dom, "click", function (D) {
            C._setItemSelected(A, true);
            if (C._onclick && typeof C._onclick == "function") {
                C._onclick()
            } else {
                C.confirm()
            }
            stopEvent(D)
        })
    }, _registerHandlers: function () {
        var A = this;
        baidu.on(document, "mousedown", function (B) {
            A.hide()
        });
        baidu.on(document, "mouseup", function (B) {
            A.hide()
        });
        baidu.on(A.list, "mousedown", function (B) {
            stopEvent(B)
        });
        baidu.on(A.list, "mouseup", function (B) {
            stopEvent(B)
        })
    }, show: function () {
        List.hideAll();
        this.list.style.display = "";
        this.isShow = true
    }, hide: function () {
        this.list.style.display = "none";
        this.isShow = false
    }, toggle: function () {
        if (this.isShow) {
            this.hide()
        } else {
            this.show()
        }
    }, setPosition: function (A) {
        this.list.style.left = typeof A.left == "number" ? A.left + "px" : A.left;
        this.list.style.top = typeof A.top == "number" ? A.top + "px" : A.top
    }, _setItemSelected: function (B, D) {
        var C = this;
        var A = B != C.selectedIndex;
        if (C.selectedIndex != undefined) {
            baidu.removeClass(C._items[C.selectedIndex].dom, List.config.selected)
        }
        if (B != undefined && B >= 0 && B < C._items.length) {
            baidu.addClass(C._items[B].dom, List.config.selected);
            C.selectedIndex = B
        } else {
            C.selectedIndex = undefined
        }
        if (A && D) {
            C.dispatchEvent(new baidu.BaseEvent("onchange"))
        }
    }, setValue: function (F, G) {
        var E = this;
        var B = E._items;
        var C;
        for (var D = 0, A = B.length; D < A; D++) {
            if (F == B[D].value) {
                C = D;
                break
            }
        }
        E._setItemSelected(C, G)
    }, getValue: function () {
        var A = this;
        if (A.selectedIndex != undefined) {
            return A._items[A.selectedIndex].value
        } else {
            return null
        }
    }, confirm: function () {
        this.dispatchEvent(new baidu.BaseEvent("onconfirm"))
    }
});
Menu.config = {menu: "toolbar-menu", idPrefix: "menu-"};
var menuCounter = 0;
Menu.menus = [];
function Menu(A) {
    var B = this;
    baidu.BaseClass.call(B);
    menuCounter++;
    A = A || {};
    B.id = A.id || Menu.config.idPrefix + menuCounter;
    B.menu = null;
    B._menuitems = [];
    B.isShow = false;
    B._createDom();
    Menu.menus.push(this)
}
baidu.inherits(Menu, baidu.BaseClass, "Menu");
baidu.extend(Menu.prototype, {
    _createDom: function () {
        var A = this;
        var B = A.menu = ce("div");
        baidu.addClass(B, Menu.config.menu);
        B.id = A.id;
        A.hide();
        document.body.appendChild(B);
        A._registerHandlers()
    }, _registerHandlers: function () {
        var A = this;
        baidu.on(document, "mousedown", function (B) {
            A.hide()
        });
        baidu.on(document, "mouseup", function (B) {
            A.hide()
        });
        baidu.on(A.menu, "mousedown", function (B) {
            stopEvent(B)
        });
        baidu.on(A.menu, "mouseup", function (B) {
            stopEvent(B)
        })
    }, show: function () {
        this.menu.style.display = "";
        this.isShow = true
    }, hide: function () {
        this.menu.style.display = "none";
        this.isShow = false
    }, toggle: function () {
        if (this.menu.style.display == "") {
            this.hide()
        } else {
            this.show()
        }
    }, setPosition: function (A) {
        this.menu.style.left = typeof A.left == "number" ? A.left + "px" : A.left;
        this.menu.style.top = typeof A.top == "number" ? A.top + "px" : A.top
    }, addMenuitem: function (B) {
        if (!B || !B.getDom || !B.getDom()) {
            return
        }
        var A = this;
        A.menu.appendChild(B.getDom());
        B.addEventListener("onclick", function () {
            A.hide()
        })
    }
});
MenuItem.config = {
    menuitem: "menuitem",
    hover: "menuitem-hover",
    disabled: "menuitem-disabled",
    idPrefix: "toolbar-menuitem-"
};
var menuitemCounter = 0;
function MenuItem(A) {
    var B = this;
    menuitemCounter++;
    A = A || {};
    B.label = A.label || "Menu Item ";
    B.className = A.className;
    B._onclick = A.onclick;
    B.id = A.id || MenuItem.config.idPrefix + menuitemCounter;
    B.button = null;
    B.isDisabled = false;
    baidu.BaseClass.call(B);
    B._createDom()
}
baidu.inherits(MenuItem, baidu.BaseClass, "MenuItem");
baidu.extend(MenuItem.prototype, {
    _createDom: function () {
        var B = this;
        var A = B.button = ce("div");
        baidu.addClass(A, MenuItem.config.menuitem);
        A.id = B.id;
        if (B.className) {
            baidu.addClass(A, B.className)
        }
        var C = document.createTextNode(B.label);
        A.appendChild(C);
        B._registerHandlers()
    }, _registerHandlers: function () {
        var B = this;
        var A = B.button;
        baidu.on(A, "mouseover", function (D) {
            if (B.isDisabled) {
                return
            }
            if (B.id == "insertTable") {
                var D = D || window.event;
                var G = D.target || D.srcElement;
                baidu.addClass(A, "menuitem-arrow");
                setTablePanel.showTablePanel();
                var F = parseInt(G.parentNode.style.left);
                var E = parseInt(G.parentNode.style.top);
                var C = baidu.G("bdMenuInsertTable");
                C.style.left = F + G.offsetWidth + "px";
                C.style.top = E + "px"
            } else {
                baidu.addClass(A, MenuItem.config.hover)
            }
        });
        baidu.on(A, "mouseout", function () {
            if (B.id == "insertTable") {
                baidu.removeClass(A, "menuitem-arrow");
                setTablePanel.hiddenTablePanel()
            }
            baidu.removeClass(A, MenuItem.config.hover)
        });
        baidu.on(A, "click", function () {
            if (B.isDisabled) {
                return
            }
            B.clicked();
            if (B._onclick && typeof B._onclick == "function") {
                B._onclick()
            } else {
                B.confirm()
            }
        })
    }, getDom: function () {
        return this.button
    }, disable: function () {
        var B = this;
        var A = B.button;
        this.isDisabled = true;
        if (B.id == "insertTable") {
            baidu.removeClass(A, "menuitem-arrow")
        }
        baidu.addClass(this.button, MenuItem.config.disabled)
    }, enable: function () {
        this.isDisabled = false;
        baidu.removeClass(this.button, MenuItem.config.disabled)
    }, confirm: function () {
        this.dispatchEvent(new baidu.BaseEvent("onconfirm"))
    }, clicked: function () {
        this.dispatchEvent(new baidu.BaseEvent("onclick"))
    }
});
baidu.isElement = function (A) {
    return A && A.nodeType == 1
};
baidu.isFirefox = /Firefox(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$2 : 0;
baidu.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1 : 0;
baidu.isWebkit = (navigator.userAgent.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(navigator.userAgent)) ? RegExp.$1 : 0;
baidu.isOpera = (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$2 : 0;
baidu.isSafari = (navigator.userAgent.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1 : 0;
baidu.isGecko = (navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1 : 0;
baidu.isStrict = (document.compatMode == "CSS1Compat");
baidu.css = function (C, G) {
    if (!C || !G) {
        return null
    }
    C = typeof C == "string" ? document.getElementById(C) : C;
    var B = !window.opera && navigator.userAgent.indexOf("MSIE") != -1;
    if (G == "float") {
        G = B ? "styleFloat" : "cssFloat"
    }
    G = G.replace(/(-[a-z])/gi, function (H, I) {
        return I.charAt(1).toUpperCase()
    });
    if ("opacity" == G && B) {
        var A = C.style.filter;
        return A && A.indexOf("opacity=") >= 0 ? (parseFloat(A.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
    }
    var F = null;
    if (F = C.style[G]) {
        return F
    }
    if (C.currentStyle) {
        return C.currentStyle[G]
    } else {
        var E = C.nodeType == 9 ? C : C.ownerDocument || C.document;
        if (E.defaultView && E.defaultView.getComputedStyle) {
            var D = E.defaultView.getComputedStyle(C, "");
            if (D) {
                return D[G]
            }
        }
    }
    return null
};
baidu.dom.getStyle = function (B, A) {
    return baidu.css(B, A)
};
baidu.dom.getPosition = function (D) {
    D = baidu.G(D);
    if (!baidu.isElement(D)) {
        throw new Error("[baidu.dom.getPosition] param must be Element")
    }
    var G = baidu.dom.getDocument(D);
    var F = baidu.isGecko > 0 && G.getBoxObjectFor && baidu.dom.getStyle(D, "position") == "absolute" && (D.style.top === "" || D.style.left === "");
    var H = {left: 0, top: 0};
    var B = (baidu.isIE && !baidu.isStrict) ? G.body : G.documentElement;
    if (D == B) {
        return H
    }
    var C = null;
    var E;
    if (D.getBoundingClientRect) {
        E = D.getBoundingClientRect();
        H.left = E.left + Math.max(G.documentElement.scrollLeft, G.body.scrollLeft);
        H.top = E.top + Math.max(G.documentElement.scrollTop, G.body.scrollTop);
        H.left -= G.documentElement.clientLeft;
        H.top -= G.documentElement.clientTop;
        if (baidu.isIE && !baidu.isStrict) {
            H.left -= 2;
            H.top -= 2
        }
    } else {
        if (G.getBoxObjectFor && !F) {
            E = G.getBoxObjectFor(D);
            var A = G.getBoxObjectFor(B);
            H.left = E.screenX - A.screenX;
            H.top = E.screenY - A.screenY
        } else {
            C = D;
            do {
                H.left += C.offsetLeft;
                H.top += C.offsetTop;
                if (baidu.isWebkit > 0 && baidu.dom.getStyle(C, "position") == "fixed") {
                    H.left += G.body.scrollLeft;
                    H.top += G.body.scrollTop;
                    break
                }
                C = C.offsetParent
            } while (C && C != D);
            if (baidu.isOpera > 0 || (baidu.isWebkit > 0 && baidu.dom.getStyle(D, "position") == "absolute")) {
                H.top -= G.body.offsetTop
            }
            C = D.offsetParent;
            while (C && C != G.body) {
                H.left -= C.scrollLeft;
                if (!baidu.isOpera || C.tagName != "TR") {
                    H.top -= C.scrollTop
                }
                C = C.offsetParent
            }
        }
    }
    return H
};
MenuButton.config = {
    label: "toolbar-menu-button-label",
    dropdown: "toolbar-menu-button-dropdown",
    menubutton: "toolbar-menu-button"
};
baidu.extend(MenuButton.config, Button.config);
function MenuButton(A) {
    var B = this;
    A = A || {};
    B.label = A.label || "MenuButton";
    B.items = [];
    B.menu = new Menu();
    Button.call(B, A)
}
baidu.inherits(MenuButton, Button, "MenuButton");
baidu.extend(MenuButton.prototype, {
    createInner: function () {
        var B = this;
        baidu.addClass(B.button, MenuButton.config.textButton);
        var A = ce("span");
        baidu.addClass(A, B.className);
        A.innerHTML = B.label;
        A.unselectable = "on";
        A.MozUserSelect = "none";
        B.addContent(A);
        B._registerHandlers()
    }, _registerHandlers: function () {
        var A = this;
        baidu.on(A.button, "mousedown", function (B) {
            if (A.isDisabled) {
                return
            }
            var C = baidu.dom.getPosition(A.button);
            A.menu.setPosition({left: C.left, top: (C.top + A.button.offsetHeight)});
            A.menu.toggle();
            window.focus();
            stopEvent(B)
        });
        baidu.on(A.button, "mouseup", function (B) {
            if (A.isDisabled) {
                return
            }
            stopEvent(B)
        })
    }, addMenuitem: function (A) {
        this.menu.addMenuitem(A)
    }
});
var EditorTools = function (F) {
    this.undo;
    this.redo;
    this.bold;
    this.italic;
    this.image;
    var E = new Toolbar(F);
    this.undo = new Button({className: "btn_undo", title: "撤销"});
    E.addButton(this.undo);
    this.redo = new Button({className: "btn_redo", title: "重做"});
    E.addButton(this.redo);
    E.addBar();
    this.bold = new Button({className: "btn_bold", title: "加粗"});
    E.addButton(this.bold);
    this.italic = new Button({className: "btn_italic", title: "斜体"});
    E.addButton(this.italic);
    this.underline = new Button({className: "btn_underline", title: "下划线"});
    E.addButton(this.underline);
    var L = [["黑色", "black", "000000"], ["红色", "red", "FF0000"], ["蓝色", "blue", "0000FF"], ["绿色", "green", "008000"], ["紫色", "purple", "800080"], ["黄色", "yellow", "FFFF00"], ["灰色", "gray", "808080"], ["浅绿色", "aqua", "00FFFF"], ["紫红色", "fuchsia", "FF00FF"], ["褐紫色", "maroon", "800000"], ["藏青色", "navy", "000080"], ["黄褐色", "olive", "808000"], ["银白色", "silver", "C0C0C0"]];
    var B = {
        "000000": "黑色",
        FF0000: "红色",
        "0000FF": "蓝色",
        "008000": "绿色",
        "800080": "紫色",
        FFFF00: "黄色",
        "808080": "灰色",
        "00FFFF": "浅绿色",
        FF00FF: "紫红色",
        "800000": "褐紫色",
        "000080": "藏青色",
        "808000": "黄褐色",
        C0C0C0: "银白色"
    };
    var A = [];
    for (var J in B) {
        var K = {};
        K.value = J;
        K.content = '<span style="padding:5px 15px;*padding:0 15px;margin-right:5px;background:#' + J + '"></span><span style="color:#' + J + '">' + B[J] + "</span>";
        A.push(K)
    }
    this.forecolor = new Select({
        caption: "字体颜色",
        title: "字体颜色",
        className: "editor-toolbar-select-forecolor",
        items: A,
        listClassName: "editor-toolbar-forecolor-list",
        itemClassName: "editor-toolbar-forecolor-item",
        _setCaption: function (M, O) {
            if (!O) {
                return false
            }
            var O = O.replace("#", "");
            O = O == "000" ? "000000" : O;
            var N = B[O];
            N = N || "字体颜色";
            baidu.ie ? M.innerText = N : M.innerHTML = N
        }
    });
    E.addButton(this.forecolor);
    E.addBar();
    this.justifyleft = new Button({className: "btn_justifyleft", title: "居左"});
    E.addButton(this.justifyleft);
    this.justifycenter = new Button({className: "btn_justifycenter", title: "居中"});
    E.addButton(this.justifycenter);
    this.justifyright = new Button({className: "btn_justifyright", title: "居右"});
    E.addButton(this.justifyright);
    var H = ["sans-serif", "宋体", "黑体", "幼圆", "楷体_GB2312", "仿宋_GB2312", "Arial", "Comic Sans MS", "Courier New", "Tahoma", "Times New Roman", "Verdana"];
    var I = [];
    for (var C = 0; C < H.length; C++) {
        var K = {};
        K.value = H[C];
        K.content = '<span style="font-family:' + H[C] + '">' + H[C] + "</span>";
        I.push(K)
    }
    this.fontname = new Select({
        caption: "选择字体",
        title: "字体",
        className: "editor-toolbar-select-fontfamily",
        listClassName: "editor-toolbar-fontname-list",
        itemClassName: "editor-toolbar-fontname-item",
        items: I
    });
    E.addButton(this.fontname);
    var D = {"1": "10", "2": "13", "3": "16", "4": "18", "5": "24", "6": "32", "7": "48"};
    var G = [];
    for (var J in D) {
        var K = {};
        K.value = J;
        K.content = '<span style="line-height:1em;font-size:' + D[J] + 'px">' + D[J] + "</span>";
        G.push(K)
    }
    this.fontsize = new Select({
        caption: "选择字号",
        title: "字号",
        className: "editor-toolbar-select-fontsize",
        items: G,
        listClassName: "editor-toolbar-fontsize-list",
        itemClassName: "editor-toolbar-fontsize-item",
        _setCaption: function (M, N) {
            if (!N) {
                return false
            }
            var O = D[N];
            O = O || "选择字号";
            baidu.ie ? M.innerText = O : M.innerHTML = O
        }
    });
    E.addButton(this.fontsize);
    E.addBar();
    this.image = new Button({className: "btn_image", title: "插入/编辑图片"});
    E.addButton(this.image);
    this.buttonDisable()
};
EditorTools.prototype.buttonEnable = function () {
    this.bold.enable();
    this.italic.enable();
    this.image.enable();
    this.underline.enable();
    this.justifyleft.enable();
    this.justifycenter.enable();
    this.justifyright.enable();
    this.fontname.enable();
    this.fontsize.enable();
    this.forecolor.enable()
};
EditorTools.prototype.buttonDisable = function () {
    this.undo.disable();
    this.redo.disable();
    this.bold.disable();
    this.italic.disable();
    this.image.disable();
    this.underline.disable();
    this.justifyleft.disable();
    this.justifycenter.disable();
    this.justifyright.disable();
    this.fontname.disable();
    this.fontsize.disable();
    this.forecolor.disable()
};
function editorInit(A) {
    var B = A.tools;
    A.addToolbarItem(new baidu.editor.toolbar.Undo(A, B.undo));
    A.addToolbarItem(new baidu.editor.toolbar.Redo(A, B.redo));
    A.addToolbarItem(new baidu.editor.toolbar.Bold(A, B.bold));
    A.addToolbarItem(new baidu.editor.toolbar.Italic(A, B.italic));
    A.addToolbarItem(new baidu.editor.toolbar.Underline(A, B.underline));
    A.addToolbarItem(new baidu.editor.toolbar.JustifyLeft(A, B.justifyleft));
    A.addToolbarItem(new baidu.editor.toolbar.JustifyCenter(A, B.justifycenter));
    A.addToolbarItem(new baidu.editor.toolbar.JustifyRight(A, B.justifyright));
    A.addToolbarItem(new baidu.editor.toolbar.Image(A, B.image));
    A.addToolbarItem(new baidu.editor.toolbar.FontName(A, B.fontname));
    A.addToolbarItem(new baidu.editor.toolbar.FontSize(A, B.fontsize));
    A.addToolbarItem(new baidu.editor.toolbar.ForeColor(A, B.forecolor))
}
(function () {
    baidu.getPosition = function (C) {
        return {left: A(C), top: B(C)}
    };
    function A(D) {
        var C = 0;
        while (D != null) {
            C += D.offsetLeft;
            D = D.offsetParent
        }
        return C
    }

    function B(D) {
        var C = 0;
        while (D != null) {
            C += D.offsetTop;
            D = D.offsetParent
        }
        return C
    }
})();
(function () {
    baidu.getPointer = function (C) {
        var B = document.documentElement, A = document.body || {scrollLeft: 0, scrollTop: 0};
        return {
            x: C.pageX || (C.clientX + (B.scrollLeft || A.scrollLeft) - (B.clientLeft || 0)),
            y: C.pageY || (C.clientY + (B.scrollTop || A.scrollTop) - (B.clientTop || 0))
        }
    }
})();
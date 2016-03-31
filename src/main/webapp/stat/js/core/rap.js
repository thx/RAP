/********************************************************
 *                                                      *
 *         ##workspace-module-end                       *
 *                                                      *
 ********************************************************/
var rap = rap || {};

// for compability... .bull shit
baidu.ajax.post = function(url, q, func) {
    $.ajax({
        method : "POST",
        url : url,
        data : q,
        success : function() {
            func.apply(this, [null, arguments[0]]);
        }
    });
};

// console compability
if (!window.console) {
    window.console = {
        log : function() {},
        warn : function() {},
        error : function() {}
    };
}


// deep copy
function deepCopy(o) {
    return jQuery.extend(true, {}, o);
}

/********************************************************
 *                                                      *
 *         ##util module begin                          *
 *                                                      *
 ********************************************************/

/**
 * Util Module
 */
(function() {
    rap.util = rap.util || {};

    var util = rap.util,
        b = baidu;

    util.escaper = util.escaper || {};

    /**
     * @desc 变量用于HTML和JS环境下的转义。如：onclick属性加入动态变量时
     * @param {String} inputStr 需要转义的字符串
     * @return 转义后的输出
     */
    util.escaper.escapeInHJ = function(inputStr) {
        inputStr.replace(/\&/g, "&amp;");
        inputStr = inputStr.replace(/</g, "&lt;");
        inputStr = inputStr.replace(/>/g, "&gt;");
        inputStr = inputStr.replace(/\\/g, "\\\\");
        inputStr = inputStr.replace(/\//g, "\\/");
        inputStr = inputStr.replace(/\'/g, "\\&#39;");
        inputStr = inputStr.replace(/\"/g, "\\&quot;");
        inputStr = inputStr.replace(/\r/g, "\\r");
        inputStr = inputStr.replace(/\n/g, "\\n");
        return inputStr;
    };

    util.escaper.escapeInJ = function(inputStr) {
        inputStr = inputStr.replace(/\\/g, "\\\\");
        inputStr = inputStr.replace(/\//g, "\\/");
        inputStr = inputStr.replace(/\'/g, "\\&#39;");
        inputStr = inputStr.replace(/\"/g, "\\&quot;");
        return inputStr;
    };

    util.escaper.escapeInH = function(inputStr) {
       inputStr = b.encodeHTML(inputStr);
       inputStr = inputStr.replace(/\'/g, "&#39;");
       return  inputStr;
    };

    util.escaper.escapeInU = encodeURIComponent;

    /**
     * hint message
     */
    util.hint = (function() {
        var DIV_NAME = "tipDiv",
            _hint = {},
            _enabled = true,
            _div = null;

        _hint.init = function() {
            var _checkboxHintEnabled = b.g("checkboxHintEnabled");
            if (_checkboxHintEnabled) {
                _enabled = _checkboxHintEnabled.checked;
            }
        };

        _hint.bind = function(ele, message) {
            ele = (typeof ele == "string" ? b.g(ele) : ele);
            if (ele && message) {
                b.event.on(ele, "mouseover", function() {
                    rap.util.hint.show(this, message);
                });

                b.event.on(ele, "mouseout", function() {
                    rap.util.hint.hide();
                });
            }

        };

        _hint.show = function(ele, message) {
            if (!_enabled) return;
            var p = baidu.dom.getPosition(ele);
            var div = _div ? _div : createDiv();
            div.innerHTML = message;
            baidu.show(DIV_NAME);
            if (p.top + div.offsetHeight > baidu.page.getViewHeight() + baidu.page.getScrollTop()) {
                baidu.setStyle(DIV_NAME, "top", baidu.page.getViewHeight() + baidu.page.getScrollTop() - div.offsetHeight);
            }
            else {
                baidu.setStyle(DIV_NAME, "top", p.top);
            }
            if  (p.left + ele.offsetWidth + div.offsetWidth > baidu.page.getViewWidth()) {
                baidu.setStyle(DIV_NAME, "left", p.left - div.offsetWidth);
            }
            else {
                baidu.setStyle(DIV_NAME, "left", p.left + ele.offsetWidth);
            }
        };

        _hint.hide = function() {
            if (!_enabled) return;
            b.hide(_div);
        };

        _hint.enable = function() {
            _enabled = true;
        };

        _hint.disable = function() {
            _enabled = false;
        };

        function createDiv() {
            _div = b.g("DIV_NAME");
            if (!_div) {
                _div = document.createElement("div");
                _div.id = "tipDiv";
            }
            document.body.appendChild(_div);
            return _div;
        }

        return _hint;
    })();

    util.validator = (function(){
        /**
         * 验证表单元素的格式, 属性validate表示当前数据的名称；属性trim="yes"时会过滤数据两端的空白字符；属性pattern表示
         * 需要验证的正则表达式，会自动在当前正则表达式前后添加^与$表示行首行尾转义；属性maxValue,minValue表示数据允许的
         * 最大、最小数值；属性maxLen, minLen表示数据允许的最大、最小长度，此时，有一个属性character表示长度验证是否基于
         * 字符，否则表示基于字节；属性custom表示自定义的验证处理，这里填入的是验证函数的文件名，在调用函数时，第一个参
         * 数是需要验证的值，第二个参数是数据的名称；属性message表示验证失败时需要显示的错误信息。例如：
         * <input name="email" pattern="[A-Za-z][\w.]*@[A-Za-z][\w.]*" maxLen="64" trim="yes" validate="邮箱地址" />
         * <input name="year" minValue="1990" maxValue="2020" message="请填入1990-2020之间的年份" />
         * 如果未设置invalid属性, 验证失败时提示信息在输入框中生成, 如果设置了invalid属性, 则会在指定的Element中显示出错
         * 信息, 或者是调用指定的函数处理出错信息.
         * @public
         *
         * @param {Element} e 表单元素
         * @return {Boolean} 是/否为允许的格式
         */
        function Validate(e)
        {
            if (e._sValue !== undefined)
            {
                return false;
            }
            e = baidu.G(e);
            var o = Validate;
            var name = e.getAttribute('validate') || e.name;
            var value = e.getAttribute('trim') != 'no' ? baidu.trim(e.value) : e.value;
            var msg =
                o._pattern(value, name, e.getAttribute('pattern')) || o._number(value, name, e.getAttribute('maxValue'), e.getAttribute('minValue')) || o._length(value, name, e.getAttribute('maxLen'), e.getAttribute('minLen'), e.getAttribute('character') !== false) || o._custom(value, name, e.getAttribute('custom'));
            if (msg)
            {
                msg = e.getAttribute('message') || msg;
                if (!e.onInvalid)
                {
                    var invalid = e.getAttribute('invalid');
                    if (invalid)
                    {
                        o = baidu.G(invalid);
                        if (o)
                        {
                            /* 如果有同名的Element, 则设置Element的innerHTML值 */
                            e._eMsg = o;
                            e.onInvalid = function (msg) {
                                this._eMsg.innerHTML = msg;
                            };
                            e.onValid = function () {
                                this._eMsg.innerHTML = '';
                            };
                        }
                        else
                        {
                            /* 如果没有同名的Element, 调用函数处理 */
                            e.onInvalid = window[invalid];
                            e.onValid = e.onInvalid.valid;
                        }
                    } else {
                        e.onInvalid = function () {
                            this._sValue = this.value;
                            baidu.addClass(this, 'invalid');
                            this.value = msg;
                            this.onfocus = function () {
                                baidu.removeClass(this,'invalid');
                                var v = this._sValue;
                                /* 恢复原来的值 */
                                if (v !== undefined)
                                {
                                    this.value = v;
                                    this._sValue = undefined;
                                }
                            };
                        };
                    }
                }
                try {
                    e.onInvalid(msg);
                } catch (ex) {
                }
                return false;
            }
            e.value = value;
            e.onValid && e.onValid();
            return true;
        }

        Validate.ERR_SUBMIT = "数据无法向服务器提交";
        Validate.AFFIRM_REMOVE = "真的要删除它吗？";
        Validate.ERR_REQUIRED = "#{0}不能为空";
        Validate.ERR_LEAST_LETTER = "#{0}至少需要包含#{1}字节";
        Validate.ERR_MOST_LETTER = "#{0}最多只能包含#{1}字节";
        Validate.ERR_LEAST_CHAR = "#{0}至少需要包含#{1}字符";
        Validate.ERR_MOST_CHAR = "#{0}最多只能包含#{1}字符";
        Validate.ERR_MINIMUL = "#{0}必须大于#{1}";
        Validate.ERR_MAXIMUL = "#{0}必须小于#{1}";
        Validate.ERR_INVAILD = "#{0}无效";

        /**
         * 验证整个区域内的元素
         * @public
         *
         * @param {Element} el Element元素
         * @return {Boolean} 是/否验证通过
         */
        Validate.validElement = function (el) {
            var list = el.getElementsByTagName('*');
            var r = true;
            for (var i = 0, o; o = list[i]; i++) {
                var tagName = o.tagName.toLowerCase();
                if ((tagName == 'input' || tagName == 'select' || tagName == 'textarea') &&
                    (o.offsetWidth || o.type=='hidden') && !Validate(o)) {
                    r = false;
                }
            }
            return r;
        };

        /**
         * 验证整个表单
         * @public
         *
         * @param {FormElement} form 表单元素
         * @return {Boolean} 是/否验证通过
         */
        Validate.validForm = function (form) {
            var list = form;
            var r = true;
            for (var i = 0, o; o = list[i]; i++)
            {
                if ((o.offsetWidth || o.type=='hidden') && !Validate(o))
                {
                    r = false;
                }
            }
            return r;
        };

        /**
         * 对数据进行正则表达式验证
         * @public
         *
         * @param {String} value 要验证的字符串
         * @param {String} name 字符串名称
         * @param {String} regexp 正则表达式字符串
         * @return {String} 如果有值返回的是出错提示信息
         */
        Validate._pattern = function (value, name, regexp) {
            if (regexp && !value.match(new RegExp('^' + regexp + '$')))
            {
                return baidu.format(Validate.ERR_INVAILD, [name]);
            }
        };

        /**
         * 对数据进行数值表达式验证
         * @public
         *
         * @param {String} value 要验证的字符串
         * @param {String} name 字符串名称
         * @param {String} max 允许的最大数值, 如果为空表示没有最大值限制
         * @param {String} min 允许的最小数值, 如果为空表示没有最小值限制
         * @return {String} 如果有值返回的是出错提示信息
         */
        Validate._number = function (value, name, max, min) {
            if (max || min)
            {
                if (!value.match(/^[0-9]+(\.[0-9]+)?$/))
                {
                    return baidu.format(Validate.ERR_INVAILD, [name]);
                }
                else
                {
                    value = parseInt(value, 10);
                    if (max !== null && value > parseInt(max, 10))
                    {
                        return baidu.format(Validate.ERR_MAXIMUL, [name, max]);
                    }
                    if (min !== null && value < parseInt(min, 10))
                    {
                        return baidu.format(Validate.ERR_MINIMUL, [name, min]);
                    }
                }
            }
        };

        /**
         * 对数据进行长度验证
         * @public
         *
         * @param {String} value 要验证的字符串
         * @param {String} name 字符串名称
         * @param {String} max 允许的最大长度, 如果为空表示没有最大长度限制
         * @param {String} min 允许的最小长度, 如果为空表示没有最小长度限制
         * @return {String} 如果有值返回的是出错提示信息
         */
        Validate._length = function (value, name, max, min, character) {
            if (max || min)
            {
                var length = character ? value.length : baidu.string.getByteLength(value);
                if (max && length > parseInt(max, 10))
                {
                    return character ? baidu.format(Validate.ERR_MOST_CHAR, [name, max]) : baidu.format(Validate.ERR_MOST_LETTER, [name, max]);
                }
                if (min && length < parseInt(min, 10))
                {
                    return length ? (character ? baidu.format(Validate.ERR_LEAST_CHARname, [min]) : baidu.format(Validate.ERR_LEAST_LETTER, [name, min])) : baidu.format(Validate.ERR_REQUIRED, [name]);
                }
            }
        };

        /**
         * 自定义验证调用
         * @public
         *
         * @param {String} value 要验证的字符串
         * @param {String} name 字符串名称
         * @param {String} func 自定义验证函数名
         * @return {String} 如果有值返回的是出错提示信息
         */
        Validate._custom = function (value, name, func) {
            if (func) {
                return window[func](value, name);
            }
        };
        return Validate;
    })();
})(this);


/********************************************************
 *                                                      *
 *         ##project module begin                       *
 *                                                      *
 ********************************************************/

/**
 * Project Module
 */
(function() {

    rap.project = rap.project || {};

    var p = rap.project,
        b = baidu,
        _generatedId = -1,
        _data = null;

    /**
     * init project
     */
    p.init = function(projectData) {
        _data = projectData;
    };

    /**
     * get id
     */
    p.getId = function() {
        return _data.id;
    };

    /**
     * get version
     */
    p.getVersion = function() {
        return _data.version;
    };

    /**
     * get module list
     */
    p.getModuleList = function() {
        return _data.moduleList;
    };


    /**
     * get module id by action id
     * @param {number} action id
     * @return {number} module id, undefined if not found
     */
    p.getModuleIdByActionId = function(acitonId) {
        var list = _data.moduleList,
            n = list.length,
            i = 0, m;
        for (; i < n; i++) {
            m = list[i];
            if (p.isActionInModule(acitonId, m.id)) {
                return m.id;
            }
        }
    };

    /**
     * get module by id
     */
    p.getModule = function(id) {
        var list = _data.moduleList,
            n = list.length;
        for (var i = 0; i < n; i++) {
            if (list[i].id == id) {
                return list[i];
            }
        }
        return null;
    };

    /**
     * get action by id
     */
    p.getAction = function(id) {
        var moduleList = _data.moduleList,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = 0; j < pageListCount; j++) {
                var page = pageList[j],
                    actionList = page.actionList,
                    actionListCount = actionList.length;
                for (var k = 0; k < actionListCount; k++) {
                    var action = actionList[k];
                    if (action.id == id) {
                        return action;
                    }
                }
            }
        }
        return null;
    };

    /**
     * find the next parameter
     * return -1 if can not find the next parameter
     * ignore child parameters of complex parameter
     */
    p.findNextParameter = function(actionId, parameterId) {
        var action = this.getAction(actionId);
        var i;
        var p;
        if (action) {
            var requestParameterList = action.requestParameterList,
                requestParameterListNum = requestParameterList.length,
                responseParameterList = action.responseParameterList,
                responseParameterListNum = responseParameterList.length;
            for (i = 0; i < requestParameterListNum; i++) {
                p = requestParameterList[i];
                if (p.id == parameterId) {
                    if (i + 1 < requestParameterListNum) {
                        return requestParameterList[i + 1].id;
                    }
                    return -1;
                }
            }
            for (i = 0; i < responseParameterListNum; i++) {
                p = responseParameterList[i];
                if (p.id == parameterId) {
                    if (i + 1 < responseParameterListNum) {
                        return responseParameterList[i + 1].id;
                    }
                    return -1;
                }
            }
        }
        return -1;
    };


    /**
     * is request parameter
     */
    p.isRequestParameter = function(actionId, parameterId) {
        var action = this.getAction(actionId);
        if (action) {
            var list = action.requestParameterList,
                listNum = list.length;

            for (var i = 0; i < listNum; i++) {
                if (list[i].id == parameterId) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     *is response parameter
     */
    p.isResponseParameter = function(actionId, parameterId) {
        var action = this.getAction(actionId);
        if (action) {
            var list = action.responseParameterList,
                listNum = list.length;

            for (var i = 0; i < listNum; i++) {
                if (list[i].id == parameterId) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * get page list
     */
    p.getPageList = function(moduleId) {
        return this.getModule(moduleId).pageList;
    };

    /**
     * get page by id
     */
    p.getPage = function(id) {
        var moduleList = _data.moduleList,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListNum = pageList.length;
            for (var j = 0; j < pageListNum; j++) {
                if (pageList[j].id == id) {
                    return pageList[j];
                }
            }
        }
        return null;
    };


    /**
     * get action index and action list
     */
    p.getActionIndexAndActionList = function(id) {
        var moduleList = _data.moduleList,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = 0; j < pageListCount; j++) {
                var page = pageList[j],
                    actionList = page.actionList,
                    actionListCount = actionList.length;
                for (var k = 0; k < actionListCount; k++) {
                    var action = actionList[k];
                    if (action.id == id) {
                        return {"actionIndex" : k, "actionList" : actionList};
                    }
                }
            }
        }
        return null;
    };

    /**
     * get page index and page list
     */
    p.getPageIndexAndPageList = function(id) {
        var moduleList = _data.moduleList,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = 0; j < pageListCount; j++) {
                var page = pageList[j];
                if (page.id == id) {
                    return {"pageIndex" : j, "pageList" : pageList};
                }
            }
        }
    };

    /**
     * update action
     */
    p.updateAction = function(obj) {
        var action = this.getAction(obj.id);
        if (action !== null) {
            action.name = obj.name;
            action.requestType = obj.requestType;
            action.requestUrl = obj.requestUrl;
            action.responseTemplate = obj.responseTemplate;
            action.description = obj.description;
        }
    };

    /**
     * update page
     */
    p.updatePage = function(obj) {
        var page = this.getPage(obj.id);
        if (page !== null) {
            page.name = obj.name;
            page.introduction = obj.introduction;
        }
    };

    /**
     * get data
     */
    p.getData = function() {
        return _data;
    };

    /**
     * add new module
     */
    p.addModule = function() {
        // generate temp id for added module
        var id = this.generateId();
        _data.moduleList.push(
                {
                    "id":id,
                    "name":"",
                    "introduction":"",
                    "pageList":[]
                }
        );
        return id;
    };

    /**
     * add new action
     */
    p.addAction = function(obj, addExisted, isCopy) {
        obj = deepCopy(obj);
        if (isCopy) {
            obj.name += '-副本';
        }
        var oldId = obj.id;
        obj.id = this.generateId();
        if (!addExisted || addExisted === 'mount') {
            obj.requestParameterList = [];
            obj.responseParameterList = [];
            /**
            if (addExisted === 'mount') {
                obj.requestType = '99';
                obj.responseTemplate = '{{mountId}}' + oldId;
            }
            */
        } else {
            // recursively update identifier
            var i;
            for (i = 0; i < obj.requestParameterList.length; i++) {
                recurUpdateParamId(obj.requestParameterList[i]);
            }
            for (i = 0; i < obj.responseParameterList.length; i++) {
                recurUpdateParamId(obj.responseParameterList[i]);
            }
        }
        this.getPage(obj.pageId).actionList.push(obj);

        function recurUpdateParamId(param) {
            param.id = p.generateId();
            if (param.parameterList) {
                for (var i = 0; i < param.parameterList.length; i++) {
                    recurUpdateParamId(param.parameterList[i]);
                }
            }
        }


        return obj.id;
    };

    /**
     * add new page
     */
    p.addPage = function(obj) {
        obj.id = this.generateId();
        obj.isIdGenerated = true;
        obj.actionList = [];
        this.getModule(obj.moduleId).pageList.push(obj);
    };

    /**
     * add request parameter
     */
    p.addRequestParameter = function(actionId) {
        var pNew = newParameter();
        this.getAction(actionId).requestParameterList.push(pNew);
        return pNew.id;
    };

    /**
     * add response parameter
     */
    p.addResponseParameter = function(actionId) {
        var pNew = newParameter();
        this.getAction(actionId).responseParameterList.push(pNew);
        return pNew.id;
    };

    /**
     * add child parameter of complex parameter
     */
    p.addChildParameter = function(parentParamId) {
        var p = this.getParameter(parentParamId);
        if (p !== null) {
            var pNew = newParameter();
            p.parameterList.push(pNew);
            return pNew.id;
        }
        return -1;
    };

    function newParameter() {
        var obj = {};
        obj.id = p.generateId();
        obj.identifier = "";
        obj.name = "";
        obj.remark = "";
        obj.validator = "";
        obj.dataType = "";
        obj.parameterList = [];
        return obj;
    }

    /**
     * remove module
     */
    p.removeModule = function(id) {
        var m = this.getModule(id);
        if (m === null) return;
        b.array.remove(_data.moduleList, m);

    };

    /**
     * remove action
     */
    p.removeAction = function(id) {
        var obj = this.getActionIndexAndActionList(id);
        if (obj === null) return;
        obj.actionList.splice(obj.actionIndex, 1);
    };

    /**
     * remove parameter
     */
    p.removeParameter = function(id) {
        var moduleList = _data.moduleList,
            l,
            parameter,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = 0; j < pageListCount; j++) {
                var page = pageList[j],
                    actionList = page.actionList,
                    actionListCount = actionList.length;
                for (var k = 0; k < actionListCount; k++) {
                    var action = actionList[k],
                        requestParameterList = action.requestParameterList,
                        requestParameterListCount = requestParameterList.length,
                        responseParameterList = action.responseParameterList,
                        responseParameterListCount = responseParameterList.length;
                    for (l = 0; l < requestParameterListCount; l++) {
                        parameter = requestParameterList[l];
                        if (parameter.id == id) {
                            requestParameterList.splice(l, 1);
                            return 0;
                        }
                        if (removeParameterRecursively(parameter, id) === 0) {
                            return 0;
                        }
                    }

                    for (l = 0; l < responseParameterListCount; l++) {
                        parameter = responseParameterList[l];
                        if (parameter.id == id) {
                            responseParameterList.splice(l, 1);
                            return 0;
                        }
                        if (removeParameterRecursively(parameter, id) === 0) {
                            return 0;
                        }
                    }
                }
            }
        }
        return -1;
    };

    /**
     * remove parameter recursively
     * return 0 if remove successfully,
     * otherwise return -1
     */
    function removeParameterRecursively(p, id) {
        var parameterList = p.parameterList,
            parameterListNum = parameterList && parameterList.length ? parameterList.length : 0;

        for (var i = 0; i < parameterListNum; i++) {
            var parameter = parameterList[i];
            if (parameter.id == id) {
                parameterList.splice(i, 1);
                return 0;
            }
            if (removeParameterRecursively(parameter, id) === 0) {
                return 0;
            }
        }
        return -1;
    }




    /**
     * remove page
     */
    p.removePage = function(id) {
        var obj = this.getPageIndexAndPageList(id);
        if (obj === null) return;
        obj.pageList.splice(obj.pageIndex, 1);
    };

    /**
     * set module name
     */
    p.setModuleName = function(id, name) {
        var module = this.getModule(id);
        if (module) {
            module.name = name;
        }
    };

    /**
     * set parameter
     */
    p.setParameter = function(id, value, property) {
        var p = this.getParameter(id);
        if (p === null) return;
        p[property] = value;
    };

    /**
     * set parameter obj
     */
    p.setParameterObj = function(p, obj) {
        if (!p || !p.id || !obj || !obj.id) return;
        p.name = obj.name;
        p.dataType = obj.dataType;
        p.identifier = obj.identifier;
        p.parameterList = obj.parameterList;
        p.remark = obj.remark;
        p.validator = obj.validator;
    };

    /**
     * get parameter
     */
    p.getParameter = function(id) {
        var moduleList = _data.moduleList,
            l,
            parameter,
            recursivelyFoundParameter,
            n = moduleList.length;
        for (var i = 0; i < n; i++) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = 0; j < pageListCount; j++) {
                var page = pageList[j],
                    actionList = page.actionList,
                    actionListCount = actionList.length;
                for (var k = 0; k < actionListCount; k++) {
                    var action = actionList[k],
                        requestParameterList = action.requestParameterList,
                        requestParameterListCount = requestParameterList.length,
                        responseParameterList = action.responseParameterList,
                        responseParameterListCount = responseParameterList.length;
                    for (l = 0; l < requestParameterListCount; l++) {
                        parameter = requestParameterList[l];
                        if (parameter.id == id) return parameter;
                        recursivelyFoundParameter = getParameterRecursively(parameter, id);
                        if (recursivelyFoundParameter) {
                            return recursivelyFoundParameter;
                        }

                    }

                    for (l = 0; l < responseParameterListCount; l++) {
                        parameter = responseParameterList[l];
                        if (parameter.id == id) return parameter;
                        recursivelyFoundParameter = getParameterRecursively(parameter, id);
                        if (recursivelyFoundParameter) {
                            return recursivelyFoundParameter;
                        }
                    }
                }
            }
        }
        return null;
    };

    /**
     * parameter auto complete
     * to find the similar parameter
     * and copy that to the current parameter
     */
    p.parameterAutoComplete = function(paramId) {
        var param = this.getParameter(paramId);
        var moduleList = _data.moduleList,
            l,
            itemL,
            n = moduleList.length;
        for (var i = n -1; i > -1; i--) {
            var module = moduleList[i],
                pageList = module.pageList,
                pageListCount = pageList.length;
            for (var j = pageListCount -1; j > -1; j--) {
                var page = pageList[j],
                    actionList = page.actionList,
                    actionListCount = actionList.length;
                for (var k = actionListCount -1; k > -1; k--) {
                    var action = actionList[k],
                        requestParameterList = action.requestParameterList,
                        requestParameterListCount = requestParameterList.length,
                        responseParameterList = action.responseParameterList,
                        responseParameterListCount = responseParameterList.length;
                    for (l = requestParameterListCount -1; l > -1; l--) {
                        itemL = requestParameterList[l];
                        if (this.parameterAutoCompleteRecursively(itemL, param)) {
                            return true;
                        }
                    }

                    for (l = responseParameterListCount -1; l > -1; l--) {
                        itemL = responseParameterList[l];
                        if (this.parameterAutoCompleteRecursively(itemL, param)) {
                            return true;
                        }
                    }
                }
            }
        }
    };

    /**
     * parameter auto complete
     * to find the similar parameter
     * and copy that to the current parameter
     */
    p.parameterAutoCompleteRecursively = function(recuredParam, autoCompletedParam) {
        if (!recuredParam || !autoCompletedParam) return;
        if (((recuredParam.name == autoCompletedParam.name && recuredParam.name !== "") ||
                (recuredParam.identifier == autoCompletedParam.identifier && autoCompletedParam.identifier !== "")) &&
                recuredParam.id != autoCompletedParam.id) {
            var clonedObj = b.object.clone(recuredParam);
            p.resetAllChildParameterId(clonedObj);
            this.setParameterObj(autoCompletedParam, clonedObj);
            return true;
        }

        var parameterList = recuredParam.parameterList;
        if (!parameterList) return;
        var parameterListNum = parameterList.length;
        for (var i = parameterListNum - 1; i > -1; i--) {
            if (this.parameterAutoCompleteRecursively(parameterList[i], autoCompletedParam))
                return true;
        }
    };
    /**
     *  is action in module
     */
    p.isActionInModule = function(actionId, moduleId) {
        if (!moduleId) {
            return false;
        }
        var module = p.getModule(moduleId);
        if (!module) return false;

        var pageList = module.pageList,
            pageListNum = pageList.length;

        for (var i = 0; i < pageListNum; i++) {
            var page = pageList[i],
                actionList = page.actionList,
                actionListNum = actionList.length;
            for (var j = 0; j < actionListNum; j++) {
                if (actionList[j].id == actionId) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * clear enough...
     * @param {number} actionId action id
     * @param {number} pageId page id
     * @return {bolean} true is action is under the page specified
     */
    p.isActionInPage = function(actionId, pageId) {
        var p = this.getPage(pageId);

        if (p) {
            var aList = p.actionList,
                n = aList.length,
                i = 0;
            for (; i < n; i++) {
                if (+aList[i].id === +actionId) {
                    return true;
                }
            }

        }
        return false;
    };

    /**
     * get module id by action id
     */
    p.getModuleIdByActionId = function(actionId) {
        var mList = _data.moduleList;
        var n = mList.length;
        while (n--) {
            if (this.isActionInModule(actionId, mList[n].id)) {
                return mList[n].id;
            }
        }
    };

    /**
     * get parameter recursively
     * return obj if exists,
     * otherwise return null
     */
    function getParameterRecursively(p, id) {
        var parameterList = p.parameterList,
            parameterListNum = parameterList &&     parameterList.length ? parameterList.length : 0;

        for (var i = 0; i < parameterListNum; i++) {
            var parameter = parameterList[i];
            if (parameter.id == id) {
                return parameter;
            }

            var recursivelyFoundParameter = getParameterRecursively(parameter, id);
            if (recursivelyFoundParameter) {
                return recursivelyFoundParameter;
            }
        }

        return null;
    }

    /**
     * is empty
     */
    p.isEmpty = function() {
        return _data.moduleList.length === 0;
    };


    p.generateId = function() {
        return _generatedId--;
    };

    /**
     * reset parameter id recursively
     * including child parameters
     * of complex parameter
     */
    p.resetAllChildParameterId = function(param) {
        if (!param || !param.id || !param.parameterList) return;
        var parameterList = param.parameterList,
            parameterListNum = parameterList.length;
        for (var i = 0; i < parameterListNum; i++) {
            var item = parameterList[i];
            item.id = this.generateId();
            p.resetAllChildParameterId(item);
        }
    };

    /**
     * serach project by key
     */
    p.search = function(key) {
        var RESULT_LENGTH_LIMIT = 6;
        var r = {
            'byActionName' : [],
            'byActionUrl'  : [],
            'byPageName' : []
        };

        var AN = 'byActionName',
            AU = 'byActionUrl',
            PN = 'byPageName',
            KEYS = [AN, AU, PN];

        var mList = _data.moduleList,
            mListNum = mList.length,
            mItem,
            pList,
            pListNum,
            pItem,
            aList,
            aListNum,
            aItem;

        var i, j, k, m, n;

        for (i = 0; i < mListNum; i++) {
            mItem = mList[i];

            for (j = 0; j < mItem.pageList.length; j++) {
                pItem = mItem.pageList[j];

                if (pItem.name.indexOf(key) != -1) {
                    r[PN].push(pItem);
                }

                for (k = 0; k < pItem.actionList.length; k++) {
                    aItem = pItem.actionList[k];
                    if (aItem.name.indexOf(key) != -1) {
                        r[AN].push(aItem);
                    }
                    if (aItem.requestUrl.indexOf(key) != -1) {
                        r[AU].push(aItem);
                    }
                }
            }
        }

        for (i = 0; i < KEYS.length; i++) {
            n = r[KEYS[i]].length;
            r[KEYS[i] + '_length'] = n;
            if (n > RESULT_LENGTH_LIMIT) {
                r[KEYS[i]].length = RESULT_LENGTH_LIMIT;
            }
        }

        return r;
    };

 })();

/*                                                      *
 *                                                      *
 *         ##project-module-end                         *
 *                                                      *
 ********************************************************/



/********************************************************
 *                                                      *
 *         ##workspace-module-begin                     *
 *                                                      *
 *                                                      */
(function() {

    rap.workspace = rap.workspace || {};

    rap.workspace._get = function(key) {
        return eval(key);
    };

    /******************************************************
     *                                                    *
     * Instructions:                                      *
     * m     -  Module                                    *
     * mt    -  Module b                                  *
     * p     -  page                                      *
     * param - parameter                                  *
     * a     -  Action                                    *
     * v     -  Validator                                 *
     * ws    -  Workspace                                 *
     * b     -  baidu                                     *
     * e     -  ecui                                      *
     *                                                    *
     ******************************************************/

    var ws       = rap.workspace,       // workspace module
        p        = rap.project,         // project module
        util     = rap.util,            // utility module
        b        = baidu,               // tangram package
        e        = ecui,                // ecui package
        _curModuleId,                   // current module id
        _data,                          // project data object
        _curActionId,                   // current action id
        _isProcessing,                  // is workspace processing something
        _messageTimer,                  // message timer
        _messageContainerId,            // message container id
        _sessionDelayTimer,             // session delay timer
        _doesSoFarNoActionDisplay,      // does so far no action display on the page
        _editContext,                   // edit context
        _isEditMode,                    // is edit mode
        _generateCounter = -1,          // generate unique id from -1 to -Infinity
        _deletedObjectList,             // deleted object list
        _viewState,                     // view state, used for recover view state after page binding
        _debugCounter,                  // debug message counter
        _isLocalStorageEnabled,         // is local storage enabled, need HTML5 supports
        _isMockDisplay,                 // will mock labels displayed, default:false
        _draftData,                     // when not defined, will be switched to edit mode with draft data
        URL      = null,                // url object, contains all url required
        MESSAGE = {
            "CONFIRM_COVER"                     : "是否确定覆盖旧的内容?",
            "CONFIRM_SAVE"                      : "是否确认保存?",
            "CONFIRM_CANCEL"                    : "是否确定取消?",
            "CONFIRM_CHECKIN"                   : "是否确定提交?",
            "CONFIRM_CHECKOUT"                  : "是否确定获取?",
            "CHECK_LOCK_CONFLICKTION"           : "正在为您检查工作区锁定状态...",
            "CHECK_LOCK_CONFLICKTION_COMPLETED" : "您已成功切换至编辑状态，该项目已被您锁定。",
            "CHOOSE_AT_FIRST"                   : "请先选择您要操作的选项.",
            "SAVE_LIST_MAX_LENGTH_OVERFLOW"     : "您的存档空间已满，请删除不必要的存档，或覆盖旧的存档。",
            "CONFIRM_DELETE"                    : "您是否确认删除?",
            "LOADING"                           : "加载中...",
            "LOAD"                              : "已完成加载",
            "MODULE_LOADING"                    : "正在加载项目模块...",
            "MODULE_LOAD"                       : "项目模块加载完成",
            "VERSION_LOADING"                   : "正在请求版本信息...",
            "VERSION_LOAD"                      : "版本信息已加载",
            "VERSION_EXIT"                      : "已退出版本观看模式",
            "VERSION_SWITCHING"                 : "正在为您切换版本...",
            "VERSION_SWITCHED"                  : "版本切换成功",
            "VERSION_SWITCH_ERROR"              : "版本切换中发生错误，已恢复至切换前",
            "SAVING"                            : "正在保存...",
            "SAVED"                             : "保存成功",
            "DELETING"                          : "正在删除...",
            "DELETED"                           : "删除成功",
            "PROCESSING"                        : "正在处理中,请稍后...",
            "PROCESSED"                         : "处理成功",
            "ERROR"                             : "出现错误，请稍后重试。",
            "DO_NOT_DOUBLE_CLICK"               : "您的请求正在处理，请勿重复点击。",
            "FATAL_ERROR"                       : "发生严重错误，请联系维护人员并保留现场。",
            "SESSION_DELAY_ERROR"               : "Session延时发生异常，建议您立即保存工作区并联系维护人员."
        },
        TEMPLATE = {            // static template

            "REQUEST_BEGIN"                 : "<h2>请求参数列表</h2><table class=\"table-a\"><tr class=\"head\"><td class=\"head-expander\"></td><td class=\"head-identifier\">变量名</td><td class=\"head-name\">含义</td><td class=\"head-type\">类型</td><td class=\"head-remark\">备注</td></tr>",
            "REQUEST_BEGIN_EDIT"            : "<h2>请求参数列表</h2><table class=\"table-a\"><tr class=\"head\"><td class=\"head-expander\"></td><td class=\"head-op\">OP</td><td class=\"head-identifier\">变量名</td><td class=\"head-name\">含义</td><td class=\"head-type\">类型</td><td class=\"head-remark\">备注</td></tr>",
            "REQUEST_END"                   : "</table>",
            "REQUEST_PARAMETER_ADD_BUTTON"  : "<div class='btns-container'><a href=\"#\" class=\"btn btn-info btn-xs\" onclick=\"ws.addParam('request'); return false;\"><i class='glyphicon glyphicon-plus'></i>添加参数</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href\"#\" class='btn btn-default btn-xs' onclick=\"ws.importJSON(true); return false;\"><i class='glyphicon glyphicon-transfer'></i>导入JSON</a></div>",

            "RESPONSE_BEGIN"                : "<h2>响应参数列表</h2><table class=\"table-a\"><tr class=\"head\"><td class=\"head-expander\"></td><td class=\"head-identifier\">变量名</td><td class=\"head-name\">含义</td><td class=\"head-type\">类型</td><td class=\"head-remark\">备注</td></tr>",
            "RESPONSE_BEGIN_EDIT"           : "<h2>响应参数列表</h2><table class=\"table-a\"><tr class=\"head\"><td class=\"head-expander\"></td><td class=\"head-op\">OP</td><td class=\"head-identifier\">变量名</td><td class=\"head-name\">含义</td><td class=\"head-type\">类型</td><td class=\"head-remark\">备注</td></tr>",
            "RESPONSE_END"                  : "</table>",
            "RESPONSE_PARAMETER_ADD_BUTTON" : "<div class='btns-container'><a href=\"#\" class=\"btn btn-info btn-xs\" onclick=\"ws.addParam('response'); return false;\"><i class='glyphicon glyphicon-plus'></i>添加参数</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href\"#\" class='btn btn-default btn-xs' onclick=\"ws.importJSON(); return false;\"><i class='glyphicon glyphicon-transfer'></i>导入JSON</a></div>",

            "SAVE_PANEL_BEGIN"              : "<div id=\"div-save-panel\">",
            "SAVE_PANEL_END"                : "</div>",

            "VERSION_PANEL_BEGIN"           : "<div id=\"div-version-panel\"><table class='table-version'><tr class='head'><td class='version-op'>OP</td><td class='version'>版本</td><td class='operator'>操作人</td><td class='operation-time'>操作时间</td><td class='version-desc'>描述</td></tr>",
            "VERSION_PANEL_END"             : "</table></div>",

            "MODULE_ADD_BUTTON"             : "<div id=\"div-add-m\"><a href=\"#\" style=\"margin:0 10px;\" onclick=\"ws.addM(); return false;\"><i class='glyphicon glyphicon-plus' style='color:#5bc0de'></i></a></div>",

            "SEPERATOR"                     : "<div class=\"seperator\"></div>" ,

            "NO_DATA_CHECKED"               : "<div class='log-item'><font color='gray'>没有可获取或更新的数据</font></div>"
        },
        CONFIG = {
            "SAVE_LIST_MAX_LENGTH"       : 10,
            "DEFAULT_MAX_LENGTH"         : 50,
            "REMARK_MAX_LENGTH"          : 9999,
            "DEFAULT_INPUT_WIDTH"        : 100,
            "MODULE_NAME_WIDTH"          : 100,
            "PARAMETER_NAME_WIDTH"       : 160,
            "PARAMETER_IDENTIFIER_WIDTH" : 160,
            "PARAMETER_TYPE_WIDTH"       : 110,
            "PARAMETER_REMARK_WIDTH"     : 300,
            "MESSAGE_TIMEOUT"            : 5000,
            "SESSION_DELAY_TIMESPAN"     : 300000,
            "KEYPRESS_EVENT_NAME"        : (baidu.browser.firefox ? "keypress" : "keydown")
        },
        CONST = {
            "WARN"     : "warn",
            "ERROR"    : "error",
            "LOADING"  : "loading",
            "LOAD"     : "load",
            "NORMAL"   : "normal",
            "EDIT"     : "edit",
            "VERSION"  : "version"
        },
        ELEMENT_ID = {
            "SAVE_PANEL"             : "saveFloater",
            "SAVE_PANEL_CONTENT"     : "div-save-floater-content",
            "SAVE_PANEL_MESSAGE"     : "div-save-floater-message",
            "VERSION_PANEL"          : "versionFloater",
            "VERSION_PANEL_MESSAGE"  : "div-version-floater-message",
            "VERSION_PANEL_CONTENT"  : "div-version-floater-content",
            "CHECKOUT_PANEL"         : "checkoutFloater",
            "CHECKOUT_PANEL_CONTENT" : "div-checkout-floater-content",
            "CHECKOUT_PANEL_MESSAGE" : "div-checkout-floater-message",
            "CHECKIN_PANEL"          : "checkinFloater",
            "CHECKIN_PANEL_CONTENT"  : "div-checkin-floater-content",
            "CHECKIN_PANEL_MESSAGE"  : "div-checkin-floater-message",
            "VSS_PANEL_MESSAGE"      : "div-saveVSS-floater-message",
            "WORKSPACE_MESSAGE"      : "div-w-message",
            "EDIT_INPUT"             : "txtMTName" ,
            "IMPORT_JSON_MESSAGE"    : "div-importJSON-floater-message",
            "RECOVER_WORKSPACE_MESSAGE" : "div-recoverWorkspace-floater-message"
        },
        PREFIX = {
            "SAVE" : "radio-save-"
        };

    /**
     * id generator
     */
    ws.generateId = function () {
        return p.generateId();
    };

    /**
     * initialize run when dom ready
     */
    ws.init = function(workspaceObj, urlObj, actionId) {
        var me = this;
        if (typeof actionId !== 'number' || actionId === 0) {
            var hashId = getHash();
            if (hashId) {
                actionId = hashId;
            }
        }
        var me = this;
        var cb = arguments[arguments.length - 1];
        if (!cb || typeof cb !== 'function') {
            cb = function(){};
        }
        _isLocalStorageEnabled = typeof(localStorage) != 'undefined';
        _isMockDisplay = false;
        URL = urlObj;
        try {

            _data = workspaceObj;

            // backup project data
            _data.projectDataOriginal = b.object.clone(_data.projectData);


            // local storage draft feature
            if (_isLocalStorageEnabled) {
                var draftData = localStorage.getItem('_data');
                if (draftData) {
                    var draftDataDate = new Date();
                    draftDataDate.setTime(+localStorage.getItem('_dataDate'));
                    if (confirm('检测到您有【未保存】的草稿，时间在' + draftDataDate.toString() + ', 是否恢复?')) {
                        _draftData = draftData;
                    }
                }
            }

        } catch(e) {
            showMessage(CONST.ERROR, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
        }
        b.dom.ready(function () {

            /**
             * to prevent session timeout, delay the session
             */
            _sessionDelayTimer = setInterval(sessionDelay, CONFIG.SESSION_DELAY_TIMESPAN);

            /**
             * initialize variables that shuold be only initialized once
             */
            _viewState = {
                "moduleId"   : null,
                "pageId"     : null,
                "actionId"   : null,
                "parameterId": null 
            };

            _debugCounter = 1;

            window.onbeforeunload = function() {
                if (_isEditMode) {
                    if (_isLocalStorageEnabled) {
                        _data.projectData = p.getData();
                        localStorage.setItem('_data', b.json.stringify(_data));
                        localStorage.setItem('_dataDate', new Date().getTime());

                        // backup for administrators
                        localStorage.setItem('_data' + (new Date).getTime(), b.json.stringify(_data));
                    }
                    return "现在退出所有修改都将丢失，确认退出？";
                } else {
                    if (_isLocalStorageEnabled) {
                        localStorage.removeItem('_data');
                        localStorage.removeItem('_dataDate');
                    }
                }
            };

            /**
             * bind page
             */
            bind(undefined, actionId);

            /**
             * bind events
             */

            // tree node fixed, for <a></a>(tree node control panel)
            ecui.ui.Tree.prototype.onclick = function (event) {
                return event.target == this.getBase();
            };

            // callback invokation
            cb();
        });


        // workspace UI events register
        var inputSearch = $('#inputSearch');
        inputSearch.keyup(function() {
            workspaceSearch(inputSearch.val(), arguments);
        });

        $(document.body).keypress(function(ev) {
            if (ev.altKey && ev.charCode === 402) {
                inputSearch.focus();
                ev.preventDefault();
            }
        });

    };

    ws.workspaceSearchResultHandler = function(type, id) {
        var page;
        var actionId;
        var moduleId;
        if (type === 'a') {
            actionId = id;
        } else if (type === 'p') {
            page = p.getPage(id);
            if (page.actionList.length) {
                actionId = page.actionList[0].id;
            }
        }


        if (actionId) {
            moduleId = p.getModuleIdByActionId(actionId);
            this.switchM(moduleId);
            this.switchA(actionId);
        }

        $('#dropdown-workspace-search').hide();
        $("#inputSearch").val('');
    };


    ws.showPluginCode = function() {
        ecFloater.show("pluginCodeFloater");
        b.g('pluginCodeInput').select();
        var ele = document.getElementById('pluginCodeInput');
        ele.selectionEnd = ele.value.length;
    };

    ws.closePluginCodeFloater = function(save) {
        /**
         * related id filter
         */
        function filter(ids) {
            if (!ids) {
                return "";
            }
            ids = ids.split(',');
            var arr = [];
            var id;
            var key;
            for (key in ids) {
                if (!isNaN(+ids[key])) {
                    arr.push(ids[key]);
                }
            }
            return arr.join(',');
        }
        e.get("pluginCodeFloater").hide();
        if (save) {
            var ele = $('#divRelatedIds');
            var val = filter(ele.val());
            var q = "id=" + p.getId() + "&ids=" + val;
            ele.val(val);
            showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SAVING);
            b.ajax.post(URL.updateReleatedIds, q, function(xhr, response) {
                try {
                    var obj = eval("(" + response + ")");
                    showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SAVED);
                } catch(e) {
                    showMessage(CONST.ERROR, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
                }
            });
        }
    };

    ws.openActionUrlFloater = function(actionId) {
        ecFloater.show("actionUrlFloater");
        $('#actionUrlFloater-input').val(URL.myWorkspace + '?projectId=' + p.getId() + '&actionId=' + actionId);
        $('#actionUrlFloater-input').focus().select();
        var ele = $('#actionUrlFloater-input')[0];
        ele.selectionEnd = ele.value.length;
    };


    ws.closeActionUrlFloater = function() {
        e.get('actionUrlFloater').hide();
    };

    ws._getData = function() {
        return p.getData();
    };

    /**
     * switch module
     */
    ws.switchM = function(id, defaultActionId, preventDefaultSwitch) {
        if (id === undefined) {
            console.error('ws.switchM(undefined)');
            return;
        }

        if (isEditing()) {
            return;
        }

        var validDefaultActionId = defaultActionId && p.isActionInModule(defaultActionId, id);

        if (id === null) {
            setEmptyView(true);
            return;
        }
        var oldCurM = getDiv(_curModuleId, "m"),
            oldCurMT = getDiv(_curModuleId, "mt"),
            newCurM = getDiv(id, "m"),
            newCurMT = getDiv(id, "mt");

        if (newCurM && newCurMT) {

            // oldCurM can be null if it was just deleted, so check null
            if (oldCurM && oldCurMT) {
                oldCurM.style.display = "";
                b.dom.removeClass(oldCurMT, "cur");
            }

            newCurM.style.display = "block";
            b.dom.addClass(newCurMT, "cur");
        }

        _curModuleId = id;

        if (validDefaultActionId) {
            ws.switchA(defaultActionId);
        } else if (!preventDefaultSwitch) {
            // jump to the first action
            switchToCurA();
        }
    };

    /**
     * switch action
     *
     * @actionId     {number} action id
     * @forceRefresh {boolean} if true, refresh will be done forcely (ignore the case
     *                         when target action id equals to current action id
     */
    ws.switchA = function(actionId, forceRefresh) {
        var action = p.getAction(actionId);
        if (action === null) return;

        setHash(actionId);

        if (!forceRefresh) {
            if (!p.isActionInModule(actionId, _curModuleId)) {
                console.error('invalid invoke: ws.switchA(', actionId, ",", forceRefresh, ")");
                return;
                /**
                var mid = p.getModuleIdByActionId(actionId);
                if (mid !== undefined) {
                    ws.switchM(mid);
                } else {
                    return;
                }
                */
            }
        }
        getDiv(_curModuleId, "a").innerHTML = getAHtml(action);
        renderA();


        var last = b.g('div-a-tree-node-' + _curActionId);
        var cur = b.g('div-a-tree-node-' + actionId);

        if (last && b.dom.hasClass(last, 'cur')) {
            b.dom.removeClass(last, 'cur');
        }
        if (cur && !b.dom.hasClass(cur, 'cur')) {
            b.dom.addClass(cur, 'cur');
        }

        _curActionId = actionId;
    };

    /**
     * add module
     */
    ws.addM = function() {
        var div1 = b.g("div-m-list"),
            div2 = b.g("div-mt-list"),
            id = p.addModule(),
            m = p.getModule(id);

        if (isEditing()) {
            cancelEdit();
        }

        // from empty to normal view
        if (p.getModuleList().length == 1) {
            setEmptyView(false, id);
        }

        div1.innerHTML += getMHtml(m);
        b.dom.insertHTML("div-add-m", "beforeBegin", getMTHtml(m));
        ws.switchM(id);
        ws.edit(id, 'mt');
    };

    /**
     * add parameter
     */
    ws.addParam = function(type, parentParamId) {
        var newParamId = -1;
        if (type == "child") {
            newParamId = p.addChildParameter(parentParamId);
        } else if (type == "request") {
            newParamId = p.addRequestParameter(_curActionId);
        } else if (type == "response") {
            newParamId = p.addResponseParameter(_curActionId);
        } else {
            throw new Error("unkown type: " + type + " in ws.addParam(type, parentParamId);");
        }
        // finish edit before refresh
        this.finishEdit();
        this.switchA(_curActionId);
        if (newParamId > 0) {
            this.edit(newParamId, "param-identifier");
        }
    };


    /**
     * remove current module
     */
    ws.removeM = function() {
        if (!confirm(MESSAGE.CONFIRM_DELETE)) return;
        if (p.isEmpty()) return;
        if (isEditing()) cancelEdit();
        // at first, executing delete operation...
        p.removeModule(_curModuleId);
        putObjectIntoDeletedPool("Module", _curModuleId);
        b.dom.remove(getDiv(_curModuleId, "m"));

        // delete a element since module tab div is inside an <a>
        var a = b.dom.getAncestorByTag(getDivId(_curModuleId, "mt"), "a");
        e.dom.remove(a);

        // process ui elements
        var moduleList = p.getModuleList();
        if (!moduleList || moduleList.length === 0) { // if no module left
            setEmptyView(true);
        } else {
            ws.switchM(moduleList[moduleList.length - 1].id);
        }
    };

    /**
     * remove action
     */
    ws.removeA = function(actionId) {
        if (!confirm(MESSAGE.CONFIRM_DELETE)) return;
        // update model
        p.removeAction(actionId);
        putObjectIntoDeletedPool("Action", actionId);
        // update module tree
        b.dom.remove(b.g("div-a-tree-node-" + actionId));
        if (actionId == _curActionId) {
            switchToCurA();
        }
    };

    /**
     * remove page
     */
    ws.removeP = function(pageId) {
        if (!confirm(MESSAGE.CONFIRM_DELETE)) return;
        // update model
        p.removePage(pageId);
        putObjectIntoDeletedPool("Page", pageId);
        // update module tree
        updateCurMTree();
    };

    /**
     * remove parameter
     */
    ws.removeParam = function(paramId) {
        p.removeParameter(paramId);
        putObjectIntoDeletedPool("Parameter", paramId);
        ws.switchA(_curActionId);
    };

    /**
     * edit
     */
    ws.edit = function(id, key) {
        var el,
            str = "",
            oldValue,
            width = CONFIG.DEFAULT_INPUT_WIDTH;

        // operation column needn't edit
        if (!_isEditMode || key == "param-op") {
            return;
        }

        // check edit state, if the one to be
        // edited is being edited, ignore it.
        if (isEditing()) {
            if (_editContext.id == id && _editContext.key == key) {
                return ;
            } else {
                this.finishEdit();
            }
        }

        var param = p.getParameter(id)

        switch (key) {
            case "mt":
                width = CONFIG.MODULE_NAME_WIDTH;
                el = getDiv(id, key);
                oldValue = b.trim(el.innerHTML);
                str += getEditInputHtml(oldValue, width, CONFIG.DEFAULT_MAX_LENGTH);
                break;
            case "param-name":
                width = CONFIG.PARAMETER_NAME_WIDTH;
                el = getTd(id, key);
                oldValue = b.trim(param.name);
                str += getEditInputHtml(oldValue, width, CONFIG.DEFAULT_MAX_LENGTH);
                break;
            case "param-identifier":
                width = CONFIG.PARAMETER_IDENTIFIER_WIDTH;
                el = getTd(id, key);
                oldValue = b.trim(param.identifier);
                str += getEditInputHtml(oldValue, width, CONFIG.DEFAULT_MAX_LENGTH);
                break;
            case "param-validator":
                el = getTd(id, key);
                oldValue = b.trim(param.validator);
                str += getEditInputHtml(oldValue, width, CONFIG.DEFAULT_MAX_LENGTH);
                break;
            case "param-remark":
                width = CONFIG.PARAMETER_REMARK_WIDTH;
                el = getTd(id, key);
                // oldValue = b.trim(el.innerHTML)
                oldValue = b.trim(param.remark);
                str += getEditInputHtml(oldValue, width, CONFIG.REMARK_MAX_LENGTH);
                break;
            default:
                throw Error("not implemented, key:" + key);
        }

        // save edit state
        editing(id, oldValue, key);

        el.innerHTML = str;

        processInputEvent(true);
        focusElement(b.g(ELEMENT_ID.EDIT_INPUT));
    };

    /**
     * validate
     */
    ws.validate = function() {
        showMessage(CONST.LOADING, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.PROCESSING);
        if (!processing()) return;
        setTimeout(function() {
            ecFloater.show("validateFloater");
            e.get("validateFloater").setTitle("Validate Workspace");
            showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.PROCESSED);
            processed();
        }, 5000);
    };

    /**
     * save
     */
    ws.save = function() {
        if (!processing()) return;
        ecFloater.show(ELEMENT_ID.SAVE_PANEL);
        e.get(ELEMENT_ID.SAVE_PANEL).setTitle("Save Workspace");
        processed();
    };

    /**
     * start version manage
     */
    ws.version = function() {
        if (!processing()) return;
        e.get(ELEMENT_ID.VERSION_PANEL).setTitle("版本管理");
        ecFloater.show(ELEMENT_ID.VERSION_PANEL);
        setSelectedValue("radioCheckIn", -1);
        var panelDiv = b.g("div-version-panel");
        if (panelDiv) {
            panelDiv.scrollTop = 0;
        }
        processed();
    };


    /**
     * used when something bad happend :(
     */
    ws._processed = function() {
        processed();
    };


    /**
     * check in
     */
    ws.checkIn = function() {
        if (!confirm(MESSAGE.CONFIRM_CHECKIN)) return;
        ecFloater.show(ELEMENT_ID.CHECKIN_PANEL);
        ecui.get(ELEMENT_ID.CHECKIN_PANEL).setTitle("Check In");
        var q = "projectId=" + p.getId() + "&projectData=" + util.escaper.escapeInU(b.json.stringify(p.getData())) +
            "&projectDataOriginal=" + util.escaper.escapeInU(b.json.stringify(_data.projectDataOriginal));
        showMessage(CONST.LOADING, ELEMENT_ID.CHECKIN_PANEL_MESSAGE, MESSAGE.PROCESSING);
        if (!processing()) return;
        b.ajax.post(URL.checkIn, q, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                p.init(obj.projectData);
                _data.projectDataOriginal = b.object.clone(obj.projectData);
                b.g(ELEMENT_ID.CHECKIN_PANEL_CONTENT).innerHTML = obj.log ? obj.log : TEMPLATE.NO_DATA_CHECKED;
                bind(true);
                showMessage(CONST.LOAD, ELEMENT_ID.CHECKIN_PANEL_MESSAGE, MESSAGE.PROCESSED);
            } catch(e) {
                showMessage(CONST.ERROR, ELEMENT_ID.CHECKIN_PANEL_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });
    };


    /**
     * hide save panel
     */
    ws.closeSavePanel = function() {
        e.get(ELEMENT_ID.SAVE_PANEL).hide();
    };

    /**
     * hide version panel
     */
    ws.closeVersionPanel = function() {
        e.get(ELEMENT_ID.VERSION_PANEL).hide();
    };

    /**
     * hide check out panel
     */
    ws.closeCheckOutPanel = function() {
        b.g(ELEMENT_ID.CHECKOUT_PANEL_MESSAGE).innerHTML = "";
        b.g(ELEMENT_ID.CHECKOUT_PANEL_CONTENT).innerHTML = "";
        ecui.get(ELEMENT_ID.CHECKOUT_PANEL).hide();
    };

    /**
     * hide check in panel
     */
    ws.closeCheckInPanel = function() {
        b.g(ELEMENT_ID.CHECKIN_PANEL_MESSAGE).innerHTML = "";
        b.g(ELEMENT_ID.CHECKIN_PANEL_CONTENT).innerHTML = "";
        ecui.get(ELEMENT_ID.CHECKIN_PANEL).hide();
    };

    /**
     * delete save
    ws.removeSave = function() {
        var save = getSelectedSave();
        if (save === null) {
            showMessage(CONST.WARN, ELEMENT_ID.SAVE_PANEL_MESSAGE, MESSAGE.CHOOSE_AT_FIRST);
            return;
        }

        if (!confirm(MESSAGE.CONFIRM_DELETE)) return;
        showMessage(CONST.LOADING, ELEMENT_ID.SAVE_PANEL_MESSAGE, MESSAGE.DELETING);
        if (!processing(ELEMENT_ID.SAVE_PANEL_MESSAGE)) return;
        b.ajax.post(URL.removeSave, "id=" + _data.id + "&saveId=" + save.id, function(xhr,response) {
            try {
                var obj = eval("(" + response + ")";
                _data.saveList = obj.saveList;
                initSavePanel();
                showMessage(CONST.LOAD, ELEMENT_ID.SAVE_PANEL_MESSAGE, MESSAGE.DELETED);
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.SAVE_PANEL_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });
    };
    */

    /**
     * data type select changed
     */
    ws.dataTypeSelectChanged = function(parameterId, value) {
        p.setParameter(parameterId, value, "dataType");
        if (value == "object" || value == "array<object>") {
            this.switchA(_curActionId);
        }
    };

    /**
     * radio version changed
     */
    ws.radioVersionChanged = function(position) {
        b.g("divVersion").innerHTML = p.getVersion() + " -> " + versionUpgrade(p.getVersion(), position);
    };


    /**
     * data type select key pressed
     */
    ws.dataTypeKeyPressed = function(e, parameterId) {
        if (b.event.getKeyCode(e) == 9) {
            this.edit(parameterId, "param-remark");
        }
        b.event.stop(e);
    };

    /**
     * invoked when edit is ready to be finished
     */
    ws.finishEdit = function(fromOnClick) {
        if (!isEditing()) return;
        var inputDiv = b.g(ELEMENT_ID.EDIT_INPUT);
        if (!inputDiv) return;
        var editContext = stopEditing(),
            newValue = b.trim(inputDiv.value),
            needFreshAction = false,
            el;

        switch (editContext.key) {
            case "mt":
                el = getDiv(editContext.id, editContext.key);
                if (newValue === '') {
                    newValue = '未命名';
                }
                p.setModuleName(editContext.id, newValue);
                updateCurMTree();
                break;
            case "param-name":
            case "param-identifier":
            case "param-validator":
            case "param-remark":
                el = getTd(editContext.id, editContext.key);
                var key = editContext.key;
                // param-name => name
                p.setParameter(editContext.id, newValue, key.substring(6, key.length));
                if (editContext.key === 'param-remark') {
                    newValue = remarkFilter(newValue);
                } else if (editContext.key === 'param-identifier') {
                    newValue = identifierFilter(newValue);
                }
                break;
            default:
                throw Error("not implemented finish edit for key:" + editContext.key);
        }
        processInputEvent(false);
        var idReturn = editContext.id;
        e.dom.setText(el, newValue);
        if (isEditing()) {
            stopEditing();
        }
        return idReturn;
    };

    /**
     * add or edit action
     */
    ws.doAddOrEditA = function() {
        if (!validate("formEditAFloater")) return;
        if (b.g("editAFloater-id").value === "") {
            this.doAddA();
        } else {
            this.doEditA();
        }
    };

    /**
     * add or edit page
     */
    ws.doAddOrEditP = function() {
        if (!validate("formEditPFloater")) return;
        if (b.g("editPFloater-id").value === "") {
            this.doAddP();
        } else {
            this.doEditP();
        }
    };

    /**
     * do import JSON
     */
    ws.doImportJSON = function() {
        if (!validate('formImportJSONFloater')) return;
        var ele = b.g('importJSONFloater-text');
        var txt = ele.value;
        try {
            if (typeof JSON === 'undefined') {
                alert('您用的啥浏览器啊？连JSON转换都不支持也...请使用IE9+/Chrome/FF试试看？');
                return;
            }
            var data = eval("(" + txt + ")");

            if (data instanceof Array) {
                data = data[0];
            }

            ele.value = '';
            processJSONImport(data);
            this.switchA(_curActionId);
            this.cancelImportJSON();
         } catch (e) {
            showMessage(CONST.ERROR, ELEMENT_ID.IMPORT_JSON_MESSAGE, 'JSON解析错误: ' + e.message);
         }
     };



    /**
     * get action response JSON format
     * array => [{},{},{}]
     * object => {}
     *
     * @return array / object
     */
    function getActionStruct(action) {
        var code = '@type=array_map;';
        var desc = action.description || "";
        if (desc.substring(0, 16) === code) {
            return 'array';
        } else {
            return 'object';
        }
    }

    /**
     * @struct  array / object
     */
    function setActionStruct(action, struct) {
        var code = '@type=array_map;';
        var desc = action.description || "";
        if (desc.substring(0, 16) === code) {
            if (struct !== 'array') {
                action.description = action.description.substring(16);
            }
        } else {
            if (struct === 'array') {
                action.description = code + desc;
            }
        }
    }

    /**
     * edit action
     */
    ws.editA = function(actionId) {
        if (!_isEditMode) return;
        var action = p.getAction(actionId);
        initEditAFloater();
        b.g("editAFloater-id").value = action.id;
        b.g("editAFloater-name").value = action.name;
        setSelectedValue("editAFloater-type", action.requestType);
        var struct = getActionStruct(action);
        setSelectedValue("editAFloater-struct", struct);
        // hide action struct in description textarea
        var desc = action.description;
        var code = '@type=array_map;';
        if (desc && desc.substring(0, 16) === code) {
            desc = desc.substring(16);
        }

        b.g("editAFloater-requestUrl").value = action.requestUrl;
        b.g("editAFloater-responseTemplate").value = action.responseTemplate;
        b.g("editAFloater-description").value = desc;
        e.get("editAFloater").setTitle("模型管理 - 编辑请求");
        ecFloater.show("editAFloater");
    };

    /**
     * edit page
     */
    ws.editP = function(pageId) {
        if (!_isEditMode) return;
        var page = p.getPage(pageId);
        initEditPFloater();
        b.g("editPFloater-id").value = page.id;
        b.g("editPFloater-name").value = page.name;
        b.g("editPFloater-introduction").value = page.introduction;
        e.get("editAFloater").setTitle("模型管理 - 编辑页面");
        ecFloater.show("editPFloater");
    };

    /**
     * add action
     */
    ws.addA = function(pageId) {
        initEditAFloater();
        b.g("editAFloater-pageId").value = pageId;
        e.get("editAFloater").setTitle("模型管理 - 添加新请求");
        ecFloater.show("editAFloater");
    };

    /**
     * add page
     */
    ws.addP = function() {
        initEditPFloater();
        e.get("editPFloater").setTitle("模型管理 - 添加新页面");
        ecFloater.show("editPFloater");
    };

    /**
     * submit action edit operation
     */
    ws.doEditA = function(actionId) {
        // loading action
        var action = {};
        action.id = b.g("editAFloater-id").value - 0;
        action.name = b.g("editAFloater-name").value;
        action.requestType = getSelectedValue("editAFloater-type");
        action.requestUrl = b.g("editAFloater-requestUrl").value;
        action.responseTemplate = b.g("editAFloater-responseTemplate").value;
        action.description = b.g("editAFloater-description").value;
        var struct = getSelectedValue("editAFloater-struct");
        setActionStruct(action, struct);

        // update model
        p.updateAction(action);

        // update the current model tree
        updateCurMTree();

        // hide floater
        ws.cancelEditA();
    };

    /**
     * submit action add operation
     */
    ws.doAddA = function() {
        // generating action
        var action = {};
        action.pageId = b.g("editAFloater-pageId").value - 0;
        action.name = b.g("editAFloater-name").value;
        action.requestType = getSelectedValue("editAFloater-type");
        action.requestUrl = b.g("editAFloater-requestUrl").value;
        action.responseTemplate = b.g("editAFloater-responseTemplate").value;
        action.description = b.g("editAFloater-description").value;
        var struct = getSelectedValue("editAFloater-struct");
        setActionStruct(action, struct);


        // update model
        var id = p.addAction(action);

        // update the current model tree
        updateCurMTree();

        // hide floater
        ws.cancelEditA();

        // switch to this new added action
        this.switchA(id);
    };

    /**
     * submit page add operation
     */
    ws.doAddP = function() {
        // generating page
        var page = {};
        page.moduleId = _curModuleId;
        page.name = b.g("editPFloater-name").value;
        page.introduction = b.g("editPFloater-introduction").value;

        // update model
        p.addPage(page);

        // update the current model tree
        updateCurMTree();

        // hide floater
        ws.cancelEditP();
    };

    /**
     * submit page edit operation
     */
    ws.doEditP = function(pageId) {
        // loading page
        var page = {};
        page.id = b.g("editPFloater-id").value - 0;
        page.name = b.g("editPFloater-name").value;
        page.introduction = b.g("editPFloater-introduction").value;

        // update model
        p.updatePage(page);

        // update the current model tree
        updateCurMTree();

        // hide floater
        ws.cancelEditP();
    };

    /**
     * cancel action edit operation
     */
    ws.cancelEditA = function() {
        ecui.get("editAFloater").hide();
    };

    /**
     * cancel page edit operation
     */
    ws.cancelEditP = function() {
        ecui.get("editPFloater").hide();
    };

    /**
     * cancel import JSON
     */
     ws.cancelImportJSON = function() {
         ecui.get('importJSONFloater').hide();
     };

     ws.importJSON = function(doesImportToRequest) {
        ecFloater.show("importJSONFloater");
        this._doesImportToRequest = !!doesImportToRequest;
     };

     ws.doRecoverWorkspace = function() {
        try {
            var backupData = $('#recoverWorkspaceFloater-text').val();
            var data = eval('(' + backupData + ')');
            data = eval('(' + data.modelJSON + ')');
            if (!data || !data.moduleList) {
                throw new Error("找不到moduleList属性，错误的备份文本。你在逗我？");
            }
            p.getData().moduleList = data.moduleList;
            ecui.get('recoverWorkspaceFloater').hide();
            ws.quickSave('通过备份导入，恢复了数据');
        } catch (ex) {
            showMessage(CONST.ERROR, ELEMENT_ID.RECOVER_WORKSPACE_MESSAGE, '导入失败，输入有误。技术错误信息：' + ex.message);
        }
     };

    /**
     * cancel save in VSS mode
     */
    ws.cancelSaveVSS = function() {
        ecui.get("saveVSSFloater").hide();
    };

    ws.isEditMode = function() {
        return _isEditMode;
    };

    /**
     * switch to edit mode
     */
    ws.switchToEditMode = function() {
        var q = "id=" + p.getId();
        showMessage(CONST.LOADING, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.CHECK_LOCK_CONFLICKTION);
        if (!processing(ELEMENT_ID.WORKSPACE_MESSAGE)) return;
        b.ajax.post(URL.lock, q, function(xhr, response) {
            try {
                response = jsonFilter(response);
                var obj = eval("(" + response + ")");
                if (obj.isOk) {
                    storeViewState();
                    if (obj.projectData.moduleList.length === 0) {
                        obj.projectData.moduleList = [{"id":ws.generateId(),"name":"某模块（点击编辑后双击修改）","introduction":"","pageList":[{"moduleId":ws.generateId(),"name":"某页面","introduction":"","id":ws.generateId(),"isIdGenerated":true,"actionList":[{"pageId":ws.generateId(),"name":"某请求","requestType":"1","requestUrl":"","responseTemplate":"","description":"","id":ws.generateId(),"requestParameterList":[{"id":ws.generateId(),"identifier":"reqParam","name":"某请求参数","remark":"","validator":"","dataType":"number","parameterList":[]}],"responseParameterList":[{"id":ws.generateId(),"identifier":"resParam","name":"某响应参数","remark":"","validator":"","dataType":"number","parameterList":[]}]}]}]}];
                    }
                    if (_draftData) {
                        obj = JSON.parse(_draftData);
                    }
                    p.init(obj.projectData);
                    _data.projectDataOriginal = b.object.clone(obj.projectData);
                    setButtonsViewState(CONST.EDIT);
                    _isEditMode = true;
                    initModules();
                    renderModuleTreeList();
                    recoverViewState();
                    showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.CHECK_LOCK_CONFLICKTION_COMPLETED);
                } else {
                    showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, obj.errMsg);
                }
            } catch(e) {
                showMessage(CONST.ERROR, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });
    };


    /**
     * switch to view mode
     * @param isSave true if save operation shuold be performed
     *               false if user cancel the edit
     */
    ws.switchToViewMode = function(isSave) {
        storeViewState();
        // update model
        if (isSave) {
            initSaveVSSFloater();
        } else {
            if (!confirm(MESSAGE.CONFIRM_CANCEL)) return;
            var q = "id=" + p.getId();
            b.ajax.post(URL.unlock, q, function(xhr, response) {});
            // initialize
            p.init(b.object.clone(_data.projectDataOriginal));
            switchToViewModeSub();
        }
    };

    ws.quickSave = function(commitMsg) {
        var q = "id=" + p.getId() + "&projectData=" + util.escaper.escapeInU(getProjectDataJson()) +
            "&deletedObjectListData=" + util.escaper.escapeInU(b.json.stringify(_deletedObjectList)) +
            "&versionPosition=4&description=" + (commitMsg ? commitMsg : "quick save");
            showMessage(CONST.LOADING, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SAVING);
            if (!processing(ELEMENT_ID.WORKSPACE_MESSAGE)) return;
            b.ajax.post(URL.checkIn, q, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                if (obj.isOk) {
                    storeViewState(obj.actionIdMap);
                    p.init(obj.projectData);
                    _data.projectDataOriginal = b.object.clone(obj.projectData);
                    _data.checkList = obj.checkList;
                    //initVersionPanel();
                    switchToViewModeSub();
                    //ws.cancelSaveVSS();
                    showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SAVED);
                } else {
                    showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, obj.errMsg);
                }
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });

    };

    ws.doSaveVSS = function() {
        if (!validate("formSaveVSSFloater")) return;
        var q = "id=" + p.getId() + "&projectData=" + util.escaper.escapeInU(getProjectDataJson()) +
            "&deletedObjectListData=" + util.escaper.escapeInU(b.json.stringify(_deletedObjectList)) +
            "&versionPosition=" + getSelectedValue("radioVersion") + "&description=" + b.g("txtDescription").value;
            showMessage(CONST.LOADING, ELEMENT_ID.VSS_PANEL_MESSAGE, MESSAGE.SAVING);
            if (!processing(ELEMENT_ID.VSS_PANEL_MESSAGE)) return;
            b.ajax.post(URL.checkIn, q, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                if (obj.isOk) {
                    p.init(obj.projectData);
                    _data.projectDataOriginal = b.object.clone(obj.projectData);
                    _data.checkList = obj.checkList;
                    initVersionPanel();
                    switchToViewModeSub();
                    ws.cancelSaveVSS();
                    showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SAVED);
                } else {
                    showMessage(CONST.WARN, ELEMENT_ID.VSS_PANEL_MESSAGE, obj.errMsg);
                }
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.VSS_PANEL_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });
    };

    /**
     * show operation column of parameter table (action table)
     */
    ws.showOpColumn = function(event, pId) {
        if (!_isEditMode) return;
        b.show("div-param-op-" + pId);
        b.event.stop(event);
    };

    /**
     * hide operation column of parameter table (action table)
     */
    ws.hideOpColumn = function(event, pId) {
        if (!_isEditMode) return;
        b.hide("div-param-op-" + pId);
        b.event.stop(event);
    };

    /**
     * read project of specific version
     */
    ws.readProjectOfVersion = function() {
        var versionId = getSelectedValue("radioCheckIn");
        if (!versionId) {
            showMessage(CONST.WARN, ELEMENT_ID.VERSION_PANEL_MESSAGE, MESSAGE.CHOOSE_AT_FIRST);
            return;
        }
        var q = "versionId=" + versionId ;
        showMessage(CONST.LOADING, ELEMENT_ID.VERSION_PANEL_MESSAGE, MESSAGE.VERSION_LOADING);
        if (!processing(ELEMENT_ID.VERSION_PANEL_MESSAGE)) return;
        b.ajax.post(URL.queryVersion, q, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                p.init(obj.projectData);
                setButtonsViewState(CONST.VERSION);
                _isEditMode = false;
                initModules();
                // no need to recovery view state
                ws.closeVersionPanel();
                showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.VERSION_LOAD);
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
            } finally {
                processed();
            }
        });
    };

    /**
     * exit version observation mode
     */
    ws.exitVersion = function() {
        p.init(_data.projectDataOriginal);
        setButtonsViewState(CONST.NORMAL);
        _isEditMode = false;
        initModules();
        showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.VERSION_EXIT);
    };

    /**
     * switch version
     */
    ws.switchVersion = function() {
    if (!confirm('确定要恢复到另一版本吗？')) return;
        var versionId = getSelectedValue("radioCheckIn");
        if (!versionId) {
            showMessage(CONST.WARN, ELEMENT_ID.VERSION_PANEL_MESSAGE, MESSAGE.CHOOSE_AT_FIRST);
            return;
        }
        var q = "versionId=" + versionId;
        showMessage(CONST.LOADING, ELEMENT_ID.VERSION_PANEL_MESSAGE, MESSAGE.VERSION_SWITCHING);
        if (!processing(ELEMENT_ID.VERSION_PANEL_MESSAGE)) return;
        b.ajax.post(URL.switchVersion, q, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                if (obj.isOk) {
                    p.init(obj.projectData);
                    showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.VERSION_SWITCHED);
                } else {
                    throw Error();
                }
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.VERSION_SWITCH_ERROR);
                p.init(_data.projectDataOriginal);
            } finally {
                setButtonsViewState(CONST.NORMAL);
                _isEditMode = false;
                initModules();
                // no need to recovery view state
                ws.closeVersionPanel();
                processed();
            }
        });
    };

    /**
     * complex parameter shrink
     */
    ws.paramShrink = function(paramId) {
        hideAllChildParameters(p.getParameter(paramId));
        var divExpander = b.g("div-param-expander-" + paramId);
        if (divExpander) {
            divExpander.onclick = function() {ws.paramExpand(paramId); return false;};
            b.dom.removeClass(divExpander, "more");
            b.dom.addClass(divExpander, "more-fold");
        }
    };


    /**
     * move or copy action
     */
    ws.moveAndCopy = function() {
        function initActionOpFloater() {
            setSelectedValue("actionOpFloater-op", 'move');
            $('#actionOpFloater-title').html(p.getAction(_curActionId).name);

            // loading tabs(modules) select options
            function initSelect1() {
                $('#actionOpFloater-tab').html('');
                var mList = p.getData().moduleList;
                var i, n = mList.length, m;
                for (i = 0; i < n; i++) {
                    m = mList[i];
                    $('#actionOpFloater-tab').append($("<option/>").attr("value", m.id).text(m.name));
                }
                $('#actionOpFloater-tab').val(_curModuleId);
            }

            initSelect1();
            ws.actionOpFloaterSelectChanged();
        }
        ecFloater.show("actionOpFloater");
        initActionOpFloater();
    };

    ws.actionOpFloaterSelectChanged = function() {
        var empty = true;
        $('#actionOpFloater-page').html('');
        var pList = p.getPageList(+$('#actionOpFloater-tab').val());
        var i, n = pList.length, page;
        for (i = 0; i < n; i++) {
            page = pList[i];
            //if (!p.isActionInPage(_curActionId, page.id)) {
            $('#actionOpFloater-page').append($("<option/>").attr("value", page.id).text(page.name));
            empty = false;
            //}
        }
        if (empty) {
            $('#actionOpFloater-page').append($("<option/>").attr("value", "").text('木有可移动的页面'));
        }
    };


    /**
     * close actionOpFloater
     */
    ws.closeActionOpFloater = function(userConfirm) {
        if (userConfirm) {
            var targetMID = +$('#actionOpFloater-tab').val();   // target module id
            var targetPID = +$('#actionOpFloater-page').val();  // target page id
            var opType = getSelectedValue('actionOpFloater-op');
            if (targetMID && targetPID) {
                actionOperate(targetMID, targetPID, opType);
            } else {
                alert('请选择目标位置哦~');
                return;
            }
        }
        ecui.get("actionOpFloater").hide();
    };


    /**
     * complex parameter expand
     */
    ws.paramExpand = function(paramId) {
        showAllChildParameters(p.getParameter(paramId));
        var divExpander = b.g("div-param-expander-" + paramId);
        if (divExpander) {
            divExpander.onclick = function() {ws.paramShrink(paramId); return false;};
            b.dom.removeClass(divExpander, "more-fold");
            b.dom.addClass(divExpander, "more");
        }
    };


    /**
     * toggle mock labels display
     */
    ws.toggleMockDisplay = function() {
        if (!_isMockDisplay) {
            $('#btnToggleMockDisplay').addClass('btn-success');
        } else {
            $('#btnToggleMockDisplay').removeClass('btn-success');
        }
        var html = b.g('btnToggleMockDisplay').innerHTML;
        _isMockDisplay = !_isMockDisplay;
        if (typeof window.localStorage !== 'undefined') {
            localStorage.setItem('_isMockDisplay', _isMockDisplay);
        }
        ws.switchA(_curActionId, true);
    };

    ws.showMockData = function(actionId) {
        var action = p.getAction(actionId);
        var postData = 'actionData=' + encodeURIComponent(JSON.stringify(action));
        var me = this;
        var eleRule = $('#mockRulePreviewFloater-mockRule');
        var eleData = $('#mockRulePreviewFloater-mockData');


        var ruleUrl, dataUrl;
        var ERROR_MSG = '需先填写请求链接';

        if ($.trim(action.requestUrl) == '') {
          ruleUrl = ERROR_MSG;
          dataUrl = ERROR_MSG;
        } else {
          var requestUrlRelative = getRelativeUrl(action.requestUrl);
          ruleUrl= 'http://' + URL.base + '/mockjs/' + p.getId() +  requestUrlRelative;
          dataUrl = 'http://' + URL.base + '/mockjsdata/' + p.getId() + requestUrlRelative;
        }

        eleRule.attr('href', ruleUrl == ERROR_MSG ? '#' : ruleUrl);
        eleRule.html(ruleUrl);

        eleData.attr('href', dataUrl == ERROR_MSG ? '#' : dataUrl);
        eleData.html(dataUrl);

        $('#mockDataPreviewFloater-container').val('loading...');
        $('#mockRulePreviewFloater-container').val('loading...');
        $('.glyphicon-question-sign').tooltip();
        ecFloater.show("mockDataPreviewFloater");
        b.ajax.post(URL.queryMockData, postData, function(xhr, response) {
            try {
                // var obj = eval("(" + response + ")");
                var mockRuleObj = eval('(' + response + ')'); 
                var mockDataObj  = Mock.mock(mockRuleObj);
                me._mockRuleObj = mockRuleObj;
                $('#mockRulePreviewFloater-container').val(JSON.stringify(mockRuleObj, null, 4));
                $('#mockDataPreviewFloater-container').val(JSON.stringify(mockDataObj, null, 4));
            } catch(e) {
                showMessage(CONST.ERROR, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.FATAL_ERROR);
            }
        });
    };

    ws.refreshMockPreviewData = function() {
        $('#mockDataPreviewFloater-container').val(JSON.stringify(Mock.mock(this._mockRuleObj), null, 4));
    };

    ws.copyToClipboard = function(eleId) {
        var ele = b.g(eleId);
        ele.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    };


    /**
     * http://www.baidu.com/abc => /abc
     * /abc => /abc
     */
    function getRelativeUrl(url) {
        if (url instanceof RegExp) {
            return url;
        }
        if (!url) {
            throw Error('Illegal url:' + url);
        }
        if (url.indexOf('http://') > -1) {
            url = url.substring(url.indexOf('/', 7) + 1);
        } else if (url.indexOf('https://') > -1) {
            url = url.substring(url.indexOf('/', 8) + 1);
        }
        if (url.charAt(0) != '/') {
            url = '/' + url;
        }
        return url;
    }


    /********************************************************
     *                              *
     *         ##private-methods-begin          *
     *                              *
     ********************************************************/

    /**
     * bind event if bind is true , otherwise, unbind
     */
    function processInputEvent(bind) {
        var f = bind ? b.event.on : b.event.un;
        f(ELEMENT_ID.EDIT_INPUT, CONFIG.KEYPRESS_EVENT_NAME, keypressEventHandler);
    }

    /**
     * focus element
     * fix IE problem
     */
    function focusElement(element) {
        if (!element) return;
        if (b.browser.ie) {
            setTimeout(function(){element.focus();}, 200);
        } else {
            element.focus();
        }
    }

    /**
     * output debug in firebug
     */
    function debug(msg) {
        var console = window.console || {};
        if (console.log) {
            console.log(msg);
        }
        var div = b.g("div-debug");
        if (div) {
            div.innerHTML = "debug[" + (_debugCounter++) + "]:" + msg;
        }
    }

    /**
     * validate form
     */
    function validate(formName) {
        return rap.util.validator.validForm(document.forms[formName]);
    }

    /**
     * hide all child parameters of a complex parameter
     */
    function hideAllChildParameters(param) {
        if (!param || !param.parameterList || param.parameterList <=0) return;
        var paramList = param.parameterList,
            paramListNum = paramList.length;
        for (var i = 0; i < paramListNum; i++) {
            var paramChild = paramList[i];
            hideParam(paramChild);
            hideAllChildParameters(paramChild);
        }
    }

    /**
     * show all child parameters of a complex parameter
     */
    function showAllChildParameters(param) {
        if (!param || !param.parameterList || param.parameterList <=0) return;
        var paramList = param.parameterList,
            paramListNum = paramList.length;
        for (var i = 0; i < paramListNum; i++) {
            var paramChild = paramList[i];
            showParam(paramChild);
            showAllChildParameters(paramChild);
        }
    }

    /**
     * show parameter
     */
    function showParam(param) {
        b.show("tr-param-" + param.id);
    }

    /**
     * hide parameter
     */
    function hideParam(param) {
        b.hide("tr-param-" + param.id);
    }

    /**
     * set view state
     */
    function setButtonsViewState(state) {
        if (state == CONST.EDIT) {
            // to edit view
            b.hide("btnEdit");
            b.hide("btnVersion");
            b.show("btnSave");
            b.show("btnFastSave");
            b.show("btnCancel");
            b.show("div-add-p");
            b.hide("btnExitVersion");
        } else if (state == CONST.NORMAL) {
            // to normal view
            b.show("btnEdit");
            b.show("btnVersion");
            b.hide("btnSave");
            b.hide("btnFastSave");
            b.hide("btnCancel");
            b.hide("div-add-p");
            b.hide("btnExitVersion");
        } else if (state == CONST.VERSION) {
            // to version view
            b.hide("btnEdit");
            b.show("btnVersion");
            b.hide("btnSave");
            b.hide("btnFastSave");
            b.hide("btnCancel");
            b.hide("div-add-p");
            b.show("btnExitVersion");
        }
    }
    /**
     * session delay preventing from session timeout
     */
    function sessionDelay() {
        // because of optimization problem, halt temply
        /**
        b.ajax.get(URL.ping, function(xhr, response) {
            try {
                var obj = eval("(" + response + ")");
                if (obj.isOk) {
                } else {
                    showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SESSION_DELAY_ERROR);
                }
            } catch(e) {
                showMessage(CONST.WARN, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.SESSION_DELAY_ERROR);
            }
        });
        */
    }

    function storeViewState(actionIdMap) {
        if (actionIdMap && actionIdMap[_curActionId]) {
            _curActionId = actionIdMap[_curActionId];
        }
        _viewState.moduleId = _curModuleId;
        _viewState.actionId = _curActionId;

        if (_curActionId > 0 && _curModuleId > 0) {
            // this will be a little confused
            // cur action div is named by module id
            // eg-> module[id=5] contains action[id=3], than cur action div is
            // div-a-5(same to module),   not div-a-3
            var curActionDiv = getDiv(_curModuleId, "a");
            if (curActionDiv) {
                _viewState.actionScrollTop = curActionDiv.scrollTop;
                _viewState.actionScrollLeft = curActionDiv.scrollLeft;
            }

            var curModuleTreeDiv = getDiv(_curModuleId, "tree");
            if (curModuleTreeDiv) {
                _viewState.moduleTreeScrollTop = curModuleTreeDiv.scrollTop;
                _viewState.moduleTreeScrollLeft = curModuleTreeDiv.scrollLeft;
            }
        }


    }

    function recoverViewState() {
        if (_viewState.moduleId > 0 && _viewState.moduleId < 999999999) {
            if (p.getModuleList().length > 1) {
                ws.switchM(_viewState.moduleId);
            }
            if (_viewState.actionId > 0 && p.isActionInModule(_viewState.actionId, _viewState.moduleId)) {
                ws.switchA(_viewState.actionId);

                // this will be a little confused
                // cur action div is named by module id
                // eg-> module[id=5] contains action[id=3], than cur action div is
                // div-a-5(same to module),   not div-a-3
                var curActionDiv = getDiv(_curModuleId, "a");
                if (curActionDiv) {
                    curActionDiv.scrollTop = _viewState.actionScrollTop + "";
                    curActionDiv.scrollLeft = _viewState.actionScrollLeft + "";
                }

                var curModuleTreeDiv = getDiv(_curModuleId, "tree");
                if (curModuleTreeDiv) {
                    curModuleTreeDiv.scrollTop = _viewState.moduleTreeScrollTop;
                    curModuleTreeDiv.scrollLeft = _viewState.moduleTreeScrollLeft;
                }
            }
        }

    }

    /*
     * put object into deleted pool
     * these pool will be transfered to server
     * when the user perform "save" operation
     */
    function putObjectIntoDeletedPool(className, id) {
        if (!_deletedObjectList) {
            _deletedObjectList = [];
        }
        if (className && id) {
            _deletedObjectList.push({"className" : className, "id" : id});
        }
    }

    /**
     * quit edit mode, switch to view mode sub-function
     */
    function switchToViewModeSub() {
        setButtonsViewState(CONST.NORMAL);
        _isEditMode = false;
        initModules();
        recoverViewState();
    }

    /**
     * get workspace json string
     */
    function getWorkspaceJsonString() {
        return b.json.stringify(_data);
    }

    /**
     * get projectData json string
     */
    function getProjectDataJson() {
        return b.json.stringify(p.getData());
    }

    /**
     * get div id
     */
    function getDivId(id, type) {
        return "div-" + type + "-" + id;
    }

    /**
     * get div element
     */
    function getDiv(id, type) {
        return b.g(getDivId(id, type));
    }

    /**
     * get td id
     */
    function getTdId(id, type) {
        return "td-" + type + "-" + id;
    }

    /*
     * get td
     */
    function getTd(id, type) {
        return b.g(getTdId(id, type));
    }

    /*
     * get tr id
     */
    function getTrId(id, type) {
        return "tr-" + type + "-" + id;
    }

    /*
     * get tr
     */
    function getTr(id, type) {
        return b.g(getTrId(id, type));
    }

    /**
     * module tab keypress event handler
     */
    function keypressEventHandler(e) {
        var code = b.event.getKeyCode(e);
        var prevParamId, nextParamId;
        if (code == 13) {
            // backup edit context
            var editContext = b.object.clone(_editContext);
            var paramId = ws.finishEdit();
            // auto complete
            if (e.ctrlKey && paramId) {
                var isOk = p.parameterAutoComplete(paramId);
                if (isOk) {
                    ws.switchA(_curActionId);
                    if (editContext === null) return;
                    prevParamId = editContext.id;
                    nextParamId = p.findNextParameter(_curActionId, prevParamId);
                    // if next parameter exists, switch to that
                    if (nextParamId > 0) {
                        ws.edit(nextParamId, "param-name");
                    } else if (p.isRequestParameter(_curActionId, prevParamId)) {
                    // otherwise, create new parameter, than switch to that
                        ws.addParam('request');
                    } else if (p.isResponseParameter(_curActionId, prevParamId)) {
                        ws.addParam('response');
                    }
                } else {
                    ws.edit(editContext.id, "param-identifier");
                }
            }
        } else if (code == 27) {
            cancelEdit();
        } else if (code == 9) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = null;
            }
            switch (_editContext.key) {
                case "param-identifier":
                    ws.edit(_editContext.id, "param-name");
                    break;
                case "param-name":
                    var select = b.g("select-dataType-" + _editContext.id);
                    focusElement(select);
                    break;
                case "param-remark":
                    if (_editContext === null) return;
                    prevParamId = _editContext.id;
                    nextParamId = p.findNextParameter(_curActionId, prevParamId);
                    // if next parameter exists, switch to that
                    if (nextParamId > 0) {
                        ws.edit(nextParamId, "param-name");
                    } else if (p.isRequestParameter(_curActionId, prevParamId)) {
                    // otherwise, create new parameter, than switch to that
                        ws.addParam('request');
                    } else if (p.isResponseParameter(_curActionId, prevParamId)) {
                        ws.addParam('response');
                    }
                    break;
            }
        }
    }

    /**
     * render action
     */
    function renderA() {
        var list = b.q('js-code-area'),
            length = list.length,
            i = 0;

        for (; i < length; i++) {
            var item = list[i];
            item.innerHTML = item.innerHTML.formatJS();
        }

        list = b.q('div-a-desc-expander');
        length = list.length;
        i = 0;

        for(; i < length; i++) {
            b.on(list[i], "click", function(e) {
            e.stopPropagation();
            });
        }
    }

    function setHash(actionId) {
        location.hash = actionId;
    }

    function getHash() {
        var hash = location.hash.substring(1);
        hash = +hash;
        if (hash > 0) {
            return hash;
        } else {
            return null;
        }
    }

    /**
     * jump to the first action of the current module
     */
    function switchToCurA() {
        var curModule = p.getModule(_curModuleId);
        if (curModule !== null && curModule.pageList.length !== 0 &&
                curModule.pageList[0].actionList.length !== 0) {
            ws.switchA(curModule.pageList[0].actionList[0].id, _curModuleId);
        } else {
            var divAction = b.g("div-a-" + _curModuleId);
            if (divAction) {
                divAction.innerHTML = "";
            }
            _curActionId = null;
        }
    }

    /**
     * set empty view
     */
    function setEmptyView(isEmpty, moduleId) {
        if (isEmpty) {
            //b.show("div-empty-hint");
            b.hide("div-add-p");
            _curModuleId = null;
        } else {
            //b.hide("div-empty-hint");
            b.show("div-add-p");
            _curModuleId = moduleId;
        }
    }

    /**
     * initialize modules
     */
    function initModules(defaultActionId) {
        // binding modules
        var div1 = b.g("div-m-list"),
            div2 = b.g("div-mt-list"),
            list = p.getModuleList(),
            n = list.length,
            m,
            i,
            str1 = "",
            str2 = "";

        list.sort(modelSorterByName);
        
        // clear old content
        div1.innerHTML = "";
        div2.innerHTML = "";

        // 1 - module; 2 - module tab;
        if (list.length === 0) {
            setEmptyView(true);
        } else {
            _curModuleId = list[0].id;
            str1 += getMHtml(list[0]);
            str2 += getMTHtml(list[0], true);

            for (i = 1; i < n; i++) {
                m = list[i];
                str1 += getMHtml(list[i]);
                str2 += getMTHtml(list[i]);

                if (i === 0) _curModuleId = m.id;
            }
        }

        if (_isEditMode) {
            str2 += TEMPLATE.MODULE_ADD_BUTTON;
        }

        div1.innerHTML = str1;
        div2.innerHTML = str2;

        if (defaultActionId) {
            var defaultModuleId = p.getModuleIdByActionId(defaultActionId);
            if (defaultModuleId) {
                ws.switchM(defaultModuleId, defaultActionId);
                renderModuleTreeList();
                return;
            }
        }

        ws.switchM(_curModuleId);
        renderModuleTreeList();
    }

    /**
     * init save/load panel
     */
    function initSavePanel() {
        var div = b.g(ELEMENT_ID.SAVE_PANEL_CONTENT);
        var saveList = _data.saveList;
        div.innerHTML = getSavePanelHtml(saveList);
    }

    /**
     * init version panel
     */
    function initVersionPanel() {
        var div = b.g(ELEMENT_ID.VERSION_PANEL_CONTENT);
        var versionList = _data.checkList;
        div.innerHTML = getVersionPanelHtml(versionList);
    }

    /**
     * cancel edit
     */
    function cancelEdit() {
        if (!isEditing()) return;
        var context = stopEditing(),
            el;
        switch (context.key) {
            case "mt":
                el = getDiv(context.id, context.key);
                break;
            case "param-name":
            case "param-identifier":
            case "param-validator":
            case "param-remark":
                el = getTd(context.id, context.key);
                break;
            default:
                throw Error("not implemented, key:" + key);
        }
        processInputEvent(false);
        el.innerHTML = context.content;
        if (isEditing()) {
            stopEditing();
        }
    }

    /**
     * page binding
     */
    function bind(ignoreProcessStateCheck, defaultActionId) {
        if (!ignoreProcessStateCheck && !processing()) return;
        showMessage(CONST.LOADING, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.LOADING);
        // initialize properties
        _curModuleId = null;
        _curActionId = null;
        _doesSoFarNoActionDisplay = true;
        _editContext = null;
        _messageContainerId = "";
        _messageTimer = null;
        _isProcessing; // this viariable can not be initialized because it is being used while initialization!
        _isEditMode = false;
        _deletedObjectList = [];

        // initialize data & UI
        p.init(_data.projectData);

        // only rap.project can manage project data
        // projectData of _data of workspace only used once
        // when initializing
        delete _data.projectData;

        // [todo] mode case
        if (true) {// VSS mode
        } else if(_data.modeInt == 2) {
            initSavePanel();
        }
        initVersionPanel();
        initModules(defaultActionId);
        showMessage(CONST.LOAD, ELEMENT_ID.WORKSPACE_MESSAGE, MESSAGE.MODULE_LOAD);
        processed();
        if (_draftData) {
            ws.switchToEditMode();
        }
    }



    /**
     * is editing
     */
    function isEditing() {
        return _editContext !== null;
    }

    /**
     * editing
     */
    function editing(id, content, key) {
        _editContext = {"id" : id, "content" : content, "key" : key};
    }

    /**
     * stop editing
     */
    function stopEditing() {
        if (_editContext === null) {
            throw Error("no edit view, can not stop");
        }
        var context = _editContext;
        _editContext = null;
        return context;
    }

    /**
     * clear message, invoked by timer normally
     */
    function clearMessage() {
        var ele = b.g(_messageContainerId);
        if (ele === null) return;
        b.hide(ele);
        ele.innerHTML = "";
        _messageTimer = null;
        _messageContainerId = "";
    }

    /**
     * get selected save, return null if no save selected
     */
    function getSelectedSave() {
        var save = null,
            ele,
            saveListNum,
            saveList = _data.saveList;

        if (saveList === null || saveList.length === 0) return null;
        saveListNum = saveList.length;

        for (var i = 0; i < saveListNum; i++) {
            save = saveList[i];
            ele = b.g(PREFIX.SAVE + save.id);
            if (ele !== null && ele.checked) {
                return save;
            }
        }
        return null;
    }

    /**
     * processing, return true if operation succesfully, otherwise return false.
     */
    function processing(eleId) {
        if (_isProcessing) {
            showMessage(
                    CONST.WARN,
                    eleId === null ? ELEMENT_ID.WORKSPACE_MESSAGE : eleId,
                    MESSAGE.DO_NOT_DOUBLE_CLICK
                );
            return false;
        }
        _isProcessing = true;
        return true;
    }

    /**
     * processed, return true if operation succesfully, otherwise return false.
     */
    function processed() {
        if (_isProcessing) {
            _isProcessing = false;
            return true;
        }
        return false;
    }

    /**
     * show message and hide it automatically
     */
    function showMessage(type, containerId, message) {
        // if old message exists, remove it
        if (_messageTimer !== null) {
            clearMessage();
        }
        var ele = b.g(containerId);
        if (ele === null) return;

        // clear styles
        var arr = ['label-success', 'label-warning', 'label-important', 'label-info', 'label-inverse'],
            n = arr.length,
            i = 0;
        for (; i < n; i++) {
            b.dom.hasClass(ele, arr[i]) && b.dom.removeClass(ele, arr[i]);
        }

        switch (type) {
            case CONST.WARN:
                b.dom.addClass(ele, 'label-warning');
                break;
            case CONST.LOADING:
                b.dom.addClass(ele, 'label-info');
                break;
            case CONST.LOAD:
                b.dom.addClass(ele, 'label-success');
                break;
            case CONST.ERROR:
                b.dom.addClass(ele, 'label-danger');
                break;
            default:
                break;
        }
        ele.innerHTML = message;
    b.show(ele);

        _messageContainerId = containerId;
        _messageTimer = setTimeout(clearMessage, CONFIG.MESSAGE_TIMEOUT);
    }

    /**
     * get background style
     */
    function getBackgroundStyle(fileName) {
        return  "url(\"" + URL.imageRoot + fileName + "\") no-repeat";
    }

    /**
     * init edit action floater
     */
    function initEditAFloater() {
        b.g("editAFloater-id").value = "";
        b.g("editAFloater-name").value = "";
        b.g("editAFloater-requestUrl").value = "";
        b.g("editAFloater-responseTemplate").value = "";
        b.g("editAFloater-description").value = "";
        b.g("editAFloater-pageId").value = "";
        initRadioList("editAFloater-type");
        initRadioList("editAFloater-struct");
    }

    /**
     *init save floater of VSS mode
     */
    function initSaveVSSFloater() {
        //b.g("txtTag").value = "";
        b.g("txtDescription").value = "";
        b.g("divVersion").innerHTML = p.getVersion() + " -> " + versionUpgrade(p.getVersion(), 4);
        e.get("saveVSSFloater").setTitle("提交您的修改");
        ecFloater.show("saveVSSFloater");
        initRadioList("radioVersion");
        setSelectedValue("radioVersion", 4);
    }

    /**
     * version upgrade
     * version: original version
     * position: from 1 to 4
     * return: new version after upgrade
     */
    function versionUpgrade(version, position) {
        var versionList = version.split(".");
        if (versionList.length != 4) {
            throw Error("error version format:" + version);
        } else if (!(position <= 4 && position >= 1)) {
            throw Error("error version position: " + position);
        }
        var versionItem = versionList[position - 1];
        versionItem = versionItem - 0 + 1;
        versionList[position - 1] = versionItem;
        version = "";
        for (var i = 0; i < versionList.length; i++) {
            version += versionList[i];
            if (i < versionList.length - 1) {
                version += ".";
            }
        }
        return version;
    }

    /**
     * init edit page floater
     */
    function initEditPFloater() {
        b.g("editPFloater-id").value = "";
        b.g("editPFloater-name").value = "";
        b.g("editPFloater-introduction").value = "";
        b.g("editPFloater-moduleId").value = "";
    }

    /**
     * initialize radio
     */
    function initRadioList(radioName) {
        var radioList = document.getElementsByName(radioName),
            radioListNum = radioList.length;
        for (var i = 0; i < radioListNum; i++) {
            if (radioList[i].checked) {
                radioList[i].checked = false;
            }
            if (i === 0) {
                radioList[i].checked = true;
            }
        }
    }

    /**
     * get selected value (radio or select)
     */
    function getSelectedValue(selectName) {
        var selectList = document.getElementsByName(selectName),
            selectListNum = selectList.length;
        for (var i = 0; i < selectListNum; i++) {
            if (selectList[i].checked) {
                return selectList[i].value;
            }
        }
        return null;
    }

    /**
     * set selected value (radio or select)
     */
   function setSelectedValue(selectName, value) {
       var selectList = document.getElementsByName(selectName),
           selectListNum = selectList.length;
       for (var i = 0; i < selectListNum; i++) {
           var option = selectList[i];
           if (option.checked) {
               option.checked = false;
           }
           if (option.value == value) {
               option.checked = true;
           }
       }
   }

   /**
    * update current module tree
    */
   function updateCurMTree(refreshOnly) {
        var module = p.getModule(_curModuleId);
        if (module === null) return;
        if (!refreshOnly) {
            storeViewState();
        }
        b.dom.remove(b.g("div-tree-" + _curModuleId));
        b.g("div-m-" + _curModuleId).innerHTML = getMTreeHtml(module) + b.g("div-m-" + _curModuleId).innerHTML;
        e.init(b.g("div-m-" + _curModuleId));
        if (!refreshOnly) {
            switchToCurA();
            recoverViewState();
        }
    }

   /**
    * render module tree list
    */
   function renderModuleTreeList() {
        var moduleList = p.getModuleList(),
            moduleListNum = moduleList.length,
            i = 0,
            moduleId = 0;

        for (; i < moduleListNum; i++) {
            moduleId = moduleList[i].id;
            ecui.init(baidu.g("div-tree-" + moduleId));
        }

        var cur = b.g('div-a-tree-node-' + _curActionId);

        if (cur && !b.dom.hasClass(cur, 'cur')) {
            b.dom.addClass(cur, 'cur');
        }

   }

    /**
     * process JSON import
     *
     * @param {object}  f value to be processed
     * @param {string}  k key
     * @param {number}  pid parameter id
     * @param {boolean} notFirst
     */
    function processJSONImport(f, k, pId, notFirst, arrContext) {
        var id, param;
        var doesImportToRequest = ws._doesImportToRequest;
        if (notFirst) {
            if (!pId) {
                if (doesImportToRequest === true) {
                    id = p.addRequestParameter(_curActionId);
                } else {
                    id = p.addResponseParameter(_curActionId);
                }
                param = p.getParameter(id);
                param.identifier = k;
            } else {
                id = p.addChildParameter(pId);
                param = p.getParameter(id);
                param.identifier = k;
            }
        }
        var key;
        var f2; // child of f
        var i;
        var mValues; // mock @order values
        if (f instanceof Array && f.length) {
            if (notFirst) {
                f2 = f[0];

                if (typeof f2 === 'string') {
                    param.dataType = 'array<string>';
                    param.remark = '@mock=' + f;
                } else if (typeof f2 === 'number') {
                    param.dataType = 'array<number>';
                    param.remark = '@mock=' + f;
                } else if (typeof f2 === 'boolean') {
                    param.dataType = 'array<boolean>';
                    param.remark = '@mock=' + f;
                } else if (f2 instanceof Array) {
                    param.dataType = 'array';
                    param.remark = '@mock=' + JSON.stringify(f);
                } else if (f !== null && typeof f2 === 'object') {
                    param.dataType = 'array<object>';
                    for (key in f2) {
                        processJSONImport(f2[key], key, notFirst ? id : undefined, true, f.length > 1 ? f : undefined);
                    }
                }

                // process @order for import array data
                if (typeof f2 in {'number' : undefined, 'boolean' : undefined } && f.length > 1) {
                    mValues = [f2];
                    for (i = 1; i < f.length; i++) {
                        mValues.push(f[i]);
                    }
                    param.remark = '@mock=$order(' + mValues.join(',') + ')';
                } else if (typeof f2 === 'string' && f.length > 1) {
                    mValues = ['\'' + f2 + '\''];
                    for (i = 1; i < f.length; i++) {
                        mValues.push('\'' + f[i] + '\'');
                    }
                    param.remark = '@mock=$order(' + mValues.join(',') + ')';
                }

            }
        } else if (typeof f === 'string') {
            if(param) {
                param.dataType = 'string';
                param.remark = '@mock=' + f;
            }
        } else if (typeof f === 'number') {
            if(param) {
                param.dataType = 'number';
                param.remark = '@mock=' + f;
            }
        } else if (typeof f === 'boolean') {
            if(param) {
                param.dataType = 'boolean';
                param.remark = '@mock=' + f;
            }
        } else if (typeof f === 'undefined') {
        } else if (f === null) {
        } else if (typeof f === 'object') {
            var oldKey;
            var oldItem;

            param && (param.dataType = 'object');

            Object.keys(f).forEach(function(key) {
                oldKey = key;
                oldItem = f[key];
                if (f[key] && f[key] instanceof Array && f[key].length > 1 
                    && f[key][0] instanceof Object && f[key][0] !== null
                    && !(f[key][0] instanceof Array)) {
                    key = key + '|' + f[key].length;
                    delete f[oldKey] ;
                    f[key] = oldItem;
                }
                processJSONImport(f[key], key, notFirst ? id : null, true);

            });
        }

        if (arrContext && typeof f in {'number' : undefined, 'boolean' : undefined}) {
            // process @order for import array data for array<object>
            mValues = [f];
            for (i = 1; i < arrContext.length; i++) {
                mValues.push(arrContext[i][k]);
            }
            param.remark = '@mock=$order(' + mValues.join(',') + ')';
        } else if (arrContext && typeof f === 'string') {
            mValues = ['\'' + f + '\''];
            for (i = 1; i < arrContext.length; i++) {
                mValues.push('\'' + arrContext[i][k] + '\'');
            }
            param.remark = '@mock=$order(' + mValues.join(',') + ')';
        }

     }


    var _curSearchIndex = null;

    /**
     * workspace search
     */
    function workspaceSearch(key, ev) {
        var AN = 'byActionName',
            AU = 'byActionUrl',
            PN = 'byPageName';

        var liList = $('#dropdown-workspace-search .item');
        var selectedItem;
        var orders;


        if (ev) {
            ev = ev[0];
        }

        // up/down arrow
        if (ev.keyCode === 38 || ev.keyCode === 40) {
            console.log('keyCode:' , ev.keyCode, ", index:", _curSearchIndex, ", length:", liList.length);
            liList.css('background', 'none');
            $(liList[_curSearchIndex]).removeClass('selected');
            if (ev.keyCode === 40) {
                _curSearchIndex++;
            } else {
                _curSearchIndex--;
            }

            if (_curSearchIndex < 0) {
                _curSearchIndex = liList.length - 1;
            } else if (_curSearchIndex >= liList.length) {
                _curSearchIndex = 0;
            }
            $(liList[_curSearchIndex]).css('background', '#DFDFDF');
            $(liList[_curSearchIndex]).addClass('selected');

            return;

        // enter response
        } else if (ev.keyCode === 13) {
            selectedItem = $('#dropdown-workspace-search .selected');
            orders = selectedItem.find('a').attr('onclick');
            eval(orders);
            return;
        }

        if ($.trim(key) === '') {
            $('#dropdown-workspace-search').hide();
        } else {
            var r = p.search(key);
            if (r[AN].length || r[AU].length || r[PN].length) {
                $('#dropdown-workspace-search').html(getSearchResultHTML(r));
                $('#dropdown-workspace-search').show();
                _curSearchIndex = null;
            } else {
                $('#dropdown-workspace-search').hide();
                $('#dropdown-workspace-search .item').removeClass('selected');
            }
        }
    }



        /***************************************************
         *                                                 *
         *       ##html-template-engine-begin              *
         *                                                 *
         ***************************************************/

        /**
         * get workspace search result HTML
         */
        function getSearchResultHTML(r) {
            var AN = 'byActionName',
                AU = 'byActionUrl',
                PN = 'byPageName',
                n, o, num,
                html = '',
                header, footer, body,
                htmlList = [];
                header = '<ul class="dropdown-menu" style="display:block" role="menu" aria-labelledby="dropdownMenu2">';

            // action name results
            html = '';
            n = r[AN].length;
            num = n;
            if (n) {
                html += '<li role="presentation" class="dropdown-header">Action Name (' + r[AN + "_length"]  + ')</li>';
                while (n--) {
                    o = r[AN][n];
                    html += '<li role="presentation" class="item"><a role="menuitem" tabindex="-1" href="#" onclick="ws.workspaceSearchResultHandler(\'a\', ' +
                        o.id + ');">' + o.name + '&nbsp;&nbsp;' + o.requestUrl + '</a></li>';
                }
                if (r[AN + "_length"] > num) {
                    html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" onclick="return false;">... ...</a></li>';
                }
                htmlList.push(html);
            }

            // action url results
            html = '';
            n = r[AU].length;
            num = n;
            if (n) {
                html += '<li role="presentation" class="dropdown-header">Request Url (' + r[AU + "_length"] + ')</li>';
                while (n--) {
                    o = r[AU][n];
                    html += '<li role="presentation" class="item"><a role="menuitem" tabindex="-1" href="#" onclick="ws.workspaceSearchResultHandler(\'a\', ' +
                        o.id + ');">' + o.name + '&nbsp;&nbsp;' + o.requestUrl + '</a></li>';
                }
                if (r[AU + "_length"] > num) {
                    html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" onclick="return false;">... ...</a></li>';
                }
                htmlList.push(html);
            }

            // page name results
            html = '';
            n = r[PN].length;
            num = n;
            if (n) {
                html += '<li role="presentation" class="dropdown-header">Page Name (' + r[PN + "_length"] + ')</li>';
                while (n--) {
                    o = r[PN][n];
                    html += '<li role="presentation" class="item"><a role="menuitem" tabindex="-1" href="#" onclick="ws.workspaceSearchResultHandler(\'p\', ' +
                        o.id + ');">' + o.name + '</a></li>';
                }
                if (r[PN + "_length"] > num) {
                    html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" onclick="return false;">... ...</a></li>';
                }
                htmlList.push(html);
            }

            body = htmlList.join('<li role="presentation" class="divider"></li>');

            footer = '</ul>';

            return header + body + footer;
        }


        /**
         * get module html
         */
        function getMHtml(m) {
            var str = "";

            str += "<div class=\"m clearfix\" id=\"div-m-" + m.id + "\">";

            // loading module tree
            str += getMTreeHtml(m);

            // loading seperator
            str += TEMPLATE.SEPERATOR;

            // loading content
            str += getMTableHtml(m);

            str += "</div>";

            return str;
        }

        function modelSorterByName(a, b) {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0;
            }
        }

        /**
         * get module tree html string from module object
         */
        function getMTreeHtml(m) {
            var str = "",
                pageList = m.pageList,
                pageListNum = pageList.length;

            pageList.sort(modelSorterByName);

            str += "<div id=\"div-tree-" + m.id + "\" class=\"tree-m\">";
            str += "<div class=\"more\" ecui=\"type:tree;id:moduleTree" + m.id + "\">";
            str += "<label>" + util.escaper.escapeInH(m.name);
            if (_isEditMode) {
                str += "<a href=\"#\" onclick=\"ws.removeM(); return false;\"><i class='glyphicon glyphicon-remove' style='color:#d9534f'></i></a>";
            }
            str += "</label>";
            for (var i = 0; i < pageListNum; i++) {
                var page = pageList[i],
                actionList = page.actionList,
                actionListNum = actionList.length;
                actionList.sort(modelSorterByName);

                str += "<div class=\"more\">";
                str += "<label ondblclick=\"ws.editP(" + page.id + "); return false;\">" + util.escaper.escapeInH(page.name);
                if (_isEditMode) {
                    str += "<span class=\"div-p-control\"><a href=\"#\" class=\"edit-link\" onclick=\"ws.editP(" +
                        page.id + "); return false;\"><i class=\"glyphicon glyphicon-pencil\"></i></a><a href=\"#\" onclick=\"ws.removeP(" +
                        page.id + "); return false;\" style=\"margin-left:5px;\"><i class=\"glyphicon glyphicon-trash\"></i></a></span>";
                }
                str += (page.isIdGenerated ? '' : '<a class="test-link" href="' + URL.pageTester + '?id=' + page.id + '" target="_blank"><i class="glyphicon glyphicon-step-forward"></i></a>');
                str += "</label>";
                for (var j = 0; j < actionListNum; j++) {
                    var action = actionList[j];
                    str += "<div id=\"div-a-tree-node-" + action.id + "\">" + "<a href=\"#\" onclick=\"ws.switchA(" + action.id +
                        "); return false;\" ondblclick=\"ws.editA(" + action.id + "); return false;\">" + util.escaper.escapeInH(action.name) + "</a>";
                    if (_isEditMode) {
                        str += "<a href=\"#\" class=\"edit-link\" onclick=\"ws.editA(" +
                            action.id + "); return false;\"><i class=\"glyphicon glyphicon-pencil\"></i><a href=\"#\" onclick=\"ws.removeA(" +
                            action.id + "); return false;\" style=\"margin-left:5px;\"><i class=\"glyphicon glyphicon-trash\"></i></a>";
                    }
                    str += "</div>";
                }
                if (_isEditMode) {
                    str += "<div style='margin-top:10px'><a class=\"btn btn-info btn-xs\" href=\"#\" onclick=\"ws.addA(" + page.id + "); return false;\"><i class=\"glyphicon glyphicon-plus\" style='margin-right: 5px;'></i>添加接口</a></div>";
                }
                str += "</div>";
            }
            str += "</div></div>";
            return str;
        }

        /**
         * get module table html string from module object
         */
        function getMTableHtml(m) {
            var str = "";
            str += "<div class=\"div-a\" id=\"div-a-" + m.id + "\">";
            str += "</div>";
            return str;
        }

        /**
         * get module tab html string from module object
         */
        function getMTHtml(m, isFirst) {
            var str = "";
            str += "<a id=\"a-mt-" + m.id + "\" href=\"#\" onclick=\"ws.switchM(";
            str += m.id +"); return false;\" ondblclick=\"ws.edit(";
            str += m.id + ", 'mt'); return false;\"><div class=\"tab" + (isFirst ? " first cur" : "");
            str += "\" id=\"div-mt-" + m.id + "\">" + util.escaper.escapeInH(m.name) + "</div></a>";
            return str;
        }

        /**
         * sort parameters recursively
         */
        function sortParams(params) {
            if (!params) return;
            var i = 0;
            var n = params.length;
            var o;
            params.sort(paramsSorter);
            for (; i < n; i++) {
               sortParams(params[i].parameterList);
            }
        }

        /**
         * params sorter
         */
        function paramsSorter(p1, p2) {
            if (p1 !== p2) {
                return p1.identifier > p2.identifier ? 1 : -1;
            }
            return p1.id > p2.id ? 1 : -1;
        }

        /**
         * get action html
         */
        function getAHtml(a) {
            var str = "",
                requestParameterList = a.requestParameterList,
                responseParameterList = a.responseParameterList,
                requestParameterListNum = requestParameterList.length,
                responseParameterListNum = responseParameterList.length,
                p, i,
                breaker = true;


            sortParams(requestParameterList);
            sortParams(responseParameterList);

            str += getAInfoHtml(a);

            if (_isEditMode) {
                str += "<div class=\"action-info\"><a href\"#\" class='btn btn-default btn-xs' onclick=\"ws.moveAndCopy(); return false;\"><i class='glyphicon glyphicon-random'></i>移动/复制接口</a></div>";
            }

            str += _isEditMode ? TEMPLATE.REQUEST_BEGIN_EDIT : TEMPLATE.REQUEST_BEGIN;
            for (i = 0; i < requestParameterListNum; i++) {
                p = requestParameterList[i];
                str += getPTRHtml(p);
            }
            str += TEMPLATE.REQUEST_END;

            if (_isEditMode) {
                str += TEMPLATE.REQUEST_PARAMETER_ADD_BUTTON;
            }

            str += _isEditMode ? TEMPLATE.RESPONSE_BEGIN_EDIT : TEMPLATE.RESPONSE_BEGIN;
            for (i = 0; i < responseParameterListNum; i++) {
                p = responseParameterList[i];
                str += getPTRHtml(p);
            }
            str += TEMPLATE.RESPONSE_END;

            if (_isEditMode) {
                str += TEMPLATE.RESPONSE_PARAMETER_ADD_BUTTON;
            }

            return str;
        }

        /**
         * get action info html
         */
        function getAInfoHtml(a) {
            var head = "<h2 style='margin-top:20px;'>接口详情 <span style='font-size: 14px; color: #999;'>(id: " + a.id 
                + ") &nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" onclick=\"ws.showMockData(" 
                + a.id + ");\">Mock数据</button></span> </h2><div class='action-info' href='#' onclick='ws.editA(" 
                + a.id + "); return false;'>",
                body = "",
                foot = "</div>";

            if (a.name) {
                body += "<div class='item'><b>接口名称 </b>" + a.name + "</div>";
            }
            if (a.requestType) {
                body += "<div class='item'><b>请求类型 </b><font color='orange'>" + getRequestTypeStr(a.requestType) + "</font></div>";
            }
            if (a.requestUrl) {
                body += "<div class='item'><b>请求Url </b><font color='blue'> " + a.requestUrl + "</font></div>";
            }
            if (a.responseTemplate) {
                body += "<div class='item'><b>相关模板 </b><font color='red'>" + a.responseTemplate + "</font></div>";
            }
            if (a.description) {
                body += "<div class='item'><b>接口描述 </b>" + processTextarea(a.description) + "</div>";
            }


            if (!body) {
                body += "no info";
            }
            return head + body + foot;
        }

        /**
         * process text area, using @code @end commands
         * to make text area more colorful and readable
         * @param {string} text string to be formatted
         * @return {string} formatted string
         */
        function processTextarea(txt) {
            var code = '@type=array_map;';
            if (txt && txt.substring(0, 16) === code) {
                txt = txt.substring(16);
            }


            var arr = [],
            hasCode = txt.indexOf('@code') > -1,
            i = 0;
            if (txt.length > 100) {
            var t1 = hasCode ? txt.replace(/(@code|@end)/gmi, '') : txt;
            var reg = /@code([\s\S]*?)@end/gm;

            arr[i++] = '<a class="div-a-desc-expander" href="#" onclick="this.innerHTML = this.innerHTML == \'展开\' ? \'收缩\' : \'展开\';baidu.each(baidu.dom.query(\'.description-area\'), function(ele){baidu.dom.toggle(ele);});baidu.each(baidu.dom.query(\'.description-area-partial\'), function(ele){baidu.dom.toggle(ele)}); return false;">展开</a>';
            arr[i++] = '<div class="description-area-partial">';
            arr[i++] = t1.substring(0, 100);
            arr[i++] = '...</div>';
            /**
             * process code area
             */
            arr[i++] = '<div class="description-area" style="display:none;">';
            arr[i++] = txt.replace(reg, '<div class="js-code-area">$1</div>');
            arr[i++] = '</div>';
            arr[i++] = '</div>';
            } else {
            arr[i++] = txt;

            }

            return arr.join('');
        }

        /**
         * get request type string
         */
        function getRequestTypeStr(requestType) {
            requestType = requestType - 0;
            switch (requestType) {
                case 1:
                    return "get";
                case 2:
                    return "post";
                case 3:
                    return "put";
                case 4:
                    return "delete";
                default: return "unknown";
            }
        }

        /**
         * get parameter tr html
         */
        function getPTRHtml(param, level) {
            var str = "",
                parameterList = param.parameterList,
                parameterListNum = param.parameterList && param.parameterList.length ?
                    param.parameterList.length : 0;
            level = level || 0;
            str += "<tr class='tr-param" + (level > 0 || parameterListNum > 0 ? " param-level-" + level : "") +
                "' id='tr-param-" + param.id + "' onmouseover=\"ws.showOpColumn(event, " +
                param.id + "); return false;\"" + "onmouseout=\"ws.hideOpColumn(event, " +
                param.id + "); return false;\">";

            // special column, expander
            str += "<td class='expander'" + (_isEditMode ? " style='background-color:#E6E6E6;'" : "") + ">";
            if (parameterListNum > 0) {
                str += "<div style='position:relative;width:0;'><div class='more' id='div-param-expander-" + param.id + "' onclick='ws.paramShrink(" +
                    param.id + "); return false;' style='width:16px;height:18px;position: absolute;left:-22px;top:-10px;'></div></td>";
            }
            str += "</td>";

            if (_isEditMode) {
            str += getPTDHtml(param.id,
                    "<div id=\"div-param-op-" + param.id + "\" class=\"div-op-container\" style=\"display:none;\">" +
                    "<a href=\"#\" onclick=\"ws.removeParam(" + param.id + "); return false;\"><i class='glyphicon glyphicon-remove'></i></a>" +
                    (parameterListNum > 0 || param.dataType == "object" || param.dataType == "array<object>" ?
                     "<a style=\"margin-left:5px;color:#47a947;\" href=\"#\" onclick=\"ws.addParam('child', " +
                        param.id +  "); return false;\"><i class='glyphicon glyphicon-plus'></i></a>" : "") + "</div>", "op");
            }
            str += getPTDHtml(param.id, util.escaper.escapeInH(param.identifier), "identifier", level);
            str += getPTDHtml(param.id, util.escaper.escapeInH(param.name), "name");
            str += getDataTypeEditSelectHtml(param.id, param.dataType);
            // for remarkFilter, escape after filter processed...
            str += getPTDHtml(param.id, param.remark, "remark");
            str += "</tr>";

            for (var i = 0; i < parameterListNum; i++) {
                str += getPTRHtml(parameterList[i], level + 1);
            }

            return str;
        }

        /**
         * get parameter td html
         * value must be processed by escapeInH !!!
         *
         * for remarkFilter, escape after filter processed...
         */
        function getPTDHtml(id, value, type, level) {
            if (type === 'remark') {
                value = remarkFilter(value);
                value = util.escaper.escapeInH(value);
            } else if (type === 'identifier') {
                value = identifierFilter(value);
            }
            return "<td id='td-param-" + type + "-" + id + "' class='td-param " + type +
                "' onclick='ws.edit(" + id + ", \"param-"+ type +
                "\");' >" + (level ? new Array(level + 1).join('&nbsp;&nbsp;&nbsp;&nbsp;') : '') + value + "</td>";
        }

        /**
         * remark filter, remove @labels
         */
        function remarkFilter(r) {
            if (_isMockDisplay) {
                return r;
            }
            if (!r) return '';
            // 感谢@逸才 提供正则表达式
            if (~r.indexOf('@mock')) {
                return r.substring(0, r.indexOf('@mock'));
            }
            return r.replace(/[\s;]?@\w+=[^;]+[ ;]?/g, '');
        }

        /**
         * identifier filter, remove things after |(used for mockjs)
         */
        function identifierFilter(r) {
            if (_isMockDisplay) {
                return r;
            }
            if (!r) return '';
            return r.replace(/\|.*$/g, '');
        }

        /**
         * escaption handler
         */
        function jsonFilter(s) {
            if (!s) return '';
            s =  s.replace(/\\'/g, "'");
            s = s.replace();
            return s;
        }

        /**
         * action operation
         *
         * @param {number} mid target module id
         * @param {number} pid target page id
         * @param {string} t   type is one of ["move", "copy", "mount"]
         */
        function actionOperate(mid, pid, t) {
            console.log('action operation request with params, {mid:' + mid + ', pid:' + pid + ', op:' + t + "}.");
            var curMid = _curModuleId;
            var curAid = _curActionId;
            var action = p.getAction(curAid);

            action.pageId = pid;

            if (t === 'move') {
                p.removeAction(curAid);
                putObjectIntoDeletedPool("Action", curAid);
                _curActionId = p.addAction(action, true);
            } else if (t === 'copy') {
                _curActionId = p.addAction(action, true, true);
            }
            /**
            else if (t === 'mount') {
                _curActionId = p.addAction(action, 'mount');
            }
            */

            // hide floater
            ws.cancelEditA();

            // update before view moved to target tab
            updateCurMTree(true);

            /// switch th this new added action's module
            ws.switchM(p.getModuleIdByActionId(_curActionId), undefined, true);

            // switch to this new added action
            ws.switchA(_curActionId);

            // update the current model tree
            updateCurMTree();
        }


        /**
         * get edit input element
         */
        function getEditInputHtml(value, width, maxLength) {
            if (!value) {
                value = '';
            }
            value = util.escaper.escapeInH(value);
            return "<input id='" + ELEMENT_ID.EDIT_INPUT + "' class='edit-input' type='text' value='" + value +
                "' style='width: " + width +"px' maxlength='" + maxLength + "' onblur='ws.finishEdit();' />";
        }

        /**
         * get parameter data type edit select html
         */
        function getDataTypeEditSelectHtml(id, type) {
            var str = "",
                typeList = [
                        '',
                        'number',
                        'string',
                        'object',
                        'boolean',
                        'array<number>',
                        'array<string>',
                        'array<object>',
                        'array<boolean>',
                        'array'
                    ],
                typeListNum = typeList.length;

            str += "<td id='td-param-dataType-"+ id +"' class='td-param dataType'>";
            if (_isEditMode) {
                str += "<select id='select-dataType-"+ id + "' class='select-dataType' on" + CONFIG.KEYPRESS_EVENT_NAME + "='ws.dataTypeKeyPressed(event, " +
                    id + ");' onchange='ws.dataTypeSelectChanged(" + id + ", this.value);'>";
                for (var i = 0; i < typeListNum; i++) {
                    var item = typeList[i];
                    str += "<option value='"+ item +"'" + (item == type ? " selected='true'" : "") + ">" + util.escaper.escapeInH(item) + "</option>";
                }
                str += "</select>";
            } else {
                str += util.escaper.escapeInH(type);
            }
            str += "</td>";
            return str;
        }

        /**
         * get save panel html
         */
        function getSavePanelHtml(saveList) {
            if (saveList === null) return;
            var n = saveList.length,
                str = "";
            n = n >= CONFIG.SAVE_LIST_MAX_LENGTH ? CONFIG.SAVE_LIST_MAX_LENGTH : n;
            str += TEMPLATE.SAVE_PANEL_BEGIN;

            for (var i = 0; i < n; i++) {
                str += getSavePanelItemHtml(saveList[i]);
            }

            if (n < CONFIG.SAVE_LIST_MAX_LENGTH) {
                str += getSavePanelItemHtml();
            }

            str += TEMPLATE.SAVE_PANEL_END;
            return str;
        }

        /**
         * get verseion panel html
         */
        function getVersionPanelHtml(versionList) {
            if (versionList === null) return;
            var n = versionList.length,
                str = "";
            str += TEMPLATE.VERSION_PANEL_BEGIN;

            for (var i = 0; i < n; i++) {
                str += getVersionPanelItemHtml(versionList[i]);
            }

            str += TEMPLATE.VERSION_PANEL_END;
            return str;
        }

        /**
         * get save panel item html
         */
        function getSavePanelItemHtml(save) {
            var str = "",
                isNew = (save === null);
            str += "<div class='item'><input name='radio-save' type='radio' value='' group='save-panel' " +
                (isNew ? "" : "id='" + PREFIX.SAVE + save.id + "'") + "/>" + (isNew ? "新增存档" : "存档:" +
                save.id + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新时间: " + save.updateDate) + "</div>";
            return str;
        }

        /**
         * get version panel html
         */
        function getVersionPanelItemHtml(check) {
            var str = "";
            str += "<tr class='table-row'>";
            str += "<td><input name='radioCheckIn' type='radio' group='radioCheckInGroup' value='" + check.id + "' /></td>";
            str += "<td class='version'>" + check.version + "</td>";
            str += "<td class='operator'>" + util.escaper.escapeInH(check.userName) + "</td>";
            str += "<td class='operation-time'>" + check.createDateStr + "</td>";
            str += "<td class='version-desc' >" + util.escaper.escapeInH(check.description) + "</td>";
            str += "</tr>";
            return str;
        }


        /********************************************************
         *                                                      *
         *         ##html-template-engine-end                   *
         *                                                      *
         ********************************************************/


    /********************************************************
     *                                                      *
     *         ##private-methods-end                        *
     *                                                      *
     ********************************************************/

 })();

/********************************************************
 *                                                      *
 *         ##workspace-module-end                       *
 *                                                      *
 ********************************************************/

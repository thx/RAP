/**
 * 增值各模块公用JS文件
 *
 */

/**
 * @desc 多级联动下拉列表的渲染和事件注册
 * @param {Object} config 配置对象
 * @param {Number} level 级别，为当前select以及后级select注册事件
 * 使用方法： initMultiSelect([{id : "tradeList1", url : "${fTradeListAction}?tradeId="}, {id:"tradeList2"}]);
 */
function initMultiSelect(config, level) {
    for (var i = level !== undefined ? level : 0, info; info = config[i]; i++)	{
        // 获得select的DOM对象
        var select = baidu.G(info.id);

        if (info.data) {
            // 清空select
            while (select.length > 0) {
                //select.removeChild(select.options[select.length - 1]);
                select.options[select.length - 1] = null;
            }
            
            // 重新渲染select
            for (var j = 0; info.data[j]; j += 2) {
                select.options[j / 2] = new Option(info.data[j + 1], info.data[j]);
            }
        }
        else {
            info.data = [];
        }

        // 设置选中项
        if (info.value !== undefined) {
            select.value = info.value;
        }
        
        // 将一些值带入select作为附加属性
        select.level = i;
        select.config = config;
        
        // 事件注册
        if (level === undefined) {
            select._change = select.onchange;
            select.onchange = initMultiSelect.change;
        }
    }
}

initMultiSelect.change = function(force) {
    var curSelect = this;

    if (!curSelect.config[curSelect.level].url || (curSelect._change && curSelect._change() === false)) {
        return;
    }

    // 数据接收完毕的处理
    var reqSuccess = function(xhr, value) {
        eval("var config=" + value);
        for (var i = 0, info; info = config[i]; i++) {
            var o = curSelect.config[curSelect.level + i + 1];
            o.data = info.data;
            if (info.value) {
                o.value = info.value;
            }
        }
        initMultiSelect(curSelect.config, curSelect.level + 1);
        info = curSelect.config[curSelect.level + 1];
        info.receive && info.receive();
        return false;
    }
    
    // 重置下级的事件和下拉选项值
    for (var i = curSelect.level + 1, info; info = curSelect.config[i]; i++) {
   	    info.data = [];
    }

    // 发送请求
    var reqUrl = curSelect.config[curSelect.level].url + curSelect.value;
    baidu.ajax.get(reqUrl, reqSuccess);
}

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
		o._pattern(value, name, e.getAttribute('pattern'))
		|| o._number(value, name, e.getAttribute('maxValue'), e.getAttribute('minValue'))
		|| o._length(value, name, e.getAttribute('maxLen'), e.getAttribute('minLen'), e.getAttribute('character') !== false)
		|| o._custom(value, name, e.getAttribute('custom'));
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
					e.onInvalid = function (msg)
					{
						this._eMsg.innerHTML = msg;
					}
					e.onValid = function ()
					{
						this._eMsg.innerHTML = '';
					}
				}
				else
				{
					/* 如果没有同名的Element, 调用函数处理 */
					e.onInvalid = window[invalid];
					e.onValid = e.onInvalid.valid;
				}
			}
			else
			{
				e.onInvalid = function (msg)
				{
					this._sValue = this.value;
					baidu.addClass(this, 'invalid');
					this.value = msg;
					this.onfocus = function ()
					{
						baidu.removeClass(this,'invalid');
						var v = this._sValue;
						/* 恢复原来的值 */
						if (v !== undefined)
						{
							this.value = v;
							this._sValue = undefined;
						}
					}
				}
			}
		}
		try
		{
			e.onInvalid(msg);
		}
		catch (e)
		{
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
Validate.validElement = function (el)
{
	var list = el.getElementsByTagName('*');
	var r = true;
	for (var i = 0, o; o = list[i]; i++)
	{
		var tagName = o.tagName.toLowerCase();
		if ((tagName == 'input' || tagName == 'select' || tagName == 'textarea') && (o.offsetWidth || o.type=='hidden') && !Validate(o))
		{
			r = false;
		}
	}
	return r;
}

/**
 * 验证整个表单
 * @public
 *
 * @param {FormElement} form 表单元素
 * @return {Boolean} 是/否验证通过
 */
Validate.validForm = function (form)
{
	var list = form.elements;
	var r = true;
	for (var i = 0, o; o = list[i]; i++)
	{
		if ((o.offsetWidth || o.type=='hidden') && !Validate(o))
		{
			r = false;
		}
	}
	if(!r)
	{
		quickStop(_doubleClickRelated.curIndex);
	}
	return r;
}
/**
 * @desc 阻止二次点击
 * dom加载完成后自动为每个submit按钮及设置了preventDBClick属性的元素添加onclick事件
 * 
 * */
var _doubleClickRelated = {
	curElem:[],
	timeVar:[],
	newButton:[],
	curIndex:-1,
	timeSpan:5000
}
function preventDoubleClick() {
	var elems = document.getElementsByTagName("*");
	for (var i=0; i<elems.length; i++) {
		if((elems[i].tagName.toLowerCase() === 'input' && elems[i].type === 'submit')
			|| elems[i].getAttribute("preventDBClick") === "true") {
			var btn=document.createElement("input");
            btn.type = "button";
            btn.disabled = true;
            btn.value = "处理中……";
            btn.className = elems[i].className;
			var l = _doubleClickRelated.newButton.push(btn);
			_doubleClickRelated.curElem[l-1]=elems[i];
			baidu.event.on(elems[i], "click", clickSubmit(l-1));
		}
	}
}
function quickStop(index) {
	if (_doubleClickRelated.timeVar[index]) {
		clearTimeout(_doubleClickRelated.timeVar[index]);
	}
	if (_doubleClickRelated.curElem[index] && _doubleClickRelated.newButton[index]) {
		baidu.dom.remove(_doubleClickRelated.newButton[index]);
		baidu.dom.show(_doubleClickRelated.curElem[index]);
	}
}
function quickStopAll(){
    for(var i=0; i<_doubleClickRelated.curElem.length; i++){
        quickStop(i);
    }
}
function clickSubmit(index) {
	var comeBack = function(){
		quickStop(index);
	}
	return function(){
	    _doubleClickRelated.curIndex=index;
		baidu.dom.hide(_doubleClickRelated.curElem[index]);
		baidu.dom.insertBefore(_doubleClickRelated.newButton[index], _doubleClickRelated.curElem[index]);
		_doubleClickRelated.timeVar[index]=setTimeout(comeBack, _doubleClickRelated.timeSpan);
	}
}
baidu.dom.ready(preventDoubleClick);

/**
  *多选下拉框用到的JS
  *
*/
var clickOtherHandler={};
function showPanel(tId, pId){
    var position =baidu.dom.getPosition(tId);
    var panel = baidu.g(pId);
    baidu.setStyles(pId, {"top":position.top,"left":position.left}); 
    baidu.dom.show(pId);
    baidu.event.on(document.body, "click", clickOtherHandler[pId]=function(e){
        var curObj=baidu.event.getTarget(e);
        do{
            if(curObj.id === pId || curObj.id === tId)
                return;
            if(curObj.tagName.toLowerCase() === "body"){
                hidePanel(tId, pId);
                return;
            }
            curObj=curObj.parentNode;
        }while(curObj.parentNode);
    });
}
function hidePanel(tId,pId){
    baidu.event.un(document.body, "click", clickOtherHandler[pId]);
    baidu.dom.hide(pId);
    var inputElems = baidu.g(pId).getElementsByTagName("input");
    var txtElem = baidu.g(tId);
    txtElem.value="";
    for(var i=0; i<inputElems.length; i++){
        if(inputElems[i].type==="checkbox" 
           && (inputElems[i].checked===true||inputElems[i].checked==="checked")){
            if(txtElem.value!==""){
                txtElem.value+=", ";
            }
            txtElem.value+=baidu.dom.next(inputElems[i]).innerHTML;
        }
    }
}

/**
 * 对数据进行正则表达式验证
 * @public
 *
 * @param {String} value 要验证的字符串
 * @param {String} name 字符串名称
 * @param {String} regexp 正则表达式字符串
 * @return {String} 如果有值返回的是出错提示信息
 */
Validate._pattern = function (value, name, regexp)
{
	if (regexp && !value.match(new RegExp('^' + regexp + '$')))
	{
		return baidu.format(Validate.ERR_INVAILD, [name]);
	}
}

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
Validate._number = function (value, name, max, min)
{
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
}

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
Validate._length = function (value, name, max, min, character)
{
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
}

/**
 * 自定义验证调用
 * @public
 *
 * @param {String} value 要验证的字符串
 * @param {String} name 字符串名称
 * @param {String} func 自定义验证函数名
 * @return {String} 如果有值返回的是出错提示信息
 */
Validate._custom = function (value, name, func)
{
	if (func)
	{
		return window[func](value, name);
	}
}

var ecStorage = {
    /**
     * 本地存储提交
     * @param {String} localDataId 本地存储数据标识ID
     * @param {Object} alterData 需要额外添加的参数。格式如：{"userName" : "mananger", "member" : ["张三", "李四"] }
     * @param {String} url 请求的url
     * @param {Object} ecId 本地存储控件ID。可选，默认为localDataId
     */
    "submit" : function (localDataId, alterData, url, ecId) {
        var ecId = ecId || "localStorage",
            localStorage = ecui.get(ecId);

        // 如果不存在localDataId则不进行处理
        if (!localDataId) {
            return false;
        }

        // 恢复对应localDataId数据
        var formEl = localStorage.restore(localDataId);

        // 置localDataId值
        // formEl.localDataId.value = localDataId;
        for (var i = 0, inputs = formEl.getElementsByTagName("input"), o;
                o = inputs[i++]; ) {
            if (o.name == "localDataId") {
                o.value = localDataId;
                break;
            }
        }

        // 存在url则修改
        url && formEl.setAttribute("action", url);
        formEl.setAttribute("method", "post");

        //添加其它制定数据
        var alterData = alterData || {};
        var inputHtml = "";
        for (var item in alterData) {
            var key = item;
            var value = alterData[item];
            if (baidu.lang.isArray(value)) {
                for (var i = 0, len = value.length; i < len; i++) {
                    inputHtml += '<input type="hidden" name="' + item + '" value="' + value[i] + '" />';
                }
            }
            else {
                inputHtml += '<input type="hidden" name="' + item + '" value="' + value + '" />';
            }
        }

        if (inputHtml != "") {
            baidu.insertHTML(formEl, "beforeEnd", inputHtml);
        }

        formEl.submit();
    },
    /**
     * 为表单添加本地存储表单项(注：表单项内容不能重名)
     * @param {String} localDataId 本地存储数据标识ID
     * @param {HTMLElement} formEl 需要添加的本地存储数据的表单元素
     * @param {Object} alterData 需要额外添加的参数。格式如：{"userName" : "mananger", "member" : ["张三", "李四"] }
     * @param {Object} ecId 本地存储控件ID。可选，默认为localDataId
     */
    "addParam" : function(localDataId, formEl, alterData, ecId) {
        var ecId = ecId || "localStorage";
        var localStorage = ecui.get(ecId);

        // 如果不存在localDataId则不进行处理
        if (!localDataId) {
            return false;
        }

        // 恢复对应localDataId数据
        localStorage.restore(localDataId, formEl);

        // 置localDataId值
        formEl.localDataId.value = localDataId;

        //添加其它制定数据
        var alterData = alterData || {};
        var inputHtml = "";
        for (var item in alterData) {
            var key = item;
            var value = alterData[item];
            if (baidu.lang.isArray(value)) {
                for (var i = 0, len = value.length; i < len; i++) {
                    inputHtml += '<input type="hidden" name="' + item + '" value="' + value[i] + '" />';
                }
            }
            else {
                inputHtml += '<input type="hidden" name="' + item + '" value="' + value + '" />';
            }
        }

        if (inputHtml != "") {
            baidu.insertHTML(formEl, "beforeEnd", inputHtml);
        }
    }
};

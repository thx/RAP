var ecui = {};

(function () {
//tangram fix
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
    set: function (element, value) {
        element = element.style;
        if (value == 'inline-block') {
            element.display = 'inline';
            element.zoom = 1;
        } else {
            element.display = value;
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (element, value) {
        element.style.display = value == 'inline-block' ? '-moz-inline-box' : value;
    }
} : void(0);



    var core = ecui,
        array = core.array = {},
        browser = core.browser = {},
        dom = core.dom = {},
        ext = core.ext = {},
        string = core.string = {},
        ui = core.ui = {},
        util = core.util = {},

        lib = baidu,
        libArray = lib.array,
        libBrowser = lib.browser,
        libDom = lib.dom,
        libString = lib.string,

        ieVersion = browser.ie = libBrowser.ie,
        firefoxVersion = browser.firefox = libBrowser.firefox,

        DOM_TEXT = firefoxVersion ? 'textContent' : 'innerText',
        undefined = void(0),
        WINDOW = window,
        DOCUMENT = document,
        MATH = Math,
        MIN = MATH.min,
        MAX = MATH.max,
        ABS = MATH.abs,
        FLOOR = MATH.floor,
        PARSEINT = parseInt,

        /**
         * 查询数组中指定对象的位置序号。
         * indexOf 方法返回完全匹配的对象在数组中的序号，如果在数组中找不到指定的对象，返回 -1。
         * @public
         * 
         * @param {Array} list 数组对象
         * @param {Object} obj 需要查询的对象
         * @return {number} 位置序号，不存在返回 -1
         */
        indexOf = array.indexOf = libArray.indexOf,

        /**
         * 从数组中移除对象。
         * @public
         * 
         * @param {Array} list 数组对象
         * @param {Object} obj 需要移除的对象
         */
        remove = array.remove = libArray.remove,

        /**
         * 为 Element 对象添加新的样式。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间使用空白符分隔
         */
        addClass = dom.addClass = libDom.addClass,

        /**
         * 获取 Element 对象的所有深度为1的子 Element 对象。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @return {Array} Element 对象数组
         */
        children = dom.children = libDom.children,
        
        /**
         * 判断一个 Element 对象是否包含另一个 Element 对象。
         * contain 方法会将两个 Element 对象相同也认为是包含。
         * @public
         * 
         * @param {HTMLElement} container 包含的 Element 对象
         * @param {HTMLElement} contained 被包含的 Element 对象
         * @return {boolean} contained 对象是否被包含于 container 对象的 DOM 节点上
         */
        contain = dom.contain = function (container, contained) {
            return container == contained || libDom.contains(container, contained);
        },

        /**
         * 设置 Element 对象为定位坐标轴。
         * coordinates 方法将非 absolute 定位的 Element 对象的 position 样式设置成 relative。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         */
        coordinates = dom.coordinates = function (el) {
            if (getStyle(el, 'position') != 'absolute') {
                el.style.position = 'relative';
            }
        },

        /**
         * 根据 html 代码或元素标签创建 Element 对象。
         * @public
         * 
         * @param {string} innerHTML html 代码或元素标签，默认创建一个空的 div 对象
         * @param {HTMLElement} parent 父 Element 对象，如果参数有值自动将创建的 Element 对象加入其中
         * @return {HTMLElement|Array} Element 对象或 Element 对象数组
         */
        createDom = dom.create = function (innerHTML, parent) {
            innerHTML = trim(innerHTML || 'div');

            if (/^<(\w+)/.test(innerHTML)) {
                var elements = [],
                    el = RegExp['$1'].toLowerCase(),
                    level = 0, /* 需要外添标签的嵌套层数 */
                    cache = DOCUMENT.createElement('div');

                /* TD,TH,TR,TBODY 需要特殊的处理方式 */
                switch (el) {
                    case 'td':
                    case 'th':
                        innerHTML = '<tr>' + innerHTML + '</tr>';
                        level++;
                    case 'tr':
                        innerHTML = '<tbody>' + innerHTML + '</tbody>';
                        level++;
                    case 'tbody':
                        innerHTML = '<table>' + innerHTML + '</table>';
                        level++;
                }

                cache.innerHTML = innerHTML;

                /* 去除嵌套的层 */
                while (level--) {
                    cache = cache.firstChild;
                }

                while (el = cache.firstChild) {
                    elements.push(el);
                    parent ? parent.appendChild(el) : cache.removeChild(el);
                }
                return elements.length > 1 ? elements : elements[0];
            }
            else {
                el = DOCUMENT.createElement(innerHTML);
                parent && parent.appendChild(el);
                return el;
            }
        },

        /**
         * 获取 Element 对象的第一个子 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 子 Element 对象
         */
        first = dom.first = libDom.first,

        /**
         * 获取无效的容器高度(即容器的 border 区域与 content 区域的高度修正值)。
         * 无效的容器高度受到 borderTopWidth、paddingTop、paddingBottom 与 borderBottomWidth 四个样式的影响。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 无效的容器高度
         */
        getInvalidHeight = dom.getInvalidHeight = function (el) {
            return sumStyles(el, 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth');
        },

        /**
         * 获取无效的容器宽度(即容器的 border 区域与 content 区域的宽度修正值)。
         * 无效的容器宽度受到 borderLeftWidth、paddingLeft、paddingRight 与 borderRightWidth 四个样式的影响。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 无效的容器宽度
         */
        getInvalidWidth = dom.getInvalidWidth = function (el) {
            return sumStyles(el, 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth');
        },

        /**
         * 获取 Element 对象的页面位置。
         * getPosition 方法将返回指定 Element 对象的位置信息。属性如下：
         * left {number} X轴坐标
         * top  {number} Y轴坐标
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {Object} 位置信息
         */
        getPosition = dom.getPosition = libDom.getPosition,

        /**
         * 获取 Element 对象的样式值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @return {Object} 样式值
         */
        getStyle = dom.getStyle = libDom.getStyle,

        /**
         * 获取 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {string} Element 对象的文本
         */
        getText = dom.getText = function (el) {
            return el[DOM_TEXT];
        },

        /**
         * 将 Element 对象插入指定的 Element 对象之后。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertAfter = dom.insertAfter = libDom.insertAfter,

        /**
         * 将 Element 对象插入指定的 Element 对象之前。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertBefore = dom.insertBefore = libDom.insertBefore,

        /**
         * 在当前 Element 对象与它的 childNodes 之间插入 div 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 插入的 Element 对象
         */
        insertFloor = dom.insertFloor = function (el) {
            var newEl = createDom(),
                tmpEl;

            while (tmpEl = el.firstChild) {
                newEl.appendChild(tmpEl);
            }
            return el.appendChild(newEl);
        },

        /**
         * 从页面中移除 Element 对象。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 被移除的 Element 对象
         */
        removeDom = dom.remove = function (el) {
            var parent = el.parentNode;
            parent && parent.removeChild(el);
            return el;
        },

        /**
         * 删除 Element 对象中的样式。
         * @public
         * 
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间用空白符分隔
         */
        removeClass = dom.removeClass = libDom.removeClass,

        /**
         * 设置输入框的表单项名称。
         * @public
         *
         * @param {HTMLElement} el InputElement 对象
         * @param {string} name 新的表单项名称
         * @return {HTMLElement} 设置后的 InputElement 对象
         */
        setInputName = dom.setInputName = function (el, name) {
            var tmpEl = el;
            if (ieVersion) {
                if (el.name != name) {
                    el = createDom('<input type="' + tmpEl.type + '" name="' + name + '">');
                    el.value = tmpEl.value;
                    el.className = tmpEl.className;
                    el.disabled = tmpEl.disabled;
                    el.readOnly = tmpEl.readOnly;
                    el.style.cssText = tmpEl.style.cssText;
                    insertAfter(el, tmpEl);
                    removeDom(tmpEl);
                }
            }
            else {
                el.name = name;
            }
            return el;
        },

        /**
         * 设置 Element 对象的样式值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @param {string} value 样式值
         */
        setStyle = dom.setStyle = libDom.setStyle,

        /**
         * 设置 Element 对象的多个样式值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} styles 样式对象，使用键值对保存
         */
        setStyles = dom.setStyles = libDom.setStyles,

        /**
         * 设置 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} text Element 对象的文本
         */
        setText = dom.setText = function (el, text) {
            el[DOM_TEXT] = text;
        },

        /**
         * 对指定的一组样式值进行求和处理。
         * sumStyles 方法将指定的一组样式的值求和，求和会省略值的符号，例如9px将当成数值的 9，不能识别的数值将默认为 0。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} ... 一组样式名称
         * @return {number} 一组样式取值的和
         */
        sumStyles = dom.sumStyles = function (el) {
            for (var i = 1, sum = 0, name; name = arguments[i++]; ) {
                sum += PARSEINT(getStyle(el, name)) || 0;
            }
            return sum;
        },

        /**
         * 驼峰命名法转换。
         * toCamelCase 方法将 xxx-xxx 字符串转换成 xxxXxx。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        toCamelCase = string.toCamelCase = libString.toCamelCase,

        /**
         * 过滤字符串两端的空白字符。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        trim = string.trim = libString.trim,

        /**
         * 对象属性复制。
         * @public
         *
         * @param {Object} des 目标对象
         * @param {Object} src 源对象
         */
        copy = util.copy = lib.object.extend,

        /**
         * 在页面中创建一个 flash 对象。
         * options 参数支持的属性如下：
         * id                {string} 要创建的 flash 的标识
         * url               {string} flash 文件的 url
         * errorMessage      {string} 未安装 flash player 或 flash player 版本号过低时的提示
         * ver               {string} 最低需要的 flash player 版本号
         * width             {string} flash 的宽度
         * height            {string} flash 的高度
         * align             {string} flash 的对齐方式
         * base              {string} 设置用于解析 swf 文件中的所有相对路径语句的基本目录或 URL
         * bgcolor           {string} swf 文件的背景色
         * salign            {string} 缩放的 swf 文件在由 width 和 height 设置定义的区域内的位置
         * menu              {string} 是否显示右键菜单
         * loop              {string} 播放到最后一帧时是否重新播放
         * play              {string} flash 是否在浏览器加载时就开始播放
         * quality           {string} 设置 flash 播放的画质
         * scale             {string} 设置 flash 内容如何缩放来适应设置的宽高
         * wmode             {string} flash 的显示模式
         * allowscriptaccess {string} flash 与页面的通信权限
         * allownetworking   {string} 设置 swf 文件中允许使用的网络 API
         * allowfullscreen   {string} 是否允许 flash 全屏
         * seamlesstabbing   {string} 允许设置执行无缝跳格，从而使用户能跳出 flash 应用程序。该参数只能在安装 Flash7 及更高版本的 Windows 中使用
         * devicefont        {string} 静态文本对象是否以设备字体呈现
         * swliveconnect     {string} 第一次加载 flash 时浏览器是否应启动 Java
         * vars              {Object} 要传递给 flash 的参数
         * 
         * @param {Object} options 创建 flash 的选项参数
         * @param {HTMLElement} target 创建 flash 的父容器元素
         */
        createSWF = util.createSWF = baidu.swf.create,

        /**
         * 在 prototype 链上查找与当前对象指定属性不相同的属性。
         * 对象在引用属性时，有时需要得知原型链上被覆盖的属性值。findPrototype 方法用于在原型链上查找当前属性值覆盖掉的属性值，如果无法找到，返回 undefined。
         * @public
         *
         * @param {ecui.ui.Control} object 需要查找属性的对象
         * @param {string} name 属性名称
         * @param {Object} 属性值
         */
        findPrototype = util.findPrototype = function (object, name) {
            for (
                var currValue = object[name],
                    clazz = object.constructor.prototype;
                clazz;
                clazz = clazz.constructor.superClass
            ) {
                if (currValue != clazz[name]) {
                    return clazz[name];
                }
            }
        },

        /**
         * 获取浏览器可视区域的相关信息。
         * getView 方法将返回浏览器可视区域的信息。属性如下：
         * top    {number} 可视区域最小X轴坐标
         * right  {number} 可视区域最大Y轴坐标
         * bottom {number} 可视区域最大X轴坐标
         * left   {number} 可视区域最小Y轴坐标
         * width  {number} 可视区域的宽度
         * height {number} 可视区域的高度
         * @public
         *
         * @return {Object} 浏览器可视区域信息
         */
        getView = util.getView = function () {
            var body = DOCUMENT.body,
                html = body.parentNode,
                client = DOCUMENT.compatMode == 'BackCompat' ? body : DOCUMENT.documentElement,
                scrollTop = html.scrollTop + body.scrollTop,
                scrollLeft = html.scrollLeft + body.scrollLeft,
                clientWidth = client.clientWidth,
                clientHeight = client.clientHeight;

            return {
                top: scrollTop,
                right: clientWidth + scrollLeft,
                bottom: clientHeight + scrollTop,
                left: scrollLeft,
                width: MAX(html.scrollWidth, body.scrollWidth, clientWidth),
                height: MAX(html.scrollHeight, body.scrollHeight, clientHeight)
            };
        },

        /**
         * 类继承。
         * @public
         *
         * @param {Function} subClass 子类
         * @param {Function} superClass 父类
         * @param {Object} objMethods 子类扩展的对象方法
         * @param {Object} classMethods 子类扩展的类方法
         * @return {Object} subClass 的 prototype 属性
         */
        inherits = util.inherits = function (subClass, superClass, objMethods, classMethods) {
            lib.lang.inherits(subClass, superClass);
            copy(subClass, classMethods);
            copy(subClass = subClass.prototype, objMethods);
            return subClass;
        },

        /**
         * 将字符串解析成 json 对象。
         * 
         * @param {string} source 需要解析的字符串
         * @return {Object} 解析结果 json 对象
         */
        parse = util.parse = lib.json.parse,

        /**
         * 将 json 对象序列化。
         * 
         * @param {Object} value 需要序列化的 json 对象
         * @return {string} 序列化后的字符串
         */
        stringify = util.stringify = lib.json.stringify,

        /**
         * 创建一个定时器对象，从第4个参数起都是传入 func 中的变量
         * @public
         *
         * @param {Function} func 定时器需要调用的函数
         * @param {number} delay 定时器延迟调用的毫秒数
         * @param {Object} caller 调用者，在 func 被执行时，this 指针指向的对象，可以为空
         */
        Timer = core.Timer = function (func, delay, caller) {
            var args = Array.prototype.slice.call(arguments, 3);
            this._nID = setTimeout(function () {
                func.apply(caller, args);
                args = caller = null;
            }, delay);
        },

        $bind,
        $connect,
        $fastCreate,
        blank,
        calcHeightRevise,
        calcWidthRevise,
        cancel,
        capture,
        createControl,
        custom,
        drag,
        findControl,
        forcibly,
        getFocused,
        getKey,
        getMouseX,
        getMouseY,
        getPressed,
        loseFocus,
        mask,
        restore,
        setFocused,
        standardEvent;

    /**
     * 设置页面加载完毕后自动执行的方法。
     * @public
     *
     * @param {Function} func 需要自动执行的方法
     */
    dom.ready = libDom.ready;

    /**
     * 中止延迟调用操作
     * @public
     */
    Timer.prototype.stop = function () {
        clearTimeout(this._nID);
    };





    (function () {
        var isFixedPadding,         /* 在计算宽度与高度时，是否需要修正内填充样式的影响 */
            isFixedBorder,          /* 在计算宽度与高度时，是否需要修正边框样式的影响 */
            isFixedOffset,          /* 在计算相对位置时，是否需要修正边框样式的影响 */

            targetElement,          /* 事件发生时对应的标签对象 */


            maskStack = [],         /* 设置遮罩时的栈 */
            maskElement,            /* 遮罩层 */


            mouseX,                 /* 当前鼠标光标的X轴坐标 */
            mouseY,                 /* 当前鼠标光标的Y轴坐标 */

            keyCode,                /* 当前键盘按下的键值，解决keypress与keyup中得不到特殊按键的keyCode的问题 */


            allControls = [],       /* 全部生成的控件，供释放控件占用的内存使用 */
            namedControls,          /* 所有被命名的控件的集合 */
            uniqueIndex = 0,        /* 控件的唯一序号 */
            connectedControls = {}, /* 等待关联的控件集合 */


            selectorControl,        /* 在select操作时使用此控件展现选择的部分 */


            pressedControl =        /* 当前环境下被按压的控件 */
            overedControl =         /* 当前鼠标移入的控件 */
            outCachedControl =      /* 鼠标移出事件对应的对象缓存，要在移入事件发生时才真正触发当前环境的移出事件 */
            focusedControl =        /* 当前环境下拥有焦点的控件 */
            null,

            envStack = [],          /* 高优先级事件调用时，保存上一个事件环境的栈 */
            currEnv = {             /* 当前操作的环境数据对象 */

                mousedown: function (event) {
                    event = standardEvent(event);
                    pressedControl = event.getTarget();

                    /* 改变框架中被激活的控件 */
                    setFocused(pressedControl);
                    if (pressedControl) {
                        pressedControl.mousedown(event);
                        pressedControl.pressstart(event);
                    }
                },

                mouseover: function (event) {
                    /* 鼠标移入的处理，首先需要计算是不是位于之前移出的控件之外，如果是需要触发之前的移出事件 */
                    event = standardEvent(event);

                    var parent = getCommonParent(overedControl = event.getTarget(), outCachedControl),

                        allowPress = currEnv.type,
                        /* 在拖曳与缩放状态时，不进行按压移入移出的处理 */
                        allowPress = allowPress != 'drag' && allowPress != 'zoom',

                        control;

                    /* 对控件及其父控件序列进行移出或移入操作，针对公共的父控件不进行处理 */
                    for (control = outCachedControl; control != parent; control = control.getParent()) {
                        control.mouseout(event);

                        pressedControl == control && allowPress && control.pressout(event);

                    }
                    for (control = overedControl; control != parent; control = control.getParent()) {
                        control.mouseover(event);

                        pressedControl == control && allowPress && control.pressover(event);

                    }

                    outCachedControl = null;
                },

                mousemove: function (event) {
                    event = standardEvent(event);

                    /* 对控件及其父控件序列进行移动操作 */
                    for (var control = event.getTarget(); control; control = control.getParent()) {
                        control.mousemove(event);
                        pressedControl == control && control.pressmove(event);
                    }
                },

                mouseout: function (event) {
                    /* IE下可能 target 存在，但是 target 的 mouseout 事件不触发，存在BUG */
                    outCachedControl = findControl(standardEvent(event).target);
                },

                mouseup: function (event) {
                    event = standardEvent(event);

                    var control = event.getTarget();
                    control && control.mouseup(event);

                    if (pressedControl) {
                        pressedControl.pressend(event);
                        /* 点击事件只在鼠标按下与弹起发生在同一个控件上时触发 */
                        pressedControl.contain(control) && pressedControl.click(event);
                        pressedControl = null;
                    }
                }
            },
                
            customEnv = { /* 自定义点击操作的环境数据对象 */
                type: 'custom',

                mousedown: function (event) {
                    event = standardEvent(event);

                    pressedControl = event.getTarget();
                    pressedControl.mousedown(event);
                    pressedControl.pressstart(event);
                },

                mouseup: function (event) {
                    restore();
                    currEnv.mouseup(event);
                }
            },


            dragEnv = { /* 拖曳操作的环境数据对象 */
                type: 'drag',

                mousemove: function (event) {
                    event = standardEvent(event);

                    /* 计算限制拖拽的范围 */
                    var target = currEnv.target,
                        /* 计算期待移到的位置 */
                        expectX = target.getX() + mouseX - currEnv.x,
                        expectY = target.getY() + mouseY - currEnv.y,
                        /* 计算实际允许移到的位置 */
                        x = MIN(MAX(expectX, currEnv.left), currEnv.right),
                        y = MIN(MAX(expectY, currEnv.top), currEnv.bottom);

                    target.ondragmove && target.ondragmove(event, x, y) === false
                        || target.$dragmove(event, x, y) === false
                        || target.setPosition(x, y);

                    currEnv.x = mouseX + target.getX() - expectX;
                    currEnv.y = mouseY + target.getY() - expectY;
                },

                mouseup: function (event) {
                    var target = currEnv.target;
                    target.ondragend && target.ondragend(standardEvent(event)) === false || target.$dragend(event);
                    restore();
                    /* 恢复IE浏览器外事件捕获的规则 */
                    ieVersion && DOCUMENT.body.releaseCapture(false);
                    currEnv.mouseup(event);
                }
            },


            forciblyEnv = { /* 强制点击拦截操作的环境数据对象 */
                type: 'forcibly',

                mousedown: function (event) {
                    event = standardEvent(event);

                    var env = currEnv, target = env.target;
                    if (target.onforcibly && target.onforcibly(event) === false
                            || target.$forcibly(event) === false) {
                        env != currEnv && currEnv.mousedown(event);
                    } else {
                        restore();
                    }
                }

            },

            zoomEnv = { /* 缩放操作的环境数据对象 */
                type: 'zoom',

                mousemove: function (event) {
                    event = standardEvent(event);
                    var target = currEnv.target,
                        width = currEnv.width,
                        expectWidth = currEnv.width = mouseX - currEnv.x + width,
                        height = currEnv.height,
                        expectHeight = currEnv.height = mouseY - currEnv.y + height,
                        minWidth = currEnv.minWidth,
                        maxWidth = currEnv.maxWidth,
                        minHeight = currEnv.minHeight,
                        maxHeight = currEnv.maxHeight;

                    currEnv.x = mouseX;
                    currEnv.y = mouseY;

                    var x = currEnv.left,
                        y = currEnv.top;

                    width = minWidth !== undefined ? MAX(minWidth, expectWidth) : expectWidth;
                    height = minHeight !== undefined ? MAX(minHeight, expectHeight) : expectHeight;
                    width = maxWidth !== undefined ? MIN(maxWidth, width) : width;
                    height = maxHeight !== undefined ? MIN(maxHeight, height) : height;

                    /* 如果宽度或高度是负数，需要重新计算定位 */
                    target.setPosition(width < 0 ? x + width : x, height < 0 ? y + height : y);
                    target.onzoom && target.onzoom(event) === false || target.$zoom(event) === false
                        || target.setSize(ABS(width), ABS(height));
                },

                mouseup: function (event) {
                    var target = currEnv.target;
                    target.onzoomend && target.onzoomend(standardEvent(event)) === false || target.$zoomend(event);
                    restore();
                    ieVersion && DOCUMENT.body.releaseCapture(false);

                    /* 如果是选择框需要关闭 */

                    target == selectorControl ? target.hide() : onresize();

                    currEnv.mouseup(event);
                }

            };

        /**
         * 使一个 DOM 节点与一个 ECUI 控件 在逻辑上绑定。
         * 一个 DOM 节点只能绑定一个 ECUI 控件，多次绑定以最后一次为准，绑定后的 DOM 节点可以通过 getControl 方法得到绑定的 ECUI 控件。使用页面静态初始化(参见 ECUI 使用方式)控件后，如果需要修改 DOM 节点绑定的 ECUI 控件，通过改变 DOM 节点的 ecui 属性值，并调用核心提供的 init 方法初始化，是无效的，请通过 create 方法创建控件后，执行此方法进行绑定。
         * @protected
         *
         * @param {HTMLElement} el Element 对象
         * @param {ecui.ui.Control} control ECUI 控件
         */
        $bind = core.$bind = function (el, control) {
            el.getControl = function () {
                return control;
            }
            el = null;
        };

        /**
         * 为两个 ECUI 控件 建立连接。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方式)方式，控件创建后，需要的关联控件也许还未创建。$connect 方法提供将指定的函数滞后到对应的控件创建后才调用的模式。如果 targetId 对应的控件还未创建，则调用会被搁置，直到需要的控件创建成功后，再自动执行，参见 create 方法。
         * @protected
         *
         * @param {ecui.ui.Control} caller 发起建立连接请求的 ECUI 控件
         * @param {Function} func 用于建立连接的方法，即通过调用 func.call(caller, ecui.get(targetId)) 建立连接
         * @param {string} targetId 被连接的 ECUI 控件 标识符，即在标签的 ecui 属性中定义的 id 值
         */
        $connect = core.$connect = function (caller, func, targetId) {
            if (targetId) {
                var target = namedControls[targetId];
                target
                    ? func.call(caller, target)
                    : (connectedControls[targetId] || (connectedControls[targetId] = [])).push({
                        func: func,
                        caller: caller
                    });
            }
        };

        /**
         * 快速创建 ECUI 控件。
         * $fastCreate 方法创建的 ECUI 控件，不会自动初始化样式、事件等，$fastCreate 方法通常被用于大批量的控件创建，例如表格中的单元格控件。
         * @protected
         *
         * @param {Function} type 控件的构造函数
         * @param {HTMLElement} el Element 对象
         * @param {Object} params 初始化参数，参见 ECUI 控件 
         * @return {ecui.ui.Control} ECUI 控件
         */
        $fastCreate = core.$fastCreate = function (type, el, params) {
            params.uid = 'ec-' + ++uniqueIndex;
            params.base = trim(el.className).split(/\s+/)[0];

            type = new type(el, params);
            type.$setParent(findControl(el.parentNode));
            allControls.push(type);

            return type;
        };

        /*
         * 空函数。
         * blank 方法不应该被执行，也不进行任何处理，它用于提供给不需要执行操作的事件方法进行赋值，与 blank 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 cancel、capture 与 custom。
         * @public
         */
        blank = core.blank = function () {
        };

        /**
         * 获取高度修正值(即计算 padding, border 样式对 height 样式的影响)。
         * IE 在盒子模型上不完全遵守 W3C 标准，因此，需要使用 calcHeightRevise 方法计算 offsetHeight 与实际的 height 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 高度修正值
         */
        calcHeightRevise = core.calcHeightRevise = function (el) {
            return (isFixedPadding ? sumStyles(el, 'paddingTop', 'paddingBottom') : 0)
                + (isFixedBorder ? sumStyles(el, 'borderTopWidth', 'borderBottomWidth') : 0);
        };

        /**
         * 获取左定位修正值(即计算 border 样式对 left 样式的影响)。
         * opera 等浏览器，offsetLeft 与 left 样式的取值受到了 border 样式的影响，因此，需要使用 calcLeftRevise 方法计算 offsetLeft 与实际的 left 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 左定位修正值
         */
        core.calcLeftRevise = function (el) {
            return isFixedOffset && getStyle(el, 'position') != 'static' ? sumStyles(el, 'borderLeftWidth') : 0;
        };

        /**
         * 获取上定位修正值(即计算 border 样式对 top 样式的影响)。
         * opera 等浏览器，offsetTop 与 top 样式的取值受到了 border 样式的影响，因此，需要使用 calcTopRevise 方法计算 offsetTop 与实际的 top 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 上定位修正值
         */
        core.calcTopRevise = function (el) {
            return isFixedOffset && getStyle(el, 'position') != 'static' ? sumStyles(el, 'borderTopWidth') : 0;
        };

        /**
         * 获取宽度修正值(即计算 padding,border 样式对 width 样式的影响)。
         * IE 在盒子模型上不完全遵守 W3C 标准，因此，需要使用 calcWidthRevise 方法计算 offsetWidth 与实际的 width 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 宽度修正值
         */
        calcWidthRevise = core.calcWidthRevise = function (el) {
            return (isFixedPadding ? sumStyles(el, 'paddingLeft', 'paddingRight') : 0)
                + (isFixedBorder ? sumStyles(el, 'borderLeftWidth', 'borderRightWidth') : 0);
        };

        /*
         * 返回 false。
         * cancel 方法不应该被执行，它每次返回 false，用于提供给需要返回逻辑假操作的事件方法进行赋值，例如需要取消默认事件操作的情况，与 cancel 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 blank、capture 与 custom。
         * @public
         *
         * @return {boolean} false
         */
        cancel = core.cancel = function () {
            return false;
        };

        /**
         * 标准的事件捕获处理函数，如果捕获成功返回 true。
         * capture 方法不应该被执行，用于对标签需要捕获的事件方法进行赋值，capture 在标签与 ECUI 核心事件处理机制之间建立联系。在一个事件周期只有唯一的 ECUI 控件 能够成功捕获事件，当一个标签的 capture 方法被执行后，默认其它标签的 capture 方法都不会返回 ture。只有使用 $bind 绑定控件后的标签才能设置捕获，否则将产生不可预知的异常，与 capture 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 blank、cancel 与 custom。
         * @public
         *
         * @return {boolean} 如果捕获成功，返回true
         */
        capture = core.capture = function () {
            if (!targetElement) {
                targetElement = this;
                return true;
            }
        };

        /**
         * 创建 ECUI 控件。
         * 标准的创建 ECUI 控件 的工厂方法，所有的 ECUI 控件 都应该通过 create 方法或者 $fastCreate 方法生成。params 参数对象支持的属性如下：
         * id        {string} 当前控件的 id，提供给 $connect 与 get 方法使用
         * baseClass {string} 控件的基本样式，参见 getBaseClass 方法，如果忽略此参数将使用基本 Element 对象的 className 属性
         * element   {HTMLElement} 与控件绑捆的 Element 对象，参见 getBase 方法，如果忽略此参数将创建 Element 对象与控件绑捆
         * parent    {ecui.ui.Control} 父控件对象或者父 Element 对象
         * type      {string} 控件的默认样式，通常情况下省略此参数，使用 "ec-控件名称" 作为控件的默认样式
         * @public
         *
         * @param {string} type 控件的类型名称
         * @param {Object} params 初始化参数，参见 ECUI 控件
         * @return {ecui.ui.Control} ECUI 控件
         */
        createControl = core.create = function (type, params) {
            params = params || {};
            var parent = params.parent,
                baseClass = params.base,
                el = params.element,
                id = params.id,
                typeClass = params.type,
                o,
                i = 0;

            typeClass && typeClass != type || (typeClass = params.type = 'ec-' + type.toLowerCase());
            params.uid = 'ec-' + ++uniqueIndex;

            /* 如果没有指定初始化控件，需要自己生成一个 */
            if (el) {
                /* 如果指定的节点已经初始化，直接返回 */
                if (el.getControl) {
                    return el.getControl();
                }
            }
            else {
                el = createDom();
            }

            addClass(el, typeClass);

            /* 如果没有指定基本样式，使用控件的样式作为基本样式 */
            baseClass ? addClass(el, baseClass) : (baseClass = trim(el.className));
            params.base = baseClass.split(/\s+/)[0];

            /* 生成并注册控件，调用创建控件的处理函数 */
            type = new ui[toCamelCase('-' + type)](el, params);

            /* 指定了父控件的元素都是不需要自动刷新的 */
            if (parent) {
                type.setParent(parent);
            }
            else if (parent = findControl(type.getOuter().parentNode)) {
                parent.onappend && parent.onappend(type) === false || parent.$append(type) === false
                    || type.$setParent(parent);
            }
            allControls.push(type);

            o = params.decorate;
            o && o.replace(/([^(]+)\(([^)]+)\)/g, function ($0, $1, $2) {
                /* 获取装饰器函数 */
                $1 = ext[toCamelCase('-' + trim($1))];

                /* 获取需要调用的装饰器列表 */
                $2 = trim($2).split(/\s+/);
                for (var i = 0; $0 = $2[i++]; ) {
                    new $1(type, $0).paint();
                }
            });

            type.oncreate && type.oncreate(params) === false || type.$create(params);
            if (id) {
                namedControls[id] = type;
            }

            /* 处理所有的关联操作 */
            if (o = connectedControls[id]) {
                for (connectedControls[id] = null; id = o[i++]; ) {
                    id.func.call(id.caller, type);
                }
            }

            return type;
        };

        /**
         * 自定义鼠标点击事件捕获。
         * custom 方法不应该被执行，在某些情况下用于在发生 DOM 的 onmousedown 事件时替代 capture 方法，它仅仅捕获一次鼠标点击操作，但不会影响 ECUI 环境，例如滚动条强制滚动时不能清空上级控件的控制信息。与 custom 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 blank、cancel 与 capture。
         * @public
         */
        custom = core.custom = function () {
            if (capture.call(this)) {
                setEnv(customEnv);
            }
        };

        /**
         * 将指定的 ECUI 控件 设置为拖拽状态。
         * 只有在鼠标左键按下时，才允许调用 drag 方法设置待拖拽的 {'controls'|menu}，在拖拽操作过程中，将依次触发 ondragstart、ondragmove 与 ondragend 事件。range 参数支持的属性如下：
         * top    {number} 控件允许拖拽到的最小Y轴坐标
         * right  {number} 控件允许拖拽到的最大X轴坐标
         * bottom {number} 控件允许拖拽到的最大Y轴坐标
         * left   {number} 控件允许拖拽到的最小X轴坐标
         * @public
         *
         * @param {ecui.ui.Control} control 需要进行拖拽的 ECUI 控件对象
         * @param {Event} event 事件对象
         * @param {Object} range 控件允许拖拽的范围，省略参数时，控件默认只允许在 offsetParent 定义的区域内拖拽，如果 
         *                       offsetParent 是 body，则只允许在当前浏览器可视范围内拖拽
         */
        drag = core.drag = function (control, event, range) {
            if (event.type == 'mousedown') {
                var el = control.getOuter(),
                    parent = el.offsetParent,
                    tagName = parent.tagName;
                    
                copy(dragEnv, tagName == 'BODY' || tagName == 'HTML' ? getView() : {
                    top: 0,
                    right: parent.offsetWidth - sumStyles(parent, 'borderLeftWidth', 'borderRightWidth'),
                    bottom: parent.offsetHeight - sumStyles(parent, 'borderTopWidth', 'borderBottomWidth'),
                    left: 0
                });
                copy(dragEnv, range);
                dragEnv.right = MAX(dragEnv.right - control.getWidth(), dragEnv.left);
                dragEnv.bottom = MAX(dragEnv.bottom - control.getHeight(), dragEnv.top);
                dragEnv.target = control;
                setEnv(dragEnv);

                /* 设置样式为absolute，才能拖拽 */
                el.style.position = 'absolute';

                ieVersion && DOCUMENT.body.setCapture();
                control.ondragstart && control.ondragstart(event) === false || control.$dragstart(event);
            }
        };

        /**
         * 事件对象标准化。
         * event 方法将浏览器产生的鼠标与键盘事件标准化并添加 ECUI 框架需要的信息到事件对象中。标准化的属性如下：
         * pageX           {number} 鼠标的X轴坐标
         * pageY           {number} 鼠标的Y轴坐标
         * which           {number} 触发事件的键盘代码
         * target          {HTMLElement} 触发事件的 Element 对象
         * stopPropagation {Function} 事件停止冒泡
         * preventDefault  {Function} 阻止事件默认的处理
         * getTarget       {Function} 获取事件相关的 ECUI 控件对象
         * @public
         *
         * @param {Event} event 事件对象
         * @return {Event} 标准化后的事件对象
         */
        standardEvent = core.event = function (event) {
            var body = DOCUMENT.body,
                o = body.parentNode;

            if (ieVersion) {
                event = WINDOW.event;
                event.pageX = o.scrollLeft + body.scrollLeft + event.clientX - body.clientLeft - o.clientLeft;
                event.pageY = o.scrollTop + body.scrollTop + event.clientY - body.clientTop - o.clientTop;
                event.target = event.srcElement;
                event.which = event.keyCode;
                event.stopPropagation = stopPropagation;
                event.preventDefault = preventDefault;
            }

            if (targetElement) {
                /* 目标Element被取出来后，清除原来的目标 */
                event._cControl = targetElement.getControl();
                targetElement = null;
            }
            event.getTarget = getTarget;

            mouseX = event.pageX;
            mouseY = event.pageY;

            keyCode = event.which || keyCode;

            return event;
        };

        /**
         * 从指定的 DOM 节点开始，依次向它的父节点查找绑定的 ECUI 控件。
         * findControl 方法，会返回从当前 DOM 节点开始，依次向它的父节点查找到的第一个绑定的 ECUI 控件。findControl 方法一般在控件创建时使用，用于查找父控件对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {ecui.ui.Control} ECUI 控件对象，如果不能找到，返回 null
         */
        findControl = core.findControl = function (el) {
            for (; el && el.nodeType == 1; el = el.parentNode) {
                if (el.getControl) {
                    return el.getControl();
                }
            }

            return null;
        };

        /**
         * 设置框架拦截之后的一次点击，并将点击事件发送给指定的 ECUI 控件。
         * forcibly 方法将下一次的鼠标点击事件转给指定控件的 $forcibly 方法处理，相当于拦截了一次框架的鼠标事件点击操作，框架其它的状态不会自动改变，例如拥有焦点的控件不会改变。如果 $forcibly 方法不返回 false，将自动调用 restore 方法。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        forcibly = core.forcibly = function (control) {
            forciblyEnv.target = control;
            setEnv(forciblyEnv);

            attachEvent(DOCUMENT, 'selectstart', preventDefault);
            attachEvent(DOCUMENT, 'mousedown', preventDefault);
        };

        /**
         * 获取指定名称的 ECUI 控件。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方法)创建的控件，如果在 ecui 属性中指定了 id，就可以通过 get 方法得到控件，也可以在 DOM 对象上使用 getControl 方法。
         * @public
         *
         * @param {string} id ECUI 控件的名称，通过 DOM 节点的 ecui 属性的 id 值定义
         * @return {ecui.ui.Control} 指定名称的 ECUI 控件对象，如果不存在返回 null
         */
        core.get = function (id) {
            if (!namedControls) {
                attachEvent(WINDOW, 'resize', onresize);
                attachEvent(WINDOW, 'unload', onunload);

                /* 接管事件处理 */
                for (o in currEnv) {
                    attachEvent(DOCUMENT, o, currEnv[o]);
                }

                namedControls = {};

                /* 检测Element宽度与高度的计算方式 */
                var body = DOCUMENT.body,
                    o = createDom(
                        '<div style="position:relative;width:8px;padding:2px;border:1px solid">'
                            + '<div style="position:relative;left:0px"></div></div>',
                        body
                    );

                maskElement = createDom(
                    '<div style="position:absolute;top:0px;left:0px;background-color:#000"></div>',
                    body
                );

                isFixedPadding = o.offsetWidth & 4;
                isFixedBorder = o.offsetWidth & 2;
                isFixedOffset = o.firstChild.offsetLeft > 2;
                removeDom(o);

                /* 自动初始化所有节点 */
                core.init(body);
            }
            return namedControls[id] || null;
        };

        /**
         * 获取当前拥有焦点的控件。
         * @public
         *
         * @return {ecui.ui.Control} 当前拥有焦点的 ECUI 控件，如果不存在返回 null
         */
        getFocused = core.getFocused = function () {
            return focusedControl;
        };

        /**
         * 获取最后一次键盘事件的按键值。
         * getKey 方法返回的是最后一次键盘事件的 keyCode/which 值，用于解决浏览器的 keypress 事件中没有特殊按钮(例如方向键等)取值的问题。
         * @public
         *
         * @return {number} 按键的编码
         */
        getKey = core.getKey = function () {
            return keyCode;
        };

        /**
         * 获取当前鼠标光标的页面/相对于控件内部区域的X轴坐标。
         * getMouseX 方法计算相对于控件内部区域的X轴坐标时，按照 Element 盒子模型的标准，需要减去内层 Element 对象的 borderLeftWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的X轴坐标，否则获取鼠标相对于控件内部区域的X轴坐标
         * @return {number} X轴坐标值
         */
        getMouseX = core.getMouseX = function (control) {
            if (control) {
                control = control.getOuter();
                return mouseX - getPosition(control).left + sumStyles(control, 'borderLeftWidth');
            }
            return mouseX;
        };

        /**
         * 获取当前鼠标光标的页面/相对于控件内部区域的Y轴坐标。
         * getMouseY 方法计算相对于控件内部区域的Y轴坐标时，按照 Element 盒子模型的标准，需要减去 内层 Element 对象的 borderTopWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的Y轴坐标，否则获取鼠标相对于控件内部区域的Y轴坐标
         * @return {number} Y轴坐标值
         */
        getMouseY = core.getMouseY = function (control) {
            if (control) {
                control = control.getOuter();
                return mouseY - getPosition(control).top + sumStyles(control, 'borderTopWidth');
            }
            return mouseY;
        };

        /**
         * 获取当前处于按压状态的 ECUI 控件。
         * 控件的按压状态，指的是鼠标在控件上按下，到松开的全过程，之间无论鼠标移动到哪个位置，被按压的控件对象都不会发生改变。
         * @public
         *
         * @return {ecui.ui.Control} 处于按压状态的 ECUI 控件，如果不存在返回 null
         */
        getPressed = core.getPressed = function () {
            return pressedControl;
        };

        /**
         * 初始化指定的 DOM 节点及它的子节点。
         * init 方法将初始化指定的 DOM 节点及它的子节点，如果这些节点拥有初始化属性(ecui)，将按照规则为它们绑定 ECUI 控件，每一个节点只会被绑定一次，重复的绑定无效。页面加载完成时，将会自动针对 document.body 执行这个方法，相当于自动执行以下的语句：ecui.init(document.body)
         * @public
         *
         * @param {Element} el Element 对象
         */
        core.init = function (el) {
            /* 自动初始化控件 */
            for (var i = 0, ec = el.getElementsByTagName('*'), elements = []; el = ec[i]; ) {
                elements[i++] = el;
            }

            for (i = 0; el = elements[i++]; ) {
                if (el.parentNode) {
                    if (ec = el.getAttribute('ecui')) {
                        ec = ec.split(';');

                        for (var params = {}, l = ec.length; l--; ) {
                            var s = ec[l],
                                pos = s.indexOf(':'),
                                name = trim(pos >= 0 ? s.substring(0, pos) : s),
                                value = pos >= 0 ? trim(s.substring(pos + 1)) || 'true' : 'true';

                            params[toCamelCase(trim(name))] =
                                /^\d+(\.\d+)?$/.test(value)
                                    ? value - 0
                                    : value == 'true' ? true : value == 'false' ? false : value;
                        }
                        params.element = el;
                        createControl(params.type, params);
                    }
                }
            }
        };

        /**
         * 使控件失去焦点。
         * 如果控件及它的子控件没有焦点，执行 loseFocus 方法系统的状态将不会产生变化。如果控件或它的子控件拥有焦点，执行 loseFocus 方法后先失去焦点，然后设置控件的父控件获得焦点，父控件不存在时，设置焦点操作无效。如果控件从拥有焦点状态变为了未拥有焦点状态，则触发 onblur 事件，它不完全是 setFocused 方法的逆向行为。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        loseFocus = core.loseFocus = function (control) {
            control.contain(focusedControl) && setFocused(control.getParent());
        };

        /**
         * 使用一个层遮罩整个浏览器可视化区域。
         * 遮罩层的 z-index 样式默认取值为 32767，请不要将 Element 对象的 z-index 样式设置大于 32767。
         * @public
         *
         * @param {number} opacity 透明度，如 0.5，如果省略参数将关闭遮罩层
         * @param {number} zIndex 遮罩层的 zIndex 样式值，如果省略使用 32767
         */
        mask = core.mask = function (opacity, zIndex) {
	    var view = getView(), selects,
                zIndex = zIndex || 32767;

            if ('number' != typeof opacity) {
                if (opacity !== false) {
                    /* opacity === true || opacity === void(0) */
                    opacity || maskStack.pop();
                    opacity = maskStack.length;
                }
                if (!opacity) {
                    /* undefined or opacity === false */
                    maskElement.style.display = 'none';

		    if (ieVersion == 6) { 
			selects = document.getElementsByTagName('select');
			for (var i = 0, select; select = selects[i]; i++) {
			    if (select.getAttribute('hide') == 'true') {
				setStyles(select, {'visibility' : 'visible'});
				select.setAttribute('hide', 'false');
			    }
			}
		    }
                    return;
                }
                opacity = maskStack[opacity - 1];
                zIndex = opacity[1];
                opacity = opacity[0];
            }
            else {
                maskStack.push([opacity, zIndex]);
            }

	    if (ieVersion == 6 && maskStack.length == 1) {
		selects = document.getElementsByTagName('select');
		for (var i = 0, select; select = selects[i]; i++) {
		    if (getStyle(select, 'display') == 'none' || getStyle(select, 'visibility') == 'hidden') {
			continue;
		    }
		    select.setAttribute('hide', 'true');
		    setStyles(select, {'visibility' : 'hidden'});
		}
	    }

            setStyles(maskElement, {
                width: view.width + 'px',
                height: view.height + 'px',
                display: '',
                opacity: opacity,
                zIndex: zIndex
            });
        };

        /**
         * 查询满足条件的控件列表。
         * query 方法允许按多种条件组合查询满足需要的控件，如果省略条件表示不进行限制。condition参数对象支持的属性如下：
         * type   {Function} 控件的类型构造函数
         * parent {ecui.ui.Control} 控件的父控件对象
         * custom {Function} 自定义查询函数，传入的参数是控件对象
         * @public
         *
         * @param {Object} condition 查询条件，如果省略将返回全部的控件
         * @param {Array} 控件列表
         */
        core.query = function (condition) {
            condition = condition || {};

            for (
                var i = 0,
                    result = [],
                    type = condition.type,
                    parent = condition.parent,
                    custom = condition.custom,
                    o;
                o = allControls[i++];
            ) {
                if ((!type || (o instanceof type)) && (!parent || (o.getParent() == parent))
                        && (!custom || custom(o))) {
                    result.push(o);
                }
            }

            return result;
        };

        /**
         * 恢复当前框架的状态到上一个状态。
         * restore 用于恢复调用特殊操作如 custom、drag、forcibly 与 zoom 后改变的框架环境，包括各框架事件处理函数的恢复、控件的焦点设置等。
         * @public
         */
        restore = core.restore = function () {
            setHandler(currEnv, true);
            setHandler(currEnv = envStack.pop());

            detachEvent(DOCUMENT, 'selectstart', preventDefault);
            detachEvent(DOCUMENT, 'mousedown', preventDefault);
        };

        /**
         * 将指定的控件设置为选择状态。
         * select 方法将控件设置为选择，显示选择框并对选择框调用 zoom 方法。调用它会触发控件对象的 onselectstart 事
         * 件，在整个 select 的周期中，还将触发 onselect 与 onselectend 事件，在释放鼠标按键时选择操作周期结束。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {Event} event 事件对象
         * @param {string} className 选择框的样式名称，如果省略将使用 ec-selector
         */
        core.select = function (control, event, className) {
            if (event.type == 'mousedown') {

                if (!selectorControl) {
                    selectorControl = createControl('Control', {
                        element: createDom(
                            '<div style="overflow:hidden"><div class="ec-selector-box"></div></div>',
                            DOCUMENT.body
                        )
                    });
                    selectorControl.$setSize = setSelectorSize;
                    for (var i = 3, list = ['start', '', 'end']; i--; ) {
                        var name = list[i],
                            selectName = 'select' + name;
                        selectorControl['$zoom' + name] = new Function(
                            'e',
                            'var o=this.target;o.on' + selectName + '&&o.on' + selectName + '(e)===false||o.$'
                                + selectName + '(e)'
                        );
                    }
                }

                /* 设置选择框的初始信息 */
                selectorControl.setPosition(mouseX, mouseY);
                selectorControl.setSize(1, 1);
                selectorControl.setClass(className || 'ec-selector'),
                selectorControl.show();
                selectorControl.target = control;

                core.zoom(selectorControl, event);
            }
        };

        /**
         * 使 ECUI 控件 得到焦点。
         * setFocused 方法会将焦点状态设置到指定的控件，允许不指定需要获得焦点的控件，则当前拥有焦点的控件将失去焦点，需要当前获得焦点的控件失去焦点还可以调用 loseFocus 方法。获得焦点的控件触发 onfocus 事件，失去焦点的控件触发 onblur 事件。需要注意的是，如果控件拥有焦点，当通过 setFocused 方法设置它的子控件获得焦点时，虽然焦点对应的控件对象发生了变化，但是控件并不会触发 onblur 方法，此时控件逻辑上仍然处于拥有焦点状态。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        setFocused = core.setFocused = function (control) {
            var parent = getCommonParent(focusedControl, control), tmpControl;

            /* 对不重复的部分进行获得或失去焦点操作 */
            for (tmpControl = focusedControl; tmpControl != parent; tmpControl = tmpControl.getParent()) {
                tmpControl.blur();
            }

            for (focusedControl = control; control != parent; control = control.getParent()) {
                control.focus();
            }
        };

        /**
         * 将指定的 ECUI 控件 设置为缩放状态。
         * zoom 方法将控件设置为缩放，缩放的值允许负数，用于表示反向的缩放，调用它会触发控件对象的 onzoomstart 事件，在整个 zoom 的周期中，还将触发 onzoom 与 onzoomend 事件，在释放鼠标按键时缩放操作周期结束。range 参数支持的属性如下：
         * minWidth  {number} 控件允许缩放的最小宽度 
         * maxWidth  {number} 控件允许缩放的最大宽度 
         * minHeight {number} 控件允许缩放的最小高度 
         * maxHeight {number} 控件允许缩放的最大高度 
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {Event} event 事件对象
         * @param {Object} range 控件允许的缩放范围参数
         */
        core.zoom = function (control, event, range) {
            if (event.type == 'mousedown') {

                control.getOuter().style.position = 'absolute';

                /* 保存现场环境 */
                range && copy(zoomEnv, range);
                copy(zoomEnv, {
                    left: control.getX(),
                    top: control.getY(),
                    width: control.getWidth(),
                    height: control.getHeight()
                });
                zoomEnv.target = control;
                setEnv(zoomEnv);

                ieVersion && DOCUMENT.body.setCapture();
                control.onzoomstart && control.onzoomstart(event) === false || control.$zoomstart(event);
            }
        };

        /**
         * 挂载事件。
         * @private
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        function attachEvent(obj, type, func) {
            obj.attachEvent ? obj.attachEvent('on' + type, func) : obj.addEventListener(type, func, false);
        }

        /**
         * 阻止默认事件。
         * @private
         *
         * @param {Event} event 事件对象
         */
        function preventDefault(event) {
            event.preventDefault();
        }

        /**
         * 卸载事件。
         * @private
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        function detachEvent(obj, type, func) {
            obj.detachEvent ? obj.detachEvent('on' + type, func) : obj.removeEventListener(type, func, false);
        }

        /**
         * 获取两个控件的公共父控件。
         * @private
         *
         * @param {ecui.ui.Control} control1 控件1
         * @param {ecui.ui.Control} control2 控件2
         * @return {ecui.ui.Control} 公共的父控件，如果没有，返回 null
         */
        function getCommonParent(control1, control2) {
            if (control1 != control2) {
                var list1 = [], list2 = [], i = 0;

                /* 向序列中填充父控件 */
                while (control1) {
                    list1.push(control1);
                    control1 = control1.getParent();
                }
                while (control2) {
                    list2.push(control2);
                    control2 = control2.getParent();
                }

                list1.reverse();
                list2.reverse();

                /* 过滤父控件序列中重复的部分 */
                for (; list1[i] == list2[i]; i++);
                control1 = list1[i - 1];
            }

            return control1 || null;
        }

        /**
         * 获取触发事件的控件对象
         * @private
         *
         * @return {ecui.ui.Control} 控件对象
         */
        function getTarget() {
            return this._cControl;
        }

        /**
         * 向父控件序列调用鼠标滚轮处理，直到返回 false 时中止。
         * @private
         *
         * @param {ecui.ui.Control} control 需要接受鼠标滚轮事件的控件
         * @param {Event} event 滚轮事件对象
         */
        function mousewheel(control, event) {
            for (; control; control = control._cParent) {
                if (control.mousewheel(event) === false) {
                    return false;
                }
            }
        }

        /**
         * 窗体改变大小时的事件处理，刷新控件大小。
         * @private
         */
        function onresize() {

            var i = 0,
                o = currEnv.type;



            mask(false);



            if (o != 'zoom') {

                /* 改变窗体大小需要清空拖拽状态 */

                o == 'drag' && currEnv.mouseup();


                for (; o = allControls[i++]; ) {
                    o.getParent() || o.resize();
                }

            }



            ieVersion ? new Timer(mask, 0, null, true) : mask(true);

        }

        /**
         * 页面关闭时释放占用的空间，防止内存泄漏。
         * @private
         */
        function onunload() {
            /* 清除闭包中引用的 Element 对象 */

            targetElement = maskElement = DOCUMENT = null;

            for (var i = 0, o; o = allControls[i++]; ) {
                try {
                    o.dispose();
                }
                catch (e) {
                }
            }
        }

        /**
         * 阻止事件的默认处理。
         * @private
         */
        function preventDefault() {
            this.returnValue = false;
        }

        /**
         * 设置 ecui 环境。
         * @private
         *
         * @param {Object} env 环境描述对象
         */
        function setEnv(env) {
            var o = {};
            setHandler(currEnv, true);

            copy(o, currEnv);
            copy(o, env);
            o.x = mouseX;
            o.y = mouseY;
            setHandler(o);

            envStack.push(currEnv);
            currEnv = o;
        }

        /**
         * 设置document节点上的鼠标事件。
         * @private
         *
         * @param {Object} env 环境描述对象，保存当前的鼠标光标位置与document上的鼠标事件等
         * @param {boolean} remove 如果为true表示需要移除data上的鼠标事件，否则是添加鼠标事件
         */
        function setHandler(env, remove) {
            for (
                var i = 0,
                    list = ['mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup'],
                    func = remove ? detachEvent : attachEvent,
                    o;
                o = list[i++];
            ) {
                env[o] && func(DOCUMENT, o, env[o]);
            }
        }

        /**
         * 设置选择框控件的大小。
         * @private
         *
         * @param {number} width 选择框的宽度
         * @param {number} height 选择框的高度
         */
        function setSelectorSize(width, height) {
            var el = this.getOuter().firstChild,
                style = el.style;

            ui.Control.prototype.$setSize.call(this, width, height);
            style.width = MAX(1, width - calcWidthRevise(el)) + 'px';
            style.height = MAX(1, height - calcHeightRevise(el)) + 'px';
        }

        /**
         * 事件停止冒泡。
         * @private
         */
        function stopPropagation() {
            this.cancelBubble = true;
        }

        core.dom.ready(core.get);

        (function () {


            /*
             * 初始化键盘事件处理函数，相关的事件包括以下3个：
             * keydown  - 键盘按下事件
             * keypress - 键盘按压事件
             * keyup    - 键盘弹起事件
             */
            for (var i = 0, list = ['keydown', 'keypress', 'keyup'], o; o = list[i++]; ) {
                currEnv[o] = new Function(
                    'e',
		    'e=ecui.event(e);for(var o=ecui.getFocused();o;o=o.getParent())if(o.' + o + ' && o.' + o + '(e) === false)return false'
                );
            }

            /**
             * 双击事件处理。
             * @private
             */
            if (ieVersion) {
                currEnv.dblclick = function () {
                    var currTargetElement = targetElement;
                    if (currTargetElement) {
                        /* 模拟控件Element正常的捕获，这个捕获可能是custom或者forcibly */
                        targetElement = null;
                        /* 请注意绑定了ondblclick事件的Element，一定要同步绑定onmousedown */
                        currTargetElement.onmousedown();
                    }
                    /* 模拟一次鼠标点击操作 */
                    currEnv.mousedown();
                    currEnv.mouseup();
                };
            }

            /**
             * 滚轮事件处理。
             * @private
             */
            currEnv[firefoxVersion ? 'DOMMouseScroll' : 'mousewheel'] = function (event) {
                event = standardEvent(event);
                event.wheelDelta || (event.wheelDelta = event.detail * -40);

                /* 拖拽状态下，不允许滚动 */

                if (currEnv.type == 'drag' || mousewheel(overedControl, event) === false
                    || mousewheel(focusedControl, event) === false) {

                    event.preventDefault();
                }
            };

        })();
    })();


/*
Control - ECUI 的核心组成部分，定义了基本的控件行为。
基础控件是 ECUI 的核心组成部分，对 DOM 树上的节点区域进行封装。基础控件扩展了 Element 节点的标准事件(例如得到与失去焦
点、鼠标按压事件等)，提供了方法对控件的基本属性(例如控件大小、位置与显示状态等)进行改变，是一切控件实现的基础。基本控
件支持四种状态：得到焦点(focus)、鼠标移入(over)、按压时鼠标移入(press)与失效(disabled)

基本控件直接HTML初始化的例子，id指定名称，可以通过ecui.get(id)的方式访问控件:
<div ecui="type:control;id:test">
    <!-- 这里控件包含的内容 -->
    ...
</div>

属性
_bEnabled   - 控件的状态，为false时控件不处理任何事件
_nWidth     - 控件的宽度缓存
_nHeight    - 控件的高度缓存
_sUID       - 控件的ID
_sBaseClass - 控件定义时的基本样式
_sClass     - 控件当前使用的样式
_sType      - 控件的类型样式，通常是ec-控件类型
_sWidth     - 控件的基本宽度值，可能是百分比或者空字符串
_sHeight    - 控件的基本高度值，可能是百分比或者空字符串
_sDisplay   - 控件的布局方式，在hide时保存，在show时恢复
_eBase      - 控件的基本标签对象
_eBody      - 控件用于承载子控件的载体标签，通过setBodyElement函数设置这个值，绑定当前控件
_cParent    - 父控件对象
*/


    /**
     * 初始化基础控件。
     * params 参数支持的属性如下：
     * type    控件的类型样式
     * base    控件的基本样式
     * capture 是否需要捕获鼠标事件，默认捕获
     * @protected
     *
     * @param {HTMLElement} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_CONTROL =
        ui.Control = function (el, params) {
            var names = ['mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup', 'click'],
                i = 6,
                o = el.style,
                elementCapture = params.capture !== false ? capture : null;

            this._sUID = params.uid;
            this._sBaseClass = this._sClass = params.base;
            this._sType = params.type;

            /px$/.test(o.width) || (this._sWidth = o.width);
            /px$/.test(o.height) || (this._sHeight = o.height);

            this._eBase = this._eBody = el;
            this._bEnabled = true;

            /* 绑定Element原有的事件函数 */
            while (i--) {
                o = 'on' + names[i];
                this[o] = el[o];
                el[o] = elementCapture;
            }
            this._cParent = el.onclick = null;

            /* 在ie下需要设置ondblclick与onmousedown行为一致，否则会丢失一次单击事件 */
            if (ieVersion) {
                el.ondblclick = el[o];
            }
            $bind(el, this);
        },

        UI_CONTROL_CLASS = UI_CONTROL.prototype;

    /**
     * 为控件增加/删除一个扩展样式。
     * 使用 $alterClass 方法为控件扩展一个样式，会同时增加一至两个样式，即默认样式的扩展与基本样式(如果与默认样式不相同)的扩展，扩展后的样式格式为"默认样式-扩展样式"与"基本样式-扩展样式"，有关基本样式的定义，参见 getClass 与 setClass 方法。
     * @protected
     *
     * @param {string} className 扩展样式的尾缀
     * @param {boolean} isRemoved 为 true 时删除样式，否则新增样式
     */
    UI_CONTROL_CLASS.$alterClass = function (className, isRemoved) {
        this.onalterclassbefore && this.onalterclassbefore(className, isRemoved);

        (isRemoved ? removeClass : addClass)(
            this._eBase,
            this._sClass + '-' + className + ' ' + this._sType + '-' + className
        );

        this.onalterclassend && this.onalterclassend(className, isRemoved);
    };

    /**
     * 控件失去焦点事件的默认处理。
     * 控件失去焦点时默认调用 $blur 方法，删除控件在 $focus 方法中添加的扩展样式 -focus。如果控件处于可操作状态(参见 isEnabled)，blur 方法触发 onblur 事件，如果事件返回值不为 false，则调用 $blur 方法。
     * @protected
     */
    UI_CONTROL_CLASS.$blur = function () {
        this.alterClass('focus', true);
    };

    /**
     * 控件建立完成事件的默认处理。
     * $create 方法在控件被建立后调用，用于某一类控件的公共的初始化操作，默认情况下调用控件自身的 paint 方法绘制控件。
     * @protected
     *
     * @param {Object} params 初始化参数，参见 create 方法
     */
    UI_CONTROL_CLASS.$create = function () {
        this.paint();
    };

    /**
     * 销毁控件的默认处理。
     * 页面卸载时将销毁所有的控件，释放循环引用，防止在 IE 下发生内存泄漏，$dispose 方法的调用不会受到 ondispose 事件返回值的影响。
     * @protected
     */
    UI_CONTROL_CLASS.$dispose = function () {
        this._eBase = this._eBody = null;
    };

    /**
     * 控件获得焦点事件的默认处理。
     * 控件获得焦点时默认调用 $focus 方法，调用 $alterClass 方法为控件添加扩展样式 -focus。如果控件处于可操作状态(参见 isEnabled)，focus 方法触发 onfocus 事件，如果事件返回值不为 false，则调用 $focus 方法。
     * @protected
     */
    UI_CONTROL_CLASS.$focus = function () {
        this.alterClass('focus');
    };

    /**
     * 获取指定的部件。
     * $getSection 方法返回控件的一个部件对象，部件对象也是 ECUI 控件，是当前控件的组成成份，不可缺少，请不要轻易的对部件对象进行操作。
     * @protected
     *
     * @param {string} name 部件名称
     * @return {ecui.ui.Control} 部件对象
     */
    UI_CONTROL_CLASS.$getSection = function (name) {
        return this['_u' + name];
    };

    /**
     * 鼠标移出控件区域事件的默认处理。
     * 鼠标移出控件区域时默认调用 $mouseout 方法，删除控件在 $mouseover 方法中添加的扩展样式 -over。如果控件处于可操作状态(参见 isEnabled)，mouseout 方法触发 onmouseout 事件，如果事件返回值不为 false，则调用 $mouseout 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseout = function () {
        this.alterClass('over', true);
    };

    /**
     * 鼠标移入控件区域事件的默认处理。
     * 鼠标移入控件区域时默认调用 $mouseover 方法，调用 $alterClass 方法为控件添加扩展样式 -over。如果控件处于可操作状态(参见 isEnabled)，mouseover 方法触发 onmouseover 事件，如果事件返回值不为 false，则调用 $mouseover 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseover = function () {
        this.alterClass('over');
    };

    /**
     * 控件按压状态结束或控件按压状态中鼠标移出控件区域事件的默认处理。
     * 鼠标左键按压控件结束或控件按压状态中鼠标移出控件区域时默认调用 $pressend/$pressout 方法，删除控件在 $pressstart/$pressover 方法中添加的扩展样式 -press。如果控件处于可操作状态(参见 isEnabled)，pressend/pressout 方法触发 onpressend/onpressout 事件，如果事件返回值不为 false，则调用 $pressend/$pressout 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CONTROL_CLASS.$pressend = UI_CONTROL_CLASS.$pressout = function () {
        this.alterClass('press', true);
    };

    /**
     * 控件按压状态开始或控件按压状态中鼠标移入控件区域事件的默认处理。
     * 鼠标左键按压控件开始或控件按压状态中鼠标移入控件区域时默认调用 $pressstart/$pressover 方法，调用 $alterClass 方法为控件添加扩展样式 -press。如果控件处于可操作状态(参见 isEnabled)，pressstart/pressover 方法触发 onpressstart/onpressover 事件，如果事件返回值不为 false，则调用 $pressstart/$pressover 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CONTROL_CLASS.$pressover = UI_CONTROL_CLASS.$pressstart = function () {
        this.alterClass('press');
    };

    /**
     * 控件大小发生变化的默认处理。
     * @protected
     */
    UI_CONTROL_CLASS.$resize = function () {
        var el = this.getOuter(),
            base = this._eBase,
            baseWidth = this._sWidth,
            baseHeight = this._sHeight,
            style = base.style;

        if (baseWidth !== undefined) {
            this.clearCache();
            if (baseWidth !== undefined) {
                style.width = baseWidth;
            }
            if (baseHeight !== undefined) {
                style.height = baseHeight;
            }

            var width = this.getWidth(),
                height = this.getHeight();

            if (base != el) {
                /* 如果基本Element与外框Element不同，宽度需要重新计算 */
                var nextSibling = base.nextSibling,
                    parentNode = base.parentNode;

                if (ieVersion) {
                    absWidth = /px$/.test(getStyle(base, 'width'));
                    absHeight = /px$/.test(getStyle(base, 'height'));
                }
                else {
                    var absWidth = base.offsetWidth,
                        absHeight = base.offsetHeight,
                        style = parentNode.style;
                    style.width = absWidth + 100 + 'px';
                    style.height = absHeight + 100 + 'px';

                    absWidth = absWidth == base.offsetWidth;
                    absHeight = absHeight == base.offsetHeight;
                }

                el.parentNode.appendChild(base);

                if (baseWidth !== undefined && !absWidth) {
                    width = this._nWidth = base.offsetWidth;
                }
                if (baseHeight !== undefined && !absHeight) {
                    height = this._nHeight = base.offsetHeight;
                }

                parentNode.insertBefore(base, nextSibling);
            }

            this.$setSize(width, height);
        }
    };

    /**
     * 设置控件内层的 Element 对象。
     * ECUI 的控件逻辑上分为外层 Element 对象、基本 Element 对象与内层 Element 对象，外层对象用于控制控件自身布局，基本对象是控件生成时捆绑的 Element 对象，而内层对象用于控制控件对象的子控件与文本布局，通常情形下三者是同一个 Element 对象。
     * @protected
     *
     * @param {HTMLElement} el Element 对象
     */
    UI_CONTROL_CLASS.$setBody = function (el) {
        this._eBody = el;
    };

    /**
     * 设置控件内层 Element 对象的 innerHTML 属性。
     * @public
     *
     * @param {string} innerHTML HTML 片断
     */
    UI_CONTROL_CLASS.$setBodyHTML = function (innerHTML) {
        this._eBody.innerHTML = innerHTML;
    };

    /**
     * 直接设置父控件。
     * 与 setParent 方法最大的不同，$setParent 方法仅设置控件对象逻辑上的父对象，不进行任何逻辑上的检查，用于某些特殊情况下的设定，如下拉框控件中的选项框子控件需要使用 $setParent 方法设置它的逻辑父控件为下拉框控件。
     * @protected
     *
     * @param {ecui.ui.Control} parent ECUI 控件对象
     */
    UI_CONTROL_CLASS.$setParent = function (parent) {
        this._cParent = parent;
    };

    /**
     * 设置控件的大小。
     * $setSize 方法设置控件实际的大小，不改变其它的如缓存等信息。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_CONTROL_CLASS.$setSize = function (width, height) {
        var el = this._eBase,
            style = el.style;

        if (width) {
            style.width = width - calcWidthRevise(el) + 'px';
            this._nWidth = width;
        }

        if (height) {
            style.height = height - calcHeightRevise(el) + 'px';
            this._nHeight = height;
        }
    };

    /**
     * 为控件增加/删除一个扩展样式。
     * alterClass 是 $alterClass 方法面向应用程序的接口，执行后会调用 clearCache 方法清空控件属性的缓存。
     * @public
     *
     * @param {string} className 扩展样式的尾缀
     * @param {boolean} isRemoved 为 true 时删除样式，否则新增样式
     */
    UI_CONTROL_CLASS.alterClass = function (className, isRemoved) {
        this.$alterClass(className, isRemoved);
        this.clearCache();
    };

    /**
     * 清除控件的缓存。
     * 控件缓存部分核心属性的值，提高控件属性的访问速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法(setSize、alterClass 等)直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @public
     */
    UI_CONTROL_CLASS.clearCache = function () {
        this._nWidth = this._nHeight = undefined;
    };

    /**
     * 判断当前控件是否包含指定的控件。
     * contain 方法判断指定的控件是否逻辑上属于当前控件的内部区域，即通过反复调用控件的 getParent 方法是否能得到当前控件。
     * @public
     *
     * @param {ecui.ui.Control} control ECUI 控件
     * @return {boolean} 是否包含指定的控件
     */
    UI_CONTROL_CLASS.contain = function (control) {
        for (; control; control = control._cParent) {
            if (control == this) {
                return true;
            }
        }
    };

    /**
     * 销毁控件。
     * dispose 方法触发 ondispose 事件，然后调用 $dispose 方法，dispose 方法在页面卸载时会被自动调用，通常不需要直接调用。
     * @public
     */
    UI_CONTROL_CLASS.dispose = function () {
        try {
            this.ondispose && this.ondispose();
        }
        catch (e) {
        }
        this.$dispose();
    };

    /**
     * 获取控件的基本 Element 对象。
     * getBase 方法返回控件生成时捆绑的 Element 对象，参见 create 方法。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getBase = function () {
        return this._eBase;
    };

    /**
     * 获取控件的基本样式。
     * getBaseClass 方法返回控件生成时捆绑的样式，参见 create 方法。与调用 getClass 方法返回当前样式的区别在于，基本样式不会改变，而当前样式允许通过 setClass 方法来设置。
     * @public
     *
     * @return {string} 控件的基本样式
     */
    UI_CONTROL_CLASS.getBaseClass = function () {
        return this._sBaseClass;
    };

    /**
     * 获取控件内层的 Element 对象。
     * getBody 方法返回用于控制子控件与文本布局的内层 Element 对象。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getBody = function () {
        return this._eBody;
    };

    /**
     * 获取控件内层可使用区域的高度。
     * getBodyHeight 方法返回能被子控件与文本填充的控件区域高度，相当于盒子模型的 content 区域的高度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyHeight = function () {
        return this.getHeight() - this.getHeightRevise();
    };

    /**
     * 获取控件内层可使用区域的宽度。
     * getBodyWidth 方法返回能被子控件与文本填充的控件区域宽度，相当于盒子模型的 content 区域的宽度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyWidth = function () {
        return this.getWidth() - this.getWidthRevise();
    };

    /**
     * 获取控件的当前样式。
     * getClass 方法返回控件当前使用的样式，在调用 alterClass 方法时，当前样式与默认样式会被添加样式后缀，从而实现控件状态的样式变更。与调用 getBaseClass 方法返回基本样式的区别在于，基本样式不会改变，而当前样式允许通过 setClass 方法来设置。
     * @public
     *
     * @return {string} 控件的当前样式
     */
    UI_CONTROL_CLASS.getClass = function () {
        return this._sClass;
    };

    /**
     * 获取控件区域的高度。
     * @public
     *
     * @return {number} 控件的高度
     */
    UI_CONTROL_CLASS.getHeight = function () {
        var el = this._eBase;
        return this._nHeight = this._nHeight || el.offsetHeight || sumStyles(el, 'height') + calcHeightRevise(el);
    };

    /**
     * 获取控件高度与控件可用区域高度的差值。
     * @public
     *
     * @return {number} 控件内外区域的高度差值
     */
    UI_CONTROL_CLASS.getHeightRevise = function () {
        return getInvalidHeight(this._eBase);
    };

    /**
     * 获取控件外层的 Element 对象。
     * getOuter 方法返回用于控制控件自身布局的外层 Element 对象。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getOuter = function () {
        return this._eBase;
    };

    /**
     * 获取父控件。
     * @public
     *
     * @return {ecui.ui.Control} 父控件对象
     */
    UI_CONTROL_CLASS.getParent = function () {
        return this._cParent;
    };

    /**
     * 获取控件的默认样式。
     * 控件的默认样式也称为控件的类型样式，在调用 alterClass 方法时，默认样式与当前样式会被添加样式后缀，从而实现控件状态的样式变更。在调用 create 方法时指定，参见 getClass 与 getBaseClass 方法。
     * @public
     *
     * @return {string} 控件的默认样式
     */
    UI_CONTROL_CLASS.getType = function () {
        return this._sType;
    };

    /**
     * 获取控件的内部唯一标识符。
     * getUID 方法返回的 ID 不是标签 eui 属性中指定的 id，而是框架为每个控件生成的内部唯一标识符。
     * @public
     *
     * @return {string} 控件 ID
     */
    UI_CONTROL_CLASS.getUID = function () {
        return this._sUID;
    };

    /**
     * 获取控件区域的宽度。
     * @public
     *
     * @return {number} 控件的宽度
     */
    UI_CONTROL_CLASS.getWidth = function () {
        var el = this._eBase;
        return this._nWidth = this._nWidth || el.offsetWidth || sumStyles(el, 'width') + calcWidthRevise(el);
    };

    /**
     * 获取控件宽度与控件可用区域宽度的差值。
     * @public
     *
     * @return {number} 控件内外区域的宽度差值
     */
    UI_CONTROL_CLASS.getWidthRevise = function () {
        return getInvalidWidth(this._eBase);
    };

    /**
     * 获取控件的相对X轴坐标。
     * getX 方法返回控件的外层 Element 对象的 offsetLeft 属性值。如果需要得到控件相对于整个文档的X轴坐标，请调用 getOuter 方法获得外层 Element 对象，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} X轴坐标
     */
    UI_CONTROL_CLASS.getX = function () {
        var el = this.getOuter(),
            value = getStyle(el, 'left');
        return this.isShow() ? /px$/.test(value) ? PARSEINT(value) : el.offsetLeft - core.calcLeftRevise(el) : 0;
    };

    /**
     * 获取控件的相对Y轴坐标。
     * getY 方法返回控件的外层 Element 对象的 offsetTop 属性值。如果需要得到控件相对于整个文档的X轴坐标，请调用 getOuter 方法获得外层 Element 对象，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} Y轴坐标
     */
    UI_CONTROL_CLASS.getY = function () {
        var el = this.getOuter(),
            value = getStyle(el, 'top');
        return this.isShow() ? /px$/.test(value) ? PARSEINT(value) : el.offsetTop - core.calcTopRevise(el) : 0;
    };

    /**
     * 隐藏控件。
     * 如果控件处于显示状态，调用 hide 方法会触发 onhide 事件，控件转为隐藏状态，并且控件会自动失去焦点。如果控件已经处于隐藏状态，则不执行任何操作。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_CONTROL_CLASS.hide = function () {
        var el = this.getOuter(),
            style = el.style,
            result = this.isShow();
        if (result) {
            /* 保存控件原来的 display 值，在显示时使用 */
            this._sDisplay = style.display;
            style.display = 'none';
            this.onhide && this.onhide();
            /* 如果控件拥有焦点，设置成隐藏状态时需要失去焦点 */
            loseFocus(this);
        }
        return result;
    };

    /**
     * 判断控件是否处于可操作状态。
     * 控件是否处于可操作状态，影响控件是否处理事件，控件的可操作状态，受父控件的可操作状态影响。可以通过 setEnabled 方法改变控件的可操作状态，如果控件设置为不可操作，它所有的子控件也都不可操作。
     * @public
     *
     * @return {boolean} 控件是否可操作
     */
    UI_CONTROL_CLASS.isEnabled = function () {
        var parent = this._cParent;
        /* 当控件处于可操作状态时，查询父控件是否可用 */
        return this._bEnabled && (!parent || parent.isEnabled());
    };

    /**
     * 判断控件是否处于显示状态。
     * @public
     *
     * @return {boolean} 控件是否显示
     */
    UI_CONTROL_CLASS.isShow = function () {
        var el = this.getOuter();
        return getStyle(el, 'display') != 'none' && !!el.offsetWidth;
    };

    /**
     * 控件刷新。
     * paint 方法将导致控件整体重绘，在通常情况下，建议控件改变的状态进行重绘，而不是调用 paint 方法。
     * @public
     */
    UI_CONTROL_CLASS.paint = function () {
        this.$setSize(this.getWidth(), this.getHeight());
    };

    /**
     * 设置控件内层可使用区域的大小。
     * 可使用区域的大小，与 getWidth、getHeight、getWidthRevise、getHeightRevise 四个方法有关。
     * @public
     *
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    UI_CONTROL_CLASS.setBodySize = function (width, height) {
        this.setSize(width && width + this.getWidthRevise(), height && height + this.getHeightRevise());
    };

    /**
     * 设置控件的当前样式。
     * setClass 方法设置控件当前使用的样式，在调用 alterClass 方法时，当前样式与默认样式会被添加样式后缀，从而实现控件状态的样式变更。控件的当前样式通过 getClass 方法获取。请注意，使用 setClass 方法不会改变控件部件的基本样式。
     * @public
     *
     * @param {string} currClass 控件的当前样式
     */
    UI_CONTROL_CLASS.setClass = function (currClass) {
        var el = this._eBase,
            classes = [],
            i = 0,
            defaultClass = this._sType,
            oldClass = this._sClass;

        currClass = currClass || defaultClass;

        /* 如果基本样式没有改变不需要执行 */
        if (currClass != oldClass) {

            el.className.replace(new RegExp('(^|\\s)' + oldClass + '(-[^\\s]+)', 'g'), function ($0, $1, $2) {
                classes.push(defaultClass + $2);
                defaultClass != currClass && classes.push(currClass + $2);
            });

            /* 必须拥有缺省样式 */
            classes.push(defaultClass);
            defaultClass != currClass && classes.push(currClass);

            el.className = classes.join(' ');
            this._sClass = currClass;
        }
    },

    /**
     * 设置控件的可操作状态。
     * 如果控件设置为不可操作，调用 $alterClass 方法为控件添加扩展样式 -disabled，同时自动失去焦点；如果设置为可操作，移除控件的扩展样式 -disabled。setEnabled 方法只是设置控件自身的可操作状态，然后控件设置为可操作，并不代表调用 isEnabled 方法返回的值一定是 true，控件的可操作状态还受到父控件的可操作状态的影响。
     * @public
     *
     * @param {boolean} status 控件是否可操作，默认为 true
     */
    UI_CONTROL_CLASS.setEnabled = function (status) {
        status = status !== false;

        /* 检查与控件当前状态是否一致 */
        if (this._bEnabled != status) {
            this.alterClass('disabled', status);
            /* 如果控件拥有焦点，设置成不可用状态时需要失去焦点 */
            status || loseFocus(this);
            this._bEnabled = status;
        }
    };

    /**
     * 设置当前控件的父控件。
     * setParent 方法设置父控件，参数是父控件对象时，将当前控件挂接到父控件对象的内层 Element 对象下，如果参数是父 Element 对象，将当前控件挂接到这个 Element 对象上并使用 findControl 查找父控件对象。调用 setParent 方法设置父控件，如果在设置父控件之前已经存在父控件，会触发原父控件的 onremove 事件并解除控件与原父控件的关联，新的父控件如果存在，会触发父控件的 onappend 事件，如果事件返回 false，表示父控件不允许当前控件作为它的子控件，设置失败，相当于忽略 parent 参数。
     * @public
     *
     * @param {ecui.ui.Control|HTMLElement} parent 父控件对象/父 Element 对象，忽略参数则将控件移出 DOM 树
     */
    UI_CONTROL_CLASS.setParent = function (parent) {
        var oldParent = this._cParent,
            el = this.getOuter(),
            parentNode;

        /* 识别父对象类型 */
        if (parent) {
            if (parent instanceof UI_CONTROL) {
                parentNode = parent._eBody;
            }
            else {
                parentNode = parent;
                parent = findControl(parent);
            }
        }

        /* 触发原来父控件的移除子控件事件 */
        if (parent != oldParent) {
            if (oldParent) {
                oldParent.onremove && oldParent.onremove(this);
                oldParent.$remove(this);
            }
            if (parent) {
                if (parent.onappend && parent.onappend(this) === false || parent.$append(this) === false) {
                    parent = parentNode = null;
                }
            }
        }

        parentNode ? parentNode.appendChild(el) : removeDom(el);
        this._cParent = parent;
        this.clearCache();
    };

    /**
     * 设置控件的坐标。
     * setPosition 方法设置的是控件的 left 与 top 样式，受到 position 样式的影响。
     * @public
     *
     * @param {number} x 控件的X轴坐标
     * @param {number} y 控件的Y轴坐标
     */
    UI_CONTROL_CLASS.setPosition = function (x, y) {
        var style = this.getOuter().style;
        style.left = x + 'px';
        style.top = y + 'px';
    };

    /**
     * 设置控件的大小。
     * @public
     *
     * @param {number} width 控件的宽度
     * @param {number} height 控件的高度
     */
    UI_CONTROL_CLASS.setSize = function (width, height) {
        if (width && width != this.getWidth() || height && height != this.getHeight()) {
            this.$setSize(width, height);
        }

        if (width) {
            this._sWidth = undefined;
        }
        if (height) {
            this._sHeight = undefined;
        }
    };

    /**
     * 显示控件。
     * 如果控件处于隐藏状态，调用 show 方法会触发 onshow 事件，控件转为显示状态。如果控件已经处于显示状态，则不执行任何操作。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_CONTROL_CLASS.show = function () {
        var result = !this.isShow();
        if (result) {
            this.getOuter().style.display = this._sDisplay || '';
            this.onshow && this.onshow();
        }
        return result;
    };

    (function () {

        /*
         * 初始化事件处理函数，以事件名命名，这些函数行为均是判断控件是否可操作/是否需要调用事件/是否需要执行缺省的事
         * 件处理，对应的缺省事件处理函数名以$开头后接事件名，处理函数以及缺省事件处理函数参数均为事件对象，仅执行一
         * 次。
         */
        for (var i = 0, list = [
            'focus', 'blur', 'click',

            'keydown', 'keypress', 'keyup',


            'mousewheel',

            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'pressstart', 'pressover', 'pressmove', 'pressout', 'pressend',
            'change', 'resize'
        ], o; o = list[i++]; ) {
            UI_CONTROL_CLASS[o] = new Function(
                'e',
                'var o=this;if(' + (i < list.length - 2 ? 'o.isEnabled()&&' : '')
                    + '(o.on' + o + '&&o.on' + o + '(e)===false||o.$' + o + '(e)===false))return false'
            );
            UI_CONTROL_CLASS['$' + o] = UI_CONTROL_CLASS['$' + o] || blank;
        }

        /* 初始化空操作的一些缺省处理 */
        UI_CONTROL_CLASS.$forcibly = UI_CONTROL_CLASS.$append = UI_CONTROL_CLASS.$remove

            = UI_CONTROL_CLASS.$selectstart = UI_CONTROL_CLASS.$select = UI_CONTROL_CLASS.$selectend


            = UI_CONTROL_CLASS.$zoomstart = UI_CONTROL_CLASS.$zoom = UI_CONTROL_CLASS.$zoomend


            = UI_CONTROL_CLASS.$dragstart = UI_CONTROL_CLASS.$dragmove = UI_CONTROL_CLASS.$dragend

            = blank;
    })();

/*
Scroll - 定义在一个区间轴内移动的基本操作。
滚动条控件，继承自基础控件，滚动条控件，内部包含三个部件，分别是向前(滚动条的当前值变小)滚动按钮(基础控件)、向后(滚动
条的当前值变大)滚动按钮(基础控件)与滑动块(基础控件)。滚动条控件是滚动行为的虚拟实现，不允许直接初始化，它的子类通常情
况下也不会被直接初始化，而是作为控件的一部分用于控制父控件的行为。

属性
_nTotal  - 滚动条区域允许设置的最大值
_nStep   - 滚动条移动一次时的基本步长
_nValue  - 滚动条当前设置的值
_oTimer  - 定时器的句柄，用于连续滚动处理
_fAction - 当前正在执行的动作函数，用于连续滚动的控制
_uPrev   - 向前滚动按钮
_uNext   - 向后滚动按钮
_uBlock  - 滑动块

向前/向后滚动按钮属性
_fAction - 向前/向后滚动函数

滑动块属性
setRange - 设置滑动块的合法滑动区间
_oRange  - 滑动块的合法滑动区间
*/



    /**
     * 初始化滚动条控件
     * @protected
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_SCROLL =
        ui.Scroll = function (el, params) {
            var i = 0,
                list = ['Prev', 'Next'],
                baseClass = params.base,
                typeClass = params.type,
                o;

            UI_CONTROL.call(this, el, params);
            coordinates(this.getBody());

            /* 创建向前与向后滚动按钮 */
            for (; o = list[i++]; ) {
                params = o.toLowerCase();
                o = this['_u' + o] = createControl(
                    'Control',
                    {
                        base: baseClass + '-' + params,
                        parent: this,
                        type: typeClass + '-' + params
                    }
                );

                o._fAction = params == 'prev' ? UI_SCROLL_PREV : UI_SCROLL_NEXT;
                copy(o, UI_SCROLL_BUTTON);
                o.getBase().onmousedown = custom;

                params = o.getOuter().style;
                params.position = 'absolute';
                params.top = params.left = '0px';
            }

            /* 创建滑动块 */
            o = this._uBlock = createControl(
                'Control',
                {
                    base: baseClass + '-block',
                    parent: this,
                    type: typeClass + '-block'
                }
            );
            copy(o, UI_SCROLL_BLOCK);
            o.$dragend = UI_SCROLL_STOP;
            o.getBase().onmousedown = custom;
            o.getOuter().style.position = 'absolute';

            /* 初始化滚动条控件 */
            this._nValue = this._nTotal = 0;
            this._nStep = 1;
            el.onmousedown = custom;

            /* 屏蔽IE下的选中操作 */
            el.onselectstart = cancel;
        },

        UI_SCROLL_BLOCK = {},
        UI_SCROLL_BUTTON = {},
        UI_SCROLL_CLASS = inherits(UI_SCROLL, UI_CONTROL),

        /**
         * 初始化垂直滚动条控件。
         * @public
         *
         * @param {Element} el 关联的 Element 对象
         * @param {Object} params 初始化参数
         */
        UI_VSCROLL = ui.VScroll = function (el, params) {
            UI_SCROLL.call(this, el, params);
        },

        UI_VSCROLL_CLASS = inherits(UI_VSCROLL, UI_SCROLL),

        /**
         * 初始化水平滚动条控件。
         * @public
         *
         * @param {Element} el 关联的 Element 对象
         * @param {Object} params 初始化参数
         */
        UI_HSCROLL = ui.HScroll = function (el, params) {
            UI_SCROLL.call(this, el, params);
        },

        UI_HSCROLL_CLASS = inherits(UI_HSCROLL, UI_SCROLL);

    /**
     * 控件自动向后滚动，响应在 200ms 后触发，直至当前值为最大值或其它原因停止
     * @private
     *
     * @param {number} step 每次向前滚动的步长
     */
    function UI_SCROLL_NEXT(step) {
        var value = this._nValue;
        UI_SCROLL_STOP(this);
        if (value < this._nTotal) {
            this.$allowNext() && this.setValue(value + step);
            this._oTimer = new Timer(UI_SCROLL_NEXT, 200, this, step);
        }
    }

    /**
     * 控扭按压事件处理
     * @private
     *
     * @param {ecui.ui.Scroll} control 滚动条对象
     * @param {Event} event 事件对象
     */
    function UI_SCROLL_BUTTONPRESS(control, event) {
        var parent = control.getParent();
        parent.focus();
        control._fAction.call(parent, MAX(parent._nStep, 5));

        /* 屏蔽普通W3C兼容的浏览器的选择操作 */
        event.preventDefault();
    }

    /**
     * 控件自动向前滚动，响应在 200ms 后触发，直至当前值为0或其它原因停止
     * @private
     *
     * @param {number} step 每次向前滚动的步长
     */
    function UI_SCROLL_PREV(step) {
        var value = this._nValue;
        UI_SCROLL_STOP(this);
        if (value) {
            this.$allowPrev() && this.setValue(value - step);
            this._oTimer = new Timer(UI_SCROLL_PREV, 200, this, step);
        }
    }

    /**
     * 停止 prev 或 next 函数的自动滚动
     * @private
     *
     * @param {ecui.ui.Scroll} control 滚动条对象
     */
    function UI_SCROLL_STOP(control) {
        var timer = control._oTimer;
        timer && timer.stop();
    }

    /**
     * 滑动块拖拽移动事件的默认处理。
     * @private
     *
     * @param {Event} event 事件对象
     * @param {number} x 滑动块实际到达的X轴坐标
     * @param {number} y 滑动块实际到达的Y轴坐标
     */
    UI_SCROLL_BLOCK.$dragmove = function (event, x, y) {
        var parent = this.getParent(),
            value = parent.$calcDragValue(x, y);

        /* 应该滚动step的整倍数 */
        parent.$setValue(value == parent._nTotal ? value : value - value % parent._nStep);
        parent.scroll();
    };

    /**
     * 鼠标在滑动块区域内按下事件的默认处理，触发滑动块拖动功能。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_BLOCK.$mousedown = function (event) {
        UI_CONTROL_CLASS.$mousedown.call(this, event);

        this.getParent().focus();
        drag(this, event, this._oRange);

        /* 屏蔽普通W3C兼容的浏览器的选择操作 */
        event.preventDefault();
    };

    /**
     * 设置滑动块的合法拖拽区间。
     * @private
     *
     * @param {number} top 允许拖拽的最上部区域
     * @param {number} right 允许拖拽的最右部区域
     * @param {number} bottom 允许拖拽的最下部区域
     * @param {number} left 允许拖拽的最左部区域
     */
    UI_SCROLL_BLOCK.setRange = function (top, right, bottom, left) {
        this._oRange = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
    };

    /**
     * 控扭控件按压状态结束事件的默认处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_BUTTON.$pressend = function (event) {
        UI_SCROLL_STOP(this.getParent());
        UI_CONTROL_CLASS.$pressend.call(this, event);
    };

    /**
     * 控扭控件按压状态中鼠标移出控件区域事件的默认处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_BUTTON.$pressout = function (event) {
        UI_SCROLL_STOP(this.getParent());
        UI_CONTROL_CLASS.$pressout.call(this, event);
    };

    /**
     * 控扭控件按压状态中鼠标移入控件区域事件的默认处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_BUTTON.$pressover = function (event) {
        UI_SCROLL_BUTTONPRESS(this, event);
        UI_CONTROL_CLASS.$pressover.call(this, event);
    };

    /**
     * 控扭控件按压状态开始事件的默认处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_BUTTON.$pressstart = function (event) {
        UI_SCROLL_BUTTONPRESS(this, event);
        UI_CONTROL_CLASS.$pressstart.call(this, event);
    };

    /**
     * 控件建立完成事件的默认处理。
     * 滚动条控件建立完成后不进行任何处理。
     * @protected
     *
     * @param {Object} params 初始化参数，参见 create 方法
     */
    UI_SCROLL_CLASS.$create = blank;

    /**
     * 控件按压状态结束事件的默认处理。
     * 鼠标左键按压控件结束时停止自动滚动，恢复控件状态。如果控件处于可操作状态(参见 isEnabled)，pressend 方法触发 onpressend 事件，如果事件返回值不为 false，则调用 $pressend 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_CLASS.$pressend = function (event) {
        UI_SCROLL_STOP(this);
        UI_CONTROL_CLASS.$pressend.call(this, event);
    };

    /**
     * 控件按压状态中鼠标移出控件区域事件的默认处理。
     * 控件按压状态中鼠标移出控件区域时停止自动滚动，恢复控件状态。如果控件处于可操作状态(参见 isEnabled)，pressout 方法触发 onpressout 事件，如果事件返回值不为 false，则调用 $pressout 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_CLASS.$pressout = function (event) {
        UI_SCROLL_STOP(this);
        UI_CONTROL_CLASS.$pressout.call(this, event);
    };

    /**
     * 控件按压状态中鼠标移入控件区域事件的默认处理。
     * 控件按压状态中鼠标移入控件区域开始自动滚动。如果控件处于可操作状态(参见 isEnabled)，pressover 方法触发 onpressover 事件，如果事件返回值不为 false，则调用 $pressover 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_CLASS.$pressover = function (event) {
        this._fAction(this.$getPageStep());
        UI_CONTROL_CLASS.$pressover.call(this, event);
    };

    /**
     * 控件按压状态开始事件的默认处理。
     * 鼠标左键按压控件开始时计算自动滚动的方向，并开始自动滚动。如果控件处于可操作状态(参见 isEnabled)，pressstart 方法触发 onpressstart 事件，如果事件返回值不为 false，则调用 $pressstart 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SCROLL_CLASS.$pressstart = function (event) {
        (this._fAction = this.$allowPrev() ? UI_SCROLL_PREV : UI_SCROLL_NEXT).call(this, this.$getPageStep());
        this.focus();
        UI_CONTROL_CLASS.$pressstart.call(this, event);

        /* 屏蔽普通W3C兼容的浏览器的选择操作 */
        event.preventDefault();
    };

    /**
     * 直接设置控件的当前值。
     * $setValue 仅仅设置控件的参数值，不进行合法性验证，也不改变滑动块的位置信息，用于滑动块滚动时同步设置当前值。
     * @protected
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLL_CLASS.$setValue = function (value) {
        this._nValue = value;
    };

    /**
     * 父控件获取焦点。
     * 在父控件没有焦点时，focus 方法将焦点设置到父控件上。如果控件处于可操作状态(参见 isEnabled)，focus 方法触发 onfocus 事件，如果事件返回值不为 false，则调用 $focus 方法。
     * @public
     */
    UI_SCROLL_CLASS.focus = function () {
        var parent = this.getParent();
        parent && !parent.contain(getFocused()) && setFocused(parent);
    };

    /**
     * 获取滚动条控件的单次滚动距离。
     * getStep 方法返回滚动条控件发生滚动时，移动的最小步长值，通过 setStep 设置。
     * @public
     *
     * @return {number} 单次滚动距离
     */
    UI_SCROLL_CLASS.getStep = function () {
        return this._nStep;
    };

    /**
     * 获取滚动条控件的最大值。
     * getTotal 方法返回滚动条控件允许滚动的最大值，最大值、当前值与滑动块控件的实际位置互相影响，通过 setTotal 设置。
     * @public
     *
     * @return {number} 控件的最大值
     */
    UI_SCROLL_CLASS.getTotal = function () {
        return this._nTotal;
    };

    /**
     * 获取滚动条控件的当前值。
     * getValue 方法返回滚动条控件的当前值，最大值、当前值与滑动块控件的实际位置互相影响，但是当前值不允许超过最大值，通过 setValue 方法设置。
     * @public
     *
     * @return {number} 滚动条控件的当前值
     */
    UI_SCROLL_CLASS.getValue = function () {
        return this._nValue;
    };

    /**
     * 隐藏控件。
     * 隐藏滚动条控件时，滚动条控件的当前值需要复位为0，参见 setValue 与 setTotal 方法。
     * @public
     */
    UI_SCROLL_CLASS.hide = function () {
        this.setValue(0);
        return UI_CONTROL_CLASS.hide.call(this);
    };

    /**
     * 滚动条滚动。
     * scroll 方法首先调用 change 方法，之后触发父控件的 onscroll 事件，如果事件返回值不为 false，则调用父控件的 $scroll 方法。
     * @public
     */
    UI_SCROLL_CLASS.scroll = function () {
        var parent = this.getParent();
        this.change();
        parent && (parent.onscroll && parent.onscroll(this) === false || parent.$scroll(this));
    };

    /**
     * 设置滚动条控件的单次滚动距离。
     * setStep 方法设置的值必须大于0，否则不会进行操作。
     * @public
     *
     * @param {number} value 单次滚动距离
     */
    UI_SCROLL_CLASS.setStep = function (value) {
        if (value > 0) {
            this._nStep = value;
        }
    };

    /**
     * 设置滚动条控件的最大值。
     * setTotal 方法设置的值不能为负数，并且当前值如果大于最大值，将改变当前值，并调用 scroll 方法，最大值发生改变将导致滚动条控件刷新。
     * @public
     *
     * @param {number} value 控件的最大值
     */
    UI_SCROLL_CLASS.setTotal = function (value) {
        if (value >= 0 && this._nTotal != value) {
            this._nTotal = value;
            /* 检查滚动条控件的当前值是否已经越界 */
            if (this._nValue > value) {
                /* 值发生改变时触发相应的事件 */
                this._nValue = value;
                this.scroll();
            }
            this.$flush();
        }
    };

    /**
     * 设置滚动条控件的当前值。
     * setValue 方法设置的值不能为负数，也不允许超过使用 setTotal 方法设置的控件的最大值，如果当前值不合法，将自动设置为最接近合法值的数值，如果当前值发生改变将导致滚动条控件刷新，并调用 scroll 方法。
     * @public
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLL_CLASS.setValue = function (value) {
        value = MAX(MIN(value, this._nTotal), 0);
        if (this._nValue != value) {
            /* 值发生改变时触发相应的事件 */
            this._nValue = value;
            this.scroll();
            this.$flush();
        }
    };

    /**
     * 滚动条控件当前值移动指定的步长次数。
     * 参数 value 必须是整数, 正数则向最大值方向移动，负数则向0方向移动，允许移动的区间在0-最大值之间，参见 setStep、setTotal 与 setValue 方法。
     * @public
     *
     * @param {number} n 移动的步长次数
     */
    UI_SCROLL_CLASS.skip = function (n) {
        this.setValue(this._nValue + n * this._nStep);
    };

    /**
     * 判断是否允许当前值向最大值方向移动。
     * 受当前鼠标位置的影响，在当前值向最大值方向移动的过程中需要先判断移动是否得到许可。
     * @protected
     *
     * @return {boolean} 是否允许向最大值方向移动
     */
    UI_VSCROLL_CLASS.$allowNext = function () {
        var block = this._uBlock;
        return getMouseY(this) > block.getY() + block.getHeight();
    };

    /**
     * 判断是否允许当前值向0方向移动。
     * 受当前鼠标位置的影响，在当前值向0方向移动的过程中需要先判断移动是否得到许可。
     * @protected
     *
     * @return {boolean} 是否允许向0方向移动
     */
    UI_VSCROLL_CLASS.$allowPrev = function () {
        return getMouseY(this) < this._uBlock.getY();
    };

    /**
     * 计算滑动块拖拽时滚动条的当前值。
     * 虚方法，继承自滚动条控件的控件必须实现。
     * @protected
     *
     * @param {number} x 滑动块实际到达的X轴坐标
     * @param {number} y 滑动块实际到达的Y轴坐标
     */
    UI_VSCROLL_CLASS.$calcDragValue = function (x, y) {
        var block = this._uBlock,
            range = block._oRange;
        return (y - range.top) / (range.bottom - this._uPrev.getHeight() - block.getHeight()) * this._nTotal;
    };

    /**
     * 垂直滚动条控件刷新。
     * 滚动条控件的大小，最大值/当前值发生变化时，调用 $flash 方法刷新滑动块的大小与位置。
     * @protected
     */
    UI_VSCROLL_CLASS.$flush = function () {
        /* 计算滑动块高度与位置 */
        var total = this._nTotal,
            block = this._uBlock,
            height = this.getHeight(),
            prevHeight = this._uPrev.getHeight(),
            bodyHeight = this.getBodyHeight(),
            blockHeight = MAX(FLOOR(bodyHeight * height / (height + total)), block.getHeightRevise() + 5);

        if (total) {
            block.setSize(0, blockHeight);
            block.setPosition(0, prevHeight + FLOOR((this._nValue / total) * (bodyHeight - blockHeight)));
            block.setRange(prevHeight, 0, bodyHeight + prevHeight, 0);
        }
    };

    /**
     * 获取一页的步长。
     * $getPageStep 方法根据 getStep 方法获取的步长，计算父控件一页的步长的大小，一页的步长一定是滚动条控件步长的整数倍。
     * @protected
     *
     * @return {number} 一页的步长
     */
    UI_VSCROLL_CLASS.$getPageStep = function () {
        var height = this.getHeight();
        return height - height % this._nStep;
    };

    /**
     * 设置垂直滚动条控件的大小。
     * @public
     *
     * @param {number} width 控件区域的宽度
     * @param {number} height 控件区域的高度
     */
    UI_VSCROLL_CLASS.$setSize = function (width, height) {
        var body = this.getBody(),
            bodyWidth,
            next = this._uNext,
            prevHeight = sumStyles(body, 'paddingTop');

        UI_SCROLL_CLASS.$setSize.call(this, width, height);

        bodyWidth = this.getBodyWidth();

        /* 设置滚动按钮与滑动块的信息 */
        this._uPrev.setSize(bodyWidth, prevHeight);
        next.setSize(bodyWidth, sumStyles(body, 'paddingBottom'));
        this._uBlock.setSize(bodyWidth);
        next.setPosition(0, this.getBodyHeight() + prevHeight);

        this.$flush();
    };

    /**
     * 判断是否允许当前值向最大值方向移动。
     * 受当前鼠标位置的影响，在当前值向最大值方向移动的过程中需要先判断移动是否得到许可。
     * @protected
     *
     * @return {boolean} 是否允许向最大值方向移动
     */
    UI_HSCROLL_CLASS.$allowNext = function () {
        var block = this._uBlock;
        return getMouseX(this) > block.getX() + block.getWidth();
    };

    /**
     * 判断是否允许当前值向0方向移动。
     * 受当前鼠标位置的影响，在当前值向0方向移动的过程中需要先判断移动是否得到许可。
     * @protected
     *
     * @return {boolean} 是否允许向0方向移动
     */
    UI_HSCROLL_CLASS.$allowPrev = function () {
        return getMouseX(this) < this._uBlock.getX();
    };

    /**
     * 计算滑动块拖拽时滚动条的当前值。
     * 虚方法，继承自滚动条控件的控件必须实现。
     * @protected
     *
     * @param {number} x 滑动块实际到达的X轴坐标
     * @param {number} y 滑动块实际到达的Y轴坐标
     */
    UI_HSCROLL_CLASS.$calcDragValue = function (x, y) {
        var block = this._uBlock,
            range = block._oRange;
        return (x - range.left) / (range.right - this._uPrev.getWidth() - block.getWidth()) * this._nTotal;
    };

    /**
     * 水平滚动条控件刷新。
     * 滚动条控件的大小，最大值/当前值发生变化时，调用 $flash 方法刷新滑动块的大小与位置。
     * @protected
     */
    UI_HSCROLL_CLASS.$flush = function () {
        /* 计算滑动块高度与位置 */
        var total = this._nTotal,
            block = this._uBlock,
            width = this.getWidth(),
            prevWidth = this._uPrev.getWidth(),
            bodyWidth = this.getBodyWidth(),
            blockWidth = MAX(FLOOR(bodyWidth * width / (width + total)), block.getWidthRevise() + 5);

        if (total) {
            block.setSize(blockWidth);
            block.setPosition(prevWidth + FLOOR((this._nValue / total) * (bodyWidth - blockWidth)), 0);
            block.setRange(0, bodyWidth + prevWidth, 0, prevWidth);
        }
    };

    /**
     * 获取一页的步长。
     * $getPageStep 方法根据 getStep 方法获取的步长，计算父控件一页的步长的大小，一页的步长一定是滚动条控件步长的整数倍。
     * @protected
     *
     * @return {number} 一页的步长
     */
    UI_HSCROLL_CLASS.$getPageStep = function () {
        var width = this.getWidth();
        return width - width % this._nStep;
    };

    /**
     * 设置水平滚动条控件的大小。
     * @public
     *
     * @param {number} width 控件区域的宽度
     * @param {number} height 控件区域的高度
     */
    UI_HSCROLL_CLASS.$setSize = function (width, height) {
        var body = this.getBody(),
            bodyHeight,
            next = this._uNext,
            prevWidth = sumStyles(body, 'paddingLeft');
        
        UI_SCROLL_CLASS.$setSize.call(this, width, height);

        bodyHeight = this.getBodyHeight();

        /* 设置滚动按钮与滑动块的信息 */
        this._uPrev.setSize(prevWidth, bodyHeight);
        next.setSize(sumStyles(body, 'paddingRight'), bodyHeight);
        this._uBlock.setSize(0, bodyHeight);
        next.setPosition(this.getBodyWidth() + prevWidth, 0);

        this.$flush();
    };

﻿/*
Panel - 定义在一个小区域内截取显示大区域内容的基本操作。
截面控件，继承自基础控件，内部包含三个部件，分别是垂直滚动条、水平滚动条与两个滚动条之间的夹角(基础控件)。截面控件的内
容区域可以超过控件实际大小，通过拖拽滚动条显示完整的内容，截面控件可以设置参数决定是否自动显示水平/垂直滚动条，如果设
置不显示水平/垂直滚动条，水平/垂直内容超出的部分将直接被截断，当设置两个滚动条都不显示时，层控件从显示效果上等同于基础
控件。在层控件上滚动鼠标滑轮，将控制层控件往垂直方向(如果没有垂直滚动条则在水平方向)前移或者后移滚动条，在获得焦点后，
通过键盘的方向键也可以操作层控件的滚动条。

层控件直接HTML初始化的例子:
<div ecui="type:panel;vertical-scroll:true;horizontal-scroll:true;wheel-delta:20;absolute:true">
    <!-- 这里放内容 -->
    ...
</div>

属性
_bAbsolute   - 是否包含绝对定位的Element
_nWheelDelta - 鼠标滚轮滚动一次的差值
_uVScroll    - 垂直滚动条控件
_uHScroll    - 水平滚动条控件
_uCorner     - 夹角控件
*/


    /**
     * 初始化层控件，层控件支持自动展现滚动条控件，允许指定需要自动展现的垂直或水平滚动条
     * params 参数支持的属性如下：
     * vScroll    是否自动展现垂直滚动条，默认展现
     * hScroll    是否自动展现水平滚动条，默认展现
     * absolute   是否包含绝对定位的Element，默认不包含
     * wheelDelta 鼠标滚轮的步长，即滚动一次移动的最小步长单位，默认总步长(差值*步长)为不大于20像素的最大值
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_PANEL =
        ui.Panel = function (el, params) {
            var i = 0,
                list = [],
                baseClass = params.base,
                o;

            UI_CONTROL.call(this, el, params);
            this._bAbsolute = !!params.absolute;
            this._nWheelDelta = params.wheelDelta;
            coordinates(el);

            params.vScroll !== false && list.push('VScroll');
            o = insertFloor(el);
            o.style.cssText = (list.length ? 'white-space:nowrap;' : '') + 'position:absolute;top:0px;left:0px';
            this.$setBody(o);
            params.hScroll !== false && list.push('HScroll');

            o = insertFloor(el);
            o.className = baseClass + '-layout';
            o.style.cssText = 'overflow:hidden;position:absolute';

            /* 生成中心区域的Element层容器，滚动是通过改变容器的left与top属性实现 */
            for (; o = list[i]; ) {
                (this['_u' + o] = createControl(
                    o,
                    {
                        base: baseClass + '-' + o.toLowerCase(),
                        parent: el
                    }
                )).getOuter().style.position = 'absolute';

                /* 只有垂直与水平滚动条控件都存在的情况下才生成夹角控件 */
                if (i++) {
                    (this._uCorner = createControl(
                        'Control',
                        {
                            base: baseClass + '-corner',
                            parent: el,
                            type: params.type + '-corner'
                        }
                    )).getOuter().style.position = 'absolute'
                };
            }
        },

        UI_PANEL_CLASS = inherits(UI_PANEL, UI_CONTROL);

    /**
     * 控件拥有焦点时，键盘按压事件的默认处理。Opera 下仅用 keydown 不能屏蔽方向键事件，还需要在 keypress 中屏蔽。
     * 如果控件处于可操作状态(参见 isEnabled)，keydown/keypress 方法触发 onkeydown/onkeypress 事件，如果事件返回值不为 false，则调用 $keydown/$keypress 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_PANEL_CLASS.$keydown = UI_PANEL_CLASS.$keypress = function (event) {
        var which = getKey(),
            mod = which % 2,
            target = event.target,
            scroll;

        if (which >= 37 && which <= 40 && !target.value) {
            scroll = mod ? this._uHScroll : this._uVScroll;
            scroll && scroll.skip(which + mod - 39);
            return false;
        }
    };


    /**
     * 鼠标在控件区域滚动滚轮事件的默认处理。
     * 如果有垂直滚动条，则垂直滚动条随滚轮滚动。如果控件处于可操作状态(参见 isEnabled)，mousewheel 方法触发 onmousewheel 事件，如果事件返回值不为 false，则调用 $mousewheel 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_PANEL_CLASS.$mousewheel = function (event) {
        var scroll = this._uVScroll;

        if (scroll && scroll.isShow()) {
            /* 计算滚动的次数，至少要滚动一次 */
            var value = scroll.getValue(),
                delta = this._nWheelDelta || FLOOR(20 / scroll.getStep()) || 1;
            scroll.skip(event.wheelDelta < 0 ? delta : -delta);
            return value == scroll.getValue();
        }
    };

    /**
     * 控件的滚动条发生滚动的默认处理。
     * 如果控件包含滚动条，滚动条滚动时触发 onscroll 事件，如果事件返回值不为 false，则调用 $scroll 方法。
     * @protected
     */
    UI_PANEL_CLASS.$scroll = function () {
        var style = this.getBody().style;
        style.left = -MAX(this.getScrollLeft(), 0) + 'px';
        style.top = -MAX(this.getScrollTop(), 0) + 'px';
    };

    /**
     * 设置控件的大小。
     * $setSize 方法设置控件实际的大小，不改变其它的如缓存等信息。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_PANEL_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);

        var body = this.getBody(),
            base = this.getBase(),
            o,
            paddingWidth = sumStyles(base, 'paddingLeft', 'paddingRight'),
            paddingHeight = sumStyles(base, 'paddingTop', 'paddingBottom'),
            bodyWidth = this.getBodyWidth(),
            bodyHeight = this.getBodyHeight(),
            mainWidth = body.offsetWidth,
            mainHeight = body.offsetHeight,
            vscroll = this._uVScroll,
            hscroll = this._uHScroll,
            corner = this._uCorner,
            vsWidth = vscroll && vscroll.getWidth(),
            hsHeight = hscroll && hscroll.getHeight(),
            innerWidth = bodyWidth - vsWidth,
            innerHeight = bodyHeight - hsHeight,
            hsWidth = innerWidth + paddingWidth,
            vsHeight = innerHeight + paddingHeight,
            i = 0,
            pos = getPosition(body),
            x = pos.left,
            y = pos.top,
            elements;

        /* 考虑到内部Element绝对定位的问题，中心区域的宽度与高度修正 */
        if (this._bAbsolute) {
            for (elements = body.getElementsByTagName('*'); o = elements[i++]; ) {
                if (o.offsetWidth && getStyle(o, 'position') != 'static') {
                    pos = getPosition(o);
                    mainWidth = MAX(mainWidth, pos.left - x + o.offsetWidth);
                    mainHeight = MAX(mainHeight, pos.top - y + o.offsetHeight);
                }
            }
        }

        /* 设置垂直与水平滚动条与夹角控件的位置 */
        vscroll && vscroll.setPosition(hsWidth, 0);
        hscroll && hscroll.setPosition(0, vsHeight);
        corner && corner.setPosition(hsWidth, vsHeight);

        if (mainWidth <= bodyWidth && mainHeight <= bodyHeight) {
            /* 宽度与高度都没有超过层控件的宽度与高度，不需要显示滚动条 */
            vscroll && vscroll.hide();
            hscroll && hscroll.hide();
            corner && corner.hide();
        }
        else {
            while (true) {
                if (corner) {
                    /* 宽度与高度都超出了显示滚动条后余下的宽度与高度，垂直与水平滚动条同时显示 */
                    if (mainWidth > innerWidth && mainHeight > innerHeight) {
                        hscroll.show();
                        hscroll.setTotal(mainWidth - innerWidth);
                        hscroll.setSize(hsWidth);
                        vscroll.show();
                        vscroll.setTotal(mainHeight - innerHeight);
                        vscroll.setSize(0, vsHeight);
                        corner.show();
                        corner.setSize(vsWidth, hsHeight);
                        bodyWidth = innerWidth;
                        bodyHeight = innerHeight;
                        break;
                    }
                    corner.hide();
                }
                if (hscroll) {
                    if (mainWidth > bodyWidth) {
                        /* 宽度超出控件的宽度，高度没有超出显示水平滚动条后余下的高度，只显示水平滚动条 */
                        hscroll.show();
                        hscroll.setTotal(mainWidth - bodyWidth);
                        hscroll.setSize(bodyWidth + paddingWidth);
                        vscroll && vscroll.hide();
                        bodyHeight = innerHeight;
                    }
                    else {
                        hscroll.hide();
                    }
                }
                if (vscroll) {
                    if (mainHeight > bodyHeight) {
                        /* 高度超出控件的高度，宽度没有超出显示水平滚动条后余下的宽度，只显示水平滚动条 */
                        hscroll && hscroll.hide();
                        vscroll.show();
                        vscroll.setTotal(mainHeight - bodyHeight);
                        vscroll.setSize(0, bodyHeight + paddingHeight);
                        bodyWidth = innerWidth;
                    }
                    else {
                        vscroll.hide();
                    }
                }
                break;
            }
        }

        /* 设置内部定位器的大小 */
        o = body.parentNode;
        elements = o.style;
        elements.width = bodyWidth - calcWidthRevise(o) + 'px';
        elements.height = bodyHeight - calcHeightRevise(o) + 'px';
    };

    /**
     * 获取水平滚动条的当前值。
     * getScrollLeft 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 水平滚动条的当前值，如果没有水平滚动条返回-1
     */
    UI_PANEL_CLASS.getScrollLeft = function () {
        var scroll = this._uHScroll;
        return scroll ? scroll.getValue() : -1;
    };

    /**
     * 获取垂直滚动条的当前值。
     * getScrollTop 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 垂直滚动条的当前值，如果没有垂直滚动条返回-1
     */
    UI_PANEL_CLASS.getScrollTop = function () {
        var scroll = this._uVScroll;
        return scroll ? scroll.getValue() : -1;
    };

/*
Edit - 定义输入数据的基本操作。
输入框控件，继承自基础控件，实现了对原生 InputElement 的功能扩展，包括光标的控制、输入事件的实时响应(每次改变均触发事
件)，以及 IE 下不能动态改变输入框的表单项名称的模拟处理。输入框控件默认使用文本输入框，对于需要使用加密框的场景，可以
使用 &lt;input type="password" ecui="type:edit"&gt; 的方式初始化。

输入框控件直接HTML初始化的例子:
<input ecui="type:edit" name="test" value="test" />
或:
<div ecui="type:edit;name:test;value:test">
    <!-- 如果ec中不指定name,value，也可以在input中指定 -->
    <input name="test" value="test" />
</div>

属性
_eInput  - INPUT对象
*/


    /**
     * 初始化输入框控件
     * params 参数支持的属性如下：
     * name  输入框的名称
     * value 输入框的默认值
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_EDIT =
        ui.Edit = function (el, params) {
            /* 检查是否存在Input，如果没有生成一个Input */
            var input = el,
                names = ['keydown', 'keypress', 'keyup', 'focus', 'blur', 'change'];

            if (el.tagName == 'INPUT') {
                el = createDom();
                insertAfter(el, input);
                el.appendChild(input);
                el.className = input.className;
            }
            else {
                if (input = el.getElementsByTagName('input')[0]) {
                    el.innerHTML = '';
                    el.appendChild(input);
                }
                else {
                    /* 初始化输入框的值 */
                    el.innerHTML = '<input name="' + (params.name || '') + '">';
                    input = el.firstChild;
                    input.value = params.value || '';
                }
            }
            this._eInput = input;

            UI_CONTROL.call(this, el, params);

            /* 设置Element与Input的基本属性 */
            el.style.overflow = 'hidden';
            input.className = '';
            input.style.border = 'none';

            /* 绑定Element原有的事件函数 */
            for (el = 0; params = names[el++]; ) {
                params = 'on' + params;
                this[params] = input[params];
            }
            input.onchange = null;

            /* 设置自定义的事件处理 */
            copy(input, UI_EDIT_INPUT);
            ieVersion ? UI_EDIT_STOP(this, false) : input.addEventListener('input', UI_EDIT_CHANGE, false);

            setStyle(this.getOuter(), 'display', 'inline-block');
        },

        UI_EDIT_CLASS = inherits(UI_EDIT, UI_CONTROL),
        UI_EDIT_INPUT = {},

        /**
         * 输入框值改变事件处理函数。
         * @private
         */
        UI_EDIT_CHANGE = ieVersion ? function () {
            if (event.propertyName == 'value') {
                var control = findControl(this);
                UI_EDIT_STOP(control);
                control.change();
                UI_EDIT_STOP(control, false);
            }
        } : function () {
            findControl(this).change();
        },

        /**
         * 设置对value值改变的监控状态，在IE浏览器下，任何情况下改变INPUT的值都会调用onchange，而在事件中不应该再次触发事件，避免出现递归调用。
         * @private
         *
         * @param {ecui.ui.Edit} control 输入框对象
         * @param {boolean} status 只有值为true才锁定改变，否则触除对onchange的调用锁定
         */
        UI_EDIT_STOP = UI_EDIT.stop = ieVersion ? function (control, status) {
            control._eInput.onpropertychange = status !== false ? null : UI_EDIT_CHANGE;
        } : blank;

    /**
     * 输入框失去焦点事件处理函数。
     * @private
     */
    UI_EDIT_INPUT.onblur = function () {
        var control = findControl(this);
        /* 设置默认失去焦点事件，阻止在blur事件中再次回调 */
        control.$blur = UI_CONTROL_CLASS.$blur;
        control.isEnabled() && loseFocus(control);
        delete control.$blur;
    };

    /**
     * 输入框获得焦点事件处理函数。
     * @private
     */
    UI_EDIT_INPUT.onfocus = function () {
        var control = findControl(this);
        /* 设置默认获得焦点事件，阻止在focus事件中再次回调 */
        control.$focus = UI_CONTROL_CLASS.$focus;
        /* 如果控件处于不可操作状态，不允许获得焦点 */
        control.isEnabled() ? setFocused(control) : this.blur();
        delete control.$focus;
    };

    /**
     * 销毁控件的默认处理。
     * 页面卸载时将销毁所有的控件，释放循环引用，防止在 IE 下发生内存泄漏，$dispose 方法的调用不会受到 ondispose 事件返回值的影响。
     * @protected
     */
    UI_EDIT_CLASS.$dispose = function () {
        this._eInput = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_EDIT_CLASS.$setSize = function (width, height) {
        var style = this._eInput.style;
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        style.width = this.getBodyWidth() + 'px';
        style.height = this.getBodyHeight() + 'px';
    };

    /**
     * 获取控件外层的 InputElement 对象。
     * @public
     *
     * @return {HTMLElement} InputElement 对象
     */
    UI_EDIT_CLASS.getInput = function () {
        return this._eInput;
    };

    /**
     * 获取控件的表单项名称。
     * 输入框控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称可以使用 setName 方法改变。
     * @public
     *
     * @return {string} INPUT 对象名称
     */
    UI_EDIT_CLASS.getName = function () {
        return this._eInput.name;
    };

    /**
     * 获取控件的值。
     * getValue 方法返回提交时用的表单项的值，使用 setValue 方法设置。
     * @public
     *
     * @return {string} 控件的值
     */
    UI_EDIT_CLASS.getValue = function () {
        return this._eInput.value;
    };

    /**
     * 设置输入框光标的位置。
     * @public
     *
     * @param {number} pos 位置索引
     */
    UI_EDIT_CLASS.setCaret = ieVersion ? function (pos) {
        var range = this._eInput.createTextRange();
        range.moveStart('character', pos);
        range.collapse(true);
        range.select();
    } : function (pos) {
        this._eInput.setSelectionRange(pos, pos);
    };

    /**
     * 设置控件的可操作状态。
     * @public
     *
     * @param {boolean} status 控件是否可操作，默认为 true
     */
    UI_EDIT_CLASS.setEnabled = function (status) {
        UI_CONTROL_CLASS.setEnabled.call(this, status);
        this._eInput.readOnly = status === false;
    };

    /**
     * 设置控件的表单项名称。
     * 输入框控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 表单项名称
     */
    UI_EDIT_CLASS.setName = function (name) {
        this._eInput = setInputName(this._eInput, name);
    };

    /**
     * 设置控件的值。
     * setValue 方法设置提交时用的表单项的值，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 控件的值
     */
    UI_EDIT_CLASS.setValue = function (value) {
        UI_EDIT_STOP(this);
        this._eInput.value = value;
        this.change();
        UI_EDIT_STOP(this, false);
    };

    /**
     * 拆分当次输入的值。
     * 在 onkeydown 与 onkeypress 事件中，如果需要详细控制输入的信息，调用 split 方法分解当前的数据，从而根据按键信息计算得到的新数据是否满足要求。
     * @public
     *
     * @return {Object} {left--选中区域左部的字符串，right--选中区域右部的字符串，selection--选中区域的字符串}
     */
    UI_EDIT_CLASS.split = ieVersion ? function () {
        var el = this._eInput,
            range = DOCUMENT.selection.createRange(),
            oldText = range.text;

        range.setEndPoint('StartToStart', el.createTextRange());

        var i = range.text.length,
            value = el.value;

        return {
            left: value.substring(0, i - oldText.length),
            right: value.substring(i),
            selection: oldText
        };
    } : function () {
        var el = this._eInput,
            value = el.value,
            start = el.selectionStart,
            end = el.selectionEnd;

        return {
            left: value.substring(0, start),
            right: value.substring(end),
            selection: value.substring(start, end)
        };
    };

    /*
     * 初始化键盘事件处理函数，包括：
     * keydown  - 键盘按下事件
     * keypress - 键盘按压事件
     * keyup    - 键盘弹起事件
     */
    (function () {
        for (var i = 0, list = ['keydown', 'keypress', 'keyup'], name; name = list[i++]; ) {
            UI_EDIT_INPUT['on' + name] = new Function(
                'e',
                'var c=ecui,o=c.findControl(this),s=c.ui.Edit.stop,r;e=c.event(e);e.stopPropagation();if(o.on'
                    + name + '){s(o);r=o.on' + name + '(e)!==false&&o.$' + name + '(e);s(o,false);return r}'
            );
        }

        /* 失去与获得焦点事件的默认处理初始化 */
        for (i = 0, list = ['blur', 'focus']; name = list[i++]; ) {
            UI_EDIT_CLASS['$' + name] = new Function(
                'var e=this._eInput,f=e.on' + name + ';e.on' + name + '=null;try{e.' + name + '()}catch(v){}e.on'
                    + name + '=f;ecui.ui.Control.prototype.$' + name + '.call(this)'
            );
        }
    })();


/*
Label - 定义事件转发的基本操作。
标签控件，继承自基础控件，将事件转发到指定的控件上，通常与 Radio、Checkbox 等控件联合使用，扩大点击响应区域。

标签控件直接HTML初始化的例子:
<div ecui="type:label;for:checkbox1"></div>

属性
_cFor - 被转发的控件对象
*/


    /**
     * 初始化标签控件
     * params 参数支持的属性如下：
     * for 被转发的控件 id
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_LABEL =
        ui.Label = function (el, params) {
            UI_CONTROL.call(this, el, params);

            $connect(this, this.setFor, params['for']);
        },

        UI_LABEL_CLASS = inherits(UI_LABEL, UI_CONTROL);

    /**
     * 鼠标单击控件事件的默认处理。
     * 将点击事件转发到 setFor 方法指定的控件。如果控件处于可操作状态(参见 isEnabled)，click 方法触发 onclick 事件，如果事件返回值不为 false，则调用 $click 方法。
     * @protected
     */
    UI_LABEL_CLASS.$click = function (event) {
        var control = this._cFor;
        control && control.click(event);
    };

    /**
     * 设置控件的事件转发接收控件。
     * setFor 方法设置事件转发的被动接收者，如果没有设置，则事件不会被转发。
     * @public
     *
     * @param {ecui.ui.Control} control 事件转发接收控件
     */
    UI_LABEL_CLASS.setFor = function (control) {
        this._cFor = control;
    };

/*
Checkbox - 定义单个设置项选择状态的基本操作。
复选框控件，继承自输入框控件，实现了对原生 InputElement 复选框的功能扩展，支持复选框之间的主从关系定义。当一个复选框的
“从复选框”选中一部分时，“主复选框”将处于半选状态，这种状态逻辑意义上等同于未选择状态，但显示效果不同，复选框的主从关系
可以有多级。

复选框控件直接HTML初始化的例子:
<input ecui="type:checkbox;checked:true" type="checkbox" name="test" value="test" checked="checked" />
也可以使用其它标签初始化:
<div ecui="type:checkbox;checked:true;name:test">
    <!-- 如果ec中不指定name，也可以在input中指定 -->
    <input name="test" />
</div>

属性
_nStatus   - 复选框当前的状态，0--全选，1--未选，2--半选
_cSuperior - 复选框的上级管理者
_aInferior - 所有的下级复选框
*/


    /**
     * 初始化复选框控件
     * params 参数支持的属性如下：
     * checked  控件是否默认选中
     * superior 管理复选框的 id
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_CHECKBOX =
        ui.Checkbox = function (el, params) {
            var checked = el.tagName == 'INPUT' ? el.checked : params.checked;

            UI_EDIT.call(this, el, params);
            el = this.getInput();
            el.style.display = 'none';
            el.checked = true;

            this._aInferior = [];
            this._nStatus = 2;
            this.setChecked(checked);

            $connect(this, this.setSuperior, params.superior);
        },

        UI_CHECKBOX_CLASS = inherits(UI_CHECKBOX, UI_EDIT);

    /**
     * 改变复选框样式
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框对象
     * @param {number} status 新的状态，0--全选，1--未选，2--半选
     * @param {boolean} isRemoved 为 true 时删除样式，否则新增样式
     */
    function UI_CHECKBOX_ALTERCLASS(control, status, isRemoved) {
        control.setClass(control.getBaseClass() + ['-checked', '', '-part'][status], isRemoved);
    }

    /**
     * 改变复选框状态
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框对象
     * @param {number} status 新的状态，0--全选，1--未选，2--半选
     * @return {boolean} 状态是否发生了改变
     */
    function UI_CHECKBOX_CHANGE(control, status) {
        var superior = control._cSuperior,
            oldStatus = control._nStatus,
            result = status !== oldStatus;

        if (result) {
            /* 状态发生改变时进行处理 */
            UI_CHECKBOX_ALTERCLASS(control, oldStatus, true);
            UI_CHECKBOX_ALTERCLASS(control, status);

            control._nStatus = status;
            control.getInput().disabled = !!status;

            /* 如果有上级复选框，刷新上级复选框的状态 */
            superior && UI_CHECKBOX_FLUSH(superior);

            control.change();
        }
        return result;
    }

    /**
     * 复选框控件刷新，计算所有从复选框，根据它们的选中状态计算自身的选中状态。
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框控件
     */
    function UI_CHECKBOX_FLUSH(control) {
        for (var i = 0, o, status; o = control._aInferior[i]; ) {
            if (i++ && status != o._nStatus) {
                status = 2;
                break;
            }
            status = o._nStatus;
        }

        i && UI_CHECKBOX_CHANGE(control, status);
    }

    /**
     * 鼠标单击控件事件的默认处理。
     * 控件点击时将改变当前的选中状态。如果控件处于可操作状态(参见 isEnabled)，click 方法触发 onclick 事件，如果事件返回值不为 false，则调用 $click 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CHECKBOX_CLASS.$click = function (event) {
        UI_EDIT_CLASS.$click.call(this, event);

        this.setChecked(this._nStatus);
    };

    /**
     * 控件拥有焦点时，键盘按下事件的默认处理。
     * 屏蔽空格键按下事件。Opera 下仅用 keydown 不能屏蔽空格键事件，还需要在 keypress 中屏蔽。如果控件处于可操作状态(参见 isEnabled)，keydown/keypress 方法触发 onkeydown/onkeypress 事件，如果事件返回值不为 false，则调用 $keydown/$keypress 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CHECKBOX_CLASS.$keydown = UI_CHECKBOX_CLASS.$keypress = function (event) {
        return event.which != 32;
    };

    /**
     * 控件拥有焦点时，键盘弹起事件的默认处理。
     * 接管空格键的处理，按控格键相当于执行一次点击操作。如果控件处于可操作状态(参见 isEnabled)，keyup 方法触发 onkeyup 事件，如果事件返回值不为 false，则调用 $keyup 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_CHECKBOX_CLASS.$keyup = function (event) {
        if (event.which == 32) {
            this.$click(event);
            return false;
        }
    };

    /**
     * 获取全部的从属复选框。
     * 复选框控件调用 setSuperior 方法指定了上级复选框控件后，它就是上级复选框控件的从属复选框控件之一。
     * @public
     *
     * @return {Array} 复选框控件数组
     */
    UI_CHECKBOX_CLASS.getInferiors = function () {
        return this._aInferior;
    };

    /**
     * 获取上级复选框。
     * getSuperior 方法返回调用 setSuperior 方法指定的上级复选框控件。
     * @public
     *
     * @return {ecui.ui.Checkbox} 复选框控件
     */
    UI_CHECKBOX_CLASS.getSuperior = function () {
        return this._cSuperior;
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_CHECKBOX_CLASS.isChecked = function () {
        return !this._nStatus;
    };

    /**
     * 设置复选框控件选中状态。
     * @public
     *
     * @param {boolean} status 是否选中
     */
    UI_CHECKBOX_CLASS.setChecked = function (status) {
	if (!this.isEnabled()) {
	    return;
	}
        if (UI_CHECKBOX_CHANGE(this, status ? 0 : 1)) {
            /* 如果有下级复选框，全部改为与当前复选框相同的状态 */
            for (var i = 0, o; o = this._aInferior[i++]; ) {
                o.setChecked(status);
            }
        }
    };

    /**
     * 设置上级复选框。
     * setSuperior 方法指定上级复选框控件后，可以通过访问上级复选框控件的 getInferiors 方法获取列表，列表中即包含了当前的控件。
     * @public
     *
     * @param {ecui.ui.Checkbox} superior 上级复选框控件
     */
    UI_CHECKBOX_CLASS.setSuperior = function (superior) {
        var oldSuperior = this._cSuperior;

        /* 已经设置过上级复选框，需要先释放 */
        if (oldSuperior) {
            remove(oldSuperior._aInferior, this);
            UI_CHECKBOX_FLUSH(oldSuperior);
        }

        if (superior) {
            superior._aInferior.push(this);
            UI_CHECKBOX_FLUSH(superior);
	}
        this._cSuperior = superior;
    };

    UI_CHECKBOX_CLASS.setEnabled = function (status) {
	UI_EDIT_CLASS.setEnabled.call(this, status);
	this.getInput().disabled = !status;
    };


/*
Radio - 定义一组选项中选择唯一选项的基本操作。
单选框控件，继承自基础控件，实现了对原生 InputElement 单选框的功能扩展，支持对选中的图案的选择。单选框控件需要分组后使
用，在表单项提交中，一组单选框控件中的第一个单选框保存提交用的表单内容。

单选框控件直接HTML初始化的例子:
<input ecui="type:radio" type="radio" name="test" checked="checked" />
也可以使用其它标签初始化:
<div ecui="type:radio;name:test;checked:true"></div>

属性
_sName  - 控件所属的组名称
_sValue - 当前单选框的值

组属性
_eInput - 组对应的Element
_cCheck - 当前被选中的选项
*/


    /**
     * 初始化单选框控件
     * params 参数支持的属性如下：
     * checked 控件是否默认选中
     * name    控件所属组的名称
     * value   控件的值
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_RADIO =
        ui.Radio = function (el, params) {
            var input = {};

            if (el.tagName == 'INPUT') {
                el = insertAfter(createDom(), input = el);
                removeDom(input);
                el.className = input.className;
            }

            UI_CONTROL.call(this, el, params);

            this.setName(input.name || params.name || '');
            this.setValue(input.value || params.value || '');
            (params.checked || input.checked) && this.checked();

            setStyle(this.getOuter(), 'display', 'inline-block');
        },

        UI_RADIO_CLASS = inherits(UI_RADIO, UI_CONTROL);

    /**
     * IE下刷新时数据强制回填的处理。
     * @private
     */
    function UI_RADIO_IE_FILL() {
        if (event.propertyName == 'value') {
            var i = 0,
                value = this.value,
                group = UI_RADIO['ec-' + this.name],
                o;

            /* IE下处理回填结束后不再继续处理 */
            this.onpropertychange = null;
            for (; o = group[i++]; ) {
                if (o._sValue == value) {
                    o.checked();
                    break;
                }
            }
        }
    }

    /**
     * 鼠标单击控件事件的默认处理。
     * 控件点击时将控件设置成为选中状态，同时取消同一个单选框控件组的其它控件的选中状态。如果控件处于可操作状态(参见 isEnabled)，click 方法触发 onclick 事件，如果事件返回值不为 false，则调用 $click 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_RADIO_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);
        this.checked();
    };

    /**
     * 设置单选框控件为选中状态。
     * 将控件设置成为选中状态，同时取消同一个单选框控件组的其它控件的选中状态。
     * @public
     */
    UI_RADIO_CLASS.checked = function () {
        if (group = this.getItems()) {
            /* 先清除之前被选中的单选框样式 */
            var checked = group._cCheck,
                el = group._eInput,
                group;

            if (checked != this) {
                /* 选中组内的其它项 */
                checked && checked.setClass(checked.getBaseClass());

                checked = el.onpropertychange;
                el.onpropertychange = null;
                el.value = this._sValue;
                el.onpropertychange = checked;

                group._cCheck = this;
            }
        }

        this.setClass(this.getBaseClass() + '-checked');
    };

    /**
     * 获取与当前单选框同组的全部单选框。
     * getItems 方法返回包括当前单选框在内的与当前单选框同组的全部单选框，同组的单选框选中状态存在唯一性。
     * @public
     *
     * @return {Array} 单选框控件数组
     */
    UI_RADIO_CLASS.getItems = function () {
        return UI_RADIO['ec-' + this._sName];
    };

    /**
     * 获取控件的表单项名称。
     * 单选框控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称决定单选框的分组，可以使用 setName 方法改变。
     * @public
     *
     * @return {string} 单选框组的名称，如果没有关联到任何一个组，返回 undefined
     */
    UI_RADIO_CLASS.getName = function () {
        return this._sName;
    };

    /**
     * 获取控件的值。
     * getValue 方法返回控件自身的值，只有控件是选中状态，这个值才会被提交时的表单项使用，判断是否处于选中状态使用 isChecked 方法，使用 setValue 方法设置。
     * @public
     *
     * @return {string} 控件的值
     */
    UI_RADIO_CLASS.getValue = function () {
        return this._sValue;
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_RADIO_CLASS.isChecked = function () {
        var group = this.getItems();
        return group && group._cCheck == this;
    };

    /**
     * 设置控件的表单项名称。
     * 单选框控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，名称相同的单选框位于同一个分组，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 表单项名称，如果为逻辑非省略将设置成无分组
     */
    UI_RADIO_CLASS.setName = function (name) {
        var o = this._sName,
            group = UI_RADIO['ec-' + o];

        if (name != o) {
            /* 如果控件已经属于一个组，需要先释放 */
            if (group) {
                o = group._eInput;

                /* 改变控件组的选中状态 */
                if (group._cCheck == this) {
                    o.value = '';
                    group._cCheck = null;
                }
                remove(group, this);

                group = group[0];
                /* 如果单选框组内有数据，改变Input标签的位置，否则移除Input标签 */
                group ? group.getBody().appendChild(o) : removeDom(o);
            }

            /* 控件需要放入新的组 */
            if (name) {
                /* 加入新的组需要清除当前的选中状态 */
                this.setClass(this.getBaseClass());

                group = UI_RADIO[o = 'ec-' + name];
                if (!group) {
                    /* 没有单选框组先创建一个组 */
                    group = UI_RADIO[o] = [];
                    o = group._eInput = createDom('<input type="hidden" name="' + name + '">', this.getBody());
                    if (ieVersion) {
                        o.onpropertychange = UI_RADIO_IE_FILL;
                    }
                }
                group.push(this);
            }
        }

        this._sName = name;
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件自身的值，只有控件是选中状态，这个值才会被提交时的表单项使用，判断是否处于选中状态使用 isChecked 方法，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 控件的值
     */
    UI_RADIO_CLASS.setValue = function (value) {
        this._sValue = value;
    };

/*
Item/Items - 定义选项操作相关的基本操作。
选项控件，继承自基础控件，用于弹出菜单、下拉框、交换框等控件的单个选项，通常不直接初始化。选项控件必须用在使用选项组接
口(Items)的控件中，选项控件支持移入操作的缓存，不会因为鼠标移出而改变状态，因此可以通过函数调用来改变移入移出状态，选
控件默认屏蔽了 DOM 的文本选中操作。选项组不是控件，是一组对选项进行操作的方法的集合，提供了基本的增/删操作，以及对选项
控件的状态控制的接口，通过将 ecui.ui.Items 对象下的方法复制到类的 prototype 属性下继承接口，最终对象要正常使用还需要在
类构造器中调用 initItems 方法。

属性
_fType - 父控件的类型，在第一次setParent时设置，之后setParent时不能改变父控件的类型
*/


    /**
     * 创建选项控件
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {string|Object} params 参数
     */
    var UI_ITEM =
        ui.Item = function (el, params) {
            UI_CONTROL.call(this, el, params);
            this.getBody().style.overflow = 'hidden';
        },

        UI_ITEM_CLASS = inherits(UI_ITEM, UI_CONTROL),
        UI_ITEMS = ui.Items = {};

    /**
     * 鼠标在控件区域按下事件的默认处理。
     * 阻止 DOM 文本选中操作。如果控件处于可操作状态(参见 isEnabled)，mousedown 方法触发 onmousedown 事件，如果事件返回值不为 false，则调用 $mousedown 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_ITEM_CLASS.$mousedown = function (event) {
        UI_CONTROL_CLASS.$mousedown.call(this, event);
        event.preventDefault();
    };

    /**
     * 鼠标移出控件区域事件的默认处理。
     * 不进行任何操作。如果控件处于可操作状态(参见 isEnabled)，mouseout 方法触发 onmouseout 事件，如果事件返回值不为 false，则调用 $mouseout 方法。
     * @protected
     */
    UI_ITEM_CLASS.$mouseout = blank;

    /**
     * 鼠标移入控件区域事件的默认处理。
     * 鼠标移入控件区域时默认调用 $mouseover 方法，将同一个父控件的其它选项控制设置成移出状态。如果控件处于可操作状态(参见 isEnabled)，mouseover 方法触发 onmouseover 事件，如果事件返回值不为 false，则调用 $mouseover 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_ITEM_CLASS.$mouseover = function (event) {
        var parent = this.getParent(),
            items = parent.getItems(),
            over = items._cOver;
        /* 新控件移入，处于移入状态的控件将移出 */
        if (this != over) {
            over && UI_CONTROL_CLASS.$mouseout.call(over);
            UI_CONTROL_CLASS.$mouseover.call(this, event);
            items._cOver = this;
        }
    };

    /**
     * 为控件增加/删除一个扩展样式。
     * 选项控件改变样式后需要自动恢复原来的大小。
     * @public
     *
     * @param {string} className 扩展样式的尾缀
     * @param {boolean} isRemove 为 true 时删除样式，否则新增样式
     */
    UI_ITEM_CLASS.alterClass = function (className, isRemove) {
        var width = this.getWidth(),
            height = this.getHeight();
        UI_CONTROL_CLASS.alterClass.call(this, className, isRemove);
        this.setSize(width, height);
    };

    /**
     * 设置当前控件的父控件。
     * 选项控件调用 setParent 方法后，不允许再设置到其它类型的父控件上，例如，当选项控件已经被设置成下拉框控件子选项，就不允许再次设置到弹出菜单上使用。
     * @public
     *
     * @param {ecui.ui.Control|HTMLElement} parent 父控件对象/父 Element 对象，忽略参数则将控件移出 DOM 树
     */
    UI_ITEM_CLASS.setParent = function (parent) {
        var constructor = this._fType,
            oldParent = this.getParent(),
            setParent = UI_CONTROL_CLASS.setParent;

        /* 判断父控件是否被Items包装过 */
        if (parent && UI_ITEMS[parent.getUID()]) {
            constructor || (constructor = this._fType = parent.constructor);

            if (parent instanceof constructor) {
                /* 父控件必须与之前选项控件的父控件是同一种类型 */
                setParent.call(this, parent);

                /* 有可能无法添加成功，因此需要重新取一次父控件对象 */
                parent = this.getParent();

                /* 刷新父控件的值 */
                oldParent && oldParent.$alterItems();
                parent && parent.$alterItems();
                return;
            }

            parent = null;
        }
        setParent.call(this, parent);
    };

    /**
     * 控件增加子控件事件的默认处理。
     * 选项组增加子选项时需要判断子控件的类型，并额外添加引用。
     * @public
     *
     * @param {Item} item 选项控件
     */
    UI_ITEMS.$append = function (item) {
        /* 检查待新增的控件是否为选项控件 */
        if (!(item instanceof UI_ITEM) || findPrototype(this, '$append').call(this, item) === false) {
            return false;
        }
        this.getItems().push(item);
    };

    /**
     * 初始化选项组对应的 Element 对象。
     * 实现了 Items 接口的类在初始化时需要调用 $initItems 方法自动生成选项控件，$initItems 方法保证一个控件对象只允许被调用一次，多次的调用无效。
     * @public
     */
    UI_ITEMS.$initItems = function () {
        var i = 0,
            elements = children(this.getBody()),
            el;

        this.$alterItems = blank;

        /* 防止对一个控件进行两次包装操作 */
        UI_ITEMS[this.getUID()] = [];

        /* 初始化选项控件 */
        for (; el = elements[i]; ) {
            this.add(el, i++);
        }

        delete this.$alterItems;
    };

    /**
     * 控件移除子控件事件的默认处理。
     * 选项组移除子选项时需要额外移除引用。
     * @public
     *
     * @param {Item} item 选项控件
     */
    UI_ITEMS.$remove = function (item) {
        findPrototype(this, '$remove').call(this, item);
        remove(this.getItems(), item);
    };

    /**
     * 添加子选项控件。
     * add 方法只完成添加子选项控件的基本逻辑，具体的初始化由控件的 $initItem 方法完成。如果位置序号不合法，子选项控件将添加在末尾的位置。
     * @public
     *
     * @param {string|HTMLElement|ecui.ui.Item} item 控件的 html 内容/控件对应的 Element 对象/选项控件
     * @param {number} index 子选项控件需要添加的位置序号
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.add = function (item, index) {
        var items = this.getItems(),
            o = this.getClass() + '-item';

        if (item instanceof UI_ITEM) {
            /* 选项控件，直接添加 */
            item.setParent(this);
        }
        else {
            /* 根据是字符串还是Element对象选择不同的初始化方式 */
            if ('string' == typeof item) {
                item = createDom('<div>' + item + '</div>');
            }

            item = createControl(
                'Item',
                {
                    element: item,
                    base: o,
                    parent: this
                }
            );

            o = Array.prototype.slice.call(arguments, 1);
            o[0] = item;
            this.$initItem && this.$initItem.apply(this, o);
            item.getBase().onselectstart = cancel;

            this.$alterItems();
        }

        /* 改变选项控件的位置 */
        if (item.getParent() && (o = items[index]) && o != item) {
            insertBefore(item.getOuter(), o.getOuter());
            items.splice(index, 0, items.pop());
        }

        return item;
    };

    /**
     * 向选项组最后添加子选项控件。
     * append 方法是 add 方法去掉第二个 index 参数的版本。
     * @public
     *
     * @param {string|Element|ecui.ui.Item} item 控件的 html 内容/控件对应的 Element 对象/选项控件
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.append = function (item) {
        item = Array.prototype.slice.call(arguments);
        item.splice(1, 0, undefined);
        this.add.apply(this, item);
    };

    /**
     * 清除选项的移入状态。
     * 选项控件重新实现了鼠标移入移出操作，鼠标移出时，不会马上失去移入状态，需要在下次移入事件触发时才产生移出的操作，clearOvered 方法设置选项组中处于移入状态的选项为非移入状态。
     * @public
     */
    UI_ITEMS.clearOvered = function () {
        var items = this.getItems(),
            over = items._cOver;
        over && UI_CONTROL_CLASS.$mouseout.call(over);
        items._cOver = null;
    };

    /**
     * 获取全部的子选项控件。
     * @public
     *
     * @return {Array} 子选项控件数组
     */
    UI_ITEMS.getItems = function () {
        return UI_ITEMS[this.getUID()];
    };

    /**
     * 获取当前处于鼠标移入状态的选项。
     * 选项控件重新实现了鼠标移入移出操作，鼠标移出时，不会马上失去移入状态，需要在下次移入事件触发时才产生移出的操作，getOvered 方法能够获取当前处于移入状态的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.getOvered = function () {
        return this.getItems()._cOver;
    };

    /**
     * 移除子选项控件。
     * @public
     *
     * @param {number|ecui.ui.Item} item 选项控件的位置序号/选项控件
     */
    UI_ITEMS.remove = function (item) {
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }
        item && item.setParent();
    };

    /**
     * 设置控件内所有子选项控件的大小。
     * @public
     *
     * @param {number} itemWidth 子选项控件的宽度
     * @param {number} itemHeight 子选项控件的高度
     */
    UI_ITEMS.setItemSize = function (itemWidth, itemHeight) {
        for (var i = 0, items = this.getItems(), item; item = items[i++]; ) {
            item.setSize(itemWidth, itemHeight);
        }
    };

﻿/*
Select - 定义模拟下拉框行为的基本操作。
下拉框控件，继承自输入框控件，实现了选项组接口，内部包含了三个部件，分别是下拉框显示的文本(选项控件)、下拉框的按钮(基础控件)与下拉选项框
(截面控件，只使用垂直滚动条)。下拉框控件扩展了原生 SelectElement 的功能，允许指定下拉选项框的最大选项数量，在屏幕显示
不下的时候，会自动显示在下拉框的上方。在没有选项时，下拉选项框有一个选项的高度。下拉框控件允许使用键盘与滚轮操作，在下
拉选项框打开时，可以通过回车键或鼠标点击选择，上下键选择选项的当前条目，在关闭下拉选项框后，只要拥有焦点，就可以通过滚
轮上下选择选项。

下拉框控件直接HTML初始化的例子:
<select ecui="type:select;option-size:3" name="test">
    <!-- 这里放选项内容 -->
    <option value="值">文本</option>
    ...
    <option value="值" selected>文本</option>
    ...
</select>

如果需要自定义特殊的选项效果，请按下列方法初始化:
<div ec="type:select;name:test;option-size:3">
    <!-- 如果ec中不指定name，也可以在input中指定 -->
    <input name="test" />
    <!-- 这里放选项内容 -->
    <li value="值">文本</li>
    ...
</div>

属性
_nOptionSize - 下接选择框可以用于选择的条目数量
_cSelect     - 当前选中的选项
_uText       - 下拉框的文本框
_uButton     - 下拉框的按钮
_uOptions    - 下拉选择框
*/


    /**
     * 初始化下拉框控件
     * params 参数支持的属性如下：
     * optionSize 下拉框最大允许显示的选项数量，默认为5
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_SELECT =
        ui.Select = function (el, params) {
            var i = 0,
                typeClass = params.type,
                options = el.options,
                tmpEl = el,
                selectedIndex = -1,
                optionEl,
                o;

            if (options) {
                /* 是select标签，需要先转化 */
                el = insertAfter(createDom(), el);

                for (; o = options[i]; i++) {
                    optionEl = createDom('', el);
                    setText(optionEl, o.text);
                    optionEl.setAttribute('value', o.value);
                    /* 保存当前下拉框的选中项 */
                    if (o.selected) {
                        selectedIndex = i;
                    }
                }

                el.className = tmpEl.className;
                removeDom(tmpEl);

                /* 保存当前下拉框的名称 */
                params.name = tmpEl.name || params.name;
            }

            o = this._uOptions = createControl(
                'Panel',
                {
                    base: params.base + '-options',
                    element: insertFloor(el),
                    parent: DOCUMENT.body,
                    hScroll: false
                }
            );
            this._cScroll = o.$getSection('VScroll');
            UI_EDIT.call(this, el, params);
            coordinates(this.getBody());

            /* 将input对象隐藏 */
            this.getInput().style.display = 'none';

            /* 初始化下拉区域，下拉区域需要强制置顶 */
            o.hide();
            o.$setParent(this);
            el = o.getBody();
            o = o.getOuter().style;
            o.zIndex = 65535;
            o.position = 'absolute';

            /* 初始化下拉区域最多显示的选项数量 */
            this._nOptionSize = params.optionSize || 5;

            this.$append = blank;

            /* 初始化显示的文本框 */
            this._uText = createControl(
                'Item',
                {
                    base: typeClass + '-text',
                    parent: this,
                    capture: false
                }
            );

            /* 初始化下拉按钮 */
            (this._uButton = createControl(
                'Control',
                {
                    base: typeClass + '-button',
                    parent: this,
                    capture: false
                }
            )).getOuter().style.position = 'absolute';

            this.$setBody(el);
            /* 解决 IE 下刷新时，输入框的值回填的问题 */
            if (ieVersion) {
                this.$change = UI_SELECT_CHANGE;
            }

            delete this.$append;

            this.$initItems();

            /* 设置默认值 */
            selectedIndex >= 0 ? this.setSelected(selectedIndex) : this.setValue(this.getValue());
        },

        UI_SELECT_CLASS = inherits(UI_SELECT, UI_EDIT),
        UI_SELECT_ITEM = {};

    /**
     * IE 值发生改变默认处理事件，恢复原始的值，只触发一次。
     * @private
     */
    function UI_SELECT_CHANGE() {
        var selected = this._cSelect,
            value = this.getValue();

        delete this.$change;
        if (selected && selected._sValue != value) {
            /* 出现选中项与实际值不相等的原因是IE下input自动回填造成的，需要恢复数据 */
            this.setValue(value);
        }
    }

    /**
     * 下拉框刷新。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    function UI_SELECT_FLUSH(control) {
        var options = control._uOptions,
            scroll = control._cScroll,
            pos = getPosition(control.getOuter()),
            selected = control._cSelect,
            top = pos.top,
            optionTop = top + control.getHeight(),
            optionHeight = options.getHeight();

        if (options.isShow()) {
            /* 如果浏览器下部高度不够，将显示在控件的上部 */
            options.setPosition(
                pos.left,
                optionTop + optionHeight <= getView().bottom ? optionTop : top - optionHeight
            );

            options.paint();

            /* 如果有选项被选中，需要移动焦点到选项的位置 */
            selected && selected.$mouseover();

            scroll.setValue(scroll.getStep() * indexOf(control.getItems(), selected));
        }
    }

    /**
     * 移动当前的焦点选项
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     * @param {number} n 移动的数量，负数向前，正数向后
     * @param {boolean} roll 是否允许循环移动，按键时允许，鼠标滚轮时不允许
     * @return {ecui.ui.Item} 新的焦点选项
     */
    function UI_SELECT_MOVE(control, n, roll) {
        var items = control.getItems(),
            length = items.length,
            over = roll ? control.getOvered() : control._cSelect;

        if (length) {
            n = roll
                ? ((over ? indexOf(items, over) : n > 0 ? length - 1 : 0) + n + length) % length
                : indexOf(items, over) + n;

            if (n >= 0 && n < length) {
                over = items[n];
                over.$mouseover();
            }
        }

        return over;
    }

    copy(UI_SELECT_CLASS, UI_ITEMS);

    /**
     * 获取控件的值。
     * getValue 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 控件的值
     */
    UI_SELECT_ITEM.getValue = function () {
        return this._sValue;
    };

    /**
     * 下拉框选项的鼠标滚轮事件处理
     * @private
     *
     * @param {Event} Event 事件对象
     * @return {boolean} false--停止冒泡
     */
    UI_SELECT_ITEM.mousewheel = function (event) {
        this.getParent()._uOptions.mousewheel(event);
        return false;
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生增加/减少操作时调用此方法。
     * @protected
     */
    UI_SELECT_CLASS.$alterItems = function () {
        var options = this._uOptions,
            optionSize = this._nOptionSize,
            scroll = this._cScroll,
            step = scroll.getStep(),
            itemLength = this.getItems().length,
            itemWidth = options.getBodyWidth() - (itemLength > optionSize ? scroll.getWidth() : 0);

        /* 为了设置激活状态样式, 因此必须控制下拉框中的选项必须在滚动条以内 */
        this.setItemSize(itemWidth);

        /* 设置options框的高度，如果没有元素，至少有一个单位的高度 */
        options.setBodySize(0, (MIN(itemLength, optionSize) || 1) * step);
    };

    /**
     * 界面点击强制拦截事件的默认处理。
     * 控件在下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框，但不会改变控件激活状态。
     * @public
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$forcibly = function (event) {
        var target = event.getTarget();
        this._uOptions.hide();
        mask();

        /* 检查点击是否在当前下拉框的选项上 */
        target instanceof UI_ITEM && target.getParent() == this && this.setSelected(target);
    };

    /**
     * 添加子选项控件的自定义初始化事件。
     * @public
     *
     * @param {ecui.ui.Item} item 选项控件
     * @param {string} value 选项对应的表单项提交值，如果忽略将使用控件的文本内容作为提交值 
     */
    UI_SELECT_CLASS.$initItem = function (item, value) {
        var value = value === undefined ? item.getBase().getAttribute('value') : value;
        item.setSize(0, this._uText.getHeight(), true);
        item._sValue = value === null ? getText(item.getBody()) : value;

        copy(item, UI_SELECT_ITEM);
    };

    /**
     * 控件拥有焦点时，键盘按下事件的默认处理。
     * 接管上下键与回车键的处理，在下拉框展开时，通过上下键选择当前移入项，如果没有展开，通过下键与回车键会将下拉框展开。如果控件处于可操作状态(参见 isEnabled)，keydown 方法触发 onkeydown 事件，如果事件返回值不为 false，则调用 $keydown 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$keydown = function (event) {
        var which = event.which,
            items = this.getItems(),
            over = this.getOvered(),
            options = this._uOptions;

        if (getPressed() != this) {
            /* 当前不能存在鼠标操作，否则屏蔽按键 */
            if (!options.isShow()) {
                /* 显示下拉选项框 */
                if (which == 40 || which == 13) {
                    this.$pressstart();
                    this.$pressend();
                    return false;
                }
            }
            else if (which == 40 || which == 38) {
                var length = items.length,
                    optionSize = this._nOptionSize,
                    scroll = this._cScroll,
                    step = scroll.getStep(),
                    value = scroll.getValue() / step,
                    index = indexOf(items, UI_SELECT_MOVE(this, which == 40 ? 1 : - 1, true));

                scroll.skip(
                    (index < value ? index : index >= value + optionSize ? index - optionSize + 1: value) - value
                );
                return false;
            }
            else if (which == 13 || which == 27) {
                /* 回车键选中，ESC键取消 */
                options.hide();
                which == 13 && over && this.setSelected(over);
                mask();
                restore();
            }
        }
    };

    /**
     * 控件拥有焦点时，键盘按压事件的默认处理。
     * Opera 下仅用 keydown 不能屏蔽空格键事件，还需要在 keypress 中屏蔽。如果控件处于可操作状态(参见 isEnabled)，keypress 方法触发 onkeypress 事件，如果事件返回值不为 false，则调用 $keypress 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$keypress = function (event) {
        var which = getKey();
        return which < 37 || which > 40 || which == 13;
    };


    /**
     * 鼠标在控件区域滚动滚轮事件的默认处理。
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。如果控件处于可操作状态(参见 isEnabled)，mousewheel 方法触发 onmousewheel 事件，如果事件返回值不为 false，则调用 $mousewheel 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$mousewheel = function (event) {
        if (!this._uOptions.isShow()) {
            this.setSelected(UI_SELECT_MOVE(this, event.wheelDelta < 0 ? 1 : -1));
            return false;
        }
    };

    /**
     * 控件按压状态结束事件的默认处理。
     * 鼠标左键按压控件结束时设置下一次点击事件被拦截，需要根据点击的位置选择是关闭展开的下拉框还是选中选项。如果控件处于可操作状态(参见 isEnabled)，pressend 方法触发 onpressend 事件，如果事件返回值不为 false，则调用 $pressend 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$pressend = function (event) {
        UI_EDIT_CLASS.$pressend.call(this, event);
        /* 拦截之后的点击，同时屏蔽所有的控件点击事件 */
        forcibly(this);
        mask(0, 65534);
    };

    /**
     * 控件按压状态开始事件的默认处理。
     * 鼠标左键按压控件开始时显示下拉框。如果控件处于可操作状态(参见 isEnabled)，pressstart 方法触发 onpressstart 事件，如果事件返回值不为 false，则调用 $pressstart 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_SELECT_CLASS.$pressstart = function (event) {
        UI_EDIT_CLASS.$pressstart.call(this, event);
        this._uOptions.show();
        UI_SELECT_FLUSH(this);
    };

    /**
     * 控件移除子控件事件的默认处理。
     * 下拉框移除子选项时需要检查选项是否被选中，如果被选中需要清除状态。
     * @public
     *
     * @param {Item} item 选项控件
     */
    UI_SELECT_CLASS.$remove = function (item) {
        this._cSelect == item && this.setSelected();
        UI_ITEMS.$remove.call(this, item);
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_SELECT_CLASS.$setSize = function (width, height) {
        var o = this._uOptions;

        UI_EDIT_CLASS.$setSize.call(this, width, height);
        height = this.getBodyHeight();

        /* 设置选项框 */
        o.setSize(width);
        this._cScroll.setStep(height);
        this.setItemSize(0, height);

        /* 设置文本区域 */
        width = this.getBodyWidth() - height;
        this._uText.setSize(width, height, true);

        /* 设置下拉按钮 */
        o = this._uButton;
        o.setSize(height, height);
        o.setPosition(width, 0);

        this.$alterItems();
        UI_SELECT_FLUSH(this);
    };

    /**
     * 获取被选中的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 选项控件
     */
    UI_SELECT_CLASS.getSelected = function () {
        return this._cSelect;
    };

    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_SELECT_CLASS.setOptionSize = function (value) {
        if (value > 1) {
            this._nOptionSize = value;
            this.$alterItems();
            UI_SELECT_FLUSH(this);
        }
    };

    /**
     * 选中选项。
     * @public
     *
     * @param {number|ecui.ui.Item} item 选项的序号/选项控件
     */
    UI_SELECT_CLASS.setSelected = function (item) {
        var text = this._uText;

        /* 将选项序号转换成选项 */
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }

        if (this._cSelect != item) {
            if (item) {
                var el = item.getBody(),
                    value = item._sValue;

                text.$setBodyHTML(el.innerHTML);
                value = value !== undefined ? value : getText(el);
            }
            else {
                text.$setBodyHTML('');
                value = '';
            }
            UI_EDIT_CLASS.setValue.call(this, value);

            this._cSelect = item || null;
        }
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件的值，设置的值必须与一个子选项的值相等，否则将被设置为空，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 需要选中的值
     */
    UI_SELECT_CLASS.setValue = function (value) {
        /* 防止改变事件的重入 */
        var i = 0,
            items = this.getItems(),
            o;

        this.change = blank;
        for (; o = items[i++]; ) {
            if (o._sValue == value) {
                this.setSelected(o);
                break;
            }
        }

        /* 找不到满足条件的项，将选中的值清除 */
        o || this.setSelected();
        delete this.change;
    };

/*
Grid - 定义批量的标准尺寸的控件集的事件与基本操作。
网格控件，继承自基础控件，将大量相同大小的子控件按指定的行与列组合而成的控件。网格控件统一管理内部子控件的大小控制，所
有子控件的事件允许调用统一的事件方法，可用于日历、调色板等。

网格控件直接HTML初始化的例子:
<div ecui="type:grid;col:7;row:6">
    <!-- ul与li分别表示行列 -->
    <ul>
        <li>...</li>
        ...
    </ul>
    ...
</div>

属性
_nRow   - 子控件的行数
_nCol   - 子控件的列数
_aItem  - 子控件集合

子控件属性
_nIndex - 单一网格在整个网格控件中的编号
*/


    /**
     * 初始化网格控件
     * params 参数支持的属性如下：
     * col 网格的总列数
     * row 网格的总行数
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_GRID =
        ui.Grid = function (el, params) {
            /* 初始化标签内的子标签 */
            var items = this._aItem = [],
                rows = children(el),
                o = rows.length,
                row = this._nRow = params.row || o,
                col = 0,
                i = 0,
                j;

            UI_CONTROL.call(this, el, params);

            /* 查找一行中最多的列数，将节点先移除 */
            for (; o--; ) {
                col = MAX(col, (rows[o] = children(removeDom(rows[o]))).length);
            }

            col = this._nCol = params.col || col;

            /* 加载所有的子控件原始Element对象 */
            for (i = 0; i < row; ) {
                if (o = rows[i++]) {
                    for (j = 0; j < col; ) {
                        items.push(o[j++]);
                    }
                }
            }

            /* 初始化所有子控件，下面的maxCol变量保存的是defaultClass的值 */
            for (i = 0, j = col * row; i < j; ) {
                o = items[i] || createDom();
                setStyle(o, 'float', 'left');
                o = items[i] = createControl(
                    'Control',
                    {
                        element: o,
                        base: params.base + '-item',
                        parent: this,
                        type: params.type + '-item'
                    }
                );
                copy(o, UI_GRID_ITEM);

                /* 设置子控件在整个网格中的序号 */
                o._nIndex = i++;
            }
        },

        UI_GRID_CLASS = inherits(UI_GRID, UI_CONTROL),
        UI_GRID_ITEM = {};

    /**
     * 获取网格子控件在网格控件中的序号。
     * 在网格控件的事件中，事件对应的 this 是真正产生事件的网格子控件，通过 getIndex 方法能知道当前的网格子控件在网格控件中的序号，参见 getItem 方法。
     * @public
     *
     * @return {number} 子控件的序号
     */
    UI_GRID_ITEM.getIndex = function () {
        return this._nIndex;
    };

    /**
     * 设置控件的大小。
     * 网格控件的 $setSize 方法设置的大小不一定是实际控件的大小，为了保证子控件宽度与高度完全相等，内部可用区域的宽度与高度需要自动适应成各个子控件的大小的整数倍。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_GRID_CLASS.$setSize = function (width, height) {
        var items = this._aItem,
            col = this._nCol,
            row = this._nRow,
            i = 0,
            o,
            widthRevise = this.getWidthRevise(true),
            heightRevise = this.getHeightRevise(true);

        /* 计算每一个子控件的宽度与高度 */
        if (items.length) {
            width = FLOOR(((width ? width : this.getWidth(true)) - widthRevise) / col);
            height = FLOOR(((height ? height : this.getHeight(true)) - heightRevise) / row);

            for (; o = items[i++]; ) {
                o.setSize(width, height);
            }

            /* 设置实际的宽度与高度 */
            UI_CONTROL_CLASS.$setSize.call(this, width * col + widthRevise, height * row + heightRevise);
        }
    };

    /**
     * 获取指定的网格子控件。
     * 子控件的序号从行到列，逐一累加，例如，一个 3*3 的网格控件，第一行第一列序号为 0，第一行第二列序号为 1，第一行第三列序号为 2，第二行第一列序号为3，行二行第二列序号为 4，依此类推。
     * @public
     *
     * @param {number} row 子控件的行号，如果 col 参数被忽略，这里表示子控件的总序号
     * @param {number} col 子控件的列号
     * @return {ecui.ui.Control} 子控件对象
     */
    UI_GRID_CLASS.getItem = function (row, col) {
        return this._aItem[col === undefined ? row : row * this._nCol + col];
    };

    /**
     * 初始化事件处理函数，以事件名命名，这些函数行为均是判断控件是否可操作/是否需要调用事件/是否需要执行缺省的事件处
     * 理，对应的缺省事件处理函数名以$开头后接事件名，处理函数以及缺省事件处理函数参数均为事件对象，仅执行一次。这些函
     * 数都需要提供给内部的子控件使用，因此需要关联Grid控件。
     */
    (function () {
        for (var i = 0, list = [
            'focus', 'blur', 'click',
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'pressstart', 'pressover', 'pressmove', 'pressout', 'pressend'
        ], o; o = list[i++]; ) {
            UI_GRID_ITEM[o] = new Function(
                'e',
                'var o=this,p=o.getParent();o.isEnabled()&&(p.on'
                    + o + '&&p.on' + o + '.call(o,e)===false||p.$' + o + '.call(o,e))'
            );
        }
    })();

/*
Calendar - 定义日历显示的基本操作。
日历控件，继承自基础控件，内部包含了两个部件，分别是星期名称(网格控件)与日期(网格控件)。在日期网格控件里，第一行包含上
个月最后几天的信息，最后一行包含下个月最前几天的信息。日历控件不包含年/月/日的快速选择与切换，如果需要实现这些功能，请
将下拉框(选择月份)、输入框(输入年份)等组合使用建立新的控件或直接在页面上布局并调用接口。

日历控件直接HTML初始化的例子:
<div ecui="type:calendar;year:2009;month:11">
    <!-- 内部显示区域，用于不需要上下滚动页的日历上，或者是需要自定义样式，其中ul标签组重复6次 -->
    <ul>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        <li>...</li>
    </ul>
    ...
</div>

属性
_nYear      - 年份
_nMonth     - 月份(0-11)
_uNames     - 星期名称网格
_uDate      - 日期网格

子控件属性
_nDay       - 从本月1号开始计算的天数，如果是上个月，是负数，如果是下个月，会大于当月最大的天数
*/


    /**
     * 初始化日历控件
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params year--日历控件的年份，month--日历控件的月份(1-12)
     */
    var UI_CALENDAR =
        ui.Calendar = function (el, params) {
            /* 分别插入日期网格与星期名称网格需要使用的层，星期名称网格初始化 */
            var dateElement = insertFloor(el),
                i = 0,
                baseClass = params.base,
                items = this._uNames = createControl(
                    'Grid',
                    {
                        element: insertBefore(createDom(), dateElement),
                        base: baseClass + '-weekname',
                        col: 7,
                        row: 1
                    }
                ),
                /* 星期的名称 */
                WEEKNAMES = ['日', '一', '二', '三', '四', '五', '六'];

            UI_CONTROL.call(this, el, params);

            for (; i < 7; i++) {
                items.getItem(i).$setBodyHTML(WEEKNAMES[i]);
            }

            /* 日期网格初始化 */
            items = this._uDate = createControl(
                'Grid',
                {
                    element: dateElement,
                    base: baseClass + '-date',
                    col: 7,
                    row: 6
                }
            );
            items.$click = UI_CALENDAR_DATECLICK;

            this.setDate(params.year, params.month);
        },

        UI_CALENDAR_CLASS = inherits(UI_CALENDAR, UI_CONTROL);

    /**
     * 日期网格控件点击处理，将事件转发到日历控件的ondateclick事件上
     * @private
     *
     * @param {Event} event 事件对象
     */
    function UI_CALENDAR_DATECLICK(event) {
        var calendar = this.getParent().getParent(),
            day = this._nDay;

        UI_CONTROL_CLASS.$click.call(this, event);
        calendar.ondateclick && calendar.ondateclick(new Date(calendar._nYear, calendar._nMonth, day));
    }

    /**
     * 设置控件的大小。
     * 日历控件与 网格控件 类似，$setSize 方法设置的大小不一定是实际控件的大小，受到了内部部件的影响。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_CALENDAR_CLASS.$setSize = function (width, height) {
        var names = this._uNames,
            date = this._uDate;

        names.$setSize(width);
        date.$setSize(width);

        /* 设置实际的宽度与高度 */
        UI_CONTROL_CLASS.$setSize.call(
            this,
            date.getWidth() + this.getWidthRevise(true),
            names.getHeight() + date.getHeight() + this.getHeightRevise(true)
        );
    };

    /**
     * 获取日历控件当前显示的月份。
     * @public
     *
     * @return {number} 月份(1-12)
     */
    UI_CALENDAR_CLASS.getMonth = function () {
        return this._nMonth + 1;
    };

    /**
     * 获取日历控件当前显示的年份。
     * @public
     *
     * @return {number} 年份(19xx-20xx)
     */
    UI_CALENDAR_CLASS.getYear = function () {
        return this._nYear;
    };

    /**
     * 日历显示移动指定的月份数。
     * 参数为正整数则表示向当前月份之后的月份移动，负数则表示向当前月份之前的月份移动，设置后日历控件会刷新以显示新的日期。
     * @public
     *
     * @param {number} offsetMonth 日历移动的月份数
     */
    UI_CALENDAR_CLASS.move = function (offsetMonth) {
        var time = new Date(this._nYear, this._nMonth + offsetMonth, 1);
        this.setDate(time.getFullYear(), time.getMonth() + 1);
    };

    /**
     * 设置日历控件当前显示的日期。
     * @public
     *
     * @param {number} year 年份(19xx-20xx)，如果省略使用浏览器的当前年份
     * @param {number} month 月份(1-12)，如果省略使用浏览器的当前月份
     */
    UI_CALENDAR_CLASS.setDate = function (year, month) {
        var today = new Date(),
            year = year || today.getFullYear(),
            month = month ? month - 1 : today.getMonth();

        if (this._nYear != year || this._nMonth != month) {
            this._nYear = year;
            this._nMonth = month;

            today = today.getDate();

            for (
                /* 得到上个月的最后几天的信息，用于补齐当前月日历的上月信息位置 */
                var time = new Date(year, month, 0),
                    index = day = 1 - (time.getDay() + 1) % 7,
                    lastDayOfLastMonth = time.getDate(),
                    date = this._uDate,
                    i = 0,
                    /* 得到当前月的天数 */
                    time = new Date(year, month + 1, 0),
                    lastDayOfCurrMonth = time.getDate();
                month = date.getItem(i);
                i++, day++
            ) {
                /* 以下year变量表示日期是否为当月的flag，month变量表示日期单元格控件o */
                year = day > 0 && day <= lastDayOfCurrMonth;
                month.setEnabled(year);
                month.$setBodyHTML(year ? day : day <= 0 ? lastDayOfLastMonth + day : day - lastDayOfCurrMonth);
                /* 判断是否为当天 */
                month.alterClass('today', day != today);
                month._nDay = day;
            }

            this.change();
        }
    };

/*
Form - 定义独立于文档布局的内容区域的基本操作。
窗体控件，继承自基础控件，内部包含了三个部件，分别是标题栏(基础控件)、关闭按钮(基础控件)与内容区域(截面控件)。窗体控件
仿真浏览器的多窗体效果，如果在其中包含 iframe 标签，可以在当前页面打开一个新的页面，避免了使用 window.open 在不同浏览
器下的兼容性问题。多个窗体控件同时工作时，当前激活的窗体在最上层。窗体控件的标题栏默认可以拖拽，窗体可以设置置顶方式显
示，在置顶模式下，只有当前窗体可以响应操作。窗体控件的 z-index 从256开始，页面开发请不要使用大于或等于 256 的 z-index 
值。

窗体控件直接HTML初始化的例子:
<div ecui="type:form;hide:true">
    <!-- 标题可以没有 -->
    <label>窗体的标题</label>
    <!-- 这里放窗体的内容 -->
    ...
</div>

属性
_nTitleAuto - 标题栏自适应方式
_uTitle     - 标题栏
_uClose     - 关闭按钮
*/


    /**
     * 初始化窗体控件
     * params 参数支持的属性如下：
     * hide      窗体是否需要默认隐藏
     * titleAuto width表示title自适应宽度，height表示title自适应高度
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_FORM =
        ui.Form = function (el, params) {
            /* 生成标题控件与内容区域控件对应的Element对象 */
            var baseClass = params.base,
                o = first(el);

            o = o && o.tagName == 'LABEL' ? o : createDom();
            this._nTitleAuto = params.titleAuto;
            UI_PANEL.call(this, el, params);

            params.hide && this.hide();

            /* 初始化标题区域 */
            params = this._uTitle = createControl(
                'Control',
                {
                    element: o,
                    parent: el,
                    base: baseClass + '-title'
                }
            );
            params.$mousedown = UI_FORM_TITLEMOUSEDOWN;
            params.getOuter().style.position = 'absolute';
            o.onmousedown = custom;
            /* 屏蔽IE下的选中操作 */
            o.onselectstart = cancel;

            /* 初始化关闭按钮 */
            params = this._uClose = createControl(
                'Control',
                {
                    parent: el,
                    base: baseClass + '-close'
                }
            );
            params.$click = UI_FORM_CLOSECLICK;
            params.getOuter().style.position = 'absolute';

            /* 计算当前窗体显示的层级 */
            this.getOuter().style.zIndex = UI_FORM_ALL.push(this) - 1 + UI_FORM_BASEINDEX;
        },

        UI_FORM_CLASS = inherits(UI_FORM, UI_PANEL),
        /* 窗体zIndex样式的基准值 */
        UI_FORM_BASEINDEX = 4096,
        /* 当前全部初始化的窗体 */
        UI_FORM_ALL = [];

    /**
     * 窗体关闭按钮点击事件，关闭窗体
     * @private
     *
     * @params {Event} event 事件对象
     */
    function UI_FORM_CLOSECLICK(event) {
        UI_CONTROL_CLASS.$click.call(this, event);
        this.getParent().hide();
    }

    /**
     * 标题栏鼠标按压事件处理，需要触发拖动，如果当前窗体未得到焦点则得到焦点
     * @private
     *
     * @param {Event} event 事件对象
     */
    function UI_FORM_TITLEMOUSEDOWN(event) {
        var form = this.getParent();

        UI_CONTROL_CLASS.$click.call(this, event);
        form.contain(getFocused()) || setFocused(form);
        drag(form, event);

        event.preventDefault();
    }

    /**
     * 控件获得焦点事件的默认处理。
     * 窗体控件获得焦点时需要将自己置于所有窗体控件的顶部。如果控件处于可操作状态(参见 isEnabled)，focus 方法触发 onfocus 事件，如果事件返回值不为 false，则调用 $focus 方法。
     * @protected
     */
    UI_FORM_CLASS.$focus = function () {
        var i = indexOf(UI_FORM_ALL, this),
            o;

        UI_PANEL_CLASS.$focus.call(this);

        if (this.getOuter().style.zIndex < 32768) {
            /* 如果不是showModal模式，将当前窗体置顶 */
            UI_FORM_ALL.push(UI_FORM_ALL.splice(i, 1)[0]);
            for (; o = UI_FORM_ALL[i]; ) {
                o.getOuter().style.zIndex = UI_FORM_BASEINDEX + i++;
            }
        }
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_FORM_CLASS.$setSize = function (width, height) {
        var titleAuto = this._nTitleAuto,
            title = this._uTitle,
            vscroll = this.$getSection('VScroll'),
            hscroll = this.$getSection('HScroll');

        UI_PANEL_CLASS.$setSize.call(this, width, height);

        this._uTitle.setSize(
            titleAuto == 'width' ? this.getBodyWidth() : 0,
            titleAuto == 'height' ? this.getBodyHeight() : 0
        );

        if (vscroll && vscroll.isShow() && titleAuto == 'width') {
            titleAuto = title.getHeight();
            vscroll.setPosition(vscroll.getX(), titleAuto);
            vscroll.$setSize(0, vscroll.getHeight() - titleAuto);
        }
        else if (hscroll && hscroll.isShow() && titleAuto == 'height') {
            titleAuto = title.getWidth();
            hscroll.setPosition(titleAuto, hscroll.getY());
            hscroll.$setSize(hscroll.getWidth() - titleAuto);
        }
    };

    /**
     * 隐藏控件。
     * 如果窗体是以 showModal 方式打开的，隐藏窗体时，需要恢复页面的状态。
     * @public
     */
    UI_FORM_CLASS.hide = function () {
        UI_PANEL_CLASS.hide.call(this);
        this.getOuter().style.zIndex == 32768 && mask();
    };

    /**
     * 设置窗体控件标题。
     * @public
     *
     * @param {string} text 窗体标题
     */
    UI_FORM_CLASS.setTitle = function (text) {
        this._uTitle.$setBodyHTML(text);
    };

    /**
     * 显示控件。
     * 显示窗体控件时，需要将窗体控件设置为获得焦点状态，即窗体控件或者子控件拥有焦点。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_FORM_CLASS.show = function () {
        var result = UI_PANEL_CLASS.show.call(this);
        this.contain(getFocused()) || setFocused(this);
        return result;
    };

    /**
     * 窗体以独占方式显示
     * showModal 方法将窗体控件以独占方式显示，此时鼠标点击窗体以外的内容无效，关闭窗体后自动恢复。
     * @public
     */
    UI_FORM_CLASS.showModal = function () {
        this.show();
        this.getOuter().style.zIndex = 32768;
        mask(0.05);
    };

/*
Tree - 定义树形结构的基本操作。
树控件，继承自基础控件，不可以被改变大小。树控件可以包含普通子控件或者子树控件，普通子控件显示在它的文本区域，如果是子
树控件，将在专门的子树控件区域显示。子树控件区域可以被收缩隐藏或是展开显示，默认情况下点击树控件就改变子树控件区域的状
态。

树控件直接HTML初始化的例子:
<div ecui="type:tree;fold:true">
    <!-- 当前节点的文本，如果没有整个内容就是节点的文本 -->
    <label>节点的文本</label>
    <!-- 这里放子控件，如果需要fold某个子控件，将子控件的style="display:none"即可 -->
    <li>子控件文本</li>
    ...
</div>

属性
_sItemsDisplay - 隐藏时_eItems的状态，在显示时恢复
_eItems        - 子控件区域Element对象
_aTree         - 子控件集合
*/


    /**
     * 初始化树控件
     * params 参数支持的属性如下：
     * fold 子树是否收缩，默认为展开
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_TREE =
        ui.Tree = function (el, params) {
            var items = first(el),
                baseClass = params.base,
                i = 0,
                o;

            UI_CONTROL.call(this, el, params);

            this._aTree = [];

            /* 检查是否存在label标签，如果是需要自动初始化树的子结点 */
            if (items && items.tagName == 'LABEL') {
                /* 将label抽取出来作为当前树结点的文本，其它结点先移除 */
                o = this._eItems = insertFloor(el);
                el.appendChild(items);

                /* 生成子结点的容器标签 */
                UI_TREE_SETITEMS(this);

                /* 初始化子控件 */
                for (items = children(o); o = items[i++]; ) {
                    params.element = o;
                    this.add(this.$createChild(params));
                }
            }

            /* 改变默认的展开状态 */
            if (!el.offsetWidth || params.fold) {
                el.style.display = '';
                this.setFold();
            }
        },

        UI_TREE_CLASS = inherits(UI_TREE, UI_CONTROL);

    /**
     * 设置树控件的选项组 Element 对象。
     * @private
     *
     * @param {ecui.ui.Tree} control 树控件
     */
    function UI_TREE_SETITEMS(control) {
        var items = control._eItems,
            typeClass = control.getType(),
            baseClass = control.getBaseClass();

        if (items) {
            items.className = typeClass + '-items ' + (typeClass != baseClass ? baseClass + '-items' : '');
            if (!items.getControl) {
                insertAfter(items, control.getOuter());
                $bind(items, control);
            }
        }
    }

    /**
     * 树控件刷新，根据子树控件的数量及显示的状态设置样式，分为 -empty(没有子树控件)、-fold(子树收缩)与普通样式三种。
     * @private
     *
     * @param {ecui.ui.Tree} control 树控件
     */
    function UI_TREE_FLUSH(control) {
        control.setClass(
            control.getBaseClass() + (control._aTree.length ? control._eItems.offsetWidth ? '' : '-fold' : '-empty')
        );
    }

    /**
     * 鼠标单击控件事件的默认处理。
     * 控件点击时改变子树控件的显示/隐藏状态。如果控件处于可操作状态(参见 isEnabled)，click 方法触发 onclick 事件，如果事件返回值不为 false，则调用 $click 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_TREE_CLASS.$click = function (event) {
        var el = this._eItems;
        UI_CONTROL_CLASS.$click.call(this, event);
        el && this.setFold(!!el.offsetWidth);
    };

    /**
     * 建立子树控件。
     * $createChild 方法会递归的创建子树。
     * @protected
     *
     * @param {Object} params 初始化参数，参见 create 方法。
     * @return {ecui.ui.Tree} 子树控件
     */
    UI_TREE_CLASS.$createChild = function (params) {
        return createControl('Tree', params);
    };

    /**
     * 销毁控件的默认处理。
     * @protected
     */
    UI_TREE_CLASS.$dispose = function () {
        this._eItems = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 无效，树控件禁止设置大小。
     * @protected
     */
    UI_TREE_CLASS.$resize = UI_TREE_CLASS.$setSize = blank;

    /**
     * 添加子树控件。
     * @public
     *
     * @param {string|ecui.ui.Tree} item 子树控件的 html 内容/树控件
     * @param {number} index 子树控件需要添加的位置序号，不指定将添加在最后
     * @return {ecui.ui.Tree} 树控件
     */
    UI_TREE_CLASS.add = function (item, index) {
        var o = item,
            items = this._aTree;

        if ('string' == typeof item) {
            item = this.$createChild({base: this.getBaseClass()});
            item.$setBodyHTML(o);
        }
        item.setParent(this);

        if (item.getParent() && (o = items[index]) != item) {
            items.splice(index, 0, items.pop());
            items = item._eItems;
            items && insertAfter(items, insertBefore(item.getOuter(), o.getOuter()));
        }
        return item;
    };

    /**
     * 获取当前树控件的所有子树控件。
     * getTrees 方法返回使用 add 方法或 setParent 方法调用声明父子关系的树控件。
     * @public
     *
     * @return {Array} 树控件列表
     */
    UI_TREE_CLASS.getChildTrees = function () {
        return this._aTree;
    };

    /**
     * 获取当前树控件的第一个子树控件。
     * @public
     *
     * @return {ecui.ui.Tree} 树控件，如果没有，返回 null
     */
    UI_TREE_CLASS.getFirst = function () {
        return this._aTree[0] || null;
    };

    /**
     * 获取当前树控件的最后一个子树控件。
     * @public
     *
     * @return {ecui.ui.Tree} 树控件，如果没有，返回 null
     */
    UI_TREE_CLASS.getLast = function () {
        var items = this._aTree;
        return items[items.length - 1] || null;
    };

    /**
     * 获取当前树控件的后一个同级树控件。
     * @public
     *
     * @return {ecui.ui.Tree} 树控件，如果没有，返回 null
     */
    UI_TREE_CLASS.getNext = function () {
        var items = this.getParent();

        if (items instanceof UI_TREE) {
            items = items._aTree;
            return items[indexOf(items, this) + 1] || null;
        }
    };

    /**
     * 获取当前树控件的前一个同级树控件。
     * @public
     *
     * @return {ecui.ui.Tree} 树控件，如果没有，返回 null
     */
    UI_TREE_CLASS.getPrev = function () {
        var items = this.getParent();

        if (items instanceof UI_TREE) {
            items = items._aTree;
            return items[indexOf(items, this) - 1] || null;
        }
    };

    /**
     * 隐藏控件。
     * 隐藏树控件的同时需要将子树区域也隐藏。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_TREE_CLASS.hide = function () {
        var o = this._eItems,
            result = UI_CONTROL_CLASS.hide.call(this);
        if (result && o) {
            o = o.style;
            this._sItemsDisplay = o.display;
            o.display = 'none';
        }
        return result;
    };

    /**
     * 显示/隐藏子控件区域。
     * setFold 方法将触发各级父树控件的 onchange 事件。
     * @public
     *
     * @param {boolean} status 如果为 false 表示显示子树控件，否则为隐藏子树控件
     */
    UI_TREE_CLASS.setFold = function (status) {
        status = status !== false;

        if (this._aTree.length) {
            this._eItems.style.display = status ? 'none' : '';
            UI_TREE_FLUSH(this);
            this.change();
        }
    };

    /**
     * 设置当前控件的父控件。
     * 树控件调用 setParent 方法时，如果父控件也是树控件，则树控件将作为父控件的子树控件之一，参见 getChildTrees 方法。
     * @public
     *
     * @param {HTMLElement|ecui.ui.Control|ecui.ui.Tree} parent 父控件对象/父 Element 对象，忽略参数则将控件移出 DOM 树
     */
    UI_TREE_CLASS.setParent = function (parent) {
        var o = this.getParent(),
            el;

        if (o instanceof UI_TREE) {
            /* 先将树结点从上级树控件中移除 */
            items = o._aTree;
            remove(items, this);
            UI_TREE_FLUSH(o);
        }

        o = parent instanceof UI_TREE;
        if (o) {
            el = parent._eItems;

            if (!el) {
                el = parent._eItems = createDom();
                UI_TREE_SETITEMS(parent);
            }
        }

        UI_CONTROL_CLASS.setParent.call(this, el);

        if (o) {
            parent._aTree.push(this);
            UI_TREE_FLUSH(parent);
        }

        el = this._eItems;
        /* 如果包含子结点容器，需要将子结点容器显示在树控件之后 */
        if (el) {
            parent ? insertAfter(el, this.getOuter()) : removeDom(el);
        }
    };

    /**
     * 显示控件。
     * 显示树控件的同时需要将子树区域也显示。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_TREE_CLASS.show = function () {
        var display = this._sItemsDisplay;
        if (UI_CONTROL_CLASS.show.call(this) && display !== undefined) {
            this._eItems.style.display = display;
            this._sItemsDisplay = undefined;
            return true;
        }
    };


/*
Table - 定义由行列构成的表格的基本操作。
表格控件，继承自截面控件，内部包含一个部件——标题区(基础控件)。表格控件对基本的 TableElement 功能进行了扩展，表头固定，
不会随表格的垂直滚动条滚动而滚动，在行列滚动时，支持整行整列移动，允许直接对表格的数据进行增加/删除/修改操作。

表格控件直接HTML初始化的例子:
<table ecui="type:table">
    <!-- 当前节点的列定义，如果有特殊格式，需要使用width样式 -->
    <tr>
        <th>标题</th>
        ...
    </tr>
    <!-- 这里放单元格序列 -->
    <tr>
        <td>单元格一</td>
        ...
    </tr>
    ...
</table>

属性
_eCol           - 鼠标按下时的列
_aCol           - 表头的列控件对象
_aRow           - 表格数据行对象
_cEditedRow          - 表格正在编辑的行
_uHead          - 表头区域

表头列属性
_nPos           - 列的坐标
_cEditor        - 编辑控件

行属性
_nPos           - 行的坐标
_eCol          - 当前移入的列元素
_aCol           - 行的列Element对象
*/


    /**
     * 初始化表格控件
     * @public
     *
     * @param {HTMLElement} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_TABLE =
        ui.Table = function (el, params) {
            var baseClass = params.base,
                typeClass = params.type,
                j = ['VScroll', 'HScroll'];

            this._aRow = [];
            this._aCol = [];

            if (el.tagName == 'TABLE') {
                var elements = first(el),
                    o = el;

                /* 获取全部的行节点，有些浏览器工作模式可能没有tbody */
                elements = children(elements && elements.tagName == 'TBODY' ? elements : el);
                data = elements.splice(0, 1)[0];

                /* 建立新的table区域 */
                el = insertAfter(createDom(), el);
                el.className = o.className;
                el.style.cssText = o.style.cssText;

                /* 移除之前的 table 标签 */
                removeDom(o);
            }

            params.wheelDelta = 1;
            UI_PANEL.call(this, el, params);

            /* 取消flush调用 */
            this.lockFlush();

            /* 设置滚动条操作 */
            while (o = j.pop()) {
                if (o = this['_c' + o] = this.$getSection(o)) {
                    o.setValue = UI_TABLE_SCROLL_SETVALUE;
                }
            }

            /* 初始化表头区域 */
            o = this._uHead = createControl(
                'Control',
                {
                    element: el = createDom(
                        '<div style="overflow:hidden;position:absolute;top:0px" class="' + baseClass
                            + '-area"><div style="white-space:nowrap;position:absolute">'
                            + UI_TABLE_ROWHTML(data ? '' : '<tr></tr>')
                            + '</div></div>',
                        el
                    ),
                    type: typeClass + '-area'
                }
            );
            el = el.getElementsByTagName('tbody')[0];
            o.$setBody(data ? el.appendChild(data) : el.lastChild);

            if (data) {
                /* 初始化表头 */
                for (var i = 0, data = children(data); o = data[i]; i++) {
                    this.addCol(o);
                    o = UI_TABLE_GETINFO(o.getControl());
                    for (j = 0; params = elements[j]; j++) {
                        params = (i ? params : (elements[j] = children(params)))[i];
                        addClass(params, o.n);
                        params._sClass = o.c;
                        params.style.width = o.w;
                    }
                }

                el = this.getBody();

                /* 初始化数据 */
                for (i = 0; data = elements[i++]; ) {
                    o = createDom(UI_TABLE_ROWHTML('', baseClass, typeClass), el);
                    o.lastChild.lastChild.appendChild(data[0].parentNode);
                    this.$initRow(o, i);
                }
            }

            this.paint = blank;
            this.lockFlush(false);
            delete this.paint;
        },

        UI_TABLE_CLASS = inherits(UI_TABLE, UI_PANEL),
        UI_TABLE_ROW = UI_TABLE.Row = {},
        UI_TABLE_COL = {};

    /**
     * 表格控件改变显示区域值。
     * 表格控件改变显示区域时，每次尽量移动一个完整的行或列的距离。
     * @private
     *
     * @param {number} value 控件的当前值
     */
    function UI_TABLE_SCROLL_SETVALUE(value) {
        var oldValue = this.getValue(),
            list = this.getParent()[this instanceof UI_VSCROLL ? '_aRow' : '_aCol'],
            i = 1;

        value = MIN(MAX(value, 0), this.getTotal());

        if (value > oldValue) {
            for (;; i++) {
                /* 计算后移的新位置 */
                if (value <= list[i]._nPos) {
                    break;
                }
            }
        }
        else if (value < oldValue) {
            for (i = list.length; i--; ) {
                /* 计算前移的新位置 */
                if (value >= list[i]._nPos) {
                    break;
                }
            }
        }
        else {
            return;
        }

        UI_SCROLL_CLASS.setValue.call(this, list[i]._nPos);
    }

    /**
     * 单元格移出处理，将单元格的-over状态样式清除
     * @private
     *
     * @param {ecui.ui.Table} control 表格行控件
     * @param {HTMLElement} col 发生事件的列元素
     * @param {Event} event 事件对象
     */
    function UI_TABLE_CELLOUT(row, col, event) {
        var oncellout = row.getParent().oncellout;
        oncellout && oncellout.call(col, event) === false || removeClass(col, col._sClass + '-over');
    }

    /**
     * 根据信息生成用于 innerHTML 的字符串
     * @private
     *
     * @param {string|Object} param1 baseClass 或者是 getInfo 的结果
     * @param {string} param2 typeClass 或者是 TD 中默认需要填充的内容
     * @return {string} innerHTML 字符串，如果param1是baseClass或没有值，返回行html，否则返回列html
     */
    function UI_TABLE_COLHTML(param1, param2) {
        return '<td class="' + param1.n + '" style="width:' + param1.w + '">' + (param2 || '&nbsp;') + '</td>';
    }

    /**
     * 单元格双击处理，如果当前列设置了编辑对象，将进入编辑模式
     * @private
     */
    function UI_TABLE_DBLCLICK() {
        var row = findControl(this);
	row.getParent()._aCol && row.getParent()._aCol[indexOf(row._aCol, this)]._cEditor && row.edit();
    }

    /**
     * 表格控件头部刷新。
     * @private
     *
     * @param {ecui.ui.Table} control 表格控件
     */
    function UI_TABLE_FLUSHHEAD(control) {
        var vscroll = control._cVScroll,
            dataWidth = control._uHead.getBody().offsetWidth,
            value = vscroll && vscroll.isShow() ? vscroll.getWidth() : 0;

        if (control._cHScroll.isShow()) {
            delete control._nTableWidth;
        }
        else {
            control._nTableWidth || (control._nTableWidth = control.getWidth());
            control.$setSize(dataWidth + value + control.getWidthRevise());
        }
        control._uHead.setSize(control.getBodyWidth() - value);
    }

    /**
     * 获取指定的列的基本信息。
     * @private
     *
     * @param {ecui.ui.Control} col 列控件
     * @return {Object} w--列的宽度，l--列的左填充，r--列的右填充，c--列的基本样式名，n--列TD的class属性
     */
    function UI_TABLE_GETINFO(col) {
        var el = col.getBase(),
            baseClass = col.getClass(),
            typeClass = col.getType(),
            itemClass = baseClass.replace(/-head$/, '') + '-item';

        return {
            w: getStyle(el, 'width'),
            c: itemClass,
            n: itemClass + (baseClass != typeClass ? ' ' + typeClass.replace(/-head$/, '') + '-item' : '')
        };
    }

    /**
     * 获取当前事件发生的列元素
     * @private
     *
     * @param {ecui.ui.Table.Row} row 表格行控件
     * @param {Event} event 事件对象
     * @return {HTMLElement} 当前事件发生的列元素
     */
    function UI_TABLE_GETTARGET(row, event) {
        for (var i = 0, o; o = row._aCol[i++]; ) {
            if (contain(o, event.target)) {
                return o;
            }
        }
    }

    /**
     * 根据信息生成用于一行的 innerHTML 字符串
     * @private
     *
     * @param {string} trHTML 需要填充的 tr 的 HTML 字符串
     * @param {string} baseClass 基本样式
     * @param {string} typeClass 类型样式
     * @return {string} innerHTML 字符串
     */
    function UI_TABLE_ROWHTML(trHTML, baseClass, typeClass) {
        return (typeClass
            ? '<div style="position:relative" class="' + baseClass + '-row '
                + (baseClass != typeClass ? typeClass + '-row' : '') + '">'
            : '')
            + '<table cellspacing="0" style="border-spacing:0px;table-layout:fixed"><tbody>'
            + trHTML
            + '</tbody></table>'
            + (typeClass ? '</div>' : '');
    }

    /**
     * 行点击处理，将点击事件转发到表格控件中
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_TABLE_ROW.$click = function (event) {
        var onrowclick = this.getParent().onrowclick;
        UI_CONTROL_CLASS.$click.call(this, event);
        onrowclick && onrowclick.call(this, event);
    };

    /**
     * 销毁控件的默认处理。
     * @private
     */
    UI_TABLE_ROW.$dispose = function () {
        this._aCol = this._eCol = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 行鼠标按下处理，将鼠标按下事件转发到表格控件中，同时计算需要产生鼠标按下事件的单元格。
     * @private
     *
     * @param {Event} event 事件对象
     * @return {boolean} 是否继续执行默认的处理，为false取消，其它值继续
     */
    UI_TABLE_ROW.$mousedown = function (event) {
        var table = this.getParent(),
            col = table._eCol = UI_TABLE_GETTARGET(this, event),
            oncelldown = table.oncelldown,
            onrowdown = table.onrowdown;

        col && oncelldown && oncelldown.call(col, event);
        onrowdown && onrowdown.call(this, event);

        UI_CONTROL_CLASS.$mousedown.call(this, event);
    };

    /**
     * 行鼠标移动处理，将鼠标移动事件转发到表格控件中，同时计算需要产生鼠标移入/移出/移动事件的单元格。
     * @private
     *
     * @param {Event} event 事件对象
     * @return {boolean} 是否继续执行默认的处理，为false取消，其它值继续
     */
    UI_TABLE_ROW.$mousemove = function (event) {
        var table = this.getParent(),
            oldCol = this._eCol,
            col = this._eCol = UI_TABLE_GETTARGET(this, event),
            onrowmove = table.onrowmove,
            oncellout = table.oncellout,
            oncellmove = table.oncellmove;

        if (oldCol != col) {
            /* 产生了单元格移入/移出操作 */
            oldCol && UI_TABLE_CELLOUT(this, oldCol, event);
            if (col) {
                oncellout && oncellout.call(col, event) === false || addClass(col, col._sClass + '-over');
            }
        }

        col && oncellmove && oncellmove.call(col, event);
        onrowmove && onrowmove.call(this, event);

        UI_CONTROL_CLASS.$mousemove.call(this, event);
    };

    /**
     * 行鼠标移出处理，将鼠标移出事件转发到表格控件中，同时计算需要产生鼠标移出事件的单元格。
     * @private
     *
     * @param {Event} event 事件对象
     * @return {boolean} 是否继续执行默认的处理，为false取消，其它值继续
     */
    UI_TABLE_ROW.$mouseout = function (event) {
        var onrowout = this.getParent().onrowout,
            oldCol = this._eCol;

        /* 行移出需要移出单元格 */
        this._eCol = null;
        oldCol && UI_TABLE_CELLOUT(this, oldCol, event);
        onrowout && onrowout.call(this, event);

        UI_CONTROL_CLASS.$mouseout.call(this, event);
    };

    /**
     * 行鼠标移入处理，将鼠标移入事件转发到表格控件中。
     * @private
     *
     * @param {Event} event 事件对象
     * @return {boolean} 是否继续执行默认的处理，为false取消，其它值继续
     */
    UI_TABLE_ROW.$mouseover = function (event) {
        var onrowover = this.getParent().onrowover;
        onrowover && onrowover.call(this, event);

        UI_CONTROL_CLASS.$mouseover.call(this, event);
    };

    /**
     * 行鼠标弹起处理，将鼠标弹起事件转发到表格控件中，同时计算需要产生鼠标弹起事件的单元格。
     * @private
     *
     * @param {Event} event 事件对象
     * @return {boolean} 是否继续执行默认的处理，为false取消，其它值继续
     */
    UI_TABLE_ROW.$mouseup = function (event) {
        var table = this.getParent(),
            col = UI_TABLE_GETTARGET(this, event),
            oncellup = table.oncellup,
            onrowup = table.onrowup;

        col && oncellup && oncellup.call(col, event);
        onrowup && onrowup.call(this, event);

        UI_CONTROL_CLASS.$mouseup.call(this, event);
    };

    /**
     * 行鼠标按压结束处理，释放单元格的鼠标按下状态
     * @private
     */
    UI_TABLE_ROW.$pressend = function (event) {
        var table = this.getParent(),
            col = UI_TABLE_GETTARGET(this, event),
            oncellclick = table.oncellclick;

        col && table._eCol == col && oncellclick && oncellclick.call(col);
        table._eCol = null;

        UI_CONTROL_CLASS.$pressend.call(this);
    };

    /**
     * 编辑当前行的内容。
     * edit 方法使表格进入编辑状态，需要使用 save 或者 cancel 方法来结束编辑状态。
     * @public
     */
    UI_TABLE_ROW.edit = function () {
        var table = this.getParent(),
            i = 0,
            o = table._cEditedRow;

        if (!o || this != o && (!this.onsave || this.onsave() !== false)) {
            table.save();
            table._cEditedRow = this;
            for (; o = table._aCol[i]; ) {
                var editor = o._cEditor,
                    rowCol = this._aCol[i++];
                if (editor) {
                    /* 设置控件的大小与初始值 */
                    o.onupdate && o.onupdate(editor) === false || editor.setValue(getText(rowCol));
                    o = insertFloor(rowCol);
                    o.style.cssText = 'overflow:hidden;white-space:nowrap';
                    editor.setParent(rowCol);
                    editor.getOuter().style.top = getStyle(rowCol, 'paddingTop');
                    editor.setSize(o.offsetWidth, o.offsetHeight);
                    /* 不改变单元格原始的大小 */
                    o.style.cssText = 'visibility:hidden';
                }
            }
        }
    };

    /**
     * 设置整列的样式。
     * $setStyles 方法批量设置一列所有单元格的样式，但不包括表头的单元格。
     * @protected
     *
     * @param {string} name 样式的名称
     * @param {string} value 样式的值
     */
    UI_TABLE_COL.$setStyles = function (name, value) {
        var table = this.getParent().getParent(),
            colIndex = indexOf(table._aCol, this),
            i = 0,
            flag = name == 'textOverflow' && value && table.flushCols == blank,
            dataWidth = 0,
            o;

        if (flag) {
            for (; o = table._aCol[i++]; ) {
                if (o.isShow()) {
                    dataWidth += o.getWidth();
                }
            }
            this.getParent().getBase().lastChild.lastChild.style.width = dataWidth + 'px';
            i = 0;
        }

        /* 设置每一数据行中列的样式 */
        for (; o = table._aRow[i++]; ) {
            if (flag) {
                o.getBase().lastChild.style.width = dataWidth + 'px';
            }
            setStyle(o._aCol[colIndex], name, value);
            o.clearCache();
        }

        table.paint();
    };

    /**
     * 隐藏整列
     * @public
     *
     * @return {boolean} 状态是否改变，即之前是否为显示状态
     */
    UI_TABLE_COL.hide = function () {
        var result = UI_CONTROL_CLASS.hide.call(this);
        result && this.$setStyles('display', 'none');
        return result;
    };

    /**
     * 设置指定列的编辑控件。
     * 需要编辑的列必须使用 setEditor 方法设置相应的编辑控件，在表格进入编辑状态时，编辑控件会出现在对应的单元格
     * 中。
     * @public
     *
     * @param {ecui.ui.Input} editor 编辑控件
     */
    UI_TABLE_COL.setEditor = function (editor) {
        /* 处于编辑状态不能设置 */
        if (!this.getParent().getParent()._cEditedRow) {
            editor.getOuter().style.position = 'absolute';
            this._cEditor = editor;
        }
    };

    /**
     * 设置指定列是否为省略状态。
     * 如果设置成省略状态，即当前列内容实际宽度超过列宽时，部分内容显示为省略号。
     * @public
     *
     * @param {boolean} status 是否为省略状态，默认为设置成省略状态
     */
    UI_TABLE_COL.setEllipsis = function (status) {
        status = status !== false;
        this._bEllipsis = status;
        status = status ? 'ellipsis' : '';

        this.$setStyles('textOverflow', status);
        setStyle(this.getBody(), 'textOverflow', status);
    };

    /**
     * 设置整列的宽度。
     * @public
     *
     * @param {number} width 列的宽度
     */
    UI_TABLE_COL.setSize = function (width) {
        var ellipsis = this._bEllipsis;
        ellipsis && this.setEllipsis(false);

        UI_CONTROL_CLASS.setSize.call(this, width);
        this.$setStyles('width', getStyle(this.getOuter(), 'width'));

        ellipsis && this.setEllipsis(ellipsis);
    };

    /**
     * 显示整列。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_TABLE_COL.show = function () {
        var result = UI_CONTROL_CLASS.show.call(this);
        result && this.$setStyles('display', '');
        return result;
    };

    /**
     * 销毁控件的默认处理。
     * @protected
     */
    UI_TABLE_CLASS.$dispose = function () {
        this._eCol = null;
        UI_PANEL_CLASS.$dispose.call(this);
    };

    /**
     * 表格控件所有列刷新。
     * @protected
     */
    UI_TABLE_CLASS.$flushCols = function () {
        var head = this._uHead,
            dataWidth = 0,
            base = this.getBase(),
            i = 0,
            o = head.getBody().offsetHeight;

        this._nTableWidth && this.$setSize(this._nTableWidth);

        /* 设置表头的大小 */
        head.setSize(0, o);
        head.getOuter().style.left = sumStyles(base, 'paddingLeft') + 'px';
        base.style.paddingTop = o + 'px';

        /* 计算数据区域的宽度 */
        for (; o = this._aCol[i++]; ) {
            o._nPos = dataWidth;
            if (o.isShow()) {
                dataWidth += o.getWidth();
            }
        }

        head.getBase().lastChild.lastChild.style.width = dataWidth + 'px';
    };

    /**
     * 表格控件所有行刷新。
     * @protected
     */
    UI_TABLE_CLASS.$flushRows = function () {
        var vscroll = this._cVScroll,
            hscroll = this._cHScroll,
            head = this._uHead,
            i = 0,
            dataWidth = sumStyles(head.getBase().lastChild.lastChild, 'width'),
            dataHeight = 0,
            o;

        for (; o = this._aRow[i++]; ) {
            o.getBase().lastChild.style.width = dataWidth + 'px';
            o._nPos = dataHeight;
            dataHeight += o.getHeight();
        }

        /* 计算宽度与高度是否需要自动扩展 */
        this.$setSize(
            hscroll
                ? 0
                : dataWidth + (vscroll && this.getBodyHeight() < dataHeight ? vscroll.getWidth() : 0)
                    + this.getWidthRevise(),
            vscroll
                ? 0
                : dataHeight + (hscroll && this.getBodyWidth() < dataWidth ? hscroll.getHeight() : 0)
                    + this.getHeightRevise()
        );

        /* 如果显示滚动条，需要改变表头区域的宽度 */
        hscroll ? UI_TABLE_FLUSHHEAD(this) : head.setBodySize(dataWidth);
    };

    /**
     * 初始化一行的数据。
     * @protected
     *
     * @param {HTMLElement} row 一行的DIV对象
     * @param {number} index 行的序列号
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.$initRow = function (row, index) {
        for (
            var i = 0,
                el = row.getElementsByTagName('tr')[0],
                row = $fastCreate(UI_CONTROL, row, {type: this.getType() + '-row'}),
                cols = row._aCol = children(el),
                o;
            o = cols[i];
        ) {
            this._aCol[i++]._bEllipsis && setStyle(o, 'textOverflow', 'ellipsis');
            o.ondblclick = UI_TABLE_DBLCLICK;
        }

        row.$setBody(el);

        /* 设置行控件事件代理 */
        copy(row, UI_TABLE_ROW);
        row.getCol = this.getCol;

        this._aRow.splice(index, 0, row);
        return row;
    };

    /**
     * 控件大小发生变化的默认处理。
     * @protected
     */
    UI_TABLE_CLASS.$resize = function () {
        var hscroll = this._cHScroll;

        UI_PANEL_CLASS.$resize.call(this);
        this._cVScroll || this.$setSize(
            0,
            this.getBody().offsetHeight
                + this.getHeightRevise() + (hscroll && hscroll.isShow() ? hscroll.getHeight() : 0)
        );
        hscroll && UI_TABLE_FLUSHHEAD(this);
    };

    /**
     * 表格控件对显示记录滚动。
     * @protected
     */
    UI_TABLE_CLASS.$scroll = function () {
        UI_PANEL_CLASS.$scroll.call(this);
        this._uHead.getBase().lastChild.style.left = this.getBody().style.left;
    };

    /**
     * 表格新增一列。
     * addCol 方法向表格控件中添加一列，如果表格控件中已经包含数据，对应的列数据为空。调用 addCol 方法时，如果参数是 Element 对象，则相应的参数将从这个 Element 对象中取得后完全重新生成列控件。params 参数对象支持的属性如下：
     * width     {number} 列的宽度
     * baseClass {string} 列的基本样式
     * title     {string} 列的标题
     * @public
     *
     * @param {HTMLElement|Object} {params} 列的 Element(TD,TH) 对象或者是列的基本信息
     * @param {number} index 被添加的列的位置序号，如果不合法将添加在最后
     */
    UI_TABLE_CLASS.addCol = function (params, index) {
        var cols = this._aCol,
            i = 0,
            o = this._uHead.getBody(),
            el = cols[index];

        if (params.tagName) {
            var width = params.style.width,
                baseClass = params.className.split(/\s+/)[0];
        }
        else {
            width = params.width;
            baseClass = params.base;
            params = createDom('<th>' + (trim(params.title) || '&nbsp;') + '</th>');
        }

        if (el) {
            insertBefore(params, el.getOuter());
        }
        else {
            index = cols.length;
            o.appendChild(params);
        }

        /* 在表头增加一列 */
        width = /%$/.test(width) ? FLOOR(this.getWidth() * PARSEINT(width) / 100) : PARSEINT(width);
        params.style.width = width + 'px';
        o = createControl(
            'Control',
            {
                base: baseClass || this.getClass() + '-head',
                element: params,
                type: this.getType() + '-head'
            }
        );
        params.style.height = '';
        o.$setSize(width);

        /* 设置表头列的缺省属性 */
        copy(o, UI_TABLE_COL);
        cols.splice(index, 0, o);

        /* text表示列信息对象 */
        params = UI_TABLE_GETINFO(o);

        /* 设置缺省的数据 */
        for (; o = this._aRow[i++]; ) {
            cols = o._aCol;
            cols.splice(
                index,
                0,
                el = o.getBody().insertBefore(createDom(UI_TABLE_COLHTML(params)), cols[index] || null)
            );
            el._sClass = params.c;
            el.ondblclick = UI_TABLE_DBLCLICK;
        }

        this.paint();
    };

    /**
     * 表格新增一行。
     * @public
     *
     * @param {Array} data 数据源(一维数组)
     * @param {number} index 被添加的行的位置序号，如果不合法将添加在最后
     */
    UI_TABLE_CLASS.addRow = function (data, index) {
        var i = 0,
            htmls = ['<tr>'],
            classes = [],
            rows = this._aRow,
            row = rows[index],
            o;

        if (row) {
            row = row.getOuter();
        }
        else {
            row = null;
            index = rows.length;
        }

        row = this.getBody().insertBefore(createDom(UI_TABLE_ROWHTML('', this.getClass(), this.getType())), row);

        for (; o = this._aCol[i]; ) {
            o = UI_TABLE_GETINFO(o);
            classes.push(o.c);

            /* 设置列的样式 */
            htmls.push(UI_TABLE_COLHTML(o, data[i++]));
        }

        /* 初始化行内一列的数据 */
        o = createDom(htmls.join('') + '</tr>', row.lastChild.lastChild);
        this.$initRow(row, index);

        for (i = 0, o = o.firstChild; o; o = o.nextSibling) {
            o._sClass = classes[i++];
        }

        this.$flushRows();
    };

    /**
     * 表格新增多行。
     * @public
     *
     * @param {Array} data 数据源(二维数组)
     * @param {number} index 被添加的行的位置序号，如果不合法将添加在最后
     */
    UI_TABLE_CLASS.addRows = function (data, index) {
        var i = 0,
            flag = this.$flushRows == blank,
            o;

        flag || (this.$flushRows = blank);

        for (; o = data[i++]; ) {
            this.addRow(o, index++);
        }

        if (!flag) {
            delete this.$flushRows;
            this.$flushRows();
        }
    };

    /**
     * 结束编辑状态，编辑的内容恢复编辑前的值。
     * 当表格在编辑状态时，调用 cancel 方法会恢复编辑前的内容，如果需要保存编辑的内容，请使用 save 方法，如果表格没有处于编辑状态中，调用 cancel 方法没有任何作用。
     * @public
     */
    UI_TABLE_CLASS.cancel = function () {
        var i = 0,
            editRow = this._cEditedRow,
            col;

        if (editRow) {
            /* 当前行处于编辑状态才能取消 */
            this._cEditedRow = null;

            for (; col = this._aCol[i]; ) {
                var editor = col._cEditor,
                    colEl = editRow._aCol[i++];

                if (editor) {
                    editor.setParent();
                    colEl.innerHTML = colEl.firstChild.innerHTML;
                }
            }

            this.$flushRows();
        }
    };

    /**
     * 获取指定单元格的 Element(TD,TH) 对象。
     * @public
     *
     * @param {number} rowIndex 单元格的行数，从0开始
     * @param {number} colIndex 单元格的列数，从0开始
     * @return {HTMLElement} 单元格的 Element(TD,TH) 对象
     */
    UI_TABLE_CLASS.getCell = function (rowIndex, colIndex) {
        rowIndex = this._aRow[rowIndex];
        return rowIndex && rowIndex._aCol[colIndex] || null;
    };

    /**
     * 获取列控件/列 Element 对象。
     * 列控件只是通常的称呼，实际上就是普通的基础控件，提供了一些针对整列进行操作的方法，包括 setEditor、setEllipsis、
     * setSize(仅能设置宽度)、hide 与 show 等。如果是在行控件中调用，返回的是行内对应列的 Element 对象。
     * @public
     *
     * @param {number} index 列数，从0开始
     * @return {ecui.ui.Table.Col|Element} 列控件/列 Element 对象
     */
    UI_TABLE_CLASS.getCol = function (index) {
        return this._aCol[index] || null;
    };

    /**
     * 获取表格中所有的列控件。
     * @public
     *
     * @return {Array} 列控件列表
     */
    UI_TABLE_CLASS.getCols = function () {
        return this._aCol;
    };

    /**
     * 获取行控件。
     * @public
     *
     * @param {number} index 行数，从0开始
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.getRow = function (index) {
        return this._aRow[index] || null;
    };

    /**
     * 获取表格中所有的行控件。
     * @public
     *
     * @return {Array} 行控件列表
     */
    UI_TABLE_CLASS.getRows = function () {
        return this._aRow;
    };

    /**
     * 锁定/解除锁定刷新操作。
     * 锁定刷新操作后相关的操作不会触发任何刷新功能，在解除锁定后恢复，并自动刷新。
     * @public
     *
     * @param {boolean} isLock 不为 false 表示锁定，否则表示解除锁定
     */
    UI_TABLE_CLASS.lockFlush = function (isLock) {
        if (isLock !== false) {
            this.$flushCols = this.$flushRows = blank;
        }
        else {
            delete this.$flushCols;
            delete this.$flushRows;
            this.paint();
        }
    };

    /**
     * 控件刷新。
     * paint 方法将导致控件整体重绘，在通常情况下，建议控件改变的状态进行重绘，而不是调用 paint 方法。
     * @public
     */
    UI_TABLE_CLASS.paint = function () {
        this.$flushCols();
        this.$flushRows();
    };

    /**
     * 表格移除一列。
     * @public
     *
     * @param {number} index 列号，从0开始计数
     */
    UI_TABLE_CLASS.removeCol = function (index) {
        var o = this._aCol.splice(index, 1)[0],
            i = 0;

        if (o) {
            /* 移除列的表头 */
            o.setParent();

            /* 移除每一数据行中的列 */
            for (; o = this._aRow[i++]; ) {
                removeDom(o._aCol.splice(index, 1)[0]);
                o.clearCache();
            }

            this.paint();
        }
    };

    /**
     * 表格移除一行。
     * @public
     *
     * @param {number} index 行号，从0开始计数
     */
    UI_TABLE_CLASS.removeRow = function (index) {
        if (index = this._aRow.splice(index, 1)[0]) {
            index.setParent();
            this.$flushRows();
        }
    };

    /**
     * 表格移除所有的行。
     * @public
     */
    UI_TABLE_CLASS.removeRows = function () {
	var rows = this.getRows(), i = rows.length,
            flag = this.$flushRows == blank;

        flag || (this.$flushRows = blank);

        while (i--) {
            this.removeRow(i);
        }

        if (!flag) {
            delete this.$flushRows;
            this.$flushRows();
        }
    };

    /**
     * 结束编辑状态，保存编辑的内容回写至表格控件中。
     * 当表格在编辑状态时，调用 save 方法会保存编辑的内容，如果需要恢复编辑前的内容，请使用 cancel 方法，如果表格没有
     * 处于编辑状态中，调用 save 方法没有任何作用。
     * @public
     */
    UI_TABLE_CLASS.save = function () {
        var i = 0,
            editRow = this._cEditedRow,
            col;

        if (editRow) {
            /* 当前行处于编辑状态才能取消 */
            this._cEditedRow = null;

            for (; col = this._aCol[i]; ) {
                var editor = col._cEditor,
                    colEl = editRow._aCol[i++];

                if (editor) {
                    editor.setParent();
                    editor = editor.getValue();
                    if (col._bEllipsis) {
                        setStyle(colEl, 'textOverflow', '');
                        setText(colEl, editor);
                        setStyle(colEl, 'textOverflow', 'ellipsis');
                    }
                    else {
                        colEl.innerHTML = '';
                        setText(colEl, editor);
                    }
                }
            }

            this.$flushRows();
        }
    };

/*
Table - 定义允许左右锁定若干列显示的高级表格的基本操作。
允许锁定左右两列的高级表格控件，继承自表格控件，内部包含两个部件——锁定的表头区(基础控件)与锁定的行内容区(基础控件)。

表格控件直接HTML初始化的例子:
<table ecui="type:locked-table;left-lock:2;right-lock:1">
    <!-- 当前节点的列定义，如果有特殊格式，需要使用width样式 -->
    <tr>
        <th>标题</th>
        ...
    </tr>
    <!-- 这里放单元格序列 -->
    <tr>
        <td>单元格一</td>
        ...
    </tr>
    ...
</table>

属性
_nLeftLock   - 左边需要锁定的列数
_nRightLock  - 右边需要锁定的列数
_aLockedRow  - 用于显示锁定区域的行控件数组
_uLockedHead - 锁定的表头区
_uLockedMain - 锁定的行内容区
*/

    /**
     * 初始化高级表格控件
     * params 参数支持的属性如下：
     * left-lock  左边需要锁定的列数
     * right-lock 右边需要锁定的列数
     * @public
     *
     * @param {HTMLElement} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_LOCKED_TABLE =
        ui.LockedTable = function (el, params) {
            var baseClass = params.base,
                typeClass = params.type,
                left = this._nLeftLock = params.leftLock || 0,
                right = this._nRightLock = params.rightLock || 0,
                lockedEl = createDom(
                    '<div style="position:absolute;top:0px;left:0px"><div class="' + baseClass
                        + '-area" style="overflow:hidden">'
                        + UI_TABLE_ROWHTML('<tr><th style="padding:0px"></th></tr>')
                        + '</div><div class="' + baseClass + '-layout" style="overflow:hidden;position:relative">'
                        + '<div style="white-space:nowrap;position:absolute;top:0px;left:0px;"></div></div></div>'
                ),
                areaEl,

                /* 初始化锁定的行区域 */
                o = this._uLockedMain = createControl(
                    'Control',
                    {
                        element: areaEl = lockedEl.lastChild,
                        type: typeClass + '-layout'
                    }
                );
            o.$setBody(areaEl.lastChild);

            this._aLockedRow = [];
            UI_TABLE.call(this, el, params);

            var cols = this._aCol,
                i = cols.length;

            insertBefore(lockedEl, this.getBase().firstChild);
            o.$setParent(this);

            /* 初始化锁定的表头区域 */
            o = this._uLockedHead = createControl(
                'Control',
                {
                    element: areaEl = lockedEl.firstChild,
                    type: typeClass + '-area'
                }
            );
            o.$setBody(areaEl = areaEl.getElementsByTagName('tr')[0]);

            /* 填充锁定的表头列 */
            for (right = i - right; i--; ) {
                o = cols[i].getOuter();
                i < left ? insertBefore(o, areaEl.firstChild) : i >= right && insertAfter(o, areaEl.firstChild);
            }
        },

        UI_LOCKED_TABLE_CLASS = inherits(UI_LOCKED_TABLE, UI_TABLE),
        UI_LOCKED_TABLE_ROW = {};

    /**
     * 设置锁定行的宽度
     * @private
     *
     * @param {ecui.ui.Table} control 表格控件
     * @param {number} width 锁定行宽度
     * @param {number} midWidth 锁定行中间空白区域宽度
     * @param {boolean} isFlush 是否由刷新操作调用
     */
    function UI_LOCKED_TABLE_SETWIDTH(control, width, midWidth, isFlush) {
        var hscroll = control._cHScroll,
            o = control._uLockedHead,
            left = control._nLeftLock,
            i = 0,
            rowWidth = width + 'px';

        midWidth = midWidth + 'px';

        o.getBase().lastChild.style.width = rowWidth;
        children(o.getBody())[left].style.width = midWidth;
        o.$setSize(width);
        control._uLockedMain.$setSize(width);

        for (; o = control._aLockedRow[i++]; ) {
            o.getBase().lastChild.style.width = rowWidth;
            children(o.getBody())[left].style.width = midWidth;
            isFlush && UI_LOCKED_TABLE_SYNCHEIGHT(o, o._cJoint);
        }
    }

    /**
     * 设置两个控件的高度相等
     * @private
     *
     * @param {ecui.ui.Control} control1 控件1
     * @param {ecui.ui.Control} control2 控件2
     */
    function UI_LOCKED_TABLE_SYNCHEIGHT(control1, control2) {
        var el1 = control1.getBody().parentNode.parentNode, el2 = control2.getBody().parentNode.parentNode, height;
        el1.style.height = el2.style.height = '';
        height = MAX(el1.offsetHeight, el2.offsetHeight);
        el1.style.height = el2.style.height = height + 'px';
        control1.$setSize(0, height);
        control2.$setSize(0, height);
        return height;
    }

    /**
     * 表格控件所有列刷新。
     * @protected
     */
    UI_LOCKED_TABLE_CLASS.$flushCols = function () {
        for (
            var i = 0,
                cols = this._aCol,
                el = this.getBase(),
                style = el.style,
                right = cols.length - this._nRightLock,
                el = el.firstChild.lastChild,
                leftWidth = sumStyles(el, 'borderLeftWidth'),
                rightWidth = sumStyles(el, 'borderRightWidth'),
                width = this.getWidth(),
                value,
                o;
            o = cols[i];
            i++
        ) {
            if (o.isShow()) {
                value = o.getWidth();
                if (i < this._nLeftLock) {
                    leftWidth += value;
                    o.isShow = cancel;
                }
                else if (i >= right) {
                    rightWidth += value;
                    o.isShow = cancel;
                }
            }
        }
        style.paddingLeft = leftWidth + 'px';
        style.paddingRight = rightWidth + 'px';

        this.$setSize(width);
        UI_TABLE_CLASS.$flushCols.call(this);

        for (i = 0; o = cols[i++]; ) {
            delete o.isShow;
        }

        style.paddingTop = UI_LOCKED_TABLE_SYNCHEIGHT(this._uHead, this._uLockedHead) + 'px';
    };

    /**
     * 表格控件所有行刷新。
     * @protected
     */
    UI_LOCKED_TABLE_CLASS.$flushRows = function () {
        var el = this.getBase(),
            layout = el.firstChild.lastChild,
            vscroll = this._cVScroll;

        UI_TABLE_CLASS.$flushRows.call(this);

        /* 计算锁定的头部显示的宽度 */
        vscroll = vscroll && vscroll.isShow() ? vscroll.getWidth() : 0;

        UI_LOCKED_TABLE_SETWIDTH(
            this,
            this.getWidth(true) - sumStyles(el, 'borderLeftWidth', 'borderRightWidth') - vscroll,
            this.getBodyWidth() - (this._cHScroll ? vscroll :
                sumStyles(el, 'paddingLeft', 'paddingRight')
                - sumStyles(layout, 'borderLeftWidth', 'borderRightWidth')),
            true
        );

        UI_TABLE_CLASS.$flushRows.call(this);
        this._uLockedMain.$setSize(0, this.getBodyHeight());
    };

    /**
     * 初始化一行的数据。
     * @protected
     *
     * @param {HTMLElement} row 一行的DIV对象
     * @param {number} index 行的序列号
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_LOCKED_TABLE_CLASS.$initRow = function (row, index) {
        var row = UI_TABLE_CLASS.$initRow.call(this, row, index),
            typeClass = this.getType(),
            el = createDom(UI_TABLE_ROWHTML(
                '<tr class="' + row.getBody().className + '"><td style="padding:0px"></td></tr>',
                this.getBaseClass(), typeClass), this._uLockedMain.getBody()
            ),
            /* 生成用于锁定的行控件 */
            o = $fastCreate(
                UI_CONTROL,
                el,
                {type: typeClass + '-row'}
            ),
            cols = o._aCol = row._aCol,
            i = cols.length,
            right = i - this._nRightLock;

        copy(o, UI_TABLE_ROW);
        o.$setBody(el = el.getElementsByTagName('tr')[0]);

        this._aLockedRow.splice(index, 0, o);
        copy(row, UI_LOCKED_TABLE_ROW);
        copy(o, UI_LOCKED_TABLE_ROW);
        row._cJoint = o;
        o._cJoint = row;

        for (; i--; ) {
            o = cols[i];
            i < this._nLeftLock ? insertBefore(o, el.firstChild) : i >= right && insertAfter(o, el.firstChild);
        }

        return row;
    };

    /**
     * 控件大小发生变化的默认处理。
     * @protected
     */
    UI_LOCKED_TABLE_CLASS.$resize = function () {
        var value = this._cVScroll,
            hscroll = this._cHScroll,
            lockedHead = this._uLockedHead,
            col = sumStyles(lockedHead.getBase().lastChild, 'width')
                - sumStyles(children(lockedHead.getBody())[this._nLeftLock], 'width');

        UI_TABLE_CLASS.$resize.call(this);

        /* 计算锁定的头部显示的宽度 */
        value = this.getWidth(true) - sumStyles(this.getBase(), 'borderLeftWidth', 'borderRightWidth')
            - (value && value.isShow() ? value.getWidth() : 0);
        UI_LOCKED_TABLE_SETWIDTH(this, value, value - col);

        this.$setSize(this.getWidth(), this.getHeight());
    };

    /**
     * 表格控件滚动条滚动时的显示区域刷新。
     * @protected
     */
    UI_LOCKED_TABLE_CLASS.$scroll = function () {
        UI_TABLE_CLASS.$scroll.call(this);
        this._uLockedMain.getBody().style.top = this.getBody().style.top;
    };

    /**
     * 初始化需要执行关联控制的行控件鼠标事件的默认处理。
     * 行控件鼠标事件发生时，需要通知关联的行控件也同步产生默认的处理。
     * @protected
     */
    (function () {
        for (
            var i = 0, list = [
                    'blur', 'focus', 'click',
                    'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
                    'pressstart', 'pressover', 'pressmove', 'pressout', 'pressend'
            ], name;
            name = list[i++];
        ) {
                name = '$' + name;
                UI_LOCKED_TABLE_ROW[name] = new Function(
                    '',
                    '(ecui.ui.Table.Row.' + name + '||ecui.ui.Control.prototype.' + name
                        + ').apply(this,arguments);ecui.ui.Control.prototype.' + name + '.apply(this._cJoint,arguments)'
                );
        }
    })();


/*
Popup - 定义弹出菜单项的基本操作。
弹出菜单控件，继承自基础控件，实现了选项组接口。弹出式菜单操作时不会改变当前已经激活的对象，任何点击都将导致弹出菜单消
失，弹出菜单默认向右展开子菜单，如果右部已经到达浏览器最边缘，将改为向左显示。

弹出菜单控件直接HTML初始化的例子:
<div ecui="type:popup;name:test">
    <!-- 这里放选项内容 -->
    <li>菜单项</li>
    ...
    <!-- 包含子菜单项的菜单项 -->
    <li>
        <label>菜单项</label>
        <!-- 这里放子菜单项 -->
        <li>子菜单项</li>
        ...
    </li>
    ...
</div>

类属性
_cFocus     - 当前拥有焦点的弹出菜单控件

属性
_cSuperior  - 上一级被激活的弹出菜单控件
_cInferior  - 下一级被激活的弹出菜单控件

子菜单项属性
_cPopup     - 是否包含下级弹出菜单
*/


    /**
     * 初始化弹出菜单控件
     * @public
     *
     * @param {HTMLElement} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_POPUP =
        ui.Popup = function (el, params) {
            var i = 0,
                o;

            UI_CONTROL.call(this, el, params);
            el = this.getOuter().style;

            /* 初始化菜单项 */
            this.setParent(DOCUMENT.body);
            this.$initItems();
            this.$alterItems();

            el.display = 'none';
            el.position = 'absolute';

            /* 弹出菜单初始化完成后就不允许改变父对象 */
            this.setParent = blank;

            /* 初始化子弹出菜单 */
            for (el = this.getItems(); o = el[i++]; ) {
                o._cPopup && o.setClass(params.base + '-item-complex');
            }
        },

        UI_POPUP_CLASS = inherits(UI_POPUP, UI_CONTROL),
        UI_POPUP_ITEM = {},
        UI_POPUP_FOCUS;

    /**
     * 创建子弹出菜单并初始化
     * @private
     *
     * @param {ecui.ui.Control} item 需要创建子弹出菜单的菜单项
     * @param {HTMLElement} el 关联的 Element 对象
     *
     * @return {ecui.ui.Popup} 弹出菜单控件
     */
    function UI_POPUP_CREATE(item, el) {
        var popup = item._cPopup = createControl(
            'Popup',
            {
                base: item.getParent().getClass(),
                element: el
            }
        );

        popup.$setParent(item);
        return popup;
    }

    /**
     * 菜单项点击的默认处理
     * @protected
     *
     * @params {Event} event 事件对象
     */
    UI_POPUP_ITEM.$click = function (event) {
        UI_ITEM_CLASS.$click.call(this, event);
        this.getChildItems().length || UI_POPUP_FOCUS.$blur();
    },

    /**
     * 菜单项左键点击的默认处理
     * @protected
     *
     * @params {Event} event 事件对象
     */
    UI_POPUP_ITEM.$mousedown = function (event) {
        UI_ITEM_CLASS.$mousedown.call(this, event);
        event.preventDefault();
    };

    /**
     * 菜单项移入的默认处理
     * @protected
     *
     * @params {Event} event 事件对象
     */
    UI_POPUP_ITEM.$mouseover = function (event) {
        var inferior = this._cPopup,
            popup = this.getParent(),
            superior = popup.getSuperior(),
            o = popup._cInferior,
            pos = getPosition(this.getOuter()),
            view = getView();

        /* 改变菜单项控件的显示状态 */
        UI_ITEM_CLASS.$mouseover.call(this, event);

        if (o != inferior) {
            /* 隐藏之前显示的下级弹出菜单控件 */
            o && o.hide();

            if (inferior && inferior.getItems()[0]) {

                /* 计算子菜单应该显示的位置 */
                var x = pos.left,
                    width = inferior.getWidth();

                o = x + this.getWidth() - 4;
                x -= width - 4;

                /* 优先计算延用之前的弹出顺序的应该的位置 */
                if (superior && superior.getX() > popup.getX() && x > view.left || o + width > view.right) {
                    o = x;
                }

                /* 显示新的子弹出菜单 */
                inferior.setPosition(o, pos.top - 4);
                inferior.show();
            }
        }
    };

    /**
     * 菜单项移出的默认处理
     * @protected
     *
     * @params {Event} event 事件对象
     */
    UI_POPUP_ITEM.$mouseout = function (event) {
        this.getChildItems()[0] || this.getParent().clearOvered();
    };

    /**
     * 菜单项按压结束的默认处理
     * @protected
     *
     * @params {Event} event 事件对象
     */
    UI_POPUP_ITEM.$pressend = function (event) {
        UI_ITEM_CLASS.$pressend.call(this, event);
        event.getTarget() != this && UI_POPUP_FOCUS.$blur();
    };

    /**
     * 添加子选项控件。
     * 弹出菜单控件与弹出菜单子选项控件都包含 add 方法，用于添加子选项控件。如果位置序号不合法，子选项控件将添加在末尾的位置。
     * @public
     *
     * @param {string|Element|ecui.ui.Item} item 选项控件的 html 内容/控件对应的 Element 对象/选项控件
     * @param {number} index 子选项控件需要添加的位置序号
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_POPUP_ITEM.add = function (item, index) {
        return (this._cPopup || UI_POPUP_CREATE(this)).add(item, index);
    };

    /**
     * 获取当前菜单选项控件的所有子选项控件。
     * @public
     *
     * @return {Array} 子选项控件列表，如果不存在返回空列表
     */
    UI_POPUP_ITEM.getChildItems = function () {
        var childPopup = this._cPopup;
        return childPopup ? childPopup.getItems() : [];
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生增加/减少操作时调用此方法。
     * @protected
     */
    UI_POPUP_CLASS.$alterItems = function () {
        var parentItem = this.getParent(),
            items = this.getItems(),
            length = items.length,
            height = 0;

        parentItem && parentItem.setClass(parentItem.getBaseClass() + (length ? '-complex' : ''));
        for (; length--; ) {
            height += items[length].getHeight();
        }

        this.setBodySize(0, height);
        this.setItemSize(this.getBodyWidth());
    };

    /**
     * 控件失去焦点事件的默认处理。
     * 弹出菜单控件失去焦点时需要隐藏自己，参见 hide 方法。如果控件处于可操作状态(参见 isEnabled)，blur 方法触发 onblur 事件，如果事件返回值不为 false，则调用 $blur 方法。
     * @protected
     */
    UI_POPUP_CLASS.$blur = function () {
        for (var popup = this, o; o = popup._cSuperior; popup = o);
        popup.hide();
    };

    /**
     * 界面点击强制拦截事件的默认处理。
     * 弹出菜单需要强制拦截浏览器的点击事件，关闭弹出菜单。
     * @protected
     */
    UI_POPUP_CLASS.$forcibly = function () {
        UI_POPUP_FOCUS.$blur();
        return false;
    };

    /**
     * 添加子选项控件的自定义初始化事件。
     * $initItem 方法在添加子选项控件时被调用，用于控件特殊的初始化，$initItem 方法的参数与 add 方法类似，第一个参数是选项控件，第二个参数是 add 方法中的第三个参数，第三个参数是 add 方法中的第四个参数，依此类推。
     * @protected
     *
     * @param {ecui.ui.Item} item 选项控件
     */
    UI_POPUP_CLASS.$initItem = function (item) {
        var el = item.getBody(),
            label = first(el);

        copy(item, UI_POPUP_ITEM);
        item.getBase().onmousedown = custom;

        if (label && label.tagName == 'LABEL') {
            removeDom(label);
            /* 拥有子弹出菜单，需要初始化 */
            this.$createChild(item, insertFloor(el));
            el.appendChild(label);
        }
    };

    UI_POPUP_CLASS.$createChild = UI_POPUP_CREATE;

    /**
     * 获取上级弹出菜单。
     * @public
     *
     * @return {ecui.ui.Popup} 弹出菜单控件
     */
    UI_POPUP_CLASS.getSuperior = function () {
        var parentItem = this.getParent();
        return parentItem && parentItem.getParent() || null;
    };

    /**
     * 隐藏控件。
     * 隐藏弹出菜单，同时隐藏所有的子弹出菜单。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_POPUP_CLASS.hide = function () {
        var superior = this._cSuperior,
            inferior = this._cInferior,
            result = UI_CONTROL_CLASS.hide.call(this);
        
        if (result) {
            /* 已经移入的菜单选项需要移出 */
            this.clearOvered();
            inferior && inferior.hide();

            UI_POPUP_FOCUS = superior;
            superior ? (superior._cInferior = null) : restore();
        }

        return result;
    };

    /**
     * 显示控件。
     * 显示弹出菜单时，必须保证弹出菜单显示在屏幕内，并且子弹出菜单展开的方向尽可能一致。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_POPUP_CLASS.show = function () {
        var result = UI_CONTROL_CLASS.show.call(this),
            view = getView(),
            el = this.getOuter(),
            pos = getPosition(el);

        if (result) {
            /* 限制弹出菜单不能超出屏幕 */
            this.setPosition(
                MIN(MAX(pos.left, view.left), view.right - this.getWidth()),
                MIN(MAX(pos.top, view.top), view.bottom - this.getHeight())
            );

            if (UI_POPUP_FOCUS) {
                /* 如果之前存在已弹出的菜单 */
                el.style.zIndex = sumStyles(UI_POPUP_FOCUS.getOuter(), 'zIndex') + 1;
                this._cSuperior = UI_POPUP_FOCUS;
                UI_POPUP_FOCUS._cInferior = this;
            }
            else {
                /* 第一个弹出菜单，需要屏蔽鼠标点击 */
                el.style.zIndex = 32768;
                forcibly(this);
            }

            UI_POPUP_FOCUS = this;
        }

        return result;
    };

    copy(UI_POPUP_CLASS, UI_ITEMS);


﻿/*
Listbox - 定义了多项选择的基本操作。
多选框控件，继承自截面控件，实现了选项组接口，扩展了多选的 SelectElement 的功能，允许使用鼠标拖拽进行多项选择，多个交
换框，可以将选中的选项在互相之间移动。多选框控件也可以单独的使用，选中的选项在表单提交时将被提交。

多选框控件直接HTML初始化的例子:
<div ecui="type:listbox;name:test">
    <!-- 这里放选项内容 -->
    <li>选项</li>
    ...
</div>

属性
_sName       - 多选框内所有input的名称
_nItemHeight - 单个选项的高度

选项属性
_eInput      - 选项对应的input，form提交时使用
*/


    /**
     * 初始化多选框控件
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_LISTBOX =
        ui.Listbox = function (el, params) {
            params.hScroll = false;
            params.vScroll = true;
            this._sName = params.name || '';

            this.$append = blank;
            UI_PANEL.call(this, el, params);
            delete this.$append;

            this._cScroll = this.$getSection('VScroll');
            this.$initItems();
            this.$alterItems();
        },

        UI_LISTBOX_CLASS = inherits(UI_LISTBOX, UI_PANEL),
        UI_LISTBOX_ITEM = {};


    /**
     * 计算当前鼠标移入的选项编号
     * @private
     *
     * @param {ecui.ui.Item} control 选项控件
     */
    function UI_LISTBOX_OVERED(control) {
        var parent = control.getParent(),
            vscroll = parent._cScroll,
            step = vscroll.getStep(),
            o = getMouseY(parent),
            oldTop = control._nTop;

        control._nTop = o;

        if (o > parent.getHeight()) {
            if (o < oldTop) {
                /* 鼠标回退不需要滚动 */
                o = 0;
            }
            else {
                /* 超出控件范围，3像素点对应一个选项 */
                o = FLOOR((o - MAX(0, oldTop)) / 3);
                /* 如果不滚动，需要恢复原始的移动距离 */
                o ? vscroll.skip(o) : (control._nTop = oldTop);
            }
            o += control._nLastIndex;
        }
        else if (o < 0) {
            if (o > oldTop) {
                /* 鼠标回退不需要滚动 */
                o = 0;
            }
            else {
                /* 超出控件范围，3像素点对应一个选项 */
                o = MATH.ceil((o - MIN(0, oldTop)) / 3);
                /* 如果不滚动，需要恢复原始的移动距离 */
                o ? vscroll.skip(o) : (control._nTop = oldTop);
            }
            o += control._nLastIndex;
        }
        else {
            o = FLOOR((parent.getScrollTop() + o) / step);
        }

        return MAX(0, MIN(o, parent.getItems().length - 1));
    }

    /**
     * 选项鼠标按下事件处理
     * @private
     *
     * @param {Event} event 鼠标按下事件
     */
    UI_LISTBOX_ITEM.$mousedown = function (event) {
        UI_ITEM_CLASS.$mousedown.call(this, event);
        core.select(this, event, 'listbox');
    };

    /**
     * 选择框选中处理
     * @private
     *
     * @param {Event} event 鼠标按下事件
     */
    UI_LISTBOX_ITEM.$select = function () {
        var startIndex = this._nStartIndex,
            lastIndex = this._nLastIndex,
            index = UI_LISTBOX_OVERED(this),
            items = this.getParent().getItems(),
            fromCancel = 0,
            toCancel = -1,
            fromSelect = 0,
            toSelect = -1;

        if (index > lastIndex) {
            if (index < startIndex) {
                /* index与lastIndex都在负方向 */
                fromCancel = lastIndex;
                toCancel = index - 1;
            }
            else if (lastIndex < startIndex) {
                /* index与lastIndex位于起始选项两边 */
                fromCancel = lastIndex;
                toCancel = startIndex - 1;
                fromSelect = startIndex + 1;
                toSelect = index;
            }
            else {
                /* index与lastIndex都在正方向 */
                fromSelect = lastIndex + 1;
                toSelect = index;
            }
        }
        else if (index < lastIndex) {
            if (index > startIndex) {
                /* index与lastIndex都在正方向 */
                fromCancel = index + 1;
                toCancel = lastIndex;
            }
            else if (lastIndex > startIndex) {
                /* index与lastIndex位于起始选项两边 */
                fromCancel = startIndex + 1;
                toCancel = lastIndex;
                fromSelect = index;
                toSelect = startIndex - 1;
            }
            else {
                /* index与lastIndex都在负方向 */
                fromSelect = index;
                toSelect = lastIndex - 1;
            }
        }

        this._nLastIndex = index;

        /* 恢复之前的选择状态 */
        for (; fromCancel <= toCancel; ) {
            index = items[fromCancel++];
            index.alterClass('selected', !index.isSelected());
        }

        /* 选择框内的全部假选中 */
        for (; fromSelect <= toSelect; ) {
            items[fromSelect++].alterClass('selected');
        }
    };

    /**
     * 选择框选中结束
     * @private
     */
    UI_LISTBOX_ITEM.$selectend = function () {
        var startIndex = this._nStartIndex,
            index = UI_LISTBOX_OVERED(this),
            items = this.getParent().getItems(),
            fromIndex = MIN(startIndex, index),
            toIndex = MAX(startIndex, index);

        if (startIndex == index) {
            /* 点击的当前条目，进行反选 */
            this.setSelected(!this.isSelected());
        }
        else {
            /* 否则选择框内的全部选中 */
            for (; fromIndex <= toIndex; ) {
                items[fromIndex++].setSelected();
            }
        }
    };

    /**
     * 选择框选中开始
     * @private
     */
    UI_LISTBOX_ITEM.$selectstart = function () {
        this._nStartIndex = this._nLastIndex = UI_LISTBOX_OVERED(this);
        this.alterClass('selected');
    };

    /**
     * 判断多选框的选项控件是否被选中。
     * @public
     *
     * @return {boolean} 选项是否被选中
     */
    UI_LISTBOX_ITEM.isSelected = function () {
        return !this._eInput.disabled;
    };

    /**
     * 设置当前控件的父控件。
     * @public
     *
     * @param {ecui.ui.Control|HTMLElement} parent 父控件对象/父 Element 对象，忽略参数则将控件移出 DOM 树
     */
    UI_LISTBOX_ITEM.setParent = function (parent) {
        UI_ITEM_CLASS.setParent.call(this, parent);

        if (parent = this.getParent()) {
            this._eInput = setInputName(this._eInput, parent._sName);
        }
    };

    /**
     * 设置选中状态。
     * @public
     *
     * @param {boolean} status 是否选中，默认为选中
     */
    UI_LISTBOX_ITEM.setSelected = function (status) {
        this.alterClass('selected', this._eInput.disabled = status === false);
    };

    /**
     * 选项控件发生变化的处理。
     * 在 ecui.ui.Items 接口中，选项控件发生增加/减少操作时调用此方法。
     * @protected
     */
    UI_LISTBOX_CLASS.$alterItems = function () {
        var items = this.getItems(),
            length = items.length,
            vscroll = this._cScroll,
            height = this._nItemHeight = this._nItemHeight || length && items[0].getHeight();

        if (height) {
            vscroll.setStep(height);
            this.setItemSize(
                this.getBodyWidth() - (length * height > this.getBodyHeight() ? vscroll.getWidth() : 0)
            );
            this.paint();
        }
    };

    /**
     * 添加子选项控件的自定义初始化事件。
     * @public
     *
     * @param {ecui.ui.Item} item 选项控件
     * @param {string} value 选项对应的表单项提交值，如果忽略将使用控件的文本内容作为提交值
     */
    UI_LISTBOX_CLASS.$initItem = function (item, value) {
        var el = item.getBody();

        (item._eInput = createDom('<input type="hidden" name="' + this._sName + '" disabled>', el)).value
            = value === undefined ? el.getAttribute('value') || '' : value;
        copy(item, UI_LISTBOX_ITEM);
        item.setSelected(!!el.getAttribute('selected'));
    };

    /**
     * 获取控件的表单项名称。
     * 多选框控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称可以使用 setName 方法改变。
     * @public
     *
     * @return {string} 表单项名称
     */
    UI_LISTBOX_CLASS.getName = function () {
        return this._sName;
    };

    /**
     * 获取所有选中的选项。
     * @public
     *
     * @return {Array} 选项数组
     */
    UI_LISTBOX_CLASS.getSelected = function () {
        for (var i = 0, list = this.getItems(), o, result = []; o = list[i++]; ) {
            o.isSelected() && result.push(o);
        }
        return result;
    };

    /**
     * 选中所有的选项。
     * 某些场景下，需要多选框控件的内容都可以被提交，可以在表单的 onsubmit 事件中调用 selectAll 方法全部选择。
     * @public
     */
    UI_LISTBOX_CLASS.selectAll = function () {
        for (var i = 0, list = this.getItems(), o; o = list[i++]; ) {
            o.setSelected();
        }
    };

    /**
     * 设置控件的表单项名称。
     * 多选框控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 提交用的名称
     */
    UI_LISTBOX_CLASS.setName = function (name) {
        for (var i = 0, list = this.getItems(), o; o = list[i++]; ) {
            /* 需要将下属所有的输入框名称全部改变 */
            o._eInput = setInputName(o._eInput, name);
        }
        this._sName = name;
    };

    copy(UI_LISTBOX_CLASS, UI_ITEMS);

/*
Progress - 定义进度显示的基本操作。
进度条控件，继承自基础控件，面向用户显示一个任务执行的程度。

进度条控件直接HTML初始化的例子:
<div ecui="type:progress;rate:0.5"></div>

属性
_eText     - 内容区域
_eComplete - 完成的进度比例内容区域
*/


    /**
     * 初始化进度条控件
     * params 参数支持的属性如下：
     * rate 初始的百分比
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_PROGRESS =
        ui.Progress = function (el, params) {
            var baseClass = params.base,
                text;

            UI_CONTROL.call(this, el, params);

            coordinates(el = this.getBody());
            text = el.innerHTML;
            this._eText = createDom(
                '<div style="position:absolute;left:0px;top:0px" class="' + baseClass + '-text"></div>',
                el
            );
            this._eComplete = createDom(
                '<div style="position:absolute;left:0px;top:0px" class="' + baseClass + '-complete"></div>',
                el
            );
            this.setText(params.rate || 0, text);
        },

        UI_PROGRESS_CLASS = inherits(UI_PROGRESS, UI_CONTROL);

    /**
     * 销毁控件的默认处理。
     * @protected
     */
    UI_PROGRESS_CLASS.$dispose = function () {
        this._eText = this._eComplete = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_PROGRESS_CLASS.$setSize = function (width, height) {
        var style1 = this._eText.style, style2 = this._eComplete.style;

        UI_CONTROL_CLASS.$setSize.call(this, width, height);

        style1.width = style2.width = this.getBodyWidth() + 'px';
        style1.height = style2.height = this.getBodyHeight() + 'px';
    };

    /**
     * 设置进度的比例以及需要显示的文本。
     * @protected
     *
     * @param {number} rate 进度比例，在0-1之间
     * @param {number} text 显示的文本，如果省略将显示成 xx%
     */
    UI_PROGRESS_CLASS.setText = function (rate, text) {
        var complete = this._eComplete;

        rate = MAX(MIN(rate, 1), 0);
        this._eText.innerHTML = complete.innerHTML = text || (rate * 100) + '%';
        complete.style.clip =
            'rect(0px,' + FLOOR(rate * this.getBodyWidth()) + 'px,' + this.getBodyHeight() + 'px,0px)';
    };

/*
SWFControl - 定义 ECUI 下的 flash 控件的基本操作。
SWF 控件，继承自基础控件。ECUI 通过 SWF 控件扩展浏览器部分在 HTML5 中新定义的功能，SWF 控件提供了对 SWF 对象访问的封装
接口。

属性
_sMovieId - SWF 对象的 id
*/


    /**
     * 初始化 SWF 控件
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_SWFCONTROL =
        ui.SWFControl = function (el, params) {
            var id = this._sMovieId = 'ECUI_SWF_' + ++UI_SWFCONTROL_COUNT,
                vars = params.vars || {};

            UI_CONTROL.call(this, el, params);

            vars.id = id;
            createSWF({
                id: id,
                url: params.swf,
                width: params.width || 1,
                height: params.height || 1,
                wmode: params.wmode || 'opaque',
                bgcolor: params.bgcolor || '#FFFFFF',
                align: params.align || 'middle',
                vars: vars
            }, el);
        },

        UI_SWFCONTROL_CLASS = inherits(UI_SWFCONTROL, UI_CONTROL),
        UI_SWFCONTROL_COUNT = 0;

    /**
     * 控件建立完成事件的默认处理。
     * 在 SWF 控件中，由于需要动态加载 SWF 文件，控件创建成功不代表控件已经可以使用，如果需要操作控件，请先使用
     * isAvailable 方法判断控件的可用性，写加载成功时的操作，参见 $load 方法。
     * @protected
     */
    UI_SWFCONTROL_CLASS.$create = function () {
        this.isAvailable() ? this.$load() : new Timer(this.$create, 100, this);
    };

    /**
     * SWF 文件加载成功的处理。
     * @protected
     */
    UI_SWFCONTROL_CLASS.$load = blank;

    /**
     * 获取 SWF 对象。
     * @public
     *
     * @return {ActiveX} SWF 对象
     */
    UI_SWFCONTROL_CLASS.getMovie = function () {
        var id = this._sMovieId;
        return DOCUMENT[id] || WINDOW[id];
    };

    /**
     * 判断 SWF 对象是否已经加载成功并可以使用。
     * @public
     *
     * @return {boolean} 控件是否可以使用
     */
    UI_SWFCONTROL_CLASS.isAvailable = function () {
        var movie = this.getMovie();
        return !!(movie && movie.isAvailable);
    };

    /**
     * 初始化保持连接的 SWF 控件
     * params 参数支持的属性如下：
     * swf    需要连接到的地址
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_PCTPSTREAM =
        ui.PCTPStream = function (el, params) {
            this._sUrl = params.url;
            UI_SWFCONTROL.call(this, el, params);
        },

        UI_PCTPSTREAM_CLASS = inherits(UI_PCTPSTREAM, UI_SWFCONTROL);

    /**
     * SWF 文件加载成功的处理。
     * SWF 文件加载成功后，将自动连接指定的 url 地址建立长连接。
     * @protected
     */
    UI_PCTPSTREAM_CLASS.$load = function () {
        UI_SWFCONTROL_CLASS.$load.call(this);
        this.connect(this._sUrl);
    };

    /**
     * 长连接错误的处理。
     * @protected
     *
     * @param {string} msg 错误信息
     */
    UI_PCTPSTREAM_CLASS.$error = function (msg) {
        this.onerror && this.onerror(msg);
    };

    /**
     * 长连接接收到一个完整数据包的处理。
     * @protected
     *
     * @param {string} text 数据内容
     */
    UI_PCTPSTREAM_CLASS.$receive = function (text) {
        this.onreceive && this.onreceive(text);
    };

    /**
     * 连接一个 url 地址。
     * @public
     *
     * @param {string} url 需要连接的 url 地址，如果省略，将使用上一次连接时的地址
     */
    UI_PCTPSTREAM_CLASS.connect = function (url) {
        url = url || this._sUrl;
        url && this.getMovie().connect(this._sUrl = url);
    };

    /**
     * 关闭长连接
     * @public
     */
    UI_PCTPSTREAM_CLASS.close = function () {
        this.getMovie().close();
        this._sUrl = '';
    };

    /**
     * 初始化本地化存储的 SWF 控件
     * params 参数支持的属性如下：
     * key    保存时使用的密钥
     * @public
     *
     * @param {Element} el 关联的 Element 对象
     * @param {Object} params 初始化参数
     */
    var UI_STORAGE =
        ui.Storage = function (el, params) {
            UI_SWFCONTROL.call(this, el, params);
        },

        UI_STORAGE_CLASS = inherits(UI_STORAGE, UI_SWFCONTROL);

    /**
     * 恢复一个表单。
     * restore 方法将恢复一个表单的全部值，如果表单或表单项不存在，将自动创建表单/表单项。
     * @public
     *
     * @param {String} storageId 需要恢复的存储标识符
     * @param {String} curForm 需要添加本地存储数据后提交的表单元素
     * @return {HTMLElement|Object} 保存的表单或数据对象
     */
    UI_STORAGE_CLASS.restore = function (storageId, curForm) {
        var data = parse(this.getMovie().restore(storageId.substring(3)));

        if (data.form) {

            var o = data.name,
                elements = data.elements,
                i = 0,
                form = curForm;

            if (!form) {
                form = createDom('form', DOCUMENT.body);
                form.setAttribute('name', o);
                form.setAttribute('action', data.action);
                form.setAttribute('method', data.method),
                form.setAttribute('target', data.target);
            }

            for (; data = elements[i++]; ) {
                var name = data.name,
                    type = data.type,
                    value = data.value,
                    j = 0;

                if (type != 'select-multiple') {
                    createDom('<input type="hidden" name="' + name + '">', form).value = value;
                }
                else {
                    for (o = data.values, j = o.length; j--; ) {
                        createDom('<input type="hidden" name="' + name + '">', form).value = o[j];
                    }
                }
            }
        } else {
            form = data.data;
        }

        return form;
    };

    /**
     * 保存一个表单或数据对象。
     * save 方法将保存一个表单或指定的数据的信息，同时将生成一个唯一的 id 用于通过 restore 恢复表单或者数据。
     * @public
     *
     * @param {HTMLElement|Object} data 表单项或者需要保存的数据
     * @return {string} 保存后的 id 值
     */
    UI_STORAGE_CLASS.save = function (data) {
        if ( data.nodeType == 1) {
            var el = data,
                data = {},
                list = data.elements = [],
                elements = el.elements,
                i = 0,
                o;

            data.name = el.getAttribute('name');
            data.action = el.getAttribute('action');
            data.method = el.getAttribute('method');
            data.target = el.getAttribute('target');

            for (; el = elements[i++]; ) {
                o = {};
                if (o.name = el.name) {
                    switch (o.type = el.type) {
                    case 'radio':
                    case 'checkbox':
                        if (!el.checked) {
                            continue;
                        }
                    case 'hidden':
                    case 'textarea':
                    case 'text':
                    case 'select-one':
                    case 'password':
                        o.value = el.value;
                        break;
                    case 'select-multiple':
                        for (
                            var j = 0, options = el.options, option, values = o.values = {};
                            option = options[j++];
                        ) {
                            option.selected && values.push(option.value);
                        }
                    }
                    o.id = el.id;
                    list.push(o);
                }
            }
            data.form = 1;
        } else {
            data = {data: data};
        }

        return 'ec-' + this.getMovie().save(stringify(data));
    }

/*
Decorator - 装饰器基类，使用inline-block附着在控件外围，在控件改变状态时，装饰器同步改变状态。控件最外层装饰器的引用
              通过访问Decorator的属性来得到，属性名为控件对象

属性
_nWidth  - 装饰器宽度
_nHeight - 装饰器高度
_sClass  - 装饰器样式
_eOuter  - 装饰器外框Element
_oInner  - 内层装饰器或者控件对象
*/


    /**
     * 生成部件 Element 对象。
     * @public
     *
     * @param {ecui.ui.Control|ecui.ext.Decorator} control 需要装饰的控件
     * @param {string} baseClass 部件的基本样式
     */
    function EXT_DECORATOR_CREATEWIDGET(control, baseClass) {
        createDom(
            '<div class="' + baseClass + '" style="position:absolute;top:0px;left:0px"></div>',
            control.getOuter()
        );
    }

    /**
     * 初始化装饰器，将其附着在控件外围
     * @public
     *
     * @param {ecui.ui.Control|ecui.ext.Decorator} control 需要装饰的控件
     * @param {string} baseClass 装饰器的基本样式
     */
    var EXT_DECORATOR =
        ext.Decorator = function (control, baseClass) {
            var id = control.getUID(),
                oldEl = (this._oInner = EXT_DECORATOR[id] || control).getOuter(),
                style = oldEl.style,
                el = this._eOuter = createDom();

            el.className = this._sClass = baseClass || control.getBaseClass() + '-decorator';
            el.style.cssText =
                'position:' + (style.position == 'absolute' ? style.position : 'relative')
                    + ';top:' + (style.top || 'auto') + ';left:' + (style.left || 'auto')
                    + (style.display ? ';display:' + style.display : '');

            style.position = 'relative';
            style.top = 'auto';
            style.left = 'auto';
            style.display = '';

            insertBefore(el, oldEl);
            el.appendChild(oldEl);

            EXT_DECORATOR[id] = this;

            /* 给控件的方法设置代理访问 */
            copy(control, EXT_DECORATOR_PROXY);
        },

        EXT_DECORATOR_CLASS = EXT_DECORATOR.prototype,
        EXT_DECORATOR_PROXY = {};

    /**
     * 为装饰器增加/删除一个扩展样式。
     * @protected
     *
     * @param {string} className 扩展样式的尾缀
     * @param {boolean} isRemoved 为 true 时删除样式，否则新增样式
     */
    EXT_DECORATOR_CLASS.$alterClass = function (className, remove) {
        (remove ? removeClass : addClass)(this._eOuter, this._sClass + '-' + className);
        this._oInner.$alterClass(className, remove, true);
        this.paint();
    };

    /**
     * 销毁装饰器的默认处理。
     * @protected
     */
    EXT_DECORATOR_CLASS.$dispose = function () {
        this._eOuter = null;
    };

    /**
     * 设置装饰器区域的大小
     * @public
     *
     * @param {number} width 装饰器区域的宽度
     * @param {number} height 装饰器区域的高度
     */
    EXT_DECORATOR_CLASS.$setSize = function (width, height) {
        var el = this._eOuter,
            style = el.style,
            inner = this._oInner,
            widthRevise = getInvalidWidth(el),
            heightRevise = getInvalidHeight(el);

        this._oInner.$setSize(width && width - widthRevise, height && height - heightRevise, true);

        style.width = (width = inner.getWidth(true)) + 'px';
        style.height = (height = inner.getHeight(true)) + 'px';

        this._nWidth = width + widthRevise;
        this._nHeight = height + heightRevise;
        this.paint();
    };

    /**
     * 获取装饰器的基本样式名称
     * @public
     *
     * @return {string} 装饰器的基本样式名称
     */
    EXT_DECORATOR_CLASS.getClass = function () {
        return this._sClass;
    };

    /**
     * 获取装饰器区域的高度
     * @public
     *
     * @return {number} 装饰器区域的高度
     */
    EXT_DECORATOR_CLASS.getHeight = function () {
        return this._nHeight = this._nHeight || this._oInner.getHeight(true) + getInvalidHeight(this._eOuter);
    };

    /**
     * 获取装饰器内外区域的高度差
     * @public
     *
     * @return {number} 装饰器内外区域的高度差
     */
    EXT_DECORATOR_CLASS.getHeightRevise = function () {
        return this._oInner.getHeightRevise(true) + getInvalidHeight(this._eOuter);
    };

    /**
     * 获取内层装饰器或控件
     * @public
     *
     * @return {Decorator|Control} 内层装饰器或控件
     */
    EXT_DECORATOR_CLASS.getInner = function () {
        return this._oInner;
    };

    /**
     * 获取装饰器的外框Element
     * @public
     *
     * @return {Element} 外框Element
     */
    EXT_DECORATOR_CLASS.getOuter = function () {
        return this._eOuter;
    };

    /**
     * 获取装饰器区域的宽度
     * @public
     *
     * @return {number} 装饰器区域的宽度
     */
    EXT_DECORATOR_CLASS.getWidth = function () {
        return this._nWidth = this._nWidth || this._oInner.getWidth(true) + getInvalidWidth(this._eOuter);
    };

    /**
     * 获取装饰器内外区域的宽度差
     * @public
     *
     * @return {number} 装饰器内外区域的宽度差
     */
    EXT_DECORATOR_CLASS.getWidthRevise = function () {
        return this._oInner.getWidthRevise(true) + getInvalidWidth(this._eOuter);
    };

    /**
     * 装饰器刷新，在改变控件大小与样式的时候调用
     * @public
     */
    EXT_DECORATOR_CLASS.paint = blank;

    /**
     * 释放对象时需要先释放装饰器
     * @protected
     */
    EXT_DECORATOR_PROXY.$dispose = function () {
        this.clear();
        this.$dispose();
    };

    /**
     * 清除所有的装饰器效果，同时清除所有的代理函数
     * @public
     */
    EXT_DECORATOR_PROXY.clear = function () {
        /* 清除所有的代理函数 */
        for (o in EXT_DECORATOR_PROXY) {
            delete this[o];
        }

        var id = this.getUID(),
            o = EXT_DECORATOR[id],
            el = o._eOuter;

        insertBefore(this.getOuter(), el);
        removeDom(el);
        for (; o != this; o = o._oInner) {
            o.$dispose();
        }
        EXT_DECORATOR[id] = null;
    };

    /**
     * 获取控件最外层的Element对象，实际得到的是最外层装饰器的外框
     * @public
     *
     * @return {Element} 外层Element对象
     */
    EXT_DECORATOR_PROXY.getOuter = function () {
        return EXT_DECORATOR[this.getUID()].getOuter();
    };

    (function () {

        /* 这里批量生成函数代理 */
        for (var i = 0, list = [
                ['$setSize', 2], ['$alterClass', 2], ['getWidthRevise', 0], ['getHeightRevise', 0],
                ['getWidth', 0], ['getHeight', 0]
            ], o, name;
            o = list[i++];
        ) {
            /* 如果是代理进入的，会多出来一个参数作为标志位 */
            name = o[0];
            EXT_DECORATOR_PROXY[name] = new Function(
                'var o=this,d=ecui.ext.Decorator[o.getUID()],r=arguments;return r[' + o[1]
                    + ']?o.constructor.prototype.' + name + '.apply(o,r):d.' + name + '.apply(d,r)'
            );
        }

/*
LRDecorator - 左右扩展装饰器，将区域分为"左-控件-右"三部分，使用paddingLeft与paddingRight作为左右区域的宽度
*/

        /**
         * 初始化左右扩展装饰器，将其附着在控件外围
         * @public
         *
         * @param {Control} control 需要装饰的控件
         * @param {string} baseClass 装饰器的基本样式
         */
        o = ext.LRDecorator = function (control, baseClass) {
            EXT_DECORATOR.call(this, control, baseClass);

            baseClass = this.getClass();
            EXT_DECORATOR_CREATEWIDGET(control, baseClass + '-left');
            EXT_DECORATOR_CREATEWIDGET(control, baseClass + '-right');
        };

        /**
         * 装饰器刷新，在改变控件大小与样式的时候调用
         * @public
         */
        inherits(o, EXT_DECORATOR).paint = function () {
            var el = this.getOuter(),
                paddingTop = getStyle(el, 'paddingTop'),
                paddingLeft = getStyle(el, 'paddingLeft'),
                inner = this.getInner(),
                height = inner.getHeight(true) + 'px',
                tmpEl = el.lastChild;

            setStyles(tmpEl, {
                top: paddingTop,
                left: (PARSEINT(paddingLeft) || 0) + inner.getWidth(true) + 'px',
                width: getStyle(el, 'paddingRight'),
                height: height
            });
            setStyles(tmpEl.previousSibling, {top: paddingTop, width: paddingLeft, height: height});
        };

/*
TBDecorator - 上下扩展装饰器，将区域分为"上-控件-下"三部分，使用paddingTop与paddingBottom作为上下区域的高度
*/

        /**
         * 初始化上下扩展装饰器，将其附着在控件外围
         * @public
         *
         * @param {Control} control 需要装饰的控件
         * @param {string} baseClass 装饰器的基本样式
         */
        o = ext.TBDecorator = function (control, baseClass) {
            EXT_DECORATOR.call(this, control, baseClass);

            baseClass = this.getClass();
            EXT_DECORATOR_CREATEWIDGET(control, baseClass + '-top');
            EXT_DECORATOR_CREATEWIDGET(control, baseClass + '-bottom');
        };

        /**
         * 装饰器刷新，在改变控件大小与样式的时候调用
         * @public
         */
        inherits(o, EXT_DECORATOR).paint = function () {
            var el = this.getOuter(),
                paddingTop = getStyle(el, 'paddingTop'),
                paddingLeft = getStyle(el, 'paddingLeft'),
                inner = this.getInner(),
                width = inner.getWidth(true) + 'px',
                tmpEl = el.lastChild;

            setStyles(tmpEl, {
                top: (PARSEINT(paddingTop) || 0) + inner.getHeight(true) + 'px',
                left: paddingLeft,
                width: width,
                height: getStyle(el, 'paddingBottom')
            });
            setStyles(tmpEl.previousSibling, {left: paddingLeft, width: width, height: paddingTop});
        };

/*
MagicDecorator - 九宫格扩展装饰器，将区域分为"左上-上-右上-左-控件-右-左下-下-右下"九部分，使用padding定义宽度与高度
*/

        /**
         * 初始化九宫格扩展装饰器，将其附着在控件外围
         * @public
         *
         * @param {Control} control 需要装饰的控件
         * @param {string} baseClass 装饰器的基本样式
         */
        o = ext.MagicDecorator = function (control, baseClass) {
            EXT_DECORATOR.call(this, control, baseClass);

            baseClass = this.getClass() + '-widget';
            for (var i = 0; i < 9; i++) {
                i != 4 && EXT_DECORATOR_CREATEWIDGET(control, baseClass + i);
            }
        };

        /**
         * 刷新装饰器区域
         * @public
         */
        inherits(o, EXT_DECORATOR).paint = function () {
            var el = this.getOuter(),
                inner = this.getInner(),
                i = 9,
                paddingTop = getStyle(el, 'paddingTop'),
                paddingLeft = getStyle(el, 'paddingLeft'),
                width = inner.getWidth(true),
                height = inner.getHeight(true),
                top = ['0px', paddingTop, ((PARSEINT(paddingTop) || 0) + height) + 'px'],
                left = ['0px', paddingLeft, ((PARSEINT(paddingLeft) || 0) + width) + 'px'],
                tmpEl = el.lastChild;

            width = [paddingLeft, width + 'px', getStyle(el, 'paddingRight')];
            height = [paddingTop, height + 'px', getStyle(el, 'paddingBottom')];

            for (; i--; ) {
                if (i != 4) {
                    var row = FLOOR(i / 3),
                        col = i % 3;

                    setStyles(tmpEl, {top: top[row], left: left[col], width: width[col], height: height[row]});
                    tmpEl = tmpEl.previousSibling;
                }
            }
        };
    })();

})();

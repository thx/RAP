(function () {
    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,
        ext = core.ext,

        createControl = core.create,
        inherits = util.inherits,
        getView = util.getView,
        getPosition = dom.getPosition,
        first = dom.first,
        copy = util.copy,
        blank = core.blank,
        restore = core.restore,
        trim = core.string.trim,
        setStyles = dom.setStyles,
        insertFloor = dom.insertFloor,
        mask = core.mask,
        removeDom = dom.remove,
        getChild = dom.children,
        setText = dom.setText,
        getText = dom.getText,
        createDom = dom.create,
        moveElements = dom.moveElements,

        DOCUMENT = document,


        UI_EDIT = ui.Edit,
        UI_ITEM = ui.Item,
        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_EDIT_CLASS = UI_EDIT.prototype,
        UI_POPUP = ui.Popup,
        UI_POPUP_CLASS = UI_POPUP.prototype;

    var UI_ECOMBOX = ui.Ecombox = function (el, params) {
            var me = this,
                typeClass = params.type,
                items;

            me._uPopup = createControl(
                'Scpopup',
                {
                    'element': first(el)
                }
            );
            me._uPopup.$setParent(me);
            items = me._uPopup.getItems();

            for (var i = 0, item; item = items[i]; i++) {
                UI_ECOMBOX_ATTACHHANDLER(item);
            }


            UI_EDIT.call(me, el, params);

            (params.maxlength) && (this.getInput().maxLength = params.maxlength);
            this.getInput().style.position = 'absolute';

            (me._uButton = createControl(
                'Control',
                {
                    'base': typeClass + '-button',
                    'parent': me,
                    'capture': false
                }
            )).getOuter().style.position = 'absolute';

            el.style.position = 'relative';
        },

        UI_ECOMBOX_CLASS = inherits(UI_ECOMBOX, UI_EDIT);

    UI_ECOMBOX_CLASS.$click = function (event) {
        var target = event.target;
        UI_EDIT_CLASS.$click.call(this, event);
        if (target.getControl && target.getControl() == this._uButton) {
            this.showPopup();
        }
    };

    UI_ECOMBOX_CLASS.setValue = function (text) {
        if (this.getInput().value != text) {
            UI_EDIT_CLASS.setValue.call(this, text);
            return true;
        }
        else {
            return false;
        }
    };

    UI_ECOMBOX_CLASS.showPopup = function () {
        var pos = getPosition(this.getOuter()),
            o = this._uPopup,
            popupTop = pos.top + this.getHeight(),
            items;

        o.setPosition(
            pos.left,
            popupTop + o.getHeight() <= getView().bottom ? popupTop : pos.top - o.getHeight()
        );

        items = o.getItems();
        for (var i = 0, item; item = items[i]; i++) {
            (item._cPopup) && (item._cPopup.paint());
        }

        mask(0.05);
        o.show();
        o.onhide = UI_ECOMBOX_HIDEMASK;
    };

    UI_ECOMBOX_CLASS.$setSize = function (width, height) {
        UI_EDIT_CLASS.$setSize.call(this, width, height);

        width = this.getBodyWidth() - height;
        this.getInput().style.width = width + 'px'
        setStyles(this.getInput(), {'width': width + 'px', 'height': height + 'px'});
    };

    function UI_ECOMBOX_HIDEMASK() {
        mask();
    }

    function UI_ECOMBOX_SETVALUE() {
        var el = this.getBody(),
            value = el.getAttribute('value'),
            text = trim(el.getAttribute('title') ? el.getAttribute('title') : el.innerHTML),
            con = this;

        while ((con = con.getParent()) && !(con instanceof UI_ECOMBOX)) {
        }

        if ((con) && (con.setValue(text)) && (con.onpostdata)) {
            con.onpostdata(value);
        }

    }

    function UI_ECOMBOX_ATTACHHANDLER(item) {
        var childs = item.getChildItems();
        if (childs.length == 0) {
            return;
        }
        for (var i = 0, child; child = childs[i]; i++) {
            child.onclick = UI_ECOMBOX_SETVALUE;
            UI_ECOMBOX_ATTACHHANDLER(child);
        }
    }

    var UI_SCPOPUP = ui.Scpopup = function (el, params) {
            var i = 0,
                o;

            UI_CONTROL.call(this, el, params);

            o = createDom();
            moveElements(o, el);
            el.appendChild(o);
            this._eBody = o;
            this._eBody.className = params.type + '-layout';

            this._nMaxHeight = params.maxheight || 300;
            this._nMaxTextLen = params.maxTextLen || 20;

            /* 初始化菜单项 */
            //this.setParent(DOCUMENT.body);
            DOCUMENT.body.appendChild(el);
            this.$initItems();
            this.$alterItems();

            el = this.getOuter().style;
            el.display = 'none';
            el.position = 'absolute';

            /* 弹出菜单初始化完成后就不允许改变父对象 */
            this.setParent = blank;

            /* 初始化子弹出菜单 */
            for (el = this.getItems(); o = el[i++];) {
                o._cPopup && o.setClass(params.base + '-item-complex');
            }

            /* 修正文字长度不能超过限制 */
            for (i = 0, el = getChild(this._eBody); o = el[i++];) {
                if (first(o) && first(o).tagName.toLowerCase() == 'label') {
                    o = first(o);
                }
                if ((getText(o).length) > this._nMaxTextLen) {
                    o.setAttribute('title', getText(o));
                    setText(o, getText(o).substring(0, this._nMaxTextLen - 3) + '...');
                }
            }
        },

        UI_SCPOPUP_CLASS = inherits(UI_SCPOPUP, UI_POPUP);

    UI_SCPOPUP_CLASS.$createChild = function (item, el) {
        var popup;
        if (trim(el.innerHTML) == '') {
            removeDom(el);
            return false;
        }
        popup = item._cPopup = createControl(
            'Scpopup',
            {
                base: item.getParent().getClass(),
                element: el
            }
        );

        popup.$setParent(item);
        return popup;
    };

    UI_SCPOPUP_CLASS.$create = function () {
        new ext.TBDecorator(this, 'popupdtr');
        UI_CONTROL_CLASS.$create.call(this);
    };

    UI_SCPOPUP_CLASS.$setSize = function (width, height) {
        var el = this._eBody;
        if (height > this._nMaxHeight) {
            height = this._nMaxHeight;
            if (el.className.indexOf('overheight') < 0) {
                el.className = el.className + ' ' + this.getBaseClass() + '-layout-overheight';
            }
        }
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
    };

    UI_SCPOPUP_CLASS.$forcibly = function (event) {
        var con = event.getTarget(), find = false;
        while (con) {
            if (con == this) {
                find = true;
                break;
            }
            con = con.getParent();
        }
        (!find) && (UI_POPUP_CLASS.$forcibly.call(this));
        return false;
    }
})()

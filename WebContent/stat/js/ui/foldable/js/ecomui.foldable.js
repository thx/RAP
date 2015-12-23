var ecomui = ecomui || {};

(function () {
    var lib = baidu,
        core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,
        inherits = util.inherits,
        copy = util.copy,

        children = dom.children,
        createDom = dom.create,
        $fastCreate = core.$fastCreate,
        setText = dom.setText,

        DOCUMENT = document,
        UI_CONTROL = ui.Control,
        ECOM_FOLDABLE_CLASS;

    ecomui.Foldable = ui.Foldable = function (el, params) {
        var typeClass = params.type,
            contentEl = children(el)[0];
        titleEl = createDom(typeClass + "-title"),
            handlerEl = createDom(typeClass + "-handler");

        el.insertBefore(titleEl, contentEl);
        setText(titleEl, params.title || "");
        titleEl.insertBefore(handlerEl, titleEl.firstChild);

        params.capture = false;

        UI_CONTROL.call(this, el, params);

        this._uTitle = $fastCreate(UI_CONTROL, titleEl, this);
        this._uContent = $fastCreate(UI_CONTROL, contentEl, this, {capture: false});
        this._uHandler = $fastCreate(UI_CONTROL, handlerEl, this._uTitle, {capture: false});

        this._uTitle["on" + (params.trigger || "click")] = ECOM_FOLDABLE_TITLECLICK;

        ECOM_FOLDABLE_TOGGLECONTENT.call(this._uTitle, params.initFold || false);
    };

    function ECOM_FOLDABLE_TITLECLICK() {
        ECOM_FOLDABLE_TOGGLECONTENT.call(this);
    }

    function ECOM_FOLDABLE_TOGGLECONTENT(fold) {
        var control = this.getParent(),
            content = control._uContent,
            handler = control._uHandler,
            handlerEl = handler.getBase(),
            isShow = fold !== undefined ? fold : content.isShow();

        isShow ? content.hide() : content.show();
        handlerEl.setAttribute("title", isShow ? "点击展开" : "点击折叠");

        this.$alterClass(isShow ? "unfold" : "fold");
        this.$alterClass(isShow ? "fold" : "unfold", true);

        control.$resize();
    }

    ECOM_FOLDABLE_CLASS = inherits(ui.Foldable, UI_CONTROL);

})();

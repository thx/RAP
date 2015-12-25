//按钮的点击事件
function wrapHide(tg) {
    var wrap = baidu.dom.getAncestorByClass(tg, "ec-panel");
    wrap = wrap.getControl();
    var selectBox = wrap.getParent();
    var edit = selectBox._uEdit.getInput();
    var allBox = selectBox._uPanel.getOuter().getElementsByTagName("input")
    var str = "";
    for (var i = 0, j = 0; i < allBox.length && j < 4; i++) {
        if (allBox[i].checked) {
            j++;
            show = baidu.dom.next(allBox[i]).innerHTML;
            if (j == 1) {
                str += show
            }
            else if (j < 4) {
                str += "," + show
            }
            else {
                str += "," + show + "..."
            }
        }
    }
    edit.value = str;
    wrap.hide();
}

//以下为多选下拉用到的js
var ecomui = ecomui || {};
(function () {
    var core = ecui,
        ui = core.ui,
        util = core.util;
    inherits = util.inherits,
        UI_CONTROL = ui.Control;

    /**
     * ---------------------
     * 多选下拉构造函数
     * ---------------------
     */
    ecomui.SelectBox = ui.SelectBox = function (el, params) {
        UI_CONTROL.call(this, el, params);
        var id = this.getUID(), body = this.getBody();
        var panelHTML = '<div ecui="type:edit;id:edit-' + id + '"></div>';
        panelHTML += '<div ecui="type:panel; absolute:true;id:panel-' + id + '" ></div>';
        body.innerHTML = panelHTML;
        core.init(body);
        this.setClass("select-box");

        this._uHeight = params.pHeight || 30
        this._uCol = params.col || 1;
        this._uName = params.name;
        this._uEdit = core.get("edit-" + id);
        this._uPanel = core.get("panel-" + id);

        //最开始隐藏下拉层
        this._uPanel.hide();
        this.init();
        //绑定事件
        this._uEdit.onclick = SELECT_BOX_CLASS.oneditclick;
    }

    //原型继承至基础控件
    SELECT_BOX_CLASS = inherits(ui.SelectBox, UI_CONTROL);


    //点击输入框弹出下拉层
    SELECT_BOX_CLASS.oneditclick = function () {
        var wrap = this.getParent()
        var panelDom = wrap._uPanel.getBase();
        baidu.dom.toggle(panelDom);

    }

    //屏蔽点击事件，返回给控件
    SELECT_BOX_CLASS.$pressend = function () {
        ecui.forcibly(this);
        mask(0, 65534);
    }

    //重写$forcibly方法
    SELECT_BOX_CLASS.$forcibly = function () {
        var wrap = this.getParent()
        var panelDom = wrap._uPanel.getBase();
        baidu.dom.toggle(panelDom);
    }


    //设置下拉面板的可见高度
    SELECT_BOX_CLASS.setPHeight = function () {
        var pHeight = this._uHeight;
        var pStyle = this._uPanel.getOuter().style;
        pStyle.height = pHeight;

    }

    //控件初始化
    SELECT_BOX_CLASS.init = function () {
        this.setPst();
        this.setPHeight();
    }

    //根据edit定位下拉层
    SELECT_BOX_CLASS.setPst = function () {
        var edit = this._uEdit.getBase();
        var editX = baidu.dom.getPosition(edit).left;
        var editY = baidu.dom.getPosition(edit).top;
        var pStyle = this._uPanel.getBase();
        pStyle.style.position = "absolute";
        this._uPanel.setPosition(editX, editY + 15);
    }

    SELECT_BOX_CLASS.updata = function () {
        var allBox = this._uPanel;
        alert(allBox)


    }

    //滚动条不因后面的内容增加而出现  TODO
    //设置下拉框中的内容，根据数据构造多个checkbox
    SELECT_BOX_CLASS.setData = function (data) {
        var sData = data;
        var Fname = this._uName;
        var Fcol = this._uCol;
        var optionHTML = "";
        var checkboxIndex = 1;
        var panelContent = this._uPanel.getBody();
        baidu.array.each(sData, function (item, i) {
            Schecked = item.isChecked ? 'checked="checked"' : "";
            optionHTML += '<input type="checkbox" id = "fieldIndex_' + Fname + i + '" name=' + Fname + ' ' + Schecked + ' value=' + item.value + '/>';
            optionHTML += '<label for="fieldIndex_' + Fname + i + '" >' + item.text + '</label>';
            if (checkboxIndex % Fcol == 0) optionHTML += '<br/>';
            checkboxIndex++;
        });
        optionHTML += '<div><button type="button" onclick="wrapHide(this)">ok</button></div>'
        panelContent.innerHTML = optionHTML;
    }


})()
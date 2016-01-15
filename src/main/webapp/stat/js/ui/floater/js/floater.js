/**
 * 增值浮动层控件代码
 */

/**
 * 重载ecui Form控件的showModal方法，解决以下问题：
 * 1) 隐藏显示渲染问题
 * 2) 无法自定义透明度
 */
ecui.ui.Form.prototype.showModal = function (opacity) {
    this.show();
    this.paint();
    this.getOuter().style.zIndex = 32768;
    if (!opacity) {
        opacity = 0.3;
    }
    ecui.mask(opacity);
}

var ecFloater = {
    /**
     * 显示指定的浮动层
     * @param {String} ecId 获取ec控件需要的id
     */
    show: function (ecId) {

        var floater = ecui.get(ecId);
        floater.showModal();
        floater.getOuter().style.visibility = "";

        // 获得相关尺寸，居中显示浮动层
        var scrollHeight = baidu.page.getScrollTop();
        var scrollWidth = baidu.page.getScrollLeft();
        var viewHeight = baidu.page.getViewHeight();
        var viewWidth = baidu.page.getViewWidth();
        var elHeight = floater.getHeight();
        var elWidth = floater.getWidth();
        var x = parseInt((viewWidth - elWidth) / 2 + scrollWidth, 10);
        var y = parseInt((viewHeight - elHeight) / 2 + scrollHeight, 10);

        floater.setPosition(x, y);
    }
};

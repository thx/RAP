var esEditor = window.esEditor || {};
/**
 * 去除html的标签等获得纯文本内容
 * @param {String} html html内容的字符串
 * @return {String} 去除html标签等后的字符串
 */
esEditor.getEditorText = function (html) {
    html = html.replace(/<embed[^>]*>(.*?)<\/embed>/ig, "");
    html = html.replace(/<object[^>]*>(.*?)<\/object>/ig, "");
    html = html.replace(/<applet[^>]*>(.*?)<\/applet>/ig, "");
    html = html.replace(/<script[^>]*>(.*?)<\/script>/ig, "");
    html = html.replace(/<style[^>]*>(.*?)<\/style>/ig, "");
    html = html.replace(/<!--([^>]*)-->/ig, "");
    html = html.replace(/<!--(.|\n|\r)*?-->/ig, "");
    html = html.replace(/\r/g, "");
    html = html.replace(/\n/g, "");
    html = html.replace(/<p( .*?)?>/ig, "");
    html = html.replace(/<\/p>/ig, "<br>");
    html = html.replace(/<br>/ig, "");
    html = html.replace(/<br ?\/>/ig, "");
    html = html.replace(/<[^<>]*>/gi, "");
    html = html.replace(/&gt;/g, ">");
    html = html.replace(/&lt;/g, "<");
    html = html.replace(/&nbsp;/ig, " ");
    html = html.replace(/&amp;/g, "&");
    html = html.replace(/&#39;/g, "\'");
    html = html.replace(/&quot;/g, "\"");
    html = html.replace(/\r\n　　/g, "");
    html = baidu.trim(html);
    return html;
};
/**
 * 编辑器中纯文本内容的长度
 * @param {Object} editor 编辑器实例
 * @return {Number} 编辑器中纯文本内容的长度
 */
esEditor.getContentLength = function (editor) {
    var content = editor.getContent();
    content = esEditor.getEditorText(content) || 0;
    return content.length;
};

/**
 * 为编辑器添加遮罩,禁用编辑器
 * @param {String} editorSuffix 创建编辑器时使用的前缀
 */
esEditor.disableEditor = function (editorSuffix) {
    //获得编辑器区域高度和宽度,位置
    var editorContainer = baidu.g(editorSuffix + "EditorContainer");
    var editorTools = baidu.g(editorSuffix + "EditorTools");
    var height = editorContainer.offsetHeight;
    var width = editorTools.offsetWidth;

    var shadeDivEl = baidu.g(editorSuffix + "Shade");
    baidu.show(shadeDivEl);

    baidu.setStyles(shadeDivEl, {
        "position": "absolute",
        "height": height,
        "width": width,
        "left": 0,
        "top": 0,
        "background": "#000",
        "opacity": 0.3
    });
};

/**
 * 取消编辑器的遮罩,启用编辑器
 * @param {String} editorSuffix 创建编辑器时使用的前缀
 */
esEditor.enableEditor = function (editorSuffix) {
    var shadeDivEl = baidu.g(editorSuffix + "Shade");
    baidu.hide(shadeDivEl);
};

/**
 * 获得编辑器中的图片数量
 * @param {Object} editor 编辑器实例
 */
esEditor.getImgNum = function (editor) {
    var imgNum = 0;
    if (!editor) {
        return imgNum;
    }
    var imgEls = editor.document.getElementsByTagName("img");
    if (imgEls && imgEls.length) {
        imgNum = imgEls.length;
    }
    return imgNum;
};
String.prototype.toHtml = function () {
    return this.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\x20/g, '&nbsp;').replace(/(\r\n|\r|\n)/g, '<br>')
};
String.prototype.formatJS = function () {
    var s = this;
    var index = 0, brch = 0;
    var keywords = ['abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'delete', 'do', 'double', 'else', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with'];
    var objects = ['Anchor', 'anchors', 'Applet', 'applets', 'Area', 'Array', 'arguments', 'Button', 'Checkbox', 'Date', 'document', 'FileUpload', 'Form', 'forms', 'Frame', 'frames', 'Function', 'Hidden', 'history', 'Image', 'images', 'Link', 'links', 'Area', 'location', 'Math', 'MimeType', 'mimeTypes', 'navigator', 'options', 'Password', 'Plugin', 'plugins', 'Radio', 'Reset', 'RegExp', 'Select', 'String', 'Submit', 'Text', 'Textarea', 'window'];
    var specials = ['prototype', 'callee', 'caller', 'apply', 'call', 'encodeURIComponent', 'decodeURIComponent', 'parseInt', 'parseFloat', '__defineGetter__', '__defineSetter__'];
    var blocks = [];
    var indent = "", indent_fix = "";
    s = s.replace(/\t/g, '    ').replace(/\r\n|\r/g, "\n").replace(/(\/\/[^\n]*(\n|$)|\/\*(\*(?!\/)|[^\*])*\*+\/|\"(\\\"|\\\\|[^\"\n])*\"|\'(\\\'|\\\\|[^\'\n])*\'|([=!\(\:\{\[\;&|^]\s*)\/(\\.|[^\/\n])+\/[igm]*)/g, function ($0) {
        var color = "#CCCCCC", ret = "'";
        var kkk = $0;
        if (kkk.charAt(0) == '"')color = "#FF00FF"; else if (kkk.charAt(0) == "'")color = "#9900FF"; else if (kkk.match(/^(?:[=!\(\:\{\[&|^]\s*)(\/(\\.|[^\/\n])+\/[igm]*$)/)) {
            ret = kkk.replace(/^([=!\(\:\{\[&|^]\s*)(\/(\\.|[^\/\n])+\/[igm]*$)/, "$1'");
            kkk = kkk.replace(/^([=!\(\:\{\[&|^]\s*)(\/(\\.|[^\/\n])+\/[igm]*$)/, "$2");
            color = "#6666CC"
        }
        blocks[blocks.length] = "<font color=" + color + ">" + kkk.toHtml() + "</font>";
        return ret
    }).replace(/(\}?[\n ]*;[\n ]*)/g, function ($0, $1) {
        return $1.replace(/[\n ]/g, '') + "\n"
    }).replace(/\b(else)\b/g, "$1\n").replace(/\b((case|default)[^:]*\:)/g, "$1\n").replace(/(\{[\n ]*)((([A-Za-z\$\_][0-9A-Za-z\$\_]*|`)[\n ]*\:[\n ]*[^,\}]+,?)+)([\n ]*\})/g, function ($0, $1, $2, $3, $4, $5) {
        return $1 + $2.replace(/[\n ]+/g, ' ').replace(/(([A-Za-z\$\_][0-9A-Za-z\$\_]*|`)\:[^,\}]+,?)/g, "$1\n") + $5
    }).replace(/[\n ]*(\{|\};?)[\n ]*/g, function ($0, $1) {
        if ($1.charAt(0) == '}')brch--;
        var ss = "\n";
        for (var i = 0; i < brch; i++)ss += "    ";
        if ($1 == '{')brch++;
        return ss + $1 + "\n"
    }).replace(/[\n ]*\{[\n ]*\}/g, '{}').replace(/^[ ]*([^\{\}])/g, "$1").replace(/(\n\s*for\b[^\n]*\;\s*)\n/g, '$1').replace(/(\n\s*for\b[^\n]*\;\s*)\n/g, '$1').replace(/\n\s*(for|while|if|switch)\b[^\n]*; *\n/g, function ($0, $1) {
        var le = 0;
        for (var i = 0; i < $0.length; i++)if ($0.charAt(i) == '(')le++; else if ($0.charAt(i) == ')') {
            le--;
            if (le == 0)return $0.substr(0, i + 1) + "\n" + $0.substr(i + 1, $0.length)
        }
    }).replace(/(\n *)*(\n *)/g, "$2").replace(/(`\s*)\+(?=\s*`)/g, "$1\n+").replace(/( *)([^\n]*)\n/g, function ($0, space, text) {
        var ret = $0;
        if (text.match(/^\{/)) {
            indent = space + "    ";
            indent_fix = ""
        } else if (text.match(/^\}/)) {
            indent = space;
            indent_fix = ""
        } else {
            if (text.match(/^(case|default)\b/))ret = indent.substr(0, indent.length - 4) + text; else ret = indent + indent_fix + text;
            if (text.match(/^(if|for|else|var|while)\b/) && !text.match(/\;\s*$/))indent_fix = "    "; else if (!text.match(/[^\;]\s*$/))indent_fix = "";
            if (text.charAt(0) == '+')ret = "    " + ret;
            ret += "\n"
        }
        return ret
    }).replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\x20/g, '&nbsp;').replace(eval('/\\b(' + keywords.join('|') + ')\\b/g'), '<font color=blue>$1</font>').replace(eval('/\\b(' + objects.join('|') + ')\\b/g'), '<font color=red>$1</font>').replace(eval('/\\b(' + specials.join('|') + ')\\b/g'), '<font color=#0099CC>$1</font>').replace(/\n/g, '<br>').replace(/\'/g, function ($0) {
        return blocks[index++]
    });
    return s
}

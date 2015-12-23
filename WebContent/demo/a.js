define(function (require, exports, module) {
    var $ = require('jquery');
    exports.go = function () {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $('body').html(JSON.stringify(data, null, 4));
            }
        });
    }
})
!function(g) {
    var data = g.data;
    var DIV_KEY_PREFIX = 'data_';
    if (!data) {
        console.error("data is ", data);
    }


    var _isOpening = false;
    var _html = '';

    iterator(function(item, i, j) {
        // allocate ID dynamically
        if (j === undefined) {
            item.id = i;
        } else {
            item.id = i + '_' + j;
        }
        item.id = DIV_KEY_PREFIX + item.id;
        
        // initialize DOM
        if (j === undefined) {
            if (_isOpening) {
                _html += '</ul>';
                _isOpening = false;
            }
            _html += '<ul class="nav nav-sidebar">';
            _isOpening = true;
        } else {
            _html += ' <li><a href="#" onclick="alert(\'' + item.id + '\');">' + item.title + '</a></li>';
        }
    });

    $('#sidebar').html(_html);

    /**
     * data iterator
     */
    function iterator(cb) {
        var i, j, parent, child;
        for (i = 0; i < data.length; i++) {
            parent = data[i];

            cb(parent, i);

            for (j = 0; j < parent.contents.length; j++) {
                child = parent.contents[j];
                cb(child, i, j);
            }
        }
    }
}(this);

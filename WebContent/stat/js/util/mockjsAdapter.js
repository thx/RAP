/**
 * translate between RAP data and MockJS
 */
!function() {
    var global = this;

    function MockjsAdapter() {
    
    }

    MockjsAdapter.prototype = Object.create(new BaseAdapter);

    global.MockjsAdapter = MockjsAdapter;


}();
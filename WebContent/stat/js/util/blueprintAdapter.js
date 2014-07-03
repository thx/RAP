/**
 * translate between RAP data and Blueprint API
 */
!function() {
    var global = this;

    function BlueprintAdapter() {
    
    }

    BlueprintAdapter.prototype = Object.create(new BaseAdapter);

    global.BlueprintAdapter = BlueprintAdapter;


}();
!function () {
    var data = window.logsData;

    console.log("IP Log");
    console.table(data.ipLog);

    console.log("USER Log");
    console.table(data.userLog);
}();
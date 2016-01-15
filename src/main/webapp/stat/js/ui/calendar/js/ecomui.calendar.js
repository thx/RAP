/**
 * @file
 * @desc
 * @author
 *
 */
var ecomui = ecomui || {};

(function () {

    var lib = baidu,
        core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        blank = util.blank || function () {
            },
        inherits = util.inherits,
        copy = util.copy,
        g = lib.dom.g,
        insertAfter = lib.dom.insertAfter,
        toCamelCase = core.string.toCamelCase,
        get = core.get,
        query = core.query,
        trim = lib.string.trim,

        reTmp = "((\\d{4})-(\\d{1,2})-(\\d{1,2})?)",
        reSingle = new RegExp("\^" + reTmp + "\$"),
        reRange = new RegExp("\^" + reTmp + "\\s+至\\s+" + reTmp + "\$"),
        reLoose = new RegExp("\^" + reTmp + "\\s+(之(?:前|后))\$"),

        MIN = Math.min,
        MAX = Math.max,
        getView = util.getView,

        UI_CONTROL = ui.Control,
        UI_EDIT = ui.Edit,
        SINGLE_CALENDAR_CLASS,
        RANGE_CALENDAR_CLASS,
        CALENDAR_EDIT_CLASS;

    /*
     * 数字前面补零
     */
    function pad(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

    function dateToString(date, splitter) {
        var s = splitter == "" ? "" : splitter || "-";
        return [date.getFullYear(),
            pad(date.getMonth() + 1, 2),
            pad(date.getDate(), 2)].join(s);
    }

    /**
     * ---------------------
     * 单日历构造函数
     * ---------------------
     *
     *  @param    {HTMLElement}    el
     *  @param    {Object}    params    用于初始化控件的参数集合
     *            {String}    date    初始化日期, 格式yy-mm-dd
     *            {String}    range    日历可选择的范围, 见setRange说明
     */
    ecomui.SingleCalendar = ui.SingleCalendar = function (el, params) {
        try {
            UI_CONTROL.call(this, el, params);
        } catch (e) {
            console.log(e)
        }

        var id = this.getUID(),
            body = this.getBody(),
            yearSelect, monthSelect, calendar, prevBtn, nextBtn;

        //debugger;
        var calHtml = '<div class="date-content-sel"><table><tr>\
				<td><div ecui="type:control;id:prev-btn-' + id + '" class="prev month-nav"></div></td>\
				<td><select ecui="type:select;id:year-select-' + id + '" class="ec-select year-select"></select></td><td><span class="text-label">年</span></td>\
				<td><select ecui="type:select;id:month-select-' + id + '" class="ec-select month-select">$monthOptions</select></td><td><span class="text-label">月</span></td>\
				<td><div ecui="type:control;id:next-btn-' + id + '" class="next month-nav"></div></td>\
				</tr></table></div>\
			<div ecui="type:calendar;id:calendar-' + id + '"></div>';

        var monthOptionsHtml = ""
        for (var i = 1; i < 13; i++) {
            monthOptionsHtml += '<option value="' + i + '">' + i + '</option>'
        }

        calHtml = calHtml.replace(/\$monthOptions/, monthOptionsHtml);

        body.innerHTML = calHtml;

        core.init(body);

        this.setClass("time-single");


        //单日历的部件
        yearSelect = this._uYearSelect = get("year-select-" + id);
        monthSelect = this._uMonthSelect = get("month-select-" + id);
        calendar = this._uCalendar = get("calendar-" + id);
        prevBtn = this._uPrevBtn = get("prev-btn-" + id);
        nextBtn = this._uNextBtn = get("next-btn-" + id);

        //绑定事件
        calendar.ondateclick = SINGLE_CALENDAR_CLASS.ondateclick;
        calendar.onchange = SINGLE_CALENDAR_CLASS.oncalchange;
        yearSelect.onchange = monthSelect.onchange = SINGLE_CALENDAR_CLASS.onselectchange;
        prevBtn.onclick = nextBtn.onclick = SINGLE_CALENDAR_CLASS.onnavbtnclick;

        //一些工具函数
        yearSelect.empty = monthSelect.empty = SINGLE_CALENDAR_CLASS.emptySelect;

        //按settings里的参数初始化
        this._oSettings = {};
        copy(this._oSettings, this.setState(params));
    };

    SINGLE_CALENDAR_CLASS = inherits(ui.SingleCalendar, UI_CONTROL);

    /**
     * 根据参数设置日历
     * 在日历控件初始化, 日历输入框获得焦点时调用
     * 功能: 设置可选年份范围, 设置当前日期, 设置可选择的范围
     */
    SINGLE_CALENDAR_CLASS.setState = function (params) {
        var wrapper = this,
            calendar = wrapper.$getSection("Calendar"),
            yearSelect = wrapper.$getSection("YearSelect"),
            monthSelect = wrapper.$getSection("MonthSelect"),
            range,
            date, yy, mm, dd, match,

            now = new Date(),
        //默认参数
            settings = {
                date: now,
                range: "5y-5y"
            };

        //params覆盖默认参数
        copy(settings, params);

        //记住状态
        wrapper.settings = settings;

        //设置可选择日期的范围
        range = wrapper.setRange(settings.range);

        //改变年和月选择下拉框
        //先清空所有option
        yearSelect.empty();

        yearSelect.$alterItems = blank;

        for (var y = range.from.getFullYear(),
                 maxyear = range.to.getFullYear();
             y <= maxyear;
             y++) {
            yearSelect.append("" + y);
        }

        delete yearSelect.$alterItems;
        yearSelect.$alterItems();

        //给日历设值,
        //由于下拉框的值会联动, 只用设置calendar的值
        date = settings.date;

        if (date instanceof Date) {
            yy = date.getFullYear();
            mm = date.getMonth() + 1;
            dd = date.getDate();

            settings.date = [yy, mm, dd].join("-");
        }
        else if (typeof date == "string") {
            match = date.match(reSingle);
            if (match) {
                yy = match[2];
                mm = match[3];
                dd = match[4];
            }
        }

        //有day时高亮当日
        if (dd) {
            wrapper.selectDate(yy, mm, dd);
        }

        calendar.change();

        return settings;
    };

    /**
     * 重置日历, 将日历的数据清空   业务需求  fixed by tut
     */
    SINGLE_CALENDAR_CLASS.reset = function () {
        var calendar = this.$getSection("Calendar")
        thisYear = calendar.getYear();
        thisMonth = calendar.getMonth();
        dayCount = new Date(thisYear, thisMonth, 0).getDate();

        //清空
        this.foreachDate(function (n, i) {
            var thisDay = new Date(thisYear, thisMonth - 1, n._nDay);
            if (n._nDay > 0 && n._nDay < dayCount + 1) {
                n.setEnabled(true);
            }
        });
        this._oSelectedDate = null;
        //this._selectedDateGrid = null;


        //调用onreset事件回调函数, 如果函数返回false, 则不清空选择日期的样式
        if (!this.onreset || this.onreset(this._oSettings) != false) {
            if (this._selectedDateGrid) {
                this._selectedDateGrid.alterClass("selected", true);
                this._selectedDateGrid = null;
            }
        }
    };

    /**
     * 刷新日历, 根据当前的参数
     */
    SINGLE_CALENDAR_CLASS.refresh = function () {
        this.setState(this.settings);
    };

    /**
     * 遍历当前日历显示的所有日期网格
     * 并绑定回调函数
     *
     * @param {Function} callback
     */
    SINGLE_CALENDAR_CLASS.foreachDate = function (callback) {
        var wrapper = this,
            calendar = this.$getSection("Calendar"),
            dateGrids = calendar.$getSection("Date"),
            i = 0, o;
        for (; o = dateGrids.getItem(i++);) {
            if (o) {
                callback.call(o, o, i);
            }
        }
    };

    /**
     * 设置可选择日期的范围
     * 解析用户输入的range规则, 并把结果加入_oRange
     *
     * range规则示例:
     *    1. 静态日期:
     *        20090102-20100206
     *        20090102-
     *        -20090102
     *    2. now表示今天:
     *        now-20100606
     *        -now
     *    3. 相对日期, m表示月, y表示年, 两者前要加数字
     *        now-1y 表示今天到今天之后的一年
     *        2m-now 表示今天之前的两个月到今天
     *        20080101-1y
     *        1m-1y 表示今天前一个月到今天后一年
     *
     *    @param {String} range
     */
    SINGLE_CALENDAR_CLASS.setRange = function (range) {
        var reTmp = "(\\d{4}\\d{2}\\d{2}|now|\\d+(?:y|m))?",
            re = new RegExp(reTmp + "-" + reTmp),

            rangeArr = range.match(re),
            fromDate = rangeArr[1],
            toDate = rangeArr[2],
            now = new Date();

        function convertToDate(str) {
            var re = /((\d{4})(\d{2})(\d{2}))|(now)/,
                ret = str,
                match = str && str.match(re);

            if (match) {
                match[1] && (ret = new Date(match[2], match[3] - 1, match[4]));
                match[5] && (ret = now);
            }

            return ret;
        }

        function convertRelativeDate(baseDate, span, direction) {
            //direction 为 true 表示向前移动日期
            var re = /(\d+)(y|m)/,
                match, num, m, y, tmpDate, spanStr;

            spanStr = span || "5y";
            match = spanStr.match(re);
            if (match) {
                num = parseInt(match[1]);
                num = direction ? -num : num;
                m = baseDate.getMonth();
                y = baseDate.getFullYear();
                tmpDate = new Date(baseDate);

                match[2] == "y" ?
                    //tmpDate.setYear(y + num) :
                    tmpDate = (num > 0) ? new Date(y + num, 11, 31) : new Date(y + num, 0, 1) :
                    //TODO 相对月份取绝对日期
                    //tmpDate.setMonth(m + num);
                    tmpDate = (num > 0) ? new Date(y, m + num + 1, 0) : new Date(y, m + num, 1);
            }
            return tmpDate;
        }

        fromDate = convertToDate(fromDate);
        toDate = convertToDate(toDate);

        if (!(fromDate instanceof Date) && toDate instanceof Date) {
            fromDate = convertRelativeDate(toDate, fromDate, true);
        }
        if (!(toDate instanceof Date) && fromDate instanceof Date) {
            toDate = convertRelativeDate(fromDate, toDate);
        }
        if (!(fromDate instanceof Date) && !(toDate instanceof Date)) {
            fromDate = convertRelativeDate(now, fromDate, true);
            toDate = convertRelativeDate(now, toDate);
        }

        return this._oRange = {from: fromDate, to: toDate};
    };

    /**
     * 显示日期范围
     * 在setState, oncalchange里调用
     */
    SINGLE_CALENDAR_CLASS.displayRange = function () {
        var range = this._oRange, calendar, fromDate, toDate,
            thisYear, thisMonth, dayCount, selectedDate;

        if (range) {
            fromDate = range.from;
            toDate = range.to;
            calendar = this.$getSection("Calendar");
            thisYear = calendar.getYear();
            thisMonth = calendar.getMonth();
            dayCount = new Date(thisYear, thisMonth, 0).getDate();  //本月的天数，之前这里有点问题  fixed by tut
            selectedDate = this._oSelectedDate;


            //如果范围之外有被选择的网格, 则先清空整个日历
            if (selectedDate && (selectedDate < fromDate || selectedDate > toDate)) {

                this._selectedDateGrid.alterClass("selected", true)

                //this.reset();
            }

            this.foreachDate(function (n, i) {
                var thisDay = new Date(thisYear, thisMonth - 1, n._nDay);
                if (thisDay < fromDate || thisDay > toDate) {
                    //日期范围之外的网格设置禁用
                    n.setEnabled(false);
                }
                else {
                    //日期范围之内的当月天设置enabled
                    if (n._nDay > 0 && n._nDay < dayCount + 1) {   //最后一个天数之前有问题 fixed by tut
                        n.setEnabled(true);
                    }
                }
            });
        }
    };

    /**
     * 选择日期
     * 包括让选定日在日历网格中高亮
     */
    SINGLE_CALENDAR_CLASS.selectDate = function (year, month, date) {
        var wrapper = this,
            calendar = this.$getSection("Calendar"),
            yearSelect = this.$getSection("YearSelect"),
            monthSelect = wrapper.$getSection("MonthSelect"),
            dateGrids = calendar.$getSection("Date"),
            i = 0, grid;

        //给日历部件设置值
        calendar.setDate(year, month);
        yearSelect.setValue(year);
        monthSelect.setValue(month);


        //高亮被选择的日期
        wrapper.foreachDate(function (n, i) {
            if (n._nDay == date) {
                n.alterClass("selected");
                wrapper._selectedDateGrid = n;
            } else {
                n.alterClass("selected", true);
                core.loseFocus(n);
            }
        });

        //记住选择
        wrapper._oSelectedDate = new Date(year, month - 1, date);
    };

    /**
     * 清空年月下拉框的子选项
     */
    SINGLE_CALENDAR_CLASS.emptySelect = function () {
        var i = 0, options = this.getItems(), o;
        for (; o = options[i];) {
            o && this.remove(i);
        }
    };

    /**
     * 处理点击日历选择日期
     * 绑定到singleCalendar._uCalendar
     */
    SINGLE_CALENDAR_CLASS.ondateclick = function (date) {
        //this 为calendar控件
        var wrapper = this.getParent();

        //调用自定义日历点击回调函数
        if (!wrapper.oncustomdateclick
            || wrapper.oncustomdateclick(date) !== false) {
            wrapper.selectDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    };

    /**
     * 年月下拉框选择改变回调函数
     */
    SINGLE_CALENDAR_CLASS.onselectchange = function () {
        var wrapper = this.getParent(),
            year = wrapper.$getSection("YearSelect").getValue(),
            month = wrapper.$getSection("MonthSelect").getValue()
        calendar = wrapper.$getSection("Calendar");

        calendar.setDate(year, month);
    };

    /**
     * 日历改变回调函数
     */
    SINGLE_CALENDAR_CLASS.oncalchange = function () {
        var wrapper = this.getParent(),
            yearSelect = wrapper.$getSection("YearSelect"),
            monthSelect = wrapper.$getSection("MonthSelect"),
            year = this.getYear(),
            month = this.getMonth(),

        //前后箭头
            settings = wrapper.settings,
            prevBtn = wrapper.$getSection("PrevBtn"),
            nextBtn = wrapper.$getSection("NextBtn"),
            range = wrapper._oRange,

        //被选中日期
            sYear, sMonth, sDateGrid,

        //左右边界
            fromYear, fromMonth, toYear, toMonth;

        //年月下拉框onchange回调函数暂时置空, 避免死循环
        yearSelect.onchange = monthSelect.onchange = null;

        //适时禁用前后箭头
        fromYear = range.from.getFullYear();
        toYear = range.to.getFullYear();
        fromMonth = range.from.getMonth() + 1;
        toMonth = range.to.getMonth() + 1;

        if (year == toYear && month >= toMonth || year > toYear) {
            nextBtn.setEnabled(false);
        }
        else if (year == fromYear && month <= fromMonth || year < fromYear) {
            prevBtn.setEnabled(false);
        }
        else {
            prevBtn.setEnabled();
            nextBtn.setEnabled();
        }

        yearSelect.setValue(year);
        monthSelect.setValue(month);

        //根据可选择日期的范围禁用部分日期
        wrapper.displayRange();

        //日历不处于被选日期所在月时取消高亮
        if (wrapper._oSelectedDate) {
            sYear = wrapper._oSelectedDate.getFullYear();
            sMonth = wrapper._oSelectedDate.getMonth() + 1;
            sDateGrid = wrapper._selectedDateGrid;
            if (year == sYear && month == sMonth) {
                sDateGrid.alterClass("selected");
            } else {
                sDateGrid.alterClass("selected", true);
            }
        }

        //恢复年月下拉框onchange回调函数
        yearSelect.onchange = monthSelect.onchange = SINGLE_CALENDAR_CLASS.onselectchange;
    };

    /**
     * 处理前后箭头点击
     */
    SINGLE_CALENDAR_CLASS.onnavbtnclick = function () {
        var wrapper = this.getParent(),
            calendar = wrapper.$getSection("Calendar"),
            prevBtn = wrapper.$getSection("PrevBtn"),
            nextBtn = wrapper.$getSection("NextBtn");

        this == prevBtn ? calendar.move(-1) : calendar.move(1);
    };

    /**
     * ---------------------
     * 双日历
     * ---------------------
     *
     *  @param    {HTMLElement}    el
     *  @param    {Object}    params    用于初始化控件的参数集合
     */
    ecomui.RangeCalendar = ui.RangeCalendar = function (el, params) {
        UI_CONTROL.call(this, el, params);

        var id = this.getUID(),
            body = this.getBody(),
            beginCalendar, endCalendar, beginInput, endInput,
            buttons, i = 0, o,
            hiddenInputs,
            beginDateStr, endDateStr, rangeStr,
            now = new Date(), defaultDateStr = [now.getFullYear(), now.getMonth() + 1, ""].join("-");

        beginDateStr = ";date:" + (params.begindate ? params.begindate : defaultDateStr);
        endDateStr = ";date:" + (params.enddate ? params.enddate : defaultDateStr);
        rangeStr = params.range ? ";range:" + params.range : "";

        body.innerHTML = '<div class="time-begin"><table><tr>\
				<td><span class="text-label">起始时间:</span></td><td><input readonly="readonly" type="text" ecui="type:edit;id:begin-input-' + id + '"/></td>\
				<td><div ecui="type:control;id:reset-begin-' + id + '" class="time-reset"></div></td>\
				</tr></table><div ecui="type:single-calendar;id:cal-begin-' + id + beginDateStr + rangeStr + '"></div>\
			</div>\
			<div class="time-end"><table><tr>\
				<td><span class="text-label">结束时间:</span></td><td><input readonly="readonly" type="text" ecui="type:edit;id:end-input-' + id + '"/></td>\
				<td><div ecui="type:control;id:reset-end-' + id + '" class="time-reset"></div></td>\
			</tr></table><div ecui="type:single-calendar;id:cal-end-' + id + endDateStr + rangeStr + '"></div>\
			</div>\
			<button>确定</button><button>取消</button> <span class="calendar-error begin">请选择开始时间</span><span class="calendar-error end">请选择结束时间</span>';

        core.init(body);
        this.setClass("calendar-double-content");

        //双日历的部件
        beginCalendar = this._uBeginCalendar = get("cal-begin-" + id);
        endCalendar = this._uEndCalendar = get("cal-end-" + id);
        beginInput = this._uBeginInput = get("begin-input-" + id);
        endInput = this._uEndInput = get("end-input-" + id);
        beginReset = this._uBeginReset = get("reset-begin-" + id);
        endReset = this._uEndReset = get("reset-end-" + id);

        //禁用输入框
        beginInput._eInput.readOnly = true;
        endInput._eInput.readOnly = true;

        //建立一些联系
        beginCalendar._cInput = beginInput;
        endCalendar._cInput = endInput;
        beginReset._cCalendar = beginCalendar;
        endReset._cCalendar = endCalendar;
        beginCalendar._cSibling = endCalendar;
        endCalendar._cSibling = beginCalendar;

        //给按钮绑定事件
        buttons = body.getElementsByTagName("button");
        for (; o = buttons[i++];) {
            if (o) {
                o.onclick = RANGE_CALENDAR_CLASS.onbuttonclick;
                o._cWrapper = this;
            }
            ;
        }

        //日历绑定事件
        beginCalendar.oncustomdateclick = endCalendar.oncustomdateclick = RANGE_CALENDAR_CLASS.oncustomdateclick;
        beginCalendar.onreset = endCalendar.onreset = RANGE_CALENDAR_CLASS.oncalreset;
        beginReset.onclick = endReset.onclick = RANGE_CALENDAR_CLASS.onresetclick;
        beginCalendar.selectDate = endCalendar.selectDate = RANGE_CALENDAR_CLASS.selectDate;

        //改写单日历的一些方法
        //beginCalendar.selectDate = endCalendar.selectDate = RANGE_CALENDAR_CLASS.selectDate;

        this.setState(params);
    };

    RANGE_CALENDAR_CLASS = inherits(ui.RangeCalendar, UI_CONTROL);

    RANGE_CALENDAR_CLASS.oncalreset = function (settings) {
        var sibling = this._cSibling,
            siblingDate = sibling._oSelectedDate,
            rangeCal = this.getParent(),
            beginCal = rangeCal._uBeginCalendar,
            endCal = rangeCal._uEndCalendar;

        if (this._selectedDateGrid) {
            this._cInput.setValue("");
        }


        //如果对应日历有选择的日期, 则重复选择日期,
        //主要是为了让当前日历置灰
        if (siblingDate) {
            sibling.selectDate(
                siblingDate.getFullYear(),
                siblingDate.getMonth() + 1,
                siblingDate.getDate()
            );
            this._bHasRange = true;
        }

        //如果对应日历没有选择日期, 同时存在置灰日期
        //则将对应日历重设
        else if (sibling._bHasRange) {
            sibling._bHasRange = this._bHasRange = false;
            sibling.reset();
        }
    };

    RANGE_CALENDAR_CLASS.onresetclick = function () {
        this._cCalendar.reset();

    };

    RANGE_CALENDAR_CLASS.setState = function (params) {
        var wrapper = this,
            beginCalendar = wrapper.$getSection("BeginCalendar"),
            endCalendar = wrapper.$getSection("EndCalendar"),
            beginInput = wrapper.$getSection("BeginInput"),
            endInput = wrapper.$getSection("EndInput"),
            beginParams = {},
            endParams = {},
            now = new Date(),
            defaultDateStr = [now.getFullYear(), now.getMonth() + 1, ""].join("-");


        copy(beginParams, params);
        copy(endParams, params);

        beginParams.date = beginParams.begindate || defaultDateStr;
        endParams.date = endParams.enddate || defaultDateStr;

        //CAUTION 此处不要重复设置单日历的状态, 在双日历构造函数中已经用init调用过了
        //beginParams = beginCalendar.setState(beginParams);
        //endParams = endCalendar.setState(endParams);

        beginInput.setValue(beginParams.begindate ? beginParams.date : "");
        endInput.setValue(endParams.enddate ? endParams.date : "");
        wrapper.settings = params;

    };

    RANGE_CALENDAR_CLASS.oncustomdateclick = function (date) {
        var wrapper = this.getParent(),
            beginCalendar = wrapper.$getSection("BeginCalendar"),  //tut 在这里好像没有用到
            endCalendar = wrapper.$getSection("EndCalendar"),
            dateStr = dateToString(date), tmpDate = new Date(date);
        this._cInput.setValue(dateStr);

        this.selectDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };

    //绑到子控件上的选择日期方法
    //设置对应日历的范围
    RANGE_CALENDAR_CLASS.selectDate = function (year, month, date) {
        var wrapper = this.getParent(),
            beginCalendar = wrapper.$getSection("BeginCalendar"),
            endCalendar = wrapper.$getSection("EndCalendar"),
            paramDate = new Date(year, month - 1, date),
            dateStr = dateToString(paramDate), tmpDate = new Date(paramDate);

        this._cInput.setValue(dateStr);

        if (this == beginCalendar) {
            //选择了开始日期
            wrapper.settings.begindate = dateStr;

            //结束日期从开始日期(含)以后才能选
            tmpDate.setDate(paramDate.getDate());
            endCalendar.setRange(dateToString(tmpDate, "")
                + "-"
                + dateToString(endCalendar._oRange.to, ""));

            //调用日历的change方法
            //改变日历状态(不用调用displayRange方法了)
            endCalendar.$getSection("Calendar").change();
        }
        else if (this == endCalendar) {
            wrapper.settings.enddate = dateStr;

            tmpDate.setDate(paramDate.getDate());
            beginCalendar.setRange(dateToString(beginCalendar._oRange.from, "")
                + "-"
                + dateToString(tmpDate, ""));

            beginCalendar.$getSection("Calendar").change();
        }

        SINGLE_CALENDAR_CLASS.selectDate.call(this, parseInt(year, 10), parseInt(month, 10), parseInt(date, 10));
    };

    RANGE_CALENDAR_CLASS.onbuttonclick = function () {
        var txt = this.innerHTML,
            wrapper = this._cWrapper;

        if (txt == "确定") {
            wrapper.onconfirm && wrapper.onconfirm();
        } else {
            wrapper.oncancel && wrapper.oncancel();
        }
    };

    /**
     * ---------------------
     * 日历输入框构造函数
     * ---------------------
     *  建议在HTML里以input标签初始化, 并设置readonly属性
     *  TODO 构造函数太长, 分解一下
     *
     *  @param    {HTMLElement}    el
     *  @param    {Object}    params    用于初始化控件的参数集合
     */
    ecomui.CalendarEdit = ui.CalendarEdit = function (el, params) {
        UI_EDIT.call(this, el, params);

        var calendarType = params.calendartype || "single",
            calendarLiteral = toCamelCase("-" + calendarType) + "Calendar",
            calendarConstructor = ecomui[calendarLiteral],
            calendarOptions = {},
            paramStr = "", calendarEl,
            calendarParamNames = ["date", "begindate", "enddate", "range", "editable"],
            calendar,
            calendarOuter,
            singleMatch,
            rangeMatch,
            inputValue = trim(el.value);

        this.loose = params.loose;

        if (inputValue) {
            singleMatch = inputValue.match(reSingle);
            rangeMatch = inputValue.match(reRange);
            looseMatch = inputValue.match(reLoose)

            if (singleMatch) {
                params.date = singleMatch[0];
            }

            if (rangeMatch) {
                params.begindate = rangeMatch[1];
                params.enddate = rangeMatch[5];
            }

            if (params.loose && looseMatch) {
                (looseMatch[5] == "之后") && (params.begindate = looseMatch[1]);
                (looseMatch[5] == "之前") && (params.enddate = looseMatch[1]);
            }

        }
        //从日历输入框的参数中提取日历的参数
        i = calendarParamNames.length;
        while (i--) {
            var name = calendarParamNames[i];
            if (params.hasOwnProperty(name)) {
                calendarOptions[name] = params[name];
                paramStr = paramStr + name + ":" + params[name] + ";";
            }
        }
        calendarOptions.parent = document.body;
        if (this._cCalendar) {
            calendar = this._cCalendar;
        } else {
            dom.insertHTML(document.body, 'beforeEnd',
                '<div><div ecui="type:' + calendarType + '-calendar;'
                + paramStr + '"></div></div>');
            calendarEl = document.body.lastChild;
            core.init(calendarEl);
            calendar = calendarEl.childNodes[0].getControl();
        }
        //ecui.create(calendarLiteral, calendarOptions);
        this.alterClass(calendarType);
        //如果是双日历, 把隐藏域放到本输入框之后
        if (calendar instanceof ecomui.RangeCalendar) {
            //var bHInput = dom.create('<input type="text" style="display:none" name="' + (params.beginname || 'beginDate') +'" />'),
            //	eHInput = dom.create('<input type="text" style="display:none" name="' + (params.endname || 'endDate') + '" />');
            var bHInput = dom.setInput(null, params.beginname || "beginDate", "text"),
                eHInput = dom.setInput(null, params.endname || "endDate", "text");

            lib.dom.setAttrs(bHInput, {
                style: "display:none",
                value: params.begindate || "",
                defaultValue: "" + bHInput.value,
                initVal: "" + bHInput.value
            });

            lib.dom.setAttrs(eHInput, {
                style: "display:none",
                value: params.enddate || "",
                defaultValue: "" + eHInput.value,
                initVal: "" + eHInput.value
            });

            /*
             *                    //给隐藏域设置初始值
             *                    bHInput.value = params.begindate || "";
             *                    eHInput.value = params.enddate || "";
             *
             *                    //隐藏域的defaultValue
             *                    bHInput.defaultValue = "" + bHInput.value;
             *                    eHInput.defaultValue = "" + eHInput.value;
             *
             *                    bHInput.setAttribute("initVal", "" + bHInput.value);
             *                    eHInput.setAttribute("initVal", "" + eHInput.value);
             */

            insertAfter(bHInput, el);
            insertAfter(eHInput, el);

            //与输入框控件绑定
            this._oBHInput = bHInput;
            this._oEHInput = eHInput;
        }


        this._cCalendar = calendar;
        calendar._cInput = this;

        this.settings = {};
        copy(this.settings, calendarOptions);

        //事件绑定
        this.onfocus = CALENDAR_EDIT_CLASS.onfocus;
        calendar.onblur = CALENDAR_EDIT_CLASS.oncalblur;
        calendar.oncustomdateclick = CALENDAR_EDIT_CLASS.oncustomdateclick;
        calendar.onconfirm = CALENDAR_EDIT_CLASS.oncalconfirm;
        calendar.oncancel = CALENDAR_EDIT_CLASS.oncalcancel;
        calendar.onhide = calendar instanceof ecomui.RangeCalendar ? CALENDAR_EDIT_CLASS.oncalhide : blank;

        if (!calendar.getParent()) {
            //calendar.setParent(document.body);
            calendarOuter = calendar.getOuter();

            calendarOuter.style.position = "absolute";
            calendarOuter.style.zIndex = "32769";

            calendar.hide();
        }
    };

    CALENDAR_EDIT_CLASS = inherits(ui.CalendarEdit, UI_EDIT);

    /**
     * 处理日历输入框获得焦点
     */
    CALENDAR_EDIT_CLASS.onfocus = function () {
        var outer = this.getOuter();
        pos = dom.getPosition(outer),
            calendar = this._cCalendar,
            settings = this.settings,
            view = getView(),
            calWidth = calendar.getWidth(),
            calHeight = calendar.getHeight();

        var left = view.right < pos.left + calWidth ?
            pos.left + outer.offsetWidth - calWidth : pos.left,
            top = view.bottom < pos.top + outer.offsetHeight + calHeight ?
            pos.top - calHeight : pos.top + outer.offsetHeight;

        calendar.setPosition(left, top);

        calendar.show();
        ecui.mask(0.05);
        core.setFocused(calendar);

    };

    /**
     * 处理日历控件失焦
     */
    CALENDAR_EDIT_CLASS.oncalblur = function () {
        ecui.mask()
        // 使用默认$hide, 这样不会调用loseFocus()造成再次是失去焦点
        this.$hide();
    };

    /**
     * 自定义的日期点击回调函数, 会在默认回调函数的头部执行
     */
    CALENDAR_EDIT_CLASS.oncustomdateclick = function (date) {
        var input = this._cInput,
            dateStr = dateToString(date);

        input.setValue(dateStr);
        copy(input.settings, {date: dateStr});

        this.hide();
    };

    /**
     * 日历的确定按钮点击
     */
    CALENDAR_EDIT_CLASS.oncalconfirm = function () {
        var input = this._cInput,
            loose = input.loose,
            beginHiddenInput = input._oBHInput,
            endHiddenInput = input._oEHInput,
            beginInput = this.$getSection("BeginInput"),
            endInput = this.$getSection("EndInput"),
            caError = this.$getSection("calendarError")
        //给隐藏域设值
        beginVal = beginInput.getValue(),
            endVal = endInput.getValue();

        //用参数来判断是否需要对两个必选。
        if (loose) {
            if (beginVal && endVal) {
                inputVal = beginVal + " 至 " + endVal;
            }
            else if ((beginVal == "") && endVal) {
                inputVal = endVal + " 之前 ";
            }
            else if ((endVal == "") && beginVal) {
                inputVal = beginVal + " 之后 ";
            }
            else {
                inputVal = "";
            }
        }
        else {
            if (beginVal == "") {
                this.alterClass("end-error", true);
                this.alterClass("begin-error");
                return false;
            }
            else if (endVal == "") {
                this.alterClass("begin-error", true);
                this.alterClass("end-error");
                return false;
            }
            else {
                inputVal = beginVal + " 至 " + endVal;
                this.alterClass("end-error", true);
                this.alterClass("begin-error", true);
            }
        }

        beginHiddenInput.value = beginVal;
        endHiddenInput.value = endVal;

        input.setValue(inputVal);
        input.change();
        ecui.mask();
        this.hide();
    };

    /**
     * 日历隐藏时的处理
     */
    CALENDAR_EDIT_CLASS.oncalhide = function () {
        refreshDates(this);
    };

    /*
     * 根据输入框内容选择双日历的日期
     * @private
     */
    function refreshDates(cal) {
        var beginCalendar = cal._uBeginCalendar,
            endCalendar = cal._uEndCalendar,
            beginDateVal = cal._cInput._oBHInput.value,
            endDateVal = cal._cInput._oEHInput.value;

        //清空日历
        cal._uBeginCalendar.reset();
        cal._uEndCalendar.reset();
        cal.alterClass("end-error", true);
        cal.alterClass("begin-error", true);

        //add some here  用于读取内容设置日历。抵消掉取消按钮的记录问题
        beginDateVal != "" ?
            beginCalendar.selectDate.apply(beginCalendar, beginDateVal.split("-")) :
            beginCalendar.reset();
        endDateVal != "" ?
            endCalendar.selectDate.apply(endCalendar, endDateVal.split("-")) :
            endCalendar.reset();
    };

    /**
     * 日历的取消按钮点击
     * 仅双日历
     */
    CALENDAR_EDIT_CLASS.oncalcancel = function () {
        this.hide();
    };

    /**
     * 输入框的重置
     */
    CALENDAR_EDIT_CLASS.reset = function () {
        var cal = this._cCalendar;
        var bHInput = this._oBHInput;
        var eHInput = this._oEHInput;


        bHInput.value = bHInput.getAttribute("initVal");
        eHInput.value = eHInput.getAttribute("initVal");


        refreshDates(cal);
    }

})();

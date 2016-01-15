var ecCalendar = {
    /**
     * 初始化页面上的所有日历
     */
    init: function () {
        var inputs = document.getElementsByTagName("input"),
            i = inputs.length;

        //遍历document, 给满足条件的input绑定日历
        while (i--) {
            var calType = inputs[i].className.match(/calendar-(\w+)/);

            if (calType) {
                calType = calType[1];

                //按照class里的类型给input绑定日历
                ecCalendar.bind(inputs[i], calType);
            }
        }
    },

    /**
     * 统一的创建日历入口
     *
     * @param {String} type        日历类型
     * @param {Object} options    日历选项
     */
    create: function (type, options) {
        switch (type) {
            case "single":
                var ret = ecCalendar.createSingle(options);
                break;
            case "double":
                var ret = ecCalendar.createDouble(options);
                break;
        }
        return ret;
    },

    /**
     * 创建单个日历
     *
     * @param    {Object}            options    日历选项
     *
     * @return    {ecui.ui.Control}    包含日历控件的control
     */
    createSingle: function (options) {
        var core = baidu.dom, ec = ecui.dom,
            wrapper = ecui.create("Control", {type: "date-content", parent: document.body}),
            calendar = ecui.create("Calendar", {parent: wrapper}),
            style = wrapper.getOuter().style,
            base = calendar.getBase(), outer = calendar.getOuter(),
            now = new Date();

        var embed = (options && options.embed) ? options.embed : null;
        var cInput = (options && options.input) ? options.input : null;

        //初始时隐藏日历
        wrapper.hide();

        if (!embed) {
            style.position = "absolute",
                style.zIndex = "999";
        }
        //扩展的日历功能(选择框, 提示框)
        var comboSelectHTML = '<div class="date-content-sel"><a href="#" class="month-nav prev"></a>\
											<select class="eccal-year" style="margin:0 10px 0 0"></select>年\
											<select class="eccal-month" style="margin:0 10px"></select>月\
											<a href="#" class="month-nav next"></a></div>';
        var comboSelect = ec.create(comboSelectHTML), calStatus = ec.create("<div></div>");

        //加一个样式
        wrapper.getOuter().className = wrapper.getOuter().className + " time-single";

        //生成options
        var selects = comboSelect.getElementsByTagName('select'),
            yearSelect = selects[0],
            monthSelect = selects[1];

        //年选择
        for (var y = now.getFullYear() + 0, i = y - 5; i <= y + 5; i++) {
            var selected = (i == y),
                option = new Option(i, i),
                optionArr = yearSelect.options;

            optionArr[optionArr.length] = option;
            if (selected) {
                yearSelect.selectedIndex = optionArr.length - 1;
            }
        }

        //月选择
        for (var j = 1, m = now.getMonth() + 1; j <= 12; j++) {
            var selected = (j == m),
                option = new Option(j, j),
                optionArr = monthSelect.options;

            optionArr[optionArr.length] = option;
            if (selected) {
                monthSelect.selectedIndex = optionArr.length - 1;
            }
        }

        //onchange事件
        yearSelect.onchange = monthSelect.onchange = function () {
            var month = monthSelect.value,
                year = yearSelect.value;

            calendar.setDate(year, month);
            ecCalendar.refresh(wrapper);
        };

        //前后箭头
        var arrows = comboSelect.getElementsByTagName("a"),
            prevArrow = arrows[0],
            nextArrow = arrows[1];

        prevArrow.onclick = function () {
            ecCalendar.move(wrapper, -1);
            return false;
        };
        nextArrow.onclick = function () {
            ecCalendar.move(wrapper, 1);
            return false;
        };

        //插入到日历中
        core.insertBefore(comboSelect, base);
        core.insertAfter(calStatus, base);


        //点击日期时填入input
        //TODO 格式化日期字符串
        calendar.ondateclick = function (date) {

            var selected = ecui.getFocused();

            if (embed) {
                /*
                 direction = !this.getBase().parentNode.className.match(/begin/);
                 ecCalendar.setDateDisabled(this._cCal, date, direction);
                 */
                var isBegin = !!this.getBase().parentNode.className.match(/begin/);
                if (this._oldDate && this._cCal._oldDate) {
                    var cDate = this._cCal._oldDate;
                    //console.log(date, cDate, date > cDate);
                    var valid = isBegin ? date < cDate : date > cDate;
                    if (!valid) {
                        alert("开始日期必须早于结束日期");
                        selected.alterClass("focus", true);
                        return;
                    }
                }
                if (!this._oldDate) {
                    this._oldDate = date;
                }

            }

            selected.alterClass("selected");
            if (this._oldSelected && this._oldSelected != selected) {
                this._oldSelected.alterClass("selected", true);
            }

            this._oldSelected = selected;

            if (cInput) {
                cInput.value = date.getFullYear() + "-"
                    + (date.getMonth() + 1) + "-"
                    + date.getDate();

                //填充隐藏域
                if (wrapper._hInput) {
                    wrapper._hInput.value = cInput.value;
                }

                if (!embed) {
                    wrapper.hide();
                }
            }
        };

        //在日历失去焦点时隐藏
        wrapper.onblur = function (e) {
            if (!embed) {
                this.hide();
            }
        };

        //一些接口
        var y = yearSelect.options, yi = y.length,
            m = monthSelect.options, mi = m.length;

        wrapper.select = comboSelect;
        wrapper.yearSelect = yearSelect;
        wrapper.monthSelect = monthSelect;
        wrapper.prevArrow = prevArrow;
        wrapper.nextArrow = nextArrow;
        wrapper.calendar = calendar;
        wrapper.minYear = y[0].value;
        wrapper.maxYear = y[yi - 1].value;


        //createSinge返回整个wrapper
        return wrapper;
    },

    /**
     * 创建双日历
     *
     * @param    {Object}            options    日历选项
     *
     * @return    {ecui.ui.Control}    包含日历控件的control
     */
    createDouble: function (options) {
        var core = baidu.dom, ec = ecui.dom,
            wrapper = ecui.create("Control", {type: "calendar-double-content", parent: document.body}),
            style = wrapper.getOuter().style,

            hiddenInputArr = [];

        style.position = "absolute";
        style.zIndex = "999";

        wrapper.hide();

        var cInput = (options && options.input) ? options.input : null;

        //生成两个日历
        //TODO 隐藏域的名称
        var calParams = [
                ["time-end", "结束时间", "timeEnd"],
                ["time-begin", "开始时间", "timeBegin"]
            ],
            i = calParams.length, calArr = [];

        while (i--) {
            var calInput = ec.create('<span class="time-be">' + calParams[i][1] + '<input type="text"/></span>');
            calArr[i] = ecCalendar.createSingle({"embed": true, "input": calInput.getElementsByTagName('input')[0]});

            var curCal = calArr[i], curCalEl = curCal.getOuter(),
                curCalElStyle = curCalEl.style,
                hiddenInput = ec.create('<input type="hidden" name="' + calParams[i][2] + '" />');

            hiddenInputArr.push(hiddenInput);

            curCal.setParent(wrapper);
            ec.addClass(curCalEl, calParams[i][0]);
            core.insertBefore(calInput, curCal.select);
            core.insertAfter(hiddenInput, options.input);

            //input和日历绑定
            curCal._hInput = hiddenInput;

            calArr[i].show();
        }

        wrapper._calArr = calArr;

        //两个日历相互绑定
        calArr[0].calendar._cCal = calArr[1].calendar;
        calArr[1].calendar._cCal = calArr[0].calendar;

        //按钮
        var calBtnParams = ["取消", "确定"], i = calBtnParams.length, calBtnArr = [];
        while (i--) {
            calBtnArr[i] = ec.create('<button>' + calBtnParams[i] + '</button>');
            var curBtn = calBtnArr[i];
            wrapper.getOuter().appendChild(curBtn);

            curBtn.onclick = (function () {
                var _i = i, _cInput = cInput, _hiddenInputArr = hiddenInputArr;
                return function () {
                    if (_i == 1) {
                        //确定
                        //TODO 验证输入日期不为空
                        _cInput.value = _hiddenInputArr[0].value + " 至 " + _hiddenInputArr[1].value;
                    } else {
                        //取消
                    }
                    wrapper.hide();
                }
            })();
        }

        //日历失焦时隐藏
        wrapper.onblur = function () {
            this.hide();
        };

        //createDouble返回整个控件
        return wrapper;
    },

    /**
     * 刷新单日历
     * @param    {ecui.ui.Control}    包含单日历的control
     */
    refresh: function (wrapper) {
        var core = baidu.dom, ec = ecui.dom,
            prevArrow = wrapper.prevArrow,
            nextArrow = wrapper.nextArrow
        curYear = wrapper.calendar.getYear(),
            curMonth = wrapper.calendar.getMonth(),
            minYear = wrapper.minYear,
            maxYear = wrapper.maxYear;

        //处理箭头的disable样式
        core.removeClass(prevArrow, "prev-disable");
        core.removeClass(nextArrow, "next-disable");

        if (curYear == minYear && curMonth == 1) {
            core.addClass(prevArrow, "prev-disable");
        }
        if (curYear == maxYear && curMonth == 12) {
            core.addClass(nextArrow, "next-disable");
        }

    },

    /**
     * 切换月份显示
     *
     * @param {ecui.ui.Control}        单日历控件
     * @param {String} offsetMonth    增减的月份
     */
    move: function (wrapper, offsetMonth) {
        var calendar = wrapper.calendar,
            yearSelect = wrapper.yearSelect,
            monthSelect = wrapper.monthSelect,
            maxYear = wrapper.maxYear,
            minYear = wrapper.minYear;

        var y = yearSelect.options, yi = y.length,
            m = monthSelect.options, mi = m.length;

        //边界处理
        //TODO 加入箭头的disable样式
        var oldYear = calendar.getYear(), oldMonth = calendar.getMonth();

        //达到左边界
        if (oldYear == minYear && oldMonth == 1 && offsetMonth < 0) {
            return;
        }
        //达到右边界
        if (oldYear == maxYear && oldMonth == 12 && offsetMonth > 0) {
            return;
        }

        //默认处理
        calendar.move(offsetMonth);
        var curYear = calendar.getYear(), curMonth = calendar.getMonth();

        //刷新select的值
        while (yi--) {
            if (y[yi].value == curYear) {
                y[yi].selected = true;
            }
        }
        while (mi--) {
            if (m[mi].value == curMonth) {
                m[mi].selected = true;
            }
        }

        //刷新控件
        ecCalendar.refresh(wrapper);
    },

    /**
     * 禁用一些日期的选择
     *
     * @param {ecui.ui.Calendar}    日历控件
     * @param {Date}                日期
     * @param {Boolean}                方向, true为向后
     */
    setDateDisabled: function (calendar, date, direction) {
        var grid = ecui.query({"parent": calendar})[0],
            oYear = date.getFullYear(), oMonth = date.getMonth() + 1, oDate = date.getDate(),
            curYear = calendar.getYear(), curMonth = calendar.getMonth();

        for (var i = 0, item; item = grid.getItem(i); i++) {
            var flag, tmp, direction = !!direction, enabled = item.isEnabled();
            if (curYear < oYear
                || curYear == oYear && curMonth < oMonth) {
                flag = !enabled ? false : direction;
            }
            if (curYear > oYear
                || curYear == oYear && curMonth > oMonth) {
                flag = !enabled ? false : !direction;
            }
            if (curYear == oYear && curMonth == oMonth) {

                tmp = direction ?
                parseInt(item.getBase().innerHTML) <= oDate
                    : parseInt(item.getBase().innerHTML) >= oDate;

                flag = !item.isEnabled() ? false : tmp;
            }

            item.setEnabled(flag);
        }
    },
    /**
     * 给输入框绑定日历
     *
     * @param    {HTMLElement}    input    需要绑定日历的输入框
     * @param    {String}        type    日历选项
     *
     * @return    {ecui.ui.Control}    包含日历控件的control
     */
    bind: function (input, type) {
        var core = baidu.dom, ec = ecui.dom,
            settings = {"input": input};

        var wrapper = ecCalendar.create(type, settings);

        input.onfocus = function () {
            var me = this,
                pos = ecui.dom.getPosition(me);

            wrapper.setPosition(pos.left + (baidu.browser.ie ? (-3) : 0), pos.top + me.offsetHeight);
            wrapper.show();
            ecui.setFocused(wrapper);
        };

        //用户不能自行输入
        input.onkeyup = function () {
            this.value = "";
        };
    }
};

ecui.dom.ready(ecCalendar.init);
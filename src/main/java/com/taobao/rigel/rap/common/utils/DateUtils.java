package com.taobao.rigel.rap.common.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public final static DateFormat DATE_FORMAT = new SimpleDateFormat(
            "yyyy-MM-dd");

    public final static DateFormat TIME_FORMAT = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");

    private static int counter = 1;

    public static boolean compWorkAndCurrByDate(Date workDay, Date currTime) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(workDay);
        c2.setTime(currTime);
        if (c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR)
                && (c1.get(Calendar.MONTH) == c2.get(Calendar.MONTH))
                && c1.get(Calendar.DAY_OF_MONTH) == c2
                .get(Calendar.DAY_OF_MONTH)) {
            return true;
        } else {
            return false;
        }
    }
}

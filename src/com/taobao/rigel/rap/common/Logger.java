package com.taobao.rigel.rap.common;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Logger {
	static int mockNum = 0;
	static Date mockNumDate = new Date();

	public static void mock() {
		Date now = new Date();
		if (!DateUtils.compWorkAndCurrByDate(mockNumDate, now)) {
            // clear real time log data per night
			mockNum = 0;
			mockNumDate = new Date();
            SystemVisitorLog.clear();
		}
		mockNum++;
	}

	public static int getMockNumToday() {
		return mockNum;
	}

    public static List<Item> getIpLog() {
        return SystemVisitorLog.getIpLog();
    }

    public static List<Item> getUserLog() {
        return SystemVisitorLog.getUserLog();
    }
}

package com.taobao.rigel.rap.common;

import java.util.Date;

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
}

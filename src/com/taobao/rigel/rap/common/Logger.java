package com.taobao.rigel.rap.common;

import java.util.Date;

public class Logger {
	static int mockNum = 0;
	static Date mockNumDate = new Date();

	public static void mock() {
		Date now = new Date();
		if (!DateUtils.compWorkAndCurrByDate(mockNumDate, now)) {
			mockNum = 0;
			mockNumDate = new Date();
		}
		mockNum++;
	}

	public static int getMockNumToday() {
		return mockNum;
	}
}

package com.taobao.rigel.rap.common;

import java.io.File;

import org.apache.struts2.ServletActionContext;

public class SystemSettings {

	public static final String APP_PATH = ServletActionContext
			.getServletContext().getRealPath("/");
	public static final String STATIC_ROOT = APP_PATH + "stat" + File.separator;

	public static final String projectContext = "/rap";
}

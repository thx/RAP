package com.taobao.rigel.rap.common;

import com.alibaba.platform.buc.sso.common.dto.SimpleSSOUser;



public class SystemConstant {
	public static final int DEFAULT_PAGE_SIZE = 12;
    public static final int ACCOUNT_LENGTH_MIN = 6;
    public static final int ACCOUNT_LENGTH_MAX = 32;
    public static final int NAME_LENGTH_MIN = 1;
    public static final int NAME_LENGTH_MAX = 32;
	public static String README_PATH = "";
	public static String ROOT = "";
	public static String DOMAIN_URL = "";
	public static final String ALI_LOGIN_URL = "login" + ".ali" + "ba" + "ba" + "-in" + "c.com";
    public static final String NODE_SERVER = "localhost:7429";
    public static boolean serviceInitialized = false;
	private static String domainURL = "";

	public static String getAliLoginUrl() {
		return ALI_LOGIN_URL;
	}

	public static String getDOMAIN_URL() {
		return domainURL;
	}
	public static void setDOMAIN_URL(String domainURL) {
		 SystemConstant.domainURL = domainURL;
	}
	
	public static SimpleSSOUser user = null;
	
	

}

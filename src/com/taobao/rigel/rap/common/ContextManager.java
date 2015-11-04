package com.taobao.rigel.rap.common;

import java.util.Map;

import com.opensymphony.xwork2.ActionContext;

public class ContextManager {
	public static final String  KEY_COUNT_OF_ONLINE_USER_LIST = "KEY_COUNT_OF_ONLINE_USER_LIST";
	public static final String KEY_ACCOUNT = "KEY_ACCOUNT";
	public static final String KEY_PROJECT_LOCK_LIST = "KEY_PROJECT_LOCK_LIST";
	public static final String KEY_USER_ID = "KEY_USER_ID";
	// public static final String KEY_CORP_NAME = "KEY_CORP_NAME";
    public static final String KEY_NAME = "KEY_NAME";
	
	@SuppressWarnings("rawtypes")
	public static Map getSession() {
		return ActionContext.getContext().getSession();
	}
	
	@SuppressWarnings("rawtypes")
	public static Map getApplication() {
		return ActionContext.getContext().getApplication();
	}
}

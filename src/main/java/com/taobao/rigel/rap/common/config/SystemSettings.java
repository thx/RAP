package com.taobao.rigel.rap.common.config;

import org.apache.struts2.ServletActionContext;

import java.io.File;

public class SystemSettings {

    public static final String APP_PATH = ServletActionContext
            .getServletContext().getRealPath("/");
    public static final String STATIC_ROOT = APP_PATH + "stat" + File.separator;

    public static final String projectContext = "";

    public static final int MOCK_SERVICE_TIMEOUT = 1000;

    public static String GET_DEFAULT_USER_SETTINGS(String key) {
        if (key == null || key.isEmpty()) {
            return null;
        }

        if (key.equals("inform")) {
            return "";
        }

        return null;

    }

    ;
}

package com.taobao.rigel.rap.common.config;

import com.alibaba.platform.buc.sso.common.dto.SimpleSSOUser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.util.Properties;


public class SystemConstant {
    private static final Logger logger = LogManager.getFormatterLogger(SystemConstant.class);
    public static final int DEFAULT_PAGE_SIZE = 12;
    public static final int ACCOUNT_LENGTH_MIN = 6;
    public static final int ACCOUNT_LENGTH_MAX = 32;
    public static final int NAME_LENGTH_MIN = 1;
    public static final int NAME_LENGTH_MAX = 32;
    public static final String ALI_LOGIN_URL = "login" + ".ali" + "ba" + "ba" + "-in" + "c.com";
    public static final String NODE_SERVER = "localhost:7429";
    public static String README_PATH = "";
    public static String ROOT = "";
    public static String DOMAIN_URL = "";
    public static boolean serviceInitialized = false;
    public static SimpleSSOUser user = null;
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

    private static Properties config;

    private static void loadConfig() {
        if (config == null) {
            config = new Properties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            try {
                config.load(loader.getResourceAsStream("config.properties"));
            } catch (IOException e) {
                e.printStackTrace();
                logger.error(e.getMessage());
            }
        }
    }

    public static String getConfig(String key)  {
        if (config == null) {
            loadConfig();
        }
        return config.getProperty(key);
    }


}

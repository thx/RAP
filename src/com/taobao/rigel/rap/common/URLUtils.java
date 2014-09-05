package com.taobao.rigel.rap.common;

/**
 * Created by mashengbo on 14-9-5.
 */
public class URLUtils {
    public static boolean isStaticUrl(String url) {
        if (url == null) {
            return false;
        }
        String [] extentions = new String[] {
                ".jpg", ".png", ".gif",
                ".js", ".css", ".font", ".woff"
        };
        for (String ex : extentions) {
            if (url.contains(ex)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isLogUrl(String url) {
        if (url == null) {
            return false;
        }
        String [] keys = new String[] {
                "logData.action", "getUnreadNotificationList.action"
        };
        for (String key : keys) {
            if (url.contains(key)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isMockServiceUrl(String url) {
        if (url == null) {
            return false;
        }
        String [] keys = new String[] {
                "/mockjs/", "/mock/", "/mockjsdata/"
        };
        for (String key : keys) {
            if (url.contains(key)) {
                return true;
            }
        }
        return false;
    }

    public static boolean shouldLog(String url) {
        return !(isStaticUrl(url) || isLogUrl(url));
    }
}

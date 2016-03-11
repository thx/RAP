package com.taobao.rigel.rap.common.utils;

/**
 * Created by mashengbo on 14-9-5.
 */
public class URLUtils {
    public static boolean isStaticUrl(String url) {
        if (url == null) {
            return false;
        }
        String[] extentions = new String[]{
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
        String[] keys = new String[]{
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
        String[] keys = new String[]{
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

    public static boolean isRelativeUrlExactlyMatch(String pattern, String requestUrl) {
        if (pattern == requestUrl) return true;
        if (pattern == null || requestUrl == null) return false;

        // process /:id/ syntax


        return getRelativeUrl(pattern).equals(getRelativeUrl(requestUrl));
    }

    public static String getDomain(String url) {
        if (url == null || !url.startsWith("http://")) {
            return "";
        }
        url = url.substring(7);
        if (url.indexOf("/") != -1) {
            url = url.substring(0, url.indexOf("/"));
        }
        return url;
    }

    public static String getRelativeUrl(String url) {
        if (url == null || url.isEmpty()) {
            return "";
        }
        if (url.contains("https://")) {
            url = url.substring(url.indexOf("/", 8));
        } else if (url.contains("http://")) {
            url = url.substring(url.indexOf("/", 7));
        }
        if (url.contains("?")) {
            url = url.substring(0, url.indexOf("?"));
        }
        if (url.charAt(0) != '/' && !url.startsWith("reg:")) {
            url = '/' + url;

        }
        return url;
    }

    public static String removeParamsInUrl(String url) {
        String result = url.replaceAll("/:[^/]*", "/:number");
        if (!result.startsWith("/")) {
            result = "/" + result;
        }
        return result;
    }

    public static String removeRealParamsInUrl(String url) {
        url = url.replaceAll("/\\d+(\\/|$)", "/:number$1");
        String result = url;
        if (!result.startsWith("/")) {
            result = "/" + result;
        }
        return result;
    }

}

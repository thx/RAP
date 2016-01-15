package com.taobao.rigel.rap.common.utils;

import java.util.List;

public class ArrayUtils {
    public static String join(List<?> arr, String seperator) {
        StringBuilder str = new StringBuilder();
        boolean isFirst = true;
        for (Object item : arr) {
            if (!isFirst) {
                str.append(seperator);
            }
            str.append(item);
            isFirst = false;
        }
        return str.toString();
    }
}

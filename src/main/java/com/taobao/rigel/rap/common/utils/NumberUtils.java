package com.taobao.rigel.rap.common.utils;

import java.util.Random;

public class NumberUtils {
    private static Random r = new Random();

    /**
     * random integer from 0 - 9
     *
     * @return
     */
    public static String randomInt10Str() {
        return new Integer(r.nextInt(9)).toString();
    }

    /**
     * random integer from 1 - 9
     *
     * @return
     */
    public static String randomInt10StrFrom1() {
        return new Integer(r.nextInt(8) + 1).toString();
    }

    public static String randomByFormat(String format) {
        boolean isFirst = true;
        while (true) {
            if (format.indexOf("x") < 0) {
                break;
            }
            format = format.replaceFirst("x", isFirst ? randomInt10StrFrom1()
                    : randomInt10Str());
            isFirst = false;
        }
        return format;
    }

    /**
     * random integer from 0 to (length - 1)
     *
     * @param length
     * @return
     */
    public static int randomInt(int length) {
        return r.nextInt(length - 1);
    }
}

package com.taobao.rigel.rap.common.utils;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

import java.io.UnsupportedEncodingException;

/**
 * Created with RAP.
 * User: andyfeng
 * Date: 2016/4/1
 * Time: 15:47
 * Description:
 */
public class Base64Utils {

    public static String encode(String str){
        String result = null ;
        if(str != null){
            try {
                result = Base64.encode(str.getBytes("UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}

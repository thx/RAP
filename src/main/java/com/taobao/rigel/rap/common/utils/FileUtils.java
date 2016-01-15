package com.taobao.rigel.rap.common.utils;

import com.taobao.rigel.rap.common.config.SystemConstant;

import java.io.*;
import java.util.Arrays;

/**
 * Created by mashengbo on 15/7/21.
 */
public class FileUtils {
    public static String JS_UTIL_DIR_PATH = SystemConstant.ROOT +
            FileUtils.concatFilePath(new String[]{"stat", "js", "util", ""});

    /**
     * concatenate file path with File.seperator
     *
     * @param subs
     * @return
     */
    public static String concatFilePath(String[] subs) {
        return ArrayUtils.join(Arrays.asList(subs), File.separator);
    }

    /**
     * read file, return file content
     *
     * @param filePath
     * @return
     */
    public static String readFileContent(String filePath) {
        try {
            FileInputStream fis = new FileInputStream(filePath);
            StringBuffer content = new StringBuffer();
            DataInputStream in = new DataInputStream(fis);
            BufferedReader d = new BufferedReader(new InputStreamReader(in,
                    "UTF-8"));
            String line = null;
            while ((line = d.readLine()) != null)
                content.append(line + "\n");
            d.close();
            in.close();
            fis.close();
            return content.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}

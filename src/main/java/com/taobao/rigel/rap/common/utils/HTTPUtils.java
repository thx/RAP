package com.taobao.rigel.rap.common.utils;

import org.apache.logging.log4j.LogManager;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Bosn on 14-8-25.
 */
public class HTTPUtils {
    private final static org.apache.logging.log4j.Logger logger = LogManager.getFormatterLogger(HTTPUtils.class.getName());

    // HTTP GET request
    public static String sendGet(String url) throws Exception {
        if (!url.startsWith("http://")) {
            url = "http://" + url;
        }

        url = url.replaceAll("<", "");
        url = url.replaceAll(">", "");

        String USER_AGENT = "Mozilla/5.0";

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Accept-Charset", "utf-8");
        con.setRequestProperty("contentType", "utf-8");

        int responseCode = con.getResponseCode();
        logger.info("\nSending 'GET' request to URL : " + url);
        logger.info("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream(), "UTF-8"));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        //System.out.println(response.toString());
        return response.toString();

    }


}

package com.taobao.rigel.rap.common;

import com.taobao.rigel.rap.account.bo.User;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bosn on 14-9-2.
 */
public class SystemVisitorLog {
    private static Map<String, Long> ipMap = new HashMap<String, Long>();
    private static Map<String, Long> userMap = new HashMap<String, Long>();

    public static String count(String ip) {
        Long ipCount = ipMap.get(ip);
        if (ipCount == null) {
            ipMap.put(ip, 0L);
            return "New visitor:" + ip;
        }

        ipCount++;
        ipMap.put(ip, ipCount);

        if ((ipCount + 1) % 100 == 0) {
            return "Visitor " + ip + " visit " + ipCount + " times.";
        } else {
            return null;
        }
    }

    public static String count(User user) {
        String account = user.getAccount();
        Long userCount = userMap.get(account);
        if (userCount == null) {
            userMap.put(account, 0L);
            return "New logined visitor:" + account;
        }

        userCount++;
        userMap.put(account, userCount);

        if ((userCount + 1) % 100 == 0) {
            return "Logined visitor " + account + " visit " + userCount + " times.";
        } else {
            return null;
        }
    }


    public static void clear() {
        ipMap.clear();
        userMap.clear();
    }

}

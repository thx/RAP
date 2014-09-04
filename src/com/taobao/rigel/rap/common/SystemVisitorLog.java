package com.taobao.rigel.rap.common;

import com.taobao.rigel.rap.account.bo.User;
import org.apache.logging.log4j.*;

import java.util.*;

/**
 * Created by Bosn on 14-9-2.
 */
public class SystemVisitorLog {
    private static Map<String, Long> ipMap = new HashMap<String, Long>();
    private static Map<String, Long> userMap = new HashMap<String, Long>();
    private static final org.apache.logging.log4j.Logger logger = LogManager.getFormatterLogger(SystemVisitorLog.class.getName());


    public static List<Item> getIpLog() {
        return getLogMap(ipMap);
    }

    public static List<Item> getUserLog() {
        return getLogMap(userMap);
    }

    private static List<Item> getLogMap(Map<String, Long> map) {
        List<Item> list = new ArrayList<Item>();
        for (String key : map.keySet()) {
            Item item = new Item();
            item.setKey(key);
            item.setValue(map.get(key).toString());
            list.add(item);
            if (list.size() > 100) break;
        }

        Collections.sort(list, new Comparator<Item>() {
            @Override
            public int compare(Item o1, Item o2) {
                return Integer.parseInt(o2.getValue()) - Integer.parseInt(o1.getValue());
            }
        });

        return list;
    }


    public static void count(String ip) {
        Long ipCount = ipMap.get(ip);
        if (ipCount == null) {
            ipMap.put(ip, 0L);
            logger.info("New visitor:" + ip);
            return;
        }

        ipCount++;

        ipMap.put(ip, ipCount);

        if ((ipCount + 1) % 100 == 0) {
            logger.info("Visitor [%s] visit %d times.", ip, ipCount);
        }
    }

    public static void count(User user) {
        String account = user.getAccount();
        Long userCount = userMap.get(account);
        if (userCount == null) {
            userMap.put(account, 0L);
            logger.info("New logined visitor %s", account);
            return;
        }

        userCount++;
        logger.debug("user log counter after ++:" + userCount);
        userMap.put(account, userCount);

        if ((userCount + 1) % 100 == 0) {
            logger.info("Logined visitor %s visit %d times.", account, userCount);
        }
    }


    public static void clear() {
        ipMap.clear();
        userMap.clear();
    }

}

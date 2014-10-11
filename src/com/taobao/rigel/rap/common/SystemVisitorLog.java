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
    private static Map<Long, Integer> realtimeMap = new HashMap<Long, Integer>();
    private static final int MAX_LOG_LENGTH = 10;
    private static final int REALTIME_TIME_SPAN = 60;

    private static final org.apache.logging.log4j.Logger logger = LogManager.getFormatterLogger(SystemVisitorLog.class.getName());

    public static List<Item> getIpLog() {
        return getLogMap(ipMap);
    }

    public static List<Item> getUserLog() {
        return getLogMap(userMap);
    }

    public static List<Map<String, Object>> getRealtimeMap(Long limitTime) {
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (limitTime == null) {
            limitTime = Long.MIN_VALUE;
        }

        Calendar c = Calendar.getInstance();
        c.set(Calendar.MILLISECOND, 0);
        c.add(Calendar.SECOND, -REALTIME_TIME_SPAN);
        Long timeStart = c.getTimeInMillis();


        for (int i = 0; i < REALTIME_TIME_SPAN; i++) {
            Map<String, Object> item = new HashMap<String, Object>();
            Long time = timeStart + 1000 * i;

            if (time <= limitTime) {
                continue;
            }

            Integer count = realtimeMap.get(time);
            if (count == null) {
                count = 0;
            }
            item.put("time", time);
            item.put("count", count);
            result.add(item);
        }

        return result;
    }

    private static List<Item> getLogMap(Map<String, Long> map) {
        List<Item> list = new ArrayList<Item>();
        for (String key : map.keySet()) {
            Item item = new Item();
            item.setKey(key);
            item.setValue(map.get(key).toString());
            list.add(item);

            if (list.size() >= MAX_LOG_LENGTH) break;
        }

        Collections.sort(list, new Comparator<Item>() {
            @Override
            public int compare(Item o1, Item o2) {
                return Integer.parseInt(o2.getValue()) - Integer.parseInt(o1.getValue());
            }
        });

        return list;
    }

    public static void count() {

        Calendar c = Calendar.getInstance();
        c.set(Calendar.MILLISECOND, 0);

        Integer nowCount = realtimeMap.get(c.getTimeInMillis());

        if (nowCount == null) {
            nowCount = 0;
        }

        nowCount++;

        realtimeMap.put(c.getTimeInMillis(), nowCount);
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
        String name = user.getName();
        String account = user.getAccount();
        Long userCount = userMap.get(name);
        if (userCount == null) {
            userMap.put(name, 0L);
            logger.info("New logined visitor %s(%s)", name, account);
            return;
        }

        userCount++;
        logger.debug("user log counter after ++:" + userCount);
        userMap.put(name, userCount);

        if ((userCount + 1) % 100 == 0) {
            logger.info("Logined visitor %s(%s) visit %d times.", name, account, userCount);
        }
    }


    public static void clear() {
        ipMap.clear();
        userMap.clear();
        realtimeMap.clear();
    }

    public static void debug(String msg) {
        logger.info("[DEBUG]" + msg);
    }

}

package com.taobao.rigel.rap.common.utils;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.bo.Item;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.*;

/**
 * Created by Bosn on 14-9-2.
 */
public class SystemVisitorLog {
    private static final int MAX_LOG_LENGTH = 10;
    private static final int REALTIME_TIME_SPAN = 60;
    private static final Logger logger = LogManager.getFormatterLogger(SystemVisitorLog.class);
    private static Map<String, Long> ipMap = new HashMap<String, Long>();
    private static Map<String, Long> userMap = new HashMap<String, Long>();
    private static List<Map<String, String>> mockMapList = new ArrayList<Map<String, String>>();
    private static Map<Integer, Integer> mockMap = new HashMap<Integer, Integer>();
    private static Map<Long, Integer> realtimeMap = new HashMap<Long, Integer>();
    private static int mockTotalNum = 0;
    private static Date mockTotalNumDate = new Date();
    // private static Map<Integer, Integer> cacheIdMap = new HashMap<Integer, Integer>(); // key = actionId, value = projectId
    // private static int counter = 1;

    public static List<Project> mock(int projectId, String methodName, String pattern, String account) {
        Date now = new Date();
        List<Project> resultList = new ArrayList<Project>();


        if (!DateUtils.compWorkAndCurrByDate(mockTotalNumDate, now)) {
            // clear real time log data per night
            resultList = SystemVisitorLog.clear();
        }

        mockTotalNum++;
        Integer mockNum = mockMap.get(projectId);
        if (mockNum == null) {
            mockNum = 0;
        }
        mockMap.put(projectId, mockNum + 1);

        Map<String, String> mockInfo = new HashMap<String, String>();
        mockInfo.put("methodName", methodName);
        mockInfo.put("userAccount", account);
        mockInfo.put("pattern", pattern);
        mockMapList.add(mockInfo);
        return resultList;
    }

    public static int getMockNumToday() {
        return mockTotalNum;
    }

    public static List<Item> getIpLog() {
        return getLogMap(ipMap, MAX_LOG_LENGTH);
    }

    public static List<Item> getUserLog() {
        return getLogMap(userMap, MAX_LOG_LENGTH);
    }

    public static List<Item> getAllIpLog() {
        return getLogMap(ipMap, 0);
    }

    public static List<Item> getAllUserLog() {
        return getLogMap(userMap, 0);
    }

    public static List<Map<String, String>> getMockMapList() {
        return mockMapList;
    }

    public static List<Map<String, Object>> getRealtimeMap(String p) {
        long limitTime = Long.parseLong(p);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (limitTime == 0) {
            limitTime = Integer.MIN_VALUE;
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

    private static List<Item> getLogMap(Map<String, Long> map, int max) {
        if (max <= 0) {
            max = Integer.MAX_VALUE;
        }
        List<Item> list = new ArrayList<Item>();
        for (String key : map.keySet()) {
            Item item = new Item();
            item.setKey(key);
            item.setValue(map.get(key).toString());
            list.add(item);
        }

        Collections.sort(list, new Comparator<Item>() {
            
            public int compare(Item o1, Item o2) {
                return Integer.parseInt(o2.getValue()) - Integer.parseInt(o1.getValue());
            }
        });

        return list.subList(0, max >= list.size() ? list.size() : max);
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

    public static void count(Map<String, String> mockLog) {
        mockMapList.add(mockLog);
    }

    public static List<Project> clear() {
        List<Project> resultList = new ArrayList<Project>();

        for (Integer projectId : mockMap.keySet()) {
            Project p = new Project();
            p.setId(projectId);
            p.setMockNum(mockMap.get(projectId));
            resultList.add(p);
        }

        mockTotalNum = 0;
        mockTotalNumDate = new Date();
        ipMap.clear();
        userMap.clear();
        realtimeMap.clear();
        mockMapList.clear();
        mockMap.clear();

        return resultList;
    }


    public static void debug(String msg) {
        logger.info("[DEBUG]" + msg);
    }

    public static List<Map<String, Object>> getMockNumByProjectToday(ProjectMgr projectMgr) {
        List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
        for (Integer id : mockMap.keySet()) {
            if (id == null) continue;
            Project p = projectMgr.getProjectSummary(id);
            if (p == null) continue;
            String name = p.getName();
            Map<String, Object> row = new HashMap<String, Object>();
            row.put("id", id);
            row.put("mockNum", mockMap.get(id));
            row.put("name", name);
            results.add(row);
        }
        Collections.sort(results, new Comparator<Map<String, Object>>() {
            
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                return (Integer) o2.get("mockNum") - (Integer) o1.get("mockNum");
            }
        });
        if (results.size() > 5) {
            results = results.subList(0, 5);
        }
        return results;
    }

}

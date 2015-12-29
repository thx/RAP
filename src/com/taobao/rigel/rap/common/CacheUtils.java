package com.taobao.rigel.rap.common;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.project.bo.Action;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Bosn on 14/11/28.
 * Basic cache, need weight for string length.
 */
public class CacheUtils {
    private static Map<Long, String> cachedRules = new ConcurrentHashMap<Long, String>();
    private static Map<Long, Map<String, List<Corporation>>> cachedTeams = new ConcurrentHashMap<Long, Map<String, List<Corporation>>>();

    private static Map<Long, Long> rulesFrequency = new ConcurrentHashMap<Long, Long>(); // frequency of rules cache
    private static Map<Long, Long> teamsFrequency = new ConcurrentHashMap<Long, Long>(); // frequency of teams cache

    private static long cachedSize = 0; // cached size in total
    private static long cachedRuleSize = 0; // cached size of rules cache
    private static long cachedTeamSize = 0; // cached size of teams cache

    /**
     * get cached Mock rule
     *
     * @param action
     * @param pattern
     * @return
     */
    public static String getRuleCache(Action action, String pattern) {
        long actionId = action.getId();
        String requestUrl = action.getRequestUrl();
        if (requestUrl == null) {
            requestUrl = "";
        }
        if (pattern.contains("noCache=true") || requestUrl.contains("{")
                || requestUrl.contains("noCache=true")) {
            return null;
        }
        String cache = cachedRules.get(actionId);
        if (cache != null) {
            Long fre = rulesFrequency.get(actionId);
            if (fre != null) {
                rulesFrequency.put(actionId, fre + 1);
            }
        }
        return cache;
    }

    public static List<Corporation> getTeamCache(long userId, int pageNum, int pageSize) {
        String key = "" +  pageNum + pageSize;
        Map<String, List<Corporation>> teamCache = cachedTeams.get(userId);
        if (teamCache != null && teamCache.get(key) != null) {
            return teamCache.get(key);
        }
        return null;
    }

    /**
     * set Mock rule cache
     *
     * @param actionId
     * @param result
     */
    public static void setRuleCache(long actionId, String result) {
        if (!cachedRules.containsKey(actionId)) {
            cachedRules.put(actionId, result);
            rulesFrequency.put(actionId, 0L);
            cachedRuleSize++;
            cachedSize++;
        }

    }

    public static void setTeamCache(long userId, int pageNum, int pageSize, List<Corporation> teamList) {
        String key = "" +  pageNum + pageSize;
        if (!cachedTeams.containsKey(userId)) {
            Map<String, List<Corporation>> teamMap = cachedTeams.get(userId);
            if (teamMap == null) {
                teamMap = new ConcurrentHashMap<String, List<Corporation>>();
            }
            if (!teamMap.containsKey(key)) {
                teamMap.put(key, teamList);
                cachedTeams.put(userId, teamMap);
                teamsFrequency.put(userId, 0L);
                cachedTeamSize++;
                cachedSize++;
            }
        }
    }

    public static void removeTeamCache(long userId) {
        if (cachedTeams.containsKey(userId)) {
            cachedTeams.remove(userId);
            teamsFrequency.remove(userId);
            cachedTeamSize--;
            cachedSize--;
        }
    }

    /**
     * remove rule cache
     * @param actionId
     */
    private static void removeRuleCache(long actionId) {
        if (cachedRules.containsKey(actionId)) {
            cachedRules.remove(actionId);
            rulesFrequency.remove(actionId);
            cachedRuleSize--;
            cachedSize--;
        }
    }

    public static long getCachedRuleSize() {
        return cachedRuleSize;
    }

    public static void removeCacheByActionId(long id) {
        removeRuleCache(id);
    }

    public static long getCachedTeamSize() {return cachedTeamSize;}

    public static long getCachedSize() {return cachedSize;}
}

package com.taobao.rigel.rap.common;
import com.taobao.rigel.rap.project.bo.Action;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bosn on 14/11/28.
 * Basic cache, need weight for string length.
 */
public class CacheUtils {
    private static Map<Long, String> cachedRules = new HashMap<Long, String>();
    private static Map<Long, Long> rulesFrequency = new HashMap<Long, Long>(); // frequency cache
    private static long cachedSize = 0; // cached size in total
    private static long cachedRuleSize = 0; // cached size of rules cache

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
        };

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
}

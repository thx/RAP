package com.taobao.rigel.rap.common;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bosn on 14/11/28.
 * Basic cache, need weight for string length.
 */
public class CacheUtils {
    private static Map<Integer, String> cachedRules = new HashMap<Integer, String>();
    private static Map<Integer, Long> rulesFrequency = new HashMap<Integer, Long>(); // frequency cache
    private static long cachedSize = 0; // cached size in total
    private static long cachedRuleSize = 0; // cached size of rules cache

    /**
     * get cached Mock rule
     *
     * @param actionId
     * @return
     */
    public static String getRuleCache(int actionId) {
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
    public static void setRuleCache(int actionId, String result) {
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
    public static void removeRuleCache(int actionId) {
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
}

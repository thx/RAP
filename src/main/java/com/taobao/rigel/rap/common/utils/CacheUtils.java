package com.taobao.rigel.rap.common.utils;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.project.bo.Action;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisConnectionException;
import sun.misc.Cache;

import java.util.List;

/**
 * Created by Bosn on 14/11/28.
 * Basic cache, need weight for string length.
 */
public class CacheUtils {
    private static final int DEFAULT_CACHE_EXPIRE_SECS = 600;
    private static final Logger logger = LogManager.getLogger(CacheUtils.class);

    public static final String KEY_MOCK_RULE = "KEY_MOCK_RULE:";
    public static final String KEY_MOCK_DATA = "KEY_MOCK_DATA";
    public static final String KEY_PROJECT_LIST = "KEY_PROJECT_LIST";
    public static final String KEY_CORP_LIST = "KEY_CORP_LIST";
    public static final String KEY_CORP_LIST_TOP_ITEMS = "KEY_CORP_LIST_TOP_ITEMS";
    public static final String KEY_WORKSPACE = "KEY_WORKSPACE";

    public static final String KEY_ACCESS_USER_TO_PROJECT = "KEY_ACCESS_USER_TO_PROJECT";
    public static final String KEY_NOTIFICATION = "KEY_NOTIFICATION";

    public CacheUtils() {}

    private static Jedis getJedis() {
        return JedisFactory.getInstance().getJedisPool().getResource();
    }

    /**
     * get cached Mock rule
     *
     * @param action
     * @param pattern
     * @return
     */
    public static String getRuleCache(Action action, String pattern, boolean isMockData) {
        int actionId = action.getId();
        String requestUrl = action.getRequestUrl();
        if (requestUrl == null) {
            requestUrl = "";
        }
        if (pattern.contains("noCache=true") || requestUrl.contains("{")
                || requestUrl.contains("noCache=true")) {
            return null;
        }
        String [] cacheKey = new String[]{isMockData ? KEY_MOCK_DATA
                 : KEY_MOCK_RULE, new Integer(actionId).toString()};
        return get(cacheKey);
    }

    /**
     * set Mock rule cache
     *
     * @param actionId
     * @param result
     */
    public static void setRuleCache(int actionId, String result, boolean isMockData) {
        String[] cacheKey = new String[]{isMockData ? KEY_MOCK_DATA : KEY_MOCK_RULE, new Integer(actionId).toString()};
        put(cacheKey, result);
    }


    public static void removeCacheByActionId(long id) {
        getJedis().del(KEY_MOCK_RULE + id);
    }

    public static void put(String [] keys, String value, int expireInSecs) {
        Jedis jedis = getJedis();
        String cacheKey = StringUtils.join(keys, "|");
        jedis.set(cacheKey, value);
        if (expireInSecs > 0)
            jedis.expire(cacheKey, expireInSecs);
    }

    public static void put(String [] keys, String value) {
        put(keys, value, DEFAULT_CACHE_EXPIRE_SECS);

    }

    public static String get(String []keys) {
        return getJedis().get(StringUtils.join(keys, "|"));
    }

    public static void del(String[] keys) {
        String cacheKey = StringUtils.join(keys, "|");
        getJedis().del(cacheKey);
    }
}

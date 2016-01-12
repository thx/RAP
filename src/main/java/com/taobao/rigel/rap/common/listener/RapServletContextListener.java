package com.taobao.rigel.rap.common.listener;

import com.taobao.rigel.rap.common.utils.CacheUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisConnectionException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by Bosn Ma on 15/9/7.
 */
public class RapServletContextListener implements ServletContextListener {
    private static final Logger logger = LogManager.getFormatterLogger(RapServletContextListener.class);

    public void contextInitialized(ServletContextEvent servletContextEvent) {
        logger.info("RAP Server initializing...");

        // initializing redis server
        logger.info("Initializing Redis Cache Server...");

        try {
            CacheUtils.jedis = new Jedis("localhost");

            CacheUtils.jedis.flushAll();
           logger.info("Redis Cache Server ready.");
        } catch (JedisConnectionException ex) {
            logger.error("Cannot connect Redis Cache Server, please check your Redis Server status. Error: " + ex.getMessage());
            throw ex;
        }

        logger.info("RAP Server ready.");
    }


    public void contextDestroyed(ServletContextEvent arg0) {
        logger.info("Context destroyed.");
    }
}

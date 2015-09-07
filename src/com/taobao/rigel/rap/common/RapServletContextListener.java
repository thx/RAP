package com.taobao.rigel.rap.common;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by Bosn Ma on 15/9/7.
 */
public class RapServletContextListener implements ServletContextListener{
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("Server initializing...");


    }

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        System.out.println("Server started.");
    }
}

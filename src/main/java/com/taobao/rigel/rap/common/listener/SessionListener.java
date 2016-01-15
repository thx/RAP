package com.taobao.rigel.rap.common.listener;

import com.taobao.rigel.rap.common.service.impl.ContextManager;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.Map;


public class SessionListener implements HttpSessionListener {


    public void sessionCreated(HttpSessionEvent event) {
        ServletContext context = event.getSession().getServletContext();
        // online users count processing
        String key = ContextManager.KEY_COUNT_OF_ONLINE_USER_LIST;
        if (context.getAttribute(key) == null) {
            context.setAttribute(key, 0);
        }
        int curCountOfOnlineuserList = (Integer) context.getAttribute(key);
        context.setAttribute(key, curCountOfOnlineuserList + 1);
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        ServletContext context = event.getSession().getServletContext();
        HttpSession session = event.getSession();
        // online users count processing

        String key = ContextManager.KEY_COUNT_OF_ONLINE_USER_LIST;
        if (context.getAttribute(key) == null) {
            context.setAttribute(key, 0);
        }
        int curCountOfOnlineuserList = (Integer) context.getAttribute(key);
        if (curCountOfOnlineuserList < 1) curCountOfOnlineuserList = 1;
        context.setAttribute(key, curCountOfOnlineuserList - 1);

        // unlock project
        Object userIdObj = session.getAttribute(ContextManager.KEY_USER_ID);
        if (userIdObj != null) {
            long userId = (Long) userIdObj;
            Object projectLockListObj = context.getAttribute(ContextManager.KEY_PROJECT_LOCK_LIST);
            if (projectLockListObj != null) {
                Map projectLockList = (Map) projectLockListObj;
                if (projectLockList.containsKey(userId)) {
                    projectLockList.remove(userId);
                    context.setAttribute(ContextManager.KEY_PROJECT_LOCK_LIST, projectLockList);
                }
            }
        }
    }

}

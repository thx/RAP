package com.alibaba.buc.sso.client.handler.impl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.platform.buc.sso.common.dto.User;

/**
 * 类SSOCallback.java的实现描述：应用自定义的SSO回调管理类 使用webx框架开发的应用请注意：
 * 这里的request和response都是原生态的，不是webx包装过的，如果使用request.getSession().setAttribute，在screen下的webx包装过的request是拿不到的
 *
 * @author chivas.liuzh 9 Sep 2011 1:17:31 AM
 */
public class SimpleSSOCallback {
 
    public SimpleSSOCallback(){
    }
 
    /**
     * 在跳转SSO登录页面之前，执行用户自定义的操作
     *
     * @param request
     * @param response
     */
    public void beforeLogin(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                     ServletException {
    }
 
    /**
     * 在登录成功后，执行用户自定义的操作
     *
     * @param request
     * @param response
     */
    public void afterLogin(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                     ServletException {
    }
 
    /**
     * 用户持续操作时，默认每隔5分钟（BucSSOConstants.HEART_BEAT_TIME）会更新SSO_TOKEN，此时可以相应执行用户自定义的操作
     *
     * @param request
     * @param response
     */
    public void afterHeartBeatTime(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                     ServletException {
    }
 
    /**
     * 判定当前请求是否直接绕过SSO验证。 比如可以在这里忽略指定的client端IP列表、服务器列表，或者当域名非法时可以抛出异常
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    public boolean isRequestIgnored(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                             ServletException {
        return false;
    }
 
    /**
     * 用户登录后，保存用户信息
     *
     * @param user
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void addUser(User user, HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                            ServletException {
        addCookie(user.getAccount(), request, response);
 
    }
 
    /**
     * 返回当前用户是否已经登录
     *
     * @param request
     * @param response
     * @return
     */
    public boolean checkUser(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                      ServletException {
        return checkCookie(request, response);
    }
 
    /**
     * 用户登出后，清理用户信息
     *
     * @param request
     * @param response
     */
    public void removeUser(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                    ServletException {
        removeCookie(request, response);
    }
 
    /**
     * 添加指定的cookie到response.
     * Deprecated.use addUser instead.
     *
     * @param user
     * @param request
     * @param response
     */
    @Deprecated
    public void addCookie(String userName, HttpServletRequest request, HttpServletResponse response)
                                                                                                    throws IOException,
                                                                                                    ServletException {
        throw new UnsupportedOperationException();
    }
 
    /**
     * 返回当前用户是否已经登录.
     * Deprecated.use checkUser instead.
     *
     * @param request
     * @param response
     * @return
     */
    @Deprecated
    public boolean checkCookie(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                        ServletException {
        throw new UnsupportedOperationException();
    }
 
    /**
     * 清理用户cookie
     * Deprecated.use removeUser instead.
     *
     * @param request
     * @param response
     */
    @Deprecated
    public void removeCookie(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                      ServletException {
        throw new UnsupportedOperationException();
    }
}
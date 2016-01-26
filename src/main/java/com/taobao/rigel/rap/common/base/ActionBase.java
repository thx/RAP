package com.taobao.rigel.rap.common.base;

import com.google.gson.reflect.TypeToken;
import com.opensymphony.xwork2.ActionSupport;
import com.taobao.rigel.rap.account.bo.Role;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.service.impl.ContextManager;
import com.taobao.rigel.rap.common.bo.RapError;
import com.taobao.rigel.rap.common.config.SystemSettings;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.utils.CommonUtils;
import com.taobao.rigel.rap.organization.bo.Corporation;

import java.util.*;

public class ActionBase extends ActionSupport {

    public static String JSON_ERROR = "json-error";

    public static String LOGIN_WARN_MSG = "您登录过期啦，不要乱动哦，请打开新页面登录后再提交吧 >  。<";

    public static String LOGIN_HINT_MSG = "您尚未登录，或登录已过期，请登录后再试。";

    public static String ACCESS_DENY = "您无权访问该页面或数据，请联系系统管理员。";
    private boolean isOpSuccess = false;
    private boolean isReturnUrlFirstSet;
    private boolean isLoginCtlHidden;
    private int num;
    private String returnUrl;
    private AccountMgr accountMgr;
    private boolean isOk = true;
    private String json;
    private String errMsg;

    public boolean isOpSuccess() {
        return isOpSuccess;
    }

    public void setIsOpSuccess(boolean isOpSuccess) {
        this.isOpSuccess = isOpSuccess;
    }

    public List<Map<String, Object>> getCorpList() {
        String [] cacheKey = new String[]{CacheUtils.KEY_CORP_LIST_TOP_ITEMS, new Integer(getCurUserId()).toString()};
        String cache = CacheUtils.get(cacheKey);
        List<Map<String, Object>> corpList = new ArrayList<Map<String, Object>>();
        if (cache != null) {
            corpList = CommonUtils.gson.fromJson(cache, new TypeToken<ArrayList<Corporation>>(){}.getType());
        } else {
            List<Corporation> list = accountMgr.getCorporationListWithPager(getCurUserId(), 1, 40);
            for (Corporation c : list) {
                corpList.add(c.toMap());
            }
            CacheUtils.put(cacheKey, CommonUtils.gson.toJson(corpList));
        }
        return corpList;
    }

    public List<Map<String, Object>> getAllCorpList() {
        String [] cacheKey = new String[]{CacheUtils.KEY_CORP_LIST, new Integer(getCurUserId()).toString()};
        String cache = CacheUtils.get(cacheKey);
        List<Map<String, Object>> corpList = new ArrayList<Map<String, Object>>();
        if (cache != null) {
            corpList = CommonUtils.gson.fromJson(cache,  new TypeToken<ArrayList<Corporation>>(){}.getType());
        } else {
            List<Corporation> list = accountMgr.getCorporationListWithPager(getCurUserId(), 1, 999);
            for (Corporation c : list) {
                corpList.add(c.toMap());
            }
            CacheUtils.put(cacheKey, CommonUtils.gson.toJson(corpList));
        }
        return corpList;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public boolean isLoginCtlHidden() {
        return isLoginCtlHidden;
    }

    public void setLoginCtlHidden(boolean isLoginCtlHidden) {
        this.isLoginCtlHidden = isLoginCtlHidden;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public Long getServerTime() {
        return new Date().getTime();
    }

    public AccountMgr getAccountMgr() {
        return accountMgr;
    }

    public void setAccountMgr(AccountMgr accountMgr) {
        this.accountMgr = accountMgr;
    }

    public String getCurAccount() {
        return isUserLogined() ? ContextManager.currentSession()
                .get(ContextManager.KEY_ACCOUNT).toString() : null;
    }

    public boolean getIsLogined() {
        return isUserLogined();
    }

    protected boolean isUserLogined() {
        return ContextManager.currentSession().get(ContextManager.KEY_ACCOUNT) != null;
    }

    public int getCountOfOnlineUserList() {
        Map app = ContextManager.getApplication();
        String key = ContextManager.KEY_COUNT_OF_ONLINE_USER_LIST;
        if (app.get(key) == null) {
            return 0;
        } else {
            return (Integer) app.get(key);
        }
    }

    protected int getCurUserId() {
        Object userIdObj = ContextManager.currentSession().get(
                ContextManager.KEY_USER_ID);
       if (userIdObj == null)
           return -1;
        return (Integer) userIdObj;
    }

    public User getCurUser() {
        if (isUserLogined()) {
            User user = new User();
            Map session =  ContextManager.currentSession();
            user.setName((String)session.get(ContextManager.KEY_NAME));
            user.setAccount((String)session.get(ContextManager.KEY_ACCOUNT));
            user.setRoleList((Set<Role>)session.get(ContextManager.KEY_ROLE_LIST));
            user.setId((Integer)session.get(ContextManager.KEY_USER_ID));
            String empId = (String) session.get(ContextManager.KEY_EMP_ID);
            user.setEmpId(empId);
            return user;
        } else {
            return null;
        }
    }

    public boolean getIsOk() {
        return isOk;
    }

    public void setIsOk(boolean isOk) {
        this.isOk = isOk;
    }

    public boolean isReturnUrlFirstSet() {
        return isReturnUrlFirstSet;
    }

    public void setRelativeReturnUrl(String returnUrl) {
        this.returnUrl = SystemSettings.projectContext + returnUrl;
        this.isReturnUrlFirstSet = true;
    }

    public String getJson() {
        if (json == null || json.isEmpty()) {
            return new RapError().toString();
        }
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.isLoginCtlHidden = true;
        this.errMsg = errMsg;
        this.isOk = false;
    }

    public void plsLogin() {
        setErrMsg(LOGIN_HINT_MSG);
    }

}

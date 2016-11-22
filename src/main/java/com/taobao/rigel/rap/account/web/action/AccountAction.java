package com.taobao.rigel.rap.account.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.Role;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.service.impl.ContextManager;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.utils.Pinyin4jUtil;
import com.taobao.rigel.rap.common.utils.StringUtils;
import com.taobao.rigel.rap.common.utils.SystemVisitorLog;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import sun.misc.Cache;

import javax.mail.internet.AddressException;
import java.util.*;

/**
 * account action
 *
 * @author Bosn
 */
public class AccountAction extends ActionBase {

    private int userId;
    private int roleId;
    private String account;
    private String password;
    private String newPassword;
    private String name;
    private String email;
    private String SSO_TOKEN;
    private String BACK_URL;
    private OrganizationMgr organizationMgr;
    private int id;
    private String profileProperty;
    private String profileValue;
    private boolean isEditMode = false;

    public String kaptcha;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private User user;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String test() throws AddressException, InterruptedException {


        return SUCCESS;
    }

    public String getNotificationList() {
        if (!isUserLogined()) {
            plsLogin();
            return LOGIN;
        }
        List<Notification> list = getAccountMgr().getNotificationList(getCurUserId());
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Notification o : list) {
            Map<String, Object> m = new HashMap<String, Object>();
            m.put("id", o.getId());
            m.put("param1", o.getParam1());
            m.put("param2", o.getParam1());
            m.put("param3", o.getParam1());
            Map<String, Object> user = new HashMap<String, Object>();
            user.put("name", o.getUser().getName());
            user.put("id", o.getUser().getId());
            m.put("user", user);
            m.put("createTime", o.getCreateTime().getTime());
            m.put("typeId", o.getTypeId());
            result.add(m);
        }
        Gson gson = new Gson();
        String json = gson.toJson(result);
        setJson(json);
        return SUCCESS;
    }

    public String getUnreadNotificationList() {
        if (!isUserLogined()) {
            plsLogin();
            return LOGIN;
        }

        String[] cacheKey = new String[]{CacheUtils.KEY_NOTIFICATION, new Integer(getCurUserId()).toString()};

        String cache = CacheUtils.get(cacheKey);
        if (cache != null) {
            setJson(cache);
        } else {

            List<Notification> list = getAccountMgr().getUnreadNotificationList(getCurUserId());
            List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
            for (Notification o : list) {
                Map<String, Object> m = new HashMap<String, Object>();
                m.put("id", o.getId());
                m.put("param1", o.getParam1());
                m.put("param2", o.getParam2());
                m.put("param3", o.getParam3());

                Map<String, Object> user = new HashMap<String, Object>();
                user.put("name", o.getUser().getName());
                user.put("id", o.getUser().getId());
                m.put("user", user);

                Map<String, Object> targetUser = new HashMap<String, Object>();
                targetUser.put("name", o.getTargetUser().getName());
                targetUser.put("id", o.getTargetUser().getId());

                m.put("targetUser", targetUser);

                m.put("createTime", o.getCreateTime().getTime());
                m.put("createTimeStr", o.getCreateTimeStr());
                m.put("typeId", o.getTypeId());
                result.add(m);
            }
            Gson gson = new Gson();
            String json = gson.toJson(result);
            setJson(json);
            CacheUtils.put(cacheKey, json, 60 * 10);
        }
        return SUCCESS;
    }

    public String readAllNotification() {
        if (!isUserLogined()) {
            plsLogin();
            return LOGIN;
        }
        getAccountMgr().readNotificationList(getCurUserId());
        String[] cacheKey = new String[]{CacheUtils.KEY_NOTIFICATION, new Integer(getCurUserId()).toString()};
        CacheUtils.del(cacheKey);
        return SUCCESS;
    }

    public String getSSO_TOKEN() {
        return SSO_TOKEN;
    }

    public void setSSO_TOKEN(String sSO_TOKEN) {
        SSO_TOKEN = sSO_TOKEN;
    }

    public String getBACK_URL() {
        return BACK_URL;
    }

    public void setBACK_URL(String bACK_URL) {
        BACK_URL = bACK_URL;
    }

    public String all() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (id > 0) {
            Corporation c = organizationMgr.getCorporation(id);
            if (c.getAccessType() == Corporation.PUBLIC_ACCESS) {
                id = 0; // public access
            }
        }
        if (id > 0 && !organizationMgr.canUserManageCorp(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        Gson gson = new Gson();

        List<User> users = id > 0 ? super.getAccountMgr().getUserList(id) : super.getAccountMgr().getUserList();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (User user : users) {
            Map<String, Object> o = new HashMap<String, Object>();
            o.put("id", user.getId());
            o.put("name", user.getName());
            o.put("role", user.getRoleListStr());
            o.put("account", user.getAccount());
            o.put("realName", user.getRealname());
            o.put("empId", user.getEmpId());
            o.put("namePinyin", Pinyin4jUtil.calculatePinyinArrStr(user.getName()));
            o.put("realNamePinyin", Pinyin4jUtil.calculatePinyinArrStr(user.getRealname()));
            result.add(o);
        }
        setJson("{\"users\":" + gson.toJson(result) + "}");
        return SUCCESS;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password.trim();
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword.trim();
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name.trim();
    }

    public String getEmail() {
        return this.email.trim();
    }

    public void setEmail(String email) {
        this.email = email.trim().toLowerCase();
    }

    public String getProfileProperty() {
        return profileProperty;
    }

    public void setProfileProperty(String profileProperty) {
        this.profileProperty = profileProperty;
    }

    public String getProfileValue() {
        return profileValue;
    }

    public void setProfileValue(String profileValue) {
        this.profileValue = profileValue;
    }

    public boolean getIsEditMode() {
        return isEditMode;
    }

    public void setIsEditMode(boolean isEditMode) {
        this.isEditMode = isEditMode;
    }

    public String getKaptcha() {
        return this.kaptcha;
    }

    public void setKaptcha(String kaptcha) {
        this.kaptcha = kaptcha.trim();
    }

    public String login() {
        // if logged in, log out automatically
        doLogout();
        return SUCCESS;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String doLogin() {
        // 增加验证码
        Map<String,Object> session = ContextManager.currentSession();
        String kaptchaExpected = (String)session.get(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
        if(getKaptcha() == null || !getKaptcha().equals(kaptchaExpected)) {
            setErrMsg("验证码错误");
            return ERROR;
        }

        if (super.getAccountMgr().validate(getAccount(), getPassword())) {
            User user = getAccountMgr().getUser(getAccount());
            if (user != null && user.getId() > 0) {
                session.put(ContextManager.KEY_ACCOUNT, user.getAccount());
                session.put(ContextManager.KEY_USER_ID, user.getId());
                session.put(ContextManager.KEY_NAME, user.getName());
                Set<Role> roleList = new HashSet<Role>();
                for (Role role : user.getRoleList()) {
                    Role copied = new Role();
                    copied.setId(role.getId());
                    copied.setName(role.getName());
                    roleList.add(copied);
                }
                session.put(ContextManager.KEY_ROLE_LIST, roleList);
            } else {
                setErrMsg("用户不存在或密码错误");
                return ERROR;
            }
            if (getReturnUrl() != null && !getReturnUrl().trim().equals("")) {
                return "redirect";
            }
            return SUCCESS;
        } else {
            setErrMsg("用户不存在或密码错误");
            return ERROR;
        }
    }

    public String doLogout() {
        String key = ContextManager.KEY_ACCOUNT;
        if (ContextManager.currentSession().get(key) != null) {
            ContextManager.currentSession().remove(key);
        }
        return SUCCESS;
    }

    public String register() {
        doLogout();
        return SUCCESS;
    }

    public String doRegister() {
        if (!StringUtils.validateName(getName())) {
            setErrMsg(StringUtils.NAME_FORMAT_WARN_MSG);
            return ERROR;
        }

        if (!StringUtils.validateAccount(getAccount())) {
            setErrMsg(StringUtils.ACCOUNT_FORMAT_WARN_MSG);
            return ERROR;
        }

        User user = new User();
        user.setAccount(getAccount());
        user.setPassword(getPassword());
        user.setName(getName());
        user.setEmail(getEmail());

        String validateMsg = getAccountMgr().validatePasswordFormat(getPassword());
        if (validateMsg != null) {
            setErrMsg(validateMsg);
            return ERROR;
        }

        if (getAccountMgr().getUserId(user.getAccount()) > 0) {
            setErrMsg("该用户名" + user.getAccount() + "已经存在咯~~~");
            return ERROR;
        } else if (super.getAccountMgr().addUser(user)) {
            return doLogin();
        } else {
            return ERROR;
        }
    }

    public String myAccount() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/account/myAccount.action");
            return LOGIN;
        }
        user = getAccountMgr().getUser(getCurUserId());
        return SUCCESS;
    }

    public String mySetting() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/account/mySetting.action");
            return LOGIN;
        }
        return SUCCESS;
    }

    public String doChangeProfile() {
        super.getAccountMgr().changeProfile(
                super.getAccountMgr().getUser(super.getCurAccount()).getId(),
                getProfileProperty(), getProfileValue());
        return SUCCESS;
    }


    public String updateProfile() {

        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/account/updateProfile.do");
            return LOGIN;
        }
        user = getAccountMgr().getUser(getCurUserId());

        setIsEditMode(true);
        return SUCCESS;
    }

    public String doUpdateProfile() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/account/updateProfile.do");
            return LOGIN;
        }

        if (!StringUtils.validateName(getName())) {
            setIsEditMode(true);
            setErrMsg(StringUtils.NAME_FORMAT_WARN_MSG);
            return SUCCESS;
        }

        if (getNewPassword() != null && !getNewPassword().isEmpty()) {
            String validateMsg = getAccountMgr().validatePasswordFormat(getNewPassword());
            if (validateMsg != null) {
                setIsEditMode(true);
                setErrMsg(validateMsg);
                return SUCCESS;
            }
        }

        if (!super.getAccountMgr().updateProfile(getCurUserId(), getName(),
                getEmail(), getPassword(), getNewPassword())) {
            setIsEditMode(true);
            setErrMsg("旧密码输入错误");
        } else {
            user = getAccountMgr().getUser(getCurUserId()); // #592
            setIsOpSuccess(true);
        }

        return SUCCESS;
    }

    public String sendBucSSOToken() {
        return SUCCESS;
    }

    public String logData() {
        Map<String, Object> obj = new HashMap<String, Object>();
        obj.put("online", this.getCountOfOnlineUserList());
        obj.put("mockNumToday", SystemVisitorLog.getMockNumToday());
        Gson gson = new Gson();
        setJson(gson.toJson(obj));
        return SUCCESS;
    }
}

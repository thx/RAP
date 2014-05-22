package com.taobao.rigel.rap.account.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.internet.AddressException;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.ContextManager;
import com.taobao.rigel.rap.common.Logger;

/**
 * account action
 * 
 * @author Bosn
 * 
 */
public class AccountAction extends ActionBase {

	private static final long serialVersionUID = 1L;
	private long userId;
	private int roleId;
	private String account;
	private String password;
	private String newPassword;
	private String name;
	private String email;
	private String SSO_TOKEN;
	private String BACK_URL;

	public String test() throws AddressException, InterruptedException {
		AccountMgr mgr = getAccountMgr();
		
		
		
		List<Notification> list = mgr.getNotificationList(getCurUserId());
		setJson(list.toString());
		mgr.updateUserSetting(1, "test", "123 567");
		String r1 = mgr.getUserSetting(1, "test");
		mgr.updateUserSetting(1, "test2", "abc");
		String r2 = "";
		Map<String, String> settings = mgr.getUserSettings(1);
		for (String s : settings.keySet()) {
			r2 += s + "|" + settings.get(s) + ",";
		}
		setJson(r1 + r2);
		/**
		String[] list = new String[2];
		int i = 1; 
		list[0] = "huoyong.msb@alibaba-inc.com";
		list[1] = "zhifu.wzf@alibaba-inc.com";
		for (; i < 2; i++) {
		MailUtils.sendMessage(list, "RAP通知消息" + (i++),
				"this is an informing message!中文测试 hahahahaha看看发件人？");
		Thread.sleep(500);
		}
		*/
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
		Gson gson = new Gson();
		List<User> users = super.getAccountMgr().getUserList();
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (User user : users) {
			Map<String, Object> o = new HashMap<String, Object>();
			o.put("id", user.getId());
			o.put("name", user.getName());
			o.put("role", user.getRoleListStr());
			o.put("account", user.getAccount());
			o.put("realName", user.getRealName());
			result.add(o);
		}
		setJson("{\"users\":" + gson.toJson(result) + "}");
		return SUCCESS;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
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

	private String profileProperty;

	public String getProfileProperty() {
		return profileProperty;
	}

	public void setProfileProperty(String profileProperty) {
		this.profileProperty = profileProperty;
	}

	private String profileValue;

	public String getProfileValue() {
		return profileValue;
	}

	public void setProfileValue(String profileValue) {
		this.profileValue = profileValue;
	}

	private boolean isEditMode = false;

	public boolean getIsEditMode() {
		return isEditMode;
	}

	public void setIsEditMode(boolean isEditMode) {
		this.isEditMode = isEditMode;
	}

	public String login() {
		// if logged in, log out automatically
		doLogout();
		return SUCCESS;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String doLogin() {
		if (super.getAccountMgr().validate(getAccount(), getPassword())) {
			Map session = ContextManager.getSession();
			String account = getAccount();
			long userId = super.getAccountMgr().getUserId(account);
			session.put(ContextManager.KEY_ACCOUNT, account);
			session.put(ContextManager.KEY_USER_ID, userId);
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
		if (ContextManager.getSession().get(key) != null) {
			ContextManager.getSession().remove(key);
		}
		return SUCCESS;
	}

	// public String register() {
	// doLogout();
	// return SUCCESS;
	// }

	public String doRegister() {
		User user = new User();
		user.setAccount(getAccount());
		user.setPassword(getPassword());
		user.setName(getName());
		user.setEmail(getEmail());
		if (super.getAccountMgr().addUser(user)) {
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

	/**
	 * public String updateProfile() { setIsEditMode(true); return SUCCESS; }
	 * 
	 * public String doUpdateProfile() { if
	 * (!super.getAccountMgr().updateProfile(getCurUserId(), getName(),
	 * getEmail(), getPassword(), getNewPassword())) { setIsEditMode(true);
	 * setErrMsg("旧密码输入错误"); } return SUCCESS; }
	 */

	public String sendBucSSOToken() {
		return SUCCESS;
	}

	public String logData() {
		Map<String, Object> obj = new HashMap<String, Object>();
		obj.put("online", this.getCountOfOnlineUserList());
		obj.put("mockNumToday", Logger.getMockNumToday());
		Gson gson = new Gson();
		setJson(gson.toJson(obj));
		return SUCCESS;
	}
}

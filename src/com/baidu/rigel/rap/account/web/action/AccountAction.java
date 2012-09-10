package com.baidu.rigel.rap.account.web.action;

import java.util.Map;

import com.baidu.rigel.rap.account.bo.User;
import com.baidu.rigel.rap.common.ActionBase;
import com.baidu.rigel.rap.common.ContextManager;

/**
 * account action
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
	
	public String register() {
		doLogout();
		return SUCCESS;
	}
	
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
	
	public String doChangeProfile() {
		super.getAccountMgr().changeProfile(super.getAccountMgr().getUser(super.getCurAccount()).getId(), getProfileProperty(), getProfileValue());
		return SUCCESS;
	}
	
	public String updateProfile() {
		setIsEditMode(true);
		return SUCCESS;
	}
	
	public String doUpdateProfile() {
		if (!super.getAccountMgr().updateProfile(getCurUserId(), getName(), getEmail(), 
				getPassword(), getNewPassword())) {			
			setIsEditMode(true);
			setErrMsg("旧密码输入错误");
		}
		return SUCCESS;
	}
}

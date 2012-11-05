package com.baidu.rigel.rap.common;

import java.util.Map;

import com.baidu.rigel.rap.account.bo.User;
import com.baidu.rigel.rap.account.service.AccountMgr;
import com.opensymphony.xwork2.ActionSupport;

public class ActionBase extends ActionSupport {

	private static final long serialVersionUID = 1L;

	private boolean isReturnUrlFirstSet;
	
	private boolean isLoginCtlHidden;
	private int num;

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

	private String returnUrl;

	public String getReturnUrl() {
		return returnUrl;
	}

	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}

	private Pager pager;

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	protected void initPager() {
		if (getPager() == null) {
			setPager(new Pager());
		}
		if (getPager().getCurPagerNum() == 0) {
			getPager().setCurPagerNum(SystemConstant.FIRST_PAGE_NUM);
		}
		if (getPager().getPagerSize() == 0) {
			getPager().setPagerSize(SystemConstant.DEFAULT_PAGE_NUM);
		}
	}

	private AccountMgr accountMgr;

	public AccountMgr getAccountMgr() {
		return accountMgr;
	}

	public void setAccountMgr(AccountMgr accountMgr) {
		this.accountMgr = accountMgr;
	}

	public String getCurAccount() {
		return isUserLogined() ? ContextManager.getSession()
				.get(ContextManager.KEY_ACCOUNT).toString() : null;
	}

	public boolean getIsLogined() {
		return isUserLogined();
	}

	protected boolean isUserLogined() {
		return ContextManager.getSession().get(ContextManager.KEY_ACCOUNT) != null;
	}

	@SuppressWarnings("rawtypes")
	public int getCountOfOnlineUserList() {
		Map app = ContextManager.getApplication();
		String key = ContextManager.KEY_COUNT_OF_ONLINE_USER_LIST;
		if (app.get(key) == null) {
			return 0;
		} else {
			return (Integer) app.get(key);
		}
	}

	protected long getCurUserId() {
		Object account = ContextManager.getSession().get(
				ContextManager.KEY_ACCOUNT);
		if (account == null)
			return -1;
		String accountStr = account.toString().trim();
		if (accountStr == "")
			return -1;
		return accountMgr.getUserId(accountStr);
	}

	public User getCurUser() {
		if (isUserLogined()) {
			return accountMgr.getUser(getCurUserId());
		} else {
			return null;
		}
	}

	private boolean isOk = true;

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

	private String json;

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	private String errMsg;

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.isLoginCtlHidden = true;
		this.errMsg = errMsg;
	}

	public void plsLogin() {
		setErrMsg("请先登录");
	}
}

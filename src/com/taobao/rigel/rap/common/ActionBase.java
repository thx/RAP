package com.taobao.rigel.rap.common;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.organization.bo.Corporation;

public class ActionBase extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public static String JSON_ERROR = "json-error";

	public static String LOGIN_WARN_MSG = "您登录过期啦，不要乱动哦，请打开新页面登录后再提交吧 >  。<";

	private boolean isReturnUrlFirstSet;

	private boolean isLoginCtlHidden;
	private int num;

	public List<Corporation> getCorpList() {
		return accountMgr.getCorporationList();
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

    public Long getServerTime() {
        return new Date().getTime();
    }

    /**
     * void setter for cache aprams
     * @param seed
     */
    public void setSeed(int seed) {
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

    /**
	public String getCurCorpName() {
		Object nameObj = ContextManager.getSession().get(ContextManager.KEY_CORP_NAME);
		String name = null;
		if (nameObj != null) {
			name = nameObj.toString();
		}
		if (name == null || name.isEmpty()) {
			return "团队";
		}
		return name;
	}
     */

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
		if (json == null || json.isEmpty()) {
			return new RapError().toString();
		}
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

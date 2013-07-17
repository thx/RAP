package com.baidu.rigel.rap.tester.web.action;

import java.util.List;

import com.baidu.rigel.rap.account.bo.User;
import com.baidu.rigel.rap.account.service.AccountMgr;
import com.baidu.rigel.rap.common.StringUtils;
import com.baidu.rigel.rap.project.bo.Page;
import com.baidu.rigel.rap.project.service.ProjectMgr;
import com.opensymphony.xwork2.ActionSupport;

public class TesterAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private ProjectMgr projectMgr;
	private AccountMgr accountMgr;
	private int id;
	private Page page;
	private int projectId;

	public int getProjectId() {
		return projectId;
	}

	public Page getPage() {
		return page;
	}

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	public AccountMgr getAccountMgr() {
		return accountMgr;
	}

	public void setAccountMgr(AccountMgr accountMgr) {
		this.accountMgr = accountMgr;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String pageTester() {
		page = projectMgr.getPage(id);
		projectMgr.loadParamIdListForPage(page);
		projectId = page.getModule().getProject().getId();
		return SUCCESS;
	}
	
	/**
	 * used for system configuration when new version deployed
	 * @return
	 */
	public String ___init___() {
		List<User> userList = accountMgr.getUserList();
		for (User user : userList) {
			String password = user.getPassword();
			password = StringUtils.getMD5(password);
			password = StringUtils.getMD5(password);
			accountMgr._updatePassword(user.getAccount(), password);
		}
		return SUCCESS;
	}
}

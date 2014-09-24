package com.taobao.rigel.rap.tester.web.action;

import java.util.List;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.opensymphony.xwork2.ActionSupport;

public class TesterAction extends ActionBase {

	private static final long serialVersionUID = 1L;
	private ProjectMgr projectMgr;
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
        /**
		List<User> userList = getAccountMgr().getUserList();
		for (User user : userList) {
			String password = user.getPassword();
			password = StringUtils.getMD5(password);
			password = StringUtils.getMD5(password);
			getAccountMgr()._updatePassword(user.getAccount(), password);
		}
         */
		return SUCCESS;
	}
}

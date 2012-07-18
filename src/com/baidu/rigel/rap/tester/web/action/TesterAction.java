package com.baidu.rigel.rap.tester.web.action;

import com.baidu.rigel.rap.project.bo.Page;
import com.baidu.rigel.rap.project.service.ProjectMgr;
import com.opensymphony.xwork2.ActionSupport;

public class TesterAction extends ActionSupport {

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
		projectId = page.getModule().getProject().getId();
		return SUCCESS;
	}
}

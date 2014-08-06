package com.taobao.rigel.rap.api.web.action;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OpenAPIAction extends ActionBase {

	private static final long serialVersionUID = -1786553279434025468L;

	private ProjectMgr projectMgr;

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}
	
	private int projectId;
	
	public int getProjectId() {
		return projectId;
	}
	
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String queryModel() {
		Project p = projectMgr.getProject(projectId);
		String pJson = p.toString(Project.toStringType.TO_PARAMETER);
		Map<String, String> resultMap = new HashMap<String, String>();
		Gson g = new Gson();
		
		resultMap.put("modelJSON", pJson);
		String resultJson = g.toJson(resultMap);
		setJson(resultJson);
		return SUCCESS;
	}
}

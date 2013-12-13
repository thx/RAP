package com.taobao.rigel.rap.organization.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OrganizationAction extends ActionBase {
	private static final long serialVersionUID = -7254075166703993812L;
	private OrganizationMgr organizationMgr;
	private ProjectMgr projectMgr;
	

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	public OrganizationMgr getOrganizationMgr() {
		return organizationMgr;
	}

	public void setOrganizationMgr(OrganizationMgr organizationMgr) {
		this.organizationMgr = organizationMgr;
	}

	public String myHome() {
		return SUCCESS;
	}
	public String index() {
		return SUCCESS;
	}
	
	public String group() {
		return SUCCESS;
	}
	
	public String productline() {
		return SUCCESS;
	}
	
	public String projects() {
		if (!isUserLogined()) return LOGIN;
		Gson gson = new Gson();
		List<Map<String, Object>> projects = new ArrayList<Map<String, Object>>();
		long totalRecNum = projectMgr.getProjectListNum(getCurUser());	
		List<Project> projectList = projectMgr.getProjectList(getCurUser(), 1, (int)totalRecNum);
		for (Project p : projectList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", p.getId());
			map.put("name", p.getName());
			map.put("desc", p.getIntroduction());
			map.put("status", "最近n小时更新");
			projects.add(map);
		}
		StringBuilder json = new StringBuilder();
		json.append("{");
		json.append("	\"groups\" : [{");
		json.append("		\"type\" : \"user\",");
		json.append("		\"projects\" :");
		json.append(gson.toJson(projects));
		json.append("	}]");
		json.append("}");
		setJson(json.toString());
		return SUCCESS;
	}
	
	public String corporationList() {
		Gson gson = new Gson();
		setJson(gson.toJson(organizationMgr.getCorporationList()));
		return SUCCESS;
	}
	
}

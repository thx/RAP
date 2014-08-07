package com.taobao.rigel.rap.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.api.service.OpenAPIMgr;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OpenAPIMgrImpl implements OpenAPIMgr {
	
	ProjectMgr projectMgr;

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	@Override
	public String getModelJSON(int projectId) throws Exception {
		Project project = projectMgr.getProject(projectId);
		if (project == null || project.getId() == 0) {
			throw new Exception("Illegal project id");
		}
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", project.getId());
		model.put("name", project.getName());
		model.put("ver", project.getVersion());
		model.put("intro", project.getIntroduction());
		
		List<Map<String, Object>> moduleList = new ArrayList<Map<String, Object>>();

		for (Module m : project.getModuleList()) {
			
			Map<String, Object> module = new HashMap<String, Object>();
			module.put("id", m.getId());
			module.put("name", m.getName());
			module.put("intro", m.getIntroduction());
			
			List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

			for (Page p : m.getPageList()) {
				Map<String, Object> page = new HashMap<String, Object>();
				page.put("id", p.getId());
				page.put("name", p.getName());
				page.put("intro", p.getIntroduction());
				
				List<Map<String, Object>> interfaceList = new ArrayList<Map<String, Object>>();
				
				for (Action a : p.getActionList()) {
					Map<String, Object> action = new HashMap<String, Object>();
					action.put("id", a.getId());
					action.put("name", a.getName());
					action.put("desc", a.getDescription());
					action.put("reqType", a.getRequestType());
					action.put("reqUrl", a.getRequestUrl());
					interfaceList.add(action);
				}
				
				page.put("interfaceList", interfaceList);
				pageList.add(page);
			}
			
			module.put("pageList", pageList);
			moduleList.add(module);
		}
		
		
		model.put("moduleList", moduleList);
		Gson gson = new Gson();
		return gson.toJson(model);
	}

	@Override
	public String getActionJSONSchema(int actionId) {
	
		return null;
	}

}

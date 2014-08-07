package com.taobao.rigel.rap.api.web.action;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.api.service.OpenAPIMgr;
import com.taobao.rigel.rap.common.ActionBase;

public class OpenAPIAction extends ActionBase {

	private static final long serialVersionUID = -1786553279434025468L;

	private OpenAPIMgr openAPIMgr;

	public OpenAPIMgr getOpenAPIMgr() {
		return openAPIMgr;
	}

	public void setOpenAPIMgr(OpenAPIMgr openAPIMgr) {
		this.openAPIMgr = openAPIMgr;
	}

	private int projectId;

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String queryModel() throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		Gson g = new Gson();
		resultMap.put("modelJSON", openAPIMgr.getModelJSON(projectId));
		resultMap.put("code", 200);
		resultMap.put("msg", "");
		String resultJson = g.toJson(resultMap);
		setJson(resultJson);
		return SUCCESS;
	}
}

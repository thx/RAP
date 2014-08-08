package com.taobao.rigel.rap.api.web.action;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.api.service.OpenAPIMgr;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.project.bo.Action;

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

	private int actionId;

	public int getActionId() {
		return this.actionId;
	}

	public void setActionId(int actionId) {
		this.actionId = actionId;
	}

	public String queryModel() throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		Gson g = new Gson();
		resultMap.put("model", openAPIMgr.getModel(projectId));
		resultMap.put("code", 200);
		resultMap.put("msg", "");
		String resultJson = g.toJson(resultMap);
		setJson(resultJson);
		return SUCCESS;
	}

	public String querySchema() {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Gson g = new Gson();
		resultMap.put("schema",
				openAPIMgr.getSchema(actionId, Action.TYPE.RESPONSE));
		resultMap.put("code", 200);
		resultMap.put("msg", "");
		String resultJson = g.toJson(resultMap);
		setJson(resultJson);
		return SUCCESS;
	}
}

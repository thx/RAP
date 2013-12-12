package com.taobao.rigel.rap.organization.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;

public class OrganizationAction extends ActionBase {
	private static final long serialVersionUID = -7254075166703993812L;
	private OrganizationMgr organizationMgr;
	

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
	
	public String myProjectListData() {
		setJson("{\"isOk\":\"true\"}");
		return SUCCESS;
	}
	
	public String corporationList() {
		Gson gson = new Gson();
		setJson(gson.toJson(organizationMgr.getCorporationList()));
		return SUCCESS;
	}
	
}

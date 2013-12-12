package com.taobao.rigel.rap.organization.web.action;

import com.taobao.rigel.rap.common.ActionBase;

public class OrganizationAction extends ActionBase {
	private static final long serialVersionUID = -7254075166703993812L;
	
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
		setJson("{\"isOk\":\"true\"}");
		return SUCCESS;
	}
	
}

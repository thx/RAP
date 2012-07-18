package com.baidu.rigel.rap.project.bo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.baidu.rigel.rap.common.StringUtils;

public class Action implements java.io.Serializable{

	private static final long serialVersionUID = 1L;

	private int id;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	private String name;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	private String description;
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description == null ? "" : description;
	}
	
	private String requestType = "1";
	
	public String getRequestType() {
		return requestType;
	}
	
	public void setRequestType(String requestType) {
		if (requestType == null || requestType == "") return;
		this.requestType = requestType;
	}
	
	private String requestUrl;
	
	public String getRequestUrl() {
		return requestUrl;
	}
	
	public void setRequestUrl(String requestUrl) {
		this.requestUrl = requestUrl == null ? "" : requestUrl;
	}
	
	public void addParameter(Parameter parameter, boolean isRequest) {
		if (isRequest) {
			getRequestParameterList().add(parameter);
			parameter.getActionRequestList().add(this);
		} else {
			getResponseParameterList().add(parameter);
			parameter.getActionResponseList().add(this);
		}
	}
	
	private Set<Parameter> requestParameterList = new HashSet<Parameter>();
	
	public Set<Parameter> getRequestParameterList() {
		return requestParameterList;
	}
	
	public void setRequestParameterList(Set<Parameter> requestParameterList) {
		this.requestParameterList = requestParameterList;
	}
	
	private Set<Parameter> responseParameterList = new HashSet<Parameter>();
	
	public Set<Parameter> getResponseParameterList() {
		return responseParameterList;
	}
	
	public void setResponseParameterList(Set<Parameter> responseParameterList) {
		this.responseParameterList = responseParameterList;
	}
	
	public List<Parameter> getRequestParameterListOrdered() {
		Set<Parameter> parameterList = getRequestParameterList();
		List<Parameter> parameterListOrdered = new ArrayList<Parameter>();
		parameterListOrdered.addAll(parameterList);
		Collections.sort(parameterListOrdered, new ParameterComparator());
		return parameterListOrdered;
	}
	
	public List<Parameter> getResponseParameterListOrdered() {
		Set<Parameter> parameterList = getResponseParameterList();
		List<Parameter> parameterListOrdered = new ArrayList<Parameter>();
		parameterListOrdered.addAll(parameterList);
		Collections.sort(parameterListOrdered, new ParameterComparator());
		return parameterListOrdered;
	}
	
	private String responseTemplate;
	
	public String getResponseTemplate() {
		return responseTemplate;
	}
	
	public void setResponseTemplate(String responseTemplate) {
		this.responseTemplate = responseTemplate == null ? "" : responseTemplate;
	}
	
	private Set<Page> pageList = new HashSet<Page>();
	
	public Set<Page> getPageList() {
		return pageList;
	}
	
	public void setPageList(Set<Page> pageList) {
		this.pageList = pageList;
	}
	
	public void update(Action action) {
		setDescription(action.getDescription());
		setName(action.getName());
		setRequestType(action.getRequestType());
		setRequestUrl(action.getRequestUrl());
		setResponseTemplate(action.getResponseTemplate());
	}
	
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder();		
		
		stringBuilder.append("{\"id\":" + getId() + ",");
		stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\",");
		stringBuilder.append("\"description\":\"" + StringUtils.escapeInJ(getDescription()) + "\",");
		stringBuilder.append("\"requestType\":\"" + getRequestType() + "\",");
		stringBuilder.append("\"requestUrl\":\"" + StringUtils.escapeInJ(getRequestUrl()) + "\",");
		stringBuilder.append("\"responseTemplate\":\"" + StringUtils.escapeInJ(getResponseTemplate()) + "\",");
		stringBuilder.append("\"requestParameterList\":");

		stringBuilder.append("[");
		Iterator<Parameter> iterator = getRequestParameterListOrdered().iterator();
		while(iterator.hasNext()) {
			stringBuilder.append(iterator.next());
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		stringBuilder.append("],");
		
		stringBuilder.append("\"responseParameterList\":");

		stringBuilder.append("[");
		iterator = getResponseParameterListOrdered().iterator();
		while(iterator.hasNext()) {
			stringBuilder.append(iterator.next());
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		stringBuilder.append("]}");
		return stringBuilder.toString();
	}
}

package com.taobao.rigel.rap.project.bo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.taobao.rigel.rap.common.StringUtils;

public class Page implements java.io.Serializable {

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
	
	private String introduction;
	
	public String getIntroduction() {
		return introduction;
	}
	
	public void setIntroduction(String introduction) {
		this.introduction = (introduction == null ? "" : introduction);
	}
	
	private Module module;
	
	public Module getModule() {
		return module;
	}
	
	public void setModule(Module module) {
		this.module = module;
	}
	
	private Set<Action> actionList = new HashSet<Action>();
	
	public Set<Action> getActionList() {
		return actionList;		
	}
	
	public List<Action> getActionListOrdered() {
		Set<Action> actionList = getActionList();
		List<Action> actionListOrdered = new ArrayList<Action>();
		actionListOrdered.addAll(actionList);
		Collections.sort(actionListOrdered, new ActionComparator());
		return actionListOrdered;
	}

	
	public void setActionList(Set<Action> actionList) {
		this.actionList = actionList;
	}
	
	private String template;
	
	public String getTemplate() {
		return template;
	}
	
	public void setTemplate(String template) {
		this.template = template;
	}
	
	public void addAction(Action action) {
		getActionList().add(action);
		//action.getPageList().add(this);
	}
	
	public void update(Page page) {
		setIntroduction(page.getIntroduction());
		setName(page.getName());
		setTemplate(page.getTemplate());
	}
	
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder();		
		
		stringBuilder.append("{\"id\":" + getId() + ",");
		stringBuilder.append("\"introduction\":\"" + StringUtils.escapeInJ(getIntroduction()) + "\",");
		stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\",");
		stringBuilder.append("\"actionList\":");

		stringBuilder.append("[");
		Iterator<Action> iterator = getActionListOrdered().iterator();
		while(iterator.hasNext()) {
			stringBuilder.append(iterator.next());
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		stringBuilder.append("]}");
		
		return stringBuilder.toString();
	}	
	
	public String toString(Project.TO_STRING_TYPE type) {
		StringBuilder stringBuilder = new StringBuilder();		
		
		stringBuilder.append("{\"id\":" + getId() + ",");
		stringBuilder.append("\"introduction\":\"" + StringUtils.escapeInJ(getIntroduction()) + "\",");
		stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\"");
		if (type == Project.TO_STRING_TYPE.TO_PAGE) {
			stringBuilder.append("}");
		} else {
			stringBuilder.append(",\"actionList\":");	
			stringBuilder.append("[");
			Iterator<Action> iterator = getActionListOrdered().iterator();
			while(iterator.hasNext()) {
				stringBuilder.append(iterator.next());
				if (iterator.hasNext()) {
					stringBuilder.append(",");
				}
			}
			stringBuilder.append("]}");
		}		
		return stringBuilder.toString();
	}	
}

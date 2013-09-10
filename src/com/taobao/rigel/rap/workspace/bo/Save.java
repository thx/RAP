package com.taobao.rigel.rap.workspace.bo;

import java.util.Date;

import com.taobao.rigel.rap.common.DateUtils;
import com.taobao.rigel.rap.project.bo.Project;

public class Save implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	public enum TO_STRING_TYPE {WITH_PROJECT_DATA};
	
	private int id;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	private int workspaceId;
	
	public int getWorkspaceId() {
		return workspaceId;
	}
	
	public void setWorkspaceId(int workspaceId) {
		this.workspaceId = workspaceId;
	}
	
	private Date updateDate;
	
	public Date getUpdateDate() {
		return updateDate;
	}
	
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
	private String projectData;
	
	public String getProjectData() {
		return projectData;
	}
	
	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}
	
	private Project project;
	
	public Project getProject() {
		return project;
	}
	
	public void setProject(Project project) {
		this.project = project;
	}
	
	private Workspace workspace;
	
	public Workspace getWorkspace() {
		return workspace;
	}
	
	public void setWorkspace(Workspace workspace) {
		this.workspace = workspace;
	}
	
	private int projectId;
	
	public int getProjectId() {
		return projectId;
	}
	
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String toString() {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("{\"id\":" + getId() + ",");
		stringBuilder.append("\"workspaceId\":" + getWorkspaceId() + ",");
		stringBuilder.append("\"updateDate\":\"" + getUpdateDateStr() + "\",");
		stringBuilder.append("\"projectId\":" + getProjectId() + "}");
		return stringBuilder.toString();
	}
	
	public String getUpdateDateStr() {
		return getUpdateDate() == null ? "" : DateUtils.TIME_FORMAT.format(getUpdateDate());
	}
}

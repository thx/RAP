package com.taobao.rigel.rap.workspace.bo;

import com.taobao.rigel.rap.common.DateUtils;
import com.taobao.rigel.rap.project.bo.Project;

import java.util.Date;

public class Save implements java.io.Serializable {

    private int id;

    ;
    private int workspaceId;
    private Date updateDate;
    private String projectData;
    private Project project;
    private Workspace workspace;
    private int projectId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(int workspaceId) {
        this.workspaceId = workspaceId;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getProjectData() {
        return projectData;
    }

    public void setProjectData(String projectData) {
        this.projectData = projectData;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

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

    public enum TO_STRING_TYPE {WITH_PROJECT_DATA}
}

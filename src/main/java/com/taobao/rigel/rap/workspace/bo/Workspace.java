package com.taobao.rigel.rap.workspace.bo;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.project.bo.Project;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class Workspace implements java.io.Serializable {

    private int id;
    private Project project;
    private User user;
    private Date createDate;
    private Date updateDate;
    private Set<Save> saveList;
    private String projectData;
    private String projectDataOriginal;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getModeInt() {
        return project.getWorkspaceModeInt();
    }

    public ModeType getModeType() {
        return project.getWorkspaceMode();
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Set<Save> getSaveList() {
        return saveList;
    }

    public void setSaveList(Set<Save> saveList) {
        this.saveList = saveList;
    }

    public String getProjectData() {
        return projectData;
    }

    public void setProjectData(String projectData) {
        this.projectData = projectData;
    }

    public String getProjectDataOriginal() {
        return projectDataOriginal;
    }

    public void setProjectDataOriginal(String projectDataOriginal) {
        this.projectDataOriginal = projectDataOriginal;
    }

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{\"projectData\":" + getProject().getProjectData() + ",");
        stringBuilder.append("\"checkList\":[");
        List<CheckIn> checkList = getProject().getCheckInListOrdered();
        if (checkList != null) {
            Iterator<CheckIn> iterator = checkList.iterator();
            while (iterator.hasNext()) {
                stringBuilder.append(iterator.next().toString());
                if (iterator.hasNext()) {
                    stringBuilder.append(", ");
                }
            }
        }
        stringBuilder.append("],");
        stringBuilder.append("\"saveList\":[");
        if (getSaveList() != null) {
            Iterator<Save> iterator = getSaveList().iterator();
            while (iterator.hasNext()) {
                stringBuilder.append(iterator.next());
                if (iterator.hasNext()) {
                    stringBuilder.append(", ");
                }
            }
        }
        stringBuilder.append("]}");
        return stringBuilder.toString();
    }

    public enum ModeType {VSS, SVN}
}

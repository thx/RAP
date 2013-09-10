package com.taobao.rigel.rap.workspace.bo;

import java.util.Date;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.DateUtils;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.workspace.bo.Workspace.ModeType;

public class CheckIn implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	public enum ToStringType {COMPLETED, NORMAL};

	private int id;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	private Date createDate;

	public Date getCreateDate() {
		return createDate;
	}
	
	public String getCreateDateStr() {
		return getCreateDate() == null ? "" : DateUtils.TIME_FORMAT.format(getCreateDate());
	}
	
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	private String tag;
	
	public String getTag() {
		return tag;
	}
	
	public void setTag(String tag) {
		this.tag = tag;
	}
	
	private User user;
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	private Project project;
	
	public Project getProject() {
		return project;
	}
	
	public void setProject(Project project) {
		this.project = project;
	}

	private String description;
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	private String version;
	
	public String getVersion() {
		return version;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}

	private String projectData;
	
	public String getProjectData() {
		return projectData;
	}
	
	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}
	
	private int workspaceModeInt;
	
	public int getWorkspaceModeInt() {
		return workspaceModeInt;
	}
	
	public void setWorkspaceModeInt(int workspaceModeInt) {
		this.workspaceModeInt = workspaceModeInt;
	}
	
	public ModeType getWorkspaceMode() {
		if (workspaceModeInt == 1) {
			return ModeType.VSS;
		} else if (workspaceModeInt == 2) {
			return ModeType.SVN;
		} else {
			// default
			return ModeType.VSS;
		}
	}
	
	public void setWorkspaceMode(ModeType workspaceModeType) {
		if (workspaceModeType == ModeType.VSS) {
			workspaceModeInt = 1;
		} else if (workspaceModeType == ModeType.SVN) {
			workspaceModeInt = 2;
		} else {
			// default
			workspaceModeInt = 1;
		}
	}
	
	private String log;
	
	public String getLog() {
		return log;
	}
	
	public void setLog(String log) {
		this.log = log;
	}

	public void versionUpgrade(int versionPosition) throws Exception {
		if (versionPosition > 4 || versionPosition < 1) {
			throw new Exception("illegal version position: " + versionPosition);
		}
		String [] versionList = getVersion().split("\\.");
		if (versionList.length != 4) {
			throw new Exception("illegal version format: " + getVersion());
		}
		Integer integer = Integer.parseInt(versionList[versionPosition - 1]) + 1;
		versionList[versionPosition - 1] = integer.toString();
		String newVersion = "";
		for (int i = 0; i < versionList.length; i++) {
			newVersion += versionList[i];
			if (i < versionList.length - 1) {
				newVersion += ".";
			}
		}
		setVersion(newVersion);
	}
	
	@Override
	public String toString() {
		return this.toString(ToStringType.NORMAL);
	}
	public String toString(ToStringType type) {
		if (type == ToStringType.NORMAL) {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("{\"id\":" + getId() + ",");
			stringBuilder.append("\"version\":\"" + getVersion() + "\",");
			stringBuilder.append("\"userName\":\"" + getUser().getName() + "\",");
			stringBuilder.append("\"createDateStr\":\"" + getCreateDateStr() + "\",");
			stringBuilder.append("\"description\":\"" + StringUtils.escapeInJ(getDescription()) + "\"}");
			return stringBuilder.toString();
		} else if (type == ToStringType.COMPLETED) {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("{\"id\":" + getId() + ",");
			stringBuilder.append("\"version\":\"" + getVersion() + "\",");
			stringBuilder.append("\"userName\":\"" + getUser().getName() + "\",");
			stringBuilder.append("\"projectData\":" + getProjectData() + ",");
			stringBuilder.append("\"createDateStr\":\"" + getCreateDateStr() + "\",");
			stringBuilder.append("\"description\":\"" + StringUtils.escapeInJ(getDescription()) + "\"}");
			return stringBuilder.toString();
		} else {
			return this.toString();
		}
	}
}
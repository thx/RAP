package com.taobao.rigel.rap.workspace.dao;
import java.util.Set;

import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Save;
import com.taobao.rigel.rap.workspace.bo.Workspace;
public interface WorkspaceDao {
	
	Workspace getWorkspace(int projectId, long userId);
	
	int updateSave(Save save);
	
	Save getSave(int id);
	
	void updateWorkspace(Workspace workspace);
	
	Workspace getWorkspace(int id);
	
	Set<Save> getSaveList(int workspaceId);
	
	void removeSave(int id);

	void addCheckIn(CheckIn checkIn);

	CheckIn getVersion(int versionId);

    CheckIn getVersion(int projectId, String version);

	void prepareForVersionSwitch(CheckIn check);
}

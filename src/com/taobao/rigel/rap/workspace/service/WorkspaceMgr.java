package com.taobao.rigel.rap.workspace.service;

import java.util.Set;

import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Save;
import com.taobao.rigel.rap.workspace.bo.Workspace;

public interface WorkspaceMgr {

	/**
	 * get workspace obj
	 * 
	 * @param projectId
	 * @param userId
	 * @return
	 */
	Workspace getWorkspace(int projectId, long userId);

	/**
	 * update save
	 * 
	 * @param save
	 * @return
	 */
	int updateSave(Save save);

	/**
	 * get one save
	 * 
	 * @param id
	 * @return
	 */
	Save getSave(int id);

	/**
	 * update workspace
	 * 
	 * @param workspace
	 */
	void updateWorkspace(Workspace workspace);

	/**
	 * get workspace
	 * 
	 * @param id
	 * @return
	 */
	Workspace getWorkspace(int id);

	/**
	 * get save list
	 * 
	 * @param workspaceId
	 * @return
	 */
	Set<Save> getSaveList(int workspaceId);

	/**
	 * remove save
	 * 
	 * @param id
	 */
	void removeSave(int id);

	/***
	 * workspace check out
	 * 
	 * @param jsonList
	 *            [0]:projectData, [1]: projectDataOriginal
	 * @param userId
	 * @param projectId
	 * @return
	 */
	String checkOut(String[] jsonList, long userId, int projectId);

	/***
	 * workspace check in
	 * 
	 * @param jsonList
	 *            [0]:projectData [1]: projectDataOriginal
	 * @param userId
	 * @param projectId
	 * @return
	 */
	String checkIn(String[] jsonList, long userId, int projectId);

	/**
	 * add new check in log
	 * 
	 * @param checkIn
	 */
	void addCheckIn(CheckIn checkIn);

	/**
	 * get {@link CheckIn} obj
	 * 
	 * @param versionId
	 * @return
	 */
	CheckIn getVersion(int versionId);

	/**
	 * do sth. preparing for version switch
	 * 
	 * @param check
	 */
	void prepareForVersionSwitch(CheckIn check);
}

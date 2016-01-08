package com.taobao.rigel.rap.workspace.service;

import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;

public interface WorkspaceMgr {

    /**
     * get workspace obj
     *
     * @param projectId
     * @param userId
     * @return
     */
    Workspace getWorkspace(int projectId, int userId);

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


    /***
     * workspace check out
     *
     * @param jsonList  [0]:projectData, [1]: projectDataOriginal
     * @param userId
     * @param projectId
     * @return
     */
    String checkOut(String[] jsonList, int userId, int projectId);

    /***
     * workspace check in
     *
     * @param jsonList  [0]:projectData [1]: projectDataOriginal
     * @param userId
     * @param projectId
     * @return
     */
    String checkIn(String[] jsonList, int userId, int projectId);

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

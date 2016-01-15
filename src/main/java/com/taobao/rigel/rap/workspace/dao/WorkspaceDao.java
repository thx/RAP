package com.taobao.rigel.rap.workspace.dao;

import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;

public interface WorkspaceDao {

    Workspace getWorkspace(int projectId, int userId);

    void updateWorkspace(Workspace workspace);

    Workspace getWorkspace(int id);

    void addCheckIn(CheckIn checkIn);

    CheckIn getVersion(int versionId);

    CheckIn getVersion(int projectId, String version);

    void prepareForVersionSwitch(CheckIn check);
}

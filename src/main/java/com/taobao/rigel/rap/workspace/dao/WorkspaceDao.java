package com.taobao.rigel.rap.workspace.dao;

import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;

public interface WorkspaceDao {

    Workspace getWorkspace(long projectId, long userId);

    void updateWorkspace(Workspace workspace);

    Workspace getWorkspace(long id);

    void addCheckIn(CheckIn checkIn);

    CheckIn getVersion(int versionId);

    CheckIn getVersion(long projectId, String version);

    void prepareForVersionSwitch(CheckIn check);
}

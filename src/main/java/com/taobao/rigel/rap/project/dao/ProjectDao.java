package com.taobao.rigel.rap.project.dao;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;

import java.util.List;
import java.util.Map;

public interface ProjectDao {

    /**
     * get project list
     *
     * @param user
     * @param curPageNum
     * @param pageSize
     * @return
     */
    List<Project> getProjectList(User user, int curPageNum, int pageSize);

    /**
     * get new project
     *
     * @param project
     * @return always 0
     */
    int addProject(Project project);

    /**
     * update project
     *
     * @param id
     * @param projectData
     * @param deletedObjectListData
     * @return
     */
    String updateProject(int id, String projectData,
                         String deletedObjectListData, Map<Integer, Integer> actionIdMap);

    /**
     * update project
     *
     * @param project
     * @return
     */
    int updateProject(Project project);

    /**
     * remove project
     *
     * @param id
     * @return
     */
    int removeProject(int id);

    /**
     * get project
     *
     * @param id
     * @return
     */
    Project getProjectSummary(int id);

    /**
     * get module
     *
     * @param id
     * @return
     */
    Module getModule(int id);

    /**
     * get page
     *
     * @param id
     * @return
     */
    Object getPage(int id);


    /**
     * get action
     *
     * @param id
     * @return
     */
    Action getAction(int id);

    /**
     * save project
     *
     * @param project
     * @return
     */
    int saveProject(Project project);

    /**
     * get project list number
     *
     * @param user
     * @return
     */
    int getProjectListNum(User user);

    /**
     * get matched action list based on URL pattern
     *
     * @param projectId
     * @param pattern
     * @return
     */
    List<Action> getMatchedActionList(int projectId, String pattern);

    /**
     * clear all mock data of objects in specified project
     *
     * @param projectId project id
     * @return affected rows num
     */
    public int resetMockData(int projectId);

    /**
     * get project list by group
     *
     * @param id
     * @return
     */
    List<Project> getProjectListByGroup(int id);

    /**
     * search all projects (for admin use)
     *
     * @param key
     * @return
     */
    List<Project> search(String key);

    List<Project> getProjectList();

    int getProjectListNum();

    int getModuleNum();

    int getPageNum();

    int getActionNum();

    int getParametertNum();

    int getCheckInNum();

    int getMockNumInTotal();

    List<Project> selectMockNumTopNProjectList(int limit);

    /**
     * get project id by action id
     *
     * @param actionId
     * @return
     */
    Integer getProjectIdByActionId(int actionId);

    void updateProjectNum(Project project);


    /**
     * transfer a project to another user
     *  @param projectId
     * @param creatorId
     */
    void updateCreatorId(int projectId, int creatorId);

    Project getProject(int id);

    /**
     * get member id list of specified project
     *
     * @param projectId
     * @return
     */
    List<Integer> getMemberIdsOfProject(int projectId);
}

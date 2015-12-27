package com.taobao.rigel.rap.project.service;

import java.util.List;
import java.util.Map;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;

public interface ProjectMgr {

	/**
	 * get project list
	 * 
	 * @param curUserId
	 * @param curPageNum
	 * @param pageSize
	 * @return
	 */
	List<Project> getProjectList(long curUserId, int curPageNum, int pageSize);

	/**
	 * add new project
	 * 
	 * @param project
	 * @return
	 */
	int addProject(Project project);

	/**
	 * remove project
	 * 
	 * @param id
	 * @return
	 */
	int removeProject(int id);

	/**
	 * update project
	 * 
	 * @param project
	 * @return
	 */
	int updateProject(Project project);

	/**
	 * get project by id
	 * 
	 * @param id
	 * @return
	 */
	Project getProject(int id);

    Project getProject(int id, String ver);

	/**
	 * get module by id
	 * 
	 * @param id
	 * @return
	 */
	Module getModule(int id);

	/**
	 * get page by id
	 * 
	 * @param id
	 * @return
	 */
	Page getPage(int id);

	/**
	 * update project
	 * 
	 * @param id
	 * @param projectData
	 * @param deletedObjectListData
	 * @return
	 */
	String updateProject(int id, String projectData,
			String deletedObjectListData, Map<Long, Long> actionIdMap);

	/**
	 * get number of project list usually used for pager
	 * 
	 * @param user
	 * @return
	 */
	long getProjectListNum(User user);

	/**
	 * set action.remarks as paramIdList eg-> action.remarks = "id,name,age";
	 * used for parameter identifier spelling validation [*caution*] only
	 * calculating response parameters
	 * 
	 * @param action
	 *            action to be filled with paramIdList info
	 */
	void loadParamIdListForAction(Action action);

	/**
	 * load paramIdList for page
	 * 
	 * @param page
	 */
	void loadParamIdListForPage(Page page);

	/**
	 * get matched action list based on URL pattern
	 * 
	 * @param projectId
	 * @param pattern
	 * @return
	 */
	List<Action> getMatchedActionList(int projectId, String pattern);

	/**
	 * get project list by group id
	 * 
	 * @param id
	 * @return
	 */
	List<Project> getProjectListByGroup(int id);

	/**
	 * search all projects (for admin)
	 * 
	 * @param key
	 * @return
	 */
	List<Project> search(String key);

    /**
     * search project by user
     *
     * @param key
     * @param curUserId
     * @return
     */
    List<Project> search(String key, long curUserId);

	/**
	 * get action
	 * 
	 * @param id
	 * @return
	 */
	Action getAction(long id);

    Action getAction(long id, String ver, int projectId);

    /**
     * update doc
     *
     * @param project id
     */
    void updateDoc(int projectId);

    List<Project> getProjectList();

    long getProjectNum();

    long getModuleNum();

    long getPageNum();

    long getActionNum();

    long getParametertNum();

    long getCheckInNum();

    long getMockNumInTotal();

    List<Project> selectMockNumTopNProjectList(int limit);

    /**
     * update Action.disableCache
     *
     * @param projectId
     */
    void updateCache(int projectId);

	/**
	 * get project id by action id
	 *
	 * @param actionId
	 * @return
	 */
	Integer getProjectIdByActionId(int actionId);

	void updateProjectNum(Project project);

}

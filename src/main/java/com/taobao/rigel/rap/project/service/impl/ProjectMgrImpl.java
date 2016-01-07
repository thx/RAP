package com.taobao.rigel.rap.project.service.impl;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.utils.ArrayUtils;
import com.taobao.rigel.rap.common.utils.HTTPUtils;
import com.taobao.rigel.rap.common.config.SystemConstant;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.*;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.dao.WorkspaceDao;

import java.util.*;

public class ProjectMgrImpl implements ProjectMgr {

    private ProjectDao projectDao;
    private OrganizationDao organizationDao;
    private AccountMgr accountMgr;
    private WorkspaceDao workspaceDao;
    private OrganizationMgr organizationMgr;
    private AccountDao accountDao;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    public void setWorkspaceDao(WorkspaceDao workspaceDao) {
        this.workspaceDao = workspaceDao;
    }

    public AccountMgr getAccountMgr() {
        return accountMgr;
    }

    public void setAccountMgr(AccountMgr accountMgr) {
        this.accountMgr = accountMgr;
    }

    public OrganizationDao getOrganizationDao() {
        return organizationDao;
    }

    public void setOrganizationDao(OrganizationDao organizationDao) {
        this.organizationDao = organizationDao;
    }

    public ProjectDao getProjectDao() {
        return this.projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }


    public List<Project> getProjectList(User user, int curPageNum, int pageSize) {
        List<Project> projectList = projectDao.getProjectList(user, curPageNum,
                pageSize);
        for (Project p : projectList) {
            if (user.isUserInRole("admin")
                    || p.getUserId() == user.getId()) {
                p.setIsManagable(true);
            }
            p.setTeamId(organizationDao.getTeamIdByProjectId(p.getId()));
            p.setUser(accountDao.getUser(p.getUserId()));
        }
        return projectList;
    }


    public long addProject(Project project) {
        project.setUpdateTime(new Date());
        project.setCreateDate(new Date());
        List<User> usersInformed = new ArrayList<User>();
        for (String account : project.getMemberAccountList()) {
            User user = accountDao.getUser(account);
            if (user != null) {
                boolean addSuccess = project.addMember(user);
                if (addSuccess) {
                    usersInformed.add(user);
                }
            }
        }
        long result = projectDao.addProject(project);
        for (User u : usersInformed) {
            Notification o = new Notification();
            o.setTypeId((short) 2);
            o.setTargetUser(project.getUser());
            o.setUser(u);
            o.setParam1(new Long(result).toString());
            o.setParam2(project.getName());
            accountMgr.addNotification(o);
        }

        Group g = organizationDao.getGroup(project.getGroupId());
        if (g.getProductionLineId() > 0) {
            organizationDao.updateCountersInProductionLine(g
                    .getProductionLineId());
        }

        return result;
    }


    public int removeProject(long id) {
        Project p = getProject(id);
        Group g = organizationDao.getGroup(p.getGroupId());
        int result = projectDao.removeProject(id);
        if (g != null) {
            int pId = g.getProductionLineId();
            if (pId > 0) {
                organizationDao.updateCountersInProductionLine(pId);
            }
        }
        return result;
    }


    public int updateProject(Project outerProject) {
        Project project = getProject(outerProject.getId());
        project.setName(outerProject.getName());
        project.setIntroduction(outerProject.getIntroduction());
        project.setUpdateTime(new Date());

        if (outerProject.getMemberAccountList() != null) {
            // adding new ones
            for (String account : outerProject.getMemberAccountList()) {
                User user = accountDao.getUser(account);
                if (user != null) {
                    boolean addSuccess = project.addMember(user);
                    if (addSuccess) {
                        Notification o = new Notification();
                        o.setTypeId((short) 2);
                        o.setTargetUser(outerProject.getUser());
                        o.setUser(user);
                        o.setParam1(new Long(outerProject.getId()).toString());
                        o.setParam2(outerProject.getName());
                        accountMgr.addNotification(o);
                    }
                }
            }

            if (project.getUserList() != null) {
                // remove old ones
                List<User> userListToBeRemoved = new ArrayList<User>();
                for (User user : project.getUserList()) {
                    if (!outerProject.getMemberAccountList().contains(
                            user.getAccount())) {
                        userListToBeRemoved.add(user);
                    }
                }

                for (User user : userListToBeRemoved) {
                    project.removeMember(user);
                }
            }
        }

        return projectDao.updateProject(project);
    }


    public Project getProject(long id) {
        return projectDao.getProject(id);
    }


    public Project getProject(long id, String ver) {
        CheckIn check = workspaceDao.getVersion(id, ver);
        String projectData = check.getProjectData();

        Gson gson = new Gson();
        Project p = gson.fromJson(projectData, Project.class);
        p.setVersion(check.getVersion());
        return p;
    }

    public Project getProjectWithData(long id) {
        return projectDao.getProjectWithData(id);
    }


    public Module getModule(long id) {
        return projectDao.getModule(id);
    }


    public Page getPage(long id) {
        return projectDao.getPage(id);
    }


    public String updateProject(long id, String projectData,
                                String deletedObjectListData, Map<Long, Long> actionIdMap) {
        return projectDao.updateProject(id, projectData, deletedObjectListData, actionIdMap);
    }


    public long getProjectListNum(User user) {
        if (user != null && user.isUserInRole("admin")) {
            user = null;
        }
        return projectDao.getProjectListNum(user);
    }


    public void loadParamIdListForAction(Action action) {
        List<String> paramIdList = new ArrayList<String>();
        recursivelyLoadParamIdList(paramIdList,
                action.getResponseParameterList());
        action.setRemarks(ArrayUtils.join(paramIdList, ","));
    }


    public void loadParamIdListForPage(Page page) {
        for (Action action : page.getActionList()) {
            loadParamIdListForAction(action);
        }
    }

    /**
     * sub method of loadParamIdListForAction for recursively load paramIdList
     * for complex parameters
     *
     * @param paramIdList
     * @param paramList
     */
    private void recursivelyLoadParamIdList(List<String> paramIdList,
                                            Set<Parameter> paramList) {
        for (Parameter p : paramList) {
            if (p.getIdentifier() != null || !p.getIdentifier().isEmpty()) {
                paramIdList.add(p.getIdentifier());
            }
            if (p.getParameterList() != null && p.getParameterList().size() > 0) {
                recursivelyLoadParamIdList(paramIdList, p.getParameterList());
            }
        }
    }


    public List<Action> getMatchedActionList(long projectId, String pattern) {
        List<Action> actionList = projectDao.getMatchedActionList(projectId,
                pattern);
        if (actionList == null || actionList.size() == 0) {
            Project project = projectDao.getProject(projectId);
            if (project != null) {
                String ids = project.getRelatedIds();
                if (ids != null && !ids.isEmpty()) {
                    String[] arr = ids.split(",");
                    for (String id : arr) {
                        actionList = projectDao.getMatchedActionList(
                                Integer.parseInt(id), pattern);
                        if (actionList != null && actionList.size() != 0) {
                            return actionList;
                        }
                    }
                }
            }
        }
        return actionList;
    }


    public List<Project> getProjectListByGroup(long id) {
        return projectDao.getProjectListByGroup(id);
    }


    public List<Project> search(String key) {
        return projectDao.search(key);
    }


    public List<Project> search(String key, long userId) {
        List<Project> list = projectDao.search(key);
        List<Project> result = new ArrayList<Project>();

        for (Project p : list) {
            if (organizationMgr.canUserAccessProject(userId, p.getId())) {
                result.add(p);
            }
        }
        return result;
    }


    public Action getAction(long id) {
        return projectDao.getAction(id);
    }


    public Action getAction(long id, String ver, long projectId) {
        CheckIn check = workspaceDao.getVersion(projectId, ver);
        Gson gson = new Gson();
        Project p = gson.fromJson(check.getProjectData(), Project.class);
        return p.findAction(id);
    }


    public void updateDoc(long projectId) {
        try {
            HTTPUtils.sendGet("http://" + SystemConstant.NODE_SERVER + "/api/generateDoc?projectId=" + projectId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<Project> getProjectList() {
        return projectDao.getProjectList();
    }


    public long getProjectNum() {
        return projectDao.getProjectListNum();
    }


    public long getModuleNum() {
        return projectDao.getModuleNum();
    }


    public long getPageNum() {
        return projectDao.getPageNum();
    }


    public long getActionNum() {
        return projectDao.getActionNum();
    }


    public long getParametertNum() {
        return projectDao.getParametertNum();
    }


    public long getCheckInNum() {
        return projectDao.getCheckInNum();
    }


    public long getMockNumInTotal() {
        return projectDao.getMockNumInTotal();
    }


    public List<Project> selectMockNumTopNProjectList(int limit) {
        return projectDao.selectMockNumTopNProjectList(limit);
    }


    public void updateCache(long projectId) {
        Project project = getProject(projectId);
        for (Module module : project.getModuleList()) {
            for (Page page : module.getPageList()) {
                for (Action action : page.getActionList()) {
                    updateActionCache(action);
                }
            }
        }
    }


    public Integer getProjectIdByActionId(long actionId) {
        return projectDao.getProjectIdByActionId(actionId);
    }


    public void updateProjectNum(Project project) {
        projectDao.updateProjectNum(project);
    }

    private void updateActionCache(Action action) {
        action.setDisableCache(0);
        for (Parameter param : action.getResponseParameterList()) {
            clearParameterCache(param, action);
        }
    }

    private void clearParameterCache(Parameter param, Action action) {
        String rules = param.getMockJsRules();
        if (rules != null && rules.contains("${") && rules.contains("}")) {
            action.setDisableCache(1);
            return; // over
        }
        Set<Parameter> children = param.getParameterList();
        if (children != null && children.size() != 0) {
            for (Parameter child : children) {
                clearParameterCache(child, action);
            }
        }
    }
}

package com.taobao.rigel.rap.project.service.impl;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.utils.ArrayUtils;
import com.taobao.rigel.rap.common.utils.CacheUtils;
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
import sun.misc.Cache;

import javax.management.Query;
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
            p.setIsManagable(organizationMgr.canUserManageProject(user.getId(), p.getId()));
            p.setIsDeletable(organizationMgr.canUserDeleteProject(user.getId(), p.getId()));
            p.setTeamId(organizationDao.getTeamIdByProjectId(p.getId()));
            p.setUser(accountDao.getUser(p.getUserId()));

            List<Integer> memberIdList = getMemberIdsOfProject(p.getId());
            Set<User> memberList = new HashSet<User>();
            for (int memberId : memberIdList) {
                memberList.add(accountMgr.getUser(memberId));
            }
            p.setUserList(memberList);
        }
        return projectList;
    }

    public int addProject(Project project) {
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

        int result = projectDao.addProject(project);
        for (User u : usersInformed) {
            Notification o = new Notification();
            o.setTypeId((short) 2);
            o.setTargetUser(project.getUser());
            o.setUser(u);
            o.setParam1(new Integer(result).toString());
            o.setParam2(project.getName());
            accountMgr.addNotification(o);
        }

        Group g = organizationDao.getGroup(project.getGroupId());
        if (g.getProductionLineId() > 0) {
            organizationDao.updateCountersInProductionLine(g
                    .getProductionLineId());
        }
        clearProjectInfoCache(result);
        return result;
    }


    public int removeProject(int id) {
        clearProjectDocCache(id);
        clearProjectInfoCache(id);
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
        // first clear, for existed members
        clearProjectInfoCache(outerProject.getId());

        Project project = getProject(outerProject.getId());
        project.setName(outerProject.getName());
        project.setIntroduction(outerProject.getIntroduction());
        project.setUpdateTime(new Date());
        project.setRelatedIds(outerProject.getRelatedIds());

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
                        o.setParam1(new Integer(outerProject.getId()).toString());
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

        int returnVal = projectDao.updateProject(project);

        // duplex clear, for added new members
        clearProjectInfoCache(project.getId());
        clearProjectDocCache(project.getId());

        return returnVal;
    }


    public Project getProjectSummary(int id) {
        Project p = projectDao.getProjectSummary(id);
        if (p != null)
            p.setUser(accountMgr.getUser(p.getUserId()));
        return p;
    }


    public Project getProject(int id, String ver) {
        CheckIn check = workspaceDao.getVersion(id, ver);
        String projectData = check.getProjectData();

        Gson gson = new Gson();
        Project p = gson.fromJson(projectData, Project.class);
        p.setVersion(check.getVersion());
        return p;
    }

    public Project getProject(int id) {
        Project p = projectDao.getProject(id);
        return p;
    }


    public Module getModule(int id) {
        return projectDao.getModule(id);
    }


    public Page getPage(int id) {
        return (Page) projectDao.getPage(id);
    }


    public String updateProject(int id, String projectData,
                                String deletedObjectListData, Map<Integer, Integer> actionIdMap) {
        clearProjectDocCache(id);
        return projectDao.updateProject(id, projectData, deletedObjectListData, actionIdMap);
    }


    public int getProjectListNum(User user) {
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


    public List<Action> getMatchedActionList(int projectId, String pattern) {
        List<Action> actionList = projectDao.getMatchedActionList(projectId,
                pattern);
        if (actionList == null || actionList.size() == 0) {
            Project project = projectDao.getProjectSummary(projectId);
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


    public List<Project> getProjectListByGroup(int id) {
        return projectDao.getProjectListByGroup(id);
    }


    public List<Project> search(String key) {
        return projectDao.search(key);
    }


    public List<Project> search(String key, int userId) {
        List<Project> list = projectDao.search(key);
        List<Project> result = new ArrayList<Project>();

        for (Project p : list) {
            if (organizationMgr.canUserAccessProject(userId, p.getId())) {
                result.add(p);
            }
        }
        return result;
    }


    public Action getAction(int id) {
        return projectDao.getAction(id);
    }


    public Action getAction(int id, String ver, int projectId) {
        CheckIn check = workspaceDao.getVersion(projectId, ver);
        Gson gson = new Gson();
        Project p = gson.fromJson(check.getProjectData(), Project.class);
        return p.findAction(id);
    }


    public void updateDoc(int projectId) {
        try {
            HTTPUtils.sendGet("http://" + SystemConstant.NODE_SERVER + "/api/generateDoc?projectId=" + projectId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<Project> getProjectList() {
        return projectDao.getProjectList();
    }


    public int getProjectNum() {
        return projectDao.getProjectListNum();
    }


    public int getModuleNum() {
        return projectDao.getModuleNum();
    }


    public int getPageNum() {
        return projectDao.getPageNum();
    }


    public int getActionNum() {
        return projectDao.getActionNum();
    }


    public int getParametertNum() {
        return projectDao.getParametertNum();
    }


    public int getCheckInNum() {
        return projectDao.getCheckInNum();
    }


    public int getMockNumInTotal() {
        return projectDao.getMockNumInTotal();
    }


    public List<Project> selectMockNumTopNProjectList(int limit) {
        return projectDao.selectMockNumTopNProjectList(limit);
    }


    public void updateCache(int projectId) {
        Project project = getProject(projectId);
        for (Module module : project.getModuleList()) {
            for (Page page : module.getPageList()) {
                for (Action action : page.getActionList()) {
                    updateActionCache(action);
                }
            }
        }
    }


    public Integer getProjectIdByActionId(int actionId) {
        return projectDao.getProjectIdByActionId(actionId);
    }


    public void updateProjectNum(Project project) {
        projectDao.updateProjectNum(project);
    }

    public void clearProjectInfoCache(int projectId) {
        Project p = getProject(projectId);
        List<Integer> ids = new ArrayList<Integer>();
        ids.add(p.getUserId());

        Set<User> members =  p.getUserList();
        for (User member : members) {
            ids.add(member.getId());
        }

        for (int userId : ids) {
            String[] cacheKey = new String[]{CacheUtils.KEY_PROJECT_LIST, new Integer(userId).toString()};
            CacheUtils.del(cacheKey);

            String[] cacheKey2 = new String[]{CacheUtils.KEY_ACCESS_USER_TO_PROJECT, new Integer(userId).toString(), new Integer(projectId).toString()};
            CacheUtils.del(cacheKey2);
        }
    }

    public void clearProjectDocCache(int projectId) {
        String[] cacheKey = new String[]{CacheUtils.KEY_WORKSPACE, new Integer(projectId).toString()};
        CacheUtils.del(cacheKey);
    }

    public List<Integer> getMemberIdsOfProject(int projectId) {
        return projectDao.getMemberIdsOfProject(projectId);
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

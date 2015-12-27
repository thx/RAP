package com.taobao.rigel.rap.project.service.impl;

import java.util.*;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.ArrayUtils;
import com.taobao.rigel.rap.common.HTTPUtils;
import com.taobao.rigel.rap.common.SystemConstant;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Parameter;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.dao.WorkspaceDao;

public class ProjectMgrImpl implements ProjectMgr {

	private ProjectDao projectDao;
	private OrganizationDao organizationDao;
	private AccountMgr accountMgr;
    private WorkspaceDao workspaceDao;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    private OrganizationMgr organizationMgr;

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

	private AccountDao accountDao;

	public AccountDao getAccountDao() {
		return accountDao;
	}

	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}

	@Override
	public List<Project> getProjectList(long curUserId, int curPageNum, int pageSize) {
        User user = accountMgr.getUser(curUserId);
		List<Project> projectList = projectDao.getProjectList(user, curPageNum,
				pageSize);
		for (Project p : projectList) {
			if (user.isUserInRole("admin")
					|| p.getUser().getId() == user.getId()) {
				p.setIsManagable(true);
			}
			p.setTeamId(organizationDao.getTeamIdByProjectId(p.getId()));
		}
		return projectList;
	}

	@Override
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
			o.setTypeId((short)2);
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

		return result;
	}

	@Override
	public int removeProject(int id) {
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

	@Override
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
						o.setTypeId((short)2);
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

		return projectDao.updateProject(project);
	}

	@Override
	public Project getProject(int id) {
		return projectDao.getProject(id);
	}

    @Override
    public Project getProject(int id, String ver) {
        CheckIn check = workspaceDao.getVersion(id, ver);
        String projectData = check.getProjectData();

        Gson gson = new Gson();
        Project p = gson.fromJson(projectData, Project.class);
        p.setVersion(check.getVersion());
        return p;
    }

    @Override
	public Module getModule(int id) {
		return projectDao.getModule(id);
	}

	@Override
	public Page getPage(int id) {
		return projectDao.getPage(id);
	}

	@Override
	public String updateProject(int id, String projectData,
			String deletedObjectListData, Map<Long, Long> actionIdMap) {
		return projectDao.updateProject(id, projectData, deletedObjectListData, actionIdMap);
	}

	@Override
	public long getProjectListNum(User user) {
		if (user != null && user.isUserInRole("admin")) {
			user = null;
		}
		return projectDao.getProjectListNum(user);
	}

	@Override
	public void loadParamIdListForAction(Action action) {
		List<String> paramIdList = new ArrayList<String>();
		recursivelyLoadParamIdList(paramIdList,
				action.getResponseParameterList());
		action.setRemarks(ArrayUtils.join(paramIdList, ","));
	}

	@Override
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

	@Override
	public List<Action> getMatchedActionList(int projectId, String pattern) {
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

	@Override
	public List<Project> getProjectListByGroup(int id) {
		return projectDao.getProjectListByGroup(id);
	}
	
	@Override
	public List<Project> search(String key) {
		return projectDao.search(key);
	}

    @Override
    public List<Project> search(String key, long userId) {
        List<Project> list =  projectDao.search(key);
        List<Project> result = new ArrayList<Project>();

        for (Project p : list) {
            if (organizationMgr.canUserAccessProject(userId, p.getId())) {
                result.add(p);
            }
        }
        return result;
    }

	@Override
	public Action getAction(long id) {
		return projectDao.getAction(id);
	}

    @Override
    public Action getAction(long id, String ver, int projectId) {
        CheckIn check = workspaceDao.getVersion(projectId, ver);
        Gson gson = new Gson();
        Project p = gson.fromJson(check.getProjectData(), Project.class);
        return p.findAction(id);
    }

    @Override
    public void updateDoc(int projectId) {
        try {
            HTTPUtils.sendGet("http://" + SystemConstant.NODE_SERVER + "/api/generateDoc?projectId=" + projectId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Project> getProjectList() {
        return projectDao.getProjectList();
    }

    @Override
    public long getProjectNum() {
        return projectDao.getProjectListNum();
    }

    @Override
    public long getModuleNum() {
        return projectDao.getModuleNum();
    }

    @Override
    public long getPageNum() {
        return projectDao.getPageNum();
    }

    @Override
    public long getActionNum() {
        return projectDao.getActionNum();
    }

    @Override
    public long getParametertNum() {
        return projectDao.getParametertNum();
    }

    @Override
    public long getCheckInNum() {
        return projectDao.getCheckInNum();
    }

    @Override
    public long getMockNumInTotal() {return projectDao.getMockNumInTotal();}

    @Override
    public List<Project> selectMockNumTopNProjectList(int limit) {
        return projectDao.selectMockNumTopNProjectList(limit);
    }

    @Override
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

	@Override
	public Integer getProjectIdByActionId(int actionId) {
		return projectDao.getProjectIdByActionId(actionId);
	}

	@Override
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

package com.taobao.rigel.rap.project.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.ArrayUtils;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Parameter;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class ProjectMgrImpl implements ProjectMgr {

	private ProjectDao projectDao;
	private OrganizationDao organizationDao;
	private AccountMgr accountMgr;

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
	public List<Project> getProjectList(User user, int curPageNum, int pageSize) {
		List<Project> projectList = projectDao.getProjectList(user, curPageNum,
				pageSize);
		for (Project p : projectList) {
			if (user.isUserInRole("admin")
					|| p.getUser().getId() == user.getId())
				p.setIsManagable(true);
		}
		return projectList;
	}

	@Override
	public int addProject(Project project) {
		project.setUpdateTime(new Date());
		project.setCreateDate(new Date());
		for (String account : project.getMemberAccountList()) {
			User user = accountDao.getUser(account);
			if (user != null) {
				boolean addSuccess = project.addMember(user);
				if (addSuccess) {
					Notification o = new Notification();
					o.setTypeId((short)2);
					o.setTargetUser(project.getUser());
					o.setUser(user);
					o.setParam1(new Integer(project.getId()).toString());
					o.setParam2(project.getName());
					accountMgr.addNotification(o);
				}
			}
		}
		int result = projectDao.addProject(project);

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
	public Module getModule(int id) {
		return projectDao.getModule(id);
	}

	@Override
	public Page getPage(int id) {
		return projectDao.getPage(id);
	}

	@Override
	public String updateProject(int id, String projectData,
			String deletedObjectListData) {
		return projectDao.updateProject(id, projectData, deletedObjectListData);
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
}

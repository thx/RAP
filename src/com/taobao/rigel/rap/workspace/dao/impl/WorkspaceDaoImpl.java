package com.taobao.rigel.rap.workspace.dao.impl;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Save;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.dao.WorkspaceDao;

public class WorkspaceDaoImpl extends HibernateDaoSupport implements WorkspaceDao {

	private AccountDao accountDao;

	public AccountDao getAccountDao() {
		return accountDao;
	}

	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}
	
	private ProjectDao projectDao;

	public ProjectDao getProjectDao() {
		return projectDao;
	}

	public void setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
	}
	
	@Override
	public Workspace getWorkspace(int projectId, long userId) throws HibernateException {
		Session session = getSession();
		Query q = session.createQuery("from Workspace where user.id = :userId and project.id = :projectId");
		q.setInteger("projectId", projectId);
		q.setLong("userId", userId);
		Workspace workspace = (Workspace) q.uniqueResult();
		if (workspace == null) {
			return addWorkspace(projectId, userId);
		} else {
			return workspace;
		}
	}
	
	private Workspace addWorkspace(int projectId, long userId) {
		Session session = getSession();
		Project project = (Project)session.get(Project.class, projectId);
		if (project == null) {
			throw new RuntimeException("project you requested doesn't exist.");
		}
		Workspace workspace = new Workspace();
		workspace.setUser((User)session.load(User.class, userId));
		workspace.setProject(project);
		workspace.setProjectData(project.toString(Project.TO_STRING_TYPE.TO_PARAMETER));
		workspace.setProjectDataOriginal(workspace.getProjectData());
		workspace.setUpdateDate(new Date());
		int id = (Integer)session.save(workspace);
		return getWorkspace(id);
	}

	@Override
	public int updateSave(Save save) {
		save.setUpdateDate(new Date());
		Integer id  = (Integer)getSession().save(save);
		return id;
	}

	@Override
	public Save getSave(int id) {
		Session session = getSession();
		Save save = (Save) session.load(Save.class, id);
		return save;
	}

	@Override
	public void updateWorkspace(Workspace workspace) {
		workspace.setUpdateDate(new Date());
		getSession().save(workspace);
	}

	@Override
	public Workspace getWorkspace(int id) {
		Session session = getSession();
		Workspace workspace = (Workspace) session.load(Workspace.class, id);
		return workspace;
	}

	@Override
	public Set<Save> getSaveList(int workspaceId) {
		return getWorkspace(workspaceId).getSaveList();
	}

	@Override
	public void removeSave(int id) {
		Session session = getSession();
		Save save = (Save) session.load(Save.class, id);
		session.delete(save);		
	}

	@Override
	public void addCheckIn(CheckIn checkIn) {
		getSession().save(checkIn);
	}

	@Override
	public CheckIn getVersion(int versionId) {
		return (CheckIn) getSession().load(CheckIn.class, versionId);
	}

    @Override
    public CheckIn getVersion(int projectId, String version) {
        Session session  = getSession();
        Query query = session.createQuery("from CheckIn obj where obj.project.id = :projectId and obj.version = :version");
        query.setInteger("projectId", projectId);
        query.setString("version", version);
        return (CheckIn) query.uniqueResult();
    }

	@Override
	public void prepareForVersionSwitch(CheckIn check) {
		Session session = getSession();
		Project project = check.getProject();
		Iterator<Module> iterator = project.getModuleList().iterator();
		while(iterator.hasNext()) {
			Module next = iterator.next();
			session.delete(next);
		}
		project.getModuleList().clear();
	}

}

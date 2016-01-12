package com.taobao.rigel.rap.workspace.dao.impl;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.dao.WorkspaceDao;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.Date;
import java.util.Iterator;

public class WorkspaceDaoImpl extends HibernateDaoSupport implements WorkspaceDao {

    private AccountDao accountDao;
    private ProjectDao projectDao;

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public ProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }


    public Workspace getWorkspace(int projectId, int userId) throws HibernateException {
        Session session = currentSession();
        Query q = session.createQuery("from Workspace where user.id = :userId and project.id = :projectId");
        q.setInteger("projectId", projectId);
        q.setInteger("userId", userId);
        Workspace workspace = (Workspace) q.uniqueResult();
        if (workspace == null) {
            return addWorkspace(projectId, userId);
        } else {
            return workspace;
        }
    }

    private Workspace addWorkspace(int projectId, int userId) {
        Session session = currentSession();
        Project project = (Project) session.get(Project.class, projectId);
        if (project == null) {
            throw new RuntimeException("project you requested doesn't exist.");
        }
        Workspace workspace = new Workspace();
        workspace.setUser((User) session.load(User.class, userId));
        workspace.setProject(project);
        workspace.setProjectData(project.toString(Project.TO_STRING_TYPE.TO_PARAMETER));
        workspace.setProjectDataOriginal(workspace.getProjectData());
        workspace.setUpdateDate(new Date());
        int id = (Integer) session.save(workspace);
        return getWorkspace(id);
    }

    public void updateWorkspace(Workspace workspace) {
        workspace.setUpdateDate(new Date());
        currentSession().save(workspace);
    }


    public Workspace getWorkspace(int id) {
        Session session = currentSession();
        Workspace workspace = session.load(Workspace.class, id);
        return workspace;
    }

    public void addCheckIn(CheckIn checkIn) {
        currentSession().save(checkIn);
    }


    public CheckIn getVersion(int versionId) {
        return currentSession().load(CheckIn.class, versionId);
    }


    public CheckIn getVersion(int projectId, String version) {
        Session session = currentSession();
        Query query = session.createQuery("from CheckIn obj where obj.project.id = :projectId and obj.version = :version");
        query.setInteger("projectId", projectId);
        query.setString("version", version);
        return (CheckIn) query.uniqueResult();
    }


    public void prepareForVersionSwitch(CheckIn check) {
        Session session = currentSession();
        Project project = check.getProject();
        Iterator<Module> iterator = project.getModuleList().iterator();
        while (iterator.hasNext()) {
            Module next = iterator.next();
            session.delete(next);
        }
        project.getModuleList().clear();
    }

}

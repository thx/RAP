package com.taobao.rigel.rap.project.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.taobao.rigel.rap.common.CacheUtils;
import com.taobao.rigel.rap.common.URLUtils;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.ArrayUtils;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.ObjectItem;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Parameter;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.dao.ProjectDao;

public class ProjectDaoImpl extends HibernateDaoSupport implements ProjectDao {

    @SuppressWarnings("unchecked")
	@Override
	public List<Project> getProjectList(User user, int curPageNum, int pageSize) {
		StringBuilder sql = new StringBuilder();
        sql
        .append("SELECT project_id ")
        .append("FROM tb_project_and_user ")
        .append("WHERE user_id = :userId ")
        .append("UNION ")
        .append("SELECT id ")
        .append("FROM tb_project ")
        .append("WHERE user_id = :userId ");
		Query query = getSession().createSQLQuery(sql.toString()).setLong("userId",
				user.getId());

        List<Integer> list = query.list();
        List<Project> resultList = new ArrayList<Project>();
	    for (Integer id : list) {
            Project p = this.getProject(id);
            if (p != null && p.getId() > 0) {
                resultList.add(p);
            }
        }
		return resultList;
	}
    @Override
    public List<Project> getProjectList() {
        String hqlByUser = "from Project";
        Query query = getSession().createQuery(hqlByUser);
        return query.list();
    }

	@Override
	public int addProject(Project project) {
		Session session = getSession();
		project.getUser().addCreatedProject(project);
		project.setVersion("0.0.0.1"); // default version
		int modeInt = project.getWorkspaceModeInt();
		if (modeInt <= 0 || modeInt >= 3) {
			project.setWorkspaceModeInt(1);
		}
		session.save(project);
		project = (Project) session.load(Project.class, project.getId());
		project.setProjectData(project
				.toString(Project.TO_STRING_TYPE.TO_PARAMETER));
		return project.getId();
	}

	@Override
	public int removeProject(int id) {
		Session session = getSession();
		Object project = session.get(Project.class, id);
		if (project != null) {
			session.delete((Project) project);
			return 0;
		} else {
			return -1;
		}

	}

	@Override
	public int updateProject(Project project) {
		Session session = getSession();
		session.update(project);
		return 0;
	}

	@Override
	public Project getProject(int id) {
		Project p = null;
		try {
			Session session = getSession();
			p = (Project) session.get(Project.class, id);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return p;
	}

	@Override
	public Module getModule(int id) {
		Module m = null;
		try {
			Session session = getSession();
			m = (Module) session.get(Module.class, id);
		} catch (ObjectNotFoundException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return m;
	}

	@Override
	public Page getPage(int id) {
		return (Page) getSession().get(Page.class, id);
	}


	@Override
	public Action getAction(long id) {
		return (Action) getSession().get(Action.class, id);
	}

	private Parameter getParameter(int id) {
		return (Parameter) getSession().get(Parameter.class, id);
	}

	@Override
	public int saveProject(Project project) {
		Session session = getSession();
		session.saveOrUpdate(project);
		return 0;
	}

	@Override
	public String updateProject(int id, String projectData,
			String deletedObjectListData, Map<Long, Long> actionIdMap) {
		Session session = getSession();
		// StringBuilder log = new StringBuilder();
		Gson gson = new Gson();

		Project projectClient = gson.fromJson(projectData, Project.class);

		ObjectItem[] deletedObjectList = gson.fromJson(deletedObjectListData,
				ObjectItem[].class);

		Project projectServer = (Project) session.load(Project.class, id);
		projectServer.setUpdateTime(new Date());

		// performing deleting
		for (ObjectItem item : deletedObjectList) {
			if (item.getClassName().equals("Module")) {
				projectServer.removeModule(item.getId(), session);
			} else if (item.getClassName().equals("Page")) {
				projectServer.removePage(item.getId(), session);
			} else if (item.getClassName().equals("Action")) {
				projectServer.removeAction(item.getId(), session);
			} else if (item.getClassName().equals("Parameter")) {
				projectServer.removeParameter(item.getId(), session);
			}
		}

		// performing adding & updating
		for (Module module : projectClient.getModuleList()) {
			Module moduleServer = projectServer.findModule(module.getId());
			if (moduleServer == null) {
				addModule(session, projectServer, module);
				continue;
			}
			moduleServer.update(module);
			for (Page page : module.getPageList()) {
				Page pageServer = projectServer.findPage(page.getId());
				if (pageServer == null) {
					addPage(session, module, page);
					continue;
				}
				pageServer.update(page);
				for (Action action : page.getActionList()) {
					Action actionServer = projectServer.findAction(action
							.getId());
					if (actionServer == null) {
						long oldActionId = action.getId();
						long createdActionId = addAction(session, page, action);
						actionIdMap.put(oldActionId, createdActionId);
						continue;
					}
					actionServer.update(action);
                    CacheUtils.removeCacheByActionId(action.getId());
					for (Parameter parameter : action.getRequestParameterList()) {
						Parameter parameterServer = projectServer
								.findParameter(parameter.getId(), true);
						if (parameterServer == null) {
							addParameter(session, action, parameter, true);
							continue;
						}
						parameterServer.update(parameter);
						for (Parameter childParameter : parameter
								.getParameterList()) {
							processParameterRecursively(session, projectServer,
									parameter, childParameter);
						}
					}

					for (Parameter parameter : action
							.getResponseParameterList()) {
						Parameter parameterServer = projectServer
								.findParameter(parameter.getId(), false);
						if (parameterServer == null) {
							addParameter(session, action, parameter, false);
							continue;
						}
						parameterServer.update(parameter);
						for (Parameter childParameter : parameter
								.getParameterList()) {
							processParameterRecursively(session, projectServer,
									parameter, childParameter);
						}
					}
				}
			}
		}
		return "";
	}

	private void processParameterRecursively(Session session,
			Project projectServer, Parameter parameter, Parameter childParameter) {
		Parameter childParameterServer = projectServer
				.findChildParameter(childParameter.getId());
		if (childParameterServer == null) {
			addParameterRecursively(session, parameter, childParameter);
		} else {
			childParameterServer.update(childParameter);
		}
		for (Parameter childOfChildParameter : childParameter
				.getParameterList()) {
			processParameterRecursively(session, projectServer, childParameter,
					childOfChildParameter);
		}
	}

	private void addModule(Session session, Project project, Module module) {
		project.addModule(module);
		session.save(module);
		for (Page page : module.getPageList()) {
			addPage(session, module, page);
		}
	}

	private void addPage(Session session, Module module, Page page) {
		module = (Module) session.load(Module.class, module.getId());
		module.addPage(page);
		session.save(page);
		for (Action action : page.getActionList()) {
			addAction(session, page, action);
		}
	}

	private long addAction(Session session, Page page, Action action) {
		page = (Page) session.load(Page.class, page.getId());
		page.addAction(action);
		long createdId = (Long)session.save(action);
		for (Parameter parameter : action.getRequestParameterList()) {
			addParameter(session, action, parameter, true);
		}
		for (Parameter parameter : action.getResponseParameterList()) {
			addParameter(session, action, parameter, false);
		}
		return createdId;
	}

	private void addParameter(Session session, Action action,
			Parameter parameter, boolean isRequest) {
		action = (Action) session.load(Action.class, action.getId());
		action.addParameter(parameter, isRequest);
		session.save(parameter);
		for (Parameter childParameter : parameter.getParameterList()) {
			addParameterRecursively(session, parameter, childParameter);
		}
	}

	/**
	 * add parameter recursively
	 * 
	 * @param session
	 *            session object
	 * @param parameter
	 *            parent parameter
	 * @param childParameter
	 *            child parameter
	 */
	private void addParameterRecursively(Session session, Parameter parameter,
			Parameter childParameter) {
		parameter = (Parameter) session
				.load(Parameter.class, parameter.getId());
		parameter.addChild(childParameter);
		session.save(childParameter);
		for (Parameter childOfChildParameter : childParameter
				.getParameterList()) {
			addParameterRecursively(session, childParameter,
					childOfChildParameter);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public long getProjectListNum(User user) {
		String hql = "select count(p) from Project as p order by p.id desc";
		String hqlByUser = "select count(p) from Project as p left join p.userList as u where p.user.id = :userId or u.id = :userId order by p.id desc";
		Query query = user == null ? getSession().createQuery(hql)
				: getSession().createQuery(hqlByUser).setLong("userId",
						user.getId());
		List<Long> list = query.list();
		return list.get(0);
	}

    @Override
    public long getProjectListNum() {
        String sql = "SELECT COUNT(*) FROM tb_project";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public long getModuleNum() {
        String sql = "SELECT COUNT(*) FROM tb_module";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public long getPageNum() {
        String sql = "SELECT COUNT(*) FROM tb_page";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public long getActionNum() {
        String sql = "SELECT COUNT(*) FROM tb_action";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public long getMockNumInTotal() {
        String sql = "SELECT SUM(mock_num) FROM tb_project";
        Query query = getSession().createSQLQuery(sql);
        Object queryResult = query.uniqueResult();
        return queryResult != null ? Long.parseLong(queryResult.toString()) : 0;
    }

    @Override
    public long getParametertNum() {
        String sql = "SELECT COUNT(*) FROM tb_parameter";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public long getCheckInNum() {
        String sql = "SELECT COUNT(*) FROM tb_check_in";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

	@Override
	public List<Action> getMatchedActionList(int projectId, String pattern) {
		List<Action> list = getActionListOfProject(projectId);
		List<Action> result = new ArrayList<Action>();
		for (Action action : list) {
			String url = action.getRequestUrl();
			url = URLUtils.getRelativeUrl(url);
			if (url.startsWith("reg:")) { // regular pattern
				if (StringUtils.regMatch(url.substring(4), pattern)) {
					result.add(action);
				}
			} else if (url.contains(":")) {
				String urlParamRemoved = URLUtils.removeParamsInUrl(url);
				String realUrlParamRemoved = URLUtils
						.removeRealParamsInUrl(pattern);
				if (urlParamRemoved.contains(realUrlParamRemoved) ||
						realUrlParamRemoved.contains(urlParamRemoved)) {
					result.add(action);
				}
			} else { // normal pattern
				if (url.contains(pattern)) {
					result.add(action);
				}
			}
		}

		return result;

		// process /:id/ cases
		// boolean urlParalized = false;
		// String patternOrignial = pattern;
		// if (pattern.contains(":")) {
		// urlParalized = true;
		// pattern = pattern.substring(0, pattern.indexOf(":"));
		// }

		/**
		 * StringBuilder sb = new StringBuilder();
		 * sb.append("SELECT a.id FROM tb_action a ")
		 * .append("JOIN tb_action_and_page ap ON ap.action_id = a.id ")
		 * .append("JOIN tb_page p ON p.id = ap.page_id ")
		 * .append("JOIN tb_module m ON m.id = p.module_id ") .append(
		 * "WHERE LOCATE(:pattern, a.request_url) != 0 AND m.project_id = :projectId "
		 * );
		 * 
		 * String sql = sb.toString(); Query query =
		 * getSession().createSQLQuery(sql); query.setString("pattern",
		 * pattern); query.setInteger("projectId", projectId); List<Integer>
		 * list = query.list(); List<Action> actionList = new
		 * ArrayList<Action>(); for (int id : list) {
		 * actionList.add(getAction(id)); }
		 */

		// URL parameters filter
		/**
		 * if (urlParalized) { List<Action> filteredActionList = new
		 * ArrayList<Action>(); for (Action a : actionList) { String u =
		 * a.getRequestUrl(); if (u.contains("?")) { u = u.substring(0,
		 * u.indexOf("?")); } u = StringUtils.removeParamsInUrl(u);
		 * patternOrignial = StringUtils .removeParamsInUrl(patternOrignial); if
		 * (u != null && patternOrignial != null && u.equals(patternOrignial)) {
		 * filteredActionList.add(a); } } actionList = filteredActionList; }
		 */
		// return actionList;
	}

	@SuppressWarnings("unchecked")
	private List<Integer> getParameterIdList(int projectId) {
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT DISTINCT p.id")
				.append(" FROM tb_parameter p")
				.append(" JOIN tb_response_parameter_list_mapping rplm ON p.id = rplm.parameter_id")
				.append(" JOIN tb_action_and_page ap ON ap.action_id = rplm.action_id")
				.append(" JOIN tb_page p2 ON p2.id = ap.page_id")
				.append(" JOIN tb_module m ON m.id = p2.module_id")
				.append(" WHERE m.project_id = :projectId");
		Query query = getSession().createSQLQuery(sql.toString());
		query.setInteger("projectId", projectId);
		List<Integer> list = query.list();

		StringBuilder sql2 = new StringBuilder();
		sql2.append(" SELECT DISTINCT p.id")
				.append(" FROM tb_parameter p")
				.append(" JOIN tb_request_parameter_list_mapping rplm ON p.id = rplm.parameter_id")
				.append(" JOIN tb_action_and_page ap ON ap.action_id = rplm.action_id")
				.append(" JOIN tb_page p2 ON p2.id = ap.page_id")
				.append(" JOIN tb_module m ON m.id = p2.module_id")
				.append(" WHERE m.project_id = :projectId");
		Query query2 = getSession().createSQLQuery(sql2.toString());
		query2.setInteger("projectId", projectId);
		list.addAll(query2.list());
		List<Parameter> paramList = new ArrayList<Parameter>();
		for (Integer pId : list) {
			paramList.add(getParameter(pId));
		}
		for (Parameter p : paramList) {
			recursivelyAddSubParamList(list, p);
		}
		return list;
	}

	private void recursivelyAddSubParamList(List<Integer> list, Parameter p) {
		list.add(p.getId());
		if (p.getParameterList() == null)
			return;
		for (Parameter subP : p.getParameterList()) {
			recursivelyAddSubParamList(list, subP);
		}
	}

	public int resetMockData(int projectId) {
		List<Integer> pIdList = getParameterIdList(projectId);
		String sql = "UPDATE tb_parameter SET mock_data = NULL where id in ("
				+ ArrayUtils.join(pIdList, ",") + ")";
		Query query = getSession().createSQLQuery(sql);
		return query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> getProjectListByGroup(int id) {
		String hql = "from Project where groupId = :id";
		Query query = getSession().createQuery(hql);
		query.setInteger("id", id);
		return query.list();
	}

	@Override
	public List<Project> search(String key) {
		String hql = "from Project where name LIKE :key";
		Query query = getSession().createQuery(hql);
		query.setString("key", "%" + key + "%");
		return query.list();
	}

    @SuppressWarnings({ "rawtypes" })
	private List<Action> getActionListOfProject(int projectId) {
		List<Action> list = new ArrayList<Action>();
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT a.id ");
		sql.append("FROM tb_project p ");
		sql.append("JOIN tb_module m ON m.project_id = p.id ");
		sql.append("JOIN tb_page ON tb_page.module_id = m.id ");
		sql.append("JOIN tb_action_and_page anp ON anp.page_id = tb_page.id ");
		sql.append("JOIN tb_action a ON a.id = anp.action_id ");
		sql.append("WHERE p.id = :projectId ");
		Query query = getSession().createSQLQuery(sql.toString());
		query.setInteger("projectId", projectId);

		List result = query.list();
		List<Integer> ids = new ArrayList<Integer>();
		for (Object r : result) {
			ids.add((Integer) r);
		}
		for (Integer id : ids) {
			list.add(this.getAction(id));
		}
		return list;
	}

    @Override
    public List<Project> selectMockNumTopNProjectList(int limit) {
        String hqlByUser = "from Project order by mockNum desc";
        Query query = getSession().createQuery(hqlByUser);
        return query.setMaxResults(limit).list();
    }

	@Override
	public Integer getProjectIdByActionId(int actionId) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT p.id FROM tb_project p ");
		sql.append("JOIN tb_module m ON m.project_id = p.id ");
		sql.append("JOIN tb_page page ON page.module_id = m.id ");
		sql.append("JOIN tb_action_and_page anp ON anp.page_id = page.id ");
		sql.append("where action_id = :actionId");
		Query query = getSession().createSQLQuery(sql.toString());
		query.setInteger("actionId", actionId);
		return (Integer)query.uniqueResult();
	}

	@Override
	public void updateProjectNum(Project project) {
		String sql = "UPDATE tb_project SET mock_num = :mockNum WHERE id = :projectId";
		getSession().createSQLQuery(sql).setInteger("mockNum", project.getMockNum()).setInteger("projectId", project.getId()).executeUpdate();
	}

    @Override
    public void updateCreatorId(int projectId, long creatorId) {
        Query query = getSession().createSQLQuery("UPDATE tb_project SET user_id = :userId WHERE id = :id");
        query.setLong("userId", creatorId);
        query.setInteger("id", projectId);
        query.executeUpdate();
    }

}

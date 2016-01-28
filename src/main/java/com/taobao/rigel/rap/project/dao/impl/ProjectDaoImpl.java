package com.taobao.rigel.rap.project.dao.impl;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.utils.ArrayUtils;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.utils.StringUtils;
import com.taobao.rigel.rap.common.utils.URLUtils;
import com.taobao.rigel.rap.project.bo.*;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import org.hibernate.*;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ProjectDaoImpl extends HibernateDaoSupport implements ProjectDao {

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
        Query query = currentSession().createSQLQuery(sql.toString()).setInteger("userId",
                user.getId());

        List<Integer> list = query.list();
        List<Project> resultList = new ArrayList<Project>();
        for (Integer id : list) {
            Project p = getProjectSummary(id);
            if (p != null && p.getId() > 0) {
                resultList.add(p);
            }
        }
        return resultList;
    }

    public List<Project> getProjectList() {
        String hqlByUser = "from Project";
        Query query = currentSession().createQuery(hqlByUser);
        return query.list();
    }


    public int addProject(Project project) {
        Session session = currentSession();
        project.getUser().addCreatedProject(project);
        project.setVersion("0.0.0.1"); // default version
        int modeInt = project.getWorkspaceModeInt();
        if (modeInt <= 0 || modeInt >= 3) {
            project.setWorkspaceModeInt(1);
        }
        session.save(project);
        project = session.load(Project.class, project.getId());
        project.setProjectData(project
                .toString(Project.TO_STRING_TYPE.TO_PARAMETER));
        return project.getId();
    }


    public int removeProject(int id) {
        Session session = currentSession();
        Object project = session.get(Project.class, id);
        if (project != null) {
            session.delete(project);
            return 0;
        } else {
            return -1;
        }

    }


    public int updateProject(Project project) {
        Session session = currentSession();
        session.update(project);
        return 0;
    }


    public Project getProjectSummary(int id) {

        Project project = (Project) currentSession().createCriteria(Project.class)
                .setProjection(Projections.projectionList()
                                .add(Projections.property("id"), "id")
                                .add(Projections.property("name"), "name")
                                .add(Projections.property("userId"), "userId")
                                .add(Projections.property("updateTime"), "updateTime")
                                .add(Projections.property("introduction"), "introduction")
                                .add(Projections.property("createDate"), "createDate")
                                .add(Projections.property("version"), "version")
                                .add(Projections.property("groupId"), "groupId")
                                .add(Projections.property("relatedIds"), "relatedIds")
                                .add(Projections.property("accessType"), "accessType")
                )
                .add(Restrictions.eq("id", id))
                .setResultTransformer(Transformers.aliasToBean(Project.class))
                .uniqueResult();

        return project;


       // return (Project) currentSession().createQuery("from Project where id = :id").setint("id", id).uniqueResult();
    }


    public Module getModule(int id) {
        Module m = null;
        try {
            Session session = currentSession();
            m = (Module) session.get(Module.class, id);
        } catch (ObjectNotFoundException ex) {
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return m;
    }


    public Page getPage(int id) {
        return (Page) currentSession().get(Page.class, id);
    }


    public Action getAction(int id) {
        return (Action) currentSession().get(Action.class, id);
    }

    private Parameter getParameter(int id) {
        return (Parameter) currentSession().get(Parameter.class, id);
    }


    public int saveProject(Project project) {
        Session session = currentSession();
        session.saveOrUpdate(project);
        return 0;
    }


    public String updateProject(int id, String projectData,
                                String deletedObjectListData, Map<Integer, Integer> actionIdMap) {
        Session session = currentSession();

        Gson gson = new Gson();

        Project projectClient = gson.fromJson(projectData, Project.class);

        ObjectItem[] deletedObjectList = gson.fromJson(deletedObjectListData,
                ObjectItem[].class);

        Project projectServer = session.load(Project.class, id);
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
                        int oldActionId = action.getId();
                        int createdActionId = addAction(session, page, action);
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

    private int addAction(Session session, Page page, Action action) {
        page = session.load(Page.class, page.getId());
        page.addAction(action);
        int createdId = (Integer) session.save(action);
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
        action = session.load(Action.class, action.getId());
        action.addParameter(parameter, isRequest);
        session.save(parameter);
        for (Parameter childParameter : parameter.getParameterList()) {
            addParameterRecursively(session, parameter, childParameter);
        }
    }

    /**
     * add parameter recursively
     *
     * @param session        session object
     * @param parameter      parent parameter
     * @param childParameter child parameter
     */
    private void addParameterRecursively(Session session, Parameter parameter,
                                         Parameter childParameter) {
        parameter = session
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

    public int getProjectListNum(User user) {
        String hql = "select count(p) from Project as p order by p.id desc";
        String hqlByUser = "select count(p) from Project as p left join p.userList as u where p.user.id = :userId or u.id = :userId order by p.id desc";
        Query query = user == null ? currentSession().createQuery(hql)
                : currentSession().createQuery(hqlByUser).setInteger("userId",
                user.getId());
        List<Integer> list = query.list();
        return list.get(0);
    }


    public int getProjectListNum() {
        String sql = "SELECT COUNT(*) FROM tb_project";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int getModuleNum() {
        String sql = "SELECT COUNT(*) FROM tb_module";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int getPageNum() {
        String sql = "SELECT COUNT(*) FROM tb_page";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int getActionNum() {
        String sql = "SELECT COUNT(*) FROM tb_action";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int getMockNumInTotal() {
        String sql = "SELECT SUM(mock_num) FROM tb_project";
        Query query = currentSession().createSQLQuery(sql);
        Object queryResult = query.uniqueResult();
        return queryResult != null ? Integer.parseInt(queryResult.toString()) : 0;
    }


    public int getParametertNum() {
        String sql = "SELECT COUNT(*) FROM tb_parameter";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int getCheckInNum() {
        String sql = "SELECT COUNT(*) FROM tb_check_in";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }


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
                if (realUrlParamRemoved.equals(urlParamRemoved)) {
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
         * currentSession().createSQLQuery(sql); query.setString("pattern",
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

    private List<Integer> getParameterIdList(int projectId) {
        StringBuilder sql = new StringBuilder();
        sql.append(" SELECT DISTINCT p.id")
                .append(" FROM tb_parameter p")
                .append(" JOIN tb_response_parameter_list_mapping rplm ON p.id = rplm.parameter_id")
                .append(" JOIN tb_action_and_page ap ON ap.action_id = rplm.action_id")
                .append(" JOIN tb_page p2 ON p2.id = ap.page_id")
                .append(" JOIN tb_module m ON m.id = p2.module_id")
                .append(" WHERE m.project_id = :projectId");
        Query query = currentSession().createSQLQuery(sql.toString());
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
        Query query2 = currentSession().createSQLQuery(sql2.toString());
        query2.setInteger("projectId", projectId);
        list.addAll(query2.list());
        List<Parameter> paramList = new ArrayList<Parameter>();
        for (int pId : list) {
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
        Query query = currentSession().createSQLQuery(sql);
        return query.executeUpdate();
    }

    @SuppressWarnings("unchecked")

    public List<Project> getProjectListByGroup(int id) {
        String hql = "from Project where groupId = :id";
        Query query = currentSession().createQuery(hql);
        query.setInteger("id", id);
        return query.list();
    }


    public List<Project> search(String key) {
        String hql = "from Project where name LIKE :key";
        Query query = currentSession().createQuery(hql);
        query.setString("key", "%" + key + "%");
        return query.list();
    }

    @SuppressWarnings({"rawtypes"})
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
        Query query = currentSession().createSQLQuery(sql.toString());
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


    public List<Project> selectMockNumTopNProjectList(int limit) {
        String hqlByUser = "from Project order by mockNum desc";
        Query query = currentSession().createQuery(hqlByUser);
        return query.setMaxResults(limit).list();
    }


    public Integer getProjectIdByActionId(int actionId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT p.id FROM tb_project p ");
        sql.append("JOIN tb_module m ON m.project_id = p.id ");
        sql.append("JOIN tb_page page ON page.module_id = m.id ");
        sql.append("JOIN tb_action_and_page anp ON anp.page_id = page.id ");
        sql.append("where action_id = :actionId");
        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("actionId", actionId);
        return (Integer) query.uniqueResult();
    }


    public void updateProjectNum(Project project) {
        String sql = "UPDATE tb_project SET mock_num = :mockNum WHERE id = :projectId";
        currentSession().createSQLQuery(sql).setInteger("mockNum", project.getMockNum()).setInteger("projectId", project.getId()).executeUpdate();
    }


    public void updateCreatorId(int projectId, int creatorId) {
        Query query = currentSession().createSQLQuery("UPDATE tb_project SET user_id = :userId WHERE id = :id");
        query.setInteger("userId", creatorId);
        query.setInteger("id", projectId);
        query.executeUpdate();
    }

    public Project getProject(int id) {
        return currentSession().get(Project.class, id);
    }

    public List<Integer> getMemberIdsOfProject(int projectId) {
        Query query = currentSession().createSQLQuery("SELECT user_id FROM tb_project_and_user WHERE project_id = :projectId");
        query.setInteger("projectId", projectId);
        return query.list();
    }

}

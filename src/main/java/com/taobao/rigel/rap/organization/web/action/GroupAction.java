package com.taobao.rigel.rap.organization.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.bo.RapError;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GroupAction extends ActionBase {

    private OrganizationMgr organizationMgr;
    private ProjectMgr projectMgr;
    private int id;
    private String name;

    public int getProductlineId() {
        return productlineId;
    }

    public void setProductlineId(int productlineId) {
        this.productlineId = productlineId;
    }

    private int productlineId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    public String all() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (!organizationMgr.canUserAccessProductionLine(getCurUserId(), productlineId)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        Gson gson = new Gson();
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> groups = new ArrayList<Map<String, Object>>();
        List<Group> groupModels = organizationMgr.getGroupList(productlineId);
        for (Group groupModel : groupModels) {
            Map<String, Object> group = new HashMap<String, Object>();
            group.put("id", groupModel.getId());
            group.put("name", groupModel.getName());
            List<Project> projectModelList = projectMgr
                    .getProjectListByGroup(groupModel.getId());
            List<Map<String, Object>> projects = new ArrayList<Map<String, Object>>();
            for (Project projectModel : projectModelList) {
                if (getCurUser().isUserInRole("admin")
                        || organizationMgr.canUserManageProject(
                        getCurUser().getId(), projectModel.getId())) {
                    projectModel.setIsManagable(true);
                }
                Map<String, Object> project = new HashMap<String, Object>();
                project.put("id", projectModel.getId());
                project.put("name", projectModel.getName());
                project.put("desc", projectModel.getIntroduction());
                project.put("status", projectModel.getLastUpdateStr());
                project.put("accounts", projectModel.getMemberAccountListStr());
                project.put("isManagable", projectModel.isManagable());
                project.put("creator", projectModel.getUser().getUserBaseInfo());
                project.put("teamId", projectModel.getTeamId());
                projects.add(project);
            }
            group.put("projects", projects);
            groups.add(group);
        }

        result.put("groups", groups);

        setJson(gson.toJson(result));
        return SUCCESS;
    }

    public String groups() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (!organizationMgr.canUserAccessProductionLine(getCurUserId(), productlineId)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        Gson gson = new Gson();
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> groups = new ArrayList<Map<String, Object>>();
        List<Group> groupModels = organizationMgr.getGroupList(productlineId);
        for (Group groupModel : groupModels) {
            Map<String, Object> group = new HashMap<String, Object>();
            group.put("id", groupModel.getId());
            group.put("name", groupModel.getName());
            groups.add(group);
        }

        result.put("groups", groups);

        setJson(gson.toJson(result));
        return SUCCESS;
    }

    public String create() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (!organizationMgr.canUserManageProductionLine(getCurUserId(), productlineId)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        Gson gson = new Gson();
        Group group = new Group();
        group.setName(name);
        group.setUserId((int) getCurUserId());
        group.setProductionLineId(productlineId);
        int id = organizationMgr.addGroup(group);
        Map<String, Object> g = new HashMap<String, Object>();
        g.put("id", id);
        g.put("name", name);
        setJson("{\"groups\":[" + gson.toJson(g) + "]}");
        return SUCCESS;
    }

    public String delete() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (!organizationMgr.canUserManageGroup(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        RapError error = organizationMgr.removeGroup(id);
        setJson(error.toString());
        return SUCCESS;
    }

    public String update() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        if (!organizationMgr.canUserManageGroup(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return JSON_ERROR;
        }
        Group group = new Group();
        group.setId(id);
        group.setName(name);
        organizationMgr.updateGroup(group);
        setJson("{\"isOk\":\"true\"}");
        return SUCCESS;
    }

}

package com.taobao.rigel.rap.organization.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrganizationAction extends ActionBase {
    private OrganizationMgr organizationMgr;
    private ProjectMgr projectMgr;

    public int getPlid() {
        return plid;
    }

    public void setPlid(int plid) {
        this.plid = plid;
    }

    private int plid;
    private int id;
    private ProductionLine productline;

    public void setTeam(Corporation team) {
        this.team = team;
    }

    private Corporation team;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ProductionLine getProductline() {
        return productline;
    }

    public Corporation getTeam() {
        return team;
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

    public String myHome() {
        return SUCCESS;
    }

    public String index() {
        if (isUserLogined()) {
            return SUCCESS;
        } else {
            return "public";
        }

    }

    public String group() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/org/group.do?plid=" + plid);
            return LOGIN;
        }

        if (!organizationMgr.canUserAccessProductionLine(getCurUserId(), plid)) {
            setErrMsg(ACCESS_DENY);
            return ERROR;
        }

        productline = organizationMgr.getProductionLine(plid);
        team = organizationMgr.getCorporation(productline.getCorporationId());
        return SUCCESS;
    }

    public String productline() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/org/productline.do?id=" + id);
            return LOGIN;
        }

        if (!organizationMgr.canUserAccessCorp(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return ERROR;
        }

        setTeam(organizationMgr.getCorporation(id));
        return SUCCESS;
    }

    public String projects() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }

        int curUserId =  getCurUserId();

        String[] cacheKey = new String[]{CacheUtils.KEY_PROJECT_LIST, new Integer(curUserId).toString()};

        String cacheResult = CacheUtils.get(cacheKey);
        if (cacheResult != null) {
            setJson(cacheResult);
        } else {

            Gson gson = new Gson();

            List<Map<String, Object>> projects = new ArrayList<Map<String, Object>>();

            // int totalRecNum = projectMgr.getProjectListNum(getCurUser());
            User curUser = getAccountMgr().getUser(curUserId);
            List<Project> projectList = projectMgr.getProjectList(curUser, 1,
                    Integer.MAX_VALUE);


            for (Project p : projectList) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("id", p.getId());
                map.put("name", p.getName());
                map.put("desc", p.getIntroduction());
                map.put("status", p.getLastUpdateStr());
                map.put("accounts", p.getMemberAccountListStr());
                map.put("isManagable", p.isManagable());
                map.put("isDeletable", p.isDeletable());
                map.put("creator", p.getUser().getUserBaseInfo());
                map.put("related", p.getUser().getId() != curUserId);
                map.put("teamId", p.getTeamId());
                projects.add(map);
            }
            StringBuilder json = new StringBuilder();
            json.append("{");
            json.append("	\"groups\" : [{");
            json.append("		\"type\" : \"user\",");
            json.append("		\"projects\" :");
            json.append(gson.toJson(projects));
            json.append("	}]");
            json.append("}");
            setJson(json.toString());
            CacheUtils.put(cacheKey, json.toString());
        }
        return SUCCESS;
    }

    public String corporationList() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }

        Gson gson = new Gson();
        setJson(gson.toJson(organizationMgr.getCorporationListWithPager(getCurUserId(), 1, 1000, null)));
        return SUCCESS;
    }

}

package com.taobao.rigel.rap.organization.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.ContextManager;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OrganizationAction extends ActionBase {
	private static final long serialVersionUID = -7254075166703993812L;
	private OrganizationMgr organizationMgr;
	private ProjectMgr projectMgr;
	private int plid;
	private int id;

    public Corporation getCorporation() {
        return corporation;
    }

    public void setCorporation(Corporation corporation) {
        this.corporation = corporation;
    }

    private Corporation corporation;

    private ProductionLine productline;

    private Corporation team;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPlid() {
		return plid;
	}

	public void setPlid(int plid) {
		this.plid = plid;
	}

	public ProductionLine getProductLine() {
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
        productline = organizationMgr.getProductionLine(plid);
        int corpId = productline.getCorporationId();
        team = organizationMgr.getCorporation(corpId);
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String productline() {
		if (!isUserLogined()) {
			plsLogin();
			setRelativeReturnUrl("/org/productline.do?id=" + id);
			return LOGIN;
		}
        setCorporation(organizationMgr.getCorporation(id));
		return SUCCESS;
	}

	public String projects() {
		if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
		Gson gson = new Gson();
		List<Map<String, Object>> projects = new ArrayList<Map<String, Object>>();
		// long totalRecNum = projectMgr.getProjectListNum(getCurUser());
		List<Project> projectList = projectMgr.getProjectList(getCurUser(), 1,
				Integer.MAX_VALUE);
		for (Project p : projectList) {
			if (getCurUser().isUserInRole("admin")
					|| getAccountMgr().canUserManageProject(
							getCurUser().getId(), p.getId())) {
				p.setIsManagable(true);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", p.getId());
			map.put("name", p.getName());
			map.put("desc", p.getIntroduction());
			map.put("status", p.getLastUpdateStr());
			map.put("accounts", p.getMemberAccountListStr());
			map.put("isManagable", p.getIsManagable());
			map.put("creator", p.getUser().getUserBaseInfo());
			map.put("related", p.getUser().getId() != getCurUserId());
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
		return SUCCESS;
	}

	public String corporationList() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }

		Gson gson = new Gson();
		setJson(gson.toJson(organizationMgr.getCorporationList()));
		return SUCCESS;
	}

}

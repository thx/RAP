package com.taobao.rigel.rap.tester.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.HTTPUtils;
import com.taobao.rigel.rap.common.SystemVisitorLog;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.tester.bo.SSOUserRes;
import org.apache.velocity.tools.config.EasyFactoryConfiguration;

import java.util.List;
import java.util.Map;


public class TesterAction extends ActionBase {

	private static final long serialVersionUID = 1L;
	private ProjectMgr projectMgr;
	private int id;
	private Page page;
	private int projectId;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    private String url;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    private OrganizationMgr organizationMgr;

	public int getProjectId() {
		return projectId;
	}

	public Page getPage() {
		return page;
	}

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String pageTester() {

        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/tester/pageTester.do?id="
                    + id);
            return LOGIN;
        }

        if (!organizationMgr.canUserAccessPage(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return ERROR;
        }

		page = projectMgr.getPage(id);
		projectMgr.loadParamIdListForPage(page);
		projectId = page.getModule().getProject().getId();
		return SUCCESS;
	}

    public String test() {
		/**
        SystemVisitorLog.clear(projectMgr);
        System.out.println("Clear complete!");
        setJson("clear complete");
		 */
        return SUCCESS;
    }
	
	/**
	 * used for system configuration when new version deployed
	 * @return
	 */
	public String ___init___() throws Exception {


		return SUCCESS;
	}
}

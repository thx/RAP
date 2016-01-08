package com.taobao.rigel.rap.tester.web.action;

import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.service.ProjectMgr;


public class TesterAction extends ActionBase {

    private ProjectMgr projectMgr;
    private int id;
    private Page page;
    private int projectId;
    private String url;
    private OrganizationMgr organizationMgr;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

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
     *
     * @return
     */
    public String ___init___() throws Exception {


        return SUCCESS;
    }
}

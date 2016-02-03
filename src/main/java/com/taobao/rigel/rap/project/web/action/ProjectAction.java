package com.taobao.rigel.rap.project.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.auto.generate.bo.VelocityTemplateGenerator;
import com.taobao.rigel.rap.auto.generate.contract.Generator;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.bo.RapError;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.service.WorkspaceMgr;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.*;

public class ProjectAction extends ActionBase {

    private int id;

    private List<Project> searchResult;

    private String ids;
    private String key;
    private String desc;
    private int groupId;
    private String accounts;
    private String memberAccountListStr;
    private String name;
    private Date createDate;
    private String introduction;
    private List<Project> projectList;
    private Project project;
    private ProjectMgr projectMgr;
    private WorkspaceMgr workspaceMgr;
    private int pageId;
    private String projectData;
    private String result;
    private InputStream outputStream;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    private OrganizationMgr organizationMgr;

    public String getIds() {
        if (ids == null || ids.isEmpty()) {
            return "";
        }

        String[] idList = ids.split(",");
        String returnVal = "";
        Integer num = 0;
        int counter = 0;
        for (String id : idList) {
            try {
                num = Integer.parseInt(id);
                counter++;
                if (counter > 1) {
                    returnVal += ",";
                }
                returnVal += num.toString();

            } catch (Exception ex) {

            }
        }
        return returnVal;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public List<Project> getSearchResult() {
        return searchResult;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getAccounts() {
        if (accounts == null)
            return "";
        return accounts;
    }

    public void setAccounts(String accounts) {
        this.accounts = accounts;
    }

    public List<String> getMemberAccountList() {
        List<String> memberList = new ArrayList<String>();
        for (User user : super.getAccountMgr().getUserList()) {
            memberList.add(user.getAccount() + "(" + user.getName() + ")");
        }
        return memberList;
    }

    public String getMemberAccountListStr() {
        return memberAccountListStr;
    }

    public void setMemberAccountListStr(String memberAccountListStr) {
        this.memberAccountListStr = memberAccountListStr;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getIntroduction() {
        return this.introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public List<Project> getProjectList() {
        return this.projectList;
    }

    public void setProjectList(List<Project> projectList) {
        this.projectList = projectList;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public WorkspaceMgr getWorkspaceMgr() {
        return workspaceMgr;
    }

    public void setWorkspaceMgr(WorkspaceMgr workspaceMgr) {
        this.workspaceMgr = workspaceMgr;
    }

    public int getPageId() {
        return pageId;
    }

    public void setPageId(int pageId) {
        this.pageId = pageId;
    }

    public String getProjectData() {
        return projectData;
    }

    public void setProjectData(String projectData) {
        this.projectData = projectData;
    }

    public String delete() {
        if (!isUserLogined())
            return LOGIN;
        if (!organizationMgr.canUserDeleteProject(getCurUserId(), getId())) {
            setErrMsg("您没有删除该项目的权限");
            return ERROR;
        }
        projectMgr.removeProject(getId());
        return SUCCESS;
    }

    public String create() {
        if (!isUserLogined())
            return LOGIN;
        Gson gson = new Gson();

        Project project = new Project();
        project.setCreateDate(new Date());
        project.setUser(getCurUser());
        project.setUserId(getCurUserId());
        project.setIntroduction(getDesc());
        project.setName(getName());
        project.setGroupId(groupId);
        List<String> memberAccountList = new ArrayList<String>();
        String[] list = getAccounts().split(",");
        // format: mashengbo(大灰狼堡森), linpanhui(林攀辉),
        for (String item : list) {
            String account = item.contains("(") ? item.substring(0,
                    item.indexOf("(")).trim() : item.trim();
            if (!account.equals("")) {
                memberAccountList.add(account);
            }
        }
        project.setMemberAccountList(memberAccountList);
        int projectId = projectMgr.addProject(project);
        project = projectMgr.getProject(projectId);

        for (String account : memberAccountList) {
            organizationMgr.addTeamMembers(getCurUserId(), organizationMgr.getTeamIdByProjectId(project.getId()), account);
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("id", project.getId());
        result.put("name", project.getName());
        result.put("desc", project.getIntroduction());
        result.put("accounts", project.getMemberAccountListStr());
        result.put("groupId", project.getGroupId());
        result.put("isManagable", "true");
        result.put("creator", project.getUser().getUserBaseInfo());
        setJson(new RapError(gson.toJson(result)).toString());
        return SUCCESS;
    }

    public String update() {
        if (!isUserLogined())
            return LOGIN;
        if (!organizationMgr.canUserManageProject(getCurUserId(), getId())) {
            setErrMsg("您没有管理该项目的权限");
            return ERROR;
        }

        Project project = new Project();
        project.setId(getId());
        project.setIntroduction(getDesc());
        project.setName(getName());
        project.setUser(getCurUser());
        List<String> memberAccountList = new ArrayList<String>();
        String[] list = getAccounts().split(",");
        // format: mashengbo(大灰狼堡森), linpanhui(林攀辉),
        for (String item : list) {
            String account = item.contains("(") ? item.substring(0,
                    item.indexOf("(")).trim() : item.trim();
            if (!account.equals("")) {
                memberAccountList.add(account);
                organizationMgr.addTeamMembers(getCurUserId(), organizationMgr.getTeamIdByProjectId(project.getId()), account);
            }
        }
        Gson gson = new Gson();
        project.setMemberAccountList(memberAccountList);
        projectMgr.updateProject(project);

        project = projectMgr.getProject(project.getId());

        if (getCurUser().isUserInRole("admin")
                || getCurUser().getId() == project.getUser().getId()) {
            project.setIsManagable(true);
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("id", project.getId());
        result.put("name", project.getName());
        result.put("desc", project.getIntroduction());
        result.put("accounts", project.getMemberAccountListStr());
        result.put("groupId", project.getGroupId());
        result.put("isManagable", project.isManagable());
        setJson(new RapError(gson.toJson(result)).toString());

        return SUCCESS;
    }

    public String updateReleatedIds() {
        if (!isUserLogined())
            return LOGIN;
        if (!organizationMgr.canUserManageProject(getCurUserId(), getId())) {
            setErrMsg("您没有管理该项目的权限");
            return ERROR;
        }

        Project project = projectMgr.getProjectSummary(getId());
        project.setRelatedIds(getIds());
        projectMgr.updateProject(project);


        return SUCCESS;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public InputStream getOutputStream() {
        return outputStream;
    }

    public void setOutputStream(InputStream outputStream) {
        this.outputStream = outputStream;
    }

    public String autoGenerate() throws FileNotFoundException,
            UnsupportedEncodingException {
        Generator generator = new VelocityTemplateGenerator();
        Page page = projectMgr.getPage(getPageId());
        generator.setObject(page);
        String exportFileString = generator.doGenerate();
        outputStream = new ByteArrayInputStream(
                exportFileString.getBytes("UTF8"));
        return SUCCESS;
    }

    public String getGeneratedFileName() {
        return projectMgr.getPage(getPageId()).getTemplate();
    }

    public String search() {

        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }

        User curUser = getCurUser();
        if (curUser.isAdmin()) {
            searchResult = projectMgr.search(key);
        } else {
            searchResult = projectMgr.search(key, getCurUserId());
        }

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (Project p : searchResult) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("id", p.getId());
            item.put("name", p.getName());
            list.add(item);
        }
        Gson gson = new Gson();
        setJson(gson.toJson(list));
        return SUCCESS;
    }

}

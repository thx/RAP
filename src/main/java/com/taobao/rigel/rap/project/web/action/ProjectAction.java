package com.taobao.rigel.rap.project.web.action;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.auto.generate.bo.VelocityTemplateGenerator;
import com.taobao.rigel.rap.auto.generate.contract.Generator;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.RapError;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.service.WorkspaceMgr;

public class ProjectAction extends ActionBase {

	private int id;

	private List<Project> searchResult;
	
	private String ids;

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

	private String key;

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

	private String desc;

	private int groupId;

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	private String accounts;

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

	private String memberAccountListStr;

	public String getMemberAccountListStr() {
		return memberAccountListStr;
	}

	public void setMemberAccountListStr(String memberAccountListStr) {
		this.memberAccountListStr = memberAccountListStr;
	}

	private String name;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private Date createDate;

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	private String introduction;

	public String getIntroduction() {
		return this.introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	private List<Project> projectList;

	public List<Project> getProjectList() {
		return this.projectList;
	}

	public void setProjectList(List<Project> projectList) {
		this.projectList = projectList;
	}

	private Project project;

	public Project getProject() {
		return this.project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	private static final long serialVersionUID = 1L;

	private ProjectMgr projectMgr;

	/**
	 * get project manager
	 * 
	 * @return project manager
	 */
	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	private WorkspaceMgr workspaceMgr;

	public WorkspaceMgr getWorkspaceMgr() {
		return workspaceMgr;
	}

	public void setWorkspaceMgr(WorkspaceMgr workspaceMgr) {
		this.workspaceMgr = workspaceMgr;
	}

	private int pageId;

	public int getPageId() {
		return pageId;
	}

	public void setPageId(int pageId) {
		this.pageId = pageId;
	}

	private String projectData;

	public String getProjectData() {
		return projectData;
	}

	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}


	public String delete() {
		if (!isUserLogined())
			return LOGIN;
		if (!getAccountMgr().canUserManageProject(getCurUserId(), getId())) {
			setErrMsg("您没有管理该项目的权限");
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
		project.setIntroduction(getDesc());
		project.setName(getName());
		project.setGroupId(groupId);
		List<String> memberAccountList = new ArrayList<String>();
		String[] list = getAccounts().split(",");
		// format: mashengbo(大灰狼堡森), linpanhui(林攀辉),
		for (String item : list) {
			String account = item.contains("(") ? item.substring(0,
					item.indexOf("(")).trim() : item.trim();
			if (!account.equals(""))
				memberAccountList.add(account);
		}
		project.setMemberAccountList(memberAccountList);
		int projectId = projectMgr.addProject(project);
		project = projectMgr.getProject(projectId);
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
		if (!getAccountMgr().canUserManageProject(getCurUserId(), getId())) {
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
			if (!account.equals(""))
				memberAccountList.add(account);
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
		result.put("isManagable", project.getIsManagable());
		setJson(new RapError(gson.toJson(result)).toString());
		return SUCCESS;
	}
	
	public String updateReleatedIds() {
		if (!isUserLogined())
			return LOGIN;
		if (!getAccountMgr().canUserManageProject(getCurUserId(), getId())) {
			setErrMsg("您没有管理该项目的权限");
			return ERROR;
		}
		
		Project project = projectMgr.getProject(getId());
		project.setRelatedIds(getIds());
		projectMgr.updateProject(project);
		
		return SUCCESS;
	}

	private String result;

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	private InputStream outputStream;

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

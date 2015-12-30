package com.taobao.rigel.rap.workspace.web.action;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import com.google.gson.Gson;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.ContextManager;
import com.taobao.rigel.rap.common.MapUtils;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Save;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.service.WorkspaceMgr;

public class WorkspaceAction extends ActionBase {

	private static final long serialVersionUID = 1L;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    private OrganizationMgr organizationMgr;
	
	private boolean accessable;

	public boolean isAccessable() {
		return accessable;
	}

	public void setAccessable(boolean accessable) {
		this.accessable = accessable;
	}

	private boolean mock;

	private int actionId;

	public int getActionId() {
		return actionId;
	}

	public void setActionId(int actionId) {
		this.actionId = actionId;
	}

	public boolean isMock() {
		return mock;
	}

	public void setMock(boolean mock) {
		this.mock = mock;
	}

	private int id;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	private String workspaceJsonString;

	public String getWorkspaceJsonString() {
		return this.workspaceJsonString;
	}

	public void setWorkspaceJsonString(String workspaceJsonString) {
		this.workspaceJsonString = workspaceJsonString;
	}

	private Workspace workspace;

	public Workspace getWorkspace() {
		return this.workspace;
	}

	public void setWorkspace(Workspace workspace) {
		this.workspace = workspace;
	}

	public Module module;

	public Module getModule() {
		return this.module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	private VelocityEngine velocityEngine;

	public VelocityEngine getVelocityEngine() {
		return velocityEngine;
	}

	public void setVelocityEngine(VelocityEngine velocityEngine) {
		this.velocityEngine = velocityEngine;
	}

	private int projectId;

	private Project project;

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	private String projectData;

	public String getProjectData() {
		return projectData;
	}

	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}

	private String projectDataOriginal;

	public String getProjectDataOriginal() {
		return projectDataOriginal;
	}

	public void setProjectDataOriginal(String projectDataOriginal) {
		this.projectDataOriginal = projectDataOriginal;
	}

	private String saveListJson;

	public String getSaveListJson() {
		return saveListJson;
	}

	public void setSaveListJson(String saveListJson) {
		this.saveListJson = saveListJson;
	}

	private int saveId = -1;

	public int getSaveId() {
		return saveId;
	}

	public void setSaveId(int saveId) {
		this.saveId = saveId;
	}

	private Save save;

	public Save getSave() {
		return save;
	}

	public void setSave(Save save) {
		this.save = save;
	}

	private int versionId;

	public int getVersionId() {
		return versionId;
	}

	public void setVersionId(int versionId) {
		this.versionId = versionId;
	}

	private String deletedObjectListData;

	public String getDeletedObjectListData() {
		return deletedObjectListData;
	}

	public void setDeletedObjectListData(String deletedObjectListData) {
		this.deletedObjectListData = deletedObjectListData;
	}

	private String tag;

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	/**
	 * from 1 to 4, version position
	 */
	private int versionPosition;

	public int getVersionPosition() {
		return versionPosition;
	}

	public void setVersionPosition(int versionPosition) {
		this.versionPosition = versionPosition;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	private boolean isLocked;

	public boolean getIsLocked() {
		return isLocked;
	}

	public void setIsLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}

    private static final org.apache.logging.log4j.Logger logger = org.apache.logging.log4j.LogManager.getFormatterLogger(WorkspaceAction.class.getName());

	public String myWorkspace() {
		if (!isUserLogined()) {
			plsLogin();
			setRelativeReturnUrl("/workspace/myWorkspace.action?projectId="
					+ projectId);
			return LOGIN;
		}
        Project p = projectMgr.getProject(getProjectId());
        if (p == null || p.getId() <= 0) {
            setErrMsg("该项目不存在或已被删除，会不会是亲这个链接保存的太久了呢？0  .0");
            logger.error("Unexpected project id=%d", getProjectId());
            return ERROR;
        }
        if (!organizationMgr.canUserAccessProject(getCurUserId(), getProjectId())) {
            setErrMsg(ACCESS_DENY);
            return ERROR;
        }

		Workspace workspace = new Workspace();
		workspace.setProject(p);
		setWorkspaceJsonString(workspace.toString());
		setWorkspace(workspace);
		setAccessable(getAccountMgr().canUserManageProject(getCurUserId(), getProjectId()));
		return SUCCESS;
	}

	private InputStream fileInputStream;

	/**
	 * save workspace if this.saveId == -1(default), it's a new save and needs
	 * projectId and id(workspaceId). else, just need saveId only to cover the
	 * existed one. all conditions parameters: projectData
	 * 
	 * @return
	 */
	/*
	 * public String updateSave() { int id = getSaveId(); Save save = null; if
	 * (id == -1) { save = new Save(); save.setProjectId(getProjectId());
	 * save.setWorkspaceId(getId()); } else { save =
	 * workspaceMgr.getSave(getSaveId()); }
	 * save.setProjectData(getProjectData()); id =
	 * workspaceMgr.updateSave(save);
	 * 
	 * // after update the save, return saveList json string
	 * setupSaveListJson(); return SUCCESS; }
	 */

	/*
	 * private void setupSaveListJson() { Set<Save> saveList =
	 * workspaceMgr.getSaveList(getId()); StringBuilder stringBuilder = new
	 * StringBuilder(); stringBuilder.append("["); Iterator<Save> iterator =
	 * saveList.iterator(); while (iterator.hasNext()) {
	 * stringBuilder.append(iterator.next()); if (iterator.hasNext()) {
	 * stringBuilder.append(","); } } stringBuilder.append("]");
	 * setSaveListJson(stringBuilder.toString()); }
	 */

	/**
	 * delete save
	 * 
	 * @return
	 */
	/*
	 * public String removeSave() { workspaceMgr.removeSave(getSaveId());
	 * setupSaveListJson(); return SUCCESS; }
	 */

	/**
	 * load save, saveId must be significant, or operation failed
	 * 
	 * @return the save object loaded
	 */
	/*
	 * public String querySave() {
	 * setJson(workspaceMgr.getSave(getSaveId()).getProjectData()); return
	 * SUCCESS; }
	 */

	public InputStream getFileInputStream() {
		return fileInputStream;
	}

	/**
	 * ` save the current workspace
	 * 
	 * @return
	 */
	/*
	 * public String updateCurrentSave() { Workspace workspace =
	 * workspaceMgr.getWorkspace(getId());
	 * workspace.setProjectData(getProjectData());
	 * workspaceMgr.updateWorkspace(workspace); return SUCCESS; }
	 */

	private WorkspaceMgr workspaceMgr;

	public WorkspaceMgr getworkspaceMgr() {
		return workspaceMgr;
	}

	public void setWorkspaceMgr(WorkspaceMgr workspaceMgr) {
		this.workspaceMgr = workspaceMgr;
	}

	private ProjectMgr projectMgr;

	public ProjectMgr projectMgr() {
		return this.projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

    /**
	public String ping() {
		setJson("{\"isOk\":true}");
		return SUCCESS;
	}
     */

	public String queryVersion() {
		setJson(workspaceMgr.getVersion(getVersionId()).toString(
				CheckIn.ToStringType.COMPLETED));
		return SUCCESS;
	}

	public String switchVersion() {
		CheckIn check = workspaceMgr.getVersion(getVersionId());
		workspaceMgr.prepareForVersionSwitch(check);
		projectMgr.updateProject(check.getProject().getId(),
				check.getProjectData(), "[]", new HashMap<Long, Long>());
		Project project = projectMgr.getProject(check.getProject().getId());
		String projectData = project
				.toString(Project.TO_STRING_TYPE.TO_PARAMETER);
		setJson("{\"projectData\":" + projectData + ", \"isOk\":true}");
		project.setProjectData(projectData);
		projectMgr.updateProject(project);
		return SUCCESS;
	}

	public String checkIn() throws Exception {
        User curUser = getAccountMgr().getUser(getCurUserId());
		if (curUser == null) {
			setErrMsg(LOGIN_WARN_MSG);
            logger.error("Unlogined user trying to checkin and failed.");
			return JSON_ERROR;
		}

		if (!getAccountMgr().canUserManageProject(getCurUserId(), getId())) {
			setErrMsg("access deny");
            logger.error("User %s trying to checkedin project(id=$d) and denied.", getCurUserAccount(), getId());
			return JSON_ERROR;
		}

		// update project
		Map<Long, Long> actionIdMap = new HashMap<Long, Long>();
		projectMgr.updateProject(getId(), getProjectData(),
				getDeletedObjectListData(), actionIdMap);


		project = projectMgr.getProject(getId());

		// generate one check-in of VSS mode submit
		CheckIn checkIn = new CheckIn();
		checkIn.setCreateDate(new Date());
		checkIn.setDescription(getDescription());
		checkIn.setProject(project);
		checkIn.setProjectData(project
				.toString(Project.TO_STRING_TYPE.TO_PARAMETER));
		checkIn.setTag(getTag());
		checkIn.setUser(curUser);
		checkIn.setVersion(project.getVersion());
		checkIn.versionUpgrade(getVersionPosition());

		// after version upgrade, set back to project
		project.setVersion(checkIn.getVersion());
		checkIn.setWorkspaceMode(Workspace.ModeType.VSS);
		workspaceMgr.addCheckIn(checkIn);

		// calculate JSON string for client
		project = projectMgr.getProject(getId());
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("{\"projectData\":" + checkIn.getProjectData());
		stringBuilder.append(",\"checkList\":[");
		Iterator<CheckIn> iterator = project.getCheckInListOrdered().iterator();
		while (iterator.hasNext()) {
			stringBuilder.append(iterator.next());
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		Gson g = new Gson();
		stringBuilder
				.append("],\"actionIdMap\":")
				.append(g.toJson(actionIdMap))
				.append(",\"isOk\":true}");
		setJson(stringBuilder.toString());

		// update project data
		project.setProjectData(checkIn.getProjectData());
		projectMgr.updateProject(project);

		// unlock the workspace
		unlock();

        // notification for doc change
        for (User user : project.getUserList()) {
            Notification notification = new Notification();
            notification.setParam1(new Integer(id).toString());
            notification.setParam2(project.getName());
            notification.setTypeId((short) 1);
            notification.setTargetUser(curUser);
            notification.setUser(user);
            if (notification.getUser().getId() != getCurUserId())
                getAccountMgr().addNotification(notification);
        }

        Notification notification = new Notification();
        notification.setParam1(new Integer(id).toString());
        notification.setParam2(project.getName());
        notification.setTypeId((short) 1);
        notification.setTargetUser(curUser);
        notification.setUser(project.getUser());
        if (notification.getUser().getId() != getCurUserId())
            getAccountMgr().addNotification(notification);

		// unfinished

        Callable<String> taskSub = new Callable<String>() {

            @Override
            public String call() throws Exception {
                try {
                    // async update doc
                    // projectMgr.updateDoc(id);
                    // async update disableCache
                    projectMgr.updateCache(id);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }

                return null;
            }
        };

        FutureTask<String> futureTask = new FutureTask<String>(taskSub);
        Thread asyncThread = new Thread(futureTask);
        asyncThread.start();
        logger.info("Future task CHECK_IN running...");

		return SUCCESS;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String lock() {
		long curUserId = getCurUserId();
		if (curUserId <= 0) {
			setIsOk(false);
			setErrMsg(LOGIN_WARN_MSG);
			return JSON_ERROR;
		}

		boolean isOk = false;
		if (isLocked(getId())) {
			// if the project is locked, find the locker
			User user = getLocker(getId());
			if (!user.getAccount().equals(getCurUserAccount())) {
				setJson("{\"isOk\":false, \"errMsg\":\"该项目目前正被"
						+ user.getName() + "锁定.\"}");
			} else {
				// user request lock a locked project
				// which is locked by himself, so let him go
				isOk = true;
			}

		} else {
			// else, lock the project, than let him go.
			Map app = ContextManager.getApplication();
			if (app.get(ContextManager.KEY_PROJECT_LOCK_LIST) == null) {
				app.put(ContextManager.KEY_PROJECT_LOCK_LIST, new HashMap());
			}
			Map projectLockList = (Map) app
					.get(ContextManager.KEY_PROJECT_LOCK_LIST);
			if (projectLockList.get(curUserId) == null) {
				projectLockList.put(curUserId, getId());
				// System.out.println("user[" + curUserId + "] locked project["+
				// getId() + "]");
			}
			isOk = true;
		}
		if (isOk) {
			setJson("{\"isOk\":true, \"projectData\":"
					+ projectMgr.getProject(getId()).getProjectData() + "}");
		}
		return SUCCESS;
	}

	@SuppressWarnings({ "rawtypes" })
	public String unlock() {
		if (isLocked(getId())) {
			Map app = ContextManager.getApplication();
			Map projectLockList = (Map) app
					.get(ContextManager.KEY_PROJECT_LOCK_LIST);
			if (projectLockList == null)
				return SUCCESS;
			long userId = super.getCurUserId();
			int projectId = (Integer) projectLockList.get(userId);
			projectLockList.remove(userId);
			logger.info("user[%d] unlock project[%d]", userId, projectId);
		}
		return SUCCESS;
	}

	/**
	 * caution: no authentication so far
	 * 
	 * @return
	 * @throws Exception
	 */
	public String export() throws Exception {
		project = projectMgr.getProject(projectId);
		velocityEngine.init();
		VelocityContext context = new VelocityContext();
		context.put("project", project);
		Template template = null;
		try {
			template = velocityEngine.getTemplate("resource/export.vm", "UTF8");
		} catch (ResourceNotFoundException rnfe) {
			rnfe.printStackTrace();
		} catch (ParseErrorException pee) {
			pee.printStackTrace();
		} catch (MethodInvocationException mie) {
			mie.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		StringWriter sw = new StringWriter();
		template.merge(context, sw);
		fileInputStream = new ByteArrayInputStream(sw.toString().getBytes(
				"UTF8"));
		return SUCCESS;
	}

	@SuppressWarnings("rawtypes")
	private boolean isLocked(int projectId) {
		Map app = ContextManager.getApplication();
		Map projectLockList = (Map) app
				.get(ContextManager.KEY_PROJECT_LOCK_LIST);
		return projectLockList != null
				&& projectLockList.containsValue(projectId) ? true : false;
	}

	@SuppressWarnings("rawtypes")
	private User getLocker(int projectId) {
		Map app = ContextManager.getApplication();
		Map projectLockList = (Map) app
				.get(ContextManager.KEY_PROJECT_LOCK_LIST);
		if (projectLockList != null) {
			long userId = (Long) MapUtils.getKeyByValue(projectLockList,
					projectId);
			User user = getAccountMgr().getUser(userId);
			return user;
		}
		return null;
	}

    public String __init__() {
        // prevent repeated intialization of servcie

        /**
        if (SystemConstant.serviceInitialized) {
            return SUCCESS;
        }

        SystemConstant.serviceInitialized = true;

        List<Project> list = projectMgr.getProjectList();
        for (Project p : list) {
            projectMgr.updateDoc(p.getId());
        }
         */
        return SUCCESS;

    }

}

package com.taobao.rigel.rap.workspace.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.config.SystemConstant;
import com.taobao.rigel.rap.common.service.impl.ContextManager;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.utils.MapUtils;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.service.WorkspaceMgr;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.*;

public class WorkspaceAction extends ActionBase {

    private static final Logger logger = LogManager.getFormatterLogger(WorkspaceAction.class);
    public Module module;
    private OrganizationMgr organizationMgr;

    private boolean accessable;
    private boolean mock;
    private int actionId;
    private int id;
    private String workspaceJsonString;
    private Workspace workspace;
    private VelocityEngine velocityEngine;
    private int projectId;
    private Project project;
    private String projectData;
    private String projectDataOriginal;
    private String saveListJson;
    private int saveId = -1;
    private int versionId;
    private String deletedObjectListData;
    private String tag;
    /**
     * from 1 to 4, version position
     */
    private int versionPosition;
    private String description;
    private boolean isLocked;
    private InputStream fileInputStream;

    private WorkspaceMgr workspaceMgr;
    private ProjectMgr projectMgr;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    public boolean isAccessable() {
        return accessable;
    }

    public void setAccessable(boolean accessable) {
        this.accessable = accessable;
    }

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

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkspaceJsonString() {
        return this.workspaceJsonString;
    }

    public void setWorkspaceJsonString(String workspaceJsonString) {
        this.workspaceJsonString = workspaceJsonString;
    }

    public Workspace getWorkspace() {
        return this.workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public Module getModule() {
        return this.module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public VelocityEngine getVelocityEngine() {
        return velocityEngine;
    }

    public void setVelocityEngine(VelocityEngine velocityEngine) {
        this.velocityEngine = velocityEngine;
    }

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

    public String getProjectData() {
        return projectData;
    }

    public void setProjectData(String projectData) {
        this.projectData = projectData;
    }

    public String getProjectDataOriginal() {
        return projectDataOriginal;
    }

    public void setProjectDataOriginal(String projectDataOriginal) {
        this.projectDataOriginal = projectDataOriginal;
    }

    public String getSaveListJson() {
        return saveListJson;
    }

    public void setSaveListJson(String saveListJson) {
        this.saveListJson = saveListJson;
    }

    public int getSaveId() {
        return saveId;
    }

    public void setSaveId(int saveId) {
        this.saveId = saveId;
    }

    public int getVersionId() {
        return versionId;
    }

    public void setVersionId(int versionId) {
        this.versionId = versionId;
    }

    public String getDeletedObjectListData() {
        return deletedObjectListData;
    }

    public void setDeletedObjectListData(String deletedObjectListData) {
        this.deletedObjectListData = deletedObjectListData;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public int getVersionPosition() {
        return versionPosition;
    }

    public void setVersionPosition(int versionPosition) {
        this.versionPosition = versionPosition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(boolean isLocked) {
        this.isLocked = isLocked;
    }

    public String myWorkspace() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/workspace/myWorkspace.do?projectId="
                    + projectId);
            return LOGIN;
        }
        setAccessable(organizationMgr.canUserManageProject(getCurUserId(), getProjectId()));
        return SUCCESS;
    }

    public String loadWorkspace() {
        if (!isUserLogined()) {
            plsLogin();
            return JSON_ERROR;
        }
        String[] cacheKey = new String[]{CacheUtils.KEY_WORKSPACE, new Integer(getProjectId()).toString()};
        String cache = CacheUtils.get(cacheKey);
        if (cache != null) {
            setJson(cache);
        } else {
            Project p = projectMgr.getProject(getProjectId());

            if (p == null || p.getId() <= 0) {
                setErrMsg("该项目不存在或已被删除，会不会是亲这个链接保存的太久了呢？0  .0");
                logger.error("Unexpected project id=%d", getProjectId());
                return JSON_ERROR;
            }

            if (!organizationMgr.canUserAccessProject(getCurUserId(), getProjectId())) {
                setErrMsg(ACCESS_DENY);
                return JSON_ERROR;
            }

            Workspace workspace = new Workspace();
            workspace.setProject(p);

            String json = workspace.toString();
            setJson(json);

            CacheUtils.put(cacheKey, json);
        }
        return SUCCESS;
    }

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

    public WorkspaceMgr getworkspaceMgr() {
        return workspaceMgr;
    }

    public void setWorkspaceMgr(WorkspaceMgr workspaceMgr) {
        this.workspaceMgr = workspaceMgr;
    }

    public ProjectMgr projectMgr() {
        return this.projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public String ping() {
        setJson("{\"isOk\":true}");
        return SUCCESS;
    }

    public String queryVersion() {
        setJson(workspaceMgr.getVersion(getVersionId()).toString(
                CheckIn.ToStringType.COMPLETED));
        return SUCCESS;
    }

    public String switchVersion() {
        CheckIn check = workspaceMgr.getVersion(getVersionId());
        workspaceMgr.prepareForVersionSwitch(check);
        projectMgr.updateProject(check.getProject().getId(),
                check.getProjectData(), "[]", new HashMap<Integer, Integer>());
        Project project = projectMgr.getProject(check.getProject().getId());
        String projectData = project
                .toString(Project.TO_STRING_TYPE.TO_PARAMETER);
        setJson("{\"projectData\":" + projectData + ", \"isOk\":true}");
        project.setProjectData(projectData);
        projectMgr.updateProject(project);
        return SUCCESS;
    }

    public String checkIn() throws Exception {
        User curUser = getCurUser();
        if (curUser == null) {
            setErrMsg(LOGIN_WARN_MSG);
            logger.error("Unlogined user trying to checkin and failed.");
            return JSON_ERROR;
        }

        if (!organizationMgr.canUserManageProject(getCurUserId(), getId())) {
            setErrMsg("access deny");
            logger.error("User %s trying to checkedin project(id=$d) and denied.", getCurAccount(), getId());
            return JSON_ERROR;
        }

        // update project
        Map<Integer, Integer> actionIdMap = new HashMap<Integer, Integer>();
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
            notification.setTargetUser(getCurUser());
            notification.setUser(user);
            if (notification.getUser().getId() != getCurUserId())
                getAccountMgr().addNotification(notification);
        }

        Notification notification = new Notification();
        notification.setParam1(new Integer(id).toString());
        notification.setParam2(project.getName());
        notification.setTypeId((short) 1);
        notification.setTargetUser(getCurUser());
        notification.setUser(project.getUser());
        if (notification.getUser().getId() != getCurUserId())
            getAccountMgr().addNotification(notification);
        projectMgr.updateCache(id);

        return SUCCESS;
    }

    public String lock() {
        int curUserId = getCurUserId();
        if (curUserId <= 0) {
            setIsOk(false);
            setErrMsg(LOGIN_WARN_MSG);
            return JSON_ERROR;
        }

        boolean isOk = false;
        if (isLocked(getId())) {
            // if the project is locked, find the locker
            User user = getLocker(getId());
            if (!user.getAccount().equals(getCurAccount())) {
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

    public String unlock() {
        if (isLocked(getId())) {
            Map app = ContextManager.getApplication();
            Map projectLockList = (Map) app
                    .get(ContextManager.KEY_PROJECT_LOCK_LIST);
            if (projectLockList == null)
                return SUCCESS;
            int userId = super.getCurUserId();
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

    private boolean isLocked(int projectId) {
        Map app = ContextManager.getApplication();
        Map projectLockList = (Map) app
                .get(ContextManager.KEY_PROJECT_LOCK_LIST);
        return projectLockList != null
                && projectLockList.containsValue(projectId);
    }

    private User getLocker(int projectId) {
        Map app = ContextManager.getApplication();
        Map projectLockList = (Map) app
                .get(ContextManager.KEY_PROJECT_LOCK_LIST);
        if (projectLockList != null) {
            int userId = (Integer) MapUtils.getKeyByValue(projectLockList,
                    projectId);
            User user = getAccountMgr().getUser(userId);
            return user;
        }
        return null;
    }

    public String __init__() {
        // prevent repeated intialization of servcie
        if (SystemConstant.serviceInitialized) {
            return SUCCESS;
        }

        SystemConstant.serviceInitialized = true;

        List<Project> list = projectMgr.getProjectList();
        for (Project p : list) {
            projectMgr.updateDoc(p.getId());
        }
        return SUCCESS;
    }

}

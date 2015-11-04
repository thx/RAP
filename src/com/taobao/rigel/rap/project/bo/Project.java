package com.taobao.rigel.rap.project.bo;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.hibernate.Session;
import org.ocpsoft.prettytime.PrettyTime;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.DateUtils;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.bo.Workspace.ModeType;

public class Project implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	private int id;
	private long userId;
	private String name;
	private Date createDate;
	private Date updateTime;
	private String introduction;	
	private User user;	
	private int workspaceModeInt;
	private String relatedIds = "";
	private int groupId;
    private int mockNum;

    public static final int PRIVATE_ACCESS = 0;

    public static final int DEFAULT_ACCESS = 10;

	public int getTeamId() {
		return teamId;
	}

	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}

	private int teamId;

    public short getAccessType() {
        return accessType;
    }

    public void setAccessType(short accessType) {
        this.accessType = accessType;
    }

    private short accessType;

    public void setMockNum(int mockNum) {
        this.mockNum = mockNum;
    }

    public int getMockNum() {
        return mockNum;
    }

    public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public String getRelatedIds() {
		return relatedIds;
	}

	public void setRelatedIds(String relatedIds) {
		this.relatedIds = relatedIds;
	}

	public enum TO_STRING_TYPE {TO_MODULE, TO_PAGE, TO_ACTION, TO_PARAMETER};
	
	public enum STAGE_TYPE {DESIGNING, DEVELOPING, DEBUGING};	
	
	public int getWorkspaceModeInt() {
		return workspaceModeInt;
	}
	
	public void setWorkspaceModeInt(int workspaceModeInt) {
		this.workspaceModeInt = workspaceModeInt;
	}
	
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public ModeType getWorkspaceMode() {
		if (workspaceModeInt == 1) {
			return ModeType.VSS;
		} else if (workspaceModeInt == 2) {
			return ModeType.SVN;
		} else {
			return ModeType.VSS;
		}
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	private Set<User> userList = new HashSet<User>();
	
	public Set<User> getUserList() {
		return userList;
	}
	
	public void setUserList(Set<User> userList) {
		this.userList = userList;
	}

	private Set<Module> moduleList = new HashSet<Module>();

	public Set<Module> getModuleList() {
		return moduleList;
	}

	public void setModuleList(Set<Module> moduleList) {
		this.moduleList = moduleList;
	}
	
	public Project() {
		
	}
	
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
	
	public Date getCreateDate() {
		return createDate;
	}
	
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	
	public String getIntroduction() {
		return introduction;
	}
	
	public void setIntroduction(String introduction) {
		this.introduction = (introduction == null ? "" : introduction);
	}
	
	private String projectData;
	
	public String getProjectData() {
		return projectData;
	}
	
	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}
	
	public List<Module> getModuleListOrdered() {
		Set<Module> moduleList = getModuleList();
		List<Module> moduleListOrdered = new ArrayList<Module>();
		moduleListOrdered.addAll(moduleList);
		Collections.sort(moduleListOrdered, new ModuleComparator());
		return moduleListOrdered;
	}
	
	public void addModule(Module module) {
		getModuleList().add(module);
		module.setProject(this);
	}
	
	public String getMemberAccountListStr() {
		StringBuilder stringBuilder = new StringBuilder();
		for (User user : getUserList()) {
			stringBuilder.append(user.getAccount() + "(" + user.getName() + "), ");
		}
		return stringBuilder.toString();
	}
	
	private List<String> memberAccountList;
	
	public List<String> getMemberAccountList() {
		return memberAccountList;
	}
	
	public void setMemberAccountList(List<String> memberAccountList) {
		this.memberAccountList = memberAccountList;
	}
	
	private Set<Workspace> workspaceList = new HashSet<Workspace>();
	
	public Set<Workspace> getWorkspaceList() {
		return workspaceList;
	}
	
	public void setWorkspaceList(Set<Workspace> workspaceList) {
		this.workspaceList = workspaceList;
	}
	
	private String version;
	
	public String getVersion() {
		return version;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}		
	
	public String toString(TO_STRING_TYPE type) {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("{\"createDateStr\":\"" + getCreateDateStr() + "\",");
		stringBuilder.append("\"user\":" + getUser() + ",");
		stringBuilder.append("\"id\":" + getId() + ",");
		stringBuilder.append("\"version\":\"" + getVersion() + "\",");
		stringBuilder.append("\"introduction\":\"" + StringUtils.escapeInJ(getIntroduction()) + "\",");
		stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\",");
		stringBuilder.append("\"moduleList\":");

		stringBuilder.append("[");
		Iterator<Module> iterator = getModuleListOrdered().iterator();
		while(iterator.hasNext()) {
			stringBuilder.append(iterator.next().toString(type));
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		stringBuilder.append("]}");
		return stringBuilder.toString();
	}
	
	@Override
	public String toString() {
		return "{}";
	}
	
	public void update(Project project) {
		setIntroduction(project.getIntroduction());
		setName(project.getName());
	}
	
	private boolean isManagable; 
	
	public boolean getIsManagable() {
		return isManagable;
	}
	
	public void setIsManagable(boolean isManagable) {
		this.isManagable = isManagable;
	}
	
	public String getCreateDateStr() {
		return getCreateDate() == null ? "" : DateUtils.DATE_FORMAT.format(getCreateDate());
	}
	
	public void setCreateDateStr(String createDateStr) throws ParseException {
		setCreateDate((createDateStr == null || createDateStr.equals("")) ? 
				null : DateUtils.DATE_FORMAT.parse(createDateStr));
	}
	
	public String getUserListStr() {
		StringBuilder stringBuilder = new StringBuilder();
		Iterator<User> iterator = getUserList().iterator();
		while(iterator.hasNext()) {
			User user = iterator.next();
			// remove the creator
			if (user.getId() == getUser().getId()) continue;
			stringBuilder.append(user.getName() + "(" + user.getWorkRole() + ")");
			if (iterator.hasNext()) {
				stringBuilder.append(", ");
			}
		}
		return stringBuilder.toString();
	}
	
	public String getUserListStrShort() {
		StringBuilder stringBuilder = new StringBuilder();
		Iterator<User> iterator = getUserList().iterator();
		int count = 1;
		while(iterator.hasNext()) {
			User user = iterator.next();
			// remove the creator
			if (user.getId() == getUser().getId()) continue;
			stringBuilder.append(user.getName() + "(" + user.getWorkRole() + ")");
			if (iterator.hasNext()) {
				stringBuilder.append(", ");
			}
			if (++count > 5) {
				stringBuilder.append(iterator.hasNext() ? "etc." : "");
				break;
			}
		}
		return stringBuilder.toString();
	}
	
	private Set<CheckIn> checkInList = new HashSet<CheckIn>();
	
	public Set<CheckIn> getCheckInList() {
		return checkInList;
	}
	
	public void setCheckInList(Set<CheckIn> checkInList) {
		this.checkInList = checkInList;
	}
	
	public List<CheckIn> getCheckInListOrdered() {
		Set<CheckIn> checkInList = getCheckInList();
		List<CheckIn> checkInListOrdered = new ArrayList<CheckIn>();
		checkInListOrdered.addAll(checkInList);
		Collections.sort(checkInListOrdered, new CheckInComparator());
		return checkInListOrdered;
	}
	
	public Module findModule(int moduleId) {
		for (Module i : getModuleList()) {
			if (i.getId() == moduleId)
				return i;
		}
		return null;
	}
	
	public Page findPage(int pageId) {
		for (Module module : getModuleList()) {
			for (Page page : module.getPageList()) {
				if (page.getId() == pageId)
					return page;
			}
		}
		return null;
	}
	
	public Action findAction(long actionId) {
		for (Module module : getModuleList()) {
			for (Page page : module.getPageList()) {
				for (Action action : page.getActionList()) {
					if (action.getId() == actionId)
						return action;
				}
			}
		}
		return null;
	}
	
	public Parameter findParameter(int parameterId, boolean isRequestType) {
		for (Module module : getModuleList()) {
			for (Page page : module.getPageList()) {
				for (Action action : page.getActionList()) {
					for (Parameter parameter : (isRequestType ? 
							action.getRequestParameterList() : action.getResponseParameterList())) {
						if (parameter.getId() == parameterId) {
							return parameter;
						}
					}
				}
			}
		}
		return null;
	}
	
	public Parameter findChildParameter(int parameterId) {
		for (Module module : getModuleList()) {
			for (Page page : module.getPageList()) {
				for (Action action : page.getActionList()) {
					for (Parameter parameter : action.getRequestParameterList()) {
						Parameter pRecur = findParameterRecursively(parameter, parameterId);
						if (pRecur != null) {
							return pRecur;
						}
					}
					
					for (Parameter parameter : action.getResponseParameterList()) {
						Parameter pRecur = findParameterRecursively(parameter, parameterId);
						if (pRecur != null) {
							return pRecur;
						}
					}
				}
			}
		}
		return null;
	}
	
	/**
	 * find parameter recursively
	 * recursive:
	 * 		p.parameterList[0].parameterList[0].....
	 * 
	 * @param p
	 * @param id
	 * @return return the object found, other wise return null
	 */
	private Parameter findParameterRecursively(Parameter p, int id) {
		Iterator<Parameter> iterator = p.getParameterList().iterator();
		while(iterator.hasNext()) {
			Parameter parameter = iterator.next();
			if (parameter.getId() == id) {
				return parameter;
			}
			parameter = findParameterRecursively(parameter, id);
			if (parameter != null) {
				return parameter;
			}
		}
		return null;
	}
	
	public void removeModule(int id, Session session) {
		Module module = findModule(id);
		if (module != null && moduleList != null) {
			moduleList.remove(module);
			session.delete(module);
		}
	}
	
	public void removePage(int id, Session session) {
		Page page = findPage(id);
		if (page != null && page.getModule() != null && page.getModule().getPageList() != null) {
			page.getModule().getPageList().remove(page);
			session.delete(page);
		}
	}
	
	public void removeAction(int id, Session session) {
		Action action = findAction(id);
		if (action == null) return;
		Set<Page> pageList = action.getPageList();
		if (pageList == null) return;
		Iterator<Page> iterator = pageList.iterator();
		while (iterator.hasNext()) {
			iterator.next().getActionList().remove(action);
			session.delete(action);
		}
	}
	
	public void removeParameter(int id, Session session) {
		Parameter parameter = findParameter(id, true);
		
		// if parameter == null, it maybe response parameter
		if (parameter == null) {
			parameter = findParameter(id, false);
			
			// if parameter == null still, it must be child parameter of a complex parameter
			if (parameter == null) {
				parameter = findChildParameter(id);
				if (parameter != null && parameter.getComplexParameterList() != null) {
					for (Parameter pComplex : parameter.getComplexParameterList()) {
						pComplex.getParameterList().remove(parameter);
						session.delete(parameter);
					}
				}
				return ;
			}
			Iterator<Action> iterator = parameter.getActionResponseList().iterator();
			while (iterator.hasNext()) {
				iterator.next().getResponseParameterList().remove(parameter);
				session.delete(parameter);
			}
		} else {			
			Iterator<Action> iterator = parameter.getActionRequestList().iterator();
			while (iterator.hasNext()) {
				iterator.next().getRequestParameterList().remove(parameter);
				session.delete(parameter);
			}
		}
	}

	public boolean addMember(User user) {
		// if member added is the creator, ignore
		if (user.getId() == getUser().getId())
			return false;
		// if member already exists, ignore
		boolean exist = false;
		for (User item : getUserList()) {
			if (item.getId() == user.getId()) {
				exist = true;
			}
		}
		if (exist) return false;
		// validation complete, add this user
		getUserList().add(user);
		user.getJoinedProjectList().add(this);
		return true;
	}

	public void removeMember(User user) {
		getUserList().remove(user);
		user.getJoinedProjectList().remove(this);		
	}
	
	public String getLastUpdateStr() {
		PrettyTime p = new PrettyTime(new Locale("zh"));
		return p.format(this.updateTime) + "更新";
	}

    public List<Action> getAllAction() {
        List<Action> list = new ArrayList<Action>();
        for (Module m : this.moduleList) {
            for (Page p : m.getPageList()) {
                for (Action a : p.getActionList()) {
                    list.add(a);
                }
            }
        }
        return list;
    }

    public boolean isUserMember(long userId) {
        if (getUserId() == userId) return true;
        for (User u : getUserList()) {
            if (u.getId() == userId) return true;
        }
        return false;
    }
}

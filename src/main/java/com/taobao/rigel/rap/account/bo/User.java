package com.taobao.rigel.rap.account.bo;

import com.taobao.rigel.rap.project.bo.Project;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class User implements java.io.Serializable {
    private int id;
    private String name;
    private String account;
    private String password;
    private String email;
    private Date createDate;
    private boolean isLockedOut;
    private Date lastLoginDate;
    private int incorrectLoginAttempt;
    private String realname;
    private String empId;
    private int roleId;
    private Set<Role> roleList = new HashSet<Role>();
    private Set<Project> createdProjectList = new HashSet<Project>();
    private Set<Project> joinedProjectList = new HashSet<Project>();
    private boolean isHintEnabled;

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public Map<String, Object> getUserBaseInfo() {
        Map<String, Object> base = new HashMap<String, Object>();
        base.put("name", this.name);
        base.put("id", this.id);
        base.put("email", this.email);
        return base;
    }

    public boolean isAdmin() {
        for (Role role : this.getRoleList()) {
            // roleId = 1, means super admin (god)
            // roleId = 2, means admin
            if (role.getId() >= 1 && role.getId() <= 2) return true;
        }
        return false;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<Role> getRoleList() {
        return this.roleList;
    }

    public void setRoleList(Set<Role> roleList) {
        this.roleList = roleList;
    }

    public boolean isUserInRole(String roleName) {
        for (Role r : getRoleList()) {
            if (r.getName().equals(roleName)) {
                return true;
            }
        }
        return false;
    }

    public String getRoleListStr() {
        String str = "";
        for (Role r : getRoleList()) {
            str += r.getName() + ",";
        }
        return str;
    }

    public List<Project> getAccessibleProjectList() {
        List<Project> projectList = new ArrayList<Project>();
        for (Project p : getCreatedProjectList()) {
            p.setIsManagable(true);
            projectList.add(p);
        }
        for (Project p : getJoinedProjectList()) {
            projectList.add(p);
        }
        return projectList;
    }

    public boolean haveAccessOfProject(int projectId) {
        if (isUserInRole("admin")) {
            return true;
        }
        for (Project p : getCreatedProjectList()) {
            if (p.getId() == projectId) {
                return true;
            }
        }

        for (Project p : getJoinedProjectList()) {
            if (p.getId() == projectId) {
                return true;
            }
        }
        return false;
    }

    public Set<Project> getCreatedProjectList() {
        return this.createdProjectList;
    }

    public void setCreatedProjectList(Set<Project> createdProjectList) {
        this.createdProjectList = createdProjectList;
    }

    public Set<Project> getJoinedProjectList() {
        return this.joinedProjectList;
    }

    public void setJoinedProjectList(Set<Project> joinedProjectList) {
        this.joinedProjectList = joinedProjectList;
    }

    public String getAccount() {
        return this.account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateDateStr() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(getCreateDate());
    }

    public boolean getIsLockedOut() {
        return this.isLockedOut;
    }

    public void setIsLockedOut(boolean isLockedOut) {
        this.isLockedOut = isLockedOut;
    }

    public Date getLastLoginDate() {
        return this.lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getLastLoginDateStr() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(getLastLoginDate());
    }

    public int getIncorrectLoginAttempt() {
        return this.incorrectLoginAttempt;
    }

    public void setIncorrectLoginAttempt(int incorrectLoginAttempt) {
        this.incorrectLoginAttempt = incorrectLoginAttempt;
    }

    public void addCreatedProject(Project project) {
        project.setUser(this);
        this.createdProjectList.add(project);
    }

    public boolean getIsHintEnabled() {
        return isHintEnabled;
    }

    public void setIsHintEnabled(boolean isHintEnabled) {
        this.isHintEnabled = isHintEnabled;
    }

    public String toString() {
        return "{\"name\":\"" + this.name + "\",\"id\":" + this.id + "}";
    }

    public String getWorkRole() {
        for (Role r : getRoleList()) {
            if (r.getName().length() == 2) {
                return r.getName().toUpperCase();
            }
        }
        return "";
    }

    public String getRealname() {
        return this.realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}

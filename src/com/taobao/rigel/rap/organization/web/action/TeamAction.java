package com.taobao.rigel.rap.organization.web.action;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.common.SystemConstant;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Bosn on 15/10/14.
 */
public class TeamAction extends ActionBase {

    private int id;
    private String name;
    private String accountList;
    private long teamListNum;
    private List<User> userList;
    private int userId;
    private static final org.apache.logging.log4j.Logger logger = org.apache.logging.log4j.LogManager.getFormatterLogger(TeamAction.class.getName());

    public Corporation getTeam() {
        return team;
    }

    private Corporation team;

    public int getPageNum() {
        if (pageNum > 0)
            return pageNum;
        else
            return 1;
    }

    private int pageNum;

    public List<Corporation> getTeamList() {
        return teamList;
    }

    private List<Corporation> teamList;

    public short getAccessType() {
        return accessType;
    }

    public void setAccessType(short accessType) {
        this.accessType = accessType;
    }

    private short accessType;
    private OrganizationMgr organizationMgr;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    private String desc;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            name = "unnamed";
        }

        this.name = StringUtils.removeIllegalCharacters(name);
        this.name = name;
    }

    public String getAccountList() {
        return accountList;
    }

    public void setAccountList(String accountList) {
        this.accountList = accountList;
    }


    public String create() {
        Corporation team = new Corporation();
        team.setName(getName());
        team.setUserId(getCurUserId());
        team.setAccountList(Arrays.asList(getAccountList().split(",")));
        team.setDesc(getDesc());
        team.setAccessType(getAccessType());
        team.setLogoUrl("");
        int id = organizationMgr.addTeam(team);
        setJson("{\"id\":" + id + "}");
        return SUCCESS;
    }

    public String teams() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/org/team/teams.do");
            return LOGIN;
        }
        long userId = getCurUserId();
        teamList = organizationMgr.getCorporationListWithPager(userId, getPageNum(), SystemConstant.DEFAULT_PAGE_SIZE);
        teamListNum = organizationMgr.getCorporationListWithPagerNum(userId);
        return SUCCESS;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public long getTeamListNum() {
        return teamListNum;
    }

    public long getTeamListPageInTotal() {
        double result = Math.ceil((double)teamListNum / (double)SystemConstant.DEFAULT_PAGE_SIZE);
        return (long) result;
    }

    public String manage() {
        int corpId = getId();
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/org/team/manage.do?id=" + corpId);
            return LOGIN;
        }
        if (!organizationMgr.canUserManageCorp(getCurUserId(), corpId)) {
            setErrMsg("你无权访问该页面。");
            return ERROR;
        }

        userList = organizationMgr.getUserLisOfCorp(corpId);
        team = organizationMgr.getCorporation(corpId);

        return SUCCESS;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<User> getUserList() {
        return userList;
    }

    public String changeAccessType() {
        User curUser = getCurUser();
        if (curUser == null) {
            setErrMsg(LOGIN_WARN_MSG);
            setIsOk(false);
            logger.error("Unlogined user trying to checkin and failed.");
            return JSON_ERROR;
        }
        if (organizationMgr.setUserRoleInCorp(getCurUserId(), getUserId(), getId(), getAccessType())) {
            return SUCCESS;
        } else {
            return "json-error";
        }
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String deleteMember() {
        User curUser = getCurUser();
        if (curUser == null) {
            setErrMsg(LOGIN_WARN_MSG);
            setIsOk(false);
            logger.error("Unlogined user trying to checkin and failed.");
            return JSON_ERROR;
        }
        if (organizationMgr.removeMemberFromCorp(getCurUserId(), getUserId(), getId())) {
            return SUCCESS;
        } else {
            return "json-error";
        }
    }

    public String addMembers() {
        User curUser = getCurUser();
        if (curUser == null) {
            setErrMsg(LOGIN_WARN_MSG);
            setIsOk(false);
            logger.error("Unlogined user trying to checkin and failed.");
            return JSON_ERROR;
        }

        if (organizationMgr.addTeamMembers(getCurUserId(), getId(), accountList)) {
            return SUCCESS;
        } else {
            return "json-error";
        }
    }

    public String update() {
        User curUser = getCurUser();
        if (curUser == null) {
            setErrMsg(LOGIN_WARN_MSG);
            setIsOk(false);
            logger.error("Unlogined user trying to checkin and failed.");
            return JSON_ERROR;
        }

        if (!organizationMgr.canUserManageCorp(curUser.getId(), getId())) {
            return JSON_ERROR;
        }

        Corporation c = new Corporation();
        c.setId(getId());
        c.setName(getName());
        c.setDesc(getDesc());
        c.setAccessType(getAccessType());
        organizationMgr.updateCorporation(c);

        return SUCCESS;
    }
}

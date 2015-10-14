package com.taobao.rigel.rap.organization.web.action;

import com.sun.tools.javac.util.List;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;

/**
 * Created by Bosn on 15/10/14.
 */
public class TeamAction extends ActionBase {
    private String name;
    private String accountList;
    private short typeId;
    private int userId;
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
        this.name = name;
    }

    public String getAccountList() {
        return accountList;
    }

    public void setAccountList(String accountList) {
        this.accountList = accountList;
    }

    public short getTypeId() {
        return typeId;
    }

    public void setTypeId(short typeId) {
        this.typeId = typeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String create() {
        Corporation team = new Corporation();
        team.setUserId(getCurUserId());
        team.setAccountList(List.from(accountList.split(",")));
        team.setDesc(desc);
        team.setTypeId(typeId);
        organizationMgr.addTeam(team);
        return SUCCESS;
    }
}

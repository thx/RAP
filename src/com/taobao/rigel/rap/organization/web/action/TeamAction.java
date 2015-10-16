package com.taobao.rigel.rap.organization.web.action;

import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;

import java.util.Arrays;

/**
 * Created by Bosn on 15/10/14.
 */
public class TeamAction extends ActionBase {

    private String name;
    private String accountList;

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
        team.setName(name);
        team.setUserId(getCurUserId());
        team.setAccountList(Arrays.asList(accountList.split(",")));
        team.setDesc(desc);
        team.setAccessType(accessType);
        team.setLogoUrl("");
        organizationMgr.addTeam(team);
        return SUCCESS;
    }
}

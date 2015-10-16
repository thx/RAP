package com.taobao.rigel.rap.organization.bo;

import java.util.List;

public class Corporation {
	private int id;
	private String logoUrl;
	private long userId;
	private String name;
    private List<String> accountList;

    public List<String> getAccountList() {
        return accountList;
    }

    public void setAccountList(List<String> accountList) {
        this.accountList = accountList;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    private String desc;

    public short getAccessType() {
        return accessType;
    }

    public void setAccessType(short accessType) {
        this.accessType = accessType;
    }

    private short accessType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

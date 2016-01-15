package com.taobao.rigel.rap.organization.bo;

import com.taobao.rigel.rap.common.utils.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Corporation {
    public static final int PUBLIC_ACCESS = 20;
    public static final int PRIVATE_ACCESS = 10;
    public final int NAME_STR_MAX_LENGTH = 20;
    private int id;
    private String logoUrl;
    private int userId;
    private String name;
    private List<String> accountList;
    private long memberNum;
    private String creatorName;
    private String desc;
    private short accessType;
    private boolean hasAccess;

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

    public short getAccessType() {
        return accessType;
    }

    public void setAccessType(short accessType) {
        if (accessType == 10 || accessType == 20) {
            this.accessType = accessType;
        } else {
            this.accessType = 10; // DEFAULT is private
        }
    }

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameStr() {
        if (StringUtils.getLengthOfStringChinese(name) > NAME_STR_MAX_LENGTH) {
            return StringUtils.subStringChinese(name, 0, NAME_STR_MAX_LENGTH) + "..";
        }
        return name;
    }

    public long getMemberNum() {
        return memberNum;
    }

    public void setMemberNum(long memberNum) {
        this.memberNum = memberNum;
    }

    public boolean isHasAccess() {
        return hasAccess;
    }

    public void setHasAccess(boolean hasAccess) {
        this.hasAccess = hasAccess;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public boolean isPublic() {
        return this.accessType == PUBLIC_ACCESS;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("id", getId());
        map.put("nameStr", getNameStr());
        map.put("accessType", getAccessType());
        map.put("name", getName());

        return map;
    }
}

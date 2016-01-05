package com.taobao.rigel.rap.organization.bo;

import com.taobao.rigel.rap.common.EntityInterface;
import com.taobao.rigel.rap.common.StringUtils;

import java.util.List;

public class Corporation implements EntityInterface{
    public static final int PUBLIC_ACCESS = 20;
    public static final int PRIVATE_ACCESS = 10;
    public final int NAME_STR_MAX_LENGTH = 20;
    private long id;
    private String logoUrl;
    private long userId;
    private String name;
    private List<String> accountList;
    private long memberNum;
    private String creatorName;
    private String desc;
    private short accessType;
    private boolean hasAccess;

    @Override
    public int hashCode() {
        return new Long(id).hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof EntityInterface))
            return false;
        if (o == this)
            return true;
        EntityInterface obj = (EntityInterface)o;
        return obj.getId() == this.id;
    }

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
}

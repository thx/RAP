package com.taobao.rigel.rap.organization.bo;


import com.taobao.rigel.rap.common.base.EntityInterface;

public class ProductionLine implements EntityInterface{
    private long id;
    private String name;
    private int projectNum;
    private int corporationId;
    private int userId;

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProjectNum() {
        return projectNum;
    }

    public void setProjectNum(int projectNum) {
        this.projectNum = projectNum;
    }

    public int getCorporationId() {
        return corporationId;
    }

    public void setCorporationId(int corporationId) {
        this.corporationId = corporationId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

package com.taobao.rigel.rap.organization.bo;

import com.taobao.rigel.rap.common.EntityInterface;

public class Group implements  EntityInterface{
    private long id;
    private String name;
    private int productionLineId;
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

    public int getProductionLineId() {
        return productionLineId;
    }

    public void setProductionLineId(int productionLineId) {
        this.productionLineId = productionLineId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

package com.taobao.rigel.rap.account.bo;

import com.taobao.rigel.rap.common.base.EntityInterface;

public class Role implements java.io.Serializable, EntityInterface {

    private long id;
    private String name;

    @Override
    public int hashCode() {
        return new Long(id).hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Role))
            return false;
        if (o == this)
            return true;
        Role obj = (Role)o;
        return obj.getId() == this.id;
    }


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

package com.taobao.rigel.rap.project.bo;

public class ObjectItem implements java.io.Serializable {

    public String className;
    private int id;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

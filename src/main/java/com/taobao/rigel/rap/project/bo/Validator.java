package com.taobao.rigel.rap.project.bo;

public class Validator implements java.io.Serializable {

    private int id;
    private int type;
    private String rule;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getType() {
        return this.type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getRule() {
        return this.rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }
}

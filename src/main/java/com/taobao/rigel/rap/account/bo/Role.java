package com.taobao.rigel.rap.account.bo;

public class Role implements java.io.Serializable {

    private int id;
    private String name;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static final int SUPER_ADMIN = 1;

    public static final int ADMIN = 2;

    public static final int USER = 3;

    public static boolean isAdmin(int roleId) {
        return roleId == ADMIN || roleId == SUPER_ADMIN;
    }

}

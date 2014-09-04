package com.taobao.rigel.rap.common;

/**
 * Created by mashengbo on 14-9-4.
 */
public class Item {
    private String key;
    private String value;

    public Item() {

    }

    public Item(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}

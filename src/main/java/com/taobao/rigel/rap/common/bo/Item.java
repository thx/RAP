package com.taobao.rigel.rap.common.bo;

/**
 * Created by mashengbo on 14-9-4.
 */
public class Item {
    private String key;
    private String value;
    private String title;

    public Item() {

    }

    public Item(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public Item(String key, String value, String title) {
        this.key = key;
        this.value = value;
        this.title = title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

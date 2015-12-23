package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class PageComparator implements Comparator<Page> {

    public int compare(Page o1, Page o2) {
        return o1.getId() < o2.getId() ? 0 : 1;
    }

}

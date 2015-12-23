package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class ModuleComparator implements Comparator<Module> {

    public int compare(Module o1, Module o2) {
        return o1.getId() < o2.getId() ? 0 : 1;
    }

}

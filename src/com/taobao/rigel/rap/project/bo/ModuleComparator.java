package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class ModuleComparator implements Comparator<Module>{

	@Override
	public int compare(Module o1, Module o2) {
		Module l = (Module) o1;
		Module r = (Module) o2;
		return l.getId() < r.getId() ? 0 : 1;
	}

}

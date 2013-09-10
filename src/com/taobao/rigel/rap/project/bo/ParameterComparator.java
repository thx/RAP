package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class ParameterComparator implements Comparator<Parameter> {

	@Override
	public int compare(Parameter o1, Parameter o2) {
		Parameter l = (Parameter) o1;
		Parameter r = (Parameter) o2;
		return l.getId() < r.getId() ? 0 : 1;
	}

}

package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class ActionComparator implements Comparator<Action>{

	@Override
	public int compare(Action o1, Action o2) {
		Action l = (Action) o1;
		Action r = (Action) o2;
		return l.getId() < r.getId() ? 0 : 1;
	}

}

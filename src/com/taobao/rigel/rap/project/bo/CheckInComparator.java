package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

import com.taobao.rigel.rap.workspace.bo.CheckIn;

public class CheckInComparator implements Comparator<CheckIn>{

	@Override
	public int compare(CheckIn o1, CheckIn o2) {
		CheckIn l = (CheckIn) o1;
		CheckIn r = (CheckIn) o2;
		return l.getId() > r.getId() ? 0 : 1;
	}

}

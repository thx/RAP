package com.taobao.rigel.rap.project.bo;

import java.util.Comparator;

public class PageComparator implements Comparator<Page>{

	@Override
	public int compare(Page o1, Page o2) {
		Page l = (Page) o1;
		Page r = (Page) o2;
		return l.getId() < r.getId() ? 0 : 1;
	}

}

package com.taobao.rigel.rap.common;

public class Pager {
	private int curPagerNum;
	
	public int getCurPagerNum() {
		return curPagerNum;
	}
	
	public void setCurPagerNum(int curPagerNum) {
		this.curPagerNum = curPagerNum;
	}
	
	private int pagerSize;
	
	public int getPagerSize() {
		return pagerSize;
	}
	
	public void setPagerSize(int pagerSize) {
		this.pagerSize = pagerSize;
	}
	
	private long totalRecNum;
	
	public long getTotalRecNum() {
		return totalRecNum;
	}
	
	public void setTotalRecNum(long totalRecNum) {
		this.totalRecNum = totalRecNum;
	}
}

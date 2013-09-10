package com.taobao.rigel.rap.project.bo;

public class ObjectItem implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	public String className;
	
	public String getClassName() {
		return className;
	}
	
	public void setClassName(String className) {
		this.className = className;
	}
	
	private int id;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
}

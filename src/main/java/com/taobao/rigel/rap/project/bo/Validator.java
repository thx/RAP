package com.taobao.rigel.rap.project.bo;

public class Validator implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int id;
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	private int type;
	
	public int getType() {
		return this.type;
	}
	
	public void setType(int type) {
		this.type = type;
	}
	
	private String rule;
	
	public String getRule() {
		return this.rule;
	}
	
	public void setRule(String rule) {
		this.rule = rule;
	}
}

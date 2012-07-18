package com.baidu.rigel.rap.mock.service;

public interface MockMgr {
	/**
	 * automatically generate testing data
	 * 
	 * @param projectId
	 * @param pattern
	 * @return JSON String
	 */
	public String generateData(int projectId, String pattern);
}

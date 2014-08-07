package com.taobao.rigel.rap.api.service;

public interface OpenAPIMgr {

	/**
	 * get model JSON text
	 * 
	 * @param projectId
	 * @return
	 * @throws Exception 
	 */
	String getModelJSON(int projectId) throws Exception;
	
	/**
	 * get JSON Schema text of action
	 * 
	 * @param actionId
	 * @return
	 */
	String getActionJSONSchema(int actionId);
	
}

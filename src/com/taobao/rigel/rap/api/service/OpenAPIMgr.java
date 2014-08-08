package com.taobao.rigel.rap.api.service;

import com.taobao.rigel.rap.project.bo.Action;

public interface OpenAPIMgr {

	/**
	 * get model JSON text
	 * 
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	Object getModel(int projectId) throws Exception;

	/**
	 * get JSON Schema text of action
	 * 
	 * @param actionId
	 * @param type
	 * @return
	 */
	Object getSchema(int actionId, Action.TYPE type);

}

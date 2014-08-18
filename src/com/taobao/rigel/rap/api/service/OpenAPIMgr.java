package com.taobao.rigel.rap.api.service;

import com.taobao.rigel.rap.project.bo.Action;

public interface OpenAPIMgr {

	/**
	 * get model JSON text
	 * 
	 * @param projectId
     * @param ver optional
	 * @return
	 * @throws Exception
	 */
	Object getModel(int projectId, String ver) throws Exception;

	/**
	 * get JSON Schema text of action
	 * 
	 * @param actionId
	 * @param type
     * @param ver optional
	 * @return
	 */
	Object getSchema(int actionId, Action.TYPE type, String ver, int projectId);

}

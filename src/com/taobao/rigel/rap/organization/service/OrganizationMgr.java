package com.taobao.rigel.rap.organization.service;

import java.util.List;

import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;

public interface OrganizationMgr {
	/**
	 * get corporation list
	 * @return
	 */
	List<Corporation> getCorporationList();
	
	/**
	 * get group list
	 * 
	 * @return
	 */
	List<Group> getGroupList();

	/**
	 * get production line list
	 * 
	 * @return
	 */
	List<ProductionLine> getProductionLineList();

	/**
	 * add group
	 * 
	 * @param group
	 */
	void addGroup(Group group);

	/**
	 * add production line
	 * 
	 * @param productionLine
	 */
	void addProductionList(ProductionLine productionLine);

	/**
	 * remove group
	 * 
	 * @param groupId
	 */
	void removeGroup(int groupId);

	/**
	 * remove production line
	 * 
	 * @param productionLineId
	 */
	void removeProductionLine(int productionLineId);

	/**
	 * update group
	 * 
	 * @param group
	 */
	void updateGroup(Group group);

	/**
	 * update production line
	 * 
	 * @param productionLine
	 */
	void updateProductionLine(ProductionLine productionLine);

}

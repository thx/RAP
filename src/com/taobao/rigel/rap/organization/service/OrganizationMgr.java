package com.taobao.rigel.rap.organization.service;

import java.util.List;

import com.taobao.rigel.rap.common.RapError;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;

public interface OrganizationMgr {
	/**
	 * get corporation list
	 * 
	 * @return
	 */
	List<Corporation> getCorporationList();

    /**
     * get corporation list
     *
     * @return
     */
    List<Corporation> getCorporationListWithPager(int pageNum, int pageSize);

    /**
     * get corporation list of user
     *
     * @param userId
     * @return
     */
    List<Corporation> getCorporationListWithPage(int userId, int pageNum, int pageSize);

	/**
	 * get group list
	 * 
	 * @return
	 */
	List<Group> getGroupList(int productionLineId);

	/**
	 * get production line list
	 * 
	 * @return
	 */
	List<ProductionLine> getProductionLineList(int corpId);

	/**
	 * add group
	 * 
	 * @param group
	 */
	int addGroup(Group group);

	/**
	 * add production line
	 * 
	 * @param productionLine
	 */
	int addProductionLine(ProductionLine productionLine);

	/**
	 * remove group
	 * 
	 * @param groupId
	 */
	RapError removeGroup(int groupId);

	/**
	 * remove production line
	 * 
	 * @param productionLineId
	 */
	RapError removeProductionLine(int productionLineId);

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

	/**
	 * get production line
	 * 
	 * @param plid
	 * @return
	 */
	ProductionLine getProductionLine(int plid);
	
	/**
	 * get corporation
	 * 
	 * @param id
	 * @return
	 */
	Corporation getCorporation(int id);


    /**
     * can user access corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserAccessCorp(int userId, int corpId);

    /**
     * can user manage corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserManageCorp(int userId, int corpId);

    /**
     * can user access project
     *
     * @param userId
     * @param projectId
     * @return
     */
    boolean canUserAccessProject(int userId, int projectId);

    /**
     * can user access page
     *
     * @param userId
     * @param pageId
     * @return
     */
    boolean canUserAccessPage(int userId, int pageId);

    /**
     * add new team
     *
     * @param team
     * @return id
     */
    int addTeam(Corporation team);

}

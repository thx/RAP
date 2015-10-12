package com.taobao.rigel.rap.organization.dao;

import java.util.List;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;

public interface OrganizationDao {
	/**
	 * get corporation list
	 * 
	 * @return
	 */
	List<Corporation> getCorporationList();

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
	int addProductionList(ProductionLine productionLine);

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

	/**
	 * get group
	 * 
	 * @param id
	 * @return
	 */
	Group getGroup(int id);

	/**
	 * get production line
	 * 
	 * @param id
	 * @return
	 */
	ProductionLine getProductionLine(int id);

	/**
	 * get corporation
	 * 
	 * @param id
	 * @return
	 */
	Corporation getCorporation(int id);

	/**
	 * update ProductionLine.projectNum
	 * 
	 * @param productionLineId
	 */
    void updateCountersInProductionLine(int productionLineId);

    /**
     * get user list of corporation
     *
     * @param corpId
     * @return
     */
    List<User> getUserLisOfCorp(int corpId);


    /**
     * add a user to corporation
     *
     * @param corpId
     * @param userId
     * @param roleId
     */
    void addUserToCorp(int corpId, int userId, int roleId);

    /**
     * check if user in corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean isUserInCorp(int userId, int corpId);

    /**
     * get user role in corporation
     *
     * @param userId
     * @param corpId
     * @return roleId
     */
    int getUserRoleInCorp(int userId, int corpId);
}

package com.taobao.rigel.rap.organization.service;

import java.util.List;

import com.taobao.rigel.rap.account.bo.User;
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
     * get corporation list
     *
     * @return
     */
    long getCorporationListWithPagerNum ();

    /**
     * get corporation list of user
     *
     * @param userId
     * @return
     */
    List<Corporation> getCorporationListWithPager(long userId, int pageNum, int pageSize);

    /**
     * get corporation list of user num
     *
     * @param userId
     * @return
     */
    long getCorporationListWithPagerNum(long userId);

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
    boolean canUserAccessCorp(long userId, int corpId);

    /**
     * can user manage corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserManageCorp(long userId, int corpId);

    /**
     * get user list of corporation
     *
     * @param corpId
     * @return
     */
    List<User> getUserLisOfCorp(int corpId);

    /**
     * get user role in corporation

     * @param userId
     * @param corpId
     * @return roleId
     */
    int getUserRoleInCorp(long userId, int corpId);

    /**
     * can user access project
     *
     * @param userId
     * @param projectId
     * @return
     */
    boolean canUserAccessProject(long userId, int projectId);

    /**
     * can user access page
     *
     * @param userId
     * @param pageId
     * @return
     */
    boolean canUserAccessPage(long userId, int pageId);

    /**
     * add new team
     *
     * @param team
     * @return id
     */
    int addTeam(Corporation team);

    /**
     * set user role in corporation
     *
     * @param curUserId user now proceeding the operation
     * @param userId user to be processed
     * @param corpId
     * @param roleId
     * @return if succeed
     */
    boolean setUserRoleInCorp(long curUserId, long userId, int corpId, int roleId);

    /**
     * remove member from team
     *
     * @param curUserId
     * @param userId
     * @param corpId
     * @return
     */
    boolean removeMemberFromCorp(long curUserId, long userId, int corpId);

    /**
     * add team members
     *
     * @param curUserId
     * @param corpId
     * @param accountList
     * @return
     */
    boolean addTeamMembers(long curUserId, int corpId, String accountList);

    /**
     * update corporation
     *
     * @param c
     */
    void updateCorporation(Corporation c);
}

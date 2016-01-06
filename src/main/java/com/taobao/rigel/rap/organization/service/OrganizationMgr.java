package com.taobao.rigel.rap.organization.service;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.bo.RapError;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;

import java.util.List;

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
    long getCorporationListWithPagerNum();

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
     * @param productionLineId
     */
    List<Group> getGroupList(long productionLineId);

    /**
     * get production line list
     *
     * @return
     * @param corpId
     */
    List<ProductionLine> getProductionLineList(long corpId);

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
    ProductionLine getProductionLine(long plid);

    /**
     * get corporation
     *
     * @param id
     * @return
     */
    Corporation getCorporation(long id);


    /**
     * can user access corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserAccessCorp(long userId, long corpId);

    /**
     * can user manage corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserManageCorp(long userId, long corpId);

    /**
     * get user list of corporation
     *
     * @param corpId
     * @return
     */
    List<User> getUserLisOfCorp(long corpId);

    /**
     * get user role in corporation
     *
     * @param userId
     * @param corpId
     * @return roleId
     */
    int getUserRoleInCorp(long userId, long corpId);

    /**
     * can user access project
     *
     * @param userId
     * @param projectId
     * @return
     */
    boolean canUserAccessProject(long userId, long projectId);

    /**
     * can user access page
     *
     * @param userId
     * @param pageId
     * @return
     */
    boolean canUserAccessPage(long userId, long pageId);


    /**
     * can user access production line
     *
     * @param userId
     * @param plId
     * @return
     */
    boolean canUserAccessProductionLine(long userId, long plId);

    /**
     * can user manage production line
     *
     * @param userId
     * @param plId
     * @return
     */
    boolean canUserManageProductionLine(long userId, long plId);

    /**
     * can user access group
     *
     * @param userId
     * @param groupId
     * @return
     */
    boolean canUserAccessGroup(long userId, long groupId);

    /**
     * can user manage grup
     *
     * @param userId
     * @param groupId
     * @return
     */
    boolean canUserManageGroup(long userId, long groupId);

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
     * @param userId    user to be processed
     * @param corpId
     * @param roleId
     * @return if succeed
     */
    boolean setUserRoleInCorp(long curUserId, long userId, long corpId, long roleId);

    /**
     * remove member from team
     *
     * @param curUserId
     * @param userId
     * @param corpId
     * @return
     */
    boolean removeMemberFromCorp(long curUserId, long userId, long corpId);

    /**
     * add team members
     *
     * @param curUserId
     * @param corpId
     * @param accountList
     * @return
     */
    boolean addTeamMembers(long curUserId, long corpId, String accountList);

    /**
     * update corporation
     *
     * @param c
     */
    void updateCorporation(Corporation c);
}

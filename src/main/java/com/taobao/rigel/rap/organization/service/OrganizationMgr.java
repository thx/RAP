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
    int getCorporationListWithPagerNum();

    /**
     * get corporation list of user
     *
     * @param userId
     * @return
     */
    List<Corporation> getCorporationListWithPager(int userId, int pageNum, int pageSize);

    /**
     * get corporation list of user num
     *
     * @param userId
     * @return
     */
    int getCorporationListWithPagerNum(int userId);

    /**
     * get group list
     *
     * @return
     * @param productionLineId
     */
    List<Group> getGroupList(int productionLineId);

    /**
     * get production line list
     *
     * @return
     * @param corpId
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
     * user access validation
     *
     * @param userId
     * @param projectId
     * @return
     */
    boolean canUserManageProject(int userId, int projectId);


    /**
     * can user delete project
     *
     * @param userId
     * @param projectId
     * @return
     */
    boolean canUserDeleteProject(int userId, int projectId);

    /**
     * can user manage corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean canUserManageCorp(int userId, int corpId);

    /**
     * get user list of corporation
     *
     * @param corpId
     * @return
     */
    List<User> getUserLisOfCorp(int corpId);

    /**
     * get user role in corporation
     *
     * @param userId
     * @param corpId
     * @return roleId
     */
    int getUserRoleInCorp(int userId, int corpId);

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
     * can user access production line
     *
     * @param userId
     * @param plId
     * @return
     */
    boolean canUserAccessProductionLine(int userId, int plId);

    /**
     * can user manage production line
     *
     * @param userId
     * @param plId
     * @return
     */
    boolean canUserManageProductionLine(int userId, int plId);

    /**
     * can user access group
     *
     * @param userId
     * @param groupId
     * @return
     */
    boolean canUserAccessGroup(int userId, int groupId);

    /**
     * can user manage grup
     *
     * @param userId
     * @param groupId
     * @return
     */
    boolean canUserManageGroup(int userId, int groupId);

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
    boolean setUserRoleInCorp(int curUserId, int userId, int corpId, int roleId);

    /**
     * remove member from team
     *
     * @param curUserId
     * @param userId
     * @param corpId
     * @return
     */
    boolean removeMemberFromCorp(int curUserId, int userId, int corpId);

    /**
     * add team members
     *
     * @param curUserId
     * @param corpId
     * @param accountList
     * @return
     */
    boolean addTeamMembers(int curUserId, int corpId, String accountList);

    /**
     * update corporation
     *
     * @param c
     */
    void updateCorporation(Corporation c);

}

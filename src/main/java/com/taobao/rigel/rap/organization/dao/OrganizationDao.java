package com.taobao.rigel.rap.organization.dao;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;

import java.util.List;

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
    List<Group> getGroupList(long productionLineId);

    /**
     * get production line list
     *
     * @return
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
    void removeGroup(long groupId);

    /**
     * remove production line
     *
     * @param productionLineId
     */
    void removeProductionLine(long productionLineId);

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
    Group getGroup(long id);

    /**
     * get production line
     *
     * @param id
     * @return
     */
    ProductionLine getProductionLine(long id);

    /**
     * get corporation
     *
     * @param id
     * @return
     */
    Corporation getCorporation(long id);

    /**
     * update ProductionLine.projectNum
     *
     * @param productionLineId
     */
    void updateCountersInProductionLine(long productionLineId);

    /**
     * get user list of corporation
     *
     * @param corpId
     * @return
     */
    List<User> getUserLisOfCorp(long corpId);


    /**
     * add a user to corporation
     *
     * @param corpId
     * @param userId
     * @param roleId
     */
    void addUserToCorp(long corpId, long userId, long roleId);

    /**
     * check if user in corporation
     *
     * @param userId
     * @param corpId
     * @return
     */
    boolean isUserInCorp(long userId, long corpId);

    /**
     * get user role in corporation
     *
     * @param userId
     * @param corpId
     * @return roleId
     */
    int getUserRoleInCorp(long userId, long corpId);

    /**
     * set user role in corporation
     *
     * @param userId
     * @param corpId
     * @param roleId
     */
    void setUserRoleInCorp(long userId, long corpId, long roleId);

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
     * add new corporation
     *
     * @param corporation
     */
    int addCorporation(Corporation corporation);

    /**
     * get number of member in specific corporation
     *
     * @param corpId
     * @return
     */
    long getMemberNumOfCorporation(long corpId);

    /**
     * delete all membership from team
     *
     * @param curUserId the user now operating, used for transfer project
     *                  when the project operated are owned by the user removed.
     * @param userId
     * @param corpId
     */
    void deleteMembershipFromCorp(long curUserId, long userId, long corpId);

    /**
     * update corporation
     *
     * @param c
     */
    void updateCorporation(Corporation c);

    /**
     * get team id by project id
     *
     * @param id
     * @return
     */
    int getTeamIdByProjectId(long id);
}

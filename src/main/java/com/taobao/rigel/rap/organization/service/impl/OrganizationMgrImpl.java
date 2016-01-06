package com.taobao.rigel.rap.organization.service.impl;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.bo.RapError;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

import java.util.List;

public class OrganizationMgrImpl implements OrganizationMgr {
    private OrganizationDao organizationDao;
    private ProjectMgr projectMgr;
    private AccountMgr accountMgr;

    public AccountMgr getAccountMgr() {
        return accountMgr;
    }

    public void setAccountMgr(AccountMgr accountMgr) {
        this.accountMgr = accountMgr;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public OrganizationDao getOrganizationDao() {
        return organizationDao;
    }

    public void setOrganizationDao(OrganizationDao organizationDao) {
        this.organizationDao = organizationDao;
    }


    public List<Corporation> getCorporationList() {
        return organizationDao.getCorporationList();
    }


    public List<Corporation> getCorporationListWithPager(int pageNum, int pageSize) {
        List<Corporation> cache = CacheUtils.getTeamCache(0L, pageNum, pageSize);
        if(cache != null) {
            return cache;
        }

        List<Corporation> list = organizationDao.getCorporationListWithPager(pageNum, pageSize);

        for (Corporation c : list) {
            long memberNum = organizationDao.getMemberNumOfCorporation(c.getId());
            c.setMemberNum(memberNum + 1); // +1 project creator
            c.setHasAccess(true);
            c.setCreatorName(accountMgr.getUser(c.getUserId()).getName());
        }
        CacheUtils.setTeamCache(0L, pageNum, pageSize, list);
        return list;
    }


    public long getCorporationListWithPagerNum() {
        return organizationDao.getCorporationListWithPagerNum();
    }


    public List<Corporation> getCorporationListWithPager(long userId, int pageNum, int pageSize) {
        List<Corporation> cache = CacheUtils.getTeamCache(userId, pageNum, pageSize);
        if(cache != null) {
            return cache;
        }

        User user = accountMgr.getUser(userId);
        if (user.isAdmin()) {
            return getCorporationListWithPager(pageNum, pageSize);
        }
        List<Corporation> list = organizationDao.getCorporationListWithPager(userId, pageNum, pageSize);
        for (Corporation c : list) {
            long memberNum = organizationDao.getMemberNumOfCorporation(c.getId());
            c.setMemberNum(memberNum + 1); // +1 project creator
            c.setHasAccess(canUserManageCorp(userId, c.getId()));
            c.setCreatorName(accountMgr.getUser(c.getUserId()).getName());
        }
        CacheUtils.setTeamCache(userId, pageNum, pageSize, list);
        return list;
    }


    public long getCorporationListWithPagerNum(long userId) {
        User user = accountMgr.getUser(userId);
        if (user.isAdmin()) {
            return getCorporationListWithPagerNum();
        }
        return organizationDao.getCorporationListWithPagerNum(userId);
    }


    public List<Group> getGroupList(long productionLineId) {
        return organizationDao.getGroupList(productionLineId);
    }


    public List<ProductionLine> getProductionLineList(long corpId) {
        return organizationDao.getProductionLineList(corpId);
    }


    public int addGroup(Group group) {
        return organizationDao.addGroup(group);
    }


    public int addProductionLine(ProductionLine productionLine) {
        return organizationDao.addProductionLine(productionLine);
    }


    public RapError removeGroup(int groupId) {
        if (!groupCanBeDeleted(groupId)) {
            return new RapError(RapError.ERR_HAS_CHILDREN,
                    "为确保您的数据安全，请先删除分组下的项目，再删除该分组。");
        } else {
            organizationDao.removeGroup(groupId);
            return new RapError();
        }
    }

    private boolean groupCanBeDeleted(int groupId) {
        List<Project> list = projectMgr.getProjectListByGroup(groupId);

        return list == null || list.size() == 0;
    }


    public RapError removeProductionLine(int productionLineId) {
        if (!productionLineCanBeDeleted(productionLineId)) {
            return new RapError(RapError.ERR_HAS_CHILDREN,
                    "为确保您的数据安全，请先删除业务线下的分组及项目，再删除该业务线。");
        } else {
            organizationDao.removeProductionLine(productionLineId);
            return new RapError();
        }
    }

    private boolean productionLineCanBeDeleted(int productionLineId) {
        List<Group> list = this.getGroupList(productionLineId);
        return list == null || list.size() == 0;
    }


    public void updateGroup(Group group) {
        organizationDao.updateGroup(group);
    }


    public void updateProductionLine(ProductionLine productionLine) {
        organizationDao.updateProductionLine(productionLine);
    }


    public ProductionLine getProductionLine(long plid) {
        return organizationDao.getProductionLine(plid);
    }


    public Corporation getCorporation(long id) {
        return organizationDao.getCorporation(id);
    }


    public boolean canUserAccessCorp(long userId, long corpId) {
        Corporation c = getCorporation(corpId);
        if (c == null) return false;
        if (c.getUserId() == userId) return true;  // team owner
        if (c.getAccessType() == Corporation.PUBLIC_ACCESS) return true; // public team
        User user = accountMgr.getUser(userId);
        if (user != null && user.isAdmin()) return true;
        return organizationDao.isUserInCorp(userId, corpId);
    }


    public boolean canUserManageCorp(long userId, long corpId) {
        int roleId = organizationDao.getUserRoleInCorp(userId, corpId);
        return (roleId >= 1 && roleId <= 2 ||
                userId == getCorporation(corpId).getUserId()) ||
                accountMgr.getUser(userId).isAdmin();

    }


    public List<User> getUserLisOfCorp(long corpId) {
        List<User> list = organizationDao.getUserLisOfCorp(corpId);
        Corporation c = getCorporation(corpId);
        User u = accountMgr.getUser(c.getUserId());
        list.add(u);
        for (User user : list) {
            int roleId = getUserRoleInCorp(user.getId(), corpId);
            if (user.isAdmin()) {
                roleId = 1; // user is the RAP platform admin
            } else if (user.getId() == c.getUserId()) {
                roleId = 1; // user is the author
            }
            user.setRoleId(roleId);
        }
        return list;
    }


    public int getUserRoleInCorp(long userId, long corpId) {
        return organizationDao.getUserRoleInCorp(userId, corpId);
    }


    public boolean canUserAccessProject(long userId, long projectId) {
        User u = accountMgr.getUser(userId);
        Project p = projectMgr.getProject(projectId);
        int teamId = organizationDao.getTeamIdByProjectId(projectId);
        Corporation c = organizationDao.getCorporation(teamId);

        return u.isAdmin() || p.isUserMember(userId) || c.isPublic()
                || canUserAccessCorp(userId, c.getId()) || p.getUser().getId() == userId;
    }


    public boolean canUserAccessPage(long userId, long pageId) {
        Page page = projectMgr.getPage(pageId);
        if (page != null) {
            Module module = page.getModule();
            if (module != null) {
                Project project = module.getProject();
                if (project != null) {
                    return canUserAccessProject(userId, project.getId());
                }
            }
        }
        return false;
    }


    public boolean canUserAccessProductionLine(long userId, long plId) {
        ProductionLine pl = this.getProductionLine(plId);
        int corpId = pl.getCorporationId();
        Corporation team = getCorporation(corpId);
        if (team.getAccessType() == Corporation.PUBLIC_ACCESS) {
            return true;
        }
        return canUserAccessCorp(userId, corpId);
    }


    public boolean canUserManageProductionLine(long userId, long plId) {
        ProductionLine pl = this.getProductionLine(plId);
        int corpId = pl.getCorporationId();
        return canUserManageCorp(userId, corpId);
    }


    public boolean canUserAccessGroup(long userId, long groupId) {
        Group g = organizationDao.getGroup(groupId);
        ProductionLine pl = getProductionLine(g.getProductionLineId());
        int corpId = pl.getCorporationId();
        Corporation team = getCorporation(corpId);
        if (team.getAccessType() == Corporation.PUBLIC_ACCESS) {
            return true;
        }
        return canUserAccessCorp(userId, corpId);
    }


    public boolean canUserManageGroup(long userId, long groupId) {
        Group g = organizationDao.getGroup(groupId);
        ProductionLine pl = getProductionLine(g.getProductionLineId());
        int corpId = pl.getCorporationId();
        return canUserManageCorp(userId, corpId);
    }


    public int addTeam(Corporation team) {

        int corpId = organizationDao.addCorporation(team);
        for (String account : team.getAccountList()) {
            if (account == null || account.trim().isEmpty()) continue;
            User u = accountMgr.getUser(account);
            if (u.getId() == team.getUserId()) {
                // if the user is creator, there's no need to add again
                continue;
            }
            organizationDao.addUserToCorp(corpId, u.getId(), 3); // 3, normal member
        }
        return corpId;
    }


    public boolean setUserRoleInCorp(long curUserId, long userId, long corpId, long roleId) {
        if (canUserManageUserInCorp(curUserId, userId, corpId)) {
            organizationDao.setUserRoleInCorp(userId, corpId, roleId);
            return true;
        } else {
            return false;
        }
    }


    public boolean removeMemberFromCorp(long curUserId, long userId, long corpId) {
        int roleId = getUserRoleInCorp(userId, corpId);

        // if user can't manage team, or the user to be deleted is super admin, failed
        if (!canUserManageCorp(curUserId, corpId) || roleId == 1) {
            return false;
        }

        organizationDao.deleteMembershipFromCorp(curUserId, userId, corpId);

        return true;
    }


    public boolean addTeamMembers(long curUserId, long corpId, String accountList) {
        if (!canUserManageCorp(curUserId, corpId))
            return false;

        String[] accs = accountList.split(",");
        Corporation c = getCorporation(corpId);
        for (String acc : accs) {
            User u = accountMgr.getUser(acc);
            if (u != null) {
                if (!organizationDao.isUserInCorp(u.getId(), corpId)
                        && u.getId() != c.getUserId()) {
                    organizationDao.addUserToCorp(corpId, u.getId(), 3);
                }
            }
        }

        return true;
    }


    public void updateCorporation(Corporation c) {
        organizationDao.updateCorporation(c);
    }


    private boolean canUserManageUserInCorp(long curUserId, long userId, long corpId) {
        User curUser = accountMgr.getUser(curUserId);
        if (curUser.isAdmin()) {
            return true;
        }
        int roleId = getUserRoleInCorp(curUserId, corpId);
        if (roleId >= 1 || roleId <= 2) {
            return true;
        }
        return false;
    }

}

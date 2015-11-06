package com.taobao.rigel.rap.organization.service.impl;

import java.util.List;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;
import com.taobao.rigel.rap.common.RapError;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OrganizationMgrImpl implements OrganizationMgr {
	private OrganizationDao organizationDao;
	private ProjectMgr projectMgr;

    public AccountMgr getAccountMgr() {
        return accountMgr;
    }

    public void setAccountMgr(AccountMgr accountMgr) {
        this.accountMgr = accountMgr;
    }

    private AccountMgr accountMgr;
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

	@Override
	public List<Corporation> getCorporationList() {
		return organizationDao.getCorporationList();
	}

    @Override
    public List<Corporation> getCorporationListWithPager(int pageNum, int pageSize) {

        List<Corporation> list = organizationDao.getCorporationListWithPager(pageNum, pageSize);

        for (Corporation c : list) {
            long memberNum = organizationDao.getMemberNumOfCorporation(c.getId());
            c.setMemberNum(memberNum + 1); // +1 project creator
            c.setHasAccess(true);
            c.setCreatorName(accountMgr.getUser(c.getUserId()).getName());
        }
        return list;
    }

    @Override
    public long getCorporationListWithPagerNum() {
        return  organizationDao.getCorporationListWithPagerNum();
    }

    @Override
    public List<Corporation> getCorporationListWithPager(long userId, int pageNum, int pageSize) {
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
        return list;
    }

    @Override
    public long getCorporationListWithPagerNum(long userId) {
        User user = accountMgr.getUser(userId);
        if (user.isAdmin()) {
            return getCorporationListWithPagerNum();
        }
        return organizationDao.getCorporationListWithPagerNum(userId);
    }

    @Override
	public List<Group> getGroupList(int productionLineId) {
		return organizationDao.getGroupList(productionLineId);
	}

	@Override
	public List<ProductionLine> getProductionLineList(int corpId) {
		return organizationDao.getProductionLineList(corpId);
	}

	@Override
	public int addGroup(Group group) {
		return organizationDao.addGroup(group);
	}

	@Override
	public int addProductionLine(ProductionLine productionLine) {
		return organizationDao.addProductionLine(productionLine);
	}

	@Override
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

	@Override
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

	@Override
	public void updateGroup(Group group) {
		organizationDao.updateGroup(group);
	}

	@Override
	public void updateProductionLine(ProductionLine productionLine) {
		organizationDao.updateProductionLine(productionLine);
	}

	@Override
	public ProductionLine getProductionLine(int plid) {
		return organizationDao.getProductionLine(plid);
	}

	@Override
	public Corporation getCorporation(int id) {
		return organizationDao.getCorporation(id);
	}

    @Override
    public boolean canUserAccessCorp(long userId, int corpId) {
        Corporation c = getCorporation(corpId);
        if (c == null) return false;
        if (c.getUserId() == userId) return true;
        User user = accountMgr.getUser(userId);
        if (user != null && user.isAdmin()) return true;
        return organizationDao.isUserInCorp(userId, corpId);
    }

    @Override
    public boolean canUserManageCorp(long userId, int corpId) {
        int roleId = organizationDao.getUserRoleInCorp(userId, corpId);
        return (roleId >= 1 && roleId <= 2 ||
                userId == getCorporation(corpId).getUserId()) ||
                accountMgr.getUser(userId).isAdmin();

    }

    @Override
    public List<User> getUserLisOfCorp(int corpId) {
        List<User> list =  organizationDao.getUserLisOfCorp(corpId);
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

    @Override
    public int getUserRoleInCorp(long userId, int corpId) {
        return organizationDao.getUserRoleInCorp(userId, corpId);
    }

    @Override
    public boolean canUserAccessProject(long userId, int projectId) {
        User u = accountMgr.getUser(userId);
        Project p = projectMgr.getProject(projectId);
        int teamId = organizationDao.getTeamIdByProjectId(projectId);
        Corporation c = organizationDao.getCorporation(teamId);

        return u.isAdmin() || p.isUserMember(userId) || c.isPublic()
                || canUserAccessCorp(userId, c.getId()) || p.getUser().getId() == userId;
    }

    @Override
    public boolean canUserAccessPage(long userId, int pageId) {
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

    @Override
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

    @Override
    public boolean setUserRoleInCorp(long curUserId, long userId, int corpId, int roleId) {
        if (canUserManageUserInCorp(curUserId, userId, corpId)) {
            organizationDao.setUserRoleInCorp(userId, corpId, roleId);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean removeMemberFromCorp(long curUserId, long userId, int corpId) {
        int roleId = getUserRoleInCorp(userId, corpId);

        // if user can't manage team, or the user to be deleted is super admin, failed
        if (!canUserManageCorp(curUserId, corpId) || roleId == 1) {
            return false;
        }

        organizationDao.deleteMembershipFromCorp(curUserId, userId, corpId);

        return true;
    }

    @Override
    public boolean addTeamMembers(long curUserId, int corpId, String accountList) {
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

    @Override
    public void updateCorporation(Corporation c) {
        organizationDao.updateCorporation(c);
    }


    private boolean canUserManageUserInCorp(long curUserId, long userId, int corpId) {
        User curUser = accountMgr.getUser(curUserId);
        if (curUser.isAdmin()) {
            return true;
        }
        int roleId = getUserRoleInCorp(curUserId, corpId);
        if (roleId >=1 || roleId <= 2) {
            return  true;
        }
        return false;
    }

}

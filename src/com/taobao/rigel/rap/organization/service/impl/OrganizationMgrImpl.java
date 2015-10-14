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
        return organizationDao.getCorporationListWithPager(pageNum, pageSize);
    }

    @Override
    public List<Corporation> getCorporationListWithPage(int userId, int pageNum, int pageSize) {
        return organizationDao.getCorporationListWithPage(userId, pageNum, pageSize);
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
    public boolean canUserAccessCorp(int userId, int corpId) {
        Corporation c = getCorporation(corpId);
        if (c == null) return false;
        if (c.getUserId() == userId) return true;
        User user = accountMgr.getUser(userId);
        if (user != null && user.isAdmin()) return true;
        return organizationDao.isUserInCorp(userId, corpId);
    }

    @Override
    public boolean canUserManageCorp(int userId, int corpId) {
        int roleId = organizationDao.getUserRoleInCorp(userId, corpId);
        Corporation c = getCorporation(corpId);
        return (roleId >= 1 && roleId <= 2 || userId == c.getUserId());

    }

    @Override
    public boolean canUserAccessProject(int userId, int projectId) {
        User u = accountMgr.getUser(userId);
        Project p = projectMgr.getProject(projectId);

        return u.isAdmin() || p.isUserMember(userId);
    }

    @Override
    public boolean canUserAccessPage(int userId, int pageId) {
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
            User u = accountMgr.getUser(account);
            if (u.getId() == team.getUserId()) {
                // if the user is creator, there's no need to add again
                continue;
            }
            organizationDao.addUserToCorp(corpId, u.getId(), 3); // 3, normal member
        }
        return corpId;
    }

}

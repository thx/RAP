package com.taobao.rigel.rap.organization.service.impl;

import java.util.List;

import com.taobao.rigel.rap.common.RapError;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class OrganizationMgrImpl implements OrganizationMgr {
	private OrganizationDao organizationDao;
	private ProjectMgr projectMgr;

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
	public int addProductionList(ProductionLine productionLine) {
		return organizationDao.addProductionList(productionLine);
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

}

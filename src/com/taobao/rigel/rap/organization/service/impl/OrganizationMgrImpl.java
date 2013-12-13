package com.taobao.rigel.rap.organization.service.impl;

import java.util.List;

import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;

public class OrganizationMgrImpl implements OrganizationMgr {
	private OrganizationDao organizationDao;

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
	public void addGroup(Group group) {
		organizationDao.addGroup(group);
	}

	@Override
	public void addProductionList(ProductionLine productionLine) {
		organizationDao.addProductionList(productionLine);
	}

	@Override
	public void removeGroup(int groupId) {
		organizationDao.removeGroup(groupId);
	}

	@Override
	public void removeProductionLine(int productionLineId) {
		organizationDao.removeProductionLine(productionLineId);
	}

	@Override
	public void updateGroup(Group group) {
		organizationDao.updateGroup(group);
	}

	@Override
	public void updateProductionLine(ProductionLine productionLine) {
		organizationDao.updateProductionLine(productionLine);
	}

}

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
	public List<Group> getGroupList() {
		return organizationDao.getGroupList();
	}

	@Override
	public List<ProductionLine> getProductionLineList() {
		return organizationDao.getProductionLineList();
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeProductionLine(int productionLineId) {
		// TODO Auto-generated method stub
		
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

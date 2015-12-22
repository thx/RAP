package com.taobao.rigel.rap.organization.dao.impl;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.bo.Group;
import com.taobao.rigel.rap.organization.bo.ProductionLine;
import com.taobao.rigel.rap.organization.dao.OrganizationDao;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class OrganizationDaoImpl extends HibernateDaoSupport implements
		OrganizationDao {

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    private AccountDao accountDao;

    public ProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    private ProjectDao projectDao;


	@SuppressWarnings("unchecked")
	@Override
	public List<Corporation> getCorporationList() {
		return getSession().createQuery("from Corporation").list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Group> getGroupList(int productionLineId) {
		Query query = getSession().createQuery(
				"from Group where productionLineId = :id");
		query.setInteger("id", productionLineId);
		return query.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ProductionLine> getProductionLineList(int corpId) {
		return getSession()
				.createQuery("from ProductionLine where corporation_id = :id")
				.setInteger("id", corpId).list();
	}

	@Override
	public int addGroup(Group group) {
		Object s = getSession().save(group);
		return (Integer)s;
	}

	@Override
	public int addProductionLine(ProductionLine productionLine) {
		Object s = getSession().save(productionLine);
		return (Integer)s;
	}

	@Override
	public void removeGroup(int groupId) {
		Session session = getSession();
		Object group = session.get(Group.class, groupId);
		if (group != null) {
			session.delete((Group) group);
		}
	}

	@Override
	public void removeProductionLine(int productionLineId) {
		Session session = getSession();
		Object productionLine = session.get(ProductionLine.class,
				productionLineId);
		if (productionLine != null) {
			session.delete((ProductionLine) productionLine);
		}
	}

	@Override
	public void updateGroup(Group group) {
		Group g = getGroup(group.getId());
		if (g != null) {
			g.setName(group.getName());
			getSession().update(g);
		}
	}

	@Override
	public void updateProductionLine(ProductionLine line) {
		ProductionLine p = getProductionLine(line.getId());
		p.setName(line.getName());
		getSession().update(p);
	}

	@Override
	public Group getGroup(int id) {
		return (Group) getSession().get(Group.class, id);
	}

	@Override
	public ProductionLine getProductionLine(int id) {
		return (ProductionLine) getSession().get(ProductionLine.class, id);
	}

	@Override
	public void updateCountersInProductionLine(int productionLineId) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT COUNT(*) FROM tb_project p ")
		.append("JOIN tb_group g ON p.group_id = g.id ")
		.append("JOIN tb_production_line pl ON pl.id = g.production_line_id ")
		.append("WHERE g.production_line_id = :id");
		Query query = getSession().createSQLQuery(sql.toString());
		query.setInteger("id", productionLineId);
		int num = Integer.parseInt(query.uniqueResult().toString());
		sql = new StringBuilder();
		sql.append("UPDATE tb_production_line SET project_num = :num WHERE id = :id");
		query = getSession().createSQLQuery(sql.toString());
		query.setInteger("num", num);
		query.setInteger("id", productionLineId);
		query.executeUpdate();
	}

    @Override
    public List<User> getUserLisOfCorp(int corpId) {
        Query query = getSession().createSQLQuery("SELECT user_id FROM tb_corporation_and_user WHERE corporation_id = :corpId");
        query.setInteger("corpId", corpId);
        List<Integer> list = query.list();
        List<User> resultList = new ArrayList<User>();
        for (Integer id : list) {
            User user = accountDao.getUser(id);
            if (user != null) {
                resultList.add(user);
            }
        }
        return resultList;
    }

    @Override
    public void addUserToCorp(int corpId, long userId, int roleId) {
        Query query = getSession().createSQLQuery("INSERT INTO tb_corporation_and_user (corporation_id, user_id, role_id) VALUES (:corpId, :userId, :roleId)");
        query.setInteger("corpId", corpId)
                .setLong("userId", userId)
                .setInteger("roleId", roleId);
        query.executeUpdate();
    }

    @Override
    public boolean isUserInCorp(long userId, int corpId) {
        Query query = getSession().createSQLQuery("SELECT COUNT(*) FROM tb_corporation_and_user WHERE user_id = :userId AND corporation_id = :corpId");
        query.setLong("userId", userId).setInteger("corpId", corpId);
        int num = Integer.parseInt(query.uniqueResult().toString());
        return num > 0;
    }

    @Override
    public int getUserRoleInCorp(long userId, int corpId) {
        Query query = getSession().createSQLQuery("SELECT role_id FROM tb_corporation_and_user WHERE user_id = :userId AND corporation_id = :corpId");
        query.setLong("userId", userId).setInteger("corpId", corpId);
        Object result = query.uniqueResult();
        if (result == null) {
            return -1;
        }
        return Integer.parseInt(result.toString());
    }

    @Override
    public void setUserRoleInCorp(long userId, int corpId, int roleId) {
        Query query = getSession().createSQLQuery("UPDATE tb_corporation_and_user SET role_id = :roleId WHERE user_id = :userId AND corporation_id = :corpId");
        query.setInteger("roleId", roleId);
        query.setInteger("corpId", corpId);
        query.setLong("userId", userId);
        query.executeUpdate();
    }

    @Override
    public List<Corporation> getCorporationListWithPager(int pageNum, int pageSize) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT c.id ")
                .append("FROM tb_corporation c ")
                .append("LIMIT :startIndex, :pageSize ");

        Query query = getSession().createSQLQuery(sql.toString());
        query.setLong("startIndex", (pageNum - 1) * pageSize);
        query.setLong("pageSize", pageSize);

        List<Integer> list = (List<Integer>) query.list();
        List<Corporation> resultList = new ArrayList<Corporation>();
        for (Integer id : list) {
            Corporation row = getCorporation(id);
            resultList.add(row);
        }
        return resultList;
    }

    @Override
    public long getCorporationListWithPagerNum() {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT COUNT(*) ")
                .append("FROM tb_corporation c ");

        Query query = getSession().createSQLQuery(sql.toString());

        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public List<Corporation> getCorporationListWithPager(long userId, int pageNum, int pageSize) {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT DISTINCT cid FROM ( ")
                .append("   SELECT c.id AS cid ")
                .append("       FROM tb_corporation c ")
                .append("       JOIN tb_corporation_and_user u ON u.corporation_id = c.id ")
                .append("       WHERE u.user_id = :userId ")
                .append("   UNION ")
                .append("   SELECT id AS cid FROM tb_corporation ")
                .append("   WHERE user_id = :userId or access_type = 20")
                .append(") AS TEMP ")
                .append("ORDER BY cid DESC ")
                .append("LIMIT :startIndex, :pageSize ");

        Query query = getSession().createSQLQuery(sql.toString());
        query.setLong("userId", userId);
        query.setLong("startIndex", (pageNum - 1) * pageSize);
        query.setLong("pageSize", pageSize);

        List<Integer> list = query.list();
        List<Corporation> resultList = new ArrayList<Corporation>();
        for (int id : list) {
            Corporation row = getCorporation(id);
            resultList.add(row);
        }
        return resultList;
    }

    @Override
    public long getCorporationListWithPagerNum(long userId) {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT COUNT(DISTINCT cid) FROM ( ")
                .append("   SELECT c.id AS cid ")
                .append("       FROM tb_corporation c ")
                .append("       JOIN tb_corporation_and_user u ON u.corporation_id = c.id ")
                .append("       WHERE u.user_id = :userId ")
                .append("   UNION ")
                .append("   SELECT id AS cid FROM tb_corporation ")
                .append("   WHERE user_id = :userId or access_type = 20")
                .append(") AS TEMP ");

        Query query = getSession().createSQLQuery(sql.toString());
        query.setLong("userId", userId);
        return Long.parseLong(query.uniqueResult().toString());
    }

    @Override
    public int addCorporation(Corporation c) {
        Session session = getSession();
        Query query = session.createSQLQuery("INSERT INTO tb_corporation (`name`, logo_url, user_id, access_type, `desc`) VALUES (:name, :logoUrl, :userId, :accessType, :desc)");
        query.setString("name", c.getName());
        query.setString("logoUrl", c.getLogoUrl());
        query.setLong("userId", c.getUserId());
        query.setShort("accessType", c.getAccessType());
        query.setString("desc", c.getDesc());
        query.executeUpdate();

        return Integer.parseInt(session.createSQLQuery("SELECT LAST_INSERT_ID()").uniqueResult().toString());
    }

    @Override
    public long getMemberNumOfCorporation(int corpId) {
       String sql = "SELECT COUNT(DISTINCT cu.user_id) FROM tb_corporation c JOIN tb_corporation_and_user cu ON cu.corporation_id = c.id WHERE c.id = :corpId";

        Query query = getSession().createSQLQuery(sql);
        query.setInteger("corpId", corpId);

        return Long.parseLong(query.uniqueResult().toString());
    }

    private List<Integer> getProjectIdsFromCorporation(long userId, int corpId) {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT DISTINCT p.id AS projectId ")
                .append("FROM tb_project p ")
                .append("JOIN tb_project_and_user pu ON p.id = pu.project_id ")
                .append("JOIN tb_group g ON g.id = p.group_id ")
                .append("JOIN tb_production_line pl ON pl.id = g.production_line_id ")
                .append("JOIN tb_corporation c ON c.id = pl.corporation_id ")
                .append("WHERE p.user_id = :userId AND c.id = :corpId");
        Query query = getSession().createSQLQuery(builder.toString());
        query.setLong("userId", userId);
        query.setInteger("corpId", corpId);
        List<Integer> idList = query.list();
        return idList;
    }

    @Override
    public void deleteMembershipFromCorp(long curUserId, long userId, int corpId) {
        Query query = getSession().createSQLQuery("DELETE FROM tb_corporation_and_user WHERE corporation_id = :corpId AND user_id = :userId");
        query.setLong("userId", userId);
        query.setInteger("corpId", corpId);
        query.executeUpdate();

        List<Integer> idList = getProjectIdsFromCorporation(userId, corpId);

        for (Integer projectId : idList) {
            projectDao.updateCreatorId(projectId, curUserId);
        }
    }

    @Override
    public void updateCorporation(Corporation c) {
        Query query = getSession().createSQLQuery("UPDATE tb_corporation SET `name`=:name, `desc`=:desc, access_type=:accessType WHERE id=:id");
        query.setString("name", c.getName());
        query.setString("desc", c.getDesc());
        query.setShort("accessType", c.getAccessType());
        query.setInteger("id", c.getId());
        query.executeUpdate();
    }

    @Override
    public int getTeamIdByProjectId(int id) {
        StringBuilder sql = new StringBuilder();

        sql.append(" SELECT c.id");
        sql.append(" FROM tb_project p");
        sql.append(" JOIN tb_group g ON g.id = p.group_id");
        sql.append(" JOIN tb_production_line pl ON pl.id = g.production_line_id");
        sql.append(" JOIN tb_corporation c ON c.id = pl.corporation_id");
        sql.append(" WHERE p.id = :id");

        Query query = getSession().createSQLQuery(sql.toString());
        query.setInteger("id", id);
        return (Integer) query.uniqueResult();
    }

    @Override
	public Corporation getCorporation(int id) {
        return (Corporation) getSession().get(Corporation.class, id);
	}
}

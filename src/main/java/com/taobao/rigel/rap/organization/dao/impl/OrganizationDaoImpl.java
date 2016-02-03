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
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.ArrayList;
import java.util.List;

public class OrganizationDaoImpl extends HibernateDaoSupport implements
        OrganizationDao {

    private AccountDao accountDao;
    private ProjectDao projectDao;

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public ProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @SuppressWarnings("unchecked")

    public List<Corporation> getCorporationList() {
        return currentSession().createQuery("from Corporation").list();
    }

    @SuppressWarnings("unchecked")

    public List<Group> getGroupList(int productionLineId) {
        Query query = currentSession().createQuery(
                "from Group where productionLineId = :id");
        query.setInteger("id", productionLineId);
        return query.list();
    }

    @SuppressWarnings("unchecked")

    public List<ProductionLine> getProductionLineList(int corpId) {
        return currentSession()
                .createQuery("from ProductionLine where corporation_id = :id")
                .setInteger("id", corpId).list();
    }


    public int addGroup(Group group) {
        Object s = currentSession().save(group);
        return (Integer) s;
    }


    public int addProductionLine(ProductionLine productionLine) {
        Object s = currentSession().save(productionLine);
        return (Integer) s;
    }


    public void removeGroup(int groupId) {
        Session session = currentSession();
        Object group = session.get(Group.class, groupId);
        if (group != null) {
            session.delete((Group) group);
        }
    }


    public void removeProductionLine(int productionLineId) {
        Session session = currentSession();
        Object productionLine = session.get(ProductionLine.class,
                productionLineId);
        if (productionLine != null) {
            session.delete((ProductionLine) productionLine);
        }
    }


    public void updateGroup(Group group) {
        Group g = getGroup(group.getId());
        if (g != null) {
            g.setName(group.getName());
            currentSession().update(g);
        }
    }


    public void updateProductionLine(ProductionLine line) {
        ProductionLine p = getProductionLine(line.getId());
        p.setName(line.getName());
        currentSession().update(p);
    }


    public Group getGroup(int id) {
        return (Group) currentSession().get(Group.class, id);
    }


    public ProductionLine getProductionLine(int id) {
        return (ProductionLine) currentSession().get(ProductionLine.class, id);
    }


    public void updateCountersInProductionLine(int productionLineId) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT COUNT(*) FROM tb_project p ")
                .append("JOIN tb_group g ON p.group_id = g.id ")
                .append("JOIN tb_production_line pl ON pl.id = g.production_line_id ")
                .append("WHERE g.production_line_id = :id");
        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("id", productionLineId);
        int num = Integer.parseInt(query.uniqueResult().toString());
        sql = new StringBuilder();
        sql.append("UPDATE tb_production_line SET project_num = :num WHERE id = :id");
        query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("num", num);
        query.setInteger("id", productionLineId);
        query.executeUpdate();
    }


    public List<User> getUserLisOfCorp(int corpId) {
        Query query = currentSession().createSQLQuery("SELECT user_id FROM tb_corporation_and_user WHERE corporation_id = :corpId");
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


    public void addUserToCorp(int corpId, int userId, int roleId) {
        Query query = currentSession().createSQLQuery("INSERT INTO tb_corporation_and_user (corporation_id, user_id, role_id) VALUES (:corpId, :userId, :roleId)");
        query.setInteger("corpId", corpId)
                .setInteger("userId", userId)
                .setInteger("roleId", roleId);
        query.executeUpdate();
    }


    public boolean isUserInCorp(int userId, int corpId) {
        Query query = currentSession().createSQLQuery("SELECT COUNT(*) FROM tb_corporation_and_user WHERE user_id = :userId AND corporation_id = :corpId");
        query.setInteger("userId", userId).setInteger("corpId", corpId);
        int num = Integer.parseInt(query.uniqueResult().toString());
        return num > 0;
    }


    public int getUserRoleInCorp(int userId, int corpId) {
        Query query = currentSession().createSQLQuery("SELECT role_id FROM tb_corporation_and_user WHERE user_id = :userId AND corporation_id = :corpId");
        query.setInteger("userId", userId).setInteger("corpId", corpId);
        Object result = query.uniqueResult();
        if (result == null) {
            return -1;
        }
        return Integer.parseInt(result.toString());
    }


    public void setUserRoleInCorp(int userId, int corpId, int roleId) {
        Query query = currentSession().createSQLQuery("UPDATE tb_corporation_and_user SET role_id = :roleId WHERE user_id = :userId AND corporation_id = :corpId");
        query.setInteger("roleId", roleId);
        query.setInteger("corpId", corpId);
        query.setInteger("userId", userId);
        query.executeUpdate();
    }


    public List<Corporation> getCorporationListWithPager(int pageNum, int pageSize, String keyword) {
        boolean isSearch = keyword != null && !keyword.trim().isEmpty();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT c.id ")
                .append("FROM tb_corporation c "+(isSearch ? " WHERE name LIKE CONCAT('%', :keyword, '%')" : ""))
                .append("LIMIT :startIndex, :pageSize ");

        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("startIndex", (pageNum - 1) * pageSize);
        query.setInteger("pageSize", pageSize);
        if (isSearch) {
            query.setString("keyword", keyword);
        }
        List<Integer> list = (List<Integer>) query.list();
        List<Corporation> resultList = new ArrayList<Corporation>();
        for (Integer id : list) {
            Corporation row = getCorporation(id);
            resultList.add(row);
        }
        return resultList;
    }


    public int getCorporationListWithPagerNum(String keyword) {
        boolean isSearch = keyword != null && !keyword.trim().isEmpty();
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT COUNT(*) ")
                .append("FROM tb_corporation c " +(isSearch ? " WHERE name LIKE CONCAT('%', :keyword, '%')" : ""));

        Query query = currentSession().createSQLQuery(sql.toString());
        if (isSearch) {
            query.setString("keyword", keyword);
        }

        return Integer.parseInt(query.uniqueResult().toString());
    }


    public List<Corporation> getCorporationListWithPager(int userId, int pageNum, int pageSize, String keyword) {
        boolean isSearch = keyword != null && !keyword.trim().isEmpty();
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT DISTINCT cid FROM ( ")
                .append("   SELECT c.id AS cid ")
                .append("       FROM tb_corporation c ")
                .append("       JOIN tb_corporation_and_user u ON u.corporation_id = c.id ")
                .append("       WHERE u.user_id = :userId " + (isSearch ? "AND c.name LIKE CONCAT('%', :keyword, '%') " : ""))
                .append("   UNION ")
                .append("   SELECT id AS cid FROM tb_corporation ")
                .append("   WHERE (user_id = :userId or access_type = 20) " + (isSearch ? "AND name LIKE CONCAT('%', :keyword, '%') " : ""))
                .append(") AS TEMP ")
                .append("LIMIT :startIndex, :pageSize ");

        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("userId", userId);
        query.setInteger("startIndex", (pageNum - 1) * pageSize);
        query.setInteger("pageSize", pageSize);
        if (isSearch) {
            query.setString("keyword", keyword);
        }

        List<Integer> list = query.list();
        List<Corporation> resultList = new ArrayList<Corporation>();
        for (int id : list) {
            Corporation row = getCorporation(id);
            resultList.add(row);
        }
        return resultList;
    }


    public int getCorporationListWithPagerNum(int userId, String keyword) {
        boolean isSearch = keyword != null && !keyword.trim().isEmpty();
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT COUNT(DISTINCT cid) FROM ( ")
                .append("   SELECT c.id AS cid ")
                .append("       FROM tb_corporation c ")
                .append("       JOIN tb_corporation_and_user u ON u.corporation_id = c.id ")
                .append("       WHERE u.user_id = :userId " + (isSearch ? "AND c.name LIKE CONCAT('%', :keyword, '%') " : ""))
                .append("   UNION ")
                .append("   SELECT id AS cid FROM tb_corporation ")
                .append("   WHERE (user_id = :userId or access_type = 20) " + (isSearch ? "AND name LIKE CONCAT('%', :keyword, '%') " : ""))
                .append(") AS TEMP ");

        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("userId", userId);
        if (isSearch) {
            query.setString("keyword", keyword);
        }
        return Integer.parseInt(query.uniqueResult().toString());
    }


    public int addCorporation(Corporation c) {
        Session session = currentSession();
        Query query = session.createSQLQuery("INSERT INTO tb_corporation (`name`, logo_url, user_id, access_type, `desc`) VALUES (:name, :logoUrl, :userId, :accessType, :desc)");
        query.setString("name", c.getName());
        query.setString("logoUrl", c.getLogoUrl());
        query.setInteger("userId", c.getUserId());
        query.setShort("accessType", c.getAccessType());
        query.setString("desc", c.getDesc());
        query.executeUpdate();

        return Integer.parseInt(session.createSQLQuery("SELECT LAST_INSERT_ID()").uniqueResult().toString());
    }


    public int getMemberNumOfCorporation(int corpId) {
        String sql = "SELECT COUNT(DISTINCT cu.user_id) FROM tb_corporation c JOIN tb_corporation_and_user cu ON cu.corporation_id = c.id WHERE c.id = :corpId";

        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("corpId", corpId);

        return Integer.parseInt(query.uniqueResult().toString());
    }

    public int getProjectNumOfCorporation(int corpId) {
        String sql = "SELECT COUNT(p.id) \n" +
                "FROM tb_project p \n" +
                "JOIN tb_group g ON g.id = p.group_id \n" +
                "JOIN tb_production_line pl ON p.id = g.production_line_id\n" +
                "WHERE pl.corporation_id = :corpId";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("corpId", corpId);

        return Integer.parseInt(query.uniqueResult().toString());
    }

    public int getActionNumOfCorporation(int corpId) {
        String sql = "SELECT COUNT(a.id) \n" +
                "FROM tb_action a\n" +
                "JOIN tb_action_and_page ap ON ap.action_id = a.id\n" +
                "JOIN tb_page p ON p.id = ap.page_id\n" +
                "JOIN tb_module m ON m.id = p.module_id\n" +
                "JOIN tb_project pr ON pr.id = m.project_id\n" +
                "JOIN tb_group g ON g.id = pr.group_id \n" +
                "JOIN tb_production_line pl ON pl.id = g.production_line_id\n" +
                "WHERE pl.corporation_id = :corpId";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("corpId", corpId);

        return Integer.parseInt(query.uniqueResult().toString());
    }

    private List<Integer> getProjectIdsFromCorporation(int userId, int corpId) {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT DISTINCT p.id AS projectId ")
                .append("FROM tb_project p ")
                .append("JOIN tb_project_and_user pu ON p.id = pu.project_id ")
                .append("JOIN tb_group g ON g.id = p.group_id ")
                .append("JOIN tb_production_line pl ON pl.id = g.production_line_id ")
                .append("JOIN tb_corporation c ON c.id = pl.corporation_id ")
                .append("WHERE p.user_id = :userId AND c.id = :corpId");
        Query query = currentSession().createSQLQuery(builder.toString());
        query.setInteger("userId", userId);
        query.setInteger("corpId", corpId);
        List<Integer> idList = query.list();
        return idList;
    }


    public void deleteMembershipFromCorp(int curUserId, int userId, int corpId) {
        Query query = currentSession().createSQLQuery("DELETE FROM tb_corporation_and_user WHERE corporation_id = :corpId AND user_id = :userId");
        query.setInteger("userId", userId);
        query.setInteger("corpId", corpId);
        query.executeUpdate();

        List<Integer> idList = getProjectIdsFromCorporation(userId, corpId);

        for (Integer projectId : idList) {
            projectDao.updateCreatorId(projectId, curUserId);
        }
    }


    public void updateCorporation(Corporation c) {
        Query query = currentSession().createSQLQuery("UPDATE tb_corporation SET `name`=:name, `desc`=:desc, access_type=:accessType WHERE id=:id");
        query.setString("name", c.getName());
        query.setString("desc", c.getDesc());
        query.setShort("accessType", c.getAccessType());
        query.setInteger("id", c.getId());
        query.executeUpdate();
    }


    public int getTeamIdByProjectId(int id) {
        StringBuilder sql = new StringBuilder();

        sql.append(" SELECT c.id");
        sql.append(" FROM tb_project p");
        sql.append(" JOIN tb_group g ON g.id = p.group_id");
        sql.append(" JOIN tb_production_line pl ON pl.id = g.production_line_id");
        sql.append(" JOIN tb_corporation c ON c.id = pl.corporation_id");
        sql.append(" WHERE p.id = :id");

        Query query = currentSession().createSQLQuery(sql.toString());
        query.setInteger("id", id);
        Object resultObj = query.uniqueResult();
        if (resultObj == null) {
            return 0;
        } else {
            return (Integer) resultObj;
        }
    }


    public Corporation getCorporation(int id) {
        return currentSession().get(Corporation.class, id);
    }
}

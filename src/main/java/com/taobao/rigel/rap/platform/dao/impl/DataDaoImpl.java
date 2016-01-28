package com.taobao.rigel.rap.platform.dao.impl;

import com.taobao.rigel.rap.platform.dao.DataDao;
import org.hibernate.Query;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Bosn on 14-9-5.
 */
public class DataDaoImpl extends HibernateDaoSupport implements DataDao {

    public List<Map<String, Object>> getUserTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
                .append("FROM tb_user ")
                .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
                .append("GROUP BY MONTH(create_date) ")
                .append("ORDER BY create_date");
        Query query = currentSession().createSQLQuery(sql.toString());
        List<Object[]> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = currentSession().createSQLQuery("SELECT COUNT(*) FROM tb_user WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
                .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);


        return result;
    }


    public List<Map<String, Object>> getProjectTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
                .append("FROM tb_project ")
                .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
                .append("GROUP BY MONTH(create_date) ")
                .append("ORDER BY create_date");
        Query query = currentSession().createSQLQuery(sql.toString());
        List<Object[]> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = currentSession().createSQLQuery("SELECT COUNT(*) FROM tb_project WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
                .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);

        return result;
    }


    public List<Map<String, Object>> getCheckInTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
                .append("FROM tb_check_in ")
                .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
                .append("GROUP BY MONTH(create_date) ")
                .append("ORDER BY create_date");
        Query query = currentSession().createSQLQuery(sql.toString());
        List<Object[]> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = currentSession().createSQLQuery("SELECT COUNT(*) FROM tb_check_in WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
                .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);

        return result;
    }


    public List<Map<String, Object>> getActionNumByTeam() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT c.name, COUNT(a.id) as num ")
                .append("FROM tb_action a ")
                .append("JOIN tb_action_and_page ap ON ap.action_id = a.id ")
                .append("JOIN tb_page p ON p.id = ap.page_id ")
                .append("JOIN tb_module m ON m.id = p.module_id ")
                .append("JOIN tb_project pr ON pr.id = m.project_id ")
                .append("JOIN tb_group g ON g.id = pr.group_id ")
                .append("JOIN tb_production_line pl ON pl.id = g.production_line_id ")
                .append("JOIN tb_corporation c ON c.id = pl.corporation_id ")
                .append("GROUP BY c.name ")
                .append("ORDER BY COUNT(a.id) DESC ");


        Query query = currentSession().createSQLQuery(sql.toString());
        List<Object[]> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name", row[0]);
            map.put("num", row[1]);
            result.add(map);
        }

        return result;
    }

    public List<Map<String, Object>> getTop10ActionNumByTeam(int teamId) {
        String sql = "SELECT\n" +
                "  p.name AS name,\n" +
                "  COUNT(a.id) AS actionNum\n" +
                "FROM tb_production_line pl\n" +
                "  JOIN tb_group g ON g.production_line_id = pl.id\n" +
                "  JOIN tb_project p ON p.group_id = g.id\n" +
                "  JOIN tb_module m ON m.project_id = p.id\n" +
                "  JOIN tb_page p2 ON p2.module_id = m.id\n" +
                "  JOIN tb_action_and_page ap ON ap.page_id = p2.id\n" +
                "  JOIN tb_action a ON a.id = ap.action_id\n" +
                "WHERE pl.corporation_id = :corpId\n" +
                "GROUP BY p.id\n" +
                "ORDER BY COUNT(a.id) DESC\n" +
                "LIMIT 0, 50";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("corpId", teamId);
        List<Object[]> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name", row[0].toString());
            map.put("num", row[1].toString());
            result.add(map);
        }
        return result;
    }
}

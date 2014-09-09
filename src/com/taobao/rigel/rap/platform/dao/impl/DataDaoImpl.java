package com.taobao.rigel.rap.platform.dao.impl;

import com.taobao.rigel.rap.platform.dao.DataDao;
import org.hibernate.Query;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Bosn on 14-9-5.
 */
public class DataDaoImpl extends HibernateDaoSupport implements DataDao {
    @Override
    public List<Map<String, Object>> getUserTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
            .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
            .append("FROM tb_user ")
            .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
            .append("GROUP BY MONTH(create_date) ")
            .append("ORDER BY create_date");
        Query query = getSession().createSQLQuery(sql.toString());
        List<Object []> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = getSession().createSQLQuery("SELECT COUNT(*) FROM tb_user WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
                .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);


        return result;
    }

    @Override
    public List<Map<String, Object>> getProjectTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
                .append("FROM tb_project ")
                .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
                .append("GROUP BY MONTH(create_date) ")
                .append("ORDER BY create_date");
        Query query = getSession().createSQLQuery(sql.toString());
        List<Object []> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = getSession().createSQLQuery("SELECT COUNT(*) FROM tb_project WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
                .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);

        return result;
    }

    @Override
    public List<Map<String, Object>> getCheckInTrendByMonth() {
        StringBuilder sql = new StringBuilder();
        sql
                .append("SELECT MONTH(create_date) AS month, COUNT(id) as num, create_date ")
                .append("FROM tb_check_in ")
                .append("WHERE create_date BETWEEN DATE_ADD(NOW(), INTERVAL -1 YEAR) AND NOW() ")
                .append("GROUP BY MONTH(create_date) ")
                .append("ORDER BY create_date");
        Query query = getSession().createSQLQuery(sql.toString());
        List<Object []> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", row[1]);
            map.put("date", row[2]);
            result.add(map);
        }

        Object count = getSession().createSQLQuery("SELECT COUNT(*) FROM tb_check_in WHERE create_date < DATE_ADD(NOW(), INTERVAL -1 YEAR)")
            .uniqueResult();
        Map<String, Object> mapCount = new HashMap<String, Object>();
        mapCount.put("startValue", count);
        result.add(mapCount);

        return result;
    }

    @Override
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


        Query query = getSession().createSQLQuery(sql.toString());
        List<Object []> list = query.list();
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name", row[0]);
            map.put("num", row[1]);
            result.add(map);
        }

        return result;
    }
}

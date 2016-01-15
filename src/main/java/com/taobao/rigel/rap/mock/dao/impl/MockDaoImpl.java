package com.taobao.rigel.rap.mock.dao.impl;

import com.taobao.rigel.rap.mock.bo.Rule;
import com.taobao.rigel.rap.mock.dao.MockDao;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

/**
 * Created by Bosn on 15/7/17.
 */
public class MockDaoImpl extends HibernateDaoSupport implements MockDao {
    
    public Rule getRule(int actionId) {
        Rule rule = null;
        try {
            Session session = currentSession();
            rule = (Rule) session.get(Rule.class, actionId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return rule;
    }

    
    public int removeRule(int actionId) {
        Session session = currentSession();
        Object rule = session.get(Rule.class, actionId);
        if (rule != null) {
            session.delete((Rule) rule);
            return 0;
        } else {
            return -1;
        }
    }

    
    public int updateRule(Rule rule) {
        Session session = currentSession();
        session.update(rule);
        return 0;
    }

    
    public int addRule(Rule rule) {
        Session session = currentSession();
        session.save(rule);
        return 0;
    }
}

package com.taobao.rigel.rap.mock.dao.impl;

import com.taobao.rigel.rap.mock.bo.Rule;
import com.taobao.rigel.rap.mock.dao.RuleDao;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * Created by Bosn on 15/7/17.
 */
public class RuleDaoImpl extends HibernateDaoSupport implements RuleDao {
    @Override
    public Rule getRule(int actionId) {
        Rule rule = null;
        try {
            Session session = getSession();
            rule = (Rule) session.get(Rule.class, actionId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return rule;
    }

    @Override
    public int removeRule(int actionId) {
        Session session = getSession();
        Object rule = session.get(Rule.class, actionId);
        if (rule != null) {
            session.delete((Rule) rule);
            return 0;
        } else {
            return -1;
        }
    }

    @Override
    public int updateRule(Rule rule) {
        Session session = getSession();
        session.update(rule);
        return 0;
    }
}

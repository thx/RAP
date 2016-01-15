package com.taobao.rigel.rap.mock.dao;

import com.taobao.rigel.rap.mock.bo.Rule;

/**
 * Created by Bosn on 15/7/17.
 */
public interface MockDao {
    /**
     * get rule by action id
     *
     * @param actionId
     * @return
     */
    Rule getRule(int actionId);

    /**
     * delete rule by action id
     *
     * @param actionId
     * @return 0 success, -1 error
     */
    int removeRule(int actionId);

    /**
     * set rule, rule.actionId must be set
     *
     * @param rule
     * @return
     */
    int updateRule(Rule rule);

    /**
     * add new rule for action
     *
     * @param rule
     * @return
     */
    int addRule(Rule rule);
}

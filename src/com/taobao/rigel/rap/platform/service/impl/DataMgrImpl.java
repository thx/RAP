package com.taobao.rigel.rap.platform.service.impl;

import com.taobao.rigel.rap.platform.dao.DataDao;
import com.taobao.rigel.rap.platform.service.DataMgr;

import java.util.List;
import java.util.Map;

/**
 * Created by Bosn on 14-9-5.
 */
public class DataMgrImpl implements DataMgr {
    private DataDao dataDao;

    public void setDataDao(DataDao dataDao) {
        this.dataDao = dataDao;
    }

    public DataDao getDataDao() {
        return dataDao;
    }

    @Override
    public List<Map<String, Object>> getUserTrendByMonth() {
        return dataDao.getUserTrendByMonth();
    }

    @Override
    public List<Map<String, Object>> getProjectTrendByMonth() {
        return dataDao.getProjectTrendByMonth();
    }

    @Override
    public List<Map<String, Object>> getCheckInTrendByMonth() {
        return dataDao.getCheckInTrendByMonth();
    }

    @Override
    public List<Map<String, Object>> getActionNumByTeam() {
        return dataDao.getActionNumByTeam();
    }
}

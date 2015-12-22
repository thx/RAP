package com.taobao.rigel.rap.platform.service.impl;

import com.taobao.rigel.rap.platform.dao.DataDao;
import com.taobao.rigel.rap.platform.service.DataMgr;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Bosn on 14-9-5.
 */
public class DataMgrImpl implements DataMgr {
    private DataDao dataDao;
    private ProjectMgr projectMgr;

    public void setDataDao(DataDao dataDao) {
        this.dataDao = dataDao;
    }

    public DataDao getDataDao() {
        return dataDao;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
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

    @Override
    public List<Map<String, Object>> getMockNumByProject() {
        List<Project> list = projectMgr.selectMockNumTopNProjectList(5);
        List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
        for (Project p : list) {
            Map<String, Object> row = new HashMap<String, Object>();
            row.put("id", p.getId());
            row.put("name", p.getName());
            row.put("mockNum", p.getMockNum());
            results.add(row);
        }
        return results;
    }

}

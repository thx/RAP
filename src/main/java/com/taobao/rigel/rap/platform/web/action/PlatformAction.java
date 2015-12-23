package com.taobao.rigel.rap.platform.web.action;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.Item;
import com.taobao.rigel.rap.common.SystemVisitorLog;
import com.taobao.rigel.rap.platform.service.DataMgr;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlatformAction extends ActionBase {
    private static final Logger logger = LogManager.getFormatterLogger(PlatformAction.class.getName());
    private Gson gson = new Gson();
    private long time;
    private Map<String, List<Map<String, Object>>> trends = new HashMap<String, List<Map<String, Object>>>();
    private Map<String, List<Map<String, Object>>> statistics = new HashMap<String, List<Map<String, Object>>>();
    private int tabIndex;
    private ProjectMgr projectMgr;
    private List<Item> modelLog = new ArrayList<Item>();
    private Map<String, Item> modelLogMap = new HashMap<String, Item>();
    private DataMgr dataMgr;
    private String text;

    public void setTime(long time) {
        this.time = time;
    }

    public Map<String, List<Map<String, Object>>> getTrends() {
        return trends;
    }

    public Map<String, List<Map<String, Object>>> getStatistics() {
        return statistics;
    }

    public String getTrendsJSON() {
        return gson.toJson(getTrends());
    }

    public String getStatisticsJSON() {
        return gson.toJson(getStatistics());
    }

    public String getRealtimeJSON() {
        return gson.toJson(SystemVisitorLog.getRealtimeMap(null));
    }

    public String getRealtimeJSONByTime(long time) {
        return gson.toJson(SystemVisitorLog.getRealtimeMap(time));
    }

    public int getTabIndex() {
        return tabIndex;
    }

    public void setTabIndex(int tabIndex) {
        this.tabIndex = tabIndex;
    }

    public Map<String, Item> getModelLogMap() {
        return modelLogMap;
    }

    public List<Item> getModelLog() {
        return modelLog;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public DataMgr getDataMgr() {
        return dataMgr;
    }

    public void setDataMgr(DataMgr dataMgr) {
        this.dataMgr = dataMgr;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String home() {
        return SUCCESS;
    }

    public String test() {
        return SUCCESS;
    }

    public String log() {
        // statistics for RAP models
        modelLog.add(new Item("用户数", new Long(getAccountMgr().getUserNum()).toString()));
        modelLog.add(new Item("项目数", new Long(projectMgr.getProjectNum()).toString()));
        modelLog.add(new Item("接口数", new Long(projectMgr.getActionNum()).toString()));
        //modelLog.add(new Item("TAB数", new Long(projectMgr.getModuleNum()).toString()));
        //modelLog.add(new Item("页面数", new Long(projectMgr.getPageNum()).toString()));
        //modelLog.add(new Item("参数数", new Long(projectMgr.getParametertNum()).toString()));
        modelLog.add(new Item("文档提交数", new Long(projectMgr.getCheckInNum()).toString()));
        modelLog.add(new Item("MOCK服务调用次数", new Long(projectMgr.getMockNumInTotal()).toString(), "该信息自2014年10月底开始记录"));

        for (Item item : modelLog) {
            modelLogMap.put(item.getKey(), item);
        }

        // trends data
        trends.put("user", dataMgr.getUserTrendByMonth());
        trends.put("project", dataMgr.getProjectTrendByMonth());
        trends.put("checkIn", dataMgr.getCheckInTrendByMonth());


        // statistics data
        statistics.put("actionNumByTeam", dataMgr.getActionNumByTeam());
        statistics.put("mockNumByProject", dataMgr.getMockNumByProject());
        statistics.put("mockNumByProjectToday", SystemVisitorLog.getMockNumByProjectToday(projectMgr));

        return SUCCESS;
    }

    public String realtimeUpdate() {
        setJson(getRealtimeJSONByTime(time));
        return SUCCESS;
    }

    public String monitor() {
        Map<String, Object> logs = new HashMap<String, Object>();
        logs.put("ipLog", SystemVisitorLog.getAllIpLog());
        logs.put("userLog", SystemVisitorLog.getAllUserLog());
        logs.put("mockLog", SystemVisitorLog.getMockMapList());
        Gson gson = new Gson();
        setJson(gson.toJson(logs));
        return SUCCESS;
    }
}

package com.taobao.rigel.rap.platform.web.action;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.common.base.ActionBase;
import com.taobao.rigel.rap.common.bo.Item;
import com.taobao.rigel.rap.common.config.SystemConstant;
import com.taobao.rigel.rap.common.utils.CacheUtils;
import com.taobao.rigel.rap.common.utils.CommonUtils;
import com.taobao.rigel.rap.common.utils.SystemVisitorLog;
import com.taobao.rigel.rap.organization.bo.Corporation;
import com.taobao.rigel.rap.organization.service.OrganizationMgr;
import com.taobao.rigel.rap.platform.service.DataMgr;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlatformAction extends ActionBase {
    // private static final Logger logger = LogManager.getFormatterLogger(PlatformAction.class);
    private Gson gson = new Gson();
    private String time;
    private Map<String, List<Map<String, Object>>> trends;
    private Map<String, List<Map<String, Object>>> statistics;
    private int tabIndex;
    private ProjectMgr projectMgr;
    private List<Item> modelLog;
    private Map<String, Item> modelLogMap;
    private DataMgr dataMgr;
    private String text;

    public OrganizationMgr getOrganizationMgr() {
        return organizationMgr;
    }

    public void setOrganizationMgr(OrganizationMgr organizationMgr) {
        this.organizationMgr = organizationMgr;
    }

    private OrganizationMgr organizationMgr;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;

    public void setTime(String time) {
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
        return gson.toJson(SystemVisitorLog.getRealtimeMap("0"));
    }

    public String getRealtimeJSONByTime(String time) {
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

    public String teamLog() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/platform/teamLog.do?id=" + id);
            return LOGIN;
        }
        if (!organizationMgr.canUserAccessCorp(getCurUserId(), id)) {
            setErrMsg(ACCESS_DENY);
            return ERROR;
        }
        Corporation team = organizationMgr.getCorporation(id);
        if (team == null) {
            setErrMsg("错误的team id,请检查页面参数是否复制不完整.");
            return ERROR;
        }

        String[] cacheKey = {CacheUtils.KEY_STATISTICS_OF_TEAM, new Integer(getId()).toString()};
        String cache = CacheUtils.get(cacheKey);

        if (cache != null) {
            Map<String, Object> mapCache = CommonUtils.gson.fromJson(cache, new TypeToken<Map<String, Object>>() {
            }.getType());
            modelLogMap = (Map<String, Item>) mapCache.get("modelLogMap");
            trends = (Map<String, List<Map<String, Object>>>) mapCache.get("trends");
            statistics = (Map<String, List<Map<String, Object>>>) mapCache.get("statistics");
            modelLog = (List<Item>) mapCache.get("modelLog");
        } else {
            modelLog = new ArrayList<Item>();
            modelLogMap = new HashMap<String, Item>();
            trends = new HashMap<String, List<Map<String, Object>>>();
            statistics = new HashMap<String, List<Map<String, Object>>>();

            // statistics for RAP models
            modelLog.add(new Item("user", "" + organizationMgr.getMemberNumOfCorporation(id)));
            modelLog.add(new Item("project", "" + organizationMgr.getProjectNumOfCorporation(id)));
            modelLog.add(new Item("action", "" + organizationMgr.getActionNumOfCorporation(id)));

            for (Item item : modelLog) {
                modelLogMap.put(item.getKey(), item);
            }

            // trends data
            trends.put("user", dataMgr.getUserTrendByMonth());
            trends.put("project", dataMgr.getProjectTrendByMonth());
            trends.put("checkIn", dataMgr.getCheckInTrendByMonth());


            // statistics data
            statistics.put("top10ActionNumByTeam", dataMgr.getTop10ActionNumByTeam(id));

            Map<String, Object> mapCache = new HashMap<String, Object>();
            mapCache.put("modelLogMap", modelLogMap);
            mapCache.put("trends", trends);
            mapCache.put("statistics", statistics);
            mapCache.put("modelLog", modelLog);
            CacheUtils.put(cacheKey, CommonUtils.gson.toJson(mapCache));
        }
        return SUCCESS;
    }

    public String log() {
        if (!isUserLogined()) {
            plsLogin();
            setRelativeReturnUrl("/platform/log.do");
            return LOGIN;
        }
        String[] cacheKey = {CacheUtils.KEY_STATISTICS};
        String cache = CacheUtils.get(cacheKey);

        if (cache != null) {
            Map<String, Object> mapCache = CommonUtils.gson.fromJson(cache, new TypeToken<Map<String, Object>>() {
            }.getType());
            modelLogMap = (Map<String, Item>) mapCache.get("modelLogMap");
            trends = (Map<String, List<Map<String, Object>>>) mapCache.get("trends");
            statistics = (Map<String, List<Map<String, Object>>>) mapCache.get("statistics");
            modelLog = (List<Item>) mapCache.get("modelLog");
        } else {
            modelLog = new ArrayList<Item>();
            modelLogMap = new HashMap<String, Item>();
            trends = new HashMap<String, List<Map<String, Object>>>();
            statistics = new HashMap<String, List<Map<String, Object>>>();

            // statistics for RAP models
            modelLog.add(new Item("user", new Integer(getAccountMgr().getUserNum()).toString()));
            modelLog.add(new Item("project", new Integer(projectMgr.getProjectNum()).toString()));
            modelLog.add(new Item("action", new Integer(projectMgr.getActionNum()).toString()));

            //modelLog.add(new Item("TAB数", new Integer(projectMgr.getModuleNum()).toString()));
            //modelLog.add(new Item("页面数", new Integer(projectMgr.getPageNum()).toString()));
            //odelLog.add(new Item("参数数", new Integer(projectMgr.getParametertNum()).toString()));

            modelLog.add(new Item("checkIn", new Integer(projectMgr.getCheckInNum()).toString()));
            modelLog.add(new Item("mockNum", new Integer(projectMgr.getMockNumInTotal()).toString()));

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

            Map<String, Object> mapCache = new HashMap<String, Object>();
            mapCache.put("modelLogMap", modelLogMap);
            mapCache.put("trends", trends);
            mapCache.put("statistics", statistics);
            mapCache.put("modelLog", modelLog);
            CacheUtils.put(cacheKey, CommonUtils.gson.toJson(mapCache));
        }
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

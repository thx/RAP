package com.taobao.rigel.rap.platform.service;

import java.util.List;
import java.util.Map;

/**
 * Created by mashengbo on 14-9-5.
 */
public interface DataMgr {

    List<Map<String, Object>> getUserTrendByMonth();

    List<Map<String, Object>> getProjectTrendByMonth();

    List<Map<String, Object>> getCheckInTrendByMonth();

    List<Map<String, Object>> getActionNumByTeam();

    List<Map<String, Object>> getMockNumByProject();

    List<Map<String, Object>> getTop10ActionNumByTeam(int teamId);
}

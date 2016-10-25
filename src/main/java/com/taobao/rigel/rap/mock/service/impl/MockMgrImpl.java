package com.taobao.rigel.rap.mock.service.impl;

import com.google.gson.Gson;
import com.taobao.rigel.rap.common.config.Patterns;
import com.taobao.rigel.rap.common.config.SystemSettings;
import com.taobao.rigel.rap.common.utils.*;
import com.taobao.rigel.rap.mock.bo.Rule;
import com.taobao.rigel.rap.mock.dao.MockDao;
import com.taobao.rigel.rap.mock.service.MockMgr;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Parameter;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import nl.flotsam.xeger.Xeger;
import org.apache.logging.log4j.LogManager;
import sun.misc.Cache;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MockMgrImpl implements MockMgr {

    interface Callback {
        void onSuccess(String result);
    }

    private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(MockMgrImpl.class);
    private final String ERROR_PATTERN = "{\"isOk\":false,\"msg\":\"路径为空，请查看是否接口未填写URL.\"}";
    private final String ERROR_SEARCH = "{\"isOk\":false,\"msg\":\"请求参数不合法。\"}"; // 请查看是否含有 script、img、iframe 等标签
    private ProjectDao projectDao;
    private ProjectMgr projectMgr;
    private MockDao mockDao;
    private int uid = 10000;
    private Map<String, List<String>> requestParams;
    private boolean isMockJsData = false;
    /**
     * random seed
     */
    private int _num = 1;
    private String[] NAME_LIB = {"霍雍", "行列", "幻刺", "金台", "望天", "李牧", "三冰",
            "自勉", "思霏", "诚冉", "甘苦", "勇智", "墨汁老湿", "圣香", "定球", "征宇", "灵兮", "永盛",
            "小婉", "紫丞", "少侠", "木谦", "周亮", "宝山", "张中", "晓哲", "夜沨"};
    private String[] LOCATION_LIB = {"北京 朝阳区", "北京 海淀区", "北京 昌平区",
            "吉林 长春 绿园区", "吉林 吉林 丰满区"};
    private String[] PHONE_LIB = {"15813243928", "13884928343", "18611683243",
            "18623432532", "18611582432"};

    public static Map<String, List<String>> getUrlParameters(String url)
            throws UnsupportedEncodingException {
        Map<String, List<String>> params = new HashMap<String, List<String>>();
        String[] urlParts = url.split("\\?");
        if (urlParts.length > 1) {
            String query = urlParts[1];
            for (String param : query.split("&")) {
                String pair[] = param.split("=");
                if (pair.length == 0) {
                    continue;
                }
                String key = URLDecoder.decode(pair[0], "UTF-8");
                String value = "";
                if (pair.length > 1) {
                    value = URLDecoder.decode(pair[1], "UTF-8");
                }
                List<String> values = params.get(key);
                if (values == null) {
                    values = new ArrayList<String>();
                    params.put(key, values);
                }
                values.add(value);
            }
        }
        return params;
    }

    public MockDao getMockDao() {
        return mockDao;
    }

    public void setMockDao(MockDao mockDao) {
        this.mockDao = mockDao;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    private boolean isPatternLegal(String pattern) {
        if (pattern == null || pattern.isEmpty()) {
            return false;
        }

        String path = pattern;
        if (path.indexOf("/") == 0) {
            path = path.substring(1);
        }
        if (path.contains("?")) {
            path = path.substring(0, path.indexOf("?"));
        }
        if (path.isEmpty()) {
            return false;
        }

        return true;
    }

    private boolean isSearchLegal(String pattern) throws UnsupportedEncodingException {
        if (pattern == null || pattern.isEmpty()) {
            return true;
        }

        String search = pattern;
        if (search.contains("?")) {
            search = search.substring(search.indexOf("?"));
            search = URLDecoder.decode(search, "UTF-8");
            if(search.toLowerCase().indexOf("<img") != -1) return false;
            if(search.toLowerCase().indexOf("<script") != -1) return false;
            if(search.toLowerCase().indexOf("</script>") != -1) return false;
            if(search.toLowerCase().indexOf("<iframe") != -1) return false;
            if(search.toLowerCase().indexOf("</iframe>") != -1) return false;
        }

        return true;
    }

    public ProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }


    public String generateData(int projectId, String pattern,
                               Map<String, Object> options) throws UnsupportedEncodingException {

        if (!isPatternLegal(pattern)) {
            return ERROR_PATTERN;
        }

        _num = 1;
        String originalPattern = pattern;
        if (pattern.contains("?")) {
            pattern = pattern.substring(0, pattern.indexOf("?"));
        }

        List<Action> aList = projectMgr
                .getMatchedActionList(projectId, pattern);
        if (aList.size() == 0)
            return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";

        Action action = actionPick(aList, originalPattern, options);

        String desc = action.getDescription();
        Set<Parameter> pList = action.getResponseParameterList();

        StringBuilder json = new StringBuilder();
        String left = "{", right = "}";

        // match both @type=array && @type=array_map
        if (desc.contains("@type=array")) {
            left = "[";
            right = "]";
        }

        // for array_map.length
        String key = "@length=";
        String numStr = null;
        if (desc.contains(key)) {
            Pattern p = Pattern.compile("@length=(\\d+)");
            Matcher matcher = p.matcher(desc);
            if (matcher.find()) {
                numStr = matcher.group(1);
            }
        }
        int num = numStr == null ? 1 : Integer.parseInt(numStr);
        json.append(left);
        boolean first = true;

        boolean isArrayMap = desc.contains("@type=array_map");

        for (int i = 0; i < num; i++) {
            first = true;
            if (i > 0) {
                json.append(",");
            }
            if (isArrayMap) {
                json.append("{");
            }
            for (Parameter p : pList) {
                if (first) {
                    first = false;
                } else {
                    json.append(",");
                }
                buildJson(json, p, -1);
            }

            if (isArrayMap) {
                json.append("}");
            }
        }
        json.append(right);
        String result = json.toString();
        return resultFilter(result);
    }


    public String generateRuleData(final int projectId, String pattern,
                                   Map<String, Object> options) throws UnsupportedEncodingException {
        final String mockRule = generateRule(projectId, pattern, options);
        String returnValue = null;
        ExecutorService executor = Executors.newSingleThreadExecutor();
        try {
            Future<String> task = executor.submit(new Callable<String>() {
                public String call() throws Exception {
                    return  MockjsRunner.renderMockjsRule(mockRule);
                }
            });

            int timeout = SystemSettings.MOCK_SERVICE_TIMEOUT;
            while (true) {
                if (task.isDone()) {
                    returnValue = task.get();
                    break;
                } else if (timeout <= 0){
                    task.cancel(true);
                    logger.warn("Interrupted mock rule by pattern:" + pattern + ", projectId:" + projectId);
                    break;
                }

                Thread.sleep(100);
                timeout -= 100;
            }


        } catch (InterruptedException ex) {

        } catch (ExecutionException e) {
        } finally {
            executor.shutdownNow();
        }

        if (returnValue == null) {
            return "{\"isOk\":false, \"errMsg\":\"运行超时," + SystemSettings.MOCK_SERVICE_TIMEOUT + "毫秒都跑不完,服务器HOLD不住啊,亲的自定义函数是不是写的太夸张了啊...\"}";
        } else {
            return StringUtils.chineseToUnicode(returnValue);
        }
    }

    public String generateRuleData(int actionId) throws UnsupportedEncodingException {
        final String mockRule = generateRule(actionId, null, null);
        String returnValue = null;
        ExecutorService executor = Executors.newSingleThreadExecutor();
        try {
            Future<String> task = executor.submit(new Callable<String>() {
              public String call() throws Exception {
                  return  MockjsRunner.renderMockjsRule(mockRule);
              }
            });

            int timeout = SystemSettings.MOCK_SERVICE_TIMEOUT;
            while (true) {
                if (task.isDone()) {
                    returnValue = task.get();
                    break;
                } else if (timeout <= 0){
                    task.cancel(true);
                    logger.warn("Interrupted mock rule by actionId:" + actionId);
                    break;
                }

                Thread.sleep(100);
                timeout -= 100;
            }

        } catch (InterruptedException ex) {

        } catch (ExecutionException e) {
        } finally {
            executor.shutdownNow();
        }


       if (returnValue == null) {
            return "{\"isOk\":false, \"errMsg\":\"运行超时,3秒都跑不完,服务器HOLD不住啊,亲的自定义函数是不是写的太夸张了啊...\"}";
       } else {
           return StringUtils.chineseToUnicode(returnValue);
       }
    }


    public String validateAPI(int projectId, String pattern, Map<String, Object> options, String jsonToCompare)
            throws UnsupportedEncodingException {
        String mockjsData = generateRuleData(projectId, pattern, options);
        StringBuilder jsCode = new StringBuilder();

        jsCode
                .append(FileUtils.readFileContent(FileUtils.JS_UTIL_DIR_PATH + "mock-min.js"))
                .append(FileUtils.readFileContent(FileUtils.JS_UTIL_DIR_PATH + "structureValidator.js"))
                .append("var o1 = ")
                .append(mockjsData)
                .append(";\n")
                .append("var o2 = ")
                .append(jsonToCompare)
                .append(";\n")
                .append("var validator = new StructureValidator(o2, o1);")
                .append("JSON.stringify({result : validator.getResult(), resultStr : validator.getResultStr()});");
        return new JSRunner().run(jsCode.toString());
    }


    public String generateRule(int projectId, String pattern,
                               Map<String, Object> options) throws UnsupportedEncodingException {
        if (!isPatternLegal(pattern)) {
            return ERROR_PATTERN;
        }
        if (!isSearchLegal(pattern)) {
            return ERROR_SEARCH;
        }
        String originalPattern = pattern;
        boolean loadRule = false;
        Rule rule = null;
        if (options.get("loadRule") != null && (Boolean) options.get("loadRule") == true) {
            loadRule = true;
        }
        int actionId = 0;
        Action action;

        if (pattern == null && options == null) {
            actionId = projectId;
        }
        _num = 1;

        if (actionId > 0) {  // from OPenAPI, invoked by params(id, null, null)
            action = projectMgr.getAction(actionId);
        } else {
            if (pattern.contains("?")) {
                pattern = pattern.substring(0, pattern.indexOf("?"));
            }
            if (pattern.isEmpty()) {
                return "{\"isOk\":false, \"errMsg\":\"pattern is empty. 路径为空，请检查RAP文档中的请求链接是否正确填写。\"}";
            }
            List<Action> aList = projectMgr
                    .getMatchedActionList(projectId, pattern);
            if (aList.size() == 0) {
                return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";
            }

            action = actionPick(aList, originalPattern, options);
            if (action == null) {
                return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";
            }

            if (action.getDisableCache() == 0 && loadRule == false) {
                String ruleCache = CacheUtils.getRuleCache(action, originalPattern, false);
                if (ruleCache != null) {
                    return ruleCache;
                }
            }

        }

        if (loadRule) {
            rule = mockDao.getRule(action.getId());
        }
        String result = getMockRuleFromActionAndRule(rule, action);


        if (!loadRule) {
            CacheUtils.setRuleCache(action.getId(), result, false);
        }
        return result;
    }

    public String getMockRuleFromActionAndRule(Rule rule, Action action) {
        // rule process
        String desc = action.getDescription();
        Set<Parameter> pList = action.getResponseParameterList();
        // load mock data by Open API
        Action actionMockRules = null;

        if (rule != null && rule.getRules() != null) {
            Gson gson = new Gson();
            try {
                actionMockRules = gson.fromJson(rule.getRules(), Action.class);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        if (actionMockRules != null)
            for (Parameter p : pList) {
                recursivelyLoadMockData(p, findParamInArray(p, actionMockRules.getResponseParameterList()));
            }
        StringBuilder json = new StringBuilder();
        String left = "{", right = "}";

        // match both @type=array && @type=array_map
        if (desc.contains("@type=array")) {
            left = "[";
            right = "]";
        }

        // for array_map.length
        String key = "@length=";
        String numStr = null;
        if (desc.contains(key)) {
            Pattern p = Pattern.compile("@length=(\\d+)");
            Matcher matcher = p.matcher(desc);
            if (matcher.find()) {
                numStr = matcher.group(1);
            }
        }
        int num = numStr == null ? 1 : Integer.parseInt(numStr);
        json.append(left);
        boolean first = true;
        boolean isArrayMap = desc.contains("@type=array_map");

        for (int i = 0; i < num; i++) {
            first = true;
            if (i > 0) {
                json.append(",");
            }
            if (isArrayMap) {
                json.append("{");
            }
            for (Parameter p : pList) {
                if (first) {
                    first = false;
                } else {
                    json.append(",");
                }
                buildMockTemplate(json, p, -1);
            }

            if (isArrayMap) {
                json.append("}");
            }
        }
        json.append(right);
        String result = json.toString();
        result = resultFilter(result);
        return result;
    }

    private Parameter findParamInArray(Parameter p, Set<Parameter> list) {
        for (Parameter item : list) {
            if (item.getIdentifier().equals(p.getIdentifierWithoutMockjsRule())) {
                return item;
            }
        }
        return null;
    }

    private Action actionPick(List<Action> actionList, String pattern,
                              Map<String, Object> options) throws UnsupportedEncodingException {

        List<Action> filteredActionList = new ArrayList<Action>();

        // pattern match
        for (Action action : actionList) {
            if (URLUtils.isRelativeUrlExactlyMatch(pattern, action.getRequestUrl())) {
                filteredActionList.add(action);
            }
        }

        if (!filteredActionList.isEmpty()) {
            actionList = filteredActionList;
        }

        if (actionList == null || actionList.isEmpty()) {
            return null;
        }

        Action result = actionList.get(0);

        // request method match
        for (Action action : actionList) {
            if (options.get("method") != null &&
                    action.getMethod().equals(options.get("method").toString())) {
                result = action;
                break;
            }
        }

        requestParams = getUrlParameters(pattern);

        // schema match
        for (Action action : actionList) {
            Map<String, List<String>> docActionParams = getUrlParameters(action
                    .getRequestUrl());
            boolean hasSchema = false;
            boolean isPassed = true;
            for (String docParamKey : docActionParams.keySet()) {
                if (docParamKey.contains("[") && docParamKey.contains("]")) {
                    String docParamKeyProcessed = docParamKey.substring(1,
                            docParamKey.length() - 1);
                    List<String> list = requestParams.get(docParamKeyProcessed);
                    if (list != null && list.size() > 0) {
                        options.put("callback", list.get(0));
                    }
                }

                if (docParamKey.contains("{") && docParamKey.contains("}")) {
                    hasSchema = true;
                    String docParamKeyProcessed = docParamKey.substring(1,
                            docParamKey.length() - 1);
                    List<String> list1 = requestParams
                            .get(docParamKeyProcessed);
                    List<String> list2 = docActionParams.get(docParamKey);
                    if (list1 != null && list2 != null && list1.size() > 0
                            && list2.size() > 0
                            && list1.get(0).equals(list2.get(0))) {
                        // checked passed
                    } else {
                        isPassed = false;
                        break;
                    }
                }
            }
            if (isPassed && hasSchema) {
                return action;
            }
        }
        return result;
    }

    /**
     * for escaping separators
     *
     * @param result
     * @return
     */
    private String resultFilter(String result) {
        result = result.replaceAll("////", ";");
        return result;
    }

    private void recursivelyLoadMockData(Parameter p, Parameter pMock) {
        if (pMock != null) {
            if (pMock.getRemarkChange() != null) {
                p.setRemarkChange(pMock.getRemarkChange());
            }

            if (pMock.getIdentifierChange() != null) {
                p.setIdentifierChange(pMock.getIdentifierChange());
            }
        }

        if (p.getParameterList() == null)
            return;
        for (Parameter subP : p.getParameterList()) {
            recursivelyLoadMockData(subP, findParamInArray(subP, pMock.getParameterList()));
        }
    }

    /**
     * build JSON
     *
     * @param json  string builder
     * @param para  parameter to be parsed
     * @param index available in array<object> stands for index of array, used for
     *              special mode of tags like @format[3] which means the third
     *              record enabled only. Default value should be -1 which disabled
     *              the feature.
     */
    private void buildJson(StringBuilder json, Parameter para, int index) {
        boolean isArrayObject = para.getDataType().equals("array<object>");
        int ARRAY_LENGTH = isArrayObject ? 5 : 1;
        String[] tags = para.getRemark().split(";");
        Map<String, String> tagMap = new HashMap<String, String>();
        parseTags(tags, tagMap, false);

        // if isArray && has @value tag, directly output @value content
        if (para.getDataType().contains("array") && tagMap.get("value") != null) {
            json.append(para.getMockIdentifier() + ":" + tagMap.get("value"));
        } else {
            String length = tagMap.get("length");
            if (length != null && !length.isEmpty()) {
                ARRAY_LENGTH = Integer.parseInt(length);
            }
            if (para.getParameterList() == null
                    || para.getParameterList().size() == 0) {
                json.append(para.getMockIdentifier() + ":"
                        + mockValue(para, index));
            } else {
                // object and array<object>
                json.append(para.getMockIdentifier() + ":");
                String left = "{", right = "}";

                if (isArrayObject) {
                    left = "[";
                    right = "]";
                }
                json.append(left);
                boolean first;
                for (int i = 0; i < ARRAY_LENGTH; i++) {
                    first = true;
                    if (isArrayObject && i > 0)
                        json.append(",");
                    if (isArrayObject)
                        json.append("{");
                    for (Parameter p : para.getParameterList()) {
                        if (first) {
                            first = false;
                        } else {
                            json.append(",");
                        }
                        buildJson(json, p, i);
                    }
                    if (isArrayObject)
                        json.append("}");
                }
                json.append(right);
            }
        }
    }

    /**
     * build mock.js template
     *
     * @param json  string builder
     * @param para  parameter to be parsed
     * @param index available in array<object> stands for index of array, used for
     *              special mode of tags like @format[3] which means the third
     *              record enabled only. Default value should be -1 which disabled
     *              the feature.
     */
    private void buildMockTemplate(StringBuilder json, Parameter para, int index) {
        boolean isArrayObject = para.getDataType().equals("array<object>");
        int ARRAY_LENGTH = 1;

        if (para.getParameterList() == null
                || para.getParameterList().size() == 0 || para.hasMockJSData()) {
            json.append(processMockValueWithParams(para.getMockJSIdentifier())
                    + ":"
                    + StringUtils.chineseToUnicode(mockjsValue(para, index)));
        } else {
            // object and array<object>
            json.append(processMockValueWithParams(para.getMockJSIdentifier())
                    + ":");
            String left = "{", right = "}";

            if (isArrayObject) {
                left = "[";
                right = "]";
            }
            json.append(left);
            boolean first;
            for (int i = 0; i < ARRAY_LENGTH; i++) {
                first = true;
                if (isArrayObject && i > 0)
                    json.append(",");
                if (isArrayObject)
                    json.append("{");
                for (Parameter p : para.getParameterList()) {
                    if (first) {
                        first = false;
                    } else {
                        json.append(",");
                    }
                    buildMockTemplate(json, p, i);
                }
                if (isArrayObject)
                    json.append("}");
            }
            json.append(right);
        }

    }

    private String mockValue(Parameter para, int index) {
        String dataType = para.getDataType();
        String[] tags = para.getRemark().split(";");
        Map<String, String> tagMap = new HashMap<String, String>();
        parseTags(tags, tagMap, true);
        String returnValue = "0";

        if (dataType.equals("number")) {
            String regex = tagMap.get("regex_index");
            if (regex != null && !regex.isEmpty()) {
                // value should be like "$trueValue_INDEX_5"
                String[] arr = regex.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    regex = arr[0];
                    Xeger generator = new Xeger(regex);
                    return generator.generate();
                }
            }

            regex = tagMap.get("regex");
            if (regex != null && !regex.isEmpty()) {
                Xeger generator = new Xeger(regex);
                return generator.generate();
            }

            String value = tagMap.get("value_index");
            if (value != null && !value.isEmpty()) {
                // value should be like "$trueValue_INDEX_5"
                String[] arr = value.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    value = arr[0];
                    return value;
                }
            }
            value = tagMap.get("value");
            if (value != null && !value.isEmpty()) {
                return value;
            }

            String format = tagMap.get("format_index");
            if (format != null && !format.isEmpty()) {
                String[] arr = format.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    format = arr[0];
                    return NumberUtils.randomByFormat(format);
                }
            }
            format = tagMap.get("format");
            if (format != null && !format.isEmpty()) {
                return NumberUtils.randomByFormat(format);
            }
            return NumberUtils.randomInt10Str();
        } else if (dataType.equals("string")) {
            String regex = tagMap.get("regex_index");
            if (regex != null && !regex.isEmpty()) {
                // value should be like "$trueValue_INDEX_5"
                String[] arr = regex.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    regex = arr[0];
                    Xeger generator = new Xeger(regex);
                    return "\"" + StringUtils.escapeInJ(generator.generate())
                            + "\"";
                }
            }

            regex = tagMap.get("regex");
            if (regex != null && !regex.isEmpty()) {
                Xeger generator = new Xeger(regex);
                return "\"" + StringUtils.escapeInJ(generator.generate())
                        + "\"";
            }

            String value = tagMap.get("value_index");
            if (value != null && !value.isEmpty()) {
                String[] arr = value.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    value = arr[0];
                    if (value.contains("[name]")) {
                        return "\""
                                + NAME_LIB[NumberUtils
                                .randomInt(NAME_LIB.length)] + "\"";
                    } else if (value.contains("[location]")) {
                        return "\""
                                + LOCATION_LIB[NumberUtils
                                .randomInt(LOCATION_LIB.length)] + "\"";
                    } else if (value.contains("[phone]")) {
                        return "\""
                                + PHONE_LIB[NumberUtils
                                .randomInt(PHONE_LIB.length)] + "\"";
                    } else {
                        return "\"" + StringUtils.escapeInJ(value) + "\"";
                    }
                }
            }
            value = tagMap.get("value");
            if (value != null && !value.isEmpty()) {
                if (value.contains("[name]")) {
                    return "\""
                            + NAME_LIB[NumberUtils.randomInt(NAME_LIB.length)]
                            + "\"";
                } else if (value.contains("[location]")) {
                    return "\""
                            + LOCATION_LIB[NumberUtils
                            .randomInt(LOCATION_LIB.length)] + "\"";
                } else if (value.contains("[phone]")) {
                    return "\""
                            + PHONE_LIB[NumberUtils.randomInt(PHONE_LIB.length)]
                            + "\"";
                } else {
                    return "\"" + StringUtils.escapeInJ(value) + "\"";
                }
            }
            String format = tagMap.get("format");
            if (format != null && !format.isEmpty()) {
                return "\"" + NumberUtils.randomByFormat(format) + "\"";
            }
            return "\"测试内容\"";
        } else if (dataType.equals("boolean")) {
            String value = tagMap.get("value_index");
            if (value != null && !value.isEmpty()) {
                String[] arr = value.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    value = arr[0];
                    return value;
                }
            }
            value = tagMap.get("value");
            if (value != null && !value.isEmpty()) {
                return value;
            }
            return "true";
        } else if (dataType.equals("array<number>")) {
            String value = tagMap.get("value_index");
            if (value != null && !value.isEmpty()) {
                String[] arr = value.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    value = arr[0];
                    return "\"" + value + "\"";
                }
            }

            value = tagMap.get("value");
            if (value != null && !value.isEmpty()) {
                return "\"" + value + "\"";
            }
            List<Integer> arr = new ArrayList<Integer>();
            for (int i = 0; i < 10; i++) {
                arr.add(NumberUtils.randomInt(1000));
            }
            return ArrayUtils.join(arr, ",");
        } else if (dataType.equals("array<string>")) {
            String value = tagMap.get("value_index");
            if (value != null && !value.isEmpty()) {
                String[] arr = value.split("_INDEX_");
                int tagIndex = Integer.parseInt(arr[1]);
                if (tagIndex == index) {
                    value = arr[0];
                    return value;
                }
            }
            value = tagMap.get("value");
            if (value != null && !value.isEmpty()) {
                return value;
            }
            return "[\"测试1\", \"测试2\", \"测试3\", \"测试4\", \"测试5\"]";
        }
        return returnValue;
    }

    private String mockjsValue(Parameter para, int index) {
        String mockData = para.getRemark();
        String[] tags = mockData.split(";");
        if (mockData.contains("@mock=")) {
            tags = new String[1];
            tags[0] = mockData.substring(mockData.indexOf("@mock="));
        }
        boolean escape = true;
        Map<String, String> tagMap = new HashMap<String, String>();
        parseTags(tags, tagMap, true);
        String returnValue = "1";
        String mockValue = tagMap.get("mock");
        if (mockValue == null && mockData.contains("@mock=")) {
            mockValue = "";
        }
        if (mockValue == null || mockValue.isEmpty()) {
            String unescapeMockValue = tagMap.get("{mock}");
            if (unescapeMockValue != null && !unescapeMockValue.isEmpty()) {
                escape = false;
                mockValue = unescapeMockValue;
            }
        }

        // default mock template generation
        if (mockValue == null) {
            if (para.getDataType().isEmpty()) {
                return "1";
            } else if (para.getDataType().equals("number")) {
                return NumberUtils.randomByFormat("xxxxx");
            } else if (para.getDataType().equals("boolean")) {
                return new Boolean(NumberUtils.randomInt(10) > 5 ? true : false).toString();
            } else if (para.getDataType().equals("string")) {
                Xeger generator = new Xeger("测试内容[0-9a-z]{4}");
                return "\"" + generator.generate() + "\"";
            } else if (para.getDataType().equals("array<boolean>")) {
                return "[true, false]";
            } else if (para.getDataType().equals("array<object>") || para.getDataType().equals("array")) {
                return "[]";
            } else if (para.getDataType().equals("object")) {
                return "{}";
            }
        }

        mockValue = processMockValueWithParams(mockValue);

        if (mockValue != null && !mockValue.isEmpty()) {
            if (mockValue.startsWith("[") && mockValue.endsWith("]")) {
                return mockValue;
            } else if (mockValue.startsWith("function")) {
                return isMockJsData ? "1" : mockValue;
            } else if (mockValue.startsWith("$order")) {
                if (para.getDataType().contains("array")) {
                    return "[" + mockValue.substring(7, mockValue.length() - 1) + "]";
                } else {
                    StringBuilder orderCmdFunc = new StringBuilder();
                    orderCmdFunc
                            .append("function() {")
                            .append("   var window = function(){return this;}();")
                            .append("	function geneVal(key) {")
                            .append("		var o = __rap__context__[key];")
                            .append("		var arr = o.arr;")
                            .append("		return arr[o.index++ % arr.length];")
                            .append("	}")
                            .append("	if (!window.__rap__context__) {")
                            .append("		window.__rap__context__ = {};")
                            .append("	}")
                            .append("	var orderCmd = \"" + StringUtils.escapeInJ(mockValue) + "\";")
                            .append("	var orderArr = eval('[' + orderCmd.substring(7, orderCmd.length - 1) + ']');")
                            .append("	var key = '" + (uid++) + "';")
                            .append("	if (!__rap__context__[key]) {")
                            .append("		__rap__context__[key] = {")
                            .append("			arr : orderArr,")
                            .append("			index : 0")
                            .append("		};")
                            .append("	}")
                            .append("	return geneVal(key);")
                            .append("}");

                    return orderCmdFunc.toString();
                }
            } else if (mockValue.startsWith("@order")) {
                return "\"" + StringUtils.escapeInJ(mockValue) + "\"";
            } else if ((para.getDataType().equals("number")
                    || para.getDataType().equals("boolean"))
                    && !mockValue.startsWith("@")) {
                return mockValue;
            } else if ((para.getDataType().equals("array<number>")
                    || para.getDataType().equals("array<boolean>")
                    || para.getDataType().equals("array<string>"))) {
                String result = mockValue;
                if (para.getDataType().equals("array<string>")
                        && !result.startsWith("\"") && !result.startsWith("'")) {
                    result = "\"" + result + "\"";
                }
                return "[" + result + "]";
            } else {
                if (escape) {
                    mockValue = StringUtils.escapeInJ(mockValue);
                }
                if (mockValue.startsWith("\\\"") && mockValue.endsWith("\\\"")) {
                    return mockValue.substring(1, mockValue.length() - 2) + "\"";
                } else if (!escape) {
                    return mockValue;
                } else {
                    return "\"" + mockValue + "\"";
                }
            }
        } else if (mockValue != null && mockValue.isEmpty()
                && para.getDataType().equals("string")) {
            return "\"\"";
        } else if (para.getDataType().equals("array<string>")) {
            return "[\"string1\", \"string2\", \"string3\", \"string4\", \"string5\"]";

        } else if (para.getDataType().equals("array<number>")) {
            return "[1, 2, 3, 4, 5]";
        }
        return returnValue;
    }

    private String processMockValueWithParams(String mockValue) {

        Pattern p = Pattern.compile(Patterns.MOCK_TEMPLATE_PATTERN);
        if (mockValue == null) {
            mockValue = "";
        }
        Matcher matcher = p.matcher(mockValue);
        while (matcher.find()) {
            int c = matcher.groupCount();
            if (c >= 3) {
                String toBeReplaced = matcher.group(0);
                String key = matcher.group(1);
                String value = matcher.group(2);
                List<String> param = requestParams.get(key);
                String realValue = (param != null && param.size() > 0) ? param
                        .get(0) : null;
                if (realValue != null && !realValue.isEmpty()) {
                    mockValue = mockValue.replace(toBeReplaced, realValue);
                } else {
                    mockValue = mockValue.replace(toBeReplaced, value);
                }
            }
        }
        return mockValue;
    }

    /**
     * from tag string to tag map
     *
     * @param tags      tag string input by parsing whole string split by separator
     *                  ";"
     * @param tagMap    tag map
     * @param isMocking
     */
    private void parseTags(String[] tags, Map<String, String> tagMap,
                           boolean isMocking) {
        for (String tag : tags) {
            // tag format validation
            if (tag.startsWith("@") && tag.contains("=")) {
                String val = tag.substring(tag.indexOf("=") + 1);
                if (tag.startsWith("@value")) {
                    if (val.contains("[xx]") && isMocking) {
                        Integer n = _num++ % 31;
                        val = val.replace("[xx]", n >= 10 ? n.toString() : "0"
                                + n);
                    }
                    if (tag.contains("value[")) {
                        tagMap.put(
                                "value_index",
                                val
                                        + "_INDEX_"
                                        + tag.substring(tag.indexOf("[") + 1,
                                        tag.indexOf("]")));
                    } else {
                        tagMap.put("value", val);
                    }

                } else if (tag.startsWith("@format")) {
                    if (tag.contains("format[")) {
                        tagMap.put(
                                "format_index",
                                val
                                        + "_INDEX_"
                                        + tag.substring(tag.indexOf("[") + 1,
                                        tag.indexOf("]")));
                    } else {
                        tagMap.put("format", val);
                    }
                } else if (tag.startsWith("@length")) {
                    if (tag.contains("length[")) {
                        tagMap.put(
                                "length_index",
                                val
                                        + "_INDEX_"
                                        + tag.substring(tag.indexOf("[") + 1,
                                        tag.indexOf("]")));
                    } else {
                        tagMap.put("length", tag.split("=")[1]);
                    }
                } else if (tag.startsWith("@regex")) {
                    if (tag.contains("regex[")) {
                        tagMap.put(
                                "regex_index",
                                val
                                        + "_INDEX_"
                                        + tag.substring(tag.indexOf("[") + 1,
                                        tag.indexOf("]")));
                    } else {
                        tagMap.put("regex", val);
                    }
                } else if (tag.startsWith("@mock")) {
                    tagMap.put("mock", val);
                } else if (tag.startsWith("@{mock}")) {
                    tagMap.put("{mock}", val);
                }
            }
        }
    }


    public int modify(int actionId, String mockData) {
        Action action = projectDao.getAction(actionId);
        if (action == null)
            return 0;
        int num = 0;
        // parse mock data
        String[] mockDataSnips = mockData.split("_AND_");
        for (String snip : mockDataSnips) {
            Set<Parameter> pList = snip.startsWith("request.") ? action
                    .getRequestParameterList() : action
                    .getResponseParameterList();
            Parameter p = locateParam(pList,
                    snip.substring(snip.indexOf(".") + 1));
            if (p == null)
                continue;
            String paramMockData = snip.substring(snip.indexOf("=") + 1);
            p.setMockData(paramMockData);
            num++;
        }
        return num;
    }

    /**
     * recursively locating parameter specified in the mock data
     *
     * @param pList
     * @param snip  request.a.b.c=@xxxx => a.b.c==@xxxx (namely request. or
     *              response. removed)
     * @return
     */
    private Parameter locateParam(Set<Parameter> pList, String snip) {
        boolean hasSubParam = snip.indexOf(".") > 0
                && snip.indexOf(".") < snip.indexOf("=");
        String identifier = hasSubParam ? snip.substring(0, snip.indexOf("."))
                : snip.substring(0, snip.indexOf("="));
        for (Parameter p : pList) {
            if (p.getIdentifier().equals(identifier)) {
                return hasSubParam ? locateParam(p.getParameterList(),
                        snip.substring(snip.indexOf(".") + 1)) : p;
            }
        }
        return null;
    }


    public int reset(int projectId) {
        return projectDao.resetMockData(projectId);
    }

}

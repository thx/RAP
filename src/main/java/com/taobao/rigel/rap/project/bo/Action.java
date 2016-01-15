package com.taobao.rigel.rap.project.bo;

import com.taobao.rigel.rap.common.utils.StringUtils;

import java.util.*;

public class Action implements java.io.Serializable {

    private int id;
    private int disableCache;
    private String name;
    private String description;
    private String requestType = "1";
    private String requestUrl;
    private Set<Parameter> requestParameterList = new HashSet<Parameter>();
    private Set<Parameter> responseParameterList = new HashSet<Parameter>();
    private String responseTemplate;
    private Set<Page> pageList = new HashSet<Page>();
    private String remarks;

    public static List<Action> loadList(List<Map<String, Object>> result) {
        List<Action> list = new ArrayList<Action>();
        for (Map<String, Object> row : result) {
            Action obj = new Action();
            obj.setDescription((String) row.get("description"));
            obj.setId((Integer) row.get("id"));
            obj.setName((String) row.get("name"));
            obj.setRemarks((String) row.get("remarks"));
            obj.setRequestType((String) row.get("request_type"));
            obj.setRequestUrl((String) row.get("request_url"));
            list.add(obj);
        }
        return list;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDisableCache() {
        return disableCache;
    }

    public void setDisableCache(int disableCache) {
        this.disableCache = disableCache;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? "" : description;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        if (requestType == null || requestType == "")
            return;
        this.requestType = requestType;
    }

    public String getMethod() {
        if (this.requestType.equals("2")) {
            return "POST";
        } else if (this.requestType.equals("3")) {
            return "PUT";
        } else if (this.requestType.equals("4")) {
            return "DELETE";
        } else {
            return "GET"; // in default
        }
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl == null ? "" : requestUrl;
    }

    public void addParameter(Parameter parameter, boolean isRequest) {
        if (isRequest) {
            getRequestParameterList().add(parameter);
            parameter.getActionRequestList().add(this);
        } else {
            getResponseParameterList().add(parameter);
            parameter.getActionResponseList().add(this);
        }
    }

    public Set<Parameter> getRequestParameterList() {
        return requestParameterList;
    }

    public void setRequestParameterList(Set<Parameter> requestParameterList) {
        this.requestParameterList = requestParameterList;
    }

    public Set<Parameter> getResponseParameterList() {
        return responseParameterList;
    }

    public void setResponseParameterList(Set<Parameter> responseParameterList) {
        this.responseParameterList = responseParameterList;
    }

    public List<Parameter> getRequestParameterListOrdered() {
        Set<Parameter> parameterList = getRequestParameterList();
        List<Parameter> parameterListOrdered = new ArrayList<Parameter>();
        parameterListOrdered.addAll(parameterList);
        Collections.sort(parameterListOrdered, new ParameterComparator());
        return parameterListOrdered;
    }

    public List<Parameter> getResponseParameterListOrdered() {
        Set<Parameter> parameterList = getResponseParameterList();
        List<Parameter> parameterListOrdered = new ArrayList<Parameter>();
        parameterListOrdered.addAll(parameterList);
        Collections.sort(parameterListOrdered, new ParameterComparator());
        return parameterListOrdered;
    }

    public String getResponseTemplate() {
        return responseTemplate;
    }

    public void setResponseTemplate(String responseTemplate) {
        this.responseTemplate = responseTemplate == null ? ""
                : responseTemplate;
    }

    public Set<Page> getPageList() {
        return pageList;
    }

    public void setPageList(Set<Page> pageList) {
        this.pageList = pageList;
    }

    public void update(Action action) {
        setDescription(action.getDescription());
        setName(action.getName());
        setRequestType(action.getRequestType());
        setRequestUrl(action.getRequestUrl());
        setResponseTemplate(action.getResponseTemplate());
    }

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("{\"id\":" + getId() + ",");
        stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName())
                + "\",");
        stringBuilder.append("\"description\":\""
                + StringUtils.escapeInJ(getDescription()) + "\",");
        stringBuilder.append("\"requestType\":\"" + getRequestType() + "\",");
        stringBuilder.append("\"requestUrl\":\""
                + StringUtils.escapeInJ(getRequestUrl()) + "\",");
        stringBuilder.append("\"responseTemplate\":\""
                + StringUtils.escapeInJ(getResponseTemplate()) + "\",");
        stringBuilder.append("\"requestParameterList\":");

        stringBuilder.append("[");
        Iterator<Parameter> iterator = getRequestParameterListOrdered()
                .iterator();
        while (iterator.hasNext()) {
            stringBuilder.append(iterator.next());
            if (iterator.hasNext()) {
                stringBuilder.append(",");
            }
        }
        stringBuilder.append("],");

        stringBuilder.append("\"responseParameterList\":");

        stringBuilder.append("[");
        iterator = getResponseParameterListOrdered().iterator();
        while (iterator.hasNext()) {
            stringBuilder.append(iterator.next());
            if (iterator.hasNext()) {
                stringBuilder.append(",");
            }
        }
        stringBuilder.append("]}");
        return stringBuilder.toString();
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    /**
     * get request parameter list HTML for file exporting reason: velocity
     * doesn't support macro recursion.
     *
     * @return
     */
    public String getRequestParameterListHTML() {
        return getParameterListHTML(requestParameterList);
    }

    public String getResponseParameterListHTML() {
        return getParameterListHTML(responseParameterList);
    }

    private String getParameterListHTML(Set<Parameter> list) {
        StringBuilder html = new StringBuilder();
        html
                .append("<table class=\"param-table\">")
                .append("<thead>")
                .append("<th class=\"th-name\">Name</th>")
                .append("<th class=\"th-identifier\">Identifier</th>")
                .append("<th class=\"th-type\">Type</th>")
                .append("<th class=\"th-remark\">Remark</th>")
                .append("</thead>");
        getParameterListHTMLSub(html, list, (short) 1);
        html.append("</table>");
        return html.toString();
    }

    private void getParameterListHTMLSub(StringBuilder html, Set<Parameter> list, short level) {
        for (Parameter p : list) {
            html
                    .append("<tr class=\"tr-level-" + level + "\">")
                    .append("<td class=\"td-name\">" + levelMark(level) + StringUtils.escapeInH(p.getName()) + "</td>")
                    .append("<td class=\"td-identifier\">" + StringUtils.escapeInH(p.getIdentifier()) + "</td>")
                    .append("<td class=\"td-type\">" + StringUtils.escapeInH(p.getDataType()) + "</td>")
                    .append("<td class=\"td-remark\">" + StringUtils.escapeInH(p.getRemark()) + "</td>")
                    .append("</tr>");
            if (p.getParameterList() != null || p.getParameterList().size() > 0) {
                getParameterListHTMLSub(html, p.getParameterList(), (short) (level + 1));
            }
        }

    }

    /**
     * level 1: level 2:--- level 3:------ ...
     *
     * @param level started from 1
     * @return
     */
    private String levelMark(short level) {
        StringBuilder sb = new StringBuilder();
        for (short i = 1; i < level; i++) {
            sb.append("---");
        }
        return sb.toString();
    }

    public String getRequestUrlRel() {
        String url = this.requestUrl;
        if (url == null || url.isEmpty()) {
            return "xxxxxxxxxxxxxxxxEMPTY URLxxxxxxxxxxxxxxxxx";
        }
        if (url.contains("https://")) {
            url = url.substring(url.indexOf("/", 7));
        } else if (url.contains("http://")) {
            url = url.substring(url.indexOf("/", 8));
        }
        return url;
    }

    public enum TYPE {REQUEST, RESPONSE}

}

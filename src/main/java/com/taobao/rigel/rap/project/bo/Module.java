package com.taobao.rigel.rap.project.bo;

import com.taobao.rigel.rap.common.utils.StringUtils;

import java.util.*;

public class Module implements java.io.Serializable {

    private int id;
    private int projectId;
    private String name;
    private String introduction;
    private Project project;
    private Set<Page> pageList = new HashSet<Page>();

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProjectId() {
        return this.projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduction() {
        return this.introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = (introduction == null ? "" : introduction);
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void addPage(Page page) {
        getPageList().add(page);
        page.setModule(this);
    }

    public Set<Page> getPageList() {
        return this.pageList;
    }

    public void setPageList(Set<Page> pageList) {
        this.pageList = pageList;
    }

    public List<Page> getPageListOrdered() {
        Set<Page> pageList = getPageList();
        List<Page> pageListOrdered = new ArrayList<Page>();
        pageListOrdered.addAll(pageList);
        Collections.sort(pageListOrdered, new PageComparator());
        return pageListOrdered;
    }

    public void update(Module module) {
        setIntroduction(module.getIntroduction());
        setName(module.getName());
    }

    public String toString() {

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("{\"id\":" + getId() + ",");
        stringBuilder.append("\"introduction\":\"" + StringUtils.escapeInJ(getIntroduction()) + "\",");
        stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\",");
        stringBuilder.append("\"pageList\":");

        stringBuilder.append("[");
        Iterator<Page> iterator = getPageListOrdered().iterator();
        while (iterator.hasNext()) {
            stringBuilder.append(iterator.next());
            if (iterator.hasNext()) {
                stringBuilder.append(",");
            }
        }
        stringBuilder.append("]}");

        return stringBuilder.toString();
    }

    public String toString(Project.TO_STRING_TYPE type) {

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("{\"id\":" + getId() + ",");
        stringBuilder.append("\"introduction\":\"" + StringUtils.escapeInJ(getIntroduction()) + "\",");
        stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName()) + "\",");
        stringBuilder.append("\"pageList\":");

        stringBuilder.append("[");
        Iterator<Page> iterator = getPageListOrdered().iterator();
        while (iterator.hasNext()) {
            stringBuilder.append(iterator.next().toString(type));
            if (iterator.hasNext()) {
                stringBuilder.append(",");
            }
        }
        stringBuilder.append("]}");

        return stringBuilder.toString();
    }
}

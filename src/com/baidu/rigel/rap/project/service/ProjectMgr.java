package com.baidu.rigel.rap.project.service;

import java.util.List;

import com.baidu.rigel.rap.account.bo.User;
import com.baidu.rigel.rap.project.bo.Module;
import com.baidu.rigel.rap.project.bo.Page;
import com.baidu.rigel.rap.project.bo.Project;

public interface ProjectMgr {
	
	List<Project> getProjectList(User user, int curPageNum, int pageSize);
	
	int addProject(Project project);
	
	int removeProject(int id);
	
	int updateProject(Project project);
	
	Project getProject(int id);
	
	Module getModule(int id);
	
	Page getPage(int id);
	
	String updateProject(int id, String projectData, String deletedObjectListData);

	long getProjectListNum(User user);
}

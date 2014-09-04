package com.taobao.rigel.rap.platform.web.action;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import com.taobao.rigel.rap.common.Item;
import com.taobao.rigel.rap.project.service.ProjectMgr;
import org.apache.commons.io.IOUtils;

import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.SystemConstant;

import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class PlatformAction extends ActionBase {

    private static final Logger logger = LogManager.getFormatterLogger(PlatformAction.class.getName());

	private static final long serialVersionUID = 1L;

    private int tabIndex;

    public int getTabIndex() {
        return tabIndex;
    }

    public void setTabIndex(int tabIndex) {
        this.tabIndex = tabIndex;
    }

    private ProjectMgr projectMgr;
    private List<Item> modelLog = new ArrayList<Item>();

    public List<Item> getModelLog() {
        return modelLog;
    }

    public void setProjectMgr(ProjectMgr projectMgr) {
        this.projectMgr = projectMgr;
    }

    public ProjectMgr getProjectMgr() {
        return projectMgr;
    }

    private String text;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String home() {
		return SUCCESS;
	}

	public String document() {
		return SUCCESS;
	}

	public String about() {
		return SUCCESS;
	}

	public String status() {
		return SUCCESS;
	}
	
	public String test() {
		return SUCCESS;
	}

	public String help() throws IOException {
		FileInputStream inputStream = new FileInputStream(SystemConstant.README_PATH);
		InputStreamReader reader = new InputStreamReader(inputStream, "UTF8");
	    try {
	        text = IOUtils.toString(reader);
	    } finally {
	        inputStream.close();
	    }
		return SUCCESS;
	}

    public String log() {
        modelLog.add(new Item("用户数 User Count", new Long(getAccountMgr().getUserNum()).toString()));
        modelLog.add(new Item("项目数 Project Count", new Long(projectMgr.getProjectNum()).toString()));
        modelLog.add(new Item("接口数 Action Count", new Long(projectMgr.getActionNum()).toString()));

        modelLog.add(new Item("TAB数 Module Count", new Long(projectMgr.getModuleNum()).toString()));
        modelLog.add(new Item("页面数 Page Count", new Long(projectMgr.getPageNum()).toString()));
        modelLog.add(new Item("参数数 Parameter Count", new Long(projectMgr.getParametertNum()).toString()));
        modelLog.add(new Item("文档提交数 CheckIn Count", new Long(projectMgr.getCheckInNum()).toString()));
        return SUCCESS;
    }
}

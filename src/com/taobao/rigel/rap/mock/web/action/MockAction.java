package com.taobao.rigel.rap.mock.web.action;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.mock.service.MockMgr;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Module;
import com.taobao.rigel.rap.project.bo.Page;
import com.taobao.rigel.rap.project.bo.Project;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class MockAction extends ActionBase {

	private static final long serialVersionUID = 1L;
	private int id;
	private String pattern;
	private String mockData;
	private int actionId;
	private int projectId;
	private String content;
	private String callback;
	private String _c;
	private ProjectMgr projectMgr;
	private List<String> urlList;

	public List<String> getUrlList() {
		return urlList;
	}

	public void setUrlList(List<String> urlList) {
		this.urlList = urlList;
	}

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	public void setMockData(String mockData) {
		this.mockData = mockData;
	}

	public void setActionId(int actionId) {
		this.actionId = actionId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String get_c() {
		return callbackFilter(_c);
	}

	public void set_c(String _c) {
		this._c = _c;;
	}

	public String getCallback() {
		return callbackFilter(callback);
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}

	private MockMgr mockMgr;

	public MockMgr getMockMgr() {
		return mockMgr;
	}

	public void setMockMgr(MockMgr mockMgr) {
		this.mockMgr = mockMgr;
	}

	public String getContent() {
		return content;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPattern() {
		return pattern;
	}
	
	private String callbackFilter(String cb) {
		if (cb == null) {
			return "callback";
		}
		if (cb.contains("_c=")) {
			int startIndex = cb.indexOf("_c=") + 3;
			int endIndex = cb.indexOf("&", startIndex);
			if (endIndex == -1) endIndex = cb.length();
			cb = cb.substring(startIndex, endIndex);
			return cb;
		}
		if (cb.contains("&")) {
			cb = cb.substring(0, cb.indexOf("&"));
		}
		
		return cb;
	}

	/**
	 * force callback or _c to be the last parameter
	 * 
	 * @param pattern
	 */
	public void setPattern(String pattern) {
		this.pattern = pattern;
		if (pattern != null) {
			if (pattern.indexOf("callback") != -1) {
				_c = pattern.substring(pattern.indexOf("callback") + 9);
			} else if (pattern.indexOf("_c") != -1) {
				_c = pattern.substring(pattern.indexOf("_c") + 3);
			}
		}
	}

	public String createData() throws UnsupportedEncodingException {
		String _c = get_c();
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + mockMgr.generateData(id, pattern) + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + mockMgr.generateData(id, pattern) + ")");
		} else {
			setContent(mockMgr.generateData(id, pattern));
		}
		return SUCCESS;
	}
	
	public String createRule() throws UnsupportedEncodingException {
		String _c = get_c();
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + mockMgr.generateRule(id, pattern) + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + mockMgr.generateRule(id, pattern) + ")");
		} else {
			setContent(mockMgr.generateRule(id, pattern));
		}
		return SUCCESS;
	}

	public String modify() {
		setNum(mockMgr.modify(actionId, mockData));
		return SUCCESS;
	}

	public String reset() {
		setNum(mockMgr.reset(projectId));
		return SUCCESS;
	}
	
	public String createPluginScript() {
		List<String> list = new ArrayList<String>();
		Project p = projectMgr.getProject(projectId);
		if (p != null) {
			for (Module m : p.getModuleList()) {
				for (Page page : m.getPageList()) {
					for (Action a : page.getActionList()) {
						list.add(a.getRequestUrlRel());
					}
				}
			}
		}
		urlList = list;
		return SUCCESS;
	}
	
	public String createMockjsData() throws UnsupportedEncodingException {
		String _c = get_c();
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + mockMgr.generateRuleData(id, pattern) + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + mockMgr.generateRuleData(id, pattern) + ")");
		} else {
			setContent(mockMgr.generateRuleData(id, pattern));
		}
		return SUCCESS;
	}
}

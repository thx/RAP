package com.taobao.rigel.rap.mock.web.action;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.Logger;
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
		return _c;
	}

	public void set_c(String _c) {
		this._c = _c;
	}

	public String getCallback() {
		return callback;
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

	/**
	 * force callback or _c to be the last parameter
	 * 
	 * @param pattern
	 */
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String createData() throws UnsupportedEncodingException {
		boolean isJSON = false;
		Logger.mock();
		Map<String, Object> options = new HashMap<String, Object>();
		String _c = get_c();
		String result = mockMgr.generateData(id, pattern, options);
		if (options.get("callback") != null) {
			_c = (String) options.get("callback");
			callback = (String) options.get("callback");
		}

		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + result + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + result + ")");
		} else {
			isJSON = true;
			setContent(result);
		}
		if (isJSON) {
			return "json";
		} else {
			return SUCCESS;
		}
	}

	public String createRule() throws UnsupportedEncodingException {
		boolean isJSON = false;
		Logger.mock();
		Map<String, Object> options = new HashMap<String, Object>();
		String _c = get_c();
		String result = mockMgr.generateRule(id, pattern, options);
		if (options.get("callback") != null) {
			_c = (String) options.get("callback");
			callback = (String) options.get("callback");
		}
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + result + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + result + ")");
		} else {
			isJSON = true;
			setContent(result);
		}
		if (isJSON) {
			return "json";
		} else {
			return SUCCESS;
		}
	}
	
	public String createRuleByActionData() throws UnsupportedEncodingException {
		boolean isJSON = false;
		Logger.mock();
		Map<String, Object> options = new HashMap<String, Object>();
		String _c = get_c();
		String result = mockMgr.generateRule(id, pattern, options);
		if (options.get("callback") != null) {
			_c = (String) options.get("callback");
			callback = (String) options.get("callback");
		}
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + result + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + result + ")");
		} else {
			isJSON = true;
			setContent(result);
		}
		if (isJSON) {
			return "json";
		} else {
			return SUCCESS;
		}
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
		Logger.mock();
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
		boolean isJSON = false;
		Logger.mock();
		String _c = get_c();
		Map<String, Object> options = new HashMap<String, Object>();
		String result = mockMgr.generateRuleData(id, pattern, options);
		if (options.get("callback") != null) {
			_c = (String) options.get("callback");
			callback = (String) options.get("callback");
		}
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + result + ")");
		} else if (_c != null && !_c.isEmpty()) {
			setContent(_c + "(" + result + ")");
		} else {
			isJSON = true;
			setContent(result);
		}
		
		if (isJSON) {
			return "json";
		} else {
			return SUCCESS;
		}

	}
}

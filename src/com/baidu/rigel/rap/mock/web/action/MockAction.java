package com.baidu.rigel.rap.mock.web.action;

import com.baidu.rigel.rap.common.ActionBase;
import com.baidu.rigel.rap.mock.service.MockMgr;

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

	public String createData() {
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

	public String modify() {
		setNum(mockMgr.modify(actionId, mockData));
		return SUCCESS;
	}

	public String reset() {
		setNum(mockMgr.reset(projectId));
		return SUCCESS;
	}
}

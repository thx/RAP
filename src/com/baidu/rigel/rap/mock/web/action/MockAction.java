package com.baidu.rigel.rap.mock.web.action;

import com.baidu.rigel.rap.common.ActionBase;
import com.baidu.rigel.rap.mock.service.MockMgr;

public class MockAction extends ActionBase {

	private static final long serialVersionUID = 1L;
	private int id;
	private String pattern;
	private String content;
	private String callback;

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

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String createData() {
		if (callback != null && !callback.isEmpty()) {
			setContent(callback + "(" + mockMgr.generateData(id, pattern) + ")");
		} else {
			setContent(mockMgr.generateData(id, pattern));
		}
		return SUCCESS;
	}
}

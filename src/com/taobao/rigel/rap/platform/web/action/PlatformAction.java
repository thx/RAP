package com.taobao.rigel.rap.platform.web.action;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.commons.io.IOUtils;

import com.taobao.rigel.rap.common.ActionBase;
import com.taobao.rigel.rap.common.SystemConstant;
import org.apache.commons.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class PlatformAction extends ActionBase {

    private static final Logger logger = LogManager.getFormatterLogger(PlatformAction.class.getName());

	private static final long serialVersionUID = 1L;

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
}

package com.taobao.rigel.rap.common;

public class RapError {
	public static final int ERR_HAS_CHILDREN = 501;

	public RapError() {

	}

	public RapError(String result) {
		this.result = result;
	}

	public RapError(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	private int code = 200;
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	private String msg = "";
	private String result = "";

	public String getResult() {
		if (result == null || result.isEmpty()) {
			return "\"\"";
		}
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String toString() {
		return "{\"code\":" + getCode() + ", \"msg\":\"" + getMsg() + "\", \"result\":"
				+ getResult() + "}";
	}

}

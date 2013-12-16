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
	private String msg = "";
	private String result = "";

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String toString() {
		return "{\"code\":" + this.code + ", \"msg\":\"" + msg + "\", \"result\":"
				+ this.result + "}";
	}

}

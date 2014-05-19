package com.taobao.rigel.rap.account.bo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class Notification {
	private long id;
	private long userId;
	private short typeId;
	private String param1;
	private String param2;
	private String param3;
	private Date createTime;
	private boolean isRead;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public short getTypeId() {
		return typeId;
	}

	public void setTypeId(short typeId) {
		this.typeId = typeId;
	}

	public String getParam1() {
		return param1;
	}

	public void setParam1(String param1) {
		this.param1 = param1;
	}

	public String getParam2() {
		return param2;
	}

	public void setParam2(String param2) {
		this.param2 = param2;
	}

	public String getParam3() {
		return param3;
	}

	public void setParam3(String param3) {
		this.param3 = param3;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public boolean isRead() {
		return isRead;
	}

	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	public static List<Notification> loadList(List<Map<String, Object>> result) {
		List<Notification> list = new ArrayList<Notification>();
		for (Map<String, Object> row : result) {
			Notification obj = new Notification();
			obj.setId((Long)row.get("id"));
			obj.setUserId((Long)row.get("user_id"));
			obj.setTypeId((Short)row.get("type_id"));
			obj.setParam1((String)row.get("param1"));
			obj.setParam1((String)row.get("param2"));
			obj.setParam1((String)row.get("param3"));
			obj.setCreateTime((Date)row.get("create_time"));
			obj.setRead((Short)row.get("is_read") == 1);
			list.add(obj);
		}
		return list;
	}

}

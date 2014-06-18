package com.taobao.rigel.rap.account.bo;

import java.util.Date;
import java.util.Locale;

import org.ocpsoft.prettytime.PrettyTime;

public class Notification {
	private long id;
	private long userId;
	private long targetUserId;
	public long getTargetUserId() {
		return targetUserId;
	}

	public void setTargetUserId(long targetUserId) {
		this.targetUserId = targetUserId;
	}

	private short typeId;
	private String param1;
	private String param2;
	private String param3;
	private Date createTime;
	private boolean isRead;
	
	
	public String getCreateTimeStr() {
		PrettyTime p = new PrettyTime(new Locale("zh"));
		return p.format(this.createTime);
	}

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
	
	private User user;
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	private User targetUser;


	public User getTargetUser() {
		return targetUser;
	}

	public void setTargetUser(User targetUser) {
		this.targetUser = targetUser;
	}
	


}

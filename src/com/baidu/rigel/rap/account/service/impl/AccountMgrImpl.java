package com.baidu.rigel.rap.account.service.impl;

import java.util.List;

import com.baidu.rigel.rap.account.bo.User;
import com.baidu.rigel.rap.account.dao.AccountDao;
import com.baidu.rigel.rap.account.service.AccountMgr;

public class AccountMgrImpl implements AccountMgr {

	private AccountDao accountDao;
	
	public AccountDao getAccountDao() {
		return accountDao;
	}
	
	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}
	
	@Override
	public boolean validate(String account, String password) {
		return accountDao.validate(account, password);
	}

	@Override
	public boolean addUser(User user) {
		return accountDao.addUser(user);
	}

	@Override
	public boolean changePassword(String account, String oldPassword,
			String newPassword) {
		return accountDao.changePassword(account, oldPassword, newPassword);
	}

	@Override
	public User getUser(long userId) {
		return accountDao.getUser(userId);
	}

	@Override
	public User getUser(String account) {
		return accountDao.getUser(account);
	}

	@Override
	public long getUserId(String account) {
		return accountDao.getUserId(account);
	}

	@Override
	public void changeProfile(long userId, String profileProperty,
			String profileValue) {
		accountDao.changeProfile(userId, profileProperty, profileValue);
		
	}

	@Override
	public boolean updateProfile(long userId, String name, String email, String password,
			String newPassword) {
		return accountDao.updateProfile(userId, name, email, password, newPassword);
	}

	@Override
	public List<User> getUserList() {
		return accountDao.getUserList();
	}

}

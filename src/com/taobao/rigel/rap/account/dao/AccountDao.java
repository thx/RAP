package com.taobao.rigel.rap.account.dao;

import java.util.List;

import com.taobao.rigel.rap.account.bo.User;

public interface AccountDao {

	boolean validate(String account, String password);

	boolean addUser(User user);

	User getUser(long userId);

	User getUser(String account);

	boolean changePassword(String account, String oldPassword,
			String newPassword);

	long getUserId(String account);

	void changeProfile(long userId, String profileProperty, String profileValue);

	boolean updateProfile(long userId, String name, String email,
			String password, String newPassword);

	List<User> getUserList();

	void _changePassword(String account, String password);

	/**
	 * get user by name
	 * 
	 * @param name
	 * @return
	 */
	User getUserByName(String name);

}

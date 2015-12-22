package com.taobao.rigel.rap.account.dao;

import java.util.List;
import java.util.Map;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;

public interface AccountDao {

	/**
	 * password validator
	 * 
	 * @param account
	 * @param password
	 * @return
	 */
	boolean validate(String account, String password);

	/**
	 * create new user
	 * 
	 * @param user
	 * @return
	 */
	boolean addUser(User user);

	/**
	 * get user by user id
	 * 
	 * @param userId
	 * @return
	 */
	User getUser(long userId);

	/**
	 * get user by account
	 * 
	 * @param account
	 * @return
	 */
	User getUser(String account);

	/**
	 * change password
	 * 
	 * @param account
	 * @param oldPassword
	 * @param newPassword
	 * @return
	 */
	boolean changePassword(String account, String oldPassword,
			String newPassword);

	/**
	 * get user id by account
	 * 
	 * @param account
	 * @return
	 */
	long getUserId(String account);

	/**
	 * change profile
	 * 
	 * @param userId
	 * @param profileProperty
	 * @param profileValue
	 */
	void changeProfile(long userId, String profileProperty, String profileValue);

	/**
	 * update profile
	 * 
	 * @param userId
	 * @param name
	 * @param email
	 * @param password
	 * @param newPassword
	 * @return
	 */
	boolean updateProfile(long userId, String name, String email,
			String password, String newPassword);

	/**
	 * get user list
	 * 
	 * @return
	 */
	List<User> getUserList();

	/**
	 * change password
	 * 
	 * @param account
	 * @param password
	 */
	void _changePassword(String account, String password);

	/**
	 * get user by name
	 * 
	 * @param name
	 * @return
	 */
	User getUserByName(String name);

	/**
	 * get all user settings
	 * 
	 * @param userId
	 * @return
	 */
	Map<String, String> getUserSettings(long userId);

	/**
	 * get user setting by key
	 * 
	 * @param userId
	 * @param key
	 * @return
	 */
	String getUserSetting(long userId, String key);

	/**
	 * update user setting if setting not exists, add it.
	 * 
	 * @param userId
	 * @param key
	 * @param value
	 * @return
	 */
	void updateUserSetting(long userId, String key, String value);

	/**
	 * get notifications
	 * 
	 * @param userId
	 * @return
	 */
	List<Notification> getNotificationList(long userId);

	/**
	 * remove user's notifications
	 * 
	 * @param userId
	 */
	void clearNotificationList(long userId);

	/**
	 * add new notification
	 * 
	 * @param notification
	 */
	void addNotification(Notification notification);

	/**
	 * read notification
	 * 
	 * @param id
	 */
	void readNotification(long id);

	/**
	 * read all notifications of specific user
	 * 
	 * @param userId
	 */
	void readNotificationList(long userId);

	/**
	 * get unread notification list
	 * 
	 * @param curUserId
	 * @return
	 */
	List<Notification> getUnreadNotificationList(long curUserId);

	/**
	 * check if similar notification exists
	 * 
	 * @param notification
	 * @return
	 */
	boolean notificationExists(Notification notification);

    long getUsertNum();

    public void updateUser(User user);

	/**
	 * get user id list of team
	 *
	 * @param teamId
	 * @return
	 */
	List<Integer> getUserIdList(int teamId);

}

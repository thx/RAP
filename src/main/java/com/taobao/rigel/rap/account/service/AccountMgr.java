package com.taobao.rigel.rap.account.service;

import java.util.List;
import java.util.Map;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.organization.bo.Corporation;

public interface AccountMgr {

	/**
	 * login operation double MD5 check before validation
	 * 
	 * @param account
	 *            the user name
	 * @param password
	 *            the password
	 * @return return true if succeed, otherwise return false
	 */
	boolean validate(String account, String password);

	/**
	 * add new user
	 * 
	 * @param user
	 * @return return true if succeed, otherwise return false
	 */
	boolean addUser(User user);

	/**
	 * get user by userId
	 * 
	 * @param userId
	 * @return return null if the user doesn't exist, or return the reference of
	 *         user
	 */
	User getUser(long userId);

	/**
	 * get all users
	 * 
	 * @return user list
	 */
	List<User> getUserList();

	/**
	 * get users of team
	 *
	 * @param teamId
	 * @return
	 */
	List<User> getUserList(int teamId);

	/**
	 * get user by account
	 * 
	 * @param userId
	 * @return return null if the user doesn't exist, or return the reference of
	 *         user
	 */
	User getUser(String account);

	/**
	 * change password
	 * 
	 * @param account
	 * @param oldPassword
	 * @param newPassword
	 * @return return true if succeed, otherwise return false
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
	 * change profile of user
	 * 
	 * @param userId
	 *            current user id
	 * @param profileProperty
	 *            profile property
	 * @param profileValue
	 *            profile property value
	 */
	void changeProfile(long userId, String profileProperty, String profileValue);

	/**
	 * update profile
	 * 
	 * @param name
	 * @param email
	 * @param password
	 *            this will be null if user do not want to change password
	 * @param newPassword
	 * @return
	 */
	boolean updateProfile(long userId, String name, String email,
			String password, String newPassword);

	/**
	 * used for system adjust ignore MD5 check or process
	 * 
	 * @param account
	 * @param password
	 */
	void _updatePassword(String account, String password);

	/**
	 * get corporation list
	 * 
	 * @return
	 */
	List<Corporation> getCorporationList();

    List<Corporation> getCorporationListWithPager(long userId, int pageNum, int pageSize);

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
	 * update user setting
	 * if setting not exists, add it.
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
	 * user access validation
	 * 
	 * @param userId
	 * @param projectId
	 * @return
	 */
	boolean canUserManageProject(long userId, int projectId);

    long getUserNum();

    void updateUser(User user);

    /**
     * validate password format
     *
     * @param password
     * @return null if legal, otherwise return error message
     */
    String validatePasswordFormat(String password);


}

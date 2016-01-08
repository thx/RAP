package com.taobao.rigel.rap.account.dao;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;

import java.util.List;
import java.util.Map;

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
    User getUser(int userId);

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
    int getUserId(String account);

    /**
     * change profile
     *
     * @param userId
     * @param profileProperty
     * @param profileValue
     */
    void changeProfile(int userId, String profileProperty, String profileValue);

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
    boolean updateProfile(int userId, String name, String email,
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
    Map<String, String> getUserSettings(int userId);

    /**
     * get user setting by key
     *
     * @param userId
     * @param key
     * @return
     */
    String getUserSetting(int userId, String key);

    /**
     * update user setting if setting not exists, add it.
     *
     * @param userId
     * @param key
     * @param value
     * @return
     */
    void updateUserSetting(int userId, String key, String value);

    /**
     * get notifications
     *
     * @param userId
     * @return
     */
    List<Notification> getNotificationList(int userId);

    /**
     * remove user's notifications
     *
     * @param userId
     */
    void clearNotificationList(int userId);

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
    void readNotification(int id);

    /**
     * read all notifications of specific user
     *
     * @param userId
     */
    void readNotificationList(int userId);

    /**
     * get unread notification list
     *
     * @param curUserId
     * @return
     */
    List<Notification> getUnreadNotificationList(int curUserId);

    /**
     * check if similar notification exists
     *
     * @param notification
     * @return
     */
    boolean notificationExists(Notification notification);

    int getUsertNum();

    public void updateUser(User user);

    /**
     * get user id list of team
     *
     * @param teamId
     * @return
     */
    List<Integer> getUserIdList(int teamId);

}

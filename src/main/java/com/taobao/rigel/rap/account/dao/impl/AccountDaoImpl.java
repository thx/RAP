package com.taobao.rigel.rap.account.dao.impl;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.common.SystemSettings;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.*;

public class AccountDaoImpl extends HibernateDaoSupport implements AccountDao {

    public boolean validate(String account, String password) {
        try {
            User user = getSession()
                    .load(User.class, getUserId(account));
            return user != null && user.getPassword().equals(password);
        } catch (ObjectNotFoundException ex) {
            return false;
        }
    }

    public long getUsertNum() {
        String sql = "SELECT COUNT(*) FROM tb_user";
        Query query = getSession().createSQLQuery(sql);
        return Long.parseLong(query.uniqueResult().toString());
    }

    public boolean addUser(User user) {
        user.setLastLoginDate(new Date());
        user.setCreateDate(new Date());
        user.setRealname("");
        getSession().save(user);
        return true;
    }

    public boolean changePassword(String account, String oldPassword,
                                  String newPassword) {
        Session session = getSession();
        User user = (User) session.load(User.class, getUserId(account));
        if (user == null || !user.getPassword().equals(oldPassword)) {
            return false;
        } else {
            user.setPassword(newPassword);
            session.update(user);
            return true;
        }
    }

    /**
     * get user id
     *
     * @param account
     * @return return -1 if the user doesn't exist, otherwise return id of user
     */
    public long getUserId(String account) {
        Query q = getSession()
                .createQuery("from User where account = :account");
        q.setString("account", account);
        User user = (User) q.uniqueResult();
        return user == null ? -1 : user.getId();
    }

    public User getUserByName(String name) {
        Query q = getSession().createQuery("from User where name = :name");
        q.setString("name", name);
        User user = (User) q.uniqueResult();
        return user;
    }

    public User getUser(long userId) {
        User user = (User) getSession().get(User.class, userId);
        return user;
    }

    public User getUser(String account) {
        return getUser(getUserId(account));
    }

    public void changeProfile(long userId, String profileProperty,
                              String profileValue) {
        User user = (User) getSession().load(User.class, userId);
        if (profileProperty.equals("isHintEnabled")) {
            user.setIsHintEnabled(profileValue.equals("true") ? true : false);
        }
    }

    public boolean updateProfile(long userId, String name, String email,
                                 String password, String newPassword) {
        User user = (User) getSession().load(User.class, userId);
        if (name != null && !name.equals(""))
            user.setName(name);
        if (email != null && !email.equals(""))
            user.setEmail(email);
        if (password != null && !password.equals("")) {
            if (password == null || newPassword == null || password.isEmpty() || newPassword.isEmpty()) {
                // password is not changed.
            } else if (user.getPassword().equals(password)) {
                user.setPassword(newPassword);
            } else {
                // only when user input old password, and the password is
                // incorrect, return false
                return false;
            }
        }
        return true;
    }

    public void updateUser(User user) {
        getSession().update(user);
    }

    public List<Integer> getUserIdList(int teamId) {
        String sql = "SELECT user_id FROM tb_corporation_and_user WHERE corporation_id = :teamId";
        Query query = getSession().createSQLQuery(sql);
        query.setInteger("teamId", teamId);
        return query.list();
    }

    public List<User> getUserList() {
        return getSession().createQuery("from User").list();
    }

    public void _changePassword(String account, String password) {
        Session session = getSession();
        User user = (User) session.load(User.class, getUserId(account));
        if (user != null) {
            user.setPassword(password);
            session.update(user);
        }

    }

    public Map<String, String> getUserSettings(long userId) {
        String sql = "SELECT `key`, `value` FROM tb_user_settings WHERE user_id = :userId";
        Query query = getSession().createSQLQuery(sql);
        query.setLong("userId", userId);
        List result = query.list();
        Map<String, String> settings = new HashMap<String, String>();

        for (ListIterator iter = result.listIterator(); iter.hasNext(); ) {
            Object[] row = (Object[]) iter.next();
            settings.put(row[0].toString(), row[1].toString());
        }

        return settings;
    }


    public String getUserSetting(long userId, String key) {
        String sql = "SELECT `value` FROM tb_user_settings WHERE user_id = :userId AND `key` = :key";
        Query query = getSession().createSQLQuery(sql);
        query.setLong("userId", userId);
        query.setString("key", key);
        List result = query.list();
        if (result.size() > 0) {
            return result.get(0).toString();
        }

        return SystemSettings.GET_DEFAULT_USER_SETTINGS(key);
    }


    public void updateUserSetting(long userId, String key, String value) {
        if (getUserSetting(userId, key) == null) {
            addUserSetting(userId, key, value);
            return;
        }

        String sql = "UPDATE tb_user_settings SET `value` = :value WHERE user_id = :userId AND `key` = :key";
        Query query = getSession().createSQLQuery(sql);
        query.setString("value", value);
        query.setLong("userId", userId);
        query.setString("key", key);
        query.executeUpdate();
    }

    private void addUserSetting(long userId, String key, String value) {
        String sql = "INSERT INTO tb_user_settings (user_id, `key`, `value`) VALUES (:userId, :key, :value)";
        Query query = getSession().createSQLQuery(sql);
        query.setLong("userId", userId);
        query.setString("key", key);
        query.setString("value", value);
        query.executeUpdate();
    }


    public List<Notification> getNotificationList(long userId) {
        String hql = "from Notification n where n.user.id = :userId order by n.createTime desc";
        Query query = getSession().createQuery(hql).setLong("userId", userId);
        return query.list();
    }


    public List<Notification> getUnreadNotificationList(long userId) {
        String hql = "from Notification n where n.user.id = :userId and read = false order by n.createTime desc";
        Query query = getSession().createQuery(hql).setLong("userId", userId);
        return query.list();
    }


    public void clearNotificationList(long userId) {
        String hql = "delete Notification where user.id = :userId";
        getSession().createQuery(hql).setLong("userId", userId).executeUpdate();
    }


    public void addNotification(Notification notification) {
        getSession().save(notification);
    }


    public void readNotification(long id) {
        String hql = "update Notification set read = 1 where id = :id";
        getSession().createQuery(hql).setLong("id", id).executeUpdate();
    }


    public void readNotificationList(long userId) {
        String hql = "update Notification set read = 1 where user.id = :userId";
        getSession().createQuery(hql).setLong("userId", userId).executeUpdate();
    }

    public boolean notificationExists(Notification notification) {
        String hql = "from Notification where user.id = :userId and typeId = :typeId and param1 = :param1 and read = false";
        Session session = getSession();
        Query query = session.createQuery(hql);
        query.setLong("userId", notification.getUser().getId())
                .setShort("typeId", notification.getTypeId())
                .setString("param1", notification.getParam1());
        List<Notification> list = (List<Notification>) query.list();
        int size = list.size();
        if (size > 0) {
            for (Notification o : list) {
                o.setCreateTime(new Date());
                session.update(o);
            }
            return true;
        } else {
            return false;
        }
    }

}

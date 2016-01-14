package com.taobao.rigel.rap.account.dao.impl;

import com.taobao.rigel.rap.account.bo.Notification;
import com.taobao.rigel.rap.account.bo.Role;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;
import com.taobao.rigel.rap.common.config.SystemSettings;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.*;

public class AccountDaoImpl extends HibernateDaoSupport implements AccountDao {

    public boolean validate(String account, String password) {
        try {
            User user = (User) currentSession()
                    .load(User.class, getUserId(account));
            return user != null && user.getPassword().equals(password);
        } catch (ObjectNotFoundException ex) {
            return false;
        }
    }

    public int getUsertNum() {
        String sql = "SELECT COUNT(*) FROM tb_user";
        Query query = currentSession().createSQLQuery(sql);
        return Integer.parseInt(query.uniqueResult().toString());
    }

    public boolean addUser(User user) {
        user.setLastLoginDate(new Date());
        user.setCreateDate(new Date());
        user.setRealname("");
        currentSession().save(user);
        return true;
    }

    public boolean changePassword(String account, String oldPassword,
                                  String newPassword) {
        Session session = currentSession();
        boolean returnVal = true;
        User user = (User) session.load(User.class, getUserId(account));
        if (user == null || !user.getPassword().equals(oldPassword)) {
            returnVal = false;
        } else {
            user.setPassword(newPassword);
            session.update(user);
        }

        return returnVal;
    }

    /**
     * get user id
     *
     * @param account
     * @return return -1 if the user doesn't exist, otherwise return id of user
     */
    public int getUserId(String account) {
        Query q = currentSession()
                .createQuery("from User where account = :account");
        q.setString("account", account);
        User user = (User) q.uniqueResult();
        return user == null ? -1 : user.getId();
    }

    public User getUserByName(String name) {
        Query q = currentSession().createQuery("from User where name = :name");
        q.setString("name", name);
        User user = (User) q.uniqueResult();
        return user;
    }

    public User getUser(int userId) {
        User user = currentSession().get(User.class, userId);
        return user;
    }

    private Set<Role> getRoleList(int userId) {
        String sql = "SELECT r.* FROM tb_role r \n" +
                "JOIN tb_role_and_user ru ON ru.role_id = r.id \n" +
                "WHERE ru.user_id = :userId";
        Query query = currentSession().createSQLQuery(sql).addEntity(Role.class);
        query.setInteger("userId", userId);
        List<Role> list = query.list();
        Set<Role> roleSet = new HashSet<Role>();
        for (Role role : list) {
            roleSet.add(role);
        }
        return roleSet;
    }

    public User getUser(String account) {
        return getUser(getUserId(account));
    }

    public void changeProfile(int userId, String profileProperty,
                              String profileValue) {
        User user = (User) currentSession().load(User.class, userId);
        if (profileProperty.equals("isHintEnabled")) {
            user.setIsHintEnabled(profileValue.equals("true") ? true : false);
        }
    }

    public boolean updateProfile(int userId, String name, String email,
                                 String password, String newPassword) {
        User user = (User) currentSession().load(User.class, userId);
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
        currentSession().update(user);
    }

    public List<Integer> getUserIdList(int teamId) {
        String sql = "SELECT user_id FROM tb_corporation_and_user WHERE corporation_id = :teamId";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("teamId", teamId);
        return query.list();
    }

    public List<User> getUserList() {
        return currentSession().createQuery("from User").list();
    }

    public void _changePassword(String account, String password) {
        Session session = currentSession();
        User user = (User) session.load(User.class, getUserId(account));
        if (user != null) {
            user.setPassword(password);
            session.update(user);
        }

    }

    public Map<String, String> getUserSettings(int userId) {
        String sql = "SELECT `key`, `value` FROM tb_user_settings WHERE user_id = :userId";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("userId", userId);
        List result = query.list();
        Map<String, String> settings = new HashMap<String, String>();

        for (ListIterator iter = result.listIterator(); iter.hasNext(); ) {
            Object[] row = (Object[]) iter.next();
            settings.put(row[0].toString(), row[1].toString());
        }

        return settings;
    }


    public String getUserSetting(int userId, String key) {
        String sql = "SELECT `value` FROM tb_user_settings WHERE user_id = :userId AND `key` = :key";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("userId", userId);
        query.setString("key", key);
        List result = query.list();
        if (result.size() > 0) {
            return result.get(0).toString();
        }

        return SystemSettings.GET_DEFAULT_USER_SETTINGS(key);
    }


    public void updateUserSetting(int userId, String key, String value) {
        if (getUserSetting(userId, key) == null) {
            addUserSetting(userId, key, value);
            return;
        }

        String sql = "UPDATE tb_user_settings SET `value` = :value WHERE user_id = :userId AND `key` = :key";
        Query query = currentSession().createSQLQuery(sql);
        query.setString("value", value);
        query.setInteger("userId", userId);
        query.setString("key", key);
        query.executeUpdate();
    }

    private void addUserSetting(int userId, String key, String value) {
        String sql = "INSERT INTO tb_user_settings (user_id, `key`, `value`) VALUES (:userId, :key, :value)";
        Query query = currentSession().createSQLQuery(sql);
        query.setInteger("userId", userId);
        query.setString("key", key);
        query.setString("value", value);
        query.executeUpdate();
    }


    public List<Notification> getNotificationList(int userId) {
        String hql = "from Notification n where n.user.id = :userId order by n.createTime desc";
        Query query = currentSession().createQuery(hql).setInteger("userId", userId);
        return query.list();
    }


    public List<Notification> getUnreadNotificationList(int userId) {
        String hql = "from Notification n where n.user.id = :userId and read = false order by n.createTime desc";
        Query query = currentSession().createQuery(hql).setInteger("userId", userId);
        return query.list();
    }


    public void clearNotificationList(int userId) {
        String hql = "delete Notification where user.id = :userId";
        currentSession().createQuery(hql).setInteger("userId", userId).executeUpdate();
    }


    public void addNotification(Notification notification) {
        currentSession().save(notification);
    }


    public void readNotification(int id) {
        String hql = "update Notification set read = 1 where id = :id";
        currentSession().createQuery(hql).setInteger("id", id).executeUpdate();
    }


    public void readNotificationList(int userId) {
        String hql = "update Notification set read = 1 where user.id = :userId";
        currentSession().createQuery(hql).setInteger("userId", userId).executeUpdate();
    }

    public boolean notificationExists(Notification notification) {
        String hql = "from Notification where user.id = :userId and typeId = :typeId and param1 = :param1 and read = false";
        Session session = currentSession();
        Query query = session.createQuery(hql);
        query.setInteger("userId", notification.getUser().getId())
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

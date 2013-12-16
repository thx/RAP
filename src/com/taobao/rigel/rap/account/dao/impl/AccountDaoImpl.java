package com.taobao.rigel.rap.account.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.dao.AccountDao;

public class AccountDaoImpl extends HibernateDaoSupport implements AccountDao {

	@Override
	public boolean validate(String account, String password) {
		try {
			User user = (User) getSession()
					.load(User.class, getUserId(account));
			return user != null && user.getPassword().equals(password);
		} catch (ObjectNotFoundException ex) {
			return false;
		}
	}

	@Override
	public boolean addUser(User user) {
		user.setLastLoginDate(new Date());
		getSession().save(user);
		return true;
	}

	@Override
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

	@Override
	public User getUser(long userId) {
		User user = (User) getSession().get(User.class, userId);
		return user;
	}

	@Override
	public User getUser(String account) {
		return getUser(getUserId(account));
	}

	@Override
	public void changeProfile(long userId, String profileProperty,
			String profileValue) {
		User user = (User) getSession().load(User.class, userId);
		if (profileProperty.equals("isHintEnabled")) {
			user.setIsHintEnabled(profileValue.equals("true") ? true : false);
		}
	}

	@Override
	public boolean updateProfile(long userId, String name, String email,
			String password, String newPassword) {
		User user = (User) getSession().load(User.class, userId);
		if (name != null && !name.equals(""))
			user.setName(name);
		if (email != null && !email.equals(""))
			user.setEmail(email);
		if (password != null && !password.equals("")) {
			if (user.getPassword().equals(password) && newPassword != null
					&& !newPassword.equals("")) {
				user.setPassword(newPassword);
			} else {
				// only when user input old password, and the password is
				// incorrect, return false
				return false;
			}
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> getUserList() {
		return getSession().createQuery("from User").list();
	}

	@Override
	public void _changePassword(String account, String password) {
		Session session = getSession();
		User user = (User) session.load(User.class, getUserId(account));
		if (user != null) {
			user.setPassword(password);
			session.update(user);
		}

	}

}

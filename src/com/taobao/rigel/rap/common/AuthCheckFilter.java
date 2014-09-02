package com.taobao.rigel.rap.common;

import java.io.File;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.buc.sso.client.util.SimpleUserUtil;
import com.alibaba.platform.buc.sso.common.dto.SimpleSSOUser;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;

public class AuthCheckFilter implements Filter {
	AccountMgr accountMgr;

	public AccountMgr getAccountMgr() {
		return accountMgr;
	}

	public void setAccountMgr(AccountMgr accountMgr) {
		this.accountMgr = accountMgr;
	}

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
        String visitorLog = SystemVisitorLog.count(request.getRemoteAddr());
        if (visitorLog != null && !visitorLog.isEmpty()) {
            System.out.println(visitorLog);
        }

		if (SystemConstant.DOMAIN_URL.isEmpty()) {
			SystemConstant.DOMAIN_URL = request.getServerName();
			if (request.getServerPort() != 80) {
				SystemConstant.DOMAIN_URL += ":" + request.getServerPort();
			}
			System.out.println("DOMAIN_URL is " + SystemConstant.DOMAIN_URL);
		}
		HttpSession session = ((HttpServletRequest) request).getSession();
		boolean logined = session.getAttribute(ContextManager.KEY_ACCOUNT) != null;
		
		SystemConstant.README_PATH = session.getServletContext().getRealPath(File.separator + "README.md");
		SystemConstant.ROOT = session.getServletContext().getRealPath(File.separator);

		if (!logined) {
			SimpleSSOUser user = SimpleUserUtil
					.findUser((HttpServletRequest) request);
			if (user != null) {
				SystemConstant.user = user;
				String emailPrefix = user.getEmailPrefix();
				User rapUser = accountMgr.getUser(emailPrefix);
				if (rapUser == null) {
					// proceed register
					User newUser = new User();
					newUser.setAccount(emailPrefix);
					newUser.setPassword("RESERVED");
					String name = user.getAliWW();
					if (name == null || name.isEmpty()) {
						name = user.getLastName();
					}
					newUser.setName(name);
					newUser.setEmail(user.getEmailAddr());
					getAccountMgr().addUser(newUser);
					rapUser = accountMgr.getUser(emailPrefix);
					if (rapUser == null) {
						try {
							throw new Exception("user register failed!");
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				// proceed login
				String account = rapUser.getAccount();
				long userId = rapUser.getId();
				session.setAttribute(ContextManager.KEY_ACCOUNT, account);
				session.setAttribute(ContextManager.KEY_USER_ID, userId);
			}

		}

		chain.doFilter(request, response);

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}

package com.taobao.rigel.rap.common;

import com.alibaba.buc.sso.client.util.SimpleUserUtil;
import com.alibaba.platform.buc.sso.common.dto.SimpleSSOUser;
import com.taobao.rigel.rap.account.bo.User;
import com.taobao.rigel.rap.account.service.AccountMgr;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

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

        String url = null;

        if (request instanceof HttpServletRequest) {
            url = ((HttpServletRequest)request).getRequestURL().toString();
        }
        String domain = URLUtils.getDomain(url);
        if (domain != "") {
            SystemConstant.setDOMAIN_URL(domain);
        }

        // all requests count into realtime charts
        SystemVisitorLog.count();

        if (URLUtils.shouldLog(url))
            SystemVisitorLog.count(request.getRemoteAddr());

		if (SystemConstant.DOMAIN_URL.isEmpty()) {
			SystemConstant.DOMAIN_URL = request.getServerName();
			if (request.getServerPort() != 80) {
				SystemConstant.DOMAIN_URL += ":" + request.getServerPort();
			}
		}
		HttpSession session = ((HttpServletRequest) request).getSession();
        Object userAccount = session.getAttribute(ContextManager.KEY_ACCOUNT);
        Object userName = session.getAttribute(ContextManager.KEY_NAME);
		boolean logined = userAccount != null;
		
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
					String name = user.getNickNameCn();
					if (name == null || name.isEmpty()) {
						name = user.getLastName();
					}
					newUser.setName(name);
					newUser.setEmail(user.getEmailAddr());
                    newUser.setRealname(user.getLastName());
                    newUser.setEmpId(user.getEmpId());
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
                session.setAttribute(ContextManager.KEY_NAME, rapUser.getName());
			}

		} else {
            if (URLUtils.shouldLog(url)) {
                User logUser = new User();
                logUser.setAccount((String)userAccount);
                logUser.setName((String)userName);
                SystemVisitorLog.count(logUser);
            }
        }

		chain.doFilter(request, response);

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}

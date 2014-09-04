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

import com.taobao.rigel.rap.account.service.AccountMgr;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

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
        SystemVisitorLog.count(request.getRemoteAddr());

		if (SystemConstant.DOMAIN_URL.isEmpty()) {
			SystemConstant.DOMAIN_URL = request.getServerName();
			if (request.getServerPort() != 80) {
				SystemConstant.DOMAIN_URL += ":" + request.getServerPort();
			}
		}
		HttpSession session = ((HttpServletRequest) request).getSession();

        Object userAccount = session.getAttribute(ContextManager.KEY_ACCOUNT);
		boolean logined = userAccount != null;
		
		SystemConstant.README_PATH = session.getServletContext().getRealPath(File.separator + "README.md");
		SystemConstant.ROOT = session.getServletContext().getRealPath(File.separator);

		if (logined) {	
            User logUser = new User();
            logUser.setAccount((String)userAccount);
            SystemVisitorLog.count(logUser);
        }

		SystemConstant.README_PATH = session.getServletContext().getRealPath(
				File.separator + "README.md");
		SystemConstant.ROOT = session.getServletContext().getRealPath(
				File.separator);
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}

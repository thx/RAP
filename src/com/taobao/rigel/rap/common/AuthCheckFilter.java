package com.taobao.rigel.rap.common;


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

		if (logined) {	
            User logUser = new User();
            logUser.setAccount((String)userAccount);
            logUser.setName((String)userName);
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

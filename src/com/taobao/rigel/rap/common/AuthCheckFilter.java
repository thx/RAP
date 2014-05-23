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
		if (SystemConstant.DOMAIN_URL.isEmpty()) {
			SystemConstant.DOMAIN_URL = request.getServerName();
			if (request.getServerPort() != 80) {
				SystemConstant.DOMAIN_URL += ":" + request.getServerPort();
			}
			System.out.println("DOMAIN_URL is " + SystemConstant.DOMAIN_URL);
		}
		HttpSession session = ((HttpServletRequest) request).getSession();

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

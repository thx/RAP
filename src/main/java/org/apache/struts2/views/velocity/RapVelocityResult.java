package org.apache.struts2.views.velocity;

import org.apache.struts2.dispatcher.VelocityResult;

public class RapVelocityResult extends VelocityResult {  

	private static final long serialVersionUID = 1468647758035361308L;
	private String contentType = "text/html";  
	  
	 public void setContentType(String contentType) {  
	   this.contentType = contentType;  
	 }  
	   
	 protected String getContentType(String templateLocation) {  
	   return contentType;  
	 }  
	}  

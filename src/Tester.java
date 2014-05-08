import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.taobao.rigel.rap.common.DateUtils;

public class Tester {

	/**
	 * @param args
	 */
	public static void main2(String[] args) {

		Date date = new Date();
		Date date2 = new Date();
		System.out.println(DateUtils.compWorkAndCurrByDate(date, date2));
		date2.setDate(3);

		System.out.println(DateUtils.compWorkAndCurrByDate(date, date2));
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) throws Exception {
		Map a = new HashMap();
		a.put("a", "中文");
		a.put("b", "2");
		String str = doPost("http://www.baidu.com", a);
		System.out.println(str);
		
		String str2 = doGet("http://www.baidu.com", a);
		System.out.println(str2);
	}
	
	@SuppressWarnings({"rawtypes", "deprecation", "unchecked"})
	public static String doPost(String url,  Map data) throws Exception {
		HttpClient httpClient = new DefaultHttpClient();
		HttpPost httpPost = new HttpPost(url);
		List params = new ArrayList<NameValuePair>();
		if (data != null) {
        	for (Object o : data.keySet()) {
        		params.add(new BasicNameValuePair((String)o, (String)data.get(o)));
        	}
        }
		// System.out.println(url);
		// System.out.println(params);
		try {
		    httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
		    e.printStackTrace();
		}
		String content = "";
		try {
		    HttpResponse response = httpClient.execute(httpPost);
		    HttpEntity respEntity = response.getEntity();

		    if (respEntity != null) {
		        content =  EntityUtils.toString(respEntity);
		    }
		} catch (ClientProtocolException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return content;
	}
	
	@SuppressWarnings({"rawtypes", "deprecation"})
	public static String doGet(String url,  Map params) throws Exception {
		HttpClient httpclient = new DefaultHttpClient();  
        if (params != null) {
        	String paramText = "";
        	for (Object o : params.keySet()) {
        		paramText += o + "=" + params.get(o) + "&";
        	}
        	if (paramText != "") {
        		paramText = paramText.substring(0, paramText.length() - 1);
        		if (url.indexOf("?") == -1) {
        			paramText = "?" + paramText;
        		}
        		url = url + paramText;
        	}
        }
        
        HttpGet httpgets = new HttpGet(url);

		String content = "";
		try {
		    HttpResponse response = httpclient.execute(httpgets);
		    HttpEntity respEntity = response.getEntity();

		    if (respEntity != null) {
		        content =  EntityUtils.toString(respEntity);
		    }
		} catch (ClientProtocolException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		}
		return content;
	}
	
}

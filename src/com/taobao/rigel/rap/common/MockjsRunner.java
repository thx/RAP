package com.taobao.rigel.rap.common;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class MockjsRunner {

	private static String MOCKJS_PATH =  SystemConstant.ROOT +
            FileUtils.concatFilePath(new String[] {"stat", "js", "util", "mock-min.js"});
	private Context ct;
	private Scriptable scope;
	private static String jsCode;
	public MockjsRunner() {
		this.ct = Context.enter();
		this.scope = ct.initStandardObjects();
		this.initMockjs(ct, scope);
	}
	
	public Context getContext() {
		return this.ct;
	}

	public Scriptable getScope() {
		return this.scope;
	}

	public static String getMockjsCode() {
        String filePath = MockjsRunner.MOCKJS_PATH;
        try {
            FileInputStream fis = new FileInputStream(filePath);
            StringBuffer content = new StringBuffer();
            DataInputStream in = new DataInputStream(fis);
            BufferedReader d = new BufferedReader(new InputStreamReader(in,
                    "UTF-8"));
            String line = null;
            while ((line = d.readLine()) != null)
                content.append(line + "\n");
            d.close();
            in.close();
            fis.close();
            return content.toString();
 
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        } finally {
        }
    } 

	private void initMockjs(Context ct, Scriptable scope) {
		if (jsCode == null) {
			jsCode = MockjsRunner.getMockjsCode();
		}
		try {
			ct.evaluateString(scope, jsCode, null, 1, null);
			ct.evaluateString(scope, "", null, 1, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String doRenderMockJsRule(String mockRule) {
		try {
			StringBuilder code = new StringBuilder();
			code
				.append("var obj = Mock.mock(" + mockRule + ");")
				.append("JSON.stringify(obj.__root__ ? obj.__root__ : obj, null, 4);");
			Object result = ct.evaluateString(scope, code.toString(), null, 1,
					null);
			return result.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return "JS_ERROR";
		}
	}
	
	public static String renderMockjsRule(String mockRule) {
		return new MockjsRunner().doRenderMockJsRule(mockRule);
	}

	public static void main(String[] args) {
		System.out.println(MockjsRunner.renderMockjsRule("{'id|1-20': '1', 'b': '@IMG'}"));
	}
}

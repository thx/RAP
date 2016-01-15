package com.taobao.rigel.rap.common.utils;

import com.taobao.rigel.rap.common.config.SystemConstant;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class MockjsRunner {

    private static String MOCKJS_PATH = SystemConstant.ROOT +
            FileUtils.concatFilePath(new String[]{"stat", "js", "util", "mock-min.js"});
    private static String jsCode;
    private Context ct;
    private Scriptable scope;
    private static final Logger logger = LogManager.getLogger(MockjsRunner.class);

    public MockjsRunner() {
        this.ct = Context.enter();
        this.scope = ct.initStandardObjects();
        this.ct.setOptimizationLevel(-1);
        this.initMockjs(ct, scope);
    }

    public static String getMockjsCode() {
        try {
            byte[] encoded = Files.readAllBytes(Paths.get(MOCKJS_PATH));
            String result =  new String(encoded, StandardCharsets.UTF_8);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return "\"ERROR\"";
        } finally {
        }
    }

    public static String renderMockjsRule(String mockRule) {
        return new MockjsRunner().doRenderMockJsRule(mockRule);
    }

    public static void main(String[] args) {
    }

    public Context getContext() {
        return this.ct;
    }

    public Scriptable getScope() {
        return this.scope;
    }

    private void initMockjs(Context ct, Scriptable scope) {
        if (jsCode == null) {
            jsCode = getMockjsCode();
        }
        try {
            ct.evaluateString(scope, jsCode, null, 1, null);
            ct.evaluateString(scope, "", null, 1, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String doRenderMockJsRule(String mockRule) {
        String returnVal = "JS_ERROR";
        try {
            StringBuilder code = new StringBuilder();
            code
                    .append("var result = {};")
                    .append("try {")
                            // .append("var obj = Mock.mock(JSON.parse(\"" + StringUtils.escapeInJ(mockRule.replaceAll("\\'", "'")) + "\"));")
                    .append("var obj = Mock.mock(" + mockRule + ");")
                    .append("result = JSON.stringify(obj.__root__ ? obj.__root__ : obj, null, 4);")
                    .append("} catch(ex) {result.errMsg = ex.message;result.isOk=false;result = JSON.stringify(result);}")
                    .append("result;");

            Object result = ct.evaluateString(scope, code.toString(), null, 1,
                    null);
            returnVal = result.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ct.exit();
        }
        return returnVal;
    }
}

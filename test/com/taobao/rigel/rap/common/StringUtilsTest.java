package com.taobao.rigel.rap.common;

import org.junit.Test;

import static org.junit.Assert.*;

public class StringUtilsTest {

    @Test
    public void testEscapeInH() throws Exception {
        String str = StringUtils.escapeInH("<>");
        assertEquals(str, "&lt;&gt;");
        // assertEquals(str + "12", "&lt;&gt;");
    }
}
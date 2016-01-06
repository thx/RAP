package com.taobao.rigel.rap.common.config;

public class Patterns {
    public static final String MOCK_TEMPLATE_PATTERN = "\\$\\{([_a-zA-Z][_a-zA-Z0-9.]*)=?((.*?))\\}";
    public static final String ILLEGAL_NAME_CHAR = "[^ 0-9a-zA-Z_]";
    public static final String LEGAL_ACCOUNT_CHAR = "[0-9a-zA-Z_]";
    public static final String LEGAL_NAME_CHAR = "[0-9a-zA-Z_ ]";
}

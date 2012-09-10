package com.baidu.rigel.rap.common;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 为FE提供各类过滤字符串的接口
 * 
 * @author Junquan 2010.01.20
 */
public class StringUtils {

	/**
	 * 默认编码 utf8
	 */
	public static String DEFAULT_CHARSET = "utf8";

	/**
	 * 在html标签或属性中A: 左尖括号：< 转成 &lt; 右尖括号：> 转成 &gt; 单引号：' 转成 &#39; 双引号：" 转成
	 * &quot;
	 */
	public static String escapeInH(String str) {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		int lth = str.length();

		for (int i = 0; i < lth; i++) {
			char c = str.charAt(i);

			switch (c) {

			case 60: // <
				sb.append("&lt;");
				break;
			case 62: // >
				sb.append("&gt;");
				break;
			case 39: // '
				sb.append("&#39;");
				break;
			case 34: // "
				sb.append("&quot;");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return new String(sb.toString());
	}

	public static String escapeInH(Number num) {
		String str = null;
		if (num != null) {
			str = num.toString();
		}

		return escapeInH(str);
	}

	/**
	 * 在html标签或属性中A - 逆
	 */
	public static String UnEscapeInH(String str) {
		// TODO
		return str;
	}

	/**
	 * 在html标签或属性中B: 左尖括号：< 转成 &lt; 右尖括号：> 转成 &gt; 单引号：' 转成 &#39; 双引号：" 转成
	 * &quot; &符号：& 转成&amp;
	 */
	public static String escapeInX(String str) {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		int lth = str.length();

		for (int i = 0; i < lth; i++) {
			char c = str.charAt(i);

			switch (c) {

			case 60: // <
				sb.append("&lt;");
				break;
			case 62: // >
				sb.append("&gt;");
				break;
			case 39: // '
				sb.append("&#39;");
				break;
			case 34: // "
				sb.append("&quot;");
				break;
			case 38: // &
				sb.append("&amp;");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return new String(sb.toString());
	}

	public static String escapeInX(Number num) {
		String str = null;
		if (num != null) {
			str = num.toString();
		}

		return escapeInX(str);
	}

	/**
	 * 在html标签或属性中B - 逆
	 */
	public static String UnEscapeInX(String str) {
		// TODO
		return str;
	}

	/**
	 * 在普通JS环境: 单引号：' 转成 \' 双引号：" 转成 \" 反斜杠：\ 转成 \\ 正斜杠：/ 转成 \/ 换行符 转成 \n 回车符 转成
	 * \r
	 */
	public static String escapeInJ(String str) {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		int lth = str.length();

		for (int i = 0; i < lth; i++) {
			char c = str.charAt(i);

			switch (c) {

			case 39: // '
				sb.append("\\'");
				break;
			case 34: // "
				sb.append("\\\"");
				break;
			case 47: // /
				sb.append("\\/");
				break;
			case 92: // \
				sb.append("\\\\");
				break;
			case 13: // 回车 \r
				sb.append("\\r");
				break;
			case 10: // 换行 \n
				sb.append("\\n");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return new String(sb.toString());
	}

	public static String escapeInJ(Number num) {
		String str = null;
		if (num != null) {
			str = num.toString();
		}

		return escapeInJ(str);
	}

	/**
	 * 在普通JS环境 - 逆
	 */
	public static String UnEscapeInJ(String str) {
		// TODO
		return str;
	}

	/**
	 * 在JS环境的innerHTML: 左尖括号：< 转成 &lt; 右尖括号：> 转成 &gt; 单引号：' 转成 \' 双引号：" 转成 \"
	 * 反斜杠：\ 转成 \\ 正斜杠：/ 转成 \/ 换行符 转成 \n 回车符 转成 \r
	 */
	public static String escapeInJH(String str) {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		int lth = str.length();

		for (int i = 0; i < lth; i++) {
			char c = str.charAt(i);

			switch (c) {

			case 60: // <
				sb.append("&lt;");
				break;
			case 62: // >
				sb.append("&gt;");
				break;
			case 39: // '
				sb.append("\\'");
				break;
			case 34: // "
				sb.append("\\\"");
				break;
			case 47: // /
				sb.append("\\/");
				break;
			case 92: // \
				sb.append("\\\\");
				break;
			case 13: // 回车 \r
				sb.append("\\r");
				break;
			case 10: // 换行 \n
				sb.append("\\n");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return new String(sb.toString());
	}

	public static String escapeInJH(Number num) {
		String str = null;
		if (num != null) {
			str = num.toString();
		}

		return escapeInJH(str);
	}

	/**
	 * 在JS环境的innerHTML - 逆
	 */
	public static String UnEscapeInJH(String str) {
		// TODO
		return str;
	}

	/**
	 * 在标签onclick等事件函数参数中: 左尖括号：< 转成 &lt; 右尖括号：> 转成 &gt; &符号：& 转成&amp; 单引号：' 转成
	 * \&#39; 双引号：" 转成 \&quot; 反斜杠：\ 转成 \\ 正斜杠：/ 转成 \/ 换行符 转成 \n 回车符 转成 \r
	 */
	public static String escapeInHJ(String str) {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		int lth = str.length();

		for (int i = 0; i < lth; i++) {
			char c = str.charAt(i);

			switch (c) {

			case 60: // <
				sb.append("&lt;");
				break;
			case 62: // >
				sb.append("&gt;");
				break;
			case 39: // '
				sb.append("\\&#39;");
				break;
			case 34: // "
				sb.append("\\&quot;");
				break;
			case 38: // &
				sb.append("&amp;");
				break;
			case 47: // /
				sb.append("\\/");
				break;
			case 92: // \
				sb.append("\\\\");
				break;
			case 13: // 回车 \r
				sb.append("\\r");
				break;
			case 10: // 换行 \n
				sb.append("\\n");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return new String(sb.toString());
	}

	public static String escapeInHJ(Number num) {
		String str = null;
		if (num != null) {
			str = num.toString();
		}

		return escapeInHJ(str);
	}

	/**
	 * 在标签onclick等事件函数参数中 - 逆
	 */
	public static String UnEscapeInHJ(String str) {
		// TODO
		return str;
	}

	/**
	 * 在URL参数中: 对非字母、数字字符进行转码(%加字符的ASCII格式)
	 * 
	 * @throws UnsupportedEncodingException
	 */
	public static String escapeInU(String str)
			throws UnsupportedEncodingException {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}
		return URLEncoder.encode(str, DEFAULT_CHARSET);
	}

	/**
	 * 在URL参数中 - 逆
	 * 
	 * @throws UnsupportedEncodingException
	 */
	public static String UnEscapeInU(String str)
			throws UnsupportedEncodingException {
		if (str == null || ("").equals(str.trim())) {
			return "";
		}
		return URLDecoder.decode(str, DEFAULT_CHARSET);
	}

	public static String getMD5(String src) {
		byte[] defaultBytes = src.getBytes();
		StringBuffer hexString = new StringBuffer();
		try {
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			algorithm.reset();
			algorithm.update(defaultBytes);
			byte messageDigest[] = algorithm.digest();

			for (int i = 0; i < messageDigest.length; i++) {
				hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return hexString.toString();
	}
}

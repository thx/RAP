package com.taobao.rigel.rap.mock.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import nl.flotsam.xeger.Xeger;

import com.taobao.rigel.rap.common.ArrayUtils;
import com.taobao.rigel.rap.common.MockjsRunner;
import com.taobao.rigel.rap.common.NumberUtils;
import com.taobao.rigel.rap.common.Patterns;
import com.taobao.rigel.rap.common.StringUtils;
import com.taobao.rigel.rap.mock.service.MockMgr;
import com.taobao.rigel.rap.project.bo.Action;
import com.taobao.rigel.rap.project.bo.Parameter;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.project.service.ProjectMgr;

public class MockMgrImpl implements MockMgr {
	private ProjectDao projectDao;
	private ProjectMgr projectMgr;

	public ProjectMgr getProjectMgr() {
		return projectMgr;
	}

	public void setProjectMgr(ProjectMgr projectMgr) {
		this.projectMgr = projectMgr;
	}

	private Map<String, List<String>> requestParams;

	/**
	 * random seed
	 */
	private int _num = 1;
	private String[] NAME_LIB = { "霍雍", "行列", "幻刺", "金台", "望天", "李牧", "三冰",
			"自勉", "思霏", "诚冉", "甘苦", "勇智", "墨汁老湿", "圣香", "定球", "征宇", "灵兮", "永盛",
			"小婉", "紫丞", "少侠", "木谦", "周亮", "宝山", "张中", "晓哲", "夜沨" };
	private String[] LOCATION_LIB = { "北京 朝阳区", "北京 海淀区", "北京 昌平区",
			"吉林 长春 绿园区", "吉林 吉林 丰满区" };
	private String[] PHONE_LIB = { "15813243928", "13884928343", "18611683243",
			"18623432532", "18611582432" };

	public ProjectDao getProjectDao() {
		return projectDao;
	}

	public void setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
	}

	@Override
	public String generateData(int projectId, String pattern,
			Map<String, Object> options) throws UnsupportedEncodingException {
		_num = 1;
		String originalPattern = pattern;
		// System.out.println("pattern before processed:" + pattern);
		if (pattern.contains("?")) {
			pattern = pattern.substring(0, pattern.indexOf("?"));
		}
		if (pattern.charAt(0) == '/') {
			pattern = pattern.substring(1);
		}
		// System.out.println("pattern processed:" + pattern);
		List<Action> aList = projectMgr
				.getMatchedActionList(projectId, pattern);
		if (aList.size() == 0)
			return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";

		Action action = actionPick(aList, originalPattern, options);

		String desc = action.getDescription();
		Set<Parameter> pList = action.getResponseParameterList();
		// load mock data by QA
		for (Parameter p : pList) {
			recursivelyLoadMockData(p);
		}
		StringBuilder json = new StringBuilder();
		String left = "{", right = "}";

		// match both @type=array && @type=array_map
		if (desc.contains("@type=array")) {
			left = "[";
			right = "]";
		}

		// for array_map.length
		String key = "@length=";
		String numStr = null;
		if (desc.contains(key)) {
			Pattern p = Pattern.compile("@length=(\\d+)");
			Matcher matcher = p.matcher(desc);
			if (matcher.find()) {
				numStr = matcher.group(1);
			}
		}
		int num = numStr == null ? 1 : Integer.parseInt(numStr);
		json.append(left);
		boolean first = true;

		boolean isArrayMap = desc.contains("@type=array_map");

		for (int i = 0; i < num; i++) {
			first = true;
			if (i > 0) {
				json.append(",");
			}
			if (isArrayMap) {
				json.append("{");
			}
			for (Parameter p : pList) {
				if (first) {
					first = false;
				} else {
					json.append(",");
				}
				buildJson(json, p, -1);
			}

			if (isArrayMap) {
				json.append("}");
			}
		}
		json.append(right);
		String result = json.toString();
		return resultFilter(result);
	}

	@Override
	public String generateRuleData(int projectId, String pattern,
			Map<String, Object> options) throws UnsupportedEncodingException {
		String result = generateRule(projectId, pattern, options);
		return MockjsRunner.renderMockjsRule(result);
	}

	@Override
	public String generateRule(int projectId, String pattern,
			Map<String, Object> options) throws UnsupportedEncodingException {
		String originalPattern = pattern;
		_num = 1;
		// System.out.println("pattern before processed:" + pattern);
		if (pattern.contains("?")) {
			pattern = pattern.substring(0, pattern.indexOf("?"));
		}
		if (pattern.charAt(0) == '/') {
			pattern = pattern.substring(1);
		}
		// System.out.println("pattern processed:" + pattern);
		List<Action> aList = projectMgr
				.getMatchedActionList(projectId, pattern);
		if (aList.size() == 0) {
			return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";
		}

		Action action = actionPick(aList, originalPattern, options);

		String desc = action.getDescription();
		Set<Parameter> pList = action.getResponseParameterList();
		// load mock data by QA
		for (Parameter p : pList) {
			recursivelyLoadMockData(p);
		}
		StringBuilder json = new StringBuilder();
		String left = "{", right = "}";

		// match both @type=array && @type=array_map
		if (desc.contains("@type=array")) {
			left = "[";
			right = "]";
		}

		// for array_map.length
		String key = "@length=";
		String numStr = null;
		if (desc.contains(key)) {
			Pattern p = Pattern.compile("@length=(\\d+)");
			Matcher matcher = p.matcher(desc);
			if (matcher.find()) {
				numStr = matcher.group(1);
			}
		}
		int num = numStr == null ? 1 : Integer.parseInt(numStr);
		json.append(left);
		boolean first = true;

		boolean isArrayMap = desc.contains("@type=array_map");

		for (int i = 0; i < num; i++) {
			first = true;
			if (i > 0) {
				json.append(",");
			}
			if (isArrayMap) {
				json.append("{");
			}
			for (Parameter p : pList) {
				if (first) {
					first = false;
				} else {
					json.append(",");
				}
				buildMockTemplate(json, p, -1);
			}

			if (isArrayMap) {
				json.append("}");
			}
		}
		json.append(right);
		String result = json.toString();
		return resultFilter(result);
	}

	private Action actionPick(List<Action> actionList, String pattern,
			Map<String, Object> options) throws UnsupportedEncodingException {
		Action result = actionList.get(0);
		requestParams = getUrlParameters(pattern);
		for (Action action : actionList) {
			Map<String, List<String>> docActionParams = getUrlParameters(action
					.getRequestUrl());
			boolean hasSchema = false;
			boolean isPassed = true;
			for (String docParamKey : docActionParams.keySet()) {
				if (docParamKey.contains("[") && docParamKey.contains("]")) {
					String docParamKeyProcessed = docParamKey.substring(1,
							docParamKey.length() - 1);
					List<String> list = requestParams.get(docParamKeyProcessed);
					if (list != null && list.size() > 0) {
						options.put("callback", list.get(0));
					}
				}

				if (docParamKey.contains("{") && docParamKey.contains("}")) {
					hasSchema = true;
					String docParamKeyProcessed = docParamKey.substring(1,
							docParamKey.length() - 1);
					List<String> list1 = requestParams
							.get(docParamKeyProcessed);
					List<String> list2 = docActionParams.get(docParamKey);
					if (list1 != null && list2 != null && list1.size() > 0
							&& list2.size() > 0
							&& list1.get(0).equals(list2.get(0))) {
						// checked passed
					} else {
						isPassed = false;
						break;
					}
				}
			}
			if (isPassed && hasSchema) {
				return action;
			}
		}
		return result;
	}

	public static Map<String, List<String>> getUrlParameters(String url)
			throws UnsupportedEncodingException {
		Map<String, List<String>> params = new HashMap<String, List<String>>();
		String[] urlParts = url.split("\\?");
		if (urlParts.length > 1) {
			String query = urlParts[1];
			for (String param : query.split("&")) {
				String pair[] = param.split("=");
				if (pair.length == 0) {
					continue;
				}
				String key = URLDecoder.decode(pair[0], "UTF-8");
				String value = "";
				if (pair.length > 1) {
					value = URLDecoder.decode(pair[1], "UTF-8");
				}
				List<String> values = params.get(key);
				if (values == null) {
					values = new ArrayList<String>();
					params.put(key, values);
				}
				values.add(value);
			}
		}
		return params;
	}

	/**
	 * for escaping separators
	 * 
	 * @param result
	 * @return
	 */
	private String resultFilter(String result) {
		result = result.replaceAll("////", ";");
		return result;
	}

	private void recursivelyLoadMockData(Parameter p) {
		if (p.getMockData() != null && !p.getMockData().equals("")) {
			p.setMockDataTEMP(p.getMockData());
		} else {
			p.setMockDataTEMP(p.getRemark());
		}
		if (p.getParameterList() == null)
			return;
		for (Parameter subP : p.getParameterList()) {
			recursivelyLoadMockData(subP);
		}
	}

	/**
	 * build JSON
	 * 
	 * @param json
	 *            string builder
	 * @param para
	 *            parameter to be parsed
	 * @param index
	 *            available in array<object> stands for index of array, used for
	 *            special mode of tags like @format[3] which means the third
	 *            record enabled only. Default value should be -1 which disabled
	 *            the feature.
	 */
	private void buildJson(StringBuilder json, Parameter para, int index) {
		boolean isArrayObject = para.getDataType().equals("array<object>");
		int ARRAY_LENGTH = isArrayObject ? 5 : 1;
		String[] tags = para.getMockDataTEMP().split(";");
		Map<String, String> tagMap = new HashMap<String, String>();
		parseTags(tags, tagMap, false);

		// if isArray && has @value tag, directly output @value content
		if (para.getDataType().contains("array") && tagMap.get("value") != null) {
			json.append(para.getMockIdentifier() + ":" + tagMap.get("value"));
		} else {
			String length = tagMap.get("length");
			if (length != null && !length.isEmpty()) {
				ARRAY_LENGTH = Integer.parseInt(length);
			}
			if (para.getParameterList() == null
					|| para.getParameterList().size() == 0) {
				json.append(para.getMockIdentifier() + ":"
						+ mockValue(para, index));
			} else {
				// object and array<object>
				json.append(para.getMockIdentifier() + ":");
				String left = "{", right = "}";

				if (isArrayObject) {
					left = "[";
					right = "]";
				}
				json.append(left);
				boolean first;
				for (int i = 0; i < ARRAY_LENGTH; i++) {
					first = true;
					if (isArrayObject && i > 0)
						json.append(",");
					if (isArrayObject)
						json.append("{");
					for (Parameter p : para.getParameterList()) {
						if (first) {
							first = false;
						} else {
							json.append(",");
						}
						buildJson(json, p, i);
					}
					if (isArrayObject)
						json.append("}");
				}
				json.append(right);
			}
		}
	}

	/**
	 * build mock.js template
	 * 
	 * @param json
	 *            string builder
	 * @param para
	 *            parameter to be parsed
	 * @param index
	 *            available in array<object> stands for index of array, used for
	 *            special mode of tags like @format[3] which means the third
	 *            record enabled only. Default value should be -1 which disabled
	 *            the feature.
	 */
	private void buildMockTemplate(StringBuilder json, Parameter para, int index) {
		boolean isArrayObject = para.getDataType().equals("array<object>");
		int ARRAY_LENGTH = 1;

		if (para.getParameterList() == null
				|| para.getParameterList().size() == 0) {
			json.append(para.getMockJSIdentifier() + ":"
					+ StringUtils.chineseToUnicode(mockjsValue(para, index)));
		} else {
			// object and array<object>
			json.append(para.getMockJSIdentifier() + ":");
			String left = "{", right = "}";

			if (isArrayObject) {
				left = "[";
				right = "]";
			}
			json.append(left);
			boolean first;
			for (int i = 0; i < ARRAY_LENGTH; i++) {
				first = true;
				if (isArrayObject && i > 0)
					json.append(",");
				if (isArrayObject)
					json.append("{");
				for (Parameter p : para.getParameterList()) {
					if (first) {
						first = false;
					} else {
						json.append(",");
					}
					buildMockTemplate(json, p, i);
				}
				if (isArrayObject)
					json.append("}");
			}
			json.append(right);
		}

	}

	private String mockValue(Parameter para, int index) {
		String dataType = para.getDataType();
		String[] tags = para.getMockDataTEMP().split(";");
		Map<String, String> tagMap = new HashMap<String, String>();
		parseTags(tags, tagMap, true);
		String returnValue = "0";

		if (dataType.equals("number")) {
			String regex = tagMap.get("regex_index");
			if (regex != null && !regex.isEmpty()) {
				// value should be like "$trueValue_INDEX_5"
				String[] arr = regex.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					regex = arr[0];
					Xeger generator = new Xeger(regex);
					return generator.generate();
				}
			}

			regex = tagMap.get("regex");
			if (regex != null && !regex.isEmpty()) {
				Xeger generator = new Xeger(regex);
				return generator.generate();
			}

			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				// value should be like "$trueValue_INDEX_5"
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					return value;
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				return value;
			}

			String format = tagMap.get("format_index");
			if (format != null && !format.isEmpty()) {
				String[] arr = format.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					format = arr[0];
					return NumberUtils.randomByFormat(format);
				}
			}
			format = tagMap.get("format");
			if (format != null && !format.isEmpty()) {
				return NumberUtils.randomByFormat(format);
			}
			return NumberUtils.randomInt10Str();
		} else if (dataType.equals("string")) {
			String regex = tagMap.get("regex_index");
			if (regex != null && !regex.isEmpty()) {
				// value should be like "$trueValue_INDEX_5"
				String[] arr = regex.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					regex = arr[0];
					Xeger generator = new Xeger(regex);
					return "\"" + StringUtils.escapeInJ(generator.generate())
							+ "\"";
				}
			}

			regex = tagMap.get("regex");
			if (regex != null && !regex.isEmpty()) {
				Xeger generator = new Xeger(regex);
				return "\"" + StringUtils.escapeInJ(generator.generate())
						+ "\"";
			}

			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					if (value.contains("[name]")) {
						return "\""
								+ NAME_LIB[NumberUtils
										.randomInt(NAME_LIB.length)] + "\"";
					} else if (value.contains("[location]")) {
						return "\""
								+ LOCATION_LIB[NumberUtils
										.randomInt(LOCATION_LIB.length)] + "\"";
					} else if (value.contains("[phone]")) {
						return "\""
								+ PHONE_LIB[NumberUtils
										.randomInt(PHONE_LIB.length)] + "\"";
					} else {
						return "\"" + StringUtils.escapeInJ(value) + "\"";
					}
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				if (value.contains("[name]")) {
					return "\""
							+ NAME_LIB[NumberUtils.randomInt(NAME_LIB.length)]
							+ "\"";
				} else if (value.contains("[location]")) {
					return "\""
							+ LOCATION_LIB[NumberUtils
									.randomInt(LOCATION_LIB.length)] + "\"";
				} else if (value.contains("[phone]")) {
					return "\""
							+ PHONE_LIB[NumberUtils.randomInt(PHONE_LIB.length)]
							+ "\"";
				} else {
					return "\"" + StringUtils.escapeInJ(value) + "\"";
				}
			}
			String format = tagMap.get("format");
			if (format != null && !format.isEmpty()) {
				return "\"" + NumberUtils.randomByFormat(format) + "\"";
			}
			return "\"测试内容\"";
		} else if (dataType.equals("boolean")) {
			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					return value;
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				return value;
			}
			return "true";
		} else if (dataType.equals("array<number>")) {
			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					return "\"" + value + "\"";
				}
			}

			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				return "\"" + value + "\"";
			}
			List<Integer> arr = new ArrayList<Integer>();
			for (int i = 0; i < 10; i++) {
				arr.add(NumberUtils.randomInt(1000));
			}
			return ArrayUtils.join(arr, ",");
		} else if (dataType.equals("array<string>")) {
			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					return value;
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				return value;
			}
			return "[\"测试1\", \"测试2\", \"测试3\", \"测试4\", \"测试5\"]";
		}
		return returnValue;
	}

	private String mockjsValue(Parameter para, int index) {
		String[] tags = para.getMockDataTEMP().split(";");
		boolean escape = true;
		Map<String, String> tagMap = new HashMap<String, String>();
		parseTags(tags, tagMap, true);
		String returnValue = "1";
		String mockValue = tagMap.get("mock");
		if (mockValue == null || mockValue.isEmpty()) {
			mockValue = tagMap.get("{mock}");
			escape = false;
		}

		mockValue = processMockValueWithParams(para, mockValue);

		if (mockValue != null && !mockValue.isEmpty()) {
			if (mockValue.startsWith("[") && mockValue.endsWith("]")) {
				return mockValue;
			} else if (para.getDataType().equals("number")
					|| para.getDataType().equals("boolean")) {
				return mockValue;
			} else {
				if (escape) {
					mockValue = StringUtils.escapeInJ(mockValue);
				}
				return "\"" + mockValue + "\"";
			}
		} else if (para.getDataType().equals("array<string>")) {
			return "[\"string1\", \"string2\", \"string3\", \"string4\", \"string5\"]";

		} else if (para.getDataType().equals("array<number>")) {
			return "[1, 2, 3, 4, 5]";
		}
		return returnValue;
	}

	private String processMockValueWithParams(Parameter para, String mockValue) {

		Pattern p = Pattern.compile(Patterns.MOCK_TEMPLATE_PATTERN);
		if (mockValue == null)
			mockValue = "";
		Matcher matcher = p.matcher(mockValue);
		while (matcher.find()) {
			int c = matcher.groupCount();
			if (c >= 3) {
				String toBeReplaced = matcher.group(0);
				String key = matcher.group(1);
				String value = matcher.group(2);
				List<String> param = requestParams.get(key);
				String realValue = (param != null && param.size() > 0) ? param
						.get(0) : null;
				if (realValue != null && !realValue.isEmpty()) {
					mockValue = mockValue.replace(toBeReplaced, realValue);
				} else {
					mockValue = mockValue.replace(toBeReplaced, value);
				}
			}
		}
		return mockValue;
	}

	/**
	 * from tag string to tag map
	 * 
	 * @param tags
	 *            tag string input by parsing whole string split by separator
	 *            ";"
	 * @param tagMap
	 *            tag map
	 * @param isMocking
	 */
	private void parseTags(String[] tags, Map<String, String> tagMap,
			boolean isMocking) {
		for (String tag : tags) {
			// tag format validation
			if (tag.startsWith("@") && tag.contains("=")) {
				String val = tag.substring(tag.indexOf("=") + 1);
				if (tag.startsWith("@value")) {
					if (val.contains("[xx]") && isMocking) {
						Integer n = _num++ % 31;
						val = val.replace("[xx]", n >= 10 ? n.toString() : "0"
								+ n);
					}
					if (tag.contains("value[")) {
						tagMap.put(
								"value_index",
								val
										+ "_INDEX_"
										+ tag.substring(tag.indexOf("[") + 1,
												tag.indexOf("]")));
					} else {
						tagMap.put("value", val);
					}

				} else if (tag.startsWith("@format")) {
					if (tag.contains("format[")) {
						tagMap.put(
								"format_index",
								val
										+ "_INDEX_"
										+ tag.substring(tag.indexOf("[") + 1,
												tag.indexOf("]")));
					} else {
						tagMap.put("format", val);
					}
				} else if (tag.startsWith("@length")) {
					if (tag.contains("length[")) {
						tagMap.put(
								"length_index",
								val
										+ "_INDEX_"
										+ tag.substring(tag.indexOf("[") + 1,
												tag.indexOf("]")));
					} else {
						tagMap.put("length", tag.split("=")[1]);
					}
				} else if (tag.startsWith("@regex")) {
					if (tag.contains("regex[")) {
						tagMap.put(
								"regex_index",
								val
										+ "_INDEX_"
										+ tag.substring(tag.indexOf("[") + 1,
												tag.indexOf("]")));
					} else {
						tagMap.put("regex", val);
					}
				} else if (tag.startsWith("@mock")) {
					tagMap.put("mock", val);
				} else if (tag.startsWith("@{mock}")) {
					tagMap.put("{mock}", val);
				}
			}
		}
	}

	@Override
	public int modify(int actionId, String mockData) {
		Action action = projectDao.getAction(actionId);
		if (action == null)
			return 0;
		int num = 0;
		// parse mock data
		String[] mockDataSnips = mockData.split("_AND_");
		for (String snip : mockDataSnips) {
			Set<Parameter> pList = snip.startsWith("request.") ? action
					.getRequestParameterList() : action
					.getResponseParameterList();
			Parameter p = locateParam(pList,
					snip.substring(snip.indexOf(".") + 1));
			if (p == null)
				continue;
			String paramMockData = snip.substring(snip.indexOf("=") + 1);
			p.setMockData(paramMockData);
			num++;
		}
		return num;
	}

	/**
	 * recursively locating parameter specified in the mock data
	 * 
	 * @param pList
	 * @param snip
	 *            request.a.b.c=@xxxx => a.b.c==@xxxx (namely request. or
	 *            response. removed)
	 * @return
	 */
	private Parameter locateParam(Set<Parameter> pList, String snip) {
		boolean hasSubParam = snip.indexOf(".") > 0
				&& snip.indexOf(".") < snip.indexOf("=");
		String identifier = hasSubParam ? snip.substring(0, snip.indexOf("."))
				: snip.substring(0, snip.indexOf("="));
		for (Parameter p : pList) {
			if (p.getIdentifier().equals(identifier)) {
				return hasSubParam ? locateParam(p.getParameterList(),
						snip.substring(snip.indexOf(".") + 1)) : p;
			}
		}
		return null;
	}

	@Override
	public int reset(int projectId) {
		return projectDao.resetMockData(projectId);
	}

}

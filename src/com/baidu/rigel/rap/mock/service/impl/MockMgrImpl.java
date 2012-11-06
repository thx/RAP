package com.baidu.rigel.rap.mock.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import nl.flotsam.xeger.Xeger;

import com.baidu.rigel.rap.common.ArrayUtils;
import com.baidu.rigel.rap.common.NumberUtils;
import com.baidu.rigel.rap.mock.service.MockMgr;
import com.baidu.rigel.rap.project.bo.Action;
import com.baidu.rigel.rap.project.bo.Parameter;
import com.baidu.rigel.rap.project.dao.ProjectDao;

public class MockMgrImpl implements MockMgr {
	private ProjectDao projectDao;
	
	/**
	 * random seed
	 */
	private int _num = 1;
	private String[] NAME_LIB = {"圣香", "定球", "征宇", "灵兮", "永盛", "小婉", "紫丞", "少侠", "木谦", "周亮", "宝山", "张中", "晓哲老师", "夜沨大湿"};
	private String[] LOCATION_LIB = {"北京 朝阳区", "北京 海淀区", "北京 昌平区", "吉林 长春 绿园区", "吉林 吉林 丰满区"};
	private String[] PHONE_LIB = {"15813243928", "13884928343", "18611683243", "18623432532"};
	public ProjectDao getProjectDao() {
		return projectDao;
	}

	public void setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
	}

	@Override
	public String generateData(int projectId, String pattern) {
		_num = 1;
		if (pattern.contains("?")) {
			pattern = pattern.substring(0, pattern.indexOf("?"));
		}
		List<Action> aList = projectDao
				.getMatchedActionList(projectId, pattern);
		if (aList.size() == 0)
			return "{\"isOk\":false, \"errMsg\":\"no matched action\"}";
		Action action = aList.get(0);
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
		return json.toString();
	}

	private void recursivelyLoadMockData(Parameter p) {
		if (p.getMockData() != null && !p.getMockData().equals("")) {
			p.setMockDataTEMP(p.getMockData());
		} else {
			p.setMockDataTEMP(p.getRemark());
		}
		if (p.getParameterList() == null) return;
		for (Parameter subP : p.getParameterList()) {
			recursivelyLoadMockData(subP);
		}
	}

	/**
	 * build JSON
	 * @param json string builder
	 * @param para parameter to be parsed
	 * @param index available in array<object> stands for index of array, 
	 * used for special mode of tags like @format[3] which means the third
	 * record enabled only. Default value should be -1 which disabled the feature.
	 */
	private void buildJson(StringBuilder json, Parameter para, int index) {
		boolean isArrayObject = para.getDataType().equals("array<object>");
		int ARRAY_LENGTH = isArrayObject ? 5 : 1;
		String[] tags = para.getMockDataTEMP().split(";");
		Map<String, String> tagMap = new HashMap<String, String>();
		parseTags(tags, tagMap, false);
		String length = tagMap.get("length");
		if (length != null && !length.isEmpty()) {
			ARRAY_LENGTH = Integer.parseInt(length);
		}
		if (para.getParameterList() == null
				|| para.getParameterList().size() == 0) {
			json.append(para.getIdentifier() + ":"
					+ mockValue(para, index));
		} else {
			// object and array<object>
			json.append(para.getIdentifier() + ":");
			String left = "{", right = "}";
			
			if (isArrayObject) {
				left = "[";
				right = "]";
			}
			json.append(left);
			boolean first;
			for (int i = 0; i <ARRAY_LENGTH; i++) {
				first = true;
				if (isArrayObject && i > 0) json.append(",");
				if (isArrayObject) json.append("{");
				for (Parameter p : para.getParameterList()) {
					if (first) {
						first = false;
					} else {
						json.append(",");
					}
					buildJson(json, p, i);
				}
				if (isArrayObject) json.append("}");				
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
					return "\"" + generator.generate() + "\"";
				}
			}
			
			regex = tagMap.get("regex");
			if (regex != null && !regex.isEmpty()) {
				Xeger generator = new Xeger(regex);
				return "\"" + generator.generate() + "\"";
			}
			
			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				// value should be like "$trueValue_INDEX_5"
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
			String value = tagMap.get("value_index");
			if (value != null && !value.isEmpty()) {
				String[] arr = value.split("_INDEX_");
				int tagIndex = Integer.parseInt(arr[1]);
				if (tagIndex == index) {
					value = arr[0];
					if (value.contains("[name]")) {
						return "\"" + NAME_LIB[NumberUtils.randomInt(NAME_LIB.length)] + "\"";
					} else if (value.contains("[location]")) {
						return "\"" + LOCATION_LIB[NumberUtils.randomInt(LOCATION_LIB.length)] + "\"";
					} else if (value.contains("[phone]")) {
						return "\"" + PHONE_LIB[NumberUtils.randomInt(PHONE_LIB.length)] + "\"";
					} else {
						return "\"" + value + "\"";
					}
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				if (value.contains("[name]")) {
					return "\"" + NAME_LIB[NumberUtils.randomInt(NAME_LIB.length)] + "\"";
				} else if (value.contains("[location]")) {
					return "\"" + LOCATION_LIB[NumberUtils.randomInt(LOCATION_LIB.length)] + "\"";
				} else if (value.contains("[phone]")) {
					return "\"" + PHONE_LIB[NumberUtils.randomInt(PHONE_LIB.length)] + "\"";
				} else {
					return "\"" + value + "\"";
				}
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
					return "\"" + value + "\"";
				}
			}
			value = tagMap.get("value");
			if (value != null && !value.isEmpty()) {
				return "\"" + value + "\"";
			}
			return "[\"测试1\", \"测试2\", \"测试3\", \"测试4\", \"测试5\"]";
		} 
		return returnValue;
	}

	
	/**
	 * from tag string to tag map
	 * @param tags tag string input by parsing whole string splited by seperator ";"
	 * @param tagMap tag map
	 * @param isMocking
	 */
	private void parseTags(String[] tags, Map<String, String> tagMap, boolean isMocking) {
		for(String tag : tags) {
			// tag format validation
			if (tag.startsWith("@") && tag.contains("=")) {
				if (tag.startsWith("@value")) {
					String val = tag.split("=")[1];
					if (val.contains("[xx]") && isMocking) {
						Integer n = _num++ % 30;
						val = val.replace("[xx]", n >= 10 ? n.toString() : "0" + n);
					}
					if (tag.contains("value[")) {
						tagMap.put("value_index", val + "_INDEX_" + tag.substring(tag.indexOf("[") + 1, tag.indexOf("]")));
					} else {
						tagMap.put("value", val);
					}
				}  else if (tag.startsWith("@format")) {
					if (tag.contains("format[")) {
						tagMap.put("format_index", tag.split("=")[1] + "_INDEX_" + tag.substring(tag.indexOf("[") + 1, tag.indexOf("]")));
					} else {
						tagMap.put("format", tag.split("=")[1]);
					}
				} else if (tag.startsWith("@length")) {
					if (tag.contains("length[")) {
						tagMap.put("length_index", tag.split("=")[1] + "_INDEX_" + tag.substring(tag.indexOf("[") + 1, tag.indexOf("]")));
					} else {
						tagMap.put("length", tag.split("=")[1]);
					}
				} else if (tag.startsWith("@regex")) {
					if (tag.contains("regex[")) {
						tagMap.put("regex_index", tag.split("=")[1] + "_INDEX_" + tag.substring(tag.indexOf("[") + 1, tag.indexOf("]")));
					} else {
						tagMap.put("regex", tag.split("=")[1]);
					}
				}
			}
		}
	}

	@Override
	public int modify(int actionId, String mockData) {
		Action action = projectDao.getAction(actionId);
		int num = 0;
		// parse mock data
		String[] mockDataSnips = mockData.split("_AND_");
		for (String snip : mockDataSnips) {
			Set<Parameter> pList = snip.startsWith("request.") ?
					action.getRequestParameterList() : action.getResponseParameterList();
			Parameter p = locateParam(pList, snip.substring(snip.indexOf(".") + 1));
			if (p == null) continue;
			String paramMockData = snip.substring(snip.indexOf("=") + 1);
			p.setMockData(paramMockData);
			num++;
		}
		return num;		
	}
	
	/**
	 * recursively locating parameter specified in the mock data
	 * @param pList
	 * @param snip request.a.b.c=@xxxx   =>    a.b.c==@xxxx (namely request. or response. removed)
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

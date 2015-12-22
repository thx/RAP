package com.taobao.rigel.rap.project.bo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.taobao.rigel.rap.common.StringUtils;

public class Parameter implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	private String mockData;

	public String getMockData() {
		return mockData;
	}

	public void setMockData(String mockData) {
		this.mockData = mockData;
	}

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = (name == null ? "" : name);
	}

	private String identifier;

	public String getIdentifier() {
        if (identifierChange != null) {
            return identifierChange;
        } else {
            return identifier;
        }
    }

    public String getIdentifierChange() {

        return identifierChange;
    }

    public void setIdentifierChange(String identifierChange) {
        this.identifierChange = identifierChange;
    }

    private String identifierChange;

    public String getRemarkChange() {
        return remarkChange;
    }

    public void setRemarkChange(String remarkChange) {
        this.remarkChange = remarkChange;
    }

    private String remarkChange;

	public String getMockIdentifier() {
		String rv = "";
		if (identifier == null || identifier.isEmpty()) {
			return "\"emptyIdentifier\"";
		}

		rv = identifier;
		if (rv != null && !rv.isEmpty()) {
			int index = rv.indexOf("|");
			if (index > -1) {
				rv = rv.substring(0, index);
			}
		}
		return "\"" + rv + "\"";
	}

    public String getIdentifierWithoutMockjsRule() {
        String rv;
        if (identifier == null || identifier.isEmpty()) {
            return "emptyIdentifier";
        }

        rv = identifier;
        if (rv != null && !rv.isEmpty()) {
            int index = rv.indexOf("|");
            if (index > -1) {
                rv = rv.substring(0, index);
            }
        }
        return rv;
    }

	public String getMockJSIdentifier() {
		String rv = "";
		if (identifier == null || identifier.isEmpty()) {
			return "\"emptyIdentifier\"";
		}
		rv = identifier;
		return "\"" + rv + "\"";
	}

	public void setIdentifier(String identifier) {
		this.identifier = (identifier == null ? "" : identifier);
	}

	private String dataType;

	public String getDataType() {
		if (this.dataType == null || this.dataType.trim().isEmpty()) {
			return "";
		}
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = (dataType == null ? "" : dataType);
	}

	private String remark;

	public String getRemark() {
        if (remarkChange != null) {
            return remarkChange;
        }
		return (remark == null ? "" : remark);
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	private Set<Action> actionRequestList = new HashSet<Action>();

	public Set<Action> getActionRequestList() {
		return actionRequestList;
	}

	public void setActionRequestList(Set<Action> actionRequestList) {
		this.actionRequestList = actionRequestList;
	}

	private Set<Action> actionResponseList = new HashSet<Action>();

	public Set<Action> getActionResponseList() {
		return actionResponseList;
	}

	public void setActionResponseList(Set<Action> actionResponseList) {
		this.actionResponseList = actionResponseList;
	}

	private String validator = "";

	public String getValidator() {
		return validator;
	}

	public void setValidator(String validator) {
		this.validator = validator;
	}

	private Set<Parameter> parameterList = new HashSet<Parameter>();

	public Set<Parameter> getParameterList() {
		return parameterList;
	}

	public void setParameterList(Set<Parameter> parameterList) {
		this.parameterList = parameterList;
	}

	public void update(Parameter parameter) {
		setDataType(parameter.getDataType());
		setIdentifier(parameter.getIdentifier());
		setName(parameter.getName());
		setRemark(parameter.getRemark());
		setValidator(parameter.getValidator());
	}

	public List<Parameter> getParameterListOrdered() {
		Set<Parameter> parameterList = getParameterList();
		List<Parameter> parameterListOrdered = new ArrayList<Parameter>();
		parameterListOrdered.addAll(parameterList);
		Collections.sort(parameterListOrdered, new ParameterComparator());
		return parameterListOrdered;
	}

	private Set<Parameter> complexParamerterList = new HashSet<Parameter>();

	public Set<Parameter> getComplexParameterList() {
		return complexParamerterList;
	}

	public void setComplexParameterList(Set<Parameter> complexParameterList) {
		this.complexParamerterList = complexParameterList;
	}

	public void addChild(Parameter parameter) {
		getParameterList().add(parameter);
		parameter.getComplexParameterList().add(this);
	}

	public String toString() {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("{\"id\":" + getId() + ",");
		stringBuilder.append("\"identifier\":\""
				+ StringUtils.escapeInJ(getIdentifier()) + "\",");
		stringBuilder.append("\"name\":\"" + StringUtils.escapeInJ(getName())
				+ "\",");
		stringBuilder.append("\"remark\":\""
				+ StringUtils.escapeInJ(getRemark()) + "\",");
		stringBuilder.append("\"parameterList\":");
		stringBuilder.append("[");
		Iterator<Parameter> iterator = getParameterListOrdered().iterator();
		while (iterator.hasNext()) {
			stringBuilder.append(iterator.next());
			if (iterator.hasNext()) {
				stringBuilder.append(",");
			}
		}
		stringBuilder.append("],");
		stringBuilder.append("\"validator\":\""
				+ StringUtils.escapeInJ(getValidator()) + "\",");
		stringBuilder.append("\"dataType\":\""
				+ StringUtils.escapeInJ(getDataType()) + "\"}");
		return stringBuilder.toString();
	}

    public String getRemarkWithoutMockjsRule() {
        if (remark != null && remark.contains("@mock=")) {
            return remark.substring(0, remark.indexOf("@mock="));
        } else {
            return remark;
        }
    }

    public String getMockJsRules() {
        if (remark == null || remark.isEmpty() || (!remark.contains("@mock="))) {
            return null;
        }
        return remark.substring(remark.indexOf("@mock=") + 6);

    }


	public String getJSONSchemaDataType() {
		if (dataType != null && dataType.contains("array")) {
            return "array";
        }
		return this.dataType;
	}

    public boolean hasMockJSData() {
        return this.getMockJsRules() != null;
    }


}

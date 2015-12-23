/**
 * RAP接口规范DEMO
 */

{
    "id"
:
    627,                                          // 请求ID
        "name"
:
    "报表数据",                                  // 请求名称
        "description"
:
    "获取报表数据",                        // 请求描述
        "requestType"
:
    "1",                                 // 请求类型（GET/POST）
        "requestUrl"
:
    "/snsADGroup/listSNSADGroup.htm",     // 请求链接
        "responseTemplate"
:
    "",
    /**
     * 请求参数列表
     */
        "requestParameterList"
:
    [{
        "id": 11819,                // 参数ID
        "identifier": "queryVO",    // 参数标识符
        "name": "请求对象",          // 参数名称
        "remark": "@mock=@EMAIL",   // 备注、RAP MOCK、MockJS标签
        "validator": "",            // 验证器
        "dataType": "object",       // 数据类型
        "parameterList": [{         // 子参数列表
            "id": 11825,
            "identifier": "campaignType",
            "name": "计划类型",
            "remark": "固定为20;@value=20",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 11824,
            "identifier": "queryState",
            "name": "状态过滤",
            "remark": "0-全部,1-推广中,2-暂停,3-拒绝,4-待处理,5-已过期,6-审核中",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 11822,
            "identifier": "pageNumber",
            "name": "页码",
            "remark": "",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 12051,
            "identifier": "endDate",
            "name": "结束日期",
            "remark": "",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 11823,
            "identifier": "pageSize",
            "name": "每页条目数",
            "remark": "@value=20",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 11820,
            "identifier": "query",
            "name": "搜索关键词",
            "remark": "",
            "parameterList": [],
            "validator": "",
            "dataType": "string"
        }, {
            "id": 11821,
            "identifier": "startDate",
            "name": "开始日期",
            "remark": "",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }]
    }],
    /**
     * 响应参数列表
     *
     * 结构与请求参数列表相同
     */
        "responseParameterList"
:
    [{
        "id": 11635,
        "identifier": "result",
        "name": "",
        "remark": "",
        "parameterList": [{
            "id": 11832,
            "identifier": "totalItem",
            "name": "",
            "remark": "@value=12",
            "parameterList": [],
            "validator": "",
            "dataType": "string"
        }, {
            "id": 11864,
            "identifier": "pageSize",
            "name": "每页条目数",
            "remark": "@value=20",
            "parameterList": [],
            "validator": "",
            "dataType": "number"
        }, {
            "id": 11834,
            "identifier": "items",
            "name": "",
            "remark": "@length=20",
            "parameterList": [{
                "id": 11865,
                "identifier": "snsADGroupDTO",
                "name": "推广组",
                "remark": "",
                "parameterList": [{
                    "id": 11870,
                    "identifier": "startTime",
                    "name": "投放开始日期",
                    "remark": "@value=2013-11-01",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "string"
                }, {
                    "id": 12246,
                    "identifier": "onlineStatus",
                    "name": "状态",
                    "remark": "0-暂停;1-推广中;@regex=[01]",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "number"
                }, {
                    "id": 11869,
                    "identifier": "title",
                    "name": "推广单元名称",
                    "remark": "@regex=单元[0-9a-z]{4}",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "string"
                }, {
                    "id": 11868,
                    "identifier": "endTime",
                    "name": "投放结束日期",
                    "remark": "@value=2013-11-11",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "string"
                }, {
                    "id": 11867,
                    "identifier": "id",
                    "name": "推广组ID",
                    "remark": "@format=xxxxxx",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "number"
                }],
                "validator": "",
                "dataType": "object"
            }, {
                "id": 12245,
                "identifier": "status",
                "name": "状态",
                "remark": "0-全部,1-推广中,2-暂停,3-拒绝,4-待处理,5-已过期,6-审核中;@regex=[0-6]",
                "parameterList": [],
                "validator": "",
                "dataType": "number"
            }, {
                "id": 11871,
                "identifier": "snsCreativeDTO",
                "name": "创意",
                "remark": "",
                "parameterList": [{
                    "id": 11872,
                    "identifier": "title",
                    "name": "创意内容",
                    "remark": "@value=创意内容test [宝贝链接1][宝贝链接2][宝贝链接3]",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "string"
                }, {
                    "id": 11879,
                    "identifier": "adgroupId",
                    "name": "推广组ID",
                    "remark": "前端暂时用不上",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "number"
                }, {
                    "id": 11873,
                    "identifier": "areaList",
                    "name": "宝贝列表",
                    "remark": "@length=3",
                    "parameterList": [{
                        "id": 11878,
                        "identifier": "bidPrice",
                        "name": "宝贝出价",
                        "remark": "分;@format=xxx",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "number"
                    }, {
                        "id": 11876,
                        "identifier": "title",
                        "name": "宝贝名称",
                        "remark": "@regex=宝贝名称[0-9a-z]{4}",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "string"
                    }, {
                        "id": 11963,
                        "identifier": "itemId",
                        "name": "宝贝ID",
                        "remark": "调用报表时的entityId;@value=1200[xx]",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "number"
                    }, {
                        "id": 11874,
                        "identifier": "imgUrl",
                        "name": "宝贝URL",
                        "remark": "@value=http://g.search3.alicdn.com/img/bao/uploaded/i4/i4/15103030501261469/T1KksSFddaXXXXXXXX_!!0-item_pic.jpg",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "string"
                    }, {
                        "id": 12249,
                        "identifier": "linkUrl",
                        "name": "宝贝链接",
                        "remark": "@value=http://item.taobao.com/item.htm?id=25604888180",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "string"
                    }, {
                        "id": 11877,
                        "identifier": "itemPrice",
                        "name": "宝贝价格",
                        "remark": "分;@format=xxx",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "number"
                    }, {
                        "id": 11875,
                        "identifier": "feedId",
                        "name": "物料ID",
                        "remark": "@value=1000[xx]",
                        "parameterList": [],
                        "validator": "",
                        "dataType": "number"
                    }],
                    "validator": "",
                    "dataType": "array<object>"
                }, {
                    "id": 11880,
                    "identifier": "id",
                    "name": "创意ID",
                    "remark": "@value=1001",
                    "parameterList": [],
                    "validator": "",
                    "dataType": "number"
                }],
                "validator": "",
                "dataType": "object"
            }],
            "validator": "",
            "dataType": "array<object>"
        }, {
            "id": 11833,
            "identifier": "toPage",
            "name": "",
            "remark": "@value=1",
            "parameterList": [],
            "validator": "",
            "dataType": "string"
        }],
        "validator": "",
        "dataType": "object"
    }, {
        "id": 11649,
        "identifier": "msg",
        "name": "",
        "remark": "",
        "parameterList": [],
        "validator": "",
        "dataType": ""
    }, {
        "id": 11650,
        "identifier": "hostName",
        "name": "",
        "remark": "@value=newbpfepre1.vm.kgb.cm6",
        "parameterList": [],
        "validator": "",
        "dataType": "string"
    }, {
        "id": 11648,
        "identifier": "code",
        "name": "",
        "remark": "@value=200",
        "parameterList": [],
        "validator": "",
        "dataType": "number"
    }]
}
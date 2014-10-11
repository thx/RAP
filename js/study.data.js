!function(g) {

    if (!g.console) {
        var efn = function(){};
        g.console = {
            'log' : efn,
            'info' : efn,
            'error' : efn
        };
    }
    'use strict';
    var data = [
        {
            'title' : '基础',
            'contents' : [
                {
                    'title' : '登录',
                    'url'   : 'http://cloud.video.taobao.com//play/u/1018757965/p/2/e/1/t/1/17661220.swf'
                }, {
                    'title' : '创建项目',
                    'url'   : 'http://cloud.video.taobao.com//play/u/1018757965/p/1/e/1/t/1/17661402.swf'
                }, {
                    'title' : '管理组织结构'
                }
            ]
        }, {
            'title' : '文档编辑',
            'contents' : [
                {
                    'title' : '文档编辑入门'
                }, {
                    'title' : '版本控制'
                }, {
                    'title' : 'JSON导入'
                }
            ]
        }, {
            'title' : 'MOCK工具',
            'contents' : [
                {
                    'title' : 'MOCK工具入门'
                }, {
                    'title' : 'MOCK工具进阶'
                }, {
                    'title' : '项目间共享MOCK数据'
                }, {
                    'title' : 'RESTFul API的支持'
                }
            ]
        }
    ];

    console.log('data load');

    g.data = data;
}(this);

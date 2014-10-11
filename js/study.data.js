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
                    'url'   : 'http://cloud.video.taobao.com//play/u/1018757965/p/2/e/1/t/1/17661402.swf'
                }, {
                    'title' : '管理组织结构',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17767958.swf'
                }
            ]
        }, {
            'title' : '文档编辑',
            'contents' : [
                {
                    'title' : '文档编辑入门',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17768437.swf'
                }, {
                    'title' : '版本控制',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17768638.swf'
                }, {
                    'title' : 'JSON导入',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17770570.swf'
                }
            ]
        }, {
            'title' : 'MOCK工具',
            'contents' : [
                {
                    'title' : 'MOCK工具入门',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17772031.swf'
                }, {
                    'title' : 'MOCK工具进阶',
                    'url'   : ''
                }, {
                    'title' : '项目间共享MOCK数据',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17775467.swf'
                }, {
                    'title' : 'RESTFul API的支持',
                    'url'   : 'http://cloud.video.taobao.com//play/u/11051796/p/2/e/1/t/1/17774663.swf'
                }
            ]
        }
    ];

    console.log('data load');

    g.data = data;
}(this);

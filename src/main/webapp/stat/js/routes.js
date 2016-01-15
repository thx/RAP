(function ($) {
    var URLS = {
        org: {
            home: {
                'projects': '/org/projects.do',
                'productlines': '/org/home/productlines.do',
                'groups': '/org/home/groups.do',
                'grouplist': '/org/group/groups.do'
            },
            group: {
                'all': '/org/group/all.do',
                'update': '/org/group/update.do',
                'delete': '/org/group/delete.do',
                'create': '/org/group/create.do'
            },
            productline: {
                'all': '/org/productline/all.do',
                'update': '/org/productline/update.do',
                'delete': '/org/productline/delete.do',
                'create': '/org/productline/create.do'
            },
            project: {
                'create': '/project/create.do',
                'delete': '/project/delete.do',
                'update': '/project/update.do',
                'search': '/project/search.do'
            },
            account: {
                'all': '/account/all.action'
            },
            team: {
                'create': '/org/team/create.do',
                'changeAccessType': '/org/team/changeAccessType.do',
                'deleteMember': '/org/team/deleteMember.do',
                'addMembers': '/org/team/addMembers.do',
                'update': '/org/team/update.do'
            }
        },
        workspace: {
            'mine': '/workspace/myWorkspace.do'
        },
        notify: {
            'unread': '/account/getUnreadNotificationList.do',
            'clear': '/account/clearUnreadNotifications.do',
            'all': '/account/getNotificationList.do',
            'delete': '/account/readAllNotification.do'
        }
    };

    // 一个简单的路由对应
    // org.group.all
    // org.productline.update
    $.route = function (path) {
        var splited = path.split('.');
        var base = URLS, i = 0, l = splited.length, c;
        while (i < l) {
            c = splited[i];
            if (i == l - 1) {
                if (c in base) {
                    return base[c];
                }
            }
            if (c in base) {
                base = base[c];
                i++;
            } else {
                return null;
            }
        }
    }
    $.route._urls = function () {
        console.log(JSON.stringify(URLS, null, 2))
    };

    var regs = {
        id: /(&|\?)?id\s*=\s*([\w\d_-]+)/,
        plid: /(&|\?)?plid\s*=\s*([\w\d_-]+)/
    }
    $.getLoc = function (prop) {
        var reg = regs[prop];
        var matched = reg.exec(window.location.href);
        if (matched) {
            return matched[2];
        } else {
            return '';
        }
    };

    $.local = function (key, value) {
        if (arguments.length == 0) {
            console.log($.__locals);
            return;
        }
        if (arguments.length == 1) {
            $.__locals = $.__locals || {};
            return $.__locals[key];
        }
        $.__locals[key] = value;
    };

    $.autocomplete = function (modal, users) {
        modal = $(modal);
        var con = modal.find('.accounts-con');
        var inputer = modal.find('.accounts-inputer');
        if (!inputer.data('blur-binded')) {
            inputer.data('blur-binded', 1);
            inputer.on('blur', function () {
                setTimeout(function () {
                    con && con.hide();
                }, 200);
            });
        }
        var val = inputer.val().trim();
        if (val == '') {
            return;
        }
        var picked = [];
        var nodes = modal.find('.picked-user');
        for (var i = 0, l = nodes.length; i < l; i++) {
            picked.push($(nodes[i]).data('account'));
        }
        var remained = [];
        users.forEach(function (user) {
            if (remained.length >= 10) {
                return;
            }
            if (picked.indexOf(user.account) != -1) {
                return;
            }

            if (user.account && user.account.indexOf(val) != -1) {
                remained.push(user);
            } else if (user.name && user.name.indexOf(val) != -1) {
                remained.push(user);
            } else if (user.realName && user.realName.indexOf(val) != -1) {
                remained.push(user);
            } else if (user.realNamePinyin && user.realNamePinyin.indexOf(val) != -1) {
                remained.push(user);
            } else if (user.namePinyin && user.namePinyin.indexOf(val) != -1) {
                remained.push(user);
            }
        });
        if (remained.length == 0) {
            remained.push({block: true})
        }
        var tmpl = $('#user-auto-list').text();
        var itemTeml = $('#user-item-tmpl').text();
        var html = $.render(tmpl, {
            users: remained
        });

        con.show();
        con.html(html);
        var pos = inputer.position();
        con.css({
            left: pos.left,
            top: pos.top + inputer.outerHeight() + 2
        });
        if (!con.data('inited')) {
            con.data('inited', 1);
            con.delegate('li', 'click', function () {
                if ($(this).data('block')) {
                    return;
                }
                var node = $(this);
                inputer.before($.render(itemTeml, {
                    name: node.data('name'),
                    account: node.data('account')
                }));
                con.hide();
                inputer.val('');
                setTimeout(function () {
                    inputer && inputer.focus();
                }, 200);
            });
        }
    }
})($);


$(function () {
    var con = $('.messages-container');
    if (con.length == 0) {
        return;
    }

    var btns = '<input type="button" class="btn btn-primary set-btn" value="设置"/>\
		<input type="button" class="btn btn-warning clear-btn" value="清空"/>\
		<input type="button" class="btn btn-default close-btn" value="关闭"/>';
    var tmpl = '<ul class="list-unstyled">\
			{{#changelogs}}<li>{{{desc}}}<button class="close hide" data-id="{{id}}">&times;</button></li>{{/changelogs}}\
		</ul>';
    var noMsgs = '<div class="no-msgs">没有消息提醒</div>';

    var label = $('.messages-trigger .label');

    var test = {
        changelogs: [{
            id: 1,
            type: 'project',
            operate: 'modify',
            id: '123',
            field: '名称',
            from: '项目A',
            to: '项目B',
            operatorId: 21,
            operator: '思竹',
            date: '2014-3-21',
            detail: 11
        }, {
            id: 1,
            type: 'project',
            operate: 'delete',
            id: '123',
            field: '',
            from: '测试项目',
            to: '',
            operatorId: 21,
            operator: '思竹',
            date: '2014-3-21',
            detail: 11
        }, {
            id: 2,
            type: 'action',
            operate: 'modify',
            id: '1223',
            field: '名称',
            from: '请求A',
            to: '请求A+',
            operatorId: 21,
            operator: '思竹',
            date: '2014-3-21',
            detail: 22
        }, {
            id: 3,
            type: 'action',
            operate: 'delete',
            id: '1223',
            field: '',
            from: '请求A',
            to: '',
            operatorId: 21,
            operator: '思竹',
            date: '2014-3-21',
            detail: 33
        }]
    }

    $.get($.route('notify.unread'), {}, function (data) {
        if (data.length == 0) {
            reset();
        } else {
            generateHTML(data);
        }
    }, 'JSON');

    function href(text, link) {
        return '<a href="' + link + '" target="_blank">' + text + '</a>';
    }

    function create() {
        return '<span class="label label-success">增</span> ';
    }

    function del() {
        return '<span class="label label-danger">删</span> ';
    }

    function update() {
        return '<span class="label label-info">改</span> ';
    }

    function wrap(name) {
        return '"' + name + '"';
    }

    var notifyTmpl = '<span class="label label-{{style}}">{{text}}</span> {{targetUser.name}} {{operate}}了项目 <a href="/workspace/myWorkspace.action?projectId={{param1}}" target="_blank">{{param2}}</a> <span class="pull-right" style="color: #AAA;">({{createTimeStr}})</span>';

    function renderNotification(obj) {
        if (obj.typeId == 1) {
            obj.style = 'info';
            obj.text = '改';
            obj.operate = '修改'
        } else if (obj.typeId == 2) {
            obj.style = 'success';
            obj.text = '增';
            obj.operate = '把你加入'
        }
        return $.render(notifyTmpl, obj);
    }

    function generateHTML(data) {
//		var chMapper = {
//			project: '项目',
//			action: '接口'
//		}
        var translated = [];
        data.forEach(function (log) {
            translated.push({
                desc: renderNotification(log),
                id: log.id
            });
//			console.log(log);
//			var type = log.type, operate = log.operate;
//			var cnName = chMapper[type] || '实体';
//			if (operate == 'create') {
//				log.desc = create() + href(log.operator, log.operatorId) + ' 创建了' + cnName + ' ' + wrap(log.to) + '';
//			} else if (operate == 'delete') {
//				log.desc = del() + href(log.operator, log.operatorId) + ' 删除了' + cnName + ' ' + wrap(log.from) + '';
//			} else if (operate == 'modify') {
//				log.desc = update() + href(log.operator, log.operatorId) + ' 将' + cnName + ' ' + wrap(log.from) + ' 的名称修改为 ' + wrap(log.to) + '';
//			}
        });
        con.find('.msgs').html($.render(tmpl, {
            changelogs: translated
        }))

        fillBtns();

        label.text(data.length).show();
    }

    var btnsInited = false;

    function fillBtns() {
        if (btnsInited) {
            return;
        }
        btnsInited = true;
        con.find('.btns').html(btns);
        con.find('.close-btn').click(function () {
            $(this).parents('li').toggleClass('open');
        })
        con.find('.set-btn').click(function () {
            window.location.href = '/account/mySetting.action';
        })

        con.delegate('button.close', 'click', function (e) {
            $(this).parent().remove();
            label.text(label.text() - 1);
            if (label.text() == '0') {
                reset();
            }
        });

        con.find('.clear-btn').click(function () {
            var noMsgsEle = $('.messages-container .no-msgs');
            if (noMsgsEle.length == 1) {
                if (noMsgsEle.hasClass('shake')) {
                    return;
                }
                noMsgsEle.addClass('shake');
                setTimeout(function () {
                    noMsgsEle.removeClass('shake');
                }, 1000);
                return;
            }
            $.confirm({
                content: '确定要清空所有的提醒消息么？',
                title: '清空提醒消息',
                confirmText: '确定',
                cancelCallback: function () {
                },
                confirmClicked: function () {
                    var modal = $(this);
                    $.post($.route('notify.delete'), {}, function (data) {
                        if (data.code != 200) {
                            alert(data.msg)
                        } else {
                            reset();
                        }
                        modal.modal('hide');
                    }, "JSON")
                }
            })
        })

    }

    function reset() {
        fillBtns();
        con.find('.msgs').html(noMsgs);
        con.parents('li').removeClass('open');
        label.hide();
    }

    $('.messages-trigger').click(function (e) {
        e.preventDefault();
        $(this).parents('li').toggleClass('open');
    })
})
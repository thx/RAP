$(function() {
    //$(".content").html('group here');
    //$.get($.route('org.home.projects'), function(data) {
    //  console.log(data.isOk);
    //}, 'JSON');

    var NAME_MAP = {
        'user': '我的项目',
        'star': '重要项目',
        'heart': '我关注的项目'
    };

    function getUsers(callback) {
        if ($.local('users')) {
            callback($.local('users'));
            return;
        }
        $.get($.route('org.account.all'), function(data) {
            users = data.users;
            $.local('users', users);
            callback(users);
        }, "JSON");
    }

    function bindEvents() {
        $('body')
        .delegate('.box .info, .box .tools .glyphicon-eye-open', 'click', function() {
            var box = $(this);
            box = box.parents('.box');
            var projId = box.data('projid');
            window.open($.route('workspace.mine') + '?projectId=' + projId);
        })
        .delegate('.box-to-add', 'click', function() {
            var that = this;
            var groupId = $(this).data('groupid');
            getUsers(function(users) {
                $.confirm({
                    content: $.render($('#create-proj-tmpl').text(), {}),
                    title: '创建项目',
                    confirmText: '确认创建',
                    showCallback: function() {
                        var that = this;
                        $(this).find('input[type=text]').focus();
                        $(this).find('.picking-user').delegate('.unpick-btn', 'click', function() {
                            $(this).parent('.picked-user').remove();
                        });
                        $(this).find('.accounts-inputer').keyup(function() {
                            $.autocomplete(that, users);
                        }).focus(function() {
                            $.autocomplete(that, users);
                        });
                        $('.project-target .team').change(function() {
                            var corpId = $(this).val();
                            if (corpId === '') {
                                return;
                            }
                            fillSelectAsync('org.productline.all', {
                                corpId: corpId
                            }, $('#option-list-tmpl').text(), '.project-target .productline');
                        });
                        $('.project-target .productline').change(function() {
                            var plId = $(this).val();
                            if (!plId) {
                                return;
                            }
                            fillSelectAsync('org.group.all', {
                                productLineId: plId
                            }, $('#option-list-tmpl').text(), '.project-target .group');
                        });
                    },
                    confirmClicked: function() {
                        var inputer = $(this).find('input[type=text]');
                        if (inputer.val().trim() === '') {
                            inputer.addClass('shake');
                            inputer.focus();
                            setTimeout(function() {
                                inputer && inputer.removeClass('shake');
                            }, 1000);
                            return;
                        }
                        var grouper = $(this).find('.project-target .group');

                        if (grouper.val().trim() === '') {
                            var parent = grouper.parents('.project-target');
                            parent.addClass('shake');
                            setTimeout(function() {
                                parent && parent.removeClass('shake');
                            }, 1000);
                            return;
                        }

                        var groupId = grouper.val();
                        var tmpl = $('#create-proj-success-tmpl').text();
                        var modal = $(this);
                        var accounts = $(this).find('.picked-user');
                        var values = [];
                        for(var i = 0, l = accounts.length; i < l; i++) {
                            var current = $(accounts[i]);
                            values.push(current.data('account') + '(' + current.data('name') + ')');
                        }
                        $.post($.route('org.project.create'), {
                            groupId: groupId,
                            name: inputer.val(),
                            desc: $(this).find('textarea.desc').val(),
                            accounts: values.join(', ')
                        }, function(data) {
                            data = data.result;
                            data.status = data.status || '刚刚创建';
                            var html = $.render(tmpl, data);
                            $(that).before(html);
                            modal.modal('hide');
                        }, "JSON");
                    }
                });
            });
        })
        .delegate('.box .glyphicon-pencil', 'click', function() {
            var id = $(this).data('id');
            var box = $(this).parents('.box');
            var name = box.find('.info .title').html();
            var desc = box.find('.info .intro').html();
            var accounts = box.find('.accounts-hidden').val();
            var splited = accounts.split(',');
            var pickeds = [];
            var reg = /(.+)\s*\(([^,]+)\)/;
            for(var i = 0, l = splited.length; i < l; i++) {
                var matched = reg.exec(splited[i]);
                if (matched) {
                    pickeds.push({
                        name: matched[2],
                        account: matched[1]
                    });
                }
            }
            getUsers(function(users) {
                $.confirm({
                    content: $.render($('#update-proj-tmpl').text(), {
                        name: name,
                        desc: desc,
                        users: pickeds
                    }),
                    title: '修改项目',
                    confirmText: '确认修改',
                    showCallback: function() {
                        var that = this;
                        $(this).find('input[type=text]').focus();
                        $(this).find('.picking-user').delegate('.unpick-btn', 'click', function() {
                            $(this).parent('.picked-user').remove();
                        });
                        $(this).find('.accounts-inputer').keyup(function() {
                            $.autocomplete(that, users);
                        }).focus(function() {
                            $.autocomplete(that, users);
                        });
                    },
                    confirmClicked: function() {
                        var inputer = $(this).find('input[type=text]');
                        if (inputer.val().trim() === '') {
                            inputer.addClass('shake');
                            inputer.focus();
                            setTimeout(function() {
                                inputer && inputer.removeClass('shake');
                            }, 1000);
                            return;
                        }
                        var tmpl = $('#create-proj-success-tmpl').text();
                        var modal = $(this);
                        var accounts = $(this).find('.picked-user');
                        var values = [];
                        for(var i = 0, l = accounts.length; i < l; i++) {
                            var current = $(accounts[i]);
                            values.push(current.data('account') + '(' + current.data('name') + ')');
                        }
                        $.post($.route('org.project.update'), {
                            id: id,
                            name: inputer.val(),
                            desc: $(this).find('textarea.desc').val(),
                            accounts: values.join(', ')
                        }, function(data) {
                            if (data.code != '200') {
                                modal.modal('hide');
                                alert(data.msg);
                                return;
                            }
                            data = data.result;
                            data.status = data.status || '刚刚更新';
                            var html = $.render(tmpl, data);
                            box.replaceWith(html);
                            modal.modal('hide');
                        }, "JSON");
                    }
                });
            });
        })
        .delegate('.box .glyphicon-export', 'click', function() {
        	var id = $(this).data('id');
        	var url = '';
        	$.message({
        		 content: '<input type="text" id="rap-plugin-inputer" class="form-control" value="<script src=\'http://rap.alibaba-inc.com/rap.plugin.js?projectId=' + id + '\'></script>" />',
                 title: '复制RAP插件地址',
                 showCallback: function() {
                	 $('#rap-plugin-inputer').focus();
                 }
        	});
        })
        .delegate('.box .glyphicon-trash', 'click', function() {
            var id = $(this).data('id');
            var box = $(this).parents('.box');
            $.confirm({
                content: '删除以后不可恢复，请谨慎操作',
                title: '删除项目',
                confirmText: '确认删除',
                confirmClicked: function() {
                    var modal = $(this);
                    $.post($.route('org.project.delete'), {
                        id: id
                    }, function(data) {
                        if (data.code == '200') {
                            box.hide('slow', function() {
                                box.remove();
                            });
                        } else {
                            alert(data.msg);
                        }
                        modal.modal('hide');
                    }, "JSON");
                }
            });
        });
    }

    function fillSelectAsync(route, params, tmpl, target) {
        $.get($.route(route), params, function(data) {
            if (data.groups) {
                data.items = data.groups;
            }
            if (data.items.length === 0) {
                data.items = [{id: '', name: '--无查询结果--'}];
            } else {
                data.items.unshift({id: '', name: '--请选择--'});
            }

            var html = $.render(tmpl, data);
            $(target).html(html);
        }, "JSON");
    }

    function bindSearchEvents() {
        var con = $('.project-autocomplete-con'),
            ul = $('.project-autocomplete-con ul');
        function handler(e) {
            var code = e.keyCode;
            if (code == 38 || code == 40) {
                return;
            }
            var jqThis = $(this),
                old = jqThis.data('oldValue'),
                val = jqThis.val().trim();
            if (old && old === val) {
                con.show();
                jqThis.data('searching', 0);
                return;
            }
            if (old) {
                jqThis.removeData('oldValue');
            }
            if (!jqThis.val().trim()) {
                con.hide();
                jqThis.data('searching', 0);
                return;
            }
            if (jqThis.data('searching')) {
                return;
            }
            jqThis.data('searching', 1);

            $.post($.route('org.project.search'), {key: val}, function(data) {
                if (!jqThis.data('searching')) {
                    // 可能返回途中，就已经不需要这个数据了，比如：清空了input
                    return;
                }
                jqThis.data('searching', 0);
                if (data && data.length === 0) {
                    data = [{id: '-1', name: '没有找到 "' + val + '" 对应的项目，o(╯□╰)o'}];
                }
                ul.html($.render($('#project-autocomplete-li').text(), {
                    projects: data
                }));
                con.show();
            }, 'JSON');
        }
        var inputer = $('.project-search-inputer'), prev;
        ul.delegate('li', 'mouseenter', function() {
            prev && prev.removeClass('active');
            prev = $(this).addClass('active');
        }).delegate('li', 'mouseleave', function() {
            $(this).removeClass('active');
        });
        inputer.focus(handler).keyup(handler).blur(function() {
            var jqThis = $(this), val = jqThis.val().trim();
            if (val) {
                jqThis.data('oldValue', val);
            }
            setTimeout(function() {
                con.hide();
            }, 300);
        }).keydown(function(e) {
            var code = e.keyCode;
            var active;
            var node;
            if (code == 38) {
                e.preventDefault();
                active = ul.children().index(ul.find('.active'));
                node = null;
                if (active === -1 || active === 0) {
                    node = ul.children().last();
                } else {
                    node = $(ul.children()[active - 1]);
                }
                if (prev) {
                    prev.removeClass('active');
                }
                node.addClass('active');
                prev = node;
            } else if (code == 40) {
                e.preventDefault();
                active = ul.children().index(ul.find('.active'));
                node = null;
                if (active == -1 || active == ul.children().length - 1) {
                    node = ul.children().first(); } else { node = $(ul.children()[active + 1]);
                }
                if (prev) {
                    prev.removeClass('active');
                }
                node.addClass('active');
                prev = node;
            } else if (code == 27) {
                con.hide();
                inputer.blur();
            } else if (code == 13) {
                if (prev) {
                    var id = prev.data('id');
                    if (id == '-1') {
                        return;
                    }
                    window.location.href = '/workspace/myWorkspace.action?projectId=' + id;
                }
            }
        });
        con.delegate('li', 'click', function() {
            var jqThis = $(this);
            var id = jqThis.data('id');
            if (id == '-1') {
                return;
            }
            window.location.href = '/workspace/myWorkspace.action?projectId=' + id;
        });
    }

    function render() {
        var tmpl = $('#group-tmpl').text();
        $.get($.route('org.home.projects'), {}, function(data) {
            data.groups.forEach(function (group) {
                group.name = NAME_MAP[group.type] || '其他';
                if (group.type == 'user') {
                    group.mine = true;
                }
            });
            var html = $.render(tmpl, data);
            $(".groups").html(html);

            bindEvents();
            bindSearchEvents();
        }, "JSON");
    }

    render();
});

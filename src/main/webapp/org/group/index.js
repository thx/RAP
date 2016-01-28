$(function () {
    //$(".content").html('group here');

    /*
     $.post(URLS['update'], {
     id: 1
     }, function(data) {
     console.log(data.isOk);
     }, 'JSON');*/

    var plId = $.getLoc('plid');
    if (!plId) {
        alert('亲，没有产品线ID，这不可能吧。。。')
        return;
    }

    function showUpdateGroupForm() {
        var prev = $(this).prev();
        prev.fadeIn();
        prev.find('input').val(prev.prev().text()).stop().delay(200, function () {
            $(this).focus();
        });
        $(this).hide();
    }

    function bindEvents() {
        $('body')
            .delegate('.update-group', 'click', showUpdateGroupForm)
            .delegate('.cancel-edit', 'click', function () {
                $(this).parent().hide().next().show();
            })
            .delegate('.delete-group', 'click', function () {
                var that = this;
                var con = $(that).parents('h3').next();
                if (con.find('.box').length != 0) {
                    con.addClass('shake');
                    timer = setTimeout(function () {
                        con.removeClass('shake');
                    }, 1000);
                    return;
                }
                var id = $(this).data('id');
                $.confirm({
                    content: '删除以后不能恢复，请谨慎操作',
                    title: '您确定要删除此分组吗？',
                    confirmText: '删除分组',
                    confirmClicked: function () {
                        var modal = $(this);
                        $.post($.route('org.group.delete'), {
                            id: id
                        }, function (data) {
                            con.parent('.group').hide('slow', function () {
                                $(this).remove();
                            });
                            modal.modal('hide');
                        }, "JSON")
                    }
                });
            })

            .delegate('.create-group', 'click', function () {
                $.confirm({
                    content: $('#create-group-tmpl').text(),
                    title: '创建分组',
                    confirmText: '确认创建',
                    showCallback: function () {
                        $(this).find('input[type=text]').focus();
                    },
                    confirmClicked: function () {
                        var tmpl = $('#group-tmpl').text();
                        var inputer = $(this).find('input[type=text]');
                        if (inputer.val().trim() == '') {
                            inputer.addClass('shake');
                            inputer.focus();
                            setTimeout(function () {
                                inputer && inputer.removeClass('shake');
                            }, 1000);
                            return;
                        }
                        var modal = $(this);
                        $.post($.route('org.group.create'), {
                            productlineId: plId,
                            name: inputer.val().trim()
                        }, function (data) {
                            var html = $.render(tmpl, data);
                            var node = $(html);
                            $(".groups").append(node);
                            modal.modal('hide');
                        }, "JSON")
                    }
                });
            })
            .delegate('.box .info, .box .tools .glyphicon-eye-open', 'click', function () {
                var box = $(this);
                box = box.parents('.box');
                var projId = box.data('projid');
                window.location.href = ($.route('workspace.mine') + '?projectId=' + projId);
            })
            .delegate('.box .glyphicon-pencil', 'click', function () {
                var id = $(this).data('id');
                var box = $(this).parents('.box');
                var name = box.find('.info .title').html();
                var desc = box.find('.info .intro').html();
                var accounts = box.find('.accounts-hidden').val();
                var splited = accounts.split(',');
                var pickeds = [];
                var reg = /(.+)\s*\(([^,]+)\)/;
                for (var i = 0, l = splited.length; i < l; i++) {
                    var matched = reg.exec(splited[i]);
                    if (matched) {
                        pickeds.push({
                            name: matched[2],
                            account: matched[1]
                        })
                    }
                }
                $.confirm({
                    content: $.render($('#create-proj-tmpl').text(), {
                        name: name ? name.replace(/"/g, "") : "",
                        desc: desc,
                        users: pickeds
                    }),
                    title: '修改项目',
                    confirmText: '确认修改',
                    showCallback: function () {
                        var that = this;
                        $(this).find('input[type=text]').focus();
                        $(this).find('.picking-user').delegate('.unpick-btn', 'click', function () {
                            $(this).parent('.picked-user').remove();
                        });

                        getUsers(function (users) {
                            $('.user-loading').hide();
                            $(that).find('.accounts-inputer').keyup(function () {
                                $.autocomplete(that, users);
                            }).focus(function () {
                                $.autocomplete(that, users);
                            });
                        }, teamId);
                    },
                    confirmClicked: function () {
                        var inputer = $(this).find('input[type=text]');
                        if (inputer.val().trim() == '') {
                            inputer.addClass('shake');
                            inputer.focus();
                            setTimeout(function () {
                                inputer && inputer.removeClass('shake');
                            }, 1000);
                            return;
                        }
                        var tmpl = $('#create-proj-success-tmpl').text();
                        var modal = $(this);
                        var accounts = $(this).find('.picked-user');
                        var values = [];
                        for (var i = 0, l = accounts.length; i < l; i++) {
                            var current = $(accounts[i]);
                            values.push(current.data('account') + '(' + current.data('name') + ')')
                        }
                        $.post($.route('org.project.update'), {
                            id: id,
                            name: inputer.val(),
                            desc: $(this).find('textarea.desc').val(),
                            accounts: values.join(', ')
                        }, function (data) {
                            if (data.code != '200') {
                                modal.modal('hide');
                                alert(data.msg);
                                return;
                            }
                            var data = data.result;
                            data.status = data.status || '刚刚更新';
                            var html = $.render(tmpl, data);
                            box.replaceWith(html);
                            modal.modal('hide');
                        }, "JSON")
                    }
                });
            })
            .delegate('.box .glyphicon-export', 'click', function () {
                var id = $(this).data('id');
                var url = '';
                var host = location && location.host ? location.host : '/';
                $.message({
                    content: '<input type="text" id="rap-plugin-inputer" disabled="disabled" class="form-control" value="<script src=\'http://' + host + '/rap.plugin.js?projectId=' + id + '\'></script>" />',
                    title: '复制RAP插件地址',
                    showCallback: function () {
                        var ele = $('#rap-plugin-inputer')[0];
                        ele.focus();
                        ele.selectionEnd = ele.value.length;
                    }
                });
            })
            .delegate('.box .glyphicon-trash', 'click', function () {
                var id = $(this).data('id');
                var box = $(this).parents('.box');
                $.confirm({
                    content: '删除以后不可恢复，请谨慎操作',
                    title: '删除项目',
                    confirmText: '确认删除',
                    confirmClicked: function () {
                        var modal = $(this);
                        $.post($.route('org.project.delete'), {
                            id: id
                        }, function (data) {
                            if (data.code == '200') {
                                box.hide('slow', function () {
                                    box.remove();
                                });
                            } else {
                                alert(data.msg);
                            }
                            modal.modal('hide');
                        }, "JSON")
                    }
                })
            })
            .delegate('.box-to-add', 'click', function () {
                var that = this;
                var groupId = $(this).data('groupid');
                $.confirm({
                    content: $.render($('#create-proj-tmpl').text(), {}),
                    title: '创建项目',
                    confirmText: '确认创建',
                    showCallback: function () {
                        var that = this;
                        $(this).find('input[type=text]').focus();
                        $(this).find('.picking-user').delegate('.unpick-btn', 'click', function () {
                            $(this).parent('.picked-user').remove();
                        });
                        getUsers(function (users) {
                            $('.user-loading').hide();
                            $(that).find('.accounts-inputer').keyup(function () {
                                $.autocomplete(that, users);
                            }).focus(function () {
                                $.autocomplete(that, users);
                            });
                        }, teamId);
                    },
                    confirmClicked: function () {
                        var inputer = $(this).find('input[type=text]');
                        if (inputer.val().trim() == '') {
                            inputer.addClass('shake');
                            inputer.focus();
                            setTimeout(function () {
                                inputer && inputer.removeClass('shake');
                            }, 1000);
                            return;
                        }
                        var tmpl = $('#create-proj-success-tmpl').text();
                        var modal = $(this);
                        var accounts = $(this).find('.picked-user');
                        var values = [];
                        for (var i = 0, l = accounts.length; i < l; i++) {
                            var current = $(accounts[i]);
                            values.push(current.data('account') + '(' + current.data('name') + ')')
                        }
                        $.post($.route('org.project.create'), {
                            groupId: groupId,
                            name: inputer.val(),
                            desc: $(this).find('textarea.desc').val(),
                            accounts: values.join(', ')
                        }, function (data) {
                            var data = data.result;
                            data.status = data.status || '刚刚创建';
                            var html = $.render(tmpl, data);
                            $(that).before(html);
                            modal.modal('hide');
                        }, "JSON")
                    }
                });
            })
            .delegate('.save-update-group', 'click', function () {
                var jqThis = $(this);

                var inputer = jqThis.prev();
                if (inputer.val().trim() == '') {
                    inputer.addClass('shake');
                    inputer.focus();
                    setTimeout(function () {
                        inputer && inputer.removeClass('shake');
                    }, 1000);
                    return;
                }

                var id = jqThis.data('id');
                var newValue = inputer.val();
                $.post($.route('org.group.update'), {
                    name: newValue,
                    id: id
                }, function (data) {
                    jqThis.parent().prev().html(newValue);
                    jqThis.parent().hide();
                    jqThis.parent().next().show();
                }, "JSON");
            });
    }

    function render() {
        $.get($.route('org.group.all'), {
            productlineId: plId
        }, function (groups) {
            var tmpl = $('#group-tmpl').text();

            var html = $.render(tmpl, groups);
            $(".groups").html(html);
            bindEvents();
        }, 'JSON');
    }


    render();
});
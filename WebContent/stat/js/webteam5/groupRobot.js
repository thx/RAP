(function() {
  var LaiWang = {
    autoEventVoice: function() {
      var onlyComment = true;   // true:只评论, false:评论加围观（但会过滤已围观过的帖)
      var pageNum = 10;          // 翻页数1-5
      var msgs = ['求解救~~！', '求厂外好友~~', '求解救，求加', '加我有福利哦~~~', '让我们一起来往吧！加我加我！', '求解救T  .T', '求加T .T'];
      var msgs = ['厂内GG一枚，求朋友T  .T', '求好友~~~', '求场外好友~~~', 'HOHO', '求来往~~~', '求勾搭...', '新年快乐', ':)', '>. <', '^_^'];
      var msgs = ['早安!', '大家早啊～～欢迎加我为好友哦', 'Godd morning everybody!', '早上好', '哈哈', ':)'];

      var selfId = $('#my-profile-info a').attr('href').substring(3); 
      console.log("selfId:", selfId);
      if (onlyComment) {
        selfId = '';
        console.log("启动了只评论模式，selfId清空...");
      }
      var send = function(arr) {
        console.log(arr.length);
        var item = arr.shift();
        if (item) {
          if (onlyComment) {
                $.ajax({
                  url: '/comment/add/' + item.appId + '/' + item.id + '/' +
                    item.uid + '.xhtml',
                  type: 'POST',
                  data: {
                    content: msgs[Math.round(Math.random() * (msgs.length -
                      1))]
                  },
                  complete: function() {
                    console.log("只评论不围观");
                    setTimeout(function() {
                      send(arr);
                    }, 5000 + Math.random() * 5000);
                  }
                });

          } else {
             console.log("已围观");
            $.ajax({
              url: '/score/add/' + item.appId + '/' + item.id + '.json',
              type: 'POST',
              data: {
                scoreType: Math.round(Math.random() * 5) + 1,
                uidAppItemOwner: item.uid
              },
              complete: function() {
  
                $.ajax({
                  url: '/comment/add/' + item.appId + '/' + item.id + '/' +
                    item.uid + '.xhtml',
                  type: 'POST',
                  data: {
                    content: msgs[Math.round(Math.random() * (msgs.length -
                      1))]
                  },
                  complete: function() {
                    console.log("已评论");
                    setTimeout(function() {
                      send(arr);
                    }, 5000 + Math.random() * 5000);
                  }
                });
               
              }
            });
        
          }
        }
      };

      var readList = function() {
        var lis = document.getElementById('eventStreamWrapper').childNodes;
        var a = [];
        for (var i = lis.length - 1, li; i >= 0; i--) {
          li = lis[i];
          if (li && li.tagName && li.tagName == 'LI') {
            var anchors = li.getElementsByTagName('a');
            var sent = false;
            for (var j = anchors.length - 1, anchor; j >= 0; j--) {
              anchor = anchors[j];
              if (anchor.getAttribute('data-uid') == selfId) {
                sent = true;
                break;
              }
            }
            if (!sent) {
              a.push({
                uid: li.getAttribute('data-uid'),
                id: li.getAttribute('data-id'),
                appId: li.getAttribute('data-app-id')
              });
            }
          }
        }
        send(a);
      };
      var loadMore = function(flag) {
        console.log('翻页到第', flag + 1, '页');
        var node = document.getElementById('eventStreamWrapper').parentNode;
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        var last = node.lastChild;
        while (last.nodeType != 1) {
          last = last.previousSibling;
        }
        last.dispatchEvent(e);
        if (flag < pageNum) {
          setTimeout(function() {
            loadMore(flag + 1);
          }, 500);
        } else {
          //readList();
        }
      };


      loadMore(0);
    }
  };

  LaiWang.autoEventVoice();
})();
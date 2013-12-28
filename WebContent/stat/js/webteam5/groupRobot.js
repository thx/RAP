(function() {
  var LaiWang = {
    autoEventVoice: function() {
      var selfId = '{{id}}';   // self ID, 可不写，不写则只评论不围观。
      var pageNum = 3;         // 翻页数0-5
      var msgs = ['求解救~~！', '求厂外好友~~', '求解救，求加', '加我有福利哦~~~', '让我们一起来往吧！加我加我！', '求解救T  .T', '求加T .T'];
      var send = function(arr) {
        console.log(arr.length);
        var item = arr.shift();
        if (item) {
          if (!+selfId) {
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
        var node = document.getElementById('eventStreamWrapper').parentNode;
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        var last = node.lastChild;
        while (last.nodeType != 1) {
          last = last.previousSibling;
        }
        last.dispatchEvent(e);
        if (flag < 5) {
          setTimeout(function() {
            loadMore(flag + 1);
          }, 5000);
        } else {
          readList();
        }
      };


      loadMore(pageNum - 0);
    }
  };

  LaiWang.autoEventVoice();
})();
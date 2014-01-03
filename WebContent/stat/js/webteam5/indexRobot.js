! function() {
  /**
   * configurations
   */
  
  var pageNum = 25;          // 非首次加载时翻页数，范围1-5，默认1
  var checkSpan = 600;       // 更新速度，秒，建议10分钟（600）以上


  var ev = document.createEvent('HTMLEvents');
  var homeBtn = $('#navigation .bbl-history[href="/home"]');
  var first = true;
  var firstLoadMore = true;
  var selfId = $('#my-profile-info a').attr('href').substring(3); 
  console.log("selfId:", selfId);
  ev.initEvent('click', true, true);
  checker();
  setInterval(checker, checkSpan * 1000);

  function checker() {
    if (!+selfId) {
      throw Error("selfId 不合法!");
    }
    if (first) {
      console.log('first loading...');
      first = false;
      main();
    } else {
      if (window.__length__ === 0) {
        console.log("robot reloading...");
        homeBtn.get(0).dispatchEvent(ev);
        main();
      } else {
        console.log('check finished, process is undergoing...');
      }
    }
  }

  function main() {
    var LaiWang = {
      autoVoice: function() {


        /**
        var msgs = [
          '今天好冷啊~', '额...T  .T', 'piu~piu~~', ':)', '>. <', 'd- m-b|||',
          'hoho', '额~~~~', 'T  m T', 'O  .O', '-  .-', '冻死咯~~~被窝好暖~~~', 
          '时间过的好快，周末快结束了...T  .T', '快要元旦了哦...预祝新年快乐!', 
          'd-  o-b|||', '飘过~~~', '祝PO主身体健康', '祝PO主新年好运哦~~~', 
          '让我们一起来往吧>   .<', '消息好多，发的好快，跟不上了...',
          '华丽的飘过~~~ O  mO ', '又要上班了...', '围观帝飘过~~~', '评论帝飘过~~~',
          '为防手机成瘾请注意休息...', '我就是正义的化身！！！水冰月！！！', '卖萌无罪~~~ =  .='
        ];
        */

        
        var msgs = [
          '早啊', '早安', 'morning~~', 'good morning', '早上好...', '早', 
          '又是周五了，哈哈', '预祝周末快乐', '最近放假有点儿频啊, 早', ":)", '^_^'
        ];
       
        /**
        var msgs = [
          '上班偷懒刷来往的节奏...', 'PO主似乎不忙啊今天～～～哈哈', '围观', '华丽的围观',
          '飘过', '认真的飘过', '今天天气好晴朗', '...O  .o冒个泡', '来往周一还这么热闹',
          '嘿嘿', 'piu~~~!piu!', 'hoho', '嘎嘎~~~', '额～～～'
        ];
         */

        var send = function(arr) {
          console.log(arr.length);
          window.__length__ = arr.length;
          var item = arr.shift();
          if (item) {
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
                    setTimeout(function() {
                      send(arr);
                    }, 0 + Math.random() * 1000);
                  }
                });
              }
            });
          }
        };

        var readList = function() {
          var lis = document.getElementById('wall').childNodes;
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
          if (flag < 0) return;
          var node = document.getElementById('wall-wrapper');
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
            readList();
          }
        };


        if (firstLoadMore) {
          loadMore(0);
          firstLoadMore = false;
        } else {
          loadMore(0);
        }
      }
    };

    LaiWang.autoVoice();
  }

}();
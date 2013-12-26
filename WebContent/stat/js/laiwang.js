var node=document.getElementById('wim-friends-all-scroll');
var msgs=[' 我要把一切喜讯变成奶油，所有祝福柔成巧克力，所有快乐做成蛋糕答谢你，然后说声圣诞快乐！',
'送你一颗聚满礼物的圣诞树，顶上最大最亮的那颗星是我的真心，挂的是我的痴心，制造材料的是我一颗不变有心：圣诞快乐！',
' 我默默祈祷愿圣诞老人能在即将到来的圣诞之夜送我一个与我牵手同伴共同度过这奇妙的圣诞夜，结果他将你送给我',
'考虑到24小时之内将会有铺天盖地的祝福短信堵塞网络，一向有远见聪明的我提前恭祝圣诞快乐、新年快乐！',
'如果每年的今夜有一个很肥的老人从窗口跳进来抓住你，把你装进袋子里，你不用担心，因为我想要的圣诞礼物就是你。',
 '也许岁月将往事退色，或许空间将彼此隔离，但知道珍惜的依然是真心的友谊将再次对你说声圣诞快乐！'];
 
var sendFriends=function(arr){
    if(!arr.length)return;
    var first=arr.shift();
    var uid=first.getAttribute('data-uid');
    $.ajax({
        url:'/api/v1/message/mini/text/send',
        type:'POST',
        data:{
            flag:'general',
            content:msgs[Math.ceil(Math.random()*(msgs.length-1))],
            receiverId:uid
        },
        global:false,
        _isOpenApi:true,
        complete:function(){
            setTimeout(function(){
                sendFriends(arr);
            },2000+Math.random()*10000);
        }
    });
}


var readFriends=function(){
  var lis=node.getElementsByTagName('li');
  lis=[].slice.call(lis);
  sendFriends(lis);
}


var loadFriends=function(){
  console.log(node.scrollTop,node.offsetHeight,node.scrollHeight)
  if(node.scrollTop+node.offsetHeight<node.scrollHeight){
    node.scrollTop=node.scrollHeight;
    setTimeout(loadFriends,1000);
  }else{
     readFriends();
  }
}


loadFriends();
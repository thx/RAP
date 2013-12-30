var data = {};


$('.upper-item-avatar').each(function(i, ele) {
	data[$(ele).attr('data-uid')] = true;
});

var __length = 0;
for (var key in data) {
	__length ++;
}
console.log(__length);





var arr = [];
var i = 0;
for (var key in data) {
	arr[i++] = key;
}
document.body.innerHTML = arr.join(",");




// usedData => usedMap
var usedMap = {};
for (i = 0; i < usedData.length; i++) {
	usedMap[usedData[i]] = true;
}

// test
num = 0;for(key in data) {if (!(key in usedMap))num++;};console.log(num);

// result generate
var result = [];
num = 0;for(key in data) {if (!(key in usedMap))result.push(key);};console.log(num);

document.body.innerHTML = result.join(",");
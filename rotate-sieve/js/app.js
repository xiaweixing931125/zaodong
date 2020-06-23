let $verticalElement = $('.vertical');
let $horizontalElement = $('.horizontal');
let $btnElement = $('.btn');

var rotateDefault = 'auto';

var changeType = function(){
	if(rotateDefault == "auto"){
		rotateDefault = "operation";
		$verticalElement.removeClass('rotateX');
		$horizontalElement.removeClass('rotateY');
		$btnElement.html('上下左右移动转圈圈')
	} else {
		rotateDefault = "auto";
		$verticalElement.addClass('rotateX');
		$horizontalElement.addClass('rotateY');
		$btnElement.html('自动转圈圈')
	}
};

// 鼠标滑动转圈圈
// 窗口宽高信息
let windowInfo = {
	width: parseInt(document.body.clientWidth),
	height:parseInt(document.body.clientHeight)
};

let lastTime = 0;
let mouseInfo = {
	x:0,
	y:0
};

let rotateInfo = {
	rotatex:0,
	rotatey:0
};

document.onmousemove=function(e){
	if(Date.now() - lastTime > 16 && rotateDefault == "operation"){
		lastTime = Date.now();
		mouseInfo.x = e.clientX;
		mouseInfo.y = e.clientY;
		handleMouseFun();
	}
};

// 处理鼠标转动函数
var handleMouseFun = function(){
	let distanceX = (mouseInfo.x - (windowInfo.width/2)) / (windowInfo.width/2);
	let distanceY = (mouseInfo.y - (windowInfo.height/2)) / (windowInfo.height/2);
	$verticalElement.css({'transform':'rotateX(' + distanceX * 360 + 'deg)'});
	$horizontalElement.css({'transform':'rotateY(' + distanceY * 360 + 'deg)'});
	
}
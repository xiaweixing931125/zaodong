// canvas 对象

var c = document.getElementById('canvas')
var context = c.getContext("2d");

// canvas的参数
var canvasInfo = {
	width: c.width,
	height: c.height
};

var textElement = document.getElementsByClassName("text")[0];
// 镂空文字的宽高
var textInfo = {
	w:textElement.offsetWidth,
	h:textElement.offsetHeight,
}

// canvas宽度 和 镂空文字宽度 的差值
var wGap = canvasInfo.width - textInfo.w;

// canvas高度 和 镂空文字高度 的差值
var hGap = canvasInfo.height - textInfo.h;

// 30个canvas小球的随机参数数组
var randomBalls = [];

// 函数生成30组随机参数
var createBalls = function() {
	for (let i = 0; i < 20; i++) {
		randomBalls[i] = {
			x: Math.round(wGap / 2 + textInfo.w * 0.8 * Math.random()),
			y: Math.round(hGap / 2 + textInfo.h * 0.8 * Math.random()),
			vx: 2*Math.random() +2,
			vy: 2*Math.random() +2,
			r: Math.round(20 + 5 * Math.random()),
			color: 'rgba(' +
				(Math.random() * 255).toFixed(0) + ', ' +
				(Math.random() * 255).toFixed(0) + ', ' +
				(Math.random() * 255).toFixed(0) + ', ' +
				(0.5 + 0.5 * Math.random()).toFixed(1) + ')'
		};
	}
}

createBalls();
// 小球移动过程返回
var move = function(ball){
	if((ball.x + ball.vx + ball.r) > (wGap / 2 + textInfo.w) || (ball.x + ball.vx + ball.r) < (wGap/2) ){
		ball.vx = -ball.vx;
	}
	
	if((ball.y + ball.vy + ball.r) > (hGap / 2 + textInfo.h) || (ball.y + ball.vy + ball.r) < (hGap /2)){
		ball.vy = -ball.vy;
	}
	console.log(ball.y + ball.vy + ball.r)
	ball.x += ball.vx;
	ball.y += ball.vy;
}

// canvas draw ball
var drawBalls = function(){
	context.clearRect(0,0,context.canvas.width, context.canvas.height);
	randomBalls.forEach(function(ball) {
		context.beginPath();
		context.arc(ball.x,ball.y,ball.r,0, Math.PI*2, false);
		context.fillStyle=ball.color;
		context.fill();
		move(ball);
	})
	window.requestAnimationFrame(drawBalls);
}

drawBalls();





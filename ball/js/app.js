// 点击按钮生成小球并运动
$('.ball-btn').on('mousedown',function(){
	$('.ball-btn').css('transform','scale(0.8)');
})

$('.ball-btn').on('mouseup',function(){
	$('.ball-btn').css('transform','scale(1)');
	createBalls();
})

// 球的颜色
var ballColors = ['#000000','red','orange','blue','green','gray','aqua','brown'];

// 小球的极限数据
var ballW = parseInt($(".ball").css('width'));
var MaxWidth = parseInt($(window).width()) - ballW;
var MaxHeight = parseInt($(window).height()) - ballW;
// 小球运动函数
var balls = function(dom,vx,vy){
	let $ball = $(dom);
	let ballX = parseInt($ball.css('left'));
	let ballY = parseInt($ball.css('top'));
	let ballMove = function(){
		ballX += vx;
		ballY += vy;
		if(ballX > MaxWidth){
			ballX = MaxWidth;
			vx = - vx;
		}else if(ballX < 0){
			ballX = 0;
			vx = -vx;
		}
		
		if(ballY > MaxHeight){
			ballY = MaxHeight;
			vy = - vy;
		}else if(ballY < 0){
			ballY = 0;
			vy = -vy;
		}
		
		$ball.css({
		  left:ballX+"px",
		  top:ballY+"px"
		});
		window.requestAnimationFrame(ballMove);
	}
	ballMove();
}

var $container = $(".ball-container");
var ballIndex = 0;
// 点击生成小球
var createBalls = function(){
	if(ballIndex >10){
		alert("朋友，球太多了");
		return
	}
	ballIndex += 1;
	let ballClassName = ".ball"+""+ballIndex;
	let ballDom = `<div class="ball${ballIndex} ball"></div>`;
	let colorStyle = ballColors[Math.floor(Math.random()*7)];
	console.log(colorStyle);
	$container.append(ballDom);
	$(ballClassName).css('backgroundColor',colorStyle);
	let vx = 10;
	let vy = -10;
	let random1 = Math.random().toFixed(2);
	let random2 = Math.random().toFixed(2);
	if(random1 < 0.5){
		vx = vx * random1;
	} else {
		vx = -vx * random1;
	}
	
	vy = vy * random2;
	balls(ballClassName,vx,vy)
	
}

balls('.ball0',10,10);
console.log('enter');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w;
canvas.height = h;
var hasMouse = false;
var fuck = false;
var balls = [],
	config = [],
	R = 2,
	maxV = 1,
	minV = 0.1,
	minDis = 160,
	maxNum = 100;
var debarb = false;
var mouse_ball = {
	x: -100,
	y: -100,
	vx: 0,
	vy: 0,
	r: R * 2,
	color: 'orange'
};

config = [{
		x: [0, w],
		y: [-R, -R],
		vx: [-maxV, maxV],
		vy: [minV, maxV]
	},
	{
		x: [0, w],
		y: [h + R, h + R],
		vx: [-maxV, maxV],
		vy: [-maxV, -minV]
	},
	{
		x: [-R, -R],
		y: [0, h],
		vx: [minV, maxV],
		vy: [-maxV, maxV]
	},
	{
		x: [w + R, w + R],
		y: [0, h],
		vx: [-maxV, -minV],
		vy: [-maxV, maxV]
	}
];

// 创建一个粒子信息
var createBall = function() {
	var ballInfo = config[randomInt(0, 4)];
	var ball = {
		x: randomFloat(ballInfo.x[0], ballInfo.x[1]),
		y: randomFloat(ballInfo.y[0], ballInfo.y[1]),
		vx: randomFloat(ballInfo.vx[0], ballInfo.vx[1]),
		vy: randomFloat(ballInfo.vy[0], ballInfo.vy[1]),
		r: R,
		color: 'gray',
		debarb: false,
		dis: minDis
	};
	return ball
};

// 生成大量粒子
var createBalls = function() {
	for (let i = 0; i < maxNum; i++) {
		balls.push(createBall())
	}
}

// 渲染粒子
function rederBalls() {
	for (let i = 0; i < balls.length; i++) {
		ctx.beginPath();
		ctx.fillStyle = balls[i].color;
		ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, true)
		ctx.closePath();
		ctx.fill();
	}
}

// 数字取整计算
function randomInt(min, max) {
	return min + Math.floor(Math.random() * max)
}

// 数字非取整计算
function randomFloat(min, max) {
	return min + Math.random() * max
}

// 更新粒子的位置
function updateBallsPosition() {
	var moveBalls = [],
		ball;
	for (let i = 0; i < balls.length; i++) {
		ball = balls[i];
		if (ball.debarb) {
			ball.x -= ball.vx;
			ball.y -= ball.vy;
		} else {
			ball.x += ball.vx;
			ball.y += ball.vy;
		}

		if (ball.x > -minDis && ball.x < w + minDis && ball.y > -minDis && ball.y < h + minDis) {
			moveBalls.push(ball)
		}
	}
	balls = moveBalls;
	if (balls.length < maxNum) {
		balls.push(createBall());
	}
}

// 更新小球的运动状态
function updateBalls() {
	ctx.clearRect(0, 0, w, h);
	updateBallsPosition();
	rederBalls();
	getBallsDis();
	getMouseBallDis();
	window.requestAnimationFrame(updateBalls)
}

// 判断两个小球的位置关系
function getBallsDis() {
	var f, alpha;
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			f = getDis(balls[i], balls[j]) / minDis;
			if (f < 1) {
				alpha = 1 - f;
				renderLine(balls[i].x, balls[i].y, balls[j].x, balls[j].y, alpha)
			}
		}
	}
};

function getDis(ball1, ball2) {
	var dx = Math.abs(ball1.x - ball2.x);
	var dy = Math.abs(ball1.y - ball2.y);
	return Math.sqrt(dx * dx + dy * dy)
}

// 画线
function renderLine(x1, y1, x2, y2, a) {
	ctx.strokeStyle = `rgba(150,150,150,${a})`;
	ctx.lineWidth = 0.8;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

createBalls();
updateBalls();

canvas.onmouseenter = mousedown;
canvas.onmouseleave = mouseup;
canvas.onmousemove = mousemove

function mousedown() {
	hasMouse = true;
	balls.unshift(mouse_ball);
};

function mouseup() {
	hasMouse = false;
	balls.shift();
};

function mousemove(e) {
	if (hasMouse) {
		mouse_ball.x = e.clientX;
		mouse_ball.y = e.clientY;
	}
};

// 小球远离鼠标
function getMouseBallDis() {
	if (!fuck) {
		return
	}
	for (let i = 0; i < balls.length; i++) {
		let f = getDis(balls[i], mouse_ball);
		if (f <= minDis) {
			if (!balls[i].debarb && f <= balls[i].dis) {
				balls[i].debarb = true;
				balls[i].dis = f;
			} else if (balls[i].dis > f && balls[i].debarb) {
				balls[i].debarb = false;
				balls[i].dis = f;
			}
		}
	}
};

document.getElementsByClassName('btn')[0].onclick = function(e) {
	let dataName = e.target.getAttribute("data-name");
	if (dataName == '正常') {
		e.target.setAttribute("data-name", "远离");
		e.target.setAttribute("title", "点击文字,使小球不受影响");
		e.target.innerHTML = '远离';
		fuck = true;
	} else {
		e.target.setAttribute("data-name", "正常");
		e.target.innerHTML = '正常';
		e.target.setAttribute("title", "点击文字,使小球远离鼠标");
		fuck = false;
	}
}

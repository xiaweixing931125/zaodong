var loadSpeed = 1,
	R = 80,
	fi = 0,
	w = 4 * Math.PI / (3 * R),
	fiSpeed = Math.PI / 10,
	circleThick = 15,
	curValue = 0,
	c = document.getElementById('canvas'),
	context = c.getContext("2d"),
	color1 = 0,
	color2 = 0,
	color3 = 0;

// 画圆圈

var drawCircle = function() {
	curValue += loadSpeed;
	if (curValue > 100) {
		curValue = 0;
	}
	if (curValue > 0 && curValue <= 33) {
		color1 = 0;
		color2 = 0;
		color3 = 255;
	} else if (curValue > 33 && curValue <= 66) {
		color1 = 0;
		color2 = 255;
		color3 = 0;
	} else {
		color1 = 255;
		color2 = 0;
		color3 = 0;
	}
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.save();
	context.lineWidth = 15;
	context.strokeStyle = `rgba(${color1},${color2},${color3},1)`;
	context.shadowColor = 'rgba(34,167,250,0.9)';
	context.shadowBlur = curValue / 4;
	context.beginPath();
	var angle = curValue / 100 * Math.PI * 2;
	context.arc(c.width / 2, c.height / 2, R,
		-Math.PI / 2, angle - Math.PI / 2, false);
	context.stroke();
	context.restore();
};

// 数字进度
var renderNum = function() {
	context.save();
	context.fillStyle = `rgba(${color1},${color2},${color3},1)`;
	context.textAlign = 'center';
	context.textBaseline = 'middle'
	context.font = '30px impact';
	context.fillText(curValue + '%', c.width / 2, c.height / 2);
	context.restore();
}

// 波浪
function renderWave() {
	context.save();
	setCircleClip();
	fi += fiSpeed;
	drawWave(6, -w, fi, 'rgba(34,167,250,0.9)');
	drawWave(8, w, fi, 'rgba(0,0,255,0.5)');
	context.restore();
}

function setCircleClip() {
	context.beginPath();
	context.arc(c.width / 2, c.height / 2,
		R - circleThick / 3 * 2, 0, Math.PI * 2, false);
	context.clip();
}

function drawWave(a, w, fi, color) {
	var i, x, y, sx, sy
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.fillStyle = color;
	context.beginPath();
	sx = c.width / 2 - R;
	sy = c.height / 2 + R;
	context.moveTo(sx, sy);
	context.lineTo(sx, sy - curValue / 100 * 2 * R);
	for (i = 0; i < R * 2; ++i) {
		x = sx + i;
		y = a * Math.sin(w * i + fi) + sy - curValue / 100 * 2 * R;
		context.lineTo(x, y);
	}
	context.lineTo(sx + 2 * R, sy);
	context.closePath();
	context.fill();
}

// 绘制所有的图形
var allRender = function() {
	drawCircle();
	renderWave();
	renderNum();
	window.requestAnimationFrame(allRender);
}

allRender();

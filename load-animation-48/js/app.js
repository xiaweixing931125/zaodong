var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let w = canvas.width > 800 ? 600 : canvas.width * 0.8;
let h = 25;
let l = (canvas.width - w) / 2;
let t = (canvas.height - h) / 2;
let bgColor = "#333";

var curWidth = 0;
var particleNum = 10;

var particles = [];

function Bar() {
	this.curWidth;
	this.hue;
	this.minHue = 0;
	this.maxHue = 90;
}

// loading 背景框
function createBg() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(l, t, w, h);
}

// loading 彩色块

function widthGo(){
	if(curWidth >=0 && curWidth < 20){
		curWidth += 0.03;
		particleNum = 1;
	} else if(curWidth >= 20 && curWidth < 50){
		curWidth += 0.1;
		particleNum = 5;
	} else if(curWidth >= 50 && curWidth < 70){
		curWidth += 0.2;
		particleNum = 15;
	} else if(curWidth >= 70){
		curWidth += 0.4;
		particleNum = 20;
	}
	
	if(curWidth > 100){
		curWidth = 0;
	}
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width,canvas.height);
	createBg()
	createColorBlock();
	window.requestAnimationFrame(widthGo)
}

function createColorBlock() {
	var hue = 90 * (curWidth /100);
	ctx.fillStyle = 'hsla(' + hue + ', 100%, 40%, 1)';
	ctx.fillRect(l, t, (curWidth /100) * w, h);
	
	var activeParticles = [],i;
	for(i=0;i<particleNum;i++){
		particles.push(new particleObj(l+(curWidth /100) * w,t))
	}
	
	for(i=0;i<particles.length;i++){
		if(particles[i].active){
			activeParticles.push(particles[i]);
			particles[i].render();
		}
	}
	particles = activeParticles.slice(0);
	
}

// 生成粒子

function particleObj (l,t){
	this.x = l;
	this.y = t;
	this.vx = -(0.8 + Math.random());
	this.vy = -(1+ Math.random() * 3);
	this.g = 0.1;
	this.curAlpha = 1;
	this.alphaSpeed = 0.01;
	this.active = true;
	this.render = function(){
		if(this.active){
			this.calculate();
			this.draw();
		}
	};
	
	this.calculate = function(){
		this.x += this.vx;
		this.vy += this.g;
		this.y += this.vy;
		this.curAlpha = Math.max(0,this.curAlpha - this.alphaSpeed);
		if(this.curAlpha ==0){
			this.active = false;
		}
	}
	
	this.draw = function(){
		ctx.fillStyle = `hsla(${90 * (curWidth /100) + 0.3},100%,40%,${this.curAlpha})`;
		var size = Math.random() * 2;
		ctx.fillRect(this.x,this.y,size,size)
	}
}

createBg();
widthGo();






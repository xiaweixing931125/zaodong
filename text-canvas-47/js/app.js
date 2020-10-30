var textCanvas = document.getElementById('textCanvas');

var textCtx = textCanvas.getContext('2d');

var textW = textCanvas.width;

var textH = textCanvas.height;

var coordinates=[];

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var R = 4;

var balls=[];

var textArray = ['男','优','男','上','加','男'];

var index = 0;

var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

// console.log(textW)

var drawText = function(text){
	textCtx.clearRect(0,0,textW,textH);
	textCtx.fillStyle='#ff1111';
	textCtx.textAlign='center';
	textCtx.font='bold 400px Arial';
	textCtx.fillText(text,300,300);
}

var getTextCoordinates = function(){
	coordinates = [];
	var imgData = textCtx.getImageData(0,0,textW,textH).data;
	var i,x,y;
	for(i=0;i<imgData.length;i+=4){
		if(imgData[i] !== 0){
			x = (i/4)%textW;
			y=Math.floor(i/4/textW);
			if(x % (2*R + 3) == 0 && y %(2*R +3) == 0) {
				coordinates.push({x:x,y:y})
			}
		}
	}
	console.log(coordinates)
}

var Ball = function(){
	this.autoRender;
	this.startX;
	this.startY;
	this.x;
	this.y;
	this.endX;
	this.endY;
	this.r = R;
	this.t = 0;
	this.old = 0;
	this.delay;
	this.dur = 4000;
	this.color;
	this.init = function(){
		var hue,brightness;
		hue=randomInt(0,30);
		brightness = randomInt(30,70);
		this.color=`hsl(${hue},90%,${brightness}%)`;
	};
	this.init();
	this.reset = function(auto,ex,ey,delay,dur){
		this.autoRender = auto;
		this.t = 0;
		this.old = 0;
		this.delay = (delay && randomInt(0,delay)) || randomInt(0,3000);
		this.dur = dur || this.dur;
		this.x = this.x || randomInt(0,w);
		this.y = this.y || randomInt(0,h);
		this.startX = this.x;
		this.startY = this.y;
		this.endX = ex || randomInt(0,w);
		this.endY = ey || randomInt(0,h);
	};
	this.reset(true);
	this.render = function(t){
		if(!this.old){
			this.old = t;
		}
		this.t = t - this.old;
		if(this.t >= this.delay){
			if(this.t > this.dur + this.delay){
				if(this.autoRender){
					this.reset(true);
				}
			} else {
				this.lerp();
			}
		}
		this.draw();
	};
	
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	};
	
	this.lerp = function(){
		var nor;
		if(this.t > this.delay){
			nor = normal(this.t - this.delay,0,this.dur);
			this.x = lerp_easeInOutCubic(nor,this.startX,this.endX);
			this.y = lerp_easeInOutCubic(nor,this.startY,this.endY);
		}
	}
	
};

var randomInt = function(min,max){
	return Math.round(Math.random() * (max-min) + min)
};

var lerp_easeInOutCubic = function(normal,min,max){
  normal = easeInOutCubic(normal);
  return min + (max - min)*normal;
};

var normal = function(value,min,max){
  return (value - min)/(max - min);
};

var easeInOutCubic = function(nor){
    if ((nor/=0.5) < 1)
			return 0.5*Math.pow(nor,3);
    else
    	return 0.5 * (Math.pow((nor-2),3) + 2);
};

var makeupText = function(){
  var i,x,y;
  for(i=0;i< coordinates.length;++i){
    x = coordinates[i].x + w/2 - textW/2;
    y = coordinates[i].y + h/2 - textH/2;
    balls[i].reset(false,x,y,500,1000);
  }
};

var collect = function(){
  drawText(textArray[index]);
  getTextCoordinates();
  makeupText();
  if(++index==textArray.length){
    index = 0;
  }
  setTimeout(disperse,3000);
};

var disperse = function(){
  for(var i=0;i< coordinates.length;++i){
    balls[i].reset(true,0,0,1000,1000);
  }
  setTimeout(collect,2000);
};

var createBalls = function(){
  var n = 800,i=0,ball;
  for(i=0;i<n;++i){
    ball = new Ball();
    balls.push(ball);
    ball.render(0);
  }
};

function update(t){
  ctx.clearRect(0, 0, w, h);
  renderBalls(t);
  window.requestAnimationFrame(update);
}
function renderBalls(t){
  var i;
  for(i=0;i<balls.length;++i){
    balls[i].render(t);
  }
}


createBalls();
collect();
window.requestAnimationFrame(update);


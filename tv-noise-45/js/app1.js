var canvas = document.getElementById('canvas_tv');

var ctx = canvas.getContext('2d');
	
var w = canvas.width;

var h = canvas.height;

var data = ctx.createImageData(w, h);

console.log(data)

var showDancer = false;

var dot = 0;

var tvpic = document.getElementsByClassName('tvpic')[0];

var randomDot = 170;

setInterval(() =>{
	randomDot = randomNum(171,891);
	// console.log(randomDot)
},200)

setInterval(() => {
	showDancer = !showDancer;
},4000);

setInterval(() =>{
	dot = !dot
},4500)

function randomNum( min, max ) {
	return Math.floor(Math.random() * ( max - min ) + min) ;
}

function noise() {
  var i,
      buff = data.data,
      n = buff.length;
  for(i=0; i<n; i+=4){
		  if(i % randomDot == 0 || i % (randomDot + 333) == 0){
		  		  buff[i] = buff[i+1] = buff[i+2] = 255;
		  		  buff[i+3] = 255;
		  } else {
		  		  buff[i] = buff[i+1] = buff[i+2] = randomNum(0,255);
		  		  buff[i+3] = 255;
		  }
	  
    
  }
	ctx.putImageData(data, 0, 0);
}

function update() {
  ctx.clearRect(0,0,w,h);
  if(showDancer){
	  tvpic.style.transitionDelay = '0s';
	  tvpic.style.filter='blur(0px)';
	  tvpic.style.opacity = 1;
	  canvas.style.opacity = 0;
  } else {
	  tvpic.style.transitionDelay = '0.5s';
	  tvpic.style.filter='blur(10px)';
	  tvpic.style.opacity = 0;
	  canvas.style.opacity = 1;
	  noise();
  }
  window.requestAnimationFrame(update);
}

update();
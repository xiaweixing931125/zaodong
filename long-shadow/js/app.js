// 窗口宽高信息
let windowInfo = {
	width: parseInt(document.body.clientWidth),
	height:parseInt(document.body.clientHeight)
};

// 中点位置信息
let midpoint = {
	x:windowInfo.width / 2,
	y:windowInfo.height / 2
}

// 鼠标位置信息
let mouseInfo = {
	x: 0,
	y: 0
};

// baby位置信息

let babyInfo = {
	x:0,
	y:0,
	width:0.1 * windowInfo.width,
	height:0.1*windowInfo.height,
	rotate:0
};

let sin = 0,
	cos = 0, 
	tan = 0,
	lastTime = 0,
	distanceX = 0,
	distanceY = 0,
	bevel=0;

// 试用矩阵算法
let matrixArr = [];


// 监听鼠标移动事件
document.onmousemove=function(e){
	if(Date.now() - lastTime > 16){
		lastTime = Date.now();
		mouseInfo.x = e.clientX;
		mouseInfo.y = e.clientY;
		babyGoTop();
	}
};

// baby 移动函数
function babyGoTop (){
	distanceX = mouseInfo.x - midpoint.x;
	distanceY = midpoint.y - mouseInfo.y;
	bevel = Math.sqrt((Math.pow(distanceX,2) + Math.pow(distanceY,2)));
	tan = distanceY / distanceX;
	sin = distanceY / bevel;
	cos = distanceX/ bevel;
	// console.log(sin);
	let textShadowText='';
	for(let i=1;i<14;i++){
		if(i==13){
			textShadowText += `${i*cos}px ${i*sin}px 0 #999999`
		} else {
			textShadowText += `${i*cos}px ${i*sin}px 0 #999999,`
		}
		
	}
	console.log(textShadowText)
	// $('.text').css({'text-shadow':`${1*cos}px ${1*sin}px 0 #999999,${2*cos}px ${2*sin}px 0 #999999,${3*cos}px ${3*sin}px 0 #999999,${4*cos}px ${4*sin}px 0 #999999,${5*cos}px ${5*sin}px 0 #999999,${6*cos}px ${6*sin}px 0 #999999,${7*cos}px ${7*sin}px 0 #999999,${8*cos}px ${8*sin}px 0 #999999,${9*cos}px ${9*sin}px 0 #999999,${10*cos}px ${10*sin}px 0 #999999`})
	$('.text').css({'text-shadow':textShadowText})
}




var $weekday = $('.weekday');
var timeNum = $('.time-box').children('.num');
var resetAllDays = function(){
	$weekday.children().removeClass();
};

var setDay = function(i){
	resetAllDays();
	if(i != 7){
		$weekday.children().eq(i).addClass('show');
	} else {
		$weekday.children().eq(0).addClass('show');
	}
}

const classList = [
	{0:[1,1,1,0,1,1,1]},
	{1:[0,0,1,0,0,1,0]},
	{2:[1,0,1,1,1,0,1]},
	{3:[1,0,1,1,0,1,1]},
	{4:[0,1,1,1,0,1,0]},
	{5:[1,1,0,1,0,1,1]},
	{6:[1,1,0,1,1,1,1]},
	{7:[1,0,1,0,0,1,0]},
	{8:[1,1,1,1,1,1,1]},
	{9:[1,1,1,1,0,1,1]}
];

var resetNumLight = function(){
	for(let i=0;i<6;i++){
		timeNum.eq(i).children().removeClass('light');
	}
};

var findLightNum = function(num1,k){
	let numArr = classList[num1][num1];
	for(let i=0;i<numArr.length;i++){
		if(numArr[i]){
			timeNum.eq(k).children().eq(i).addClass('light');
		}
	}
};

var setTime = function(){
	resetNumLight();
	var currentTime = new Date();
	let CH = currentTime.getHours();
	let CM = currentTime.getMinutes();
	let CS = currentTime.getSeconds();
	let currentHour = CH.toString().length == 2 ? '' + CH : '0'+CH;
	let currentMinutes = CM.toString().length == 2 ? '' + CM : '0'+CM;
	let currentSeconds = CS.toString().length == 2 ? '' + CS : '0'+CS;
	for(let i=0;i<2;i++){
		findLightNum(currentHour[i],i);
		findLightNum(currentMinutes[i],2+i);
		findLightNum(currentSeconds[i],4+i);
	}
	setDay(currentTime.getDay());
};

var speed = 1000;
var nowTime = new Date().getTime();
function ticker(){
	let now = new Date().getTime();
	if(now > nowTime + speed){
		nowTime = new Date().getTime();
		setTime();
	}
	requestAnimationFrame(ticker);
};

setTime();
ticker();
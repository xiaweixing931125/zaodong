var $svg = $('svg'),
	$ripple = $('.ripple'),
	$ripples = $('#ripples');
	
var CircleR1 = function(){
	let circles=[];
	 circles[0] = 1 + Math.floor(20 * Math.random());
	 circles[1] = 22 + Math.floor(20 * Math.random());
	 circles[2] = 43 + Math.floor(20 * Math.random());
	 circles[3] = 64 + Math.floor(20 * Math.random());
	 return circles
}

var CircleR2 = function(){
	let circles=[];
	 circles[0] = 90 + Math.floor(20 * Math.random());
	 circles[1] = 110 + Math.floor(20 * Math.random());
	 circles[2] = 130 + Math.floor(20 * Math.random());
	 circles[3] = 150 + Math.floor(20 * Math.random());
	 return circles
}

// 点击事件
$svg.click((e) => {
	var i,
		$ani,
		$newRipple,
		matrix = $svg[0].getScreenCTM().inverse(),
		svgPoint = $svg[0].createSVGPoint(),
		svgXY,
		circleR1Info=[],
		circleR2Info=[];
	svgPoint.x = e.clientX;
	svgPoint.y = e.clientY;
	circleR1Info = CircleR1();
	circleR2Info = CircleR2();
	
	console.log(circleR1Info,circleR2Info)
	svgXY = svgPoint.matrixTransform(matrix);
	document.querySelector('#circle1Anim').setAttribute('from',circleR1Info[0]);
	document.querySelector('#circle1Anim').setAttribute('to',circleR2Info[0]);
	
	document.querySelector('#circle2Anim').setAttribute('from',circleR1Info[1]);
	document.querySelector('#circle2Anim').setAttribute('to',circleR2Info[1]);
	
	document.querySelector('#circle3Anim').setAttribute('from',circleR1Info[2]);
	document.querySelector('#circle3Anim').setAttribute('to',circleR2Info[2]);
	
	document.querySelector('#circle4Anim').setAttribute('from',circleR1Info[3]);
	document.querySelector('#circle4Anim').setAttribute('to',circleR2Info[3]);
	$newRipple = $ripple.clone();
	$ripples.append($newRipple);
	$newRipple.attr("transform", "translate(" + svgXY.x + "," + svgXY.y + ")");

	$ani = $newRipple.find('animate');

	$newRipple.myEndAniNum = 0;
	$newRipple.myOnEnd = function() {
		if (++$newRipple.myEndAniNum == $ani.length) {
			$newRipple.remove();
		}
	};

	$ani.each(function(i) {
		$ani[i].beginElement();
		$ani[i].onend = $newRipple.myOnEnd;
	});
})

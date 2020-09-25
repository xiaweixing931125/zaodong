var $eyelids = $('.eyelid');
var swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	pagination: {
	    el: '.swiper-pagination',
	  },
});
$('body').on('click', blink);
$eyelids.on("animationiteration", endBlink);
blink();

function blink() {
	$eyelids.css({
		animationPlayState: "running"
	});
};

function endBlink() {
	$eyelids.css({
		animationPlayState: "paused"
	});
};

$('.box1').on('mousemove', onMouseMove1);
$('.box2').on('mousemove', onMouseMove2);

var mouseX, mouseY;

var rimR = $('.rim').width() / 2;

function onMouseMove1(e) {
	$('.rim').each(function() {
		moveBall1(e, $(this));
	});
};

function onMouseMove2(e) {
	$('.rim').each(function() {
		moveBall2(e, $($('.rim')[3]));
	});
};

function moveBall1(e, $rim) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	var cx = $rim.offset().left + rimR;
	var cy = $rim.offset().top + rimR;
	var $eyeBall = $rim.find('.eyeball');
	var $eyeLid = $rim.find('.eyelid');
	var eyeBallR = $eyeBall.width() / 2;
	var mouseDX, mouseDY, mouseDis;
	var r, rx, ry, eyeBallX, eyeBallY, eyeBallLeft, eyeBallTop;
	mouseDX = mouseX - cx;
	mouseDY = mouseY - cy;
	// 向量长度
	mouseDis = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);
	if (mouseDis > 1) {
		mouseDX = mouseDX / mouseDis;
		mouseDY = mouseDY / mouseDis;
	} else {
		// mouseDX = 0;
		// mouseDY = 0;
	}

	r = Math.min(rimR - eyeBallR, mouseDis);
	rx = r * mouseDX;
	ry = r * mouseDY;

	eyeBallX = cx + rx;
	eyeBallY = cy + ry;

	eyeBallLeft = eyeBallX - eyeBallR;
	eyeBallTop = eyeBallY - eyeBallR;

	eyeBallLeft -= $rim.offset().left;
	eyeBallTop -= $rim.offset().top;
	//设置css
	$eyeBall.css({
		left: eyeBallLeft + 'px',
		top: eyeBallTop + 'px',
	});
	
	var lidTop = eyeBallTop - eyeBallR*2;
	$eyeLid.css({transform:"scaleY("
			+	Math.max(lidTop/rimR,0.1) + ")"});

}

function moveBall2(e, $rim) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	var cx = $rim.offset().left + rimR;
	var cy = $rim.offset().top + rimR;
	var $eyeBall = $rim.find('.eyeball');
	var $eyeBall2 = $($('.rim')[2]).find('.eyeball');
	var $eyeLid = $rim.find('.eyelid');
	var $eyeLid2 = $($('.rim')[2]).find('.eyelid');
	var eyeBallR = $eyeBall.width() / 2;
	var mouseDX, mouseDY, mouseDis;
	var r, rx, ry, eyeBallX, eyeBallY, eyeBallLeft, eyeBallTop;
	mouseDX = mouseX - cx;
	mouseDY = mouseY - cy;
	// 向量长度
	mouseDis = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);
	if (mouseDis > 1) {
		mouseDX = mouseDX / mouseDis;
		mouseDY = mouseDY / mouseDis;
	} else {
		// mouseDX = 0;
		// mouseDY = 0;
	}

	r = Math.min(rimR - eyeBallR, mouseDis);
	rx = r * mouseDX;
	ry = r * mouseDY;

	eyeBallX = cx + rx;
	eyeBallY = cy + ry;

	eyeBallLeft = eyeBallX - eyeBallR;
	eyeBallTop = eyeBallY - eyeBallR;

	eyeBallLeft -= $rim.offset().left;
	eyeBallTop -= $rim.offset().top;
	//设置css
	$eyeBall.css({
		left: eyeBallLeft + 'px',
		top: eyeBallTop + 'px',
	});
	
	$eyeBall2.css({
		left: eyeBallLeft + 'px',
		top: eyeBallTop + 'px',
	});
	
	var lidTop = eyeBallTop - eyeBallR*2;
	$eyeLid.css({transform:"scaleY("
			+	Math.max(lidTop/rimR,0.1) + ")"});
	$eyeLid2.css({transform:"scaleY("
			+	Math.max(lidTop/rimR,0.1) + ")"});

}

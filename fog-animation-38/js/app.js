var $snowBox = $('.snow-box');
var $snow = $snowBox.children(':first');

// 下雪
var createSnow = function() {
	var cloneSnow, level;
	for (let i = 0; i < 300; i++) {
		cloneSnow = $snow.clone();
		$snowBox.append(cloneSnow);
		level = 1 + Math.floor(Math.random() * 5);
		cloneSnow.addClass(`snowlevel${level}`);
		cloneSnow.css({
			top: -(Math.random() * 200 + 50) + 'px',
			left: Math.random() * 100 + '%',
			animationDuration: (50 / (level * 4) + Math.random() * 3) + "s"
		})
	}
};

createSnow();

// 监听鼠标滑动

var $template = $('.template');

var $reat = $('.reat');

var canMove = false;

var mousedown = function() {
	canMove = true;
};

var mouseup = function(){
	canMove = false;
};

var animationEnd = function(){
	$(this).remove();
}

var mousemove = function(e){
	var x = e.clientX;
	var y = e.clientY;
	if(canMove){
		var cloneTemplate = $template.clone();
		cloneTemplate.removeClass('template');
		$reat.append(cloneTemplate);
		cloneTemplate.css({
			left:x+'px',
			top:y+'px'
		});
		cloneTemplate.on('animationend',animationEnd)
	}
};



$(document).on('mousedown', mousedown);
$(document).on('mouseup', mouseup);
$(document).on('mousemove', mousemove);

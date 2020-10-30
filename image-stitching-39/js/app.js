var $box = $('.box'),
	$allPieces, bgs = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg'];

var allInfo = {};
allInfo.aniCount = 0;
allInfo.index = 0;
allInfo.aniState = 0;
allInfo.cx = $box.width() / 2;
allInfo.cy = $box.height() / 2;
allInfo.r = ($box.width() + $box.height()) / 4 + 50;
allInfo.total = 160;

// $(document).on('mousemove', onmousemove);
$(document).on('click', onclick);


// 创建碎片

var createPieces = function() {
	var $piece, i;
	for (i = 0; i < allInfo.total; i++) {
		$piece = $('<div class="piece"></div>');
		$box.append($piece);
		$piece.on('animationend', onTransitionEnd);
	}
	$allPieces = $('.piece');
}

// 碎片分布

var setAllPieces = function() {
	var r = allInfo.r,
		levels = 5,
		nums, minR, maxR, w;
	nums = Math.floor(allInfo.total / levels);
	for (let i = 0; i < levels; i++) {
		for (let j = 0; j < nums; j++) {
			var $this = $($allPieces.get(i * nums + j));
			maxR = r / levels * (i + 1);
			minR = r / levels * i;
			w = r / (i + 1);
			setPieceStyle($this, minR, maxR, w, i)
		}
	}
}

// 设置碎片的样式

var setPieceStyle = function($this, minR, maxR, maxW, z) {
	var deg, r, w, h, top, left, z;
	w = randomInt(maxW * 0.8, maxW);
	h = randomInt(maxW * 0.8, maxW);
	deg = randomInt(0, 360);
	r = randomInt(minR, maxR);
	top = allInfo.cy + Math.sin(deg) * r - h / 2;
	left = allInfo.cx + Math.cos(deg) * r - w / 2;
	$this.css({
		width: w,
		height: h,
		top: top + 'px',
		left: left + 'px',
		backgroundPosition: (-left) + 'px ' + (-top) + 'px',
		animationDelay: Math.random() + 's'
	})
	$this[0].top = top;
	$this[0].left = left;
	$this[0].z = z;
};

// 随机数
var randomInt = function(begin, end) {
	return Math.round(Math.random() * (end - begin) + begin);
};


var onclick = function() {
	if (!allInfo.aniState) {
		allInfo.aniState++;
		$box.addClass('out');
	}
};


var onTransitionEnd = function() {
	allInfo.aniCount+=1;
	if(allInfo.aniCount === allInfo.total){
		if(allInfo.aniState === 1){
			allInfo.aniState++;
			exchangeBg();
			setAllPieces();
			$box.removeClass('out');
			$box.addClass('in');
		} else if(allInfo.aniState === 2){
			allInfo.aniState = 0;
			$box.removeClass('in');
		}
		allInfo.aniCount = 0;
	}
};

// 切换背景图片
var exchangeBg = function() {
	allInfo.index +=1;
	if(allInfo.index >= bgs.length){
		allInfo.index = 0;
	}
	
	$allPieces.each(function(){
		var item = $(this);
		console.log(item)
		item.css({
			backgroundImage:`url(${bgs[allInfo.index]})`
		});
	})
};

// 鼠标移动
var onmousemove = function(e){
	allInfo.mx = $(window).width()/2 - e.clientX;
	allInfo.my = $(window).height()/2 - e.clientY;
	// $allPieces.each(move)
};

var move = function(){
	let $this = $(this);
	var left = $this[0].left + allInfo.mx * 0.05 * $this[0].z;
	var top = $this[0].top + allInfo.my * 0.05 * $this[0].z;
	$this.css({
		left:left,
		top:top
	})
}

createPieces();
setAllPieces();

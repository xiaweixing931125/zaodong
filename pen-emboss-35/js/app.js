var swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
});

var blur = 0,grayscale = 0,sepia = 0,brightness = 1,contrast =1 ,invert = 0 ,saturate = 1 ,opacity = 1,dropShadow = 0,hueRotate = 0;

var getVal = function(v, v1) {
	if (v == 'blur') {
		$(`.${v}`).text(`${v}(${v1}px)`);
		blur = v1;
	} else if (v == 'hue-rotate') {
		$(`.${v}`).text(`${v}(${v1}deg)`);
		hueRotate = v1;
	} else if (v == 'drop-shadow') {
		$(`.${v}`).text(`${v}(${v1}px ${v1}px 6px gray) `);
		dropShadow = v1;
	} else {
		$(`.${v}`).text(`${v}(${v1})`);
		this[v] = v1;
	}
	
	renderPig();
};

var $pig = $('.pig');


var renderPig = function(){
	$pig.css('filter',`blur(${blur}px) grayscale(${grayscale}) sepia(${sepia}) brightness(${brightness}) contrast(${contrast}) invert(${invert}) saturate(${saturate}) opacity(${opacity}) drop-shadow(${dropShadow}px ${dropShadow}px 6px gray) hue-rotate(${hueRotate}deg)`)
};

var $rabbit = $('.rabbit');

var $imgGroup2 = $('.imgGroup2');

var getMode = function(v){
	$rabbit.css('mix-blend-mode',v);
	$imgGroup2.css('background-blend-mode',v);
}

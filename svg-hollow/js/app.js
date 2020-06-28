$(".btn1").click(function(){
	$(".svgBox").show();
	$(".svgBox2").hide();
	$(".cssBox1").hide();
	$(".cssBox2").hide();
});

$(".btn2").click(function(){
	$(".svgBox").hide();
	$(".cssBox1").show();
	$(".cssBox2").hide();
	$(".svgBox2").hide();
});

$(".btn3").click(function(){
	$(".svgBox").hide();
	$(".cssBox1").hide();
	$(".cssBox2").show();
	$(".svgBox2").hide();
});

$(".btn4").click(function(){
	$(".svgBox").hide();
	$(".cssBox1").hide();
	$(".cssBox2").hide();
	$(".svgBox2").show();
});
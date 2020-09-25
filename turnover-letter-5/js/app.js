var $name = $('.name');
var nameText = $name.text().split("");
let $item;

var $nickname = $('.nickname');
var nicknameText = $nickname.text().split("");
let $nickitem;

var $nickbox = $('.nickbox');


var initText = function(){
	$name.text('');
	for(let i=0;i<nameText.length;i++){
		$item = `<span class='anim-text' letter=${nameText[i]}>${nameText[i]}<span>`;
		$name.append($item);
	}
};

var initNickText = function(){
	$nickname.text('');
	for(let i=0;i<nicknameText.length;i++){
		$nickitem = `<span class='nick-text' letter=${nicknameText[i]}>${nicknameText[i]}<span>`;
		$nickname.append($nickitem);
		
	}
};

initText();

initNickText();

let list = 1;

setInterval(() =>{
	list++;
	if(list % 2 == 0){
		$nickbox.attr('class','nickbox nickbox1');
	} else {
		$nickbox.attr('class','nickbox nickbox2');
	}
},1200)

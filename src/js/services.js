// Find elements shown on screen
function inWindow(s){
	let scrollTop = window.pageYOffset;
	let windowHeight1 = window.innerHeight;
	let currentEls1 = document.querySelectorAll(s);
	let result1 = [];
	/*
	var	windowHeight = $(window).height(),
		currentEls = $(s),
		result = [];	
	*/
	currentEls1.forEach( el => {
		let elTop1 = el.offsetTop;
		let elTop2 = el.getBoundingClientRect();
		let elHeight1 = el.offsetHeight;
		if(scrollTop <= elTop1 && (elHeight1 + elTop1) < (scrollTop + windowHeight1)) {
			result1.push(el);
	//		console.log(el);
		}				
	});
	//	console.log(currentEls1);	
	console.log('js: ', result1);
	/*	
	currentEls.each(function(){
		var el = $(this);
		var offset = el.offset();
		var elHeight = el.height();
		if(scrollTop <= offset.top && (elHeight + offset.top) < (scrollTop + windowHeight)) {
			result.push(this);
		}
	});
	//	console.log(currentEls);	
	console.log('jQ: ', result);
	*/
  	return result1;
}

let tiles = inWindow('.js-tile');
tiles.forEach( tile => tile.classList.add("showtext"));

// Show text on scroll
window.addEventListener('scroll', function(){
	let tiles = inWindow('.js-tile');
	tiles.forEach( tile => tile.classList.add("showtext"));
});
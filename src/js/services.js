// Show text on scroll
window.addEventListener('scroll', function(){
	let tiles = inWindow('.js-tile');
	tiles.forEach( tile => tile.classList.add('showtext'));
});

function inWindow(s){
	let windowHeight = window.innerHeight;
	let currentEls = document.querySelectorAll(s);
	let result = [];

	currentEls.forEach( el => {
		let elTop = el.getBoundingClientRect();

		if( ( windowHeight - elTop.top > 0.8 * elTop.height ) && !el.classList.contains('showtext') ) {
			result.push(el);
		}
	});

  return result;
}
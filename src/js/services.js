// Find elements shown on screen
function inWindow(s){
	var scrollTop = $(window).scrollTop(),
		windowHeight = $(window).height(),
		currentEls = $(s),
		result = [];
	
	currentEls.each(function(){
		var el = $(this);
		var offset = el.offset();
		if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
			result.push(this);
	});
	
  	return $(result);
}

var $tile = inWindow('.tile');
$tile.addClass('showtext');

// Show text on scroll
$(window).scroll(function () {
	var $tile = inWindow('.tile');
	$tile.addClass('showtext');
});
$(function(){
	$('.content figure').hover(function () {
		Typed.new('.content figure .review>p>span', {
			stringsElement: $('#typed-strings'),
			startDelay: 300,
			backSpeed: 0,
			backDelay: 500
		});
	});
});
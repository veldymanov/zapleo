$(document).ready(function () {	
	$('.content figure').on ('mouseover', function () {
		var self = this;
		//Typed.new('.content figure .review>p>span', {
		$(self).find('.review>p>span').typed({
			stringsElement: $(self).find('.typed-strings'),
			startDelay: 300,
			backSpeed: 0,
			backDelay: 500
		});
	});
});
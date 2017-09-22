$(document).ready(function () {
//Calculating <main> margin for footer
	function calcMarginBottom () {
	var $fHeight = $('main+footer').outerHeight();
	$('main').css('marginBottom', $fHeight);
	}
	calcMarginBottom();
	$(window).resize(calcMarginBottom);

//Mobile menu
var fadeSpeed = 350;
var $mobMenu = $('.mob-menu');
//Showing menu
	$('.sandwich').on('click', function() {
		$(this).addClass('active');
		$mobMenu.fadeIn(fadeSpeed, function () {
			$(this).find('nav').off('transitionend webkitTransitionEnd oTransitionEnd').addClass('displayed');
		});
	});

	$mobMenu.on('click', function (e) {
		var el = $(e.target);
		var $self = $(this);
		if ( (! el.is('a')) && (! el.is('input')) ) {
			$(this).find('nav').removeClass('displayed').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
 				$self.fadeOut(fadeSpeed);
				$('.sandwich').removeClass('active');
			});
		}
	});
});
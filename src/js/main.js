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

//////////////////////////////////////////////////////////////
//Images lazy loading
//////////////////////////////////////////////////////////////
// Get all of the images that are marked up to lazy load
let imgParents = document.querySelectorAll('.js-lazy-load');
const config = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0.0]
};

// If we have support for intersection observer
if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver is not supported');

    imgParents.forEach(imgParent => loadImage(imgParent));
}  else {
    console.log('IntersectionObserver started');

    // The observer for the images on the page
    let observer = new IntersectionObserver(onIntersection, config);
    imgParents.forEach(imgParent => observer.observe(imgParent));

	function onIntersection(entries) {
		// Loop through the entries
		entries.forEach( entry => {
			// Are we in viewport?
			if(entry.intersectionRatio > 0.0) {
				// Stop watching and load image
				observer.unobserve(entry.target);
				loadImage(entry.target);

				//Show picture
				//entry.target.querySelectorAll('picture')[0].classList.remove('hidden');
			} else {
				//Hide picture
				//entry.target.querySelectorAll('picture')[0].classList.add('hidden');
			}
		});
	}
}

function loadImage(target){
    let lazySrc = target.querySelectorAll('.js-lazy-src')[0];
    let lazyImg = target.querySelectorAll('.js-lazy-img')[0];
    lazySrc.srcset = lazySrc.getAttribute('data-srcset');
    lazyImg.src = lazyImg.getAttribute('data-src');
}
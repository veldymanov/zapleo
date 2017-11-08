$(document).ready(function () {
//Calculating <main> margin for footer
	calcMarginBottom();
	$(window).resize(calcMarginBottom);

	function calcMarginBottom () {
		var $fHeight = $('main+footer').outerHeight();
		$('main').css('marginBottom', $fHeight);
	}	

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

	//calculate filter height
	filterHeight();
	window.addEventListener('resize', function(){
		filterHeight();
	})
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

				//recalculate filter container height
				if (document.querySelector('.js-custom-items')) {
					entry.target.querySelector('.js-lazy-img').addEventListener('load', function(){
						filterHeight();
					})
				}

				//Show picture
				//entry.target.querySelectorAll('picture')[0].classList.remove('hidden');
			} else {
				//Hide picture
				//entry.target.querySelectorAll('picture')[0].classList.add('hidden');
			}
		});
	}
}


///////////////////////////
//Load image 
///////////////////////////
function loadImage(target){
    let lazySrcs = target.querySelectorAll('.js-lazy-src');
    let lazyImgs = target.querySelectorAll('.js-lazy-img');
    lazySrcs.forEach(lazySrc => lazySrc.srcset = lazySrc.getAttribute('data-srcset'));
    lazyImgs.forEach(lazyImg => lazyImg.src = lazyImg.getAttribute('data-src'));
}

///////////////////////////
//Filter conteiner height 
///////////////////////////
function filterHeight(){
	let totalHeight = 0,
		averageHeight = 0,
		totalWidth = 0;
	
	let elsWidth = [],
		elsHeight = [];

	//all filter's elements heights and widths
	$(".js-custom-items .custom-item").each(function(){
		let style = window.getComputedStyle(this);
    	let marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    	let marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
    	let marginRight = parseInt(style.getPropertyValue('margin-right'), 10);
    	let marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);

		elsWidth.push(this.offsetWidth  + marginRight + marginLeft);
		elsHeight.push(this.offsetHeight + marginTop + marginBottom);
	})

	$(".js-custom-items").each(function(){
		//make full height
		this.style.height = 'auto';

		//get full height (and width)
		totalHeight += this.offsetHeight;
		totalWidth += this.offsetWidth;

		//Max array element
		let maxElHeight = Math.max(...elsHeight);
		//Choose max between averageHeight and max element height
		averageHeight = Math.max(Math.ceil(totalHeight / Math.floor( totalWidth / elsWidth[0] )), maxElHeight);

		this.style.height = averageHeight + 'px'; 

		//increase height to fit all elements horizontally (flexbox)
		while(this.scrollWidth > this.offsetWidth){
			averageHeight += 20;
			this.style.height = averageHeight + 'px';
		}
	});
}
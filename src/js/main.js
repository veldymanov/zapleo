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

	//calculate filter container height
	filterHeight();
	window.addEventListener('resize', function(){
		filterHeight();
	})

	//Set filter
    $(".js-product-filter .js-data-term").on("click touchend", function (event) {
    	event.preventDefault();

    	$(".js-product-filter .js-data-term").removeClass("active");
    	$(this).addClass("active");

        var term = $(this).attr("data-term");

        $(".js-custom-item").fadeOut(0).css({"margin-top": "20px"});

        $(".js-custom-item").each(function () {
            ("*" == term) && $(".js-custom-item").fadeIn(0).animate({"margin-top": "0"}, 150); 
            $(this).hasClass(term) && $(this).fadeIn(0).animate({"margin-top": "0"}, 150);
        })

        //recalculate fiter container height (from main.js)
        filterHeight();

    })

	//////////////////////
	//Images lazy loading
	//////////////////////
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

});


///////////////////////////
//Load image function
///////////////////////////
function loadImage(target){
    let lazySrcs = target.querySelectorAll('.js-lazy-src');
    let lazyImgs = target.querySelectorAll('.js-lazy-img');
    lazySrcs.forEach(lazySrc => lazySrc.srcset = lazySrc.getAttribute('data-srcset'));
    lazyImgs.forEach(lazyImg => lazyImg.src = lazyImg.getAttribute('data-src'));
}

//////////////////////////////////
//Filter conteiner height function
//////////////////////////////////
function filterHeight(){
	let totalHeight = 0,
		averageHeight = 0,
		totalWidth = 0;
	
	let elsWidth = [],
		elsHeight = [];

	//all filter's elements heights and widths
	//Can be only one ".js-custom-items" per page
	let filterElements = document.querySelectorAll(".js-custom-items .js-custom-item");
	for (var item of filterElements) {
		let style = window.getComputedStyle(item);
    	let marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    	let marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
    	let marginRight = parseInt(style.getPropertyValue('margin-right'), 10);
    	let marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);

		elsWidth.push(item.offsetWidth  + marginRight + marginLeft);
		elsHeight.push(item.offsetHeight + marginTop + marginBottom);
	}

	let filterContainer = document.querySelector(".js-custom-items");
	//make full height
	filterContainer.style.height = 'auto';

	//get full height (and width)
	totalHeight += filterContainer.offsetHeight;
	totalWidth += filterContainer.offsetWidth;

	//Max array element
	let maxElHeight = Math.max(...elsHeight);
	//Choose max between averageHeight and max element height
	averageHeight = Math.max(Math.ceil(totalHeight / Math.floor( totalWidth / Math.max(...elsWidth) )), maxElHeight);

	filterContainer.style.height = averageHeight + 'px'; 

	//increase height to fit all elements horizontally (flexbox)
	let limit = 0;
	while(filterContainer.scrollWidth > filterContainer.offsetWidth){
		averageHeight += 20;
		filterContainer.style.height = averageHeight + 'px';

		if ( limit > 300 ) {break}
		limit++;
	}
	console.log(limit);
}
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
//Filter container height function
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
	for (let item of filterElements) {
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

document.addEventListener("DOMContentLoaded", function(event) {
	///////////////////////////////////////
	//Calculating <main> margin for footer
	///////////////////////////////////////
	calcMarginBottom();
	window.addEventListener('resize', function(){
		calcMarginBottom();
	})

	function calcMarginBottom () {
		let item = document.querySelector('main+footer');
		let style = window.getComputedStyle(item);
    	let marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    	let marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
		let fHeight = item.offsetHeight + marginTop + marginBottom;
		
		document.querySelector('main').style.marginBottom = fHeight + 'px'; 
	}	

	///////////////////////
	//Mobile menu
	////////////////////////
	let fadeSpeed = 350;
	let mobMenu = document.querySelector(".mob-menu");
	let sandwichBtn = document.querySelector('.sandwich');
	let body = document.querySelector('body');

	function hideMobileMenu(){
			mobMenu.querySelector('nav').classList.remove('displayed');
			body.classList.remove("noscroll");

			setTimeout(function(){			
				mobMenu.style.display = "none";
				sandwichBtn.classList.remove('active');
			}, 250);
	}

	sandwichBtn.addEventListener('click', function(){
		if ( this.classList.contains('active')) {
			hideMobileMenu();
		} else {
			//show mobile menu		
			this.classList.add("active");
			//stop scroll
			body.classList.add("noscroll");

			setTimeout(function(){
				mobMenu.style.display = "block";

				setTimeout(function(){
					mobMenu.querySelector('nav').classList.add('displayed');
				}, 250);			
			}, 500);
		}			 		
	});

	mobMenu.addEventListener('click', function(e){
		if ( !mobMenu.querySelector('nav').contains(e.target) ) {
			hideMobileMenu();
		}
	});
	
	////////////////////////////////////////////////////////////
	//Set filter (Only one one ".js-custom-items" per page!!!!)
	////////////////////////////////////////////////////////////
	if (document.querySelector('.js-custom-items')) {
		let figures = document.querySelectorAll(".js-custom-item figure");
		let pictures = document.querySelectorAll(".js-custom-item picture");
		let customItems = document.querySelectorAll(".js-custom-item");
	    let dataTerms = document.querySelectorAll(".js-product-filter .js-data-term");		

		//calculate filter container height for 'flex-direction: column'
		if( document.querySelector('.js-column') ){
			filterHeight();
			window.addEventListener('resize', function(){
				filterHeight();
			})
		}

		//Touch events
		try {
			//Touch device check
			document.createEvent('TouchEvent');

			//Stop 'hover' by touch
	    	document.querySelectorAll('.underline').forEach( item => {
				item.addEventListener('mouseenter', () => item.style.color = 'rgb(138, 138, 138)');			
			})
			figures.forEach( figure => {
				figure.addEventListener('mouseenter', () => figure.querySelector('figcaption').style.zIndex = "-1");
			})
				
			//Run touch events listeners			
			pictures.forEach( picture => {
				picture.addEventListener('click', event => {
					event.preventDefault();
					figures.forEach( figure => figure.classList.remove("hovered") );
					picture.closest('figure').classList.add("hovered");
				});
			})	
		} catch (e) {
			// Then we aren't on a device that supports touch
		} 

	    //Hide empty menu items
		dataTerms.forEach( item => {
			let term = item.getAttribute("data-term");
			let emptyMenu = true;

			customItems.forEach( i => {
				if (i.classList.contains(term)) {
					emptyMenu = false;
				}
			})

			if ( !(term === "*") && emptyMenu ) {
				item.closest('li').style.display = 'none';
			}
		})	    

		//Set filtering and animation
		let animationTime = "150ms";	    
		//Set multiple event listener
		dataTerms.forEach( item => {
			let eventList = ["click", "touchend"];
			eventList.forEach( event => {
			    item.addEventListener(event, function(e){
			    	e.preventDefault();

			    	//make only this active
			    	dataTerms.forEach( i =>	i.classList.remove("active") )
			    	item.classList.add("active");

			        //remove all (displayed) items
			    	customItems.forEach( i => {
			    		i.style.display = "none";
			    		i.style.position = "relative";
			    		i.style.top = "20px";
			    	})

			    	//show filtered items with animation
			        let term = item.getAttribute("data-term");			    	
			    	customItems.forEach( i => {
			    		if (  term === "*" ){
			    			i.style.display =  "block";
			    			i.style.transition = "top 0s"; 

				    		setTimeout(function(){
				    			i.style.top = "0px";
				    			i.style.transitionDuration = animationTime;
				    		}, 0);
			    		} else if ( i.classList.contains(term) ) {
			    			i.style.display =  "block";
			    			i.style.transition = "top 0s"; 

				    		setTimeout(function(){
				    			i.style.top = "0px";
				    			i.style.transitionDuration = animationTime;
				    		}, 0); 		    			
			    		}		    		   		
			    	})

			        //recalculate filter container height for 'flex-direction: column'
					if( document.querySelector('.js-column') ){
			        	filterHeight();
			        }
			    }, false);
			})
		})
	}

	/////////////////////////////////////
	//Images lazy loading
	/////////////////////////////////////
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

			        //recalculate filter container height for 'flex-direction: column'
					if( document.querySelector('.js-column') ){
			        	filterHeight();
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

$(window).load(function () {
	///////////////////////////
	//Parallax
	///////////////////////////

    //Parallax images visible after all imgs are loaded
    setTimeout( function(){
    	$('#menorah').css('visibility','visible');
    }, 0);

    ///////////////
    //Parallax init
    ///////////////
    $('#menorah').parallax({
        calibrateX: false,
        calibrateY: false
    });
    //Calculating parallax height
    function calcParallaxHeight() {
        $('.start').height( $('#menorah img:first').height() );
    }
    calcParallaxHeight();
    //Updating parallax height onresize
    $(window).resize(calcParallaxHeight);

    //Scroll to <main>
    $('.mouse').on('click', function(){
        $('html, body').animate({scrollTop: $('main').offset().top + 15}, 600);
    });

    //Logo animation
    /* new Vivus('logo', {
    type: 'oneByOne',
    duration: 140,
    delay: 0,
    animTimingFunction: Vivus.EASE_OUT
    },
    function () {
        var paths = $('#logo').find('path');
        paths.css('transitionProperty','all !important');
        paths.css({
            fill: 'rgba(255,255,255,0.5)',
            strokeWidth: '0'
        });
    }); */


    ///////////////////////////
	//Filter
	///////////////////////////
	function filterHeight(){
		var totalHeight = 0;
		var totalWidth = 0;
		
		var elsWidth = [];
		var elWidth;
		var elsHeight = [];
		var koef;

		$(".js-custom-items .custom-item").each(function(){
			elsWidth.push(this.offsetWidth);
			elsHeight.push(this.offsetHeight);
		})

		elWidth = elsWidth[0];

		$(".js-custom-items").each(function(){
			this.style.height = 'auto';
			totalHeight += this.offsetHeight;
			totalWidth += this.offsetWidth;
			koef = Math.floor(totalWidth / (elWidth * 1) );

			this.style.height = Math.ceil(totalHeight / koef) + 'px';
		});
		console.log(elsWidth);
		console.log(elsHeight);
	}

	setTimeout(function(){filterHeight()},1000);

	window.addEventListener('resize', function(){
		filterHeight();
	})

    $(".product-filter .custom-categories a").on("click", function (event) {
    	event.preventDefault();

    	$(".product-filter .custom-categories a").removeClass("active");
    	$(this).addClass("active");

        var term = $(this).attr("data-term");

        $(".custom-item").fadeOut(0).css({"margin-top": "20px"});

        $(".custom-item").each(function () {
            ("*" == term) && $(".custom-item").fadeIn(0).animate({"margin-top": "0"}, 100); 
            $(this).hasClass(term) && $(this).fadeIn(0).animate({"margin-top": "0"}, 100);
        })
    })  
});


//////////////////////////////////////////////////////////////
//register Service Worker
//////////////////////////////////////////////////////////////
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then( reg => console.log('Service Worker registration succeeded. Scope is ' + reg.scope) )
		.catch( error => console.log('Registration failed' + error) )
}
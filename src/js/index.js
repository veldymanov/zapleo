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
});


//////////////////////////////////////////////////////////////
//register Service Worker
//////////////////////////////////////////////////////////////
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then( reg => console.log('Service Worker registration succeeded. Scope is ' + reg.scope) )
		.catch( error => console.log('Registration failed' + error) )
}
$(window).load(function () {
	/**
	* Parallax
	*/
  //Parallax init
  $('#menorah').parallax({
    // calibrateX: true,
    // calibrateY: true,
    limitX: 38,
    limitY: 45
  });
  //Calculating parallax height
  function calcParallaxHeight() {
    //Cut 'bugs' on mobile
    $('#menorah').height($('#menorah img:first').height() - 3);
    //set section height
    $('.start').height( $('#menorah img:first').height() - 3);
  }
  calcParallaxHeight();
  //Updating parallax height onresize
  $(window).resize(calcParallaxHeight);

  //Scroll to <main>
  $('.mouse').on('click', function(){
      $('html, body').animate({scrollTop: $('main').offset().top + 15}, 600);
  });

  //Parallax images visible after all imgs are loaded
  setTimeout( function(){
    $('#menorah').css('visibility','visible');
  })
});


/**
* register Service Worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
  .then( reg => console.log('Service Worker registration succeeded. Scope is ' + reg.scope) )
  .catch( error => console.log('Registration failed' + error) )
}
*/
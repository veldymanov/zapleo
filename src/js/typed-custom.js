$(document).ready(function () {	

  $(".content figure").on('mouseenter', function (event) {
    event.preventDefault();

    Typed.new(".content figure .review>p>span", {
        stringsElement: $(this).find(".typed-strings"),
        startDelay: 300,
        backSpeed: 0,
        backDelay: 500  
    })
  });

  //Touch device feutures
  window.addEventListener('touchstart', function onFirstTouch(e) {  //Then touch device 
    e.preventDefault();
    
    $(".content figure").on('click', function (event) {
        Typed.new(".content figure .review>p>span", {
            stringsElement: $(this).find(".typed-strings"),
            contentType: 'text'
        })
    });
    // we only need to know once that a human touched the screen             
    window.removeEventListener('touchstart', onFirstTouch);
  });   
});

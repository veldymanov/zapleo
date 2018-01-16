$(document).ready(function(){	

  const contentFigures = document.querySelectorAll(".content figure");
  const onHover = function(e){
    e.preventDefault();

    Typed.new(".content figure .review>p>span", {
        stringsElement: $(this).find(".typed-strings"),
        startDelay: 300,
        backSpeed: 0,
        backDelay: 500
    });      
  }

  /* Not touch device feutures */
  contentFigures.forEach( contentFigure => contentFigure.addEventListener('mouseenter', onHover) )

  //Touch device feutures
  window.addEventListener('touchstart', function onFirstTouch(e) {
    e.preventDefault();

    /* Remove not touched device features */
    contentFigures.forEach( contentFigure => contentFigure.removeEventListener('mouseenter', onHover) )

    $(contentFigures).on('click', function (event) {
        Typed.new(".content figure .review>p>span", {
          stringsElement: $(this).find(".typed-strings"),
          contentType: 'text'
        })
    });
    // we only need to know once that a human touched the screen             
    window.removeEventListener('touchstart', onFirstTouch);
  })
})

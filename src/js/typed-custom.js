$(document).ready(function () {	
    try {
        //Touch device check
        document.createEvent('TouchEvent');             
        
        $(".content figure").on('click', function (event) {
            Typed.new(".content figure .review>p>span", {
                stringsElement: $(this).find(".typed-strings"),
                contentType: 'text'
            })
        });           
   
    } catch (e) {
        // Then we aren't on a device that supports touch
        $(".content figure").on('mouseenter', function (event) {
            event.preventDefault();

            Typed.new(".content figure .review>p>span", {
                stringsElement: $(this).find(".typed-strings"),
                startDelay: 300,
                backSpeed: 0,
                backDelay: 500
                
            })
        });        
    }     
});
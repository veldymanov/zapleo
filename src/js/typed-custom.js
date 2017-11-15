$(document).ready(function () {	
    $(".content figure").on('mouseenter', function (event) {
		event.preventDefault();

        Typed.new(".content figure .review>p>span", {
            stringsElement: $(this).find(".typed-strings"),
            startDelay: 300,
            backSpeed: 0,
            backDelay: 500
        })

    //    return true;
    });
});
$(document).ready(function() {
    $(".resume-open-pop-up").click(function(event) {
        $(this).closest('li').find('.wrap-popup').show();
        $(this).closest('li').find('.popup-resume').show();

        //stop scroll propagation
        $(document).find(".js-body").css('overflow','hidden');
    });
    $(document).click(function(event) {
        if ($(event.target).closest('.resume-open-pop-up').length == 0) {
            $('.popup-resume').hide();
            $('.wrap-popup').hide();

            $(parent.document).find(".js-body").css('overflow','auto');
        }
    });
})
document.addEventListener("DOMContentLoaded", function() {
    let resumeBtns = document.querySelectorAll('.js-resume-open-pop-up');
    for(let resumeBtn of resumeBtns){
        resumeBtn.addEventListener('click', function(){
            this.closest('li').querySelector('.js-wrap-popup').style.display = "block";
            this.closest('li').querySelector('.js-popup-resume').style.display = "block";
            //stop scroll propagation
            document.querySelector("body").style.cssText = "overflow-y: hidden; position: fixed";
        })
    }

    let popups = document.querySelectorAll('.wrap-popup');
    for(let popup of popups){
        popup.addEventListener('click', function(e){
            e.preventDefault();

            this.closest('li').querySelector('.js-popup-resume').style.display = "none";
            this.closest('li').querySelector('.js-wrap-popup').style.display = "none";           
            
            document.querySelector("body").style.cssText = "overflow-y: auto; position: inherit";
        })
    }
})
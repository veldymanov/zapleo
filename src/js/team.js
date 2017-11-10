document.addEventListener("DOMContentLoaded", function() {
    let resumes = document.querySelectorAll('.js-resume-open-pop-up');
    for(let resume of resumes){
        resume.addEventListener('click', function(){
            this.closest('li').querySelector('.js-wrap-popup').style.display = "block";
            this.closest('li').querySelector('.js-popup-resume').style.display = "block";
            //stop scroll propagation
            document.querySelector("body").style.overflow = 'hidden';
        })
    }

    let popups = document.querySelectorAll('.wrap-popup');
    for(let popup of popups){
        popup.addEventListener('click', function(){
            this.closest('li').querySelector('.js-popup-resume').style.display = "none";
            this.closest('li').querySelector('.js-wrap-popup').style.display = "none";           
            
            document.querySelector("body").style.overflow = 'auto';
        })        
    }
})
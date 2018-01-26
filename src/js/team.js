document.addEventListener("DOMContentLoaded", function() {
  const team = {};
  team.resumeBtns = document.querySelectorAll('.js-resume-open-pop-up');
  team.body = document.querySelector("body");
  team.popups = document.querySelectorAll('.wrap-popup');

  for(let resumeBtn of team.resumeBtns){
    resumeBtn.addEventListener('click', function(){
      const customItem = this.closest('.js-custom-item');

      console.log(customItem.querySelector('.js-pdf'));
    //  customItem.querySelector('.js-pdf').addEventListener('load', function(){
    //    customItem.querySelector('.js-resume-loading').style.display = 'none';
    //  });

      customItem.querySelector('.js-wrap-popup').style.display = "block";
      customItem.querySelector('.js-popup-resume').style.display = "block";
      //stop scroll propagation
      team.body.style.cssText = "overflow-y: hidden;";
    })
  }

  for(let popup of team.popups){
    popup.addEventListener('click', function(e){
      e.preventDefault();
      this.closest('li').querySelector('.js-popup-resume').style.display = "none";
      this.closest('li').querySelector('.js-wrap-popup').style.display = "none";
      team.body.style.cssText = "overflow-y: auto;";
    })
  }
})
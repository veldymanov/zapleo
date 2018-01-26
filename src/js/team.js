document.addEventListener("DOMContentLoaded", function() {
  const team = {};
  team.resumeBtns = document.querySelectorAll('.js-resume-open-pop-up');
  team.body = document.querySelector("body");
  team.windowScroll = '';
  team.popups = document.querySelectorAll('.wrap-popup');

  for(let resumeBtn of team.resumeBtns){
    resumeBtn.addEventListener('click', function(){
      const customItem = this.closest('.js-custom-item');
      team.windowScrollY = window.scrollY;

      if (window.innerWidth < 750) { customItem.querySelector('.js-pdf').type = 'not-valid'; }
      console.log(customItem.querySelector('.js-pdf').type);

      customItem.querySelector('.js-wrap-popup').style.display = "block";
      customItem.querySelector('.js-popup-resume').style.display = "block";
      //stop scroll propagation
      team.body.style.cssText = `overflow-y: hidden; position: fixed; top: ${-team.windowScrollY}px`;
    })
  }

  for(let popup of team.popups){
    popup.addEventListener('click', function(e){
      e.preventDefault();
      const customItem = this.closest('.js-custom-item');

      customItem.querySelector('.js-pdf').type = 'application/pdf';
      console.log(customItem.querySelector('.js-pdf').type);
      customItem.querySelector('.js-popup-resume').style.display = "none";
      customItem.querySelector('.js-wrap-popup').style.display = "none";
      team.body.style.cssText = `overflow-y: auto; position: inherit;`;
      window.scroll(0, team.windowScrollY);
    })
  }
})

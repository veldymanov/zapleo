document.addEventListener("DOMContentLoaded", function(event) {
	// Instagram images height/width
  const blogImages = {};
  blogImages.instagramImgs = document.querySelectorAll('.js-img-instagram');

  blogImages.instagramImgs.forEach( (instagramImg) =>
    instagramImg.addEventListener('load', function(){
      if (instagramImg.clientHeight < instagramImg.clientWidth) {
        instagramImg.style.cssText = `height: 100%; width: auto;`;
      };
    })
  )

  // cut text with "..."
  const postTexts = document.querySelectorAll('.js-post-text');
  postTexts.forEach( (el) => {
    ellipsizeTextBox(el);
  });

  window.addEventListener('resize', function(){
    postTexts.forEach( (el) => {
      ellipsizeTextBox(el);
    });
  });
});


function ellipsizeTextBox(el) {
  let wordArray = el.innerHTML.trim().split(' ');

  while(el.scrollHeight > el.offsetHeight) {
    wordArray.pop();
    el.innerHTML = wordArray.join(' ') + '...';
  }
}

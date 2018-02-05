	/**
	* Instagram images height/width
	*/
  const blogImages = {};
  blogImages.instagramImgs = document.querySelectorAll('.js-img-instagram');

  blogImages.instagramImgs.forEach( (instagramImg) =>
    instagramImg.addEventListener('load', function(){
      if (instagramImg.clientHeight < instagramImg.clientWidth) {
        instagramImg.style.cssText = `height: 100%; width: auto;`;
      }
    })
  )
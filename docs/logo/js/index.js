"use strict";var init=function(){navigator.userAgent&&navigator.userAgent.toLowerCase().indexOf("mobile"),window.innerWidth;var i=new ParticleSlider({ptlGap:6,ptlSize:2,width:1e9,height:1e9,mouseForce:5e3,slideDelay:15});window.addEventListener?window.addEventListener("click",function(){i.init(!0)},!1):window.onclick=function(){i.init(!0)}},initParticleSlider=function(){var i=document.createElement("script");i.addEventListener?i.addEventListener("load",init,!1):i.onload=init,i.src="js/particleslider.js",i.setAttribute("type","text/javascript"),document.body.appendChild(i)}(window.addEventListener?window.addEventListener("load",initParticleSlider,!1):window.onload=initParticleSlider);
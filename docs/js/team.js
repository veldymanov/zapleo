"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".js-resume-open-pop-up"),t=!0,o=!1,r=void 0;try{for(var l,n=e[Symbol.iterator]();!(t=(l=n.next()).done);t=!0)l.value.addEventListener("click",function(){this.closest("li").querySelector(".js-wrap-popup").style.display="block",this.closest("li").querySelector(".js-popup-resume").style.display="block",document.querySelector("body").style.cssText="overflow-y: hidden; position: fixed;"})}catch(e){o=!0,r=e}finally{try{!t&&n.return&&n.return()}finally{if(o)throw r}}var s=document.querySelectorAll(".wrap-popup"),i=!0,u=!1,c=void 0;try{for(var y,p=s[Symbol.iterator]();!(i=(y=p.next()).done);i=!0)y.value.addEventListener("click",function(e){e.preventDefault(),this.closest("li").querySelector(".js-popup-resume").style.display="none",this.closest("li").querySelector(".js-wrap-popup").style.display="none",document.querySelector("body").style.cssText="overflow-y: auto; position: inherit;"})}catch(e){u=!0,c=e}finally{try{!i&&p.return&&p.return()}finally{if(u)throw c}}});
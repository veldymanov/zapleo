"use strict";function loadImage(e){var n=e.querySelectorAll(".js-lazy-src")[0],t=e.querySelectorAll(".js-lazy-img")[0];n.srcset=n.getAttribute("data-srcset"),t.src=t.getAttribute("data-src")}$(document).ready(function(){function e(){var e=$("main+footer").outerHeight();$("main").css("marginBottom",e)}e(),$(window).resize(e);var n=$(".mob-menu");$(".sandwich").on("click",function(){$(this).addClass("active"),n.fadeIn(350,function(){$(this).find("nav").off("transitionend webkitTransitionEnd oTransitionEnd").addClass("displayed")})}),n.on("click",function(e){var n=$(e.target),t=$(this);n.is("a")||n.is("input")||$(this).find("nav").removeClass("displayed").on("transitionend webkitTransitionEnd oTransitionEnd",function(){t.fadeOut(350),$(".sandwich").removeClass("active")})})});var imgParents=document.querySelectorAll(".js-lazy-load"),config={root:null,rootMargin:"0px 0px 0px 0px",threshold:[0]};if("IntersectionObserver"in window){var onIntersection=function(e){e.forEach(function(e){e.intersectionRatio>0&&(observer.unobserve(e.target),loadImage(e.target))})};console.log("IntersectionObserver started");var observer=new IntersectionObserver(onIntersection,config);imgParents.forEach(function(e){return observer.observe(e)})}else console.log("IntersectionObserver is not supported"),imgParents.forEach(function(e){return loadImage(e)});
"use strict";function inWindow(n){var t=window.innerHeight,i=[];return document.querySelectorAll(n).forEach(function(n){var e=n.getBoundingClientRect();t-e.top>.8*e.height&&!n.classList.contains("showtext")&&i.push(n)}),i}window.addEventListener("scroll",function(){inWindow(".js-tile").forEach(function(n){return n.classList.add("showtext")})});
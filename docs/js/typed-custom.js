"use strict";$(document).ready(function(){var e=document.querySelectorAll(".content figure"),t=function(e){e.preventDefault(),Typed.new(".content figure .review>p>span",{stringsElement:$(this).find(".typed-strings"),startDelay:300,backSpeed:0,backDelay:500})};e.forEach(function(e){return e.addEventListener("mouseenter",t)}),window.addEventListener("touchstart",function n(r){r.preventDefault(),e.forEach(function(e){return e.removeEventListener("mouseenter",t)}),$(e).on("click",function(e){Typed.new(".content figure .review>p>span",{stringsElement:$(this).find(".typed-strings"),contentType:"text"})}),window.removeEventListener("touchstart",n)})});
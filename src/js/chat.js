document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-open-close-btn').addEventListener('click', () => {
    document.querySelector('.js-rolled-up').classList.toggle('opened');
    document.querySelector('.js-expanded').classList.toggle('opened');
    document.querySelector('.js-arrow').classList.toggle('opened');
  })

  // Stop  scroll propagation
  document.querySelector('.js-expanded').addEventListener('mouseover', () => {
    const bodyWidth = document.querySelector('body').offsetWidth;
    document.querySelector('body').style.cssText = `overflow-y: hidden; width: ${bodyWidth}px;`;
    console.log(document.querySelector('body').offsetWidth);
  })
  document.querySelector('.js-expanded').addEventListener('mouseleave', () => {
    document.querySelector('body').style.cssText = `overflow-y: auto; width: auto;`;
  })

  document.querySelector('.js-send-msg-btn').addEventListener('click', function(e){
    e.preventDefault();

    createMessege("new messege", 1);
    gotoBottom('.js-chat');
  })


  function createMessege(msg, server) {
    let messege = msg;
    let addClass = '';
    let imgSrc = 'images/blog/blog-post/comments/avatar-empty.z.png';
    let userName = 'Me';

    if (server) {
      addClass = 'zapleo';
      imgSrc = 'images/icons/logo-short1.z.svg';
      userName = 'Zapleo';
    }

    let chatItem =
      `<li class="chat-item ${addClass}">` +
        `<picture class="chat-item-photo">`+
        `<img src=${imgSrc} alt="photo">`+
        `</picture>` +
        `<div class="chat-box">` +
          `<h5 class="chat-user-name">${userName}</h5>` +
          `<div class="chat-text-box">` +
            `<p class="text-msg">${messege}</p>` +
            `<svg viewBox="0 0 800 300"><path d="M 0 300 L 800 300 L 500 0 Q 500 200 0 300 Z"/></svg>` +
          `</div>` +
        `</div>` +
      `</li>`;

    document.querySelector('.js-chat').innerHTML += chatItem;
  }

  function gotoBottom(selector){
    let element = document.querySelector(selector);
    element.scrollTop = element.scrollHeight - element.clientHeight;
 }

})
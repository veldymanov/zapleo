document.addEventListener('DOMContentLoaded', function() {
  const elems = {};
  const user = {};
  elems.body = document.querySelector('body');
  elems.html = document.querySelector('html');
  elems.messenger = document.querySelector('.messenger');
  elems.rolledUp = document.querySelector('.js-rolled-up');
  elems.expanded = document.querySelector('.js-expanded');
  elems.chatCaption = document.querySelector('.js-chat-caption');
  elems.arrow = document.querySelector('.js-arrow');
  // authentification
  elems.auth = document.querySelector('#js-auth');
  elems.nameBtn = document.querySelector('.js-name-btn');
  elems.nameBtnSvg = document.querySelector('.js-name-btn-svg');
  // message
  elems.messageTextarea = document.querySelector('#js-message-textarea');
  elems.sendMsgBtn = document.querySelector('.js-send-msg-btn');
  elems.sendMsgBtnSvg = document.querySelector('.js-send-msg-btn-svg');
  //user
  user.name = '';

  /**
  * Open/Close messenger
  */
  elems.rolledUp.addEventListener('click', function() {
    elems.rolledUp.classList.add('opened');
    elems.expanded.classList.add('opened');
    elems.arrow.classList.add('opened');
    setFocus();
  })

  elems.chatCaption.addEventListener('click', function() {
    elems.rolledUp.classList.remove('opened');
    elems.expanded.classList.remove('opened');
    elems.arrow.classList.remove('opened');
    setFocus();
  })

  /**
  * Authentification form
  */
  if (user.name){
    elems.expanded.classList.add('authorized');
  }
  // name button: active/passive
  elems.auth.addEventListener('keyup', function(e) {
    this.value ? elems.nameBtnSvg.classList.add('active') : elems.nameBtnSvg.classList.remove('active');
  })
  // enter by 'shift + enter'
  elems.auth.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (elems.auth.value) {
        user.name = elems.auth.value.trim();
        elems.expanded.classList.add('authorized');
      }
    }
  })
  // enter by 'click'
  elems.nameBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (elems.auth.value) {
      user.name = elems.auth.value.trim();
      elems.expanded.classList.add('authorized');
    }
  })

  /**
  * Stop scroll propagation
  */
  elems.msgrOriginalRight = parseInt(window.getComputedStyle(elems.messenger,null).getPropertyValue('right'), 10);
  elems.expanded.addEventListener('mouseenter', function() {
    const bodyWidth = elems.body.offsetWidth;
    elems.body.style.cssText = `overflow-y: hidden; width: ${bodyWidth}px;`;
    elems.messenger.style.right = elems.msgrOriginalRight + ( elems.html.offsetWidth - bodyWidth) + 'px';
  })

  elems.expanded.addEventListener('mouseleave', function() {
    elems.body.style.cssText = `overflow-y: auto; width: auto;`;
    elems.messenger.style.right = elems.msgrOriginalRight + 'px';
  })

  /**
  * Message form
  */
  // send button: active/passive
  elems.messageTextarea.addEventListener('keyup', function(e) {
    this.value ? elems.sendMsgBtnSvg.classList.add('active') : elems.sendMsgBtnSvg.classList.remove('active');
  })
  // send by 'shift + enter'
  elems.messageTextarea.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.keyCode == 13) {
      e.preventDefault();
      let msg = elems.messageTextarea.value.trim();
      prepareForPost();
      postMessage(msg);
    }
  })
  //send by 'click'
  elems.sendMsgBtn.addEventListener('click', function(e){
    e.preventDefault();
    let msg = elems.messageTextarea.value.trim();
    prepareForPost();
    postMessage(msg);
  })


  /**
  * module functions
  */
  function prepareForPost() {
    elems.messageTextarea.value = '';
    elems.sendMsgBtnSvg.classList.remove('active');
    elems.messageTextarea.focus();
  }

  function postMessage(msg, sender){
    //........
    publishMessage(msg, sender)
  }

  function publishMessage(msg, sender) {
    let addClass, imgSrc, userName;

    if (!msg) return

    if (sender === 'server'){
      addClass = 'zapleo';
      imgSrc = 'images/icons/logo-short1.z.svg';
      userName = 'Zapleo';
    } else  {
      addClass = '';
      imgSrc = 'images/blog/blog-post/comments/avatar-empty.z.png';
      userName = user.name;
    }

    let chatItem =
      `<li class="chat-item ${addClass}">` +
        `<picture class="chat-item-photo">`+
        `<img src=${imgSrc} alt="photo">`+
        `</picture>` +
        `<div class="chat-box">` +
          `<h5 class="chat-user-name">${userName}</h5>` +
          `<div class="chat-text-box">` +
            `<p class="text-msg">${msg}</p>` +
            `<svg viewBox="0 0 800 300"><path d="M 0 300 L 800 300 L 500 0 Q 500 200 0 300 Z"/></svg>` +
          `</div>` +
        `</div>` +
      `</li>`;

    document.querySelector('.js-chat').innerHTML += chatItem;
    gotoBottom('.js-chat');
  }

  function setFocus(){
    if (elems.expanded.classList.contains('opened')) {
      elems.messageTextarea.focus();
    }
  }

  function gotoBottom(selector){
    let elem = document.querySelector(selector);
    elem.scrollTop = elem.scrollHeight - elem.clientHeight;
  }
})

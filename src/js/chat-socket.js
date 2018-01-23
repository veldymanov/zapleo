/**
 * socket adjustment
 */
let to = undefined;

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires == "number" && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];
    if (propValue !== true) {
        updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function gotoBottom(selector){
  let elem = document.querySelector(selector);
  elem.scrollTop = elem.scrollHeight - elem.clientHeight;
}

function clearChat(selector){
  document.querySelector(selector).innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function() {
  const elems = {};
  const user = {};
  elems.body = document.querySelector('body');
  elems.html = document.querySelector('html');
  elems.footer = document.querySelector('.js-footer');
  elems.messenger = document.querySelector('.js-messenger');
  elems.rolledUp = document.querySelector('.js-rolled-up');
  elems.expanded = document.querySelector('.js-expanded');
  elems.chatCaption = document.querySelector('.js-chat-caption');
  elems.openCloseBtn = document.querySelector('.js-open-close-btn');
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
    elems.messenger.classList.add('opened');
    elems.rolledUp.classList.add('opened');
    elems.expanded.classList.add('opened');
    elems.arrow.classList.add('opened');
    setFocus();
  })

  elems.chatCaption.addEventListener('click', function() {
    elems.messenger.classList.remove('opened');
    elems.rolledUp.classList.remove('opened');
    elems.expanded.classList.remove('opened');
    elems.arrow.classList.remove('opened');
    scrolling();
  })

  elems.openCloseBtn.addEventListener('click', function() {
    elems.messenger.classList.toggle('opened');
    elems.rolledUp.classList.toggle('opened');
    elems.expanded.classList.toggle('opened');
    elems.arrow.classList.toggle('opened');
    setFocus();
    scrolling();
  })

//  let socket = io(':{!! env('WS_PORT','') !!}');

  /**
   * Authentification form
   */
  user.name = getCookie('chat_username');
  if (user.name){
    let date = new Date(new Date().getTime()+60 * 1000 * 60 *24);
    setCookie('chat_username',user.name,{path:'/',expires:date});
    elems.expanded.classList.add('authorized');
  }
  let uid = getCookie('chat_uid');
  /*
  socket.on('connect',function () {
    if(uid == undefined) {
      uid = socket.id;
    }
    let date = new Date(new Date().getTime()+60 * 1000 * 60 *24);
    setCookie('chat_uid',uid,{path:'/',expires:date});
    clearChat('.js-chat');
    socket.emit('system_info');
    socket.emit('auth',{'uid':uid});
  });

  socket.on('message',function (data) {
    if(data.message == undefined)
        return;
    if(data.type == 'user') {
      if(data.name != null)
        user.name = data.name;
      publishMessage(data.message);
    }
    else {
      serverName = data.name;
      publishMessage(data.message, 'server');
    }
    gotoBottom('.js-chat');
  });
  */

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
        let date = new Date(new Date().getTime()+60 * 1000 * 60 *24);
        setCookie('chat_username',user.name,{path:'/',expires:date});
        elems.expanded.classList.add('authorized');
      }
    }
  })
  // enter by 'click'
  elems.nameBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (elems.auth.value) {
      user.name = elems.auth.value.trim();
      let date = new Date(new Date().getTime()+60 * 1000 * 60 *24);
      setCookie('chat_username',user.name,{path:'/',expires:date});
      elems.expanded.classList.add('authorized');
    }
  })

  /**
   * Stop scroll propagation
   */
  elems.msgrOriginalRight = parseInt(window.getComputedStyle(elems.messenger,null).getPropertyValue('right'), 10);
  elems.expanded.addEventListener('mouseenter', function() {
    const bodyWidth = elems.body.offsetWidth;
    preventScrolling(bodyWidth);
  })

  elems.expanded.addEventListener('mouseleave', function() {
    scrolling();
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
      user.name = getCookie('chat_username');
      postMessage(msg);
    }
  })
  //send by 'click'
  elems.sendMsgBtn.addEventListener('click', function(e){
    e.preventDefault();
    let msg = elems.messageTextarea.value.trim();
    prepareForPost();
    user.name = getCookie('chat_username');
    postMessage(msg);
  })

  /**
   * module functions
   */
  function preventScrolling(bodyWidth) {
    elems.body.style.cssText = `overflow-y: hidden; width: ${bodyWidth}px;`;
    elems.footer.style.width = `${bodyWidth}px`;
    elems.messenger.style.right = elems.msgrOriginalRight + ( window.innerWidth - bodyWidth ) + 'px';
  }

  function scrolling() {
    elems.body.style.cssText = `overflow-y: auto; width: auto;`;
    elems.footer.style.width = `100%`;
    elems.messenger.style.right = elems.msgrOriginalRight + 'px';
  }

  function prepareForPost() {
    elems.messageTextarea.value = '';
    elems.sendMsgBtnSvg.classList.remove('active');
    elems.messageTextarea.focus();
  }

  function postMessage(msg, sender){
    //........
    if(to == undefined)
        socket.send({'message':msg,'uid':uid,'name':user.name});
    else
        socket.send({'message':msg,'uid':uid,'to':to,'name':user.name});
    publishMessage(msg, sender)
  }

  function publishMessage(msg, sender) {
    let addClass, imgSrc, userName;

    if (!msg) return

    if (sender === 'server'){
      addClass = 'zapleo';
      imgSrc = '/images/icons/logo-short1.z.svg';
      userName = serverName;
    } else  {
      addClass = '';
      imgSrc = '/images/blog/blog-post/comments/avatar-empty.z.png';
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
      gotoBottom('.js-chat');
    }
  }
})
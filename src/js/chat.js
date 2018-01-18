document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-open-close-btn').addEventListener('click', () => {
    document.querySelector('.js-rolled-up').classList.toggle('opened');
    document.querySelector('.js-expanded').classList.toggle('opened');
    document.querySelector('.js-arrow').classList.toggle('opened');
  })
})
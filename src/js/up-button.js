import throttle from 'lodash.throttle';
import refs from './refs.js';

function onHideUpBtn(element) {
  return function hideOnScroll() {
    if (pageYOffset < document.documentElement.clientHeight) {
      element.classList.add('visually-hidden');
    } else {
      element.classList.remove('visually-hidden');
    }
  };
}

function onClickToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', throttle(onHideUpBtn(refs.upBtn), 500));
refs.upBtn.addEventListener('click', onClickToTop);
import throttle from 'lodash.throttle';

const upBtn = document.querySelector('.btn__up-wrapper');

window.addEventListener('scroll', throttle(onHideUpBtn(upBtn), 500));
upBtn.addEventListener('click', onClickToTop);

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

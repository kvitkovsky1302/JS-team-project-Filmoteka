
import * as basicLightbox from 'basiclightbox';

const markup = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;

const spinner = basicLightbox.create(markup);

export default { spinner };

// ПОКАЗАТЬ спиннер - spinner.show();
// ЗАКРЫТЬ  спиннер - spinner.close();

// // Как пример - спиннер пока срабатывает при клике на копирайт
const copyrightContainer = document.querySelector('.dev__link');

copyrightContainer.addEventListener('click', onLoadingSpinner);

function onLoadingSpinner() {
    spinner.show();
    console.log('j')
}

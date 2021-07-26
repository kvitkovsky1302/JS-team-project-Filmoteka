
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

// ПОКАЗАТИ спінер - spinner.show();
// ЗАКРИТИ  спінер - spinner.close();

// Приклад = клік футер копірайт.
// const copyrightContainer = document.querySelector('.copyright');

// copyrightContainer.addEventListener('click', onLoadingSpinner);

// function onLoadingSpinner() {
//     spinner.show();
// }

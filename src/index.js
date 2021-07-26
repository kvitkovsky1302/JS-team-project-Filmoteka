import './sass/main.scss';
import placeholder from './js/spinner';

const copyrightContainer = document.querySelector('.dev__link');

copyrightContainer.addEventListener('click', onLoadingSpinner);

function onLoadingSpinner() {
  placeholder.spinner.show();
}
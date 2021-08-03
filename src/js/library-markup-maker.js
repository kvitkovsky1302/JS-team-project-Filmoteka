import ApiServices from './api-services.js';
import createFilmCard from '../templates/film-card-library.hbs';
import { onCreateTrailer } from './trailer.js';
import onOpenModalFilmCard from './modal-film-card.js';
import { spinner } from './spinner.js';

const apiServices = new ApiServices();

const libraryList = document.querySelector('.js-library-list');
const btnLibWatched = document.querySelector('.js-button-library-watched');
const btnLibQueue = document.querySelector('.js-button-library-queue');

const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));
const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));

btnLibWatched.addEventListener('click', () => parseWatchedFilmsMarkup());
btnLibQueue.addEventListener('click', () => parseQueueFilmsMarkup());

function parseWatchedFilmsMarkup() {
  
  if (parsedWatchedFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.add('focus');
    btnLibQueue.classList.remove('focus');
    parsedWatchedFilmsIds.forEach(el => parseOneCardMarkup(el.detailMovie));
  } else return;
}

function parseQueueFilmsMarkup() {
 
  if (parsedQueueFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.remove('focus');
    btnLibQueue.classList.add('focus');
    parsedQueueFilmsIds.forEach(el => parseOneCardMarkup(el.detailMovie));
  } else return;
}

function parseOneCardMarkup(films) {
  spinner.close();
  libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
  // onCreateTrailer(document.querySelectorAll('.js-btn-trailer'));
}
parseWatchedFilmsMarkup();

function libModalHandler(e) {
  onOpenModalFilmCard(e);
}

libraryList.addEventListener('click', libModalHandler);

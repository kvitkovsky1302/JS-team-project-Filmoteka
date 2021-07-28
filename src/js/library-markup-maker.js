import ApiServices from './api-services.js';
import createFilmCard from '../templates/film-card-library.hbs';

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
    parsedWatchedFilmsIds.forEach(loadWachedFilm);
  } else return;
}

function parseQueueFilmsMarkup() {
  if (parsedQueueFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.remove('focus');
    btnLibQueue.classList.add('focus');
    parsedQueueFilmsIds.forEach(loadWachedFilm);
  } else return;
}

function loadWachedFilm(id) {
  apiServices.movieId = id;
  (async () => {
    const films = await apiServices.createDetailedMovieYear();
    parseOneCardMarkup(films);
  })();
}
function parseOneCardMarkup(films) {
  libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
}
parseWatchedFilmsMarkup();

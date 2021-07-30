import ApiServices from './api-services.js';
import createFilmCard from '../templates/film-card-library.hbs';
import { onCreateTrailer } from './trailer.js';
import onOpenModalFilmCard from './modalFilmCard.js';

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
    parsedWatchedFilmsIds.forEach(loadFilm);
  } else return;
}

function parseQueueFilmsMarkup() {
  if (parsedQueueFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.remove('focus');
    btnLibQueue.classList.add('focus');
    parsedQueueFilmsIds.forEach(loadFilm);
  } else return;
}

function loadFilm(id) {
  apiServices.movieId = id;
  (async () => {
    const detailMovie = await apiServices.fetchDetailedMovie();
    detailMovie.year = detailMovie.release_date ? detailMovie.release_date.split('-')[0] : 'n/a';

    if (detailMovie.genres.length > 3) {
      detailMovie.genres = detailMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }
    parseOneCardMarkup(detailMovie);
  })();
}
function parseOneCardMarkup(films) {
  libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
  // onCreateTrailer(document.querySelectorAll('.js-btn-trailer'));
}
parseWatchedFilmsMarkup();

function libModalHandler(e) {
  onOpenModalFilmCard(e);

  // if (parsedWatchedFilmsIds.includes(e.target.parentNode.parentNode.id)) {
  //   document.querySelector('.js-button-watched').textContent = 'to queue';
  //   document.querySelector('.js-button-queue').textContent = 'delete';
  // }
  // if (parsedQueueFilmsIds.includes(e.target.parentNode.parentNode.id)) {
  //   document.querySelector('.js-button-queue').textContent = 'to watched';
  //   document.querySelector('.js-button-watched').textContent = 'delete';
  // }
}

libraryList.addEventListener('click', libModalHandler);

import createFilmCard from '../templates/one-film-card.hbs';
import ApiServices from './api-services.js';
import createModalCard from '../templates/modal-film-card.hbs';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import { alert, error, info, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';
defaults.width = '500px';
defaults.delay = '4000';

const myStack = new Stack({
  dir1: 'down',
  dir2: 'right',
  firstpos1: 125,
  firstpos2: 10,
  push: 'bottom',
  context: document.body,
});

const filmsContainer = document.querySelector('.films-list');
const searchInput = document.querySelector('.form-text');
const filmsList = document.querySelector('.films-list');
filmsList.addEventListener('click', onOpenModalCard);
searchInput.addEventListener('input', debounce(inputHandler, 500));

const apiServices = new ApiServices();

function parseMarkup(films) {
  filmsContainer.insertAdjacentHTML('beforeend', createFilmCard(films));
}

async function loadPopFilms() {
  const films = await apiServices.createPopMovieGenres();
  filmsContainer.innerHTML = '';
  parseMarkup(films);
}
loadPopFilms();

let query;

function inputHandler(e) {
  query = e.target.value;
  apiServices.clearRes();
  if (query === '') {
    filmsContainer.innerHTML = '';
    loadPopFilms();
  }
  apiServices.currentQuery = query;
  if (query) {
    (async () => {
      const films = await apiServices.createFindMovieGenres();
      filmsContainer.innerHTML = '';
      parseMarkup(films);
      if (films.length === 0) {
        error({
          text: 'Search result not successful. Enter the correct movie name!',
          stack: myStack,
        });
      }
    })();
  }
}
//-------------------------------------------load more-------------------------------------------

//-----------------------------------------------------------------------------------------------

//------------------------------------------modal parse------------------------------------------

let instance;
let modalFilm;

export function onOpenModalCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return
  }
  apiServices.movieId = e.target.parentNode.parentNode.id;
  (async () => {
    const film = await apiServices.fetchDetailedMovie();
    const markupModalCard = createModalCard(film);

    instance = basicLightbox.create(markupModalCard);
    instance.show();
    modalFilm = document.querySelector('.modal-film');
    modalFilm.addEventListener('click', onAddFilmToLocalStorage);
  })();

  window.addEventListener('keydown', onCloseModal);
}

function onCloseModal(e) {
  if (e.code === 'Escape') {
    instance.close();
    window.removeEventListener('keydown', onCloseModal);
    modalFilm.removeEventListener('click', onAddFilmToLocalStorage);
  }
}

//------------------------------------------local storage----------------------------------------------------

const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];
function onAddFilmToLocalStorage(e) {
  if (e.target.classList.contains('js-wached')) {
    if (watchedFilmsIds !== null && !watchedFilmsIds.includes(e.currentTarget.id)) {
      watchedFilmsIds.push(e.currentTarget.id);
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
    } else return;
  }

  if (e.target.classList.contains('js-queue')) {
    if (queueFilmsIds !== null && !queueFilmsIds.includes(e.currentTarget.id)) {
      queueFilmsIds.push(e.currentTarget.id);
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
    } else return;
  }
}

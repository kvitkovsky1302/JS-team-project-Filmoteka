import createFilmCard from '../templates/one-film-card.hbs';
import ApiServices from './api-services.js';
// import createModalCard from '../templates/modal-film-card.hbs';
import debounce from 'lodash.debounce';
import { onCreateTrailer } from './trailer.js';
// import * as basicLightbox from 'basiclightbox';
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
  firstpos1: 250,
  firstpos2: 10,
  push: 'bottom',
  context: document.body,
});

import onOpenModalFilmCard from './modalFilmCard';

const filmsList = document.querySelector('.js-films-list');
const searchInput = document.querySelector('.form-text');
const headerForm = document.querySelector('.header-form');
filmsList.addEventListener('click', onOpenModalFilmCard);
searchInput.addEventListener('input', debounce(inputHandler, 500));
headerForm.addEventListener('keydown', headerFormIgnoreKeypressEnter);

const apiServices = new ApiServices();

function parseMarkup(films) {
  filmsList.insertAdjacentHTML('beforeend', createFilmCard(films));
  onCreateTrailer(document.querySelectorAll('.js-btn-trailer'));
}

function createMovies(returnedFetchMovies, returnedFetchGenres) {
  return returnedFetchMovies.map(movie => {
    movie.year = movie.release_date ? movie.release_date.split('-')[0] : 'n/a';
    if (movie.genre_ids.length > 0 && movie.genre_ids.length <= 3) {
      movie.genres = movie.genre_ids
        .map(id => returnedFetchGenres.filter(el => el.id === id))
        .flat();
    }
    if (movie.genre_ids.length > 3) {
      movie.genres = movie.genre_ids
        .map(id => returnedFetchGenres.filter(el => el.id === id))
        .slice(0, 2)
        .flat()
        .concat({ name: 'Other' });
    }
    if (movie.genre_ids.length === 0) {
      movie.genres = [{ name: 'n/a' }];
    }
    return movie;
  });
}

function loadPopFilms() {
  (async () => {
    const fetchPopMovies = await apiServices.fetchPopularMovies();
    const fetchGenMovies = await apiServices.fetchGenreMovies();
    const films = createMovies(fetchPopMovies, fetchGenMovies);
    filmsList.innerHTML = '';
    parseMarkup(films);
  })();
}
loadPopFilms();

let query;

function inputHandler(e) {
 
  query = e.target.value.trim();
  apiServices.clearRes();
  if (query === '') {
    filmsList.innerHTML = '';
    loadPopFilms();
  }
  apiServices.currentQuery = query;
  if (query) {
    (async () => {
      const fetchFindMovies = await apiServices.fetchFindMovies();
      const fetchGenMovies = await apiServices.fetchGenreMovies();
      const films = createMovies(fetchFindMovies, fetchGenMovies);

      filmsList.innerHTML = '';
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


function headerFormIgnoreKeypressEnter(e) {
 
  if (e.keyCode === 13) {
    e.preventDefault();
    return;
  }
}
//-------------------------------------------load more-------------------------------------------

//-----------------------------------------------------------------------------------------------

//------------------------------------------modal parse------------------------------------------

// let instance;
// let modalFilm;

// function onOpenModalFilmCard(e) {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }
//   apiServices.movieId = e.target.parentNode.parentNode.id;
//   (async () => {
//     const detailMovie = await apiServices.fetchDetailedMovie();
//     detailMovie.year = detailMovie.release_date ? detailMovie.release_date.split('-')[0] : 'n/a';

//     if (detailMovie.genres.length > 3) {
//       detailMovie.genres = detailMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
//     }

//     const markupModalCard = createModalCard(detailMovie);

//     instance = basicLightbox.create(markupModalCard);
//     instance.show();
//     modalFilm = document.querySelector('.modal-film');
//     modalFilm.addEventListener('click', onAddFilmToLocalStorage);
//   })();

//   window.addEventListener('keydown', onCloseModalFilmCard);
// }

// function onCloseModalFilmCard(e) {
//   if (e.code === 'Escape') {
//     instance.close();
//     window.removeEventListener('keydown', onCloseModalFilmCard);
//     modalFilm.removeEventListener('click', onAddFilmToLocalStorage);
//   }
// }

// //------------------------------------------local storage----------------------------------------------------

// const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
// const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];
// function onAddFilmToLocalStorage(e) {
//   if (e.target.classList.contains('js-wached')) {
//     if (watchedFilmsIds !== null && !watchedFilmsIds.includes(e.currentTarget.id)) {
//       watchedFilmsIds.push(e.currentTarget.id);
//       localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
//     } else return;
//   }

//   if (e.target.classList.contains('js-queue')) {
//     if (queueFilmsIds !== null && !queueFilmsIds.includes(e.currentTarget.id)) {
//       queueFilmsIds.push(e.currentTarget.id);
//       localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
//     } else return;
//   }
// }

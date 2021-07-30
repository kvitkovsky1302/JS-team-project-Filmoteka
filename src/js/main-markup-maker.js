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

import onOpenModalFilmCard from './modal-film-card';

const filmsList = document.querySelector('.js-films-list');
const searchInput = document.querySelector('.form-text');
filmsList.addEventListener('click', onOpenModalFilmCard);
searchInput.addEventListener('input', debounce(inputHandler, 500));

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
  query = e.target.value;
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
      console.log(films);
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
//-------------------------------------------load more-------------------------------------------

function onLoadMore() {
  if (query) {
    (async () => {
      const fetchFindMovies = await apiServices.fetchFindMovies();
      const fetchGenMovies = await apiServices.fetchGenreMovies();
      const films = createMovies(fetchFindMovies, fetchGenMovies);
      parseMarkup(films);
      const id = await films[films.length - 1].id;
      const element = document.getElementById(`${id}`);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      if (films.length < 20) {
        loadMoreBtn.style.display = 'none';
        alert({
          text: 'No more photos were found for this request!',
          stack: myStack,
        });
      }
    })();
  }

  if (!query) {
    (async () => {
      const fetchPopMovies = await apiServices.fetchPopularMovies();
      const fetchGenMovies = await apiServices.fetchGenreMovies();
      const films = createMovies(fetchPopMovies, fetchGenMovies);
      parseMarkup(films);
      const id = await films[films.length - 1].id;
      const element = document.getElementById(`${id}`);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      if (films.length < 20) {
        loadMoreBtn.style.display = 'none';
        alert({
          text: 'No more photos were found for this request!',
          stack: myStack,
        });
      }
    })();
  }
}

const loadMoreBtn = document.querySelector('.js-btn-load-more');
loadMoreBtn.addEventListener('click', onLoadMore);

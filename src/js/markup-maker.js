import createFilmCard from '../templates/one-film-card.hbs';
import ApiServices from '../js/api-services.js';
import debounce from 'lodash.debounce';
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
  firstpos1: 5,
  firstpos2: 5,
  push: 'bottom',
  context: document.body,
});

const filmsContainer = document.querySelector('.film-list');
const searchInput = document.querySelector('.form-text');
const loadMoreBtn = document.querySelector('.header-button');
// loadMoreBtn.addEventListener('click', onLoadMore);
searchInput.addEventListener('input', debounce(inputHandler, 1000));

const filmApiServices = new ApiServices();

function parseMarkup(films) {
  filmsContainer.insertAdjacentHTML('beforeend', createFilmCard(films));
}

async function loadPopFilms() {
  const films = await filmApiServices.fetchPopularMovies();
  filmsContainer.innerHTML = '';
  parseMarkup(films);
}
loadPopFilms();

let query;

function inputHandler(e) {
  query = e.target.value;
  filmApiServices.clearRes();
  if (query === '') {
    filmsContainer.innerHTML = '';
    loadPopFilms();
  }

  filmApiServices.currentQuery = query;

  if (query) {
    (async () => {
      const films = await filmApiServices.fetchFindMovies();
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

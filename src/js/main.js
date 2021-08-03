import refs from './refs.js';
import createFilmCard from '../templates/one-film-card.hbs';
import ApiServices from './api-services.js';
import onOpenModalFilmCard from './modal-film-card';
import { onCreateTrailer } from './trailer.js';
import { showStackTopLeft as showNotice } from './error-message.js';

const apiServices = new ApiServices();

loadPopularMovies();

function onLoadHomePage () {
  refs.headerForm.classList.remove('visually-hidden');
  refs.headerButtons.classList.add('visually-hidden');

  refs.homeLink.classList.add('current-link');
  refs.libraryLink.classList.remove('current-link');

  refs.headerForm.reset();
  clearMoviesList();
  apiServices.resetPage();
  loadPopularMovies();
}

function parseMarkup(films) {
  refs.filmsList.insertAdjacentHTML('beforeend', createFilmCard(films));
  onCreateTrailer(document.querySelectorAll('.btn-trailer'));
}

function searchMovies(event) {

  event.preventDefault();
  const search = event.target.value.trim()
//   const search = event.currentTarget.elements.query.value.trim()

  apiServices.currentQuery = search;

  if (apiServices.currentQuery === '') {
    clearMoviesList();
    apiServices.resetPage();
    loadPopularMovies();

    return;
  }

  clearMoviesList();
  apiServices.resetPage();
  showOrHideBtn();
  fetchSearchMovies();
}

async function fetchSearchMovies() {
  const findMovies = await apiServices.fetchFindMovies();
  const fetchGenres = await apiServices.fetchGenreMovies();
  const { results, totalResults, newResults } = findMovies;

  if (totalResults === 0) {
    showNotice('error');
    clearMoviesList();
    return;
  } else if (totalResults < 20) {
    showNotice('info');
    showOrHideBtn(newResults);
  }

  const movies = createMovies(results, fetchGenres);
  parseMarkup(movies);
}

async function loadPopularMovies() {
  const fetchPopMovies = await apiServices.fetchPopularMovies();
  const fetchGenres = await apiServices.fetchGenreMovies();
  const { results, totalResults, newResults } = fetchPopMovies;

  if (totalResults === 0) {
    showNotice('error');
    clearMoviesList();
    return;
  } else {
    showOrHideBtn(newResults);
  }
  
  const movies = createMovies(results, fetchGenres);
  parseMarkup(movies);
}

function showOrHideBtn(number) {
  if (number > 20) {
    refs.loadMoreBtn.classList.remove('visually-hidden');
    return;
  }

  refs.loadMoreBtn.classList.add('visually-hidden');
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

function clearMoviesList() {
  refs.filmsList.innerHTML = '';
}

//--------------------------------load more-------------------------------------------

function loadMoreMovies() {
  if (refs.searchInput.value.trim() === '') {
    loadPopularMovies();
    setTimeout(scrollToBottom, 1000);
  } else {
    fetchSearchMovies();
    setTimeout(scrollToBottom, 1000);
  }
}

function scrollToBottom() {
    refs.moviesContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

refs.homeLink.addEventListener('click', onLoadHomePage);
refs.logoLink.addEventListener('click', onLoadHomePage);

refs.filmsList.addEventListener('click', onOpenModalFilmCard);
refs.headerForm.addEventListener('submit', searchMovies);
refs.loadMoreBtn.addEventListener('click',loadMoreMovies);

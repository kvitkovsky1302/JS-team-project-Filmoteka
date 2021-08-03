import createFilmCard from '../templates/one-film-card.hbs';
import ApiServices from './api-services.js';
import debounce from 'lodash.debounce';
import onOpenModalFilmCard from './modal-film-card';
import { onCreateTrailer } from './trailer.js';
import { showError } from './error-message.js';

const filmsList = document.querySelector('.js-films-list');
const searchInput = document.querySelector('.form-text');
const headerForm = document.querySelector('.header-form');
filmsList.addEventListener('click', onOpenModalFilmCard);
searchInput.addEventListener('input', debounce(searchMovies, 800));
headerForm.addEventListener('keydown', headerFormIgnoreKeypressEnter);

const apiServices = new ApiServices();

loadPopularMovies();

function parseMarkup(films) {
  filmsList.insertAdjacentHTML('beforeend', createFilmCard(films));
  onCreateTrailer(document.querySelectorAll('.js-btn-trailer'));
}

function searchMovies (event) {
 
  const search = event.target.value.trim();

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
  const { results, totalResults, newResults } = findMovies;
  
  if (totalResults === 0) {
    showError();
    clearMoviesList();
    return;
  } else {
    showOrHideBtn(newResults);
  }

  console.log(totalResults);
  console.log(newResults);
    
  const fetchGenres = await apiServices.fetchGenreMovies();

  const movies = createMovies(results, fetchGenres);
  parseMarkup(movies);
}

async function loadPopularMovies() {
  const fetchPopMovies = await apiServices.fetchPopularMovies();
  const { results, totalResults, newResults } = fetchPopMovies;
  
  if (totalResults === 0) {
    showError();
    clearMoviesList();
    return;
  } else {
    showOrHideBtn(newResults);
  }
  
  console.log(totalResults);
  console.log(newResults);

  const fetchGenres = await apiServices.fetchGenreMovies();
  const movies = createMovies(results, fetchGenres);
  parseMarkup(movies);
}
   
function showOrHideBtn (number) {
    if (number > 20) {
      loadMoreBtn.classList.remove('visually-hidden');
      return;
    }

  loadMoreBtn.classList.add('visually-hidden');
  
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
  filmsList.innerHTML = '';
}

function headerFormIgnoreKeypressEnter(e) {
 
  if (e.keyCode === 13) {
    e.preventDefault();
    return;
  }
}

//--------------------------------load more-------------------------------------------

const loadMoreBtn = document.querySelector('.load-more-btn')
loadMoreBtn.addEventListener('click',loadMoreMovies)

function loadMoreMovies() {
  if (searchInput.value.trim() === "") {
    loadPopularMovies();
  } else {
    fetchSearchMovies();
  }
}



// import createFilmCard from '../templates/one-film-card.hbs';
// import ApiServices from './api-services.js';
// // import createModalCard from '../templates/modal-film-card.hbs';
// import debounce from 'lodash.debounce';
// import { onCreateTrailer } from './trailer.js';
// import { spinner } from './spinner.js';
// import { alert, error, info, defaults, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/Material.css';
// import '@pnotify/core/dist/PNotify.css';
// import 'material-design-icons/iconfont/material-icons.css';
// defaults.styling = 'material';
// defaults.icons = 'material';
// defaults.width = '100%';
// defaults.delay = '4000';

// const errQuery = new Stack({
//   dir1: 'up',
//   firstpos1: 250,
//   push: 'bottom',
//   modal: true,
//   maxOpen: Infinity,
// });

// const noMoreMovies = new Stack({
//   dir1: 'up',
//   firstpos1: 0,
//   spacing1: 0,
// });


// const foundAllMovies = new Stack({
//   modal: false,
//   dir1: 'down',
//   firstpos1: 0,
//   spacing1: 0,
//   push: 'top',
//   maxOpen: Infinity,
// });


// import onOpenModalFilmCard from './modal-film-card';

// const filmsList = document.querySelector('.js-films-list');
// const searchInput = document.querySelector('.form-text');
// const headerForm = document.querySelector('.header-form');
// filmsList.addEventListener('click', onOpenModalFilmCard);
// searchInput.addEventListener('input', debounce(inputHandler, 500));
// headerForm.addEventListener('keydown', headerFormIgnoreKeypressEnter);

// const apiServices = new ApiServices();

// function parseMarkup(films) {
//   spinner.close();
//   filmsList.insertAdjacentHTML('beforeend', createFilmCard(films));
//   onCreateTrailer(document.querySelectorAll('.js-btn-trailer'));
// }

// function createMovies(returnedFetchMovies, returnedFetchGenres) {
//   spinner.show();
//   return returnedFetchMovies.map(movie => {
//     movie.year = movie.release_date ? movie.release_date.split('-')[0] : 'n/a';
//     if (movie.genre_ids.length > 0 && movie.genre_ids.length <= 3) {
//       movie.genres = movie.genre_ids
//         .map(id => returnedFetchGenres.filter(el => el.id === id))
//         .flat();
//     }
//     if (movie.genre_ids.length > 3) {
//       movie.genres = movie.genre_ids
//         .map(id => returnedFetchGenres.filter(el => el.id === id))
//         .slice(0, 2)
//         .flat()
//         .concat({ name: 'Other' });
//     }
//     if (movie.genre_ids.length === 0) {
//       movie.genres = [{ name: 'n/a' }];
//     }
//     return movie;
//   });
// }

// function loadPopFilms() {
//   (async () => {
//     const fetchPopMovies = await apiServices.fetchPopularMovies();
//     const fetchGenMovies = await apiServices.fetchGenreMovies();
//     const films = createMovies(fetchPopMovies, fetchGenMovies);
//     filmsList.innerHTML = '';
//     parseMarkup(films);
//   })();
// }
// loadPopFilms();

// let query;

// function inputHandler(e) {
 
//   query = e.target.value.trim();
//   apiServices.clearRes();
//   if (query === '') {
//     filmsList.innerHTML = '';
//     loadPopFilms();
//   }
//   apiServices.currentQuery = query;
//   if (query) {
//     (async () => {
//       const fetchFindMovies = await apiServices.fetchFindMovies();
//       const fetchGenMovies = await apiServices.fetchGenreMovies();
//       const films = createMovies(fetchFindMovies, fetchGenMovies);
//      // console.log(films);
//       filmsList.innerHTML = '';
//       parseMarkup(films);
//       if (films.length === 0) {
//         error({
//           text: 'Search result not successful. Enter the correct movie name!',
//           stack: errQuery,
//         });
//       }
//       if (films.length === 20) {
//         loadMoreBtn.style.display = 'block';
//       }
//       if (films.length < 20 && films.length !== 0) {
//         loadMoreBtn.style.display = 'none';
//         alert({
//           text: 'Found all movies for the current query!',
//           stack: foundAllMovies,
//         });
//       }
//     })();
//   }
// }


// function headerFormIgnoreKeypressEnter(e) {
 
//   if (e.keyCode === 13) {
//     e.preventDefault();
//     return;
//   }
// }
// //-------------------------------------------load more-------------------------------------------

// function onLoadMore() {
//   if (query) {
//     (async () => {
//       const fetchFindMovies = await apiServices.fetchFindMovies();
//       const fetchGenMovies = await apiServices.fetchGenreMovies();
//       const films = createMovies(fetchFindMovies, fetchGenMovies);
//       parseMarkup(films);
//       const id = await films[films.length - 1].id;
//       const element = document.getElementById(`${id}`);
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end',
//       });
//       if (films.length < 20) {
//         loadMoreBtn.style.display = 'none';
//         alert({
//           text: 'No more movies found for the current query!',
//           stack: noMoreMovies,
//         });
//       }
//     })();
//   }

//   if (!query) {
//     (async () => {
//       const fetchPopMovies = await apiServices.fetchPopularMovies();
//       const fetchGenMovies = await apiServices.fetchGenreMovies();
//       const films = createMovies(fetchPopMovies, fetchGenMovies);
//       parseMarkup(films);
//       const id = await films[films.length - 1].id;
//       const element = document.getElementById(`${id}`);
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end',
//       });
//     })();
//   }
// }

// const loadMoreBtn = document.querySelector('.js-load-more-btn');
// loadMoreBtn.addEventListener('click', onLoadMore);

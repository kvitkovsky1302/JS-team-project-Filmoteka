import ApiServices from './api-services.js';
import createModalCard from '../templates/modal-film-card.hbs';
const apiServices = new ApiServices();
import * as basicLightbox from 'basiclightbox';


const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];

let instance;
let modalFilm;
let btnAddToWatched;
let btnAddToQueue;
let closeBtn;
let detailMovie;

export default function onOpenModalFilmCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  apiServices.movieId = e.target.parentNode.parentNode.id;
  (async () => {
    await craeteDetailMovieObj();

    const markupModalCard = createModalCard(detailMovie);

    instance = basicLightbox.create(markupModalCard);
    instance.show();
    
    modalFilm = document.querySelector('.modal-film');
    closeBtn = document.querySelector('.js-modal-close-btn');
    btnAddToWatched = document.querySelector('.js-button-watched');
    btnAddToQueue = document.querySelector('.js-button-queue');

    if (watchedFilmsIds.includes(e.target.parentNode.parentNode.id)) {
      btnAddToWatched.textContent = "remove from watched";
    }

    if (queueFilmsIds.includes(e.target.parentNode.parentNode.id)) {
      btnAddToQueue.textContent = "remove from queue";
    }
    
    closeBtn.addEventListener('click', onCloseModalFilmCard);
    modalFilm.addEventListener('click', addOrRemoveMovieFromLocalStorage);

  })();

  window.addEventListener('keydown', onCloseModalFilmCard);
}

function onCloseModalFilmCard(e) {
  if (e.code === 'Escape' || e.currentTarget.classList.contains('js-modal-close-btn')) {
    instance.close();
    window.removeEventListener('keydown', onCloseModalFilmCard);
    modalFilm.removeEventListener('click', addOrRemoveMovieFromLocalStorage);
  }
}

async function craeteDetailMovieObj() {
  detailMovie = await apiServices.fetchDetailedMovie();
    detailMovie.year = detailMovie.release_date ? detailMovie.release_date.split('-')[0] : 'n/a';

    if (detailMovie.genres.length > 3) {
      detailMovie.genres = detailMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }
  return detailMovie;
}

//------------------------------------------local storage----------------------------------------------------


function addOrRemoveMovieFromLocalStorage(e) {

  if (e.target.classList.contains('js-button-watched')) {

    if (!watchedFilmsIds.includes(e.currentTarget.id)) {
      watchedFilmsIds.push({detailMovie});
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
      e.target.textContent = "remove from watched";
      // window.location.reload();
    } else {
      watchedFilmsIds.splice(watchedFilmsIds.indexOf(e.currentTarget.id), 1);
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
      e.target.textContent = "add to watched";
      // window.location.reload();
    }    
  }

  if (e.target.classList.contains('js-button-queue')) {

    if (!queueFilmsIds.includes(e.currentTarget.id)) {
      queueFilmsIds.push({detailMovie});
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
      e.target.textContent = "remove from queue";
      // window.location.reload();
    } else {
      queueFilmsIds.splice(queueFilmsIds.indexOf(e.currentTarget.id), 1);
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
      e.target.textContent = "add to queue";
      // window.location.reload();
    }
  }
}


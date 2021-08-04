import ApiServices from './api-services.js';
import createModalCard from '../templates/modal-film-card.hbs';
const apiServices = new ApiServices();
import * as basicLightbox from 'basiclightbox';


const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];
const arrWatchedFilmsIds = JSON.parse(localStorage.getItem('arrWatchedFilmsIds')) || [];
const arrQueueFilmsIds = JSON.parse(localStorage.getItem('arrQueueFilmsIds')) || [];

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

    if (arrWatchedFilmsIds.includes(+e.target.parentNode.parentNode.id)) {
      btnAddToWatched.textContent = "remove from watched";
    }

    if (arrQueueFilmsIds.includes(+e.target.parentNode.parentNode.id)) {
      btnAddToQueue.textContent = "remove from queue";
    }
    
    closeBtn.addEventListener('click', onCloseModalFilmCard);
    modalFilm.addEventListener('click', addOrRemoveMovieFromLocalStorage);

  })();

  window.addEventListener('keydown', onCloseModalFilmCard);
}

function onCloseModalFilmCard(e) {
  if (e.code !== 'Escape' && !e.target?.classList.contains('close')) {
    return;
  }
  instance.close();
  window.removeEventListener('keydown', onCloseModalFilmCard);
  modalFilm.removeEventListener('click', addOrRemoveMovieFromLocalStorage);
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

    if (!arrWatchedFilmsIds.includes(+e.currentTarget.id)) {
      arrWatchedFilmsIds.push(detailMovie.id);
      watchedFilmsIds.push(detailMovie);
      localStorage.setItem('arrWatchedFilmsIds', JSON.stringify(arrWatchedFilmsIds))
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
      e.target.textContent = "remove from watched";
    } else {
      watchedFilmsIds.forEach((el, ind) => {
        if (el.id === +e.currentTarget.id) {
          watchedFilmsIds.splice(ind, 1);
        }
      });

      arrWatchedFilmsIds.splice(arrWatchedFilmsIds.indexOf(+e.currentTarget.id), 1);
      localStorage.setItem('arrWatchedFilmsIds', JSON.stringify(arrWatchedFilmsIds))
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
      e.target.textContent = "add to watched";
    }
  }

  if (e.target.classList.contains('js-button-queue')) {

    if (!arrQueueFilmsIds.includes(+e.currentTarget.id)) {
      arrQueueFilmsIds.push(detailMovie.id);
      queueFilmsIds.push(detailMovie);
      localStorage.setItem('arrQueueFilmsIds', JSON.stringify(arrQueueFilmsIds));
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
      e.target.textContent = "remove from queue";
    } else {
      queueFilmsIds.forEach((el, ind) => {
        if (el.id === +e.currentTarget.id) {
          queueFilmsIds.splice(ind, 1)
        }
      });

      arrQueueFilmsIds.splice(arrQueueFilmsIds.indexOf(+e.currentTarget.id), 1);
      localStorage.setItem('arrQueueFilmsIds', JSON.stringify(arrQueueFilmsIds));
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
      e.target.textContent = "add to queue";
    }
  }
}
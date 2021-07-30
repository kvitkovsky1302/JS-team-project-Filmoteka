import ApiServices from './api-services.js';
import createModalCard from '../templates/modal-film-card.hbs';
const apiServices = new ApiServices();
import * as basicLightbox from 'basiclightbox';

let instance;
let modalFilm;

export default function onOpenModalFilmCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  apiServices.movieId = e.target.parentNode.parentNode.id;
  (async () => {
    const detailMovie = await apiServices.fetchDetailedMovie();
    detailMovie.year = detailMovie.release_date ? detailMovie.release_date.split('-')[0] : 'n/a';

    if (detailMovie.genres.length > 3) {
      detailMovie.genres = detailMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }

    const markupModalCard = createModalCard(detailMovie);

    instance = basicLightbox.create(markupModalCard);
    instance.show();
    modalFilm = document.querySelector('.modal-film');
    modalFilm.addEventListener('click', onAddFilmToLocalStorage);
  })();

  window.addEventListener('keydown', onCloseModalFilmCard);
}

function onCloseModalFilmCard(e) {
  if (e.code === 'Escape') {
    instance.close();
    window.removeEventListener('keydown', onCloseModalFilmCard);
    modalFilm.removeEventListener('click', onAddFilmToLocalStorage);
  }
}

//------------------------------------------local storage----------------------------------------------------

const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];
function onAddFilmToLocalStorage(e) {
  if (e.target.classList.contains('js-button-watched')) {
    if (!watchedFilmsIds.includes(e.currentTarget.id)) {
      watchedFilmsIds.push(e.currentTarget.id);
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
      window.location.reload();
    }
    if (queueFilmsIds.includes(e.currentTarget.id)) {
      queueFilmsIds.splice(queueFilmsIds.indexOf(e.currentTarget.id), 1);
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
    }
  }

  if (e.target.classList.contains('js-button-queue')) {
    if (!queueFilmsIds.includes(e.currentTarget.id)) {
      queueFilmsIds.push(e.currentTarget.id);
      localStorage.setItem('queueFilmsIds', JSON.stringify(queueFilmsIds));
      window.location.reload();
    }
    if (watchedFilmsIds.includes(e.currentTarget.id)) {
      watchedFilmsIds.splice(watchedFilmsIds.indexOf(e.currentTarget.id), 1);
      localStorage.setItem('watchedFilmsIds', JSON.stringify(watchedFilmsIds));
    }
  }
}

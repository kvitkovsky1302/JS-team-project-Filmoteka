import ApiServices from './api-services.js';
const apiServices = new ApiServices();

let instance;
let modalFilm;

export function onOpenModalFilmCard(e) {
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

export function onCloseModalFilmCard(e) {
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

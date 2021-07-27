import ApiServices from '../js/api-services.js';
import createModalCardTmpl from '../templates/modal-film-card.hbs'
import createFilmCard from '../templates/film-card-library.hbs';
import * as basicLightbox from 'basiclightbox';


const refs = {
    filmsList: document.querySelector('.js-films-list'),
    libraryList: document.querySelector('.js-library-list'),
}

const filmsId = {
    idWachedFilm: [],
    idQueueFilm: [],
}

const apiServices = new ApiServices();

refs.filmsList.addEventListener('click', onOpenModalCard);
refs.libraryList.addEventListener('click', onOpenModalCard);


async function onOpenModalCard(e) {
    apiServices.movieId = e.target.parentNode.parentNode.id;
    const film = await apiServices.fetchDetailedMovie();
    const markupModalCard = createModalCardTmpl(film);
    
    const instance = basicLightbox.create(markupModalCard);

    instance.show();

    const modalFilm = document.querySelector('.modal-film');

    modalFilm.addEventListener('click', onAddFilmToLocalStorage);


    window.addEventListener('keydown', onCloseModal);

    function onCloseModal(e) {
        if (e.code === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onCloseModal)
        };
    };
}

function onAddFilmToLocalStorage(e) {
    const addToWachedBtn = document.querySelector('.js-wached');
    const addToQueueBtn = document.querySelector('.js-queue');
    
        if (e.target === addToWachedBtn) {
            filmsId.idWachedFilm.push(e.currentTarget.id);
            localStorage.setItem('wachedFilms', JSON.stringify(filmsId.idWachedFilm));
        }
        
        if (e.target === addToQueueBtn) {
            filmsId.idQueueFilm.push(e.currentTarget.id);
            localStorage.setItem('queueFilms', JSON.stringify(filmsId.idQueueFilm));
        }
}

const parseFilms = JSON.parse(localStorage.getItem('wachedFilms'));
if (parseFilms) {
    
    parseFilms.forEach(loadWachedFilm);
}

async function loadWachedFilm(element) {
    apiServices.movieId = element;
  const films = await apiServices.fetchDetailedMovie();
  parseMarkup(films);
};

function parseMarkup(films) {
  refs.libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
}
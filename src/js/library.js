import refs from './refs.js';
import createFilmCard from '../templates/film-card-library.hbs';
import { onCreateTrailer } from './trailer.js';
refs.libraryLink.addEventListener('click', onLoadLibraryPage);


function onLoadLibraryPage () {
    refs.headerForm.classList.add('visually-hidden');
    refs.headerButtons.classList.remove('visually-hidden');
    refs.homeLink.classList.remove('current-link');
    refs.libraryLink.classList.add('current-link');
    refs.loadMoreBtn.classList.add('visually-hidden');

    refs.filmsList.innerHTML = '';

    const libraryList = document.querySelector('.js-films-list');
    const btnLibWatched = document.querySelector('.js-button-library-watched');
    const btnLibQueue = document.querySelector('.js-button-library-queue');

    const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));
    const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));

    btnLibWatched.addEventListener('click', () => parseWatchedFilmsMarkup());
    btnLibQueue.addEventListener('click', () => parseQueueFilmsMarkup());

    function parseWatchedFilmsMarkup() {
        
    if (parsedWatchedFilmsIds) {
        libraryList.innerHTML = '';
        btnLibWatched.classList.add('focus');
        btnLibQueue.classList.remove('focus');
        parsedWatchedFilmsIds.forEach(el => parseOneCardMarkup(el.detailMovie));
        onCreateTrailer(document.querySelectorAll('.btn-trailer'));
    } else return;
    }

    function parseQueueFilmsMarkup() {
    
    if (parsedQueueFilmsIds) {
        libraryList.innerHTML = '';
        btnLibWatched.classList.remove('focus');
        btnLibQueue.classList.add('focus');
        parsedQueueFilmsIds.forEach(el => parseOneCardMarkup(el.detailMovie));
        onCreateTrailer(document.querySelectorAll('.btn-trailer'));
    } else return;
    }

    function parseOneCardMarkup(films) {
    libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
    }

    parseWatchedFilmsMarkup();
    

};


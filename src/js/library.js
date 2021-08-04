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
        libraryList.innerHTML = '';        
        libraryWatchedLocalStorage();
            
        if (parsedWatchedFilmsIds ) {
            
            btnLibWatched.classList.add('focus');
            btnLibQueue.classList.remove('focus');
            parsedWatchedFilmsIds.forEach(el => parseOneCardMarkup(el));
            onCreateTrailer(document.querySelectorAll('.btn-trailer'));
            
        } else return;
    }

    function parseQueueFilmsMarkup() {
        libraryList.innerHTML = '';
        libraryQueueLocalStorage();
                
        if (parsedQueueFilmsIds ) {
            
            btnLibWatched.classList.remove('focus');
            btnLibQueue.classList.add('focus');
            parsedQueueFilmsIds.forEach(el => parseOneCardMarkup(el));
            onCreateTrailer(document.querySelectorAll('.btn-trailer'));
            
        } else return;
    }

    function parseOneCardMarkup(films) {
        libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
    }

    parseWatchedFilmsMarkup();
    libraryWatchedLocalStorage();
    
    function libraryWatchedLocalStorage() {

        const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));

        if (localStorage.getItem('watchedFilmsIds') === null || parsedWatchedFilmsIds.length === 0) {
            refs.libraryBackgrounImage.classList.remove('visually-hidden');
            refs.libraryBackgrounImage.classList.add('background-image-watched');
        }

        refs.libraryBackgrounImage.classList.remove('background-image-queue');
    }

    function libraryQueueLocalStorage() {

        const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));
        
        if (localStorage.getItem('queueFilmsIds') === null || parsedQueueFilmsIds.length === 0) {
            refs.libraryBackgrounImage.classList.remove('visually-hidden');
            refs.libraryBackgrounImage.classList.add('background-image-queue');
        }

        refs.libraryBackgrounImage.classList.remove('background-image-watched');
    }
};


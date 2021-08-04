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

    const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));
    const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));

    refs.btnLibWatched.addEventListener('click', () => parseWatchedFilmsMarkup());
    refs.btnLibQueue.addEventListener('click', () => parseQueueFilmsMarkup());

    function parseWatchedFilmsMarkup() {
        refs.libraryList.innerHTML = '';        
        libraryWatchedLocalStorage();
            
        if (parsedWatchedFilmsIds ) {
            
            refs.btnLibWatched.classList.add('focus');
            refs.btnLibQueue.classList.remove('focus');
            parsedWatchedFilmsIds.forEach(el => parseOneCardMarkup(el));
            onCreateTrailer(document.querySelectorAll('.btn-trailer'));
            
        } else return;
    }

    function parseQueueFilmsMarkup() {
        refs.libraryList.innerHTML = '';
        libraryQueueLocalStorage();
                
        if (parsedQueueFilmsIds ) {
            
            refs.btnLibWatched.classList.remove('focus');
            refs.btnLibQueue.classList.add('focus');
            parsedQueueFilmsIds.forEach(el => parseOneCardMarkup(el));
            onCreateTrailer(document.querySelectorAll('.btn-trailer'));
            
        } else return;
    }

    function parseOneCardMarkup(films) {
        refs.libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
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


import refs from './refs.js';
import createFilmCard from '../templates/film-card-library.hbs';
import { onCreateTrailer } from './trailer.js';

function parseWatchedFilmsMarkup() {
    refs.libraryList.innerHTML = '';        
    libraryWatchedLocalStorage();
    const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));
    refs.btnLibWatched.classList.add('focus');
    refs.btnLibQueue.classList.remove('focus');
        
    if (parsedWatchedFilmsIds ) {
        parsedWatchedFilmsIds.forEach(el => parseOneCardMarkup(el));
        onCreateTrailer(document.querySelectorAll('.btn-trailer'));
        
    } else return;
}

function parseQueueFilmsMarkup() {
    refs.libraryList.innerHTML = '';
    libraryQueueLocalStorage();
    const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));
    refs.btnLibWatched.classList.remove('focus');
    refs.btnLibQueue.classList.add('focus');
    if (parsedQueueFilmsIds ) {
        parsedQueueFilmsIds.forEach(el => parseOneCardMarkup(el));
        onCreateTrailer(document.querySelectorAll('.btn-trailer'));
        
    } else return;
}

function parseOneCardMarkup(films) {
    refs.libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
}

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

export { parseWatchedFilmsMarkup, parseQueueFilmsMarkup };
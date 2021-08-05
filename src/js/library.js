import refs from './refs.js';
import { parseWatchedFilmsMarkup, parseQueueFilmsMarkup } from './libraryMarkup.js';


function onLoadLibraryPage () {
    refs.headerForm.classList.add('visually-hidden');
    refs.headerButtons.classList.remove('visually-hidden');
    refs.homeLink.classList.remove('current-link');
    refs.libraryLink.classList.add('current-link');
    refs.loadMoreBtn.classList.add('visually-hidden');
    refs.libHeader.classList.add('lib-header-container');

    refs.filmsList.innerHTML = '';

    parseWatchedFilmsMarkup();
};

refs.libraryLink.addEventListener('click', onLoadLibraryPage);
refs.btnLibWatched.addEventListener('click', () => parseWatchedFilmsMarkup());
refs.btnLibQueue.addEventListener('click', () => parseQueueFilmsMarkup());


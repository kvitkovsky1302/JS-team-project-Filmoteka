import refs from './refs.js';


refs.libraryLink.addEventListener('click', onLoadLibraryPage);

function onLoadLibraryPage () {
    refs.headerForm.classList.add('visually-hidden');
    refs.headerButtons.classList.remove('visually-hidden');

    refs.homeLink.classList.remove('current-link');
    refs.libraryLink.classList.add('current-link');

    refs.loadMoreBtn.classList.add('visually-hidden');

    refs.mainWrapper.innerHTML = '';
};



import ApiServices from '../js/api-services.js';
import createModalCardTmpl from '../templates/modal-film-card.hbs'
import * as basicLightbox from 'basiclightbox';


const refs = {
    filmsList: document.querySelector('.films-list'),
}

refs.filmsList.addEventListener('click', onOpenModalCard);

const apiServices = new ApiServices();

async function onOpenModalCard(e) {
    apiServices.movieId = e.target.parentNode.parentNode.id;
    const film = await apiServices.fetchDetailedMovie();
    const markupModalCard = createModalCardTmpl(film);
    
    const instance = basicLightbox.create(markupModalCard);

    instance.show();

    window.addEventListener('keydown', onCloseModal);

    function onCloseModal(e) {
        if (e.code === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onCloseModal)
        };
    };
}
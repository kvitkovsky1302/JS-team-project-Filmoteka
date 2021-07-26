import './sass/main.scss';


const refs = {
    studentGoit: document.querySelector('.dev__link'),
    backdrop: document.querySelector('[data-modal]'),
    modal: document.querySelector('.modal-students'),

}

refs.studentGoit.addEventListener('click', onToggleModal);
refs.backdrop.addEventListener('click', onToggleModal);



function onToggleModal(e) {
    refs.backdrop.classList.toggle('is-hidden');
    window.addEventListener('keydown', onCloseModal);
    refs.modal.addEventListener('click', stopPropagation);
}

function onCloseModal(e) {
    if (e.key === "Escape") {
        refs.backdrop.classList.add('is-hidden');
        window.removeEventListener('keydown', onCloseModal);
        refs.modal.removeEventListener('click', stopPropagation);
    }
}

function stopPropagation(e) {
    e.stopPropagation();
}

import students from './studentsData.json';
import studentsTemplate from '../templates/students-modal.hbs';
import * as basicLightbox from 'basiclightbox';


const refs = {
    studentGoit: document.querySelector('.dev__link'),
    backdrop: document.querySelector('[data-modal]'),
    modal: document.querySelector('.modal-students'),
}

const markupStudentsModal = studentsTemplate(students);
const instance = basicLightbox.create(markupStudentsModal);

refs.studentGoit.addEventListener('click', onOpenModal);
// refs.backdrop.addEventListener('click', onToggleModal);

function onOpenModal() {
    // refs.studentGoit.insertAdjacentHTML('beforeend', markupStudentsModal);
    instance.show()
}


// function onToggleModal(e) {
//     refs.backdrop.classList.toggle('is-hidden');
//     window.addEventListener('keydown', onCloseModal);
//     refs.modal.addEventListener('click', stopPropagation);
// }

// function onCloseModal(e) {
//     if (e.key === "Escape") {
//         refs.backdrop.classList.add('is-hidden');
//         window.removeEventListener('keydown', onCloseModal);
//         refs.modal.removeEventListener('click', stopPropagation);
//     }
// }

// function stopPropagation(e) {
//     e.stopPropagation();
// }
//функция открытия модального окна
export function openModal (popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('click', closeOverlay);
    document.addEventListener('click', closeX);
};

//функция закрытия модального окна (МО)
export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('click', closeOverlay);
    document.removeEventListener('click', closeX);
};

//функция закрытия МО по ESC
 function closeModalEsc (popup) {
    if (popup.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'))
    }
};

//функция закрытия МО через overlay
 function closeOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
};

//функция закрытия МО на крестик
 function closeX (evt) {
    if (evt.target.classList.contains('popup__close')){
      closeModal(document.querySelector('.popup_is-opened'));
    }};

  
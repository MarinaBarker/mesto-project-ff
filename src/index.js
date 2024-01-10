import './pages/index.css';
import {initialCards} from './components/card.js';
import {createCards, deleteCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list'); //список карточек

//кнопки
const editProfileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const createCardButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
//const closePopup = document.querySelectorAll('.popup__close'); //закрытие попапа

//попапы
const editPopup = document.querySelector('.popup_type_edit'); //попап редактирование профиля
const createCardPopup = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
export const popupImageFull = document.querySelector('.popup_type_image'); //попап фуллскрин

//наполнение карточки
export const popupImage = document.querySelector('.popup__image'); //фото
export const popupCaption = document.querySelector('.popup__caption'); //описание 

//профиль
const formElement = document.querySelector('.popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); //поля имени
const jobInput = document.querySelector('.popup__input_type_description'); //поля деятельности
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

//создание новых карточек
const formPopup = document.querySelector('.popup_type_new-card .popup__form');
const typeName = formPopup.querySelector('.popup__input_type_card-name');
const typeLink = formPopup.querySelector('.popup__input_type_url');
 

// @todo: Вывести карточки на страницу
  initialCards.forEach(function(element) {
  placesList.append(createCards(element.name, element.link, deleteCard));
 });

//слушатель события открытия модального окна редактирования профиля
  editProfileButton.addEventListener('click', function() {
  openModal(editPopup);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

//изменение формы 
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(document.querySelector('.popup_is-opened'));
};
}); 

//слушатель события открытия формы добавления новой карточки
 createCardButton.addEventListener('click', function () {
  openModal(createCardPopup);

  formPopup.addEventListener('submit', function (evt){
   evt.preventDefault();
    const nameValue = typeName.value;
    const linkValue = typeLink.value;
    const newCard = createCards(nameValue, linkValue, deleteCard);
    placesList.prepend(newCard);
    formPopup.reset();
    closeModal(document.querySelector('.popup_is-opened'));
  });
});

  //лайк 
  placesList.addEventListener('click', function(evt){
    if(evt.target.classList.contains('card__like-button')){
      evt.target.classList.toggle('card__like-button_is-active');
    }});
import { openModal } from "./modal";
import {popupImage, popupImageFull, popupCaption, placesList} from '../index.js';


export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
export function createCards(name, link, del) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  cards.querySelector('.card__image').src = link;
  cards.querySelector('.card__image').alt = name;
  cards.querySelector('.card__title').textContent = name;
  deleteButton.addEventListener('click', del);
  cards.querySelector('.card__image').addEventListener('click', function() {
  openImage(name, link)});
  return cards;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}
 
//функция открытия карточки фуллскрин
function openImage(name, link) {
  popupImage.src = link;
  popupCaption.textContent = name;
  openModal(popupImageFull);
}

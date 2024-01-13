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

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
//Функция создания карточки
export function createCards(name, link, del, openImage, like) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  const likeButton = cards.querySelector('.card__like-button');
  const cardImg = cards.querySelector('.card__image');

  cards.querySelector('.card__image').src = link;
  cards.querySelector('.card__image').alt = name;
  cards.querySelector('.card__title').textContent = name;
  
  deleteButton.addEventListener('click', del);
  likeButton.addEventListener('click', like);
  cardImg.addEventListener('click', function() {
    openImage(name, link)});
  return cards; 
};

//Функция удаления карточки
export function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};
 
//Функция лайка
export function like (evt) {
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
}};

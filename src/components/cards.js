import { removeCard, putLike, deleteLike } from "./api";


const cardTemplate = document.querySelector('#card-template').content;
//Функция создания карточки
export function createCards(cardData, deleteCard, like, openImage, userId) {  //card, cardId, userInfo, name, link, deleteCard, openImage, like
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const counterLike = cardElement.querySelector('.card__like-counter');
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const isLikedByUser = cardData.likes.some((like) => like._id === userId);


  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  counterLike.textContent = cardData.likes.length;
  
  //скрываем кнопку удаления у чужих карточек
  if(cardData.owner._id !== userId) {  
    deleteButton.remove();
  }

  //удаляем карточку
  if (deleteCard) {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardData._id, cardElement);
    });
  }

  // ставим лайк
  if (like) {
    likeButton.addEventListener('click', function() {
      like(cardData._id, counterLike, likeButton);
    });
  }
  
  // показывает мои лайки
  if (isLikedByUser) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //открываем картинку fullscreen
  if (openImage) {
   cardImg.addEventListener('click', function() {
      openImage (cardData);
    });
  }

  return cardElement; 
};

// Функция переключения лайка
export function changeLike(cardId, counterLike, likeButton) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    deleteLike(cardId)
    .then((updatedCard) => {
      counterLike.textContent = updatedCard.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  } else {
    putLike(cardId)
    .then((updatedCard) => {
      counterLike.textContent = updatedCard.likes.length;
      likeButton.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }
;}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  removeCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
};
 

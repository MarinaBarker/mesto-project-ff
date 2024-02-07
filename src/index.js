import './pages/index.css';
import {createCards, deleteCard, changeLike} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, validationConfig, clearValidation, profileForm, newPlaceForm} from './components/validation.js';
import {getCards, getUserInfo, changeUserInfo, addNewCard, changeUserAvatar} from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list'); //список карточек
//кнопки
const editProfileButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const createCardButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const submitButton = profileForm.querySelector('.popup__button');
const avatarEditButton = document.querySelector('.avatar__edit-button'); //кнопка обновления аватара
//попапы
const editPopup = document.querySelector('.popup_type_edit'); //попап редактирование профиля
const createCardPopup = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
const popupImageFull = document.querySelector('.popup_type_image'); //попап фуллскрин
const editAvatar = document.querySelector('.popup_avatar_image'); //попап аватара
const avatarForm = document.forms['new_avatar'];
const avatarLink = avatarForm.querySelector('.popup__input_type_avatar');
const submitAvatarButton = avatarForm.querySelector('.popup__button');
//наполнение карточки
const popupImage = document.querySelector('.popup__image'); //фото
const popupCaption = document.querySelector('.popup__caption'); //описание 
//профиль
const form = document.querySelector('.popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); //поля имени
const jobInput = document.querySelector('.popup__input_type_description'); //поля деятельности
const profileName = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');
//создание новых карточек
const formPopup = document.querySelector('.popup_type_new-card .popup__form');
const typeName = formPopup.querySelector('.popup__input_type_card-name');
const typeLink = formPopup.querySelector('.popup__input_type_url');
const submitCardButton = newPlaceForm.querySelector('.popup__button');

//визуализация загрузки
function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
};

//Получить информацию о пользователе с сервера
getUserInfo()
.then((res) => console.log(res))
.catch((err) => console.log("Ошибка"));

//Вывести карточки на страницу с сервера
getCards()
.then((res) => console.log(res))
.catch((err) => console.log("Ошибка"));

let userId;

Promise.all([getUserInfo(), getCards()])
.then(([userData, cardId]) => {
  profileName.textContent = userData.name;
  job.textContent = userData.about;
  avatar.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id;

  cardId.forEach((cardData) => {
    placesList.append(createCards(cardData, deleteCard, changeLikeHandler,openImage, userId));
    console.log('Промисы исполнены')
})
})
.catch((err) => console.log("Ошибка")
);

// открытие окна редактирования аватара
avatarEditButton.addEventListener('click', function() {
  clearValidation(avatarForm, validationConfig);
  openModal(editAvatar);
})

//изменение аватара
avatarForm.addEventListener('submit', avatarSubmit);
function avatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitAvatarButton);
  const link = {
    avatar: avatarLink.value
  }
  changeUserAvatar(link)
  .then(() => {
    avatar.style.backgroundImage = `url(${link.avatar})`;
    closeModal(document.querySelector('.popup_is-opened'));
    avatarForm.reset();
  })
  .catch((err) => console.log("Ошибка"))
  .finally(() => renderLoading(false, submitAvatarButton));
};

//открытие окна редактирования профиля
editProfileButton.addEventListener('click', function() {
  clearValidation(profileForm, validationConfig);
  openModal(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
});

//редактирование профиля
form.addEventListener('submit', handleFormSubmit);  
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitButton);
  changeUserInfo(nameInput, jobInput)
    .then(() => {
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(document.querySelector('.popup_is-opened'));
  })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButton));
};

//открытие окна добавления новой карточки
createCardButton.addEventListener('click', function () {
  clearValidation(newPlaceForm, validationConfig);
  openModal(createCardPopup); 
});

//добавление картинки
formPopup.addEventListener('submit', formSubmit);
  function formSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitCardButton);
    const newCardPic = {
      name: typeName.value,
      link: typeLink.value,
      likes: [],
      owner: {_id: userId,},
    };
  addNewCard(newCardPic.name, newCardPic.link)
    .then((res) => {
    newCardPic._id = res._id;
    const newCard = createCards(newCardPic, deleteCard, changeLike, openImage, userId,);
    placesList.prepend(newCard);
    formPopup.reset();
  closeModal(document.querySelector('.popup_is-opened'));
  })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitCardButton));
};


function changeLikeHandler(cardId, counterLike, likeButton) {
  changeLike(cardId, counterLike, likeButton);
};

//функция открытия карточки фуллскрин
function openImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupImageFull);
};

enableValidation(validationConfig);
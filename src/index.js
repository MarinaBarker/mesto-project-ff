import './pages/index.css';
import {createCards, deleteCard, changeLike} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, validationConfig, clearValidation} from './components/validation.js';
import {getCards, getUserInfo, changeUserInfo, addNewCard, changeUserAvatar} from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list'); //список карточек
//кнопки
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const buttonAddCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const avatarEditButton = document.querySelector('.avatar__edit-button'); //кнопка обновления аватара
//попапы
const editPopup = document.querySelector('.popup_type_edit'); //попап редактирование профиля
const popupCardCreate = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
const popupImageFull = document.querySelector('.popup_type_image'); //попап фуллскрин
const editAvatar = document.querySelector('.popup_avatar_image'); //попап аватара
const avatarForm = document.forms['new_avatar'];
const avatarLink = avatarForm.querySelector('.popup__input_type_avatar');
const avatarButtonSubmit = avatarForm.querySelector('.popup__button');
//формы
const profileForm = document.forms['edit_profile'];
const newPlaceForm = document.forms['new_place'];
const profileButtonSubmit = profileForm.querySelector('.popup__button');
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
const cardButtonSubmit = newPlaceForm.querySelector('.popup__button');

//визуализация загрузки
function renderLoading(isLoading, profileButtonSubmit) {
  if (isLoading) {
    profileButtonSubmit.textContent = 'Сохранение...';
  } else {
    profileButtonSubmit.textContent = 'Сохранить';
  }
};

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
avatarForm.addEventListener('submit', submitAvatar);
function submitAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, avatarButtonSubmit);
  const link = {
    avatar: avatarLink.value
  }
  changeUserAvatar(link)
  .then(() => {
    avatar.style.backgroundImage = `url(${link.avatar})`;
    closeModal(editAvatar);
    avatarForm.reset();
  })
  .catch((err) => console.log("Ошибка"))
  .finally(() => renderLoading(false, avatarButtonSubmit));
};

//открытие окна редактирования профиля
buttonOpenPopupProfile.addEventListener('click', function() {
  clearValidation(profileForm, validationConfig);
  openModal(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
});

//редактирование профиля
form.addEventListener('submit', submitEditProfile);  
function submitEditProfile(evt) {
  evt.preventDefault();
  renderLoading(true, profileButtonSubmit);
  changeUserInfo(nameInput, jobInput)
    .then(() => {
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(editPopup);
  })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, profileButtonSubmit));
};

//открытие окна добавления новой карточки
buttonAddCard.addEventListener('click', function () {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupCardCreate); 
});

//добавление картинки
formPopup.addEventListener('submit', submitAddCard);
  function submitAddCard(evt) {
  evt.preventDefault();
  renderLoading(true, cardButtonSubmit);
  const nameValue = typeName.value;
  const linkValue = typeLink.value;
  addNewCard(nameValue, linkValue)
    .then((cardData) => {
    const newCard = createCards(cardData, deleteCard, changeLike, openImage, userId,);
    placesList.prepend(newCard);
    formPopup.reset();
  closeModal(popupCardCreate);
  })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardButtonSubmit));
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
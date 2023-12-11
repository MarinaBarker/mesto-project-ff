// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCards(name, link, del) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cards.querySelector('.card__delete-button');
    cards.querySelector('.card__image').src = link;
    cards.querySelector('.card__image').alt = name;
    cards.querySelector('.card__title').textContent = name;
    deleteButton.addEventListener('click', del);
    return cards;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const listItem = evt.target.closest('.card');
    listItem.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
 placesList.append(createCards(element.name, element.link, deleteCard));
})
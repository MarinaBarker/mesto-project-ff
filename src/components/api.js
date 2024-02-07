const config = {
    baseUrl:'https://nomoreparties.co/v1/wff-cohort-5', 
    headers: {
    authorization: '36e04729-8dc6-44b9-aa68-d536d24b00db',
    'Content-type': 'application/json',
  }
};

 // проверка на ошибки при отправке запроса на сервер
const checkError = (res) => {
    if (res.ok) {
        return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);  
};

 // загрузка данных профиля с сервера
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(res => checkError(res));
};

 // загрузка карточек с сервера
export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
})
  .then(res => checkError(res));
};

// редактирование данных профиля
export const changeUserInfo = (nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
      .then(res => checkError(res));
  };

 // добавление новой карточки на сервер
 export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
        link
      }),
    })
      .then(res => checkError(res));
  };

  // Удаление карточки
  export const removeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(res => checkError(res));
  };

  // поставить лайк
  export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(res => checkError(res));
  };

  //убрать лайк
  export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(res => checkError(res));
  };

  // изменить аватар
  export const changeUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    })
      .then(res => checkError(res));
  };
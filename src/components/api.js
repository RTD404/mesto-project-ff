const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: '9420345b-37f5-4248-a84c-1b1c0129926e',
      'Content-Type': 'application/json'
    }
};

function request(endpoint, options) {
    return fetch(`${config.baseUrl}/${endpoint}`, {
        method: 'GET',
        ...options,
        headers: {...config.headers, ...options?.headers}
    }).then(onResponse)
};

function onResponse(res) {
    return res.ok
      ? res.json()
      : res.json().then(error => Promise.reject(error));
};

// Рендеринг карточек с сервера
function getCards() {
    return request('cards');
};

// Добавление карточки
function addCard(dataCard) {
    return request('cards', {
        method: 'POST',
        body: JSON.stringify(dataCard)
    });
};

// Удаление карточки
function deleteCard(_id) {
    return request(`/cards/${_id}`, {
        method: 'DELETE',
    });
};

// Рендеринг информации профиля с сервера
function getUserInfo() {
    return request('users/me');
};

// Редактирование профиля
function editProfile(newDataProfile) {
    return request('users/me', {
        method: 'PATCH',
        body: JSON.stringify(newDataProfile)
    });
};

// Редактирование аватара профиля
function editAvatarProfile(newAvatarProfile) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({ avatar: newAvatarProfile })
    });
};

// Лайк карточки
function likeCard(idCard) {
    return request(`cards/likes/${idCard}`, {
      method: "PUT",
      body: JSON.stringify({ _id: idCard })
    });
};
  
// Удаление лайка карточки
function deleteLikeCard(idCard) {
    return request(`cards/likes/${idCard}`, {
      method: "DELETE",
      body: JSON.stringify({ _id: idCard })
    });
};
  
export {getUserInfo, getCards, editProfile, addCard, deleteCard, editAvatarProfile, likeCard, deleteLikeCard}
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'ce490567-5216-4c61-bd98-a17281c36853',
      'Content-Type': 'application/json'
    }
  };

function handleResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse);
};

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
    .then(handleResponse);
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
    .then(handleResponse);
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse);
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse);
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse);
};

export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    })
    .then(handleResponse);
};
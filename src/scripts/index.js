// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// лайк карточки

function cardLike(button) {
    button.classList.toggle('card__like-button_is-active');
}

// открытие попапа с картинкой

function openImage(name, link) {
    const popupImage = document.querySelector('.popup_type_image');
    const openedImage = popupImage.querySelector('.popup__image');
    const cardTitlePopup = popupImage.querySelector('.popup__caption');

    cardTitlePopup.textContent = name;
    openedImage.src = link;
    openedImage.alt = name;

    popupImage.classList.add('popup_is-opened');
}

// @todo: Функция создания карточки

function createCard(cardContent, likeToggle, openPicture) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');

    cardLikeBtn.addEventListener('click', () => cardLike(cardLikeBtn));

    cardImage.addEventListener('click', () => openImage(cardContent.name, cardContent.link));

    cardTitle.textContent = cardContent.name;
    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;

    cardDeleteBtn.addEventListener('click', () => handDelete(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function handDelete(cardElement) {
    cardElement.remove();
}


// @todo: Вывести карточки на страницу

function addCards(initialCards) {
    initialCards.forEach(card => {
        const cardElement = createCard(card);

        cardsList.append(cardElement);
    });
}
addCards(initialCards);


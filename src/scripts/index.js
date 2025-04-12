import '../pages/index.css';
import '../scripts/validation.js';
import { createCard } from './card.js';
import { openPopup, closeModal, closeModalOverlay } from './modal.js';
import avatarImage from '../images/avatar.jpg';
import logo from '../images/logo.svg';
import { enableValidation, clearValidation, toggleButtonState } from '../scripts/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar, deleteCard } from '../scripts/api.js';

const config = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

enableValidation(config);

let userId = null;

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;

        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        cards.reverse().forEach((card) => {
            const cardElement = createCard(card, openImage, handleDeleteCard, userId);
            cardsList.prepend(cardElement);
        });
    })
    .catch(err => {
        console.log('Ошибка при загрузке данных:', err);
});

const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const openedImage = popupImage.querySelector('.popup__image');
const cardTitlePopup = popupImage.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popups = document.querySelectorAll('.popup');

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');

const newCardButton = document.querySelector('.profile__add-button');
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title'); 
const profileJob = document.querySelector('.profile__description');

const avatarPopup = document.querySelector('.popup_type_new-avatar');
const formAvatar = avatarPopup.querySelector('.popup__form');

const inputAvatar = formAvatar.querySelector('.popup__input_type_url');

function renderLoading(button, isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = button.dataset.originalText;
    }
}

formAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const submitButton = formAvatar.querySelector('.popup__button');
    submitButton.dataset.originalText = submitButton.textContent;
    renderLoading(submitButton, true);

    updateAvatar(inputAvatar.value)
    .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closeModal(avatarPopup);
        formAvatar.reset();
    })
    .catch((err) => {
        console.log('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
        renderLoading(submitButton, false);
    })
});

profileImage.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(config, formAvatar);
    openPopup(avatarPopup);
});

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(config, formEdit);

    const inputs = Array.from(formEdit.querySelectorAll(config.inputSelector));
    const button = formEdit.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, button, config);

    openPopup(popupEdit);
});

newCardButton.addEventListener('click', () => {
    formNewCard.reset();
    clearValidation(config, formNewCard);
    openPopup(popupNewCard);
});


// открытие попапа с картинкой

function openImage(name, link) {
    cardTitlePopup.textContent = name;
    openedImage.src = link;
    openedImage.alt = name;

    openPopup(popupImage);
}

// @todo: Вывести карточки на страницу

popups.forEach(popup => {
    popup.addEventListener('click', closeModalOverlay);
});

// редактирование имени и информации о себе

function changeInfoForm(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const submitButton = formEdit.querySelector('.popup__button');
    submitButton.dataset.originalText = submitButton.textContent;
    renderLoading(submitButton, true);

    updateUserInfo(nameValue, jobValue)
        .then((data) => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
            closeModal(popupEdit);
        })
        .catch((err) => {
            console.log('Ошибка при обновлении профиля:', err);
        })
        .finally(() => {
            renderLoading(submitButton, false);
        });
}

formEdit.addEventListener('submit', changeInfoForm);

// создание новой карточки

function createNewCard(evt) {
    evt.preventDefault();

    const titleValue = newCardTitle.value;
    const urlValue = newCardLink.value;

    const submitButton = formNewCard.querySelector('.popup__button');
    submitButton.dataset.originalText = submitButton.textContent;
    renderLoading(submitButton, true);

    addNewCard(titleValue, urlValue)
        .then((newCardData) => {
            const cardElement = createCard(newCardData, openImage, handleDeleteCard, userId);
            cardsList.prepend(cardElement);
            formNewCard.reset();
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log('Ошибка при создании карточки:', err);
        })
        .finally(() => {
            renderLoading(submitButton, false);
        })  
}

formNewCard.addEventListener('submit', createNewCard);

closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

  function handleDeleteCard(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log('Ошибка при удалении карточки:', err);
        });
  }
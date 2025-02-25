import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard } from './cards.js';
import { openPopup, closeModal } from './modal.js';
import avatarImage from '../images/avatar.jpg';
import logo from '../images/logo.svg';

const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;

console.log(avatarImage);

const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popups = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title'); 
const profileJob = document.querySelector('.profile__description');

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
});

newCardButton.addEventListener('click', () => openPopup(popupNewCard));

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');


// открытие попапа с картинкой

function openImage(name, link) {
    const popupImage = document.querySelector('.popup_type_image');
    const openedImage = popupImage.querySelector('.popup__image');
    const cardTitlePopup = popupImage.querySelector('.popup__caption');

    cardTitlePopup.textContent = name;
    openedImage.src = link;
    openedImage.alt = name;

    openPopup(popupImage);
}

// @todo: Вывести карточки на страницу

function addCards(initialCards) {
    initialCards.forEach(card => {
        const cardElement = createCard(card, openImage);

        cardsList.append(cardElement);
    });
}

addCards(initialCards);

// функция закрытия по esc

function closeModalEsc(event) {
    if(event.key === "Escape") {
        const openedModal = document.querySelector('.popup_is-opened');

        if (openedModal) {
        closeModal(openedModal);
    }
    }
}

document.addEventListener('keydown', closeModalEsc);

//функция закрытия кликом по оверлею

function closeModalOverlay(event) {
    if (event.target.matches('.popup')) {
        closeModal(event.target);
    }
}

popups.forEach(popup => {
    popup.addEventListener('click', closeModalOverlay);
});

// редактирование имени и информации о себе

function changeInfoForm(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    document.querySelector('.profile__title').textContent = nameValue;
    document.querySelector('.profile__description').textContent = jobValue;

    closeModal(popupEdit);
}

formElement.addEventListener('submit', changeInfoForm);

// создание новой карточки

function createNewCard(evt) {
    evt.preventDefault();

    const titleValue = newCardTitle.value;
    const urlValue = newCardLink.value;

    const newCard = createCard({ name: titleValue, link: urlValue }, cardLike);
    const formNewCard = popupNewCard.querySelector('.popup__form');

    cardsList.prepend(newCard);

    formNewCard.reset();
    
    closeModal(popupNewCard);
}

const formNewCard = popupNewCard.querySelector('.popup__form');
formNewCard.addEventListener('submit', createNewCard);

closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});


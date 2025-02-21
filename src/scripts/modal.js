const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popups = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');

// Функция открытия окна

function openModalEdit() {
    popupEdit.classList.add('popup_is-opened');
}

function openNewCard() {
    popupNewCard.classList.add('popup_is-opened');
}


editButton.addEventListener('click', openModalEdit);
newCardButton.addEventListener('click', openNewCard);

// функция закрытия модального окна по клику на Х

function closeModal(event) {     
    const popup = event.target.closest('.popup');     
    popup.classList.add('popup_is-animated');     
    setTimeout(() => popup.classList.remove('popup_is-opened'), 200); }

closeButton.forEach(button => {
    button.addEventListener('click', closeModal);
});

// функция закрытия по esc

function closeModalEsc(event) {
    if(event.key === "Escape") {
        const openedModal = document.querySelector('.popup_is-opened');

        if (openedModal) {
        openedModal.classList.remove('popup_is-opened');
    }
    }
}

document.addEventListener('keydown', closeModalEsc);

//функция закрытия кликом по оверлею

function closeModalOverlay(event) {
    if (event.target.matches('.popup')) {
        event.target.classList.remove('popup_is-opened');
    }
}

popups.forEach(popup => {
    popup.addEventListener('click', closeModalOverlay);
});

// редактирование имени и информации о себе

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    document.querySelector('.profile__title').textContent = nameValue;
    document.querySelector('.profile__description').textContent = jobValue;

    popupEdit.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit);

// создание новой карточки

function createNewCard(evt) {
    evt.preventDefault();

    const titleValue = newCardTitle.value;
    const urlValue = newCardLink.value;

    const newCard = createCard({ name: titleValue, link: urlValue }, cardLike);
    const formNewCard = popupNewCard.querySelector('.popup__form');

    cardsList.prepend(newCard);

    formNewCard.reset();
    
    popupNewCard.classList.remove('popup_is-opened');
}

const formNewCard = popupNewCard.querySelector('.popup__form');
formNewCard.addEventListener('submit', createNewCard);

// плавность

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
}
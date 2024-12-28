import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardContent) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = cardContent.name;
    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;


// @todo: Функция удаления карточки

    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', function() {
        cardElement.remove();
});

    return cardElement;
}


// @todo: Вывести карточки на страницу

function addCards(initialCards) {
    initialCards.forEach(card => {
        const cardElement = createCard(card);

        cardsList.append(cardElement);
    });
}
addCards(initialCards);
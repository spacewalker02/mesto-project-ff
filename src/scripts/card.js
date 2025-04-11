import { deleteCard } from "./api";

// @todo: Функция создания карточки

export function createCard(cardData, openImage, handleDeleteClick, handleLikeClick, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.like__counter');

  cardImage.addEventListener('click', () => openImage(cardData.name, cardData.link));

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((user) => user._id === userId);
  if (isLiked) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  cardLikeBtn.addEventListener('click', () => {
    handleLikeClick(cardData._id, cardLikeBtn, likeCounter);
  });

    if (cardData.owner._id === userId) {
      cardDeleteBtn.addEventListener('click', () => {
        deleteCard(cardData._id)
          handleDeleteClick(cardData._id, cardElement);
      });
    } else {
      cardDeleteBtn.remove();
    }

    return cardElement;
}


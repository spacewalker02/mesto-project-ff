import { putLike, removeLike } from "./api";

// @todo: Функция создания карточки

function handleLikeClick(cardId, likeButton, counterElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? removeLike : putLike;

  likeAction(cardId)
    .then((updatedCard) => {
      counterElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log('Ошибка при изменении лайка:', err);
    });
}

export function createCard(cardData, openImage, handleDeleteClick, userId) {
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
          handleDeleteClick(cardData._id, cardElement);
      });
    } else {
      cardDeleteBtn.remove();
    }

    return cardElement;
}


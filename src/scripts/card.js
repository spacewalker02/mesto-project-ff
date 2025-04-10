import { deleteCard, putLike, removeLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(cardData, openImage, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.like__counter');
  const isLiked = cardLikeBtn.classList.contains('card__like-button_is-active');

  if (isLiked) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  likeCounter.textContent = cardData.likes.length;

  cardImage.addEventListener('click', () => openImage(cardData.name, cardData.link));

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardLikeBtn.addEventListener('click', () => {
    const liked = cardLikeBtn.classList.contains('card__like-button_is-active');
    const likeAction = isLiked ? removeLike: putLike;

    likeAction(cardData._id)
      .then((updateCard) => {
        likeCounter.textContent = updateCard.likes.length;
        cardLikeBtn.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.log('Ошибка при изменении лайка:', err));
    });

    if (cardData.owner._id === userId) {
      cardDeleteBtn.addEventListener('click', () => {
        deleteCard(cardData._id)
          .then(() => {
            cardElement.remove();
          })
          .catch((err) => {
            console.log('Ошибка при удалении карточки:', err);
          });
      });
    } else {
      cardDeleteBtn.remove();
    }

    return cardElement;
}

// лайк карточки

function handleCardLike(button) {
  button.classList.toggle('card__like-button_is-active');
}
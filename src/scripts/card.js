// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(cardContent, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardLikeBtn.addEventListener('click', () => handleCardLike(cardLikeBtn));

  cardImage.addEventListener('click', () => openImage(cardContent.name, cardContent.link));

  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  cardDeleteBtn.addEventListener('click', () => handleCardDelete(cardElement));

  return cardElement;
}

// лайк карточки

function handleCardLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function handleCardDelete(cardElement) {
  cardElement.remove();
}
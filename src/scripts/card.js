const cardTemplate = document.querySelector('#card-template').content;

let currentCardId, currentDeleteButton;

function likeCard(likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  likeButton.classList.toggle('card__like-button_is-active');
  likeCounter.textContent = isLiked 
    ? parseInt(likeCounter.textContent) - 1 
    : parseInt(likeCounter.textContent) + 1;
}

export function createCard({
  cardData,
  showImagePopup,
  profileId,
  openDeleteConfirmationPopup,
  likeCardCallback = likeCard,
}) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-count');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  const cardId = cardData._id;
  likeCounter.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', showImagePopup);
  const isLiked = cardData.likes.some((like) => like._id === profileId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton, likeCounter);
  });

  if (cardData.owner._id !== profileId) {
    cardDeleteButton.classList.add('card__delete-button-unactive');
  } else {
    cardDeleteButton.addEventListener('click', () => {
      currentCardId = cardId;
      currentDeleteButton = cardDeleteButton;
      openDeleteConfirmationPopup();
    });
  }

  return cardElement;
}

export function getCurrentCard() {
  return { cardId: currentCardId, deleteButton: currentDeleteButton };
}
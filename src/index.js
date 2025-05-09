import './pages/index.css';
import { createCard, getCurrentCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { handleSubmit } from './scripts/utils.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const profileForm = document.forms['edit-profile'];
const profileFormNameInput = profileForm.querySelector('.popup__input_type_name');
const profileFormJobInput = profileForm.querySelector('.popup__input_type_description');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFullSize = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const cardAddForm = document.forms['new-place'];
const cardNameInput = cardAddForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardAddForm.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');

const deleteForm = document.forms['delete-card'];
const deletePopup = document.querySelector('.popup_type_delete');

const avatarChangeForm = document.forms['change-avatar'];
const avatarChangeButton = document.querySelector('.profile__image-container');
const avatarPopupInput = avatarChangeForm.querySelector('.popup__input_type_url');
const avatarPopup = document.querySelector('.popup_type_avatar');

const closeButtons = document.querySelectorAll('.popup__close');

// Моковые данные профиля
const mockProfile = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь океана',
  avatar: './images/avatar.jpg',
  _id: 'mock-profile-id'
};

// Моковые карточки
const mockCards = [
  {
    name: 'Архыз',
    link: './images/card_1.jpg',
    _id: 'mock-card-1',
    owner: { _id: 'mock-profile-id' },
    likes: []
  },
  {
    name: 'Челябинская область',
    link: './images/card_2.jpg',
    _id: 'mock-card-2',
    owner: { _id: 'mock-profile-id' },
    likes: []
  },
  {
    name: 'Иваново',
    link: './images/card_3.jpg',
    _id: 'mock-card-3',
    owner: { _id: 'mock-profile-id' },
    likes: []
  },
    {
    name: 'Архыз',
    link: './images/card_1.jpg',
    _id: 'mock-card-1',
    owner: { _id: 'mock-profile-id' },
    likes: []
  },
  {
    name: 'Челябинская область',
    link: './images/card_2.jpg',
    _id: 'mock-card-2',
    owner: { _id: 'mock-profile-id' },
    likes: []
  },
  {
    name: 'Иваново',
    link: './images/card_3.jpg',
    _id: 'mock-card-3',
    owner: { _id: 'mock-profile-id' },
    likes: []
  }
];

function openDeleteConfirmationPopup() {
  openModal(deletePopup);
}

function closeDeletePopup() {
  closeModal(deletePopup);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

avatarChangeButton.addEventListener('click', () => {
  openModal(avatarPopup);
  clearValidation(avatarChangeForm, validationConfig);
});

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);
  profileFormNameInput.value = profileTitle.textContent;
  profileFormJobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
  clearValidation(cardAddForm, validationConfig);
});

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  profileImage.src = avatarPopupInput.value;
  closeModal(avatarPopup);
}

avatarChangeForm.addEventListener('submit', handleChangeAvatarSubmit);

function handleDeleteCard({ cardId, deleteButton }) {
  deleteButton.closest('.places__item').remove();
  closeDeletePopup();
}

function handleDeleteCardSubmit(event) {
  event.preventDefault();
  handleDeleteCard(getCurrentCard());
}

deleteForm.addEventListener('submit', handleDeleteCardSubmit);

function showImagePopup(event) {
  openModal(imagePopup);
  imagePopupFullSize.setAttribute('src', event.target.src);
  imagePopupFullSize.setAttribute('alt', event.target.alt);
  imagePopupCaption.textContent = event.target.alt;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileFormNameInput.value;
  profileDescription.textContent = profileFormJobInput.value;
  closeModal(profileEditPopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    cardData: {
      name: cardNameInput.value,
      link: cardLinkInput.value,
      _id: `mock-card-${Date.now()}`,
      owner: { _id: mockProfile._id },
      likes: []
    },
    showImagePopup,
    profileId: mockProfile._id,
    openDeleteConfirmationPopup,
  });
  cardsContainer.prepend(cardElement);
  closeModal(addCardPopup);
}

cardAddForm.addEventListener('submit', handleAddCardSubmit);

function createCards(initialCards, profileId) {
  initialCards.forEach((cardData) => {
    const cardElement = createCard({
      cardData,
      showImagePopup,
      profileId,
      openDeleteConfirmationPopup,
    });
    cardsContainer.appendChild(cardElement);
  });
}

// Инициализация приложения с моковыми данными
profileTitle.textContent = mockProfile.name;
profileDescription.textContent = mockProfile.about;
profileImage.src = mockProfile.avatar;
createCards(mockCards, mockProfile._id);

enableValidation(validationConfig);
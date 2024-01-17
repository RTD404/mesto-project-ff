export const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

//кнопки открытия попапов
export const popupProfleButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const popupTypeEdit = document.querySelector('.popup_type_edit');
//форма редактирования профиля 
export const formEditProfile = document.forms["edit-profile"];
export const inputName = formEditProfile.querySelector('.popup__input_type_name');
export const inputBio = formEditProfile.querySelector('.popup__input_type_description');

export const popupNewCard = document.querySelector('.popup_type_new-card');
//форма добавления карточек
export const formNewPlace = document.forms["new-place"];
export const inputCardName = formNewPlace.querySelector('.popup__input_type_card-name');
export const inputCardLink = formNewPlace .querySelector('.popup__input_type_url');

export const imagePopup = document.querySelector('.popup_type_image');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupCaption = imagePopup.querySelector('.popup__caption');

export const popups = document.querySelectorAll('.popup');

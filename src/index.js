import './pages/index.css';
import { enableValidation, clearValidation, configForm } from './components/validation';
import { openModal, closeModal } from './components/modal';
import { createCard } from './components/card';
import { cardsContainer, popupProfleButton, popupAddButton, popupAvatarProfleButton, profileTitle, profileDescription, popupTypeEdit, inputName, inputBio, popupNewCard, inputCardName, inputCardLink, popupTypeAvatar, inputAvatarLink, imagePopup, popupImage, popupCaption, popups} from './components/constants';
import { getUserInfo, getCards, editProfile, editAvatarProfile, addCard } from './components/api';

export let myId;

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    popupAvatarProfleButton.style.backgroundImage = `url(${userInfo.avatar})`;
    myId = userInfo._id;

    cards.forEach((card) => {
      const cardElement = createCard(card, openImage);
      cardsContainer.append(cardElement);
    })
  })
  .catch(console.error);

function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохрнение...') {
  if (isLoading) {
    button.textContent = loadingText
  }else {
    button.textContent = buttonText
  }
};

// Функция, которая принимает функцию запроса, объект события и текст во время загрузки
function handleSubmit(request, evt, loadingText = 'Сохрнение...') {
  evt.preventDefault(); 

  // получаем кнопку сабмита из 'evt'
  const submitButton = evt.submitter;
  // начальный текст кнопки
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText)
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    }) 
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    })
};

// Обработчик клика по кнопке открытия popup для редактирования профиля
popupProfleButton.addEventListener('click', () => {
  inputName.value = profileTitle.textContent;
  inputBio.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  clearValidation(popupTypeEdit, configForm);
});

// Обработчик клика по кнопке редактирования аватара профиля
popupAvatarProfleButton.addEventListener('click', () => {
  openModal(popupTypeAvatar);
  clearValidation(popupNewCard, configForm);
});

// Обработчик клика по кнопке открытия popup для добавления карточки
popupAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  clearValidation(popupNewCard, configForm);
});

function openImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(imagePopup);
};

// Закрытие popup по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if ((evt.target.classList.contains('popup_is-opened')) || (evt.target.classList.contains('popup__close'))) {
      closeModal(popup)
    }
  });
});

//функция редактирование профиля
function handleFormProfileSubmit(evt) {
  function makeRequest() {
    return editProfile({
      name: inputName.value,
      about: inputBio.value
    })
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(popupTypeEdit);
      })
  };
  handleSubmit(makeRequest, evt);
};

// Функция редактирования автара профиля
function handleFormAvatarSubmit(evt) {
  function makeRequest() {
    return editAvatarProfile(inputAvatarLink.value)
      .then(() => {
        popupAvatarProfleButton.style.backgroundImage = `url(${inputAvatarLink.value})`;
        closeModal(popupTypeAvatar);
      })
  };
  handleSubmit(makeRequest, evt);
};

//фунция добавление карточки
function handleFormCardSubmit(evt) {
  function makeRequest() {
    return addCard({
      name: inputCardName.value,
      link: inputCardLink.value
    })
      .then((newCardData) => {
        const newCard = createCard(newCardData, openImage);
        cardsContainer.prepend(newCard);
        closeModal(popupNewCard);
      })
  };
  handleSubmit(makeRequest, evt);
};

popupTypeEdit.addEventListener('submit', handleFormProfileSubmit);
popupTypeAvatar.addEventListener('submit', handleFormAvatarSubmit);
popupNewCard.addEventListener('submit', handleFormCardSubmit);

enableValidation(configForm);
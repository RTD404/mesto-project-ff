import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openModal, closeModal } from './components/modal';
import { createCard, likeCard, deleteCard } from './components/card';
import { cardsContainer, popupProfleButton, popupAddButton, profileTitle, profileDescription, popupTypeEdit, inputName, inputBio, popupNewCard, formNewPlace, inputCardName, inputCardLink, popups} from './components/constants';


popupProfleButton.addEventListener('click', function () {
  inputName.value = profileTitle.textContent;
  inputBio.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

popupAddButton.addEventListener('click', () => openModal(popupNewCard));

export function openImage(data) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(imagePopup);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup)
    }
  });
});

//редактирование профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const newName = inputName.value;
    const newBio = inputBio.value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newBio;

    closeModal(popupTypeEdit);
}
popupTypeEdit.addEventListener('submit', handleFormProfileSubmit);


//добавление карточки
function handleFormCardSubmit(evt) {
    evt.preventDefault(); 

    const newCard = createCard({name: inputCardName.value, link: inputCardLink.value}, likeCard, deleteCard, openImage);

    cardsContainer.prepend(newCard);

    closeModal(popupNewCard);

    formNewPlace.reset();
}
popupNewCard.addEventListener('submit', handleFormCardSubmit);

// @todo: Вывести карточки на страницу
function addCardsToPage(cards) {
  
    cards.forEach(function (cardData) {
      const card = createCard(cardData, likeCard, deleteCard, openImage);
  
      cardsContainer.append(card);
    });
}

addCardsToPage(initialCards);
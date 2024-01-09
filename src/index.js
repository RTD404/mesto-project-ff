import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './components/modal';
import { createCard, deleteCard } from './components/card';
import { cardsContainer, popupProfleButton, popupAddButton, popupImgButton, profileTitle, profileDescription, popupTypeEdit, formEditProfile, inputName, inputBio, popupNewCard, formNewPlace, inputCardName, inputCardLink, popupImg, popups} from './components/constants';


popupProfleButton.addEventListener('click', function () {
  inputName.value = profileTitle.textContent;
  inputBio.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

popupAddButton.addEventListener('click', () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  });
});

function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const newName = inputName.value;
    const newBio = inputBio.value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newBio;

    closePopup(popupTypeEdit);
}
popupTypeEdit.addEventListener('submit', handleFormProfileSubmit);



function handleFormCardSubmit(evt) {
    evt.preventDefault(); 
    
    const newCard = createCard({name: inputCardName.value, link: nputCardLink.value}, deleteCard);

    cardsContainer.prepend(newCard);

    closePopup(popupAddButton);
}
popupAddButton.addEventListener('submit', handleFormCardSubmit);

// @todo: Вывести карточки на страницу
function addCardsToPage(cards) {
  
    cards.forEach(function (cardData) {
      const card = createCard(cardData, deleteCard);
  
      cardsContainer.append(card);
    });
}

addCardsToPage(initialCards);
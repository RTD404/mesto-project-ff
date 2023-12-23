// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(data, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__title').textContent = data.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
        deleteCard(cardElement);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу
function addCardsToPage(cards) {
    const placesList = document.querySelector('.places__list');
  
    cards.forEach(function (cardData) {
      const card = createCard(cardData, deleteCard);
  
      placesList.appendChild(card);
    });
  }

addCardsToPage(initialCards)
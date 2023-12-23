// @todo: Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(data, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__image').alt = data.name;
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
  
    cards.forEach(function (cardData) {
      const card = createCard(cardData, deleteCard);
  
      cardsContainer.append(card);
    });
}

addCardsToPage(initialCards)
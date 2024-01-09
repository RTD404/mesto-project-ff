import { cardTemplate } from "./constants";
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

export {createCard, deleteCard};
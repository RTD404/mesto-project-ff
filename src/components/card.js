import { cardTemplate } from "./constants";
import { openImage } from "../index";


// Функция создания карточки
function createCard(data, likeCard, deleteCard, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__image').alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;

    likeButton.addEventListener("click", () => likeCard(likeButton));
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardElement.querySelector('.card__image').addEventListener('click', () => openImage(data));

    return cardElement;
};

//функция лайка карточки
function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

export {createCard, likeCard, deleteCard};
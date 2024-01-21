import { cardTemplate } from "./constants";
import { myId } from "../index";
import { deleteCard, likeCard, deleteLikeCard } from "./api";

// Функция создания карточки
function createCard(data, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikes = cardElement.querySelector(".card__likes");
    const likes = data.likes;

    if (data.owner._id !== myId) {
        deleteButton.remove();
    }    

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;

    if (likes.length !== 0) {
        likes.forEach(like => {
            if (like._id === myId) {
                likeButton.classList.add('card__like-button_is-active');
            }
        });
    }

    likeButton.addEventListener("click", (evt) => {
        if (!likeButton.classList.contains('card__like-button_is-active')) {
            likeCard(data._id)
                .then((result) => {
                    cardLikes.textContent = result.likes.length;
                    evt.target.classList.add('card__like-button_is-active');
                })
                .catch(console.error);
        }else {
            deleteLikeCard(data._id)
                .then((result) => {
                    evt.target.classList.remove('card__like-button_is-active');
                    cardLikes.textContent = result.likes.length;
                })
                .catch(console.error);
        }
    });

    deleteButton.addEventListener('click', () => {
        deleteCard(data._id)
        .then(() => {
            cardElement.remove();
        })
        .catch(console.error)
    });

    cardImage.addEventListener('click', () => openImage(data));

    cardLikes.textContent = likes.length;

    return cardElement;
};

export {createCard, deleteCard};
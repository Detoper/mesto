import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import { PopupWithConfirm } from './components/PopupWithConfirm.js'
import { UserInfo } from './components/UserInfo.js'
import { Api } from './components/Api.js'
import './index.css';

// объект с селекторами для валидации
const validationList = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_state_valid',
    errorClass: 'popup__error_visible'
};
//кнопки из профиля, данные профиля
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const avatarButton = profile.querySelector('.profile__avatar-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const avatar = profile.querySelector('.profile__avatar');
//попап профиля
const profileForm = document.querySelector('.popup_type_profile').querySelector('.popup__container');
//попап аватарки
const avatarForm = document.querySelector('.popup_type_avatar').querySelector('.popup__container');
//попап добавления картинки
const imgForm = document.querySelector('.popup_type_image').querySelector('.popup__container');


const api = new Api({
    URL: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: 'c99a9c21-42bf-4702-adad-680a4cefd5c7',
        'Content-Type': 'application/json'
    }
});

//устанавливаем данные пользователя и рендерим карточки после подгрузки всей информации
let userId = '';
Promise.all([api.getInitialCards(), api.getUserData()])
    .then(([cardsData, userData]) => {
        userId = userData._id;
        cardsList.renderItems(cardsData);
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
    })
    .catch((err) => {
        console.log('Ошибка: ', err);
    });

//классы-валидаторы для каждой из форм
const profileFormValidator = new FormValidator(validationList, profileForm);
const imgFormValidator = new FormValidator(validationList, imgForm);
const avatarFormValidator = new FormValidator(validationList, avatarForm);

const userInfo = new UserInfo(profileTitle, profileSubtitle, avatar);

//функция создания карточки
function createCard(data) {
    const card = new Card(data, userId, '#card', {
        openZoom: (name, link) => {
            largeImgPopup.open(name, link);
        },
        handleLikeClick: (card) => {
            if (card.isLiked()) {
                api.removeCardLike(card.id)
                    .then(cardData => card.setLikes(cardData.likes))
                    .catch((err) => {
                        console.log('Ошибка: ', err);
                    });
            } else {
                api.setCardLike(card.id)
                    .then(cardData => card.setLikes(cardData.likes))
                    .catch((err) => {
                        console.log('Ошибка: ', err);
                    });
            }
        },
        handleTrashClick: (card, removeFunc) => {
            //открывает попап подтверждения, куда передаются данные картинки. Затем из этих данных будут использоваться ДОМ элемент
            //  для удаления после подтверждения и айди для отправки на сервер.
            confirmPopup.open(card, removeFunc);
        }
    });
    const cardEl = card.generateCard();
    return cardEl;
}
//////Для улучшенного UX 
let buttonContent = '';
let openedPopup = '';
let submitButton = '';

function renderLoading(isLoading) {
    if (isLoading) {
        //сохраняем значения открытой формы, чтобы воспользоваться ими при закрытии
        openedPopup = document.querySelector('.popup_opened');
        submitButton = openedPopup.querySelector('.popup__save-button');
        buttonContent = submitButton.textContent;
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = buttonContent;
        buttonContent = '';
    }
}
////////////////////////////////////////////
const cardsList = new Section({
        renderer: (cardElement) => {
            const cardEl = createCard(cardElement);
            cardsList.addItemtoTheEnd(cardEl);
        },
    },
    '.grid-gallery'
);

const largeImgPopup = new PopupWithImage('.popup_type_large-image');

const confirmPopup = new PopupWithConfirm('.popup_type_confirm', {
    submit: (data) => {
        console.log(data);
        api.deleteCard(data.id)
            .then(() => {
                confirmPopup.removeFunc(data._element);
                confirmPopup.close();
            })
            .catch((err) => {
                console.log('Ошибка: ', err);
            });
    }
})

const profilePopup = new PopupWithForm('.popup_type_profile', {
    submit: (data) => {
        renderLoading(true);
        api.profileRedaction(data)
            .then((profData) => {
                userInfo.setUserInfo(profData);
                profilePopup.close();

            })
            .catch((err) => {
                console.log('Ошибка: ', err);
            })
            .finally(() => {
                renderLoading(false);
            })

    },

})

const addCardPopup = new PopupWithForm('.popup_type_image', {
    submit: (data) => {
        renderLoading(true);
        api.addNewCard(data)
            .then((cardData) => {
                const cardEl = createCard(cardData);
                cardsList.addItemtoTheTop(cardEl);
                addCardPopup.close();
            })
            .catch((err) => {
                console.log('Ошибка: ', err);
            })
            .finally(() => {
                renderLoading(false);
            })
    },
})


const avatarPopup = new PopupWithForm('.popup_type_avatar', {
        submit: (data) => {
            renderLoading(true);
            api.updateProfileAvatar(data)
                .then((profData) => {
                    userInfo.setUserAvatar(profData);
                    avatarPopup.close();
                })
                .catch((err) => {
                    console.log('Ошибка: ', err);
                })
                .finally(() => {
                    renderLoading(false);
                })
        },
    })
    //слушатели
editButton.addEventListener('click', () => {
    profilePopup.open(userInfo.getUserInfo(profileTitle, profileSubtitle));
});

addButton.addEventListener('click', () => {
    imgFormValidator.toggleButtonState()
    addCardPopup.open({ name: '', info: '' });

});

avatarButton.addEventListener('click', () => {
    avatarPopup.open({ avatar: avatar.src });
});


addCardPopup.setEventListeners();
profilePopup.setEventListeners();
largeImgPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();



//запуск валидации
profileFormValidator.enableValidation();
imgFormValidator.enableValidation();
avatarFormValidator.enableValidation();
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithFormTwoRows } from './components/PopupWithFormTwoRows.js'
import { PopupWithFormOneRow } from './components/PopupWithFormOneRow.js'
import { PopupWithForm } from './components/PopupWithForm.js'
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
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormInfo = profileForm.querySelector('.popup__input_type_info');
//попап аватарки
const avatarForm = document.querySelector('.popup_type_avatar').querySelector('.popup__container');
const avatarFormLink = avatarForm.querySelector('.popup__input_type_avatar');
//попап добавления картинки
const imgForm = document.querySelector('.popup_type_image').querySelector('.popup__container');
const imgFormName = imgForm.querySelector('.popup__input_type_name');
const imgFormInfo = imgForm.querySelector('.popup__input_type_info');


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
        avatar.src = userData.avatar;
    })
    //функция обновления карточек и её вызов через каждые 20 секунд
function getInitialCards() {
    console.log('updating...')
    api.getInitialCards()
        .then((cardsData) => {
            cardsList.renderItems(cardsData);
        });
}
setInterval(getInitialCards, 20000);

//классы-валидаторы для каждой из форм
const profileFormValidator = new FormValidator(validationList, profileForm);
const imgFormValidator = new FormValidator(validationList, imgForm);
const avatarFormValidator = new FormValidator(validationList, avatarForm);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

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
            } else {
                api.setCardLike(card.id)
                    .then(cardData => card.setLikes(cardData.likes))
            }
        },
        handleTrashClick: (card) => {
            //открывает попап подтверждения, куда передаются данные картинки. Затем из этих данных будут использоваться ДОМ элемент
            //  для удаления после подтверждения и айди для отправки на сервер.
            confirmPopup.open(card);
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

const confirmPopup = new PopupWithForm('.popup_type_confirm', {
    submit: (data) => {
        data._element.remove()
        api.deleteCard(data.id)
            .then(data => console.log(data));
    }
})

const profilePopup = new PopupWithFormTwoRows('.popup_type_profile', profileFormName,
    profileFormInfo, {
        submit: (data, cl) => {
            renderLoading(true);
            api.profileRedaction(data.name, data.link)
                .then((profData) => {
                    profileTitle.textContent = profData.name;
                    profileSubtitle.textContent = profData.about;

                })
                .finally(() => {
                    renderLoading(false);
                    cl.close();
                })

        },

    })

const addCardPopup = new PopupWithFormTwoRows('.popup_type_image', imgFormName,
    imgFormInfo, {
        submit: (data, cl) => {
            renderLoading(true);
            api.addNewCard(data)
                .then((cardData) => {
                    const cardEl = createCard(cardData);
                    cardsList.addItemtoTheTop(cardEl);
                    addCardPopup.close();
                })
                .finally(() => {
                    renderLoading(false);
                    cl.close();
                })
        },
    })


const avatarPopup = new PopupWithFormOneRow('.popup_type_avatar', avatarFormLink, {
        submit: (link, cl) => {
            renderLoading(true);
            api.updateProfileAvatar(link)
                .then((profData) => {
                    avatar.src = profData.avatar;
                })
                .finally(() => {
                    renderLoading(false);
                    cl.close();
                })
        },
    })
    //слушатели
editButton.addEventListener('click', () => {
    profilePopup.open({ name: profileTitle.textContent, info: profileSubtitle.textContent });
});

addButton.addEventListener('click', () => {
    imgFormValidator.toggleButtonState()
    addCardPopup.open({ name: '', info: '' });

});

avatarButton.addEventListener('click', () => {
    avatarPopup.open(avatar.src);
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
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import './index.css';
//массив начальных данных
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
//объект с селекторами для валидации
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
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
//попап профиля
const profileForm = document.querySelector('.popup_type_profile').querySelector('.popup__container');
//попап добавления картинки
const imgForm = document.querySelector('.popup_type_image').querySelector('.popup__container');
//классы-валидаторы для каждой из форм
const profileFormValidator = new FormValidator(validationList, profileForm);
const imgFormValidator = new FormValidator(validationList, imgForm);
//класс добавления элементов на страницу имеет 2 метода: addItem(), который добавляет элемент в контейнер с указанным селектором
// и renderItems(), перебирающий указанный массив, преобразующий их функцией renderer, и добавляющий в контейнер методом addItem()
const cardsList = new Section({
        items: initialCards,
        renderer: (cardElement) => {
            //openZoom использует метод класса largeImgPopup для открытия картинки
            const card = new Card(cardElement.name, cardElement.link, '#card', {
                openZoom: (name, link) => {
                    largeImgPopup.open(name, link);
                }
            });
            const cardEl = card.generateCard();
            cardsList.addItem(cardEl);
        },
    },
    '.grid-gallery'
);

const largeImgPopup = new PopupWithImage('.popup_type_large-image');

const profilePopup = new PopupWithForm('.popup_type_profile', {
    submit: (name, description) => {
        //this._getInputValues();
        profileTitle.textContent = name.value;
        profileSubtitle.textContent = description.value;
    }
})

const addCardPopup = new PopupWithForm('.popup_type_image', {
    submit: (name, link) => {
        //this._getInputValues();
        const card = new Card(name.value, link.value, '#card', {
            openZoom: (name, link) => {
                largeImgPopup.open(name, link);
            }
        });
        const cardEl = card.generateCard();
        cardsList.addItem(cardEl);
        addCardPopup.close();
    }
})

//слушатели
editButton.addEventListener('click', () => {
    profilePopup.open();
});

addButton.addEventListener('click', () => {
    addCardPopup.open();
    imgFormValidator.toggleButtonState();
});
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
largeImgPopup.setEventListeners();

//цикл добавления начальных карточек при загрузке страницы
cardsList.renderItems();

//запуск валидации
profileFormValidator.enableValidation();
imgFormValidator.enableValidation();
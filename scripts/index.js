import { Card } from './card.js'
import { FormValidator } from './validate.js'
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
const profilePopup = document.querySelector('.popup_type_profile');
const popupName = profilePopup.querySelector('.popup__input_type_name');
const popupDescription = profilePopup.querySelector('.popup__input_type_description');
const profCloseButton = profilePopup.querySelector('.popup__close-button');
//попап добавления картинки
const imgPopup = document.querySelector('.popup_type_image');
const popupPlaceName = imgPopup.querySelector('.popup__input_type_place-name');
const popupLink = imgPopup.querySelector('.popup__input_type_link');
const imgCloseButton = imgPopup.querySelector('.popup__close-button');
//попап увеличения картинки
const largeImgPopup = document.querySelector('.popup_type_large-image');
const largeImg = largeImgPopup.querySelector('.popup__large-img');
const largeImgTitle = largeImgPopup.querySelector('.popup__img-title');
const largeImgCloseButton = largeImgPopup.querySelector('.popup__close-button');
//грид-галерея
const gridGallery = document.querySelector('.grid-gallery');


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup() {
    const activePopup = document.querySelector('.popup_opened');
    activePopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}
//функция добавления картинки
function addElement(element) {
    gridGallery.prepend(element);
}

//действия с попапом профиля
function openProfPopup() {
    popupName.value = profileTitle.textContent.trim();
    popupDescription.value = profileSubtitle.textContent.trim();
    openPopup(profilePopup);
}

function savePopup(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupDescription.value;
    closePopup();
}


//действия с попапом картинки
function openImgPopup() {
    openPopup(imgPopup);
}

function addPicture(evt) {
    evt.preventDefault();
    const card = new Card(popupPlaceName.value, popupLink.value, '#card');
    const cardEl = card.generateCard();
    addElement(cardEl);
    closePopup();
    popupPlaceName.value = '';
    popupLink.value = '';
}


//слушатели
editButton.addEventListener('click', openProfPopup);
addButton.addEventListener('click', openImgPopup);
profilePopup.addEventListener('submit', savePopup);
imgPopup.addEventListener('submit', addPicture);

//установка закрытий на кнопки и слой
const setCloseListeners = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach(popupElement => {
        const overlay = popupElement.querySelector('.popup__overlay');
        overlay.addEventListener('click', closePopup);
        const closeButton = popupElement.querySelector('.popup__close-button');
        closeButton.addEventListener('click', closePopup);
    });
};

setCloseListeners();

//цикл добавления при загрузке страницы
initialCards.forEach((cardElement) => {
    const card = new Card(cardElement.name, cardElement.link, '#card');
    const cardEl = card.generateCard();
    addElement(cardEl);
});
//цикл запуска валидации форм
const forms = Array.from(document.querySelectorAll(validationList.formSelector));
forms.forEach((formElement) => {
    const formValidator = new FormValidator(validationList, formElement);
    formValidator.enableValidation();
});
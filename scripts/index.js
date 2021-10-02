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
const cardTemplate = gridGallery.querySelector('#card').content;

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
//функция добавления картинки (используется в следующей за ней функции)
function addElement(Element) {
    gridGallery.prepend(Element);
}
const createElement = (name, link) => {
        const cardElement = cardTemplate.querySelector('.grid-gallery__card').cloneNode(true);
        const cardImg = cardElement.querySelector('.grid-gallery__card-img');
        cardImg.src = link;
        cardImg.alt = name;
        cardElement.querySelector('.grid-gallery__card-title').textContent = name;
        //слушатель лайка
        cardElement.querySelector('.grid-gallery__card-like').addEventListener('click', function(evt) {
            evt.target.classList.toggle('grid-gallery__card-like_active');
        });
        //слушатель корзины
        cardElement.querySelector('.grid-gallery__card-trash').addEventListener('click', function(evt) {
            evt.target.closest('.grid-gallery__card').remove();
        });
        //слушатель на открытие картинки
        cardElement.querySelector('.grid-gallery__card-img').addEventListener('click', function(evt) {
            const text = evt.target.closest('.grid-gallery__card').querySelector('.grid-gallery__card-title').textContent;
            largeImg.src = evt.target.src;
            largeImg.alt = text;
            largeImgTitle.textContent = text;
            openPopup(largeImgPopup);
        })

        addElement(cardElement);
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
    closeAllPopups();
}
//действия с попапом картинки
function openImgPopup() {
    openPopup(imgPopup);
}

function addPicture(evt) {
    evt.preventDefault();
    createElement(popupPlaceName.value, popupLink.value);
    closeAllPopups();
    popupPlaceName.value = '';
    popupLink.value = '';
}
//общий клоуз
function closeAllPopups() {
    closePopup(profilePopup);
    closePopup(imgPopup);
    closePopup(largeImgPopup);
}
//слушатели
editButton.addEventListener('click', openProfPopup);
addButton.addEventListener('click', openImgPopup);
profCloseButton.addEventListener('click', closeAllPopups);
imgCloseButton.addEventListener('click', closeAllPopups);
largeImgCloseButton.addEventListener('click', closeAllPopups);
profilePopup.addEventListener('submit', savePopup);
imgPopup.addEventListener('submit', addPicture);
//цикл добавления при загрузке страницы

for (let i = 0; i < initialCards.length; ++i) {
    createElement(initialCards[i].name, initialCards[i].link);
}
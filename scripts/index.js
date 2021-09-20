let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup_opened');
let saveButton = popup.querySelector('.popup__save-button');
let closeButton = popup.querySelector('.popup__close-button');

function openPopup() {
    let popupName = popup.querySelector('.popup__input_name');
    let popupDescription = popup.querySelector('.popup__input_description');
    let profileTitle = profile.querySelector('.profile__title');
    let profileSubtitle = profile.querySelector('.profile__subtitle');
    popupName.value = profileTitle.textContent.trim();
    popupDescription.value = profileSubtitle.textContent.trim();
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault();
    let popupName = popup.querySelector('.popup__input_name');
    let popupDescription = popup.querySelector('.popup__input_description');
    let profileTitle = profile.querySelector('.profile__title');
    let profileSubtitle = profile.querySelector('.profile__subtitle');
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupDescription.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('submit', savePopup);
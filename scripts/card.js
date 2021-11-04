export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
    _getCardElement() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.grid-gallery__card')
            .cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._element.querySelector('.grid-gallery__card-like').addEventListener('click', () => {
            this._likeToggle();
        });
        this._element.querySelector('.grid-gallery__card-trash').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.grid-gallery__card-img').addEventListener('click', () => {
            this._openZoom();
        });
    }
    _likeToggle() {
        this._element.querySelector('.grid-gallery__card-like').classList.toggle('grid-gallery__card-like_active');
    }
    _deleteCard() {
        this._element.querySelector('.grid-gallery__card-trash').closest('.grid-gallery__card').remove();
    }
    _openZoom() {
        const largeImgPopup = document.querySelector('.popup_type_large-image');
        const largeImg = largeImgPopup.querySelector('.popup__large-img');
        const largeImgTitle = largeImgPopup.querySelector('.popup__img-title');
        const largeImgCloseButton = largeImgPopup.querySelector('.popup__close-button');
        largeImg.src = this._link;
        largeImg.alt = this._name;
        largeImgTitle.textContent = this._name;
        largeImgPopup.classList.add('popup_opened');
        document.addEventListener('keydown', closePopupEsc);
    }
    generateCard() {
        this._element = this._getCardElement();
        this._setEventListeners();
        this._element.querySelector('.grid-gallery__card-img').src = this._link;
        this._element.querySelector('.grid-gallery__card-img').alt = this._name;
        this._element.querySelector('.grid-gallery__card-title').textContent = this._name;
        return this._element;
    }
}
export class Card {
    constructor(name, link, cardSelector, openZoom) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._openZoom = openZoom;
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
            this._openZoom(this._name, this._link);
        });
    }
    _likeToggle() {
        this._element.querySelector('.grid-gallery__card-like').classList.toggle('grid-gallery__card-like_active');
    }
    _deleteCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getCardElement();
        this._setEventListeners();
        const cardImg = this._element.querySelector('.grid-gallery__card-img');
        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.grid-gallery__card-title').textContent = this._name;
        return this._element;
    }
}
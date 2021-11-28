export class Card {
    constructor(data, userId, cardSelector, { openZoom, handleLikeClick, handleTrashClick }) {
        this.data = data;
        this.id = data._id;
        this.owner = data.owner._id;
        this.likes = data.likes;
        this._handleLikeClick = handleLikeClick;
        this._cardSelector = cardSelector;
        this._openZoom = openZoom;
        this.userId = userId;
        this.deleteCardRequest = handleTrashClick;
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
        this._elementLike = this._element.querySelector('.grid-gallery__card-like');
        this._elementLike.addEventListener('click', () => {
            this._handleLikeClick(this);
        });
        this._element.querySelector('.grid-gallery__card-trash').addEventListener('click', () => {
            this._deleteCard(this);
        });
        this._element.querySelector('.grid-gallery__card-img').addEventListener('click', () => {
            this._openZoom(this.data.name, this.data.link);
        });
    }

    _deleteCard() {
        this.deleteCardRequest(this);
    }

    generateCard() {
        this._element = this._getCardElement();
        this._trash = this._element.querySelector('.grid-gallery__card-trash');
        if (this.owner !== this.userId) {
            this._trash.setAttribute("style", "display:none;");
        }

        this._setEventListeners();
        this._updateLike();
        const cardImg = this._element.querySelector('.grid-gallery__card-img');
        cardImg.src = this.data.link;
        cardImg.alt = this.data.name;
        this._element.querySelector('.grid-gallery__card-title').textContent = this.data.name;
        return this._element;
    }

    isLiked() {
        return Boolean(this.likes.some(user => user._id === this.userId));
    }

    setLikes(likesArr) {
        this.likes = likesArr;
        this._updateLike();
        console.log(likesArr);
        console.log(this);
    }

    _updateLike() {
        if (!this.isLiked()) {
            this._elementLike.classList.remove('grid-gallery__card-like_active');
        } else {
            this._elementLike.classList.add('grid-gallery__card-like_active');
        }
        this.counter = this._element.querySelector('.grid-gallery__card-likecounter');
        this.counter.textContent = this.likes.length;
    }
}
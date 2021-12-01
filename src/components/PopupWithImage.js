import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        const largeImg = this._popup.querySelector('.popup__large-img');
        const largeImgTitle = this._popup.querySelector('.popup__img-title');
        largeImg.src = link;
        largeImg.alt = name;
        largeImgTitle.textContent = name;
        super.open();
    }
}
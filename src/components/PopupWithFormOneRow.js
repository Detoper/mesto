import { Popup } from './Popup.js'

export class PopupWithFormOneRow extends Popup {
    constructor(popupSelector, linkInput, { submit }) {
        super(popupSelector);
        this.submit = submit;
        this.link = linkInput;
    }

    open(link) {
        this.link.value = link;
        const openPopup = super.open();
        return openPopup;

    }
    setEventListeners() {
        const listeners = super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            const linkValue = this.link.value;
            this.submit(linkValue, this);
            this.close();
        });
        return listeners;
    }
    close() {
        const closePopup = super.close();
        this.link.value = '';
        return closePopup;
    }
}
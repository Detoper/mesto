import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this.submit = submit;
    }
    open(data) {
        this.data = data;

        const openPopup = super.open();
        return openPopup;
    }

    setEventListeners() {
        const listeners = super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.submit(this.data);
            this.close();
        });
        return listeners;
    }
}
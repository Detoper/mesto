import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this.submit = submit;
        this.name = this._popup.querySelector('.popup__input_type_name');
        this.info = this._popup.querySelector('.popup__input_type_info');
    }
    _getInputValues() {
        this.nameValue = this.name.value;
        this.infoValue = this.info.value;
        return this.nameValue, this.infoValue;
    }
    setEventListeners() {
        const listeners = super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.submit(this.name, this.info);
            this.close();
        });
        return listeners;
    }
    close() {
        const closePopup = super.close();
        this.name.value = '';
        this.info.value = '';
        return closePopup;
    }
}
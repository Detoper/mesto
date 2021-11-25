import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, nameInput, infoInput, { submit }) {
        super(popupSelector);
        this.submit = submit;
        this.name = nameInput;
        this.info = infoInput;
    }

    open(InfoData) {
        this.name.value = InfoData.name;
        this.info.value = InfoData.info;
        const openPopup = super.open();
        return openPopup;

    }
    _getInputValues() {
        const data = {
            name: this.name.value,
            info: this.info.value
        }
        return data;
    }
    setEventListeners() {
        const listeners = super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            const values = this._getInputValues();
            this.submit(values.name, values.info);
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
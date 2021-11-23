import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, nameInput, infoInput, InfoData, { submit }) {
        super(popupSelector);
        this.submit = submit;
        this.name = nameInput;
        this.info = infoInput;
        this.nameData = InfoData.name;
        this.infoData = InfoData.info;
    }

    open() {
        this.name.value = this.nameData;
        this.info.value = this.infoData;
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
            this.submit(this._getInputValues().name, this._getInputValues().info);
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
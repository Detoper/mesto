import { Popup } from './Popup.js'

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
    }
    open(data, removeFunc) {
        this.data = data;
        this.removeFunc = removeFunc;
        super.open();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            console.log('from popupConfirm', this.removeFunc);
            this._submit(this.data, this.removeFunc);
            this.close();
        });
        super.setEventListeners();
    }

}
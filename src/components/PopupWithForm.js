import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    open(InfoData) {
        //цикл заполнения формы при открытии: проверяем, совпадает ли имя свойства объекта, поданного на вход, с 
        //именем поля инпут. если да - записываем значение свойства в это поле
        this._inputList.forEach((input) => {
            for (let key in InfoData) {
                if (key === input.name) {
                    input.value = InfoData[key];
                }
            }
        })
        super.open();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const values = this._getInputValues();
            console.log(values);
            this._submit(values, this);
        });
        super.setEventListeners();
    }
}
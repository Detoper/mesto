export class FormValidator {
    constructor(list, formElement) {
        this._formSelector = list.formSelector;
        this._inputSelector = list.inputSelector;
        this._submitButtonSelector = list.submitButtonSelector;
        this._inactiveButtonClass = list.inactiveButtonClass;
        this._inputErrorClass = list.inputErrorClass;
        this._errorClass = list.errorClass;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
    _checkInputValidity() {
        const isInputNotValid = !this._inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        if (isInputNotValid) {
            errorElement.textContent = this._inputElement.validationMessage;
            this._inputElement.classList.add(this._inputErrorClass);
        } else {
            errorElement.textContent = '';
            this._inputElement.classList.remove(this._inputErrorClass);
        }
    }
    toggleButtonState() {
        if (this._isFormValid) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }
    _setEventListeners() {
        //проверка валидности при вводе символов пользователем
        this._inputList.forEach(inputElement => {
            this._inputElement = inputElement;
            this._inputElement.addEventListener('input', () => {
                this._isFormValid = this._formElement.checkValidity();
                this._checkInputValidity();
                this.toggleButtonState();
            });
        });
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }
    enableValidation() {
        this._setEventListeners();
    };

};
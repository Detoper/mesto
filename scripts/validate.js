// function checkInputValidity(formElement, inputElement, list) {
//     const isInputNotValid = !inputElement.validity.valid;
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     if (isInputNotValid) {
//         errorElement.textContent = inputElement.validationMessage;
//         inputElement.classList.add(list.inputErrorClass);
//     } else {
//         errorElement.textContent = '';
//         inputElement.classList.remove(list.inputErrorClass);
//     }
// }

// function toggleButtonState(button, isActive, list) {
//     if (isActive) {
//         button.classList.remove(list.inactiveButtonClass);
//         button.disabled = false;
//     } else {
//         button.classList.add(list.inactiveButtonClass);
//         button.disabled = true;
//     }
// }

// function setEventListeners(formElement, list) {
//     const inputList = Array.from(formElement.querySelectorAll(list.inputSelector));
//     const submitButton = formElement.querySelector(list.submitButtonSelector);
//     inputList.forEach(inputElement => {
//         //проверка валидности при вводе символов пользователем
//         inputElement.addEventListener('input', (evt) => {
//             isFormValid = formElement.checkValidity();
//             checkInputValidity(formElement, inputElement, list);
//             toggleButtonState(submitButton, isFormValid, list);
//         });
//         //проверка валидности при открытии попапа добавления картинки
//         const addButton = document.querySelector('.profile__add-button');
//         addButton.addEventListener('click', (evt) => {
//             const isFormValid = formElement.checkValidity();
//             toggleButtonState(submitButton, isFormValid, list);
//         });
//     });
//     formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();

//     });
// };

// const enableValidation = (list) => {
//     const forms = Array.from(document.querySelectorAll(list.formSelector));
//     forms.forEach(formElement => {
//         setEventListeners(formElement, list);
//     });
// };

// enableValidation(validationList);

export class FormValidator {
    constructor(list, formElement) {
        this._formSelector = list.formSelector;
        this._inputSelector = list.inputSelector;
        this._submitButtonSelector = list.submitButtonSelector;
        this._inactiveButtonClass = list.inactiveButtonClass;
        this._inputErrorClass = list.inputErrorClass;
        this._errorClass = list.errorClass;
        this._formElement = formElement;
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
    _toggleButtonState() {
        if (this._isFormValid) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        //проверка валидности при вводе символов пользователем
        inputList.forEach(inputElement => {
            this._inputElement = inputElement;
            this._inputElement.addEventListener('input', () => {
                this._isFormValid = this._formElement.checkValidity();
                this._checkInputValidity();
                this._toggleButtonState();
            });
            //проверка валидности при открытии попапа добавления картинки
            const addButton = document.querySelector('.profile__add-button');
            addButton.addEventListener('click', () => {
                this._isFormValid = this._formElement.checkValidity();
                this._toggleButtonState();
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
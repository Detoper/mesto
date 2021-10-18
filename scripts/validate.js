const validationList = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_state_valid',
    errorClass: 'popup__error_visible'
};

function checkInputValidity(formElement, inputElement, list) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (isInputNotValid) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(list.inputErrorClass);
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove(list.inputErrorClass);
    }
}

function toggleButtonState(button, isActive, list) {
    if (isActive) {
        button.classList.remove(list.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(list.inactiveButtonClass);
        button.disabled = true;
    }
}

function setEventListeners(formElement, list) {
    const inputList = Array.from(formElement.querySelectorAll(list.inputSelector));
    const submitButton = formElement.querySelector(list.submitButtonSelector);
    inputList.forEach(inputElement => {
        //проверка валидности при вводе символов пользователем
        inputElement.addEventListener('input', (evt) => {
            const isFormValid = formElement.checkValidity();
            checkInputValidity(formElement, inputElement, list);
            toggleButtonState(submitButton, isFormValid, list);
        });
        //проверка валидности при открытии попапа добавления картинки
        const addButton = document.querySelector('.profile__add-button');
        addButton.addEventListener('click', (evt) => {
            const isFormValid = formElement.checkValidity();
            toggleButtonState(submitButton, isFormValid, list);
        });
    });
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

    });
};

const enableValidation = (list) => {
    const forms = Array.from(document.querySelectorAll(list.formSelector));
    forms.forEach(formElement => {
        setEventListeners(formElement, list);
    });
};

enableValidation(validationList);
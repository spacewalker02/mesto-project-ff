export const config = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const showInputError = (formElement, formInput, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, formInput, config) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

const checkInputValidity = (formElement, formInput, config) => {
    if (formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
        formInput.setCustomValidity("");
    }

    if (!formInput.validity.valid) {
        showInputError(formElement, formInput, formInput.validationMessage, config);
    } else {
        hideInputError(formElement, formInput, config);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (inputList.some(formInput => !formInput.validity.valid)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
            checkInputValidity(formElement, formInput, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

export function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, config);
    });
}

enableValidation(config);

export function clearValidation(config, formElement) {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
        const errorElement = formElement.querySelector(`.${input.id}-error`);
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
    });

    toggleButtonState(inputs, button, config);
}
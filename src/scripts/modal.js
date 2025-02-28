// функция закрытия модального окна

export function closeModal() {     
    const popup = document.querySelector('.popup_is-opened');    
    popup.classList.add('popup_is-animated');     
    setTimeout(() => popup.classList.remove('popup_is-opened'), 200); 
    document.removeEventListener('keydown', closeModalEsc);
}

// плавность

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', closeModalEsc);
}


// функция закрытия по esc

export function closeModalEsc(event) {
    if(event.key === "Escape") {
        const openedModal = document.querySelector('.popup_is-opened');

        if (openedModal) {
        closeModal(openedModal);
    }
    }
}

//функция закрытия кликом по оверлею

export function closeModalOverlay(event) {
    if (event.target.matches('.popup')) {
        closeModal(event.target);
    }
}


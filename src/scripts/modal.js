// функция закрытия модального окна

export function closeModal() {     
    const popup = document.querySelector('.popup_is-opened');    
    popup.classList.add('popup_is-animated');     
    setTimeout(() => popup.classList.remove('popup_is-opened'), 200); 
}

// плавность

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
}
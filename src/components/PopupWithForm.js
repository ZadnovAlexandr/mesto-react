import React from "react";

function PopupWithForm(props) {
  const { name, title, children, buttonText, isOpen, onClose } = props;
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть форму" 
          className="popup__button-close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_type_${name}`} name="formPopupAddcard" novalidate>
          {children}
          <button type="submit"  aria-label="Создать" className="form__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
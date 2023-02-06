import React from "react";

function ImagePopup(props) {
  const { name, card, isOpen, onClose } = props;
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          className="popup__button-close popup__button-close_type-card"
          aria-label="Закрыть форму"
          onClick={onClose}/>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  ); 
}

export default ImagePopup
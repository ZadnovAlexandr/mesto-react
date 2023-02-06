import React from "react";

function Card (props){

  const handleClick =() => {
    props.onCardClick(props.cards);
  }  

  return(
    <li className="place">
      <button type="button" aria-label="Удалить" className="place__button-delete"></button>
      <img className="place__image" src={props.cards.link} alt={props.cards.name} onClick={handleClick}/>
      <h2 className="place__title">{props.cards.name}</h2>
      <div className="place__like-conteiner">
        <button type="button" aria-label="Лайк" className="place__button-like"></button>
        <p className="place__likes-counter">{props.cards.likes.length}</p>
      </div>
    </li>
  )
}

export default Card
import React from "react";

import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);
   
  return (
    <main> 
      <section className="profile" aria-label="Информация о профиле">
        <div className="profile__avatar" 
          onClick={onEditAvatar}  
          style={{ backgroundImage: `url(${currentUser.avatar})` }}>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="Открыть форму" className="profile__edit-button" onClick={onEditProfile}/>
          <p class="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="places" aria-label="Места России">
        <ul className="places__list">
          {cards.map((card) =>{
            return (
              <Card
                cards={card}
                key={card.id}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

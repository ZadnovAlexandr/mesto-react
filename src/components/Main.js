import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('')
  const [userDescription , setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([]);

  const getInfo = () => api.getUserInfo() 
    .then((userInfo) => { 
      setUserName(userInfo.name);
      setUserAvatar(userInfo.avatar);
      setUserDescription(userInfo.about);
    })
    .catch((err) => { 
      console.log(err); 
    });

  const getCards = () => api.getInitialCard()
    .then((apiCards) => { 
      setCards(apiCards);
    })
    .catch((err) => { 
      setCards(err); 
    });

  React.useEffect(() => {
    getInfo();
    getCards();
    },
  []);
  
  return (
    <main> 
      <section className="profile" aria-label="Информация о профиле">
        <div className="profile__avatar" 
          onClick={onEditAvatar}  
          style={{ backgroundImage: `url(${userAvatar})` }}>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" aria-label="Открыть форму" className="profile__edit-button" onClick={onEditProfile}/>
          <p class="profile__profession">{userDescription}</p>
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
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

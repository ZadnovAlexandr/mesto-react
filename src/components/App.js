import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  } 
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
		setIsImagePopupOpen(true);
		setSelectedCard(card);
	}

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
  }

  const getInfo = () => api.getUserInfo() 
  .then((userInfo) => { 
    setCurrentUser(userInfo);
  })
  .catch((err) => { 
    console.log(err); 
  });

  const getCards = () => api.getInitialCard()
    .then((Cards) => { 
      setCards(Cards);
    })
    .catch((err) => { 
      setCards(err); 
    });


  React.useEffect(() => {
    getInfo();
    getCards();
    },
  []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .likeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
          console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
        .then(() => {
          setCards((cards) =>
            cards.filter((i) => i._id !== card._id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
  }

    
  function handleUpdateUser(userData) {
    api
      .editUser(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <body className="page">

    <Header/>

    <Main 
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
    />
      
    <Footer />

    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}
    /> 

    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar}
    /> 
    <PopupWithForm
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      name="add-card"
      title="Новое место"
      buttonText="Создать">  

      <label className="form__field">
        <input 
          name="mestoName" 
          type="text"
          placeholder="Название" 
          className="form__input form__input_theme_mestoName"
          minlength="2"
          maxlength="30"
          required/>
        <span
          className="form__error form__input-error-mestoName">
        </span>
      </label>
      <label className="form__field">
        <input 
          name="mestoURL" 
          type="url"
          placeholder="Ссылка на картинку"
          className="form__input form__input_theme_mestoURL"
          required/>
        <span
          className="form__error form__input-error-mestoURL">
        </span>
      </label> 
    </PopupWithForm>

    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      buttonText="Да">  
    </PopupWithForm>

    <ImagePopup
      name="open-card"
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}
      card={selectedCard}
    />

    </body>
    </CurrentUserContext.Provider>
  );
}

export default App;

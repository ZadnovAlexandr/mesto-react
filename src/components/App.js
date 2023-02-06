import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)

  const handleEditAvatarClick = ()=>{
    setIsEditAvatarPopupOpen(true)
  } 

  const handleEditProfileClick = ()=>{
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = ()=>{
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card)=>{
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <body className="page">

    <Header/>

    <Main 
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
    />
      
    <Footer />

    <PopupWithForm
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      name="profile"
      title="Редактировать профиль"
      buttonText="Создать">       

      <label className="form__field">
        <input 
          name="name" 
          type="text"
          placeholder="Имя" 
          className="form__input form__input_theme_name"
          minlength="2"
          maxlength="40"
          required/>
        <span
          className="form__error form__input-error-name">
        </span>
      </label>
      <label className="form__field">
        <input 
          name="profession" 
          type="text"
          placeholder="Вид деятельности" 
          className="form__input form__input_theme_profession"
          minlength="2"
          maxlength="200"
          required/>
        <span
          className="form__error form__input-error-profession">
        </span>
      </label>   
    </PopupWithForm>

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

    <PopupWithForm
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить">  

      <label className="form__field">
        <input 
          name="avatarURL" 
          type="url"
          placeholder="Ссылка на аватар"
          className="form__input form__input_theme_avatarURL"
          required/>
        <span
          className="form__error form__input-error-avatarURL">
        </span>
      </label>
    </PopupWithForm>
   
    <ImagePopup
      name="open-card"
      isOpen={selectedCard}
      onClose={closeAllPopups}
      card={selectedCard}
    />

    </body>
  );
}

export default App;

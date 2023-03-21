import React, {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import { register, login} from "../utils/Auth";
import * as auth from '../utils/Auth';
import Loading from "./Loading";
import NotFound from "./NotFound";

function App() {
  const [isOpenAvatarPopup, setIsOpenAvatarPopup] = useState(false);
  const [isOpenProfilePopup, setIsOpenProfilePopup] = useState(false);
  const [isOpenPlacePopup, setIsOpenPlacePopup] = useState(false);
  const [isOpenConfimPopup, setIsOpenConfimPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [loggedIn, isloggedIn] = useState(false);
  const [registerResponse, isregisterResponse]  = useState({
    status: false,
    text: "",
  });
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const [pageLoading, setPageloading] = useState(true);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    // если у пользователя есть токен в localStorage,эта функция проверит валидность токена
      if (token){    // проверим токен
        auth
        .checkToken(token)
        .then((res) => {
          if (res){
            isloggedIn(true); // авторизуем пользователя
            setUserEmail(res.email) //получаем данные пользователя
            navigate("/", {replace: true})
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }, [navigate, token])
  
    useEffect(() => {
      if(token) {
        isloggedIn(true);
        setPageloading(true);
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPageloading(false))
      }
    }, [token]);

  function openPopupBurger(e) {
    e.preventDefault();
    setIsActiveBurger(!isActiveBurger)
  }

  function handelRegisterClick(password, email) {
    register(password, email)
    .then((res) => {
      if(res) {
        isregisterResponse({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate('/sign-in', {replace: true})
      }
    })
    .catch((res) => {
      if(res === 'Ошибка 409') {
        setOpenInfoTooltip(true);
        isregisterResponse({
          status: false,
          text: "Пользователь с такой почтой уже зарегистрирован",
        });
      } else if(!res) {
        isregisterResponse({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      }
    })
    .finally(()=>setOpenInfoTooltip(true))
  }

  function handelLoginClick(password, email) {
    login(password, email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      isloggedIn(true);
      navigate('/',{replace: true});
      setUserEmail(email)
    })
    .catch((res) => {
      if(res === 'Ошибка 401') {
        setOpenInfoTooltip(true);
        isregisterResponse({
          status: false,
          text: "Пользователь с такой почтой не зарегистрирован",
        });
      } else if(!res) {
        isregisterResponse({
          status: false,
          text: res,
        });
      }
    })
  } 

  function handleUpdateUser(value) {
    setIsLoading(true);
    api
      .saveNewUserInfo(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api
      .saveNewUserAvatar(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard(data) {
    setIsLoading(true);
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([ ...cards, newCard]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .putLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardClick(card) {
    setIsOpenCardPopup(true);
    setSelectedCard(card);
  }

  function handleConfimCardDelete(card) {
    setIsOpenConfimPopup(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsOpenAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsOpenProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsOpenPlacePopup(true);
  }


  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        closeAllPopups();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handelEscape);

    return () => {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function closeAllPopups() {
    setIsOpenProfilePopup(false);
    setIsOpenPlacePopup(false);
    setIsOpenAvatarPopup(false);
    setIsOpenCardPopup(false);
    setIsOpenConfimPopup(false);
    setOpenInfoTooltip(false);
  }
  
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setIsActiveBurger(false);
    isloggedIn(false); 
    setUserEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          userEmail={userEmail} 
          signOut={signOut} 
          openPopupBurger={openPopupBurger}
          isActiveBurger={isActiveBurger}/>
        <Routes>
          <Route path="/sign-up" element={
            <Register register={handelRegisterClick} />}>
          </Route>
          <Route path="/sign-in" element={
            <Login login={handelLoginClick}/>}>
          </Route>
           <Route path="/" element={
            <>
              {token && pageLoading ?  <Loading/>:  
                <ProtectedRouteElement 
                  component={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onClickCardDelete={handleConfimCardDelete}
                  onCardLike={handleCardLike}
                />
              } 
            </>
          }/> 
        <Route path="*" element={<NotFound/>} /> 
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isOpenProfilePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isOpenAvatarPopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isOpenPlacePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddCard={handleAddCard}
        />
        <ImagePopup
          isOpen={isOpenCardPopup}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isOpenConfimPopup}
          onClose={closeAllPopups}
          onConfirmDeleteClick={handleCardDelete}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          registerResponse={registerResponse}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

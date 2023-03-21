import logoMesto from '../images/Logo_mesto.svg';
import {Route, Link, Routes } from 'react-router-dom';

function Header({userEmail, signOut, openPopupBurger, isActiveBurger}) {

   return (
    <header className={isActiveBurger ? "header header_active" : "header"}>
    <img className="header__logo" src={logoMesto} alt="логотип место россия" />
    <Routes>
      <Route path="/sign-up" element={
        <Link to={"/sign-in"} className="header__navLink header__navLink_active">Войти</Link>}/>
      <Route path="/sign-in" element={
        <Link to={"/sign-up"} className="header__navLink header__navLink_active">Регистрация</Link>}/>
      <Route path="/" element={
        <>
        <div className={isActiveBurger ? "header__userElements_active" : "header__userElements"}>
          <p className='header__userElements-email'>{userEmail}</p>
          <button onClick={signOut} className="links header__userElements-logout">Выйти</button>
        </div>
        <button className={isActiveBurger ? " header__burger_active header__burger" : "header__burger"} onClick={openPopupBurger}>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>
        </>
      }/>
    </Routes>
  </header>
  );
}

export default Header;

import PopupWithForm from "./PopupWithForm";
import {useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import ValidationForm from "../hooks/ValidationForm";

function EditProfilePopup({onUpdateUser, isOpen, isLoading, onClose}) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const {handleChange, errors, formValue, setFormValue, setErrors, isValid} = ValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: formValue.name,
      about: formValue.description,
    });
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setErrors("")
    if (isOpen) {
      setFormValue({...formValue, 'name': currentUser.name, 'description': currentUser.about})
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      disabled={!isValid}
      name="profile"
      title={"Редактировать профиль"}
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        id="name-input"
        value={formValue.name || ''}
        onChange={handleChange}
        type="text"
        className={!errors.name ? "form__text" : "form__text form__text_error"}
        name="name"
        placeholder="введите имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__text-error_active">{errors.name}</span>
      <input
        id="job-input"
        value={formValue.description || ''} 
        onChange={handleChange}
        type="text"
        className={!errors.description ? "form__text" : "form__text form__text_error"}
        name="description"
        placeholder="введите работу"
        required
        minLength="4"
        maxLength="200"
      />
      <span className="form__text-error_active">{errors.description}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef} from "react";
import ValidationForm from "../hooks/ValidationForm";
function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isLoading}) {
  
  const inputRef = useRef("");
  const {handleChange, errors, setErrors, isValid, setIsValid} = ValidationForm();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        inputRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  useEffect(() => {
    setIsValid(false);
    setErrors("");
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      disabled={!isValid}
      name="avatar"
      title={"Обновить аватар"}
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        id="avatar-input"
        ref={inputRef}
        type="url"
        className={!errors.avatar ? "form__text" : "form__text form__text_error"}
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
      />
      <span className="form__text-error_active">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

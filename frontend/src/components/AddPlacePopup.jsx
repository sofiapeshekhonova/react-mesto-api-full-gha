import PopupWithForm from "./PopupWithForm";
import {useEffect} from "react";
import ValidationForm from "../hooks/ValidationForm";

function AddPlacePopup({isLoading, isOpen, onClose, onAddCard}) {

  const {handleChange, errors, formValue, setFormValue, setErrors, isValid, setIsValid} = ValidationForm();

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: formValue.name,
      link: formValue.placeLink,
    });
  }

  useEffect(() => {
    setErrors("")
    if (isOpen) {
      setFormValue("")
      setIsValid(false)
    }
  }, [isOpen, setErrors, setFormValue, setIsValid]);

  return (
    <PopupWithForm
      disabled={!isValid}
      name="place"
      title={"Новое место"}
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleFormSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        id="place-name-input"
        value={formValue.name || ''}
        onChange={handleChange}
        type="text"
        className={!errors.name ? "form__text" : "form__text form__text_error"}
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__text-error_active">{errors.name}</span>
      <input
        id="place-link-input"
        value={formValue.placeLink || ''}
        onChange={handleChange}
        type="url"
        className={!errors.placeLink ? "form__text" : "form__text form__text_error"}
        name="placeLink"
        placeholder="Ссылка на картинку"
        required
        minLength="2"
      />
      <span className="form__text-error_active">{errors.placeLink}</span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
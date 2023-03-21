import register_ok from '../images/register_ok.svg'
import register_arror from '../images/register_arror.svg'

function InfoTooltip ({onClose, isOpen, registerResponse}) {
  return (
    <section className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container popup__infoTooltip">
        <button
          className="popup__close-icon popup__close-icon_type_profile links"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
        <img src={registerResponse.status ? register_ok : register_arror} className="popup__image" alt="регистрация прошла успешно"></img>
        <h2 className="popup__title popup__title-infoTooltip">
          {registerResponse.text}
        </h2>
        
      </div>
    </section>
  );
}
export default InfoTooltip
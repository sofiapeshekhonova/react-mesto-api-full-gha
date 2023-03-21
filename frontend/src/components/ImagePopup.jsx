function ImagePopup({card, isOpen, onClose}) {
  return (
    <section className={`popup popup_images ${isOpen ? `popup_opened` : ""}`}>
      <figure className="popup__container-images">
        <button
          className="popup__close-icon popup__close-icon_type_profile links"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__picture"
          src={card.link}
          alt={`Картинка города: ${card.name}`}
        />
        <figcaption className="popup__picture-caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;

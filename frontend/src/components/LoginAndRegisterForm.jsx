function LoginAndRegisterForm({disabled, onSubmit, children, buttonText}) {
  return (
    <form className="form form__login" onSubmit={onSubmit} noValidate>
      {children}
      <button
        disabled={disabled}
        className={
          disabled ? "login__button login__button_inactive" : "login__button links"
        }
        type="submit"
        aria-label="зарагистрироваться"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default LoginAndRegisterForm;
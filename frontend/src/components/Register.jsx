
import {Link} from "react-router-dom";
import LoginAndRegisterForm from "./LoginAndRegisterForm";
import ValidationForm from "../hooks/ValidationForm";

function Register({register}) {

  const {handleChange, errors, formValue } = ValidationForm();

  function handelSubmit(e) {
    e.preventDefault();
    register(formValue.password, formValue.email);
    formValue.password = "";
    formValue.email = "";
  }

  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <LoginAndRegisterForm
          onSubmit={handelSubmit}
          disabled={!(errors.email === "" && errors.password === "")}
          buttonText={"Зарегистрироваться"}
        >
          <input
            id="email"
            className={!errors.email ? "form__input" : "form__input form__input_errors"}
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email || ''}
            onChange={handleChange}
            autoComplete="off"
            minLength="2"
            required
          />
          <span className={"form__text-error_active"}>{errors.email}</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className={!errors.password ? "form__input" : "form__input form__input_errors"}
            value={formValue.password || ''}
            onChange={handleChange}
            minLength="4"
            required
          />
          <span className={"form__text-error_active"}>{errors.password}</span>
        </LoginAndRegisterForm>
        <Link to="/sign-in" className="login__paragraph">
          Уже зарегистрировались? Войти
        </Link>
      </section>
    </main>
  );
}

export default Register;

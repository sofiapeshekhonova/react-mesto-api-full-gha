import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
    <h1> Cтраница не найдена </h1>
    <button className="not-found_button">
      <Link to={"/"} className="header__navLink header__navLink_active">Вернуться на главную</Link>
    </button>
    </div>
  );
}

export default NotFound;

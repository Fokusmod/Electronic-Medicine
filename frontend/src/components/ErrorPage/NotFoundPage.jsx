import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import logo from "/icons/logo-medicine-black.png";

export default function NotFoundPage(props) {
  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

  return (
    <>
      <div className="not-found-head">
        <div className="not-found-info-div">
          <img src={logo} alt="Electronic Medicine" />
          <div className="not-found-title">Упс... Страница не найдена.</div>
          <div className="not-found-action" onClick={back}>
            Попробуйте вернуться обратно.
          </div>
        </div>
      </div>
    </>
  );
}

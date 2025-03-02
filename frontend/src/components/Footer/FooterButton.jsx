import { useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";

export default function FooterButton() {
  let navigation = useNavigate();

  const options = {
    duration: 500,
    smooth: true,
  };

  function navigate(path) {
    navigation(path);
    animateScroll.scrollToTop(options);
  }

  return (
    <>
      <button className="footer-btn" onClick={() => navigate("/")}>
        Главная
      </button>
      <button className="footer-btn" onClick={() => navigate("/appointment")}>
        Запись на приём
      </button>
      <button className="footer-btn" onClick={() => navigate("/specialist")}>
        Специалисты
      </button>
    </>
  );
}

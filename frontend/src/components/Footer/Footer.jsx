import "./Footer.css";
import "../Header/Header.css";
import logo from "/icons/logo-medicine-white.png";
import youtube from "/icons/youtube-icons.png";
import vk from "/icons/vk-icons.png";
import FooterButton from "./FooterButton";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-info">
          <div className="footer-block-1">
            <div className="footer-head">Медицинский портал онлайн услуг</div>
            <div className="footer-head">
              <img
                className="footer-logo-icon"
                src={logo}
                alt="Electronic Medicine"
              />
            </div>
          </div>
          <div className="footer-block-2">
            <div className="footer-subscribe">
              Присоединяйтесь к нам в социальных сетях
            </div>
            <div className="footer-icons-div">
              <img
                src={youtube}
                alt="YouTube"
                className="footer-icon"
                onClick={() => window.open("https://www.youtube.com/")}
              />
              <img
                src={vk}
                alt="VK"
                className="footer-icon"
                onClick={() => window.open("https://www.vk.com/")}
              />
            </div>
          </div>
        </div>
        <div className="footer-block-header">
          <FooterButton />
        </div>
        <div className="reserved">&copy; Все права защищены</div>
      </footer>
    </>
  );
}

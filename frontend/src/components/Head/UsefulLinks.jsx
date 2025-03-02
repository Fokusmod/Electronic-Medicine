import minzdrav from "/images/МЗР.png";
import bmj from "/images/BMJ.png";
import VOZ from "/images/VOZ.png";
import VK from "/images/VK.png";
import YT from "/images/YouTube.png";

import { links } from "/src/components/Head/dataHead.js";

export default function UsefulLinks() {
  const devApi = "http://localhost:8080/description";
  const prodApi = "http://localhost:8100/";

  return (
    <>
      <div className="useful-div">
        <div className="infoHead">Полезные ссылки</div>
        <div className="useful-links">
          <div
            className="useful-links-item"
            onClick={() => window.open("https://www.youtube.com/")}
          >
            <div className="useful-links-image-container">
              <img src={YT} alt="" className="useful-links-image" />
            </div>
            <div className="useful-links-title">Наш Youtube канал</div>
            <div className="useful-links-description">
              {links[0].description}
            </div>
          </div>
          <div
            className="useful-links-item"
            onClick={() => window.open("https://www.vk.com/")}
          >
            <div className="useful-links-image-container">
              <img src={VK} alt="" className="useful-links-image" />
            </div>
            <div className="useful-links-title">Мы Вконтакте</div>
            <div className="useful-links-description">
              {links[1].description}
            </div>
          </div>
          <div
            className="useful-links-item"
            onClick={() => window.open("https://www.who.int/ru")}
          >
            <div className="useful-links-image-container">
              <img src={VOZ} alt="" className="useful-links-image" />
            </div>
            <div className="useful-links-title">
              Всемирная организация здравоохранения
            </div>
            <div className="useful-links-description">
              {links[2].description}
            </div>
          </div>
          <div
            className="useful-links-item"
            onClick={() => window.open("https://minzdrav.gov.ru/")}
          >
            <div className="useful-links-image-container">
              <img src={minzdrav} alt="" className="useful-links-image" />
            </div>
            <div className="useful-links-title">
              Министерство здравоохранения Российской Федерации
            </div>
            <div className="useful-links-description">
              {links[3].description}
            </div>
          </div>
          <div
            className="useful-links-item"
            onClick={() => window.open("https://www.bmj.com/")}
          >
            <div className="useful-links-image-container">
              <img src={bmj} alt="" className="useful-links-image" />
            </div>
            <div className="useful-links-title">British Medical Journal</div>
            <div className="useful-links-description">
              {links[4].description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

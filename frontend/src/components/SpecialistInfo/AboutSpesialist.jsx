import "./SpecialistInfo.css";
import Button from "../Button/Button";

import { animateScroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

export default function AboutSpecialist(props) {
  const navigation = useNavigate();
  const options = {
    duration: 500,
    smooth: true,
  };

  function downScroll() {
    animateScroll.scrollToBottom(options);
  }

  function setReception() {
    localStorage.setItem("specialisation", props.spec);
    localStorage.setItem("specImportant", true);
    navigation("/appointment");
  }
  return (
    <>
      <div className="info-title">
        {props.content.firstName + " " + props.content.lastName}
      </div>
      <div className="info-block-row">
        <img
          src={props.content.photoUrl}
          alt="specialist"
          className="info-photo"
        />
        <div className="about-spesialist">
          <div className="about-left">
            <div className="about-item-box">
              <div className="about-item-title">Должность</div>
              <div className="about-item-data">{props.content.position}</div>
            </div>
            <div className="about-item-box">
              <div className="about-item-title">Специальность</div>
              <div className="about-item-data">{props.spec}</div>
            </div>
            <div className="about-item-box">
              <div className="about-item-title">Возраст</div>
              <div className="about-item-data">
                {props.content.age + " лет"}
              </div>
            </div>
            <div className="about-item-box">
              <div className="about-item-title">Профессиональный стаж</div>
              <div className="about-item-data">
                {new Date().getFullYear() -
                  new Date(props.content.experience).getFullYear() +
                  " лет"}
              </div>
            </div>
            <div className="about-item-box">
              <div className="about-item-title">Статус</div>
              <div className="about-item-data">{props.content.status}</div>
            </div>
          </div>
          <div className="about-right">
            <Button name="Записаться" func={setReception} />
            <Button name="Оставить отзыв" func={downScroll} />
          </div>
        </div>
      </div>
    </>
  );
}

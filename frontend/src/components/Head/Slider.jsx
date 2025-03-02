import appointment from "/images/appointment.png";
import card from "/images/med-card.png";
import reception from "/images/reception.png";
import specialists from "/images/specialists.png";
import "./Head.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "/src/components/Head/dataHead.js";

export default function Slider() {
  const navigate = useNavigate();
  let intervalRoll;

  let slider = useRef();
  let sliderImages1 = useRef();
  let sliderImages2 = useRef();
  let sliderImages3 = useRef();
  let sliderImages4 = useRef();
  let sliderImages = [
    sliderImages1,
    sliderImages2,
    sliderImages3,
    sliderImages4,
  ];
  let sliderLine = useRef();

  let [count, setCount] = useState(0);
  let [sliderWidth, setSliderWidth] = useState(0);
  let [title, setTitle] = useState(info[0].title);
  let [desc, setDesc] = useState(info[0].description);

  useEffect(() => {
    rollSlider();
  }, [count]);

  useEffect(() => {
    intervalRoll = setInterval(() => {
      clickNext();
      return () => {
        clearInterval(intervalRoll);
      };
    }, 3000);
  }, [clickNext]);

  function clickPrev() {
    clearInterval(intervalRoll);
    if (count == 0) {
      setSliderWidth(3 * slider.current.offsetWidth);
      setCount(3);
      setTitle(info[3].title);
      setDesc(info[3].description);
    } else {
      setSliderWidth((count - 1) * slider.current.offsetWidth);
      setCount(count - 1);
      setTitle(info[count - 1].title);
      setDesc(info[count - 1].description);
    }
  }

  function clickNext() {
    clearInterval(intervalRoll);
    if (slider.current === null) {
      clearInterval(intervalRoll);
      return;
    }
    if (sliderImages.length <= count + 1) {
      setSliderWidth(0 * slider.current.offsetWidth);
      setCount(0);
      setTitle(info[0].title);
      setDesc(info[0].description);
    } else {
      setSliderWidth((count + 1) * slider.current.offsetWidth);
      setCount(count + 1);
      setTitle(info[count + 1].title);
      setDesc(info[count + 1].description);
    }
  }

  function rollSlider() {
    let width = -sliderWidth + "px";
    sliderLine.current.style = "transform : translateX(" + width + ")";
  }

  return (
    <div className="slider-content">
      <div className="slider-info">
        <div className="slider-info-title ">{title}</div>
        <div className="slider-info-desc ">{desc}</div>
      </div>
      <button className="slider-btn-prev" onClick={clickPrev}>
        &#10148;
      </button>
      <div ref={slider} className="slider">
        <div ref={sliderLine} className="slider-line">
          <div ref={sliderImages1} className="slider-img">
            <img src={appointment} alt="Запись на приём" />
            <button
              className="slider-btn"
              onClick={() => {
                navigate("/appointment");
                clearInterval(interval);
              }}
            >
              Подробнее
            </button>
          </div>
          <div ref={sliderImages2} className="slider-img">
            <img src={reception} alt="Приём пациентов" />
            <button
              className="slider-btn"
              onClick={() => {
                navigate("/appointment");
                clearInterval(interval);
              }}
            >
              Подробнее
            </button>
          </div>
          <div ref={sliderImages3} className="slider-img">
            <img src={card} alt="медицинская карта" />
          </div>
          <div ref={sliderImages4} className="slider-img">
            <img src={specialists} alt="Наши специалисты" />
            <button
              className="slider-btn"
              onClick={() => {
                navigate("/specialist");
                clearInterval(interval);
              }}
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
      <button className="slider-btn-next" onClick={clickNext}>
        &#10148;
      </button>
    </div>
  );
}

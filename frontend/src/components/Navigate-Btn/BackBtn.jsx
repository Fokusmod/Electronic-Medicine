import { useRef } from "react";
import { animateScroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

import "./navigation-btn.css";

export default function BackBtn() {
  const navigate = useNavigate();
  const backBtn = useRef(null);

  const options = {
    duration: 500,
    smooth: true,
  };

  function navigationToBack() {
    navigate(-1);
    animateScroll.scrollToTop(options);
  }

  return (
    <div ref={backBtn} className="back-btn-div" onClick={navigationToBack}>
      <div className="back-navigation"></div>
      <div className="to-top-btn-text">Назад</div>
    </div>
  );
}

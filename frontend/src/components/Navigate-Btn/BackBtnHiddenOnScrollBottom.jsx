import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const handleScrollback = () => {
      if (backBtn.current && window.scrollY < 300) {
        if (!backBtn.current.classList.contains("active")) {
          backBtn.current.classList.add("active");
        }
      } else {
        if (backBtn.current.classList.contains("active")) {
          backBtn.current.classList.remove("active");
        }
      }
    };
    window.addEventListener("scroll", handleScrollback);
    return () => window.removeEventListener("scroll", handleScrollback);
  }, []);

  return (
    <div
      ref={backBtn}
      className="back-btn-div active"
      onClick={navigationToBack}
    >
      <div className="back-navigation"></div>
      <div className="to-top-btn-text">Назад</div>
    </div>
  );
}

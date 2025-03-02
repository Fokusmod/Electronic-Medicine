import { useRef, useEffect } from "react";
import { animateScroll } from "react-scroll";

import "./navigation-btn.css";

export default function ToTopBtn() {
  const backToTop = useRef(null);

  const options = {
    duration: 500,
    smooth: true,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (backToTop.current && window.scrollY > 300) {
        if (!backToTop.current.classList.contains("active")) {
          backToTop.current.classList.add("active");
        }
      } else {
        if (backToTop.current.classList.contains("active")) {
          backToTop.current.classList.remove("active");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={backToTop}
      className="top-btn-div"
      onClick={() => {
        animateScroll.scrollToTop(options);
      }}
    >
      <div className="top-navigation"></div>
      <div className="to-top-btn-text">Наверх</div>
    </div>
  );
}

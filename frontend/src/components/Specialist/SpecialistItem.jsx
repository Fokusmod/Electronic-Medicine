import "./Specialist.css";

import { useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";

export default function SpecialistItem(props) {
  const navigate = useNavigate();

  const options = {
    duration: 500,
    smooth: true,
  };

  function showSpesialistInfo(id) {
    navigate("/specialist/info/" + id);
    animateScroll.scrollToTop(options);
  }

  return (
    <>
      <div
        className="specialist-item"
        onClick={() => showSpesialistInfo(props.id)}
      >
        <img src={props.photo} alt="medic" className="specialist-photo" />
        <div className="specialist-info">
          <div className="specialist-name">{props.fullname}</div>
          <div className="specialist-position">{props.position}</div>
        </div>
      </div>
    </>
  );
}

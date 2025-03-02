import { useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";

export default function AdminStaffItem(props) {
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
        className="admin-staff-item "
        onClick={() => showSpesialistInfo(props.id)}
      >
        <div className="admin-info">
          <img src={props.photo} alt="admin" className="admin-photo" />
          <div className="admin-position">{props.position}</div>
          <div className="admin-name">{props.fullname}</div>
        </div>
      </div>
    </>
  );
}

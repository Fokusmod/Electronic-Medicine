import "./Appointment.css";

export default function AppointSpesialistItem(props) {
  return (
    <>
      <div className="appoint-spesialist-item" onClick={props.func}>
        <div className="appoint-item-bottom">
          <img src={props.photo} alt="medic" className="appoint-item-photo" />
          <div className="appoint-item-name">{props.name}</div>
          <div className="appoint-item-position">{props.position}</div>
        </div>
      </div>
    </>
  );
}

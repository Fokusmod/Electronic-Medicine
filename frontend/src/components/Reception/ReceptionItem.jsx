import "./Reception.css";

export default function ReceptionItem(props) {
  return (
    <>
      <div className="reception-item">
        <div className="time">{props.timeSlot}</div>
        <div className="name">{props.name}</div>
      </div>
    </>
  );
}

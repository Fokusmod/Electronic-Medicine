import "./Button.css";

export default function Button(props) {
  return (
    <button type="button" className="button" onClick={props.func}>
      {props.name}
    </button>
  );
}

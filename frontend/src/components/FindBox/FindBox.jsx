import { useRef, useState, useEffect } from "react";
import "./FindBox.css";

export default function FindBox(props) {
  const devApi = localStorage.getItem("host");
  const [value, setValue] = useState("");
  const input = useRef();

  const defaultData = props.defaultData;

  function findResult() {
    setValue(input.current.value);

    if (input.current.value === "") {
      props.defaultData();
      return;
    }

    async function getSpecialist() {
      const response = await fetch(
        devApi +
          "/staff/getSpecialistFinderResult/" +
          props.findType +
          "/" +
          input.current.value,
        {
          method: "GET",
        }
      );
      var responseBody = await response.json();
      if (response.status === 200) {
        props.setData(responseBody);
      } else {
        props.setData("");
      }
    }
    getSpecialist();
  }

  return (
    <div className="find-box">
      <div className="find-title">{props.title}</div>
      <div className="find-findbox">
        <input
          className="find-input"
          id="find-employyee"
          placeholder={props.placeholder}
          ref={input}
          onChange={findResult}
        ></input>
      </div>
    </div>
  );
}

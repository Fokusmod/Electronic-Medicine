import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

import "./Modal.css";

import Button from "../Button/Button";

export default function Modal(props) {
  const dialog = useRef();

  useEffect(() => {
    if (props.open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [props.open]);

  return createPortal(
    <dialog ref={dialog}>
      <div className="modal-title">{props.title}</div>
      <div className="modal-data">{props.data}</div>
      <div className="modal-message">{props.message}</div>
      <div className="redirect-btn">
        <Button name="OK" func={props.onClose} />
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

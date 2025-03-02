import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

import "./Modal.css";
import { compareAsc } from "rsuite/esm/internals/utils/date";

export default function NotyfyModal(props) {
  const dialog = useRef();

  useEffect(() => {
    if (props.open) {
      dialog.current.classList.add("show");
      setTimeout(() => {
        dialog.current.classList.remove("show");
        localStorage.removeItem(props.item);
      }, 7000);
    }
  }, [props.open]);

  return createPortal(
    <div className="regModal" ref={dialog}>
      <div className="reg-message">{props.message}</div>
    </div>,
    document.getElementById("modal")
  );
}

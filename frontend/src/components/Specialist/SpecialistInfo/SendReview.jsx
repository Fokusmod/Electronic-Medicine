import "./SpecialistInfo.css";
import Modal from "../../Modal/Modal";

import Button from "../../Button/Button";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SendReview(props) {
  const devApi = localStorage.getItem("host");
  const area = useRef();
  const navigation = useNavigate();
  const [openError, setOpenError] = useState(false);
  const currentLocation = useLocation();

  let username = null;

  if (localStorage.getItem("username") !== null) {
    username = localStorage.getItem("username");
  } else if (sessionStorage.getItem("username") !== null) {
    username = sessionStorage.getItem("username");
  }

  function sendReview() {
    if (username === null) {
      localStorage.setItem("returnPath", currentLocation.pathname);
      setOpenError(true);
    } else {
      sendToServerReview();
    }
  }

  async function sendToServerReview() {
    let reviewRequest = {
      specId: props.id,
      author: username,
      message: area.current.value,
    };
    const response = await fetch(devApi + "/review/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequest),
    });
    if (response.status === 200) {
      window.location.reload();
    } else {
      console.log("Что то пошло не так...");
    }
  }

  function closeModal() {
    setOpenError(false);
    navigation("/login");
  }

  return (
    <>
      <div className="send-review-row">
        <textarea
          ref={area}
          name="review-area"
          id="review-area"
          rows={5}
          cols={55}
          placeholder="Оставьте ваш отзыв"
          spellCheck="true"
          className="review-area"
        ></textarea>
        <Button name="Отправить" func={sendReview} />
      </div>
      <Modal
        open={openError}
        data={"Мы вас перенаправим на страницу авторизации."}
        onClose={closeModal}
        title={"Чтобы оставить отзыв, нужно авторизоваться в системе"}
        message="Нажмите <OK> для продолжения."
      />
    </>
  );
}

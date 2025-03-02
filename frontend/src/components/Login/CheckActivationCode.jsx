import { useRef, useState } from "react";
import "./Login.css";
import logo from "/icons/logo-medicine-white.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import NotifyModal from "../Modal/NotifyModal";

export default function CheckActivationCode() {
  const devApi = localStorage.getItem("host");

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  let local;

  if (localStorage.getItem("code") == null) {
    local = false;
  } else if (localStorage.getItem("code") === "true") {
    local = true;
  } else {
    local = false;
  }

  const [open, setOpen] = useState(local);

  const validator = useRef();
  const activeteInput = useRef();
  const validatorDefault =
    "Введите код активации, который указан на вашей email почте.";

  function removeValidator() {
    validator.current.innerText = validatorDefault;
    validator.current.classList.add("default-validator");
    validator.current.classList.remove("activate-validator");
  }

  function badActivationCode(message) {
    validator.current.innerText = message;
    validator.current.classList.remove("default-validator");
    validator.current.classList.add("activate-validator");
  }

  async function sendActivateCode() {
    setLoading(true);
    let activateCode = {
      code: activeteInput.current.value,
    };

    const response = await fetch(devApi + "/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activateCode),
    });
    const responceBody = await response.json();

    if (response.status === 200) {
      localStorage.setItem("active", true);
      navigation("/login");
    } else {
      badActivationCode(responceBody.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="activate-head">
        <div className="auth-div">
          <div className="auth-image-div">
            <img src={logo} alt="Electronic medicine" className="auth-logo" />
          </div>
          <div ref={validator} className="default-validator">
            {validatorDefault}
          </div>
          <div className="activate-box">
            <input
              placeholder="Ваш код активации"
              type="text"
              id="activate-code"
              className="activate-input"
              ref={activeteInput}
              onChange={removeValidator}
            ></input>

            <Button
              name={
                loading ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={18}
                    width={18}
                    className="margin-reg"
                  />
                ) : (
                  "Подтвердить"
                )
              }
              func={sendActivateCode}
            />
          </div>
        </div>
      </div>
      <NotifyModal
        open={open}
        message="Мы выслали вам код активации учётной записи на почту. Перейдите в неё чтобы получить код."
        item="code"
      />
    </>
  );
}

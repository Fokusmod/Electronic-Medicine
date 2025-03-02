import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import ReactLoading from "react-loading";

import "animate.css";
import { useNavigate } from "react-router-dom";

export default function SighUp(active) {
  const devApi = localStorage.getItem("host");
  const navigation = useNavigate();

  useEffect(() => {
    const singInListener = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keypress", singInListener);
    return () => document.removeEventListener("keypress", singInListener);
  }, []);

  const [loading, setLoading] = useState(false);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();
  const validator = useRef();

  async function sendRegistration() {
    setLoading(true);
    let regCredantional = {
      email: usernameInput.current.value,
      password: passwordInput.current.value,
      confirmPassword: confirmInput.current.value,
    };

    const response = await fetch(devApi + "/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regCredantional),
    });
    if (response.status === 200) {
      localStorage.setItem("code", true);
      navigation("/activate");
    } else {
      const responceBody = await response.json();
      badRegistration(responceBody.message);
    }
    setLoading(false);
  }

  function badRegistration(message) {
    validator.current.innerText = message;
    usernameInput.current.blur;
    passwordInput.current.value = "";
    confirmInput.current.value = "";
  }

  function removeValidator() {
    validator.current.innerText = "";
  }

  return (
    <>
      <section
        className={
          active.isActive === "sigh-up"
            ? "auth-section auth-section-visible"
            : "auth-section auth-section-hide"
        }
      >
        <div className="box">
          <div ref={validator} className="validator-section"></div>
          <form className="auth-form">
            <button className="auth-link">У меня есть учётная запись.</button>
            <label htmlFor="email-reg" className="auth-label">
              Email
            </label>
            <input
              placeholder="Введите новый email"
              ref={usernameInput}
              type="email"
              id="email-reg"
              className="auth-input"
              autoComplete="username"
              onChange={removeValidator}
            ></input>
            <label htmlFor="password-reg" className="auth-label">
              Пароль
            </label>
            <input
              placeholder="Введите новый пароль"
              ref={passwordInput}
              type="password"
              id="password-reg"
              className="auth-input"
              autoComplete="new-password"
              onChange={removeValidator}
            ></input>
            <label htmlFor="password-again" className="auth-label">
              Повторите пароль
            </label>
            <input
              placeholder="Повторите пароль"
              ref={confirmInput}
              type="password"
              id="password-again"
              className="auth-input"
              autoComplete="new-password"
              onChange={removeValidator}
            ></input>
            <div className="btn-container" style={{ marginTop: "30px" }}>
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
                    "Зарегистрироваться"
                  )
                }
                className="auth-submit"
                func={sendRegistration}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

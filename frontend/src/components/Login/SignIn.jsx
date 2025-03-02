import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import NotifyModal from "../Modal/NotifyModal";

export default function SighIn(active) {
  const devApi = localStorage.getItem("host");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const emailInput = useRef();
  const passwordInput = useRef();
  const remember = useRef();
  const validator = useRef();

  let local;

  if (localStorage.getItem("active") == null) {
    local = false;
  } else if (localStorage.getItem("active") === "true") {
    local = true;
  } else {
    local = false;
  }

  const [open, setOpen] = useState(local);

  useEffect(() => {
    const singInListener = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keypress", singInListener);
    return () => document.removeEventListener("keypress", singInListener);
  }, []);

  async function sendLoginAndPassword() {
    setLoading(true);
    let loginAndPassword = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    const response = await fetch(devApi + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginAndPassword),
    });
    const responceBody = await response.json();

    if (response.status === 200) {
      if (remember.current.checked === true) {
        localStorage.setItem("access", responceBody.accessToken);
        localStorage.setItem("refresh", responceBody.refreshToken);
        let timeSecond = parseJwt(responceBody.accessToken).exp;
        let date = new Date(timeSecond * 1000);
        localStorage.setItem("expire", date);
        localStorage.setItem(
          "username",
          parseJwt(responceBody.accessToken).sub
        );
        localStorage.setItem("roles", parseJwt(responceBody.accessToken).roles);
        if (
          localStorage.getItem("returnPath") === undefined ||
          localStorage.getItem("returnPath") === null
        ) {
          navigation("/");
        } else {
          navigation(localStorage.getItem("returnPath"));
          localStorage.removeItem("returnPath");
        }
        window.location.reload();
      } else {
        sessionStorage.setItem("access", responceBody.accessToken);
        sessionStorage.setItem("refresh", responceBody.refreshToken);
        let timeSecond = parseJwt(responceBody.accessToken).exp;
        let date = new Date(timeSecond * 1000);
        sessionStorage.setItem("expire", date);
        sessionStorage.setItem(
          "username",
          parseJwt(responceBody.accessToken).sub
        );
        sessionStorage.setItem(
          "roles",
          parseJwt(responceBody.accessToken).roles
        );
        if (
          localStorage.getItem("returnPath") === undefined ||
          localStorage.getItem("returnPath") === null
        ) {
          navigation("/");
        } else {
          navigation(localStorage.getItem("returnPath"));
          localStorage.removeItem("returnPath");
        }
        window.location.reload();
      }
    } else {
      badAuth(responceBody.message);
    }
    setLoading(false);
  }

  function badAuth(message) {
    validator.current.innerText = message;
    emailInput.current.blur;
    passwordInput.current.value = "";
  }

  function removeValidator() {
    validator.current.innerText = "";
  }

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  return (
    <>
      <section
        className={
          active.isActive == "sigh-in"
            ? "auth-section auth-section-visible"
            : "auth-section auth-section-hide"
        }
      >
        <div className="box">
          <div ref={validator} className="validator-section"></div>
          <form className="auth-form" style={{ marginTop: "50px" }}>
            <label htmlFor="email-login" className="auth-label">
              Email
            </label>
            <input
              placeholder="Введите ваш email"
              type="email"
              id="email-login"
              className="auth-input"
              autoComplete="username"
              ref={emailInput}
              onChange={removeValidator}
            ></input>
            <label htmlFor="password-login" className="auth-label">
              Пароль
            </label>
            <input
              placeholder="Введите пароль"
              type="password"
              id="password-login"
              className="auth-input"
              autoComplete="current-password"
              ref={passwordInput}
              onChange={removeValidator}
            ></input>
            <div className="check-div">
              <input
                ref={remember}
                type="checkbox"
                id="checkbox"
                className="auth-checkbox"
              ></input>
              <label htmlFor="checkbox" className="auth-label-checkbox">
                Запомнить меня
              </label>
            </div>
            <div className="btn-container">
              <Button
                name={
                  loading ? (
                    <ReactLoading
                      type={"spin"}
                      color={"white"}
                      height={18}
                      width={18}
                      className="margin-auth"
                    />
                  ) : (
                    "Войти"
                  )
                }
                className="auth-submit"
                func={sendLoginAndPassword}
              />
            </div>

            <button className="auth-link" style={{ marginBottom: "30px" }}>
              Забыли пароль?
            </button>
          </form>
        </div>
        <NotifyModal
          open={open}
          message="Учётна запись успешно активинована. Вы можете войти в систему под существующими даными."
          item="active"
        />
      </section>
    </>
  );
}

import { useState } from "react";
import logo from "/icons/logo-medicine-white.png";
import "./Login.css";
import ToTopBtn from "../Navigate-Btn/ToTopBtn";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

export default function Login() {
  const [IsActiveTab, setIsActiveTab] = useState("sigh-in");

  return (
    <>
      <ToTopBtn />
      <div className="auth-div">
        <div className="auth-image-div">
          <img src={logo} alt="Electronic medicine" className="auth-logo" />
        </div>

        <div className="auth-select">
          <div className="auth-button-div">
            <button
              onClick={() => {
                setIsActiveTab("sigh-in");
              }}
              className={
                IsActiveTab === "sigh-in"
                  ? "auth-button auth-button-active"
                  : "auth-button"
              }
            >
              Войти
            </button>
            <button
              style={{ marginRight: "-1px" }}
              onClick={() => {
                setIsActiveTab("sigh-up");
              }}
              className={
                IsActiveTab === "sigh-up"
                  ? "auth-button auth-button-active"
                  : "auth-button"
              }
            >
              Регистрация
            </button>
          </div>
        </div>
        <SignIn isActive={IsActiveTab} />
        <SignUp isActive={IsActiveTab} />
      </div>
    </>
  );
}

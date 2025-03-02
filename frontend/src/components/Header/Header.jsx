import logo from "/icons/logo-medicine-white.png";

import "./Header.css";

import UsernameSection from "./UsernameSection";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";

export default function Header() {
  const login = useRef();
  const user = useRef();
  const adminka = useRef();
  const specialist = useRef();

  let checkAuthCredantional;
  let checkRole;

  if (localStorage.getItem("expire") !== null) {
    checkAuthCredantional = localStorage.getItem("expire");
    checkRole = localStorage.getItem("roles").split(",");
  } else if (sessionStorage.getItem("expire") !== null) {
    checkAuthCredantional = sessionStorage.getItem("expire");
    checkRole = sessionStorage.getItem("roles").split(",");
  }

  function findCurrentRole(role) {
    let result = false;
    if (checkRole === undefined) {
      return undefined;
    }
    for (let i = 0; i < checkRole.length; i++) {
      if (checkRole[i] === role) {
        result = true;
        break;
      }
    }
    return result;
  }

  if (adminka.current !== undefined && specialist.current !== undefined) {
    if (
      findCurrentRole("USER") === undefined ||
      findCurrentRole("USER") === true
    ) {
      adminka.current.classList.add("hidden");
      specialist.current.classList.add("hidden");
    }
    if (findCurrentRole("ADMIN") === true) {
      if (adminka.current.classList.contains("hidden")) {
        adminka.current.classList.remove("hidden");
      }
    }
    if (findCurrentRole("SPECIALIST") === true) {
      if (specialist.current.classList.contains("hidden")) {
        specialist.current.classList.remove("hidden");
      }
    }
  }

  if (login.current !== undefined && user.current !== undefined) {
    if (checkAuthCredantional == null) {
      login.current.classList.remove("hidden");
      user.current.classList.add("hidden");
    } else {
      user.current.classList.remove("hidden");
      login.current.classList.add("hidden");
    }
  }

  let locationHeader = useLocation();
  let path = locationHeader.pathname.replace("/", "");

  const [IsActiveTab, setIsActiveTab] = useState("head");
  function onChangeActionTab(current) {
    setIsActiveTab(current);
  }

  useEffect(() => {
    if (path.includes("medical")) {
      onChangeActionTab("medical-сard");
    } else if (
      path.match("adminka/employyes") ||
      path.match("adminka/notification") ||
      path.match("adminka/users") ||
      path.match("adminka/mailing")
    ) {
      onChangeActionTab("adminka");
    } else if (path.match("specialist/info")) {
      onChangeActionTab("specialist");
    } else {
      onChangeActionTab(path);
    }
  }, [locationHeader]);

  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="header-side-left">
            <Link to="/" onClick={() => onChangeActionTab("head")}>
              <div className="header-side">
                <img
                  className="logo-icon"
                  src={logo}
                  alt="Electronic Medicine"
                />
              </div>
            </Link>
          </div>
          <div className="header-center">
            <Link
              ref={adminka}
              className={
                IsActiveTab === "adminka"
                  ? "header-active header-item"
                  : "header-item hidden"
              }
              to="/adminka/employyes"
              onClick={() => onChangeActionTab("adminka")}
            >
              <span className="span-header">Админка</span>
            </Link>
            <Link
              to="/appointment"
              className={
                IsActiveTab === "appointment"
                  ? "header-active header-item"
                  : "header-item"
              }
              onClick={() => onChangeActionTab("appointment")}
            >
              Запись на приём
            </Link>
            <Link
              to="/specialist"
              className={
                IsActiveTab === "specialist"
                  ? "header-active header-item"
                  : "header-item"
              }
              onClick={() => onChangeActionTab("specialist")}
            >
              Специалисты
            </Link>
            <Link
              ref={specialist}
              className={
                IsActiveTab === "reception"
                  ? "header-active header-item"
                  : "header-item hidden"
              }
              to="/reception"
              onClick={() => onChangeActionTab("reception")}
            >
              <span className="span-header">Приём пациентов</span>
            </Link>
          </div>

          <div ref={login} className="header-side-right">
            <Link
              className="header-item"
              to="/login"
              onClick={() => onChangeActionTab("login")}
            >
              <span className="span-header">Войти</span>
            </Link>
          </div>
          <div ref={user} className="header-side-right hidden">
            <UsernameSection />
          </div>
        </div>
      </div>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import "./Header.css";
import user from "/icons/user.png";
import { useClickOutside } from "/src/useClickOutside.js";
import { useState, useRef } from "react";

export default function UsernameSection() {
  const navigation = useNavigate();
  let storage;

  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  let username = null;
  if (storage !== undefined) {
    username = storage.getItem("username");
  }

  const nav = useRef();
  const btn = useRef();
  const [isOpen, setOpen] = useState(false);

  useClickOutside(nav, btn, () => {
    if (isOpen) {
      setTimeout(() => setOpenNav(), 50);
    }
  });

  function setOpenNav() {
    setOpen(!isOpen);
  }

  function clearStorage() {
    if (storage !== undefined) {
      storage.clear();
    }
    navigation("/");
  }

  return (
    <>
      <div className="login-complete">
        <img src={user} alt="user" className="login-complete-photo" />
        <button ref={btn} className="username-btn" onClick={setOpenNav}>
          {username}
        </button>
        <nav ref={nav} className={`username-nav ${isOpen ? "action" : ""}`}>
          <ul className="username-nav-list">
            <li className="username-nav-item" onClick={clearStorage}>
              Выйти
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

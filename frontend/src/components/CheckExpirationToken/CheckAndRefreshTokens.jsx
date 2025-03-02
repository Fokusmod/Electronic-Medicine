import { useState, useEffect } from "react";
import Modal from "../Modal/Modal.jsx";

export default function Check() {
  const devApi = localStorage.getItem("host");

  const [openError, setOpenError] = useState(false);
  const [data, setData] = useState("");

  let storage = null;
  let checkInterval = null;

  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  useEffect(() => {
    checkInterval = setInterval(() => {
      if (storage != null) {
        let expirationDate = new Date(storage.getItem("expire"));
        if (expirationDate !== null) {
          let dateNow = new Date();
          expirationDate = new Date(expirationDate);
          if (
            new Date(dateNow.getTime() + 60000) >
            new Date(expirationDate).getTime()
          ) {
            refresh();
          }
        }
      }
    }, 3000);
    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  async function refresh() {
    let token = {
      email: storage.getItem("username"),
      refreshToken: storage.getItem("refresh"),
    };

    const response = await fetch(devApi + "/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storage.getItem("access"),
      },
      body: JSON.stringify(token),
    });

    const responceBody = await response.json();
    if (response.status === 200) {
      storage.setItem("access", responceBody.accessToken);
      storage.setItem("refresh", responceBody.refreshToken);
      let timeSecond = parseJwt(responceBody.accessToken).exp;
      let date = new Date(timeSecond * 1000);
      storage.setItem("expire", date);
    } else if (responceBody.message !== undefined) {
      setModalData();
      clearInterval(checkInterval);
    } else {
      clearInterval(checkInterval);
    }

    function setModalData() {
      setOpenError(true);
      setData(responceBody.message);
    }
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

  function closeModal() {
    setOpenError(false);
    storage.removeItem("access");
    storage.removeItem("refresh");
    storage.removeItem("expire");
    storage.removeItem("username");
    storage.removeItem("roles");
    window.location.reload();
  }

  return (
    <Modal
      open={openError}
      data={data}
      onClose={closeModal}
      title={"Ошибка сервера авторизации."}
      message="Попробуйте перезайти в систему."
    />
  );
}

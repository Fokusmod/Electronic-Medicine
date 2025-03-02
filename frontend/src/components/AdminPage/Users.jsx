import "./AdminPage.css";
import UserItem from "./adminComponents/UserItem";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import FindBox from "../FindBox/FindBox";

export default function Users() {
  const devApi = localStorage.getItem("host");
  const [isReady, setReady] = useState(false);
  const [users, setUsers] = useState(false);
  const [specialisation, setSpecialisation] = useState(null);

  let storage = null;
  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  useEffect(() => {
    getAllSpecialisation();
  }, []);

  async function getAllSpecialisation() {
    if (specialisation !== null) return;

    const response = await fetch(devApi + "/spec/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storage.getItem("access"),
      },
    });
    const responceBody = await response.json();
    if (response.status === 200) {
      setSpecialisation(responceBody);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const response = await fetch(devApi + "/getAllUsers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storage.getItem("access"),
      },
    });
    const responceBody = await response.json();
    if (response.status === 200) {
      setUsers(responceBody);
      setReady(true);
    }
  }

  function checkAdminRole(roles) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].title === "ADMIN") {
        return true;
      }
    }
    return false;
  }

  return (
    document.getElementById("pageAdmin") && (
      <>
        {createPortal(
          <div className="admin-section">
            <FindBox
              title="Пользователи сайта"
              placeholder="Найти пользователя"
            />
            <div className="emp-content">
              <div className="emp-content-box">
                {isReady &&
                  users.map(function (data, i) {
                    return (
                      <UserItem
                        key={i}
                        firstName={data.firstName}
                        lastName={data.lastName}
                        email={data.email}
                        position={data.roles[0].title}
                        approve="false"
                        id={data.id}
                        specs={specialisation}
                        admin={checkAdminRole(data.roles)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>,
          document.getElementById("pageAdmin")
        )}
      </>
    )
  );
}

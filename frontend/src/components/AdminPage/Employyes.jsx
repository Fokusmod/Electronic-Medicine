import { useEffect, useState } from "react";
import "./AdminPage.css";
import { createPortal } from "react-dom";
import FindBox from "../FindBox/FindBox";
import EmployyeItem from "./adminComponents/EmployyeItem";

export default function Employye() {
  const devApi = localStorage.getItem("host");
  const [isReady, setReady] = useState(false);
  const [content, setContent] = useState(null);
  const [specialisation, setSpecialisation] = useState(null);

  let storage = null;
  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  useEffect(() => {
    getAllSpecialist();
  }, []);

  async function getAllSpecialist() {
    const response = await fetch(devApi + "/staff/getAllStaff", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storage.getItem("access"),
      },
    });
    const responceBody = await response.json();
    if (response.status === 200) {
      setContent(responceBody);
      setReady(true);
    }
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
              title="Обслуживающий персонал сайта"
              placeholder="Найти сотрудника"
            />
            <div className="emp-content">
              <div className="emp-content-box">
                {isReady &&
                  content.map(function (data, i) {
                    return (
                      <EmployyeItem
                        key={i}
                        firstName={data.firstName}
                        lastName={data.lastName}
                        position={
                          data.specialities ? data.specialities[0].title : null
                        }
                        status={data.status}
                        id={data.id}
                        specs={specialisation}
                        roles={data.roles}
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

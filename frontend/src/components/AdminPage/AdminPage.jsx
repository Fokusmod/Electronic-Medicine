import { useEffect, useState } from "react";
import "./AdminPage.css";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminPage() {
  let location = useLocation();
  const [selected, setSelected] = useState("employyes");

  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <>
      <div id="pageAdmin" className="admin-head">
        <div className="admin-select-section">
          <Link
            to="employyes"
            onClick={() => setSelected("employyes")}
            className={
              selected === "employyes"
                ? "admin-select-btn admin-select-btn-active"
                : "admin-select-btn"
            }
          >
            Сотрудники
          </Link>
          <Link
            to="users"
            className={
              selected === "users"
                ? "admin-select-btn admin-select-btn-active"
                : "admin-select-btn"
            }
            onClick={() => setSelected("users")}
          >
            Пользователи
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

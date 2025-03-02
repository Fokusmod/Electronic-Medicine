import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  let storage = null;

  if (localStorage.getItem("roles") !== null) {
    storage = localStorage;
  } else if (sessionStorage.getItem("roles") !== null) {
    storage = sessionStorage;
  }

  let data = storage.getItem("roles");
  let currentRoles = data.split(",");
  let result = false;

  for (let i = 0; i < currentRoles.length; i++) {
    if (currentRoles[i] === "SPECIALIST") {
      result = true;
      break;
    }
  }

  return result ? <Outlet /> : <Navigate to="/error" replace="true" />;
}

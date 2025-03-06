import Header from "./components/Header/Header.jsx";
import CheckAndRefreshTokens from "./components/CheckExpirationToken/CheckAndRefreshTokens.jsx";

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Employyes from "./components/AdminPage/Employyes.jsx";
import Appointment from "./components/Appointment/Appointment.jsx";
import Login from "./components/Login/Login.jsx";
import Specialist from "./components/Specialist/Specialist.jsx";
import Reception from "./components/Reception/Reception.jsx";
import Head from "./components/Head/Head.jsx";
import AdminPage from "./components/AdminPage/AdminPage.jsx";
import Users from "./components/AdminPage/Users.jsx";
import SpecialistInfo from "./components/SpecialistInfo/SpecialistInfo.jsx";
import PrivateSpecialistRoute from "./PrivateSpecialistRoute.jsx";
import PrivateAdminRoute from "./PrivateAdminRoute.jsx";
import NotFoundPage from "./components/ErrorPage/NotFoundPage.jsx";
import CheckActivationCode from "./components/Login/CheckActivationCode.jsx";

export default function App() {
  /*   localStorage.setItem("host", "http://localhost:8080"); */
  localStorage.setItem("host", "http://90.156.158.203/api");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Head />} />
          <Route path="/head" element={<Head />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/specialist" element={<Specialist />} />
          <Route path="/specialist/info/:id" element={<SpecialistInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate" element={<CheckActivationCode />} />
          <Route path="/error" element={<NotFoundPage />} />
          <Route element={<PrivateAdminRoute />}>
            <Route path="/adminka" element={<AdminPage />}>
              <Route path="employyes" element={<Employyes />} />
              <Route path="users" element={<Users />} />
            </Route>ss
        </Routes>
        <Header />
        <CheckAndRefreshTokens />
      </BrowserRouter>
    </>
  );
}

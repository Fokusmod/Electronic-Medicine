import "./Specialist.css";
import SpecialistItem from "./SpecialistItem";
import Footer from "../Footer/Footer";
import AdminStaff from "./AdminStaff";
import ToTopBtn from "../Navigate-Btn/ToTopBtn";
import { useEffect, useState } from "react";
import FindBox from "../FindBox/FindBox";

export default function Specialist() {
  const devApi = localStorage.getItem("host");

  const [isReadySpecialist, setReadySpecialist] = useState("false");
  let [specialistData, setSpecialistData] = useState("");

  async function getSpecialist() {
    const response = await fetch(
      devApi + "/staff/getAllSpecialists/" + "SPECIALIST",
      {
        method: "GET",
      }
    );
    var responseBody = await response.json();
    if (response.status === 200) {
      setSpecialistData(responseBody);
      setReadySpecialist(true);
    } else {
    }
  }

  useEffect(() => {
    getSpecialist();
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="admin-staff-label">Сотрудники медицинского портала</div>
        <ToTopBtn />
        <div className="find-specialist-box">
          <FindBox
            title="Наши сотрудники"
            placeholder="Найти сотрудника"
            findType="SPECIALIST"
            defaultData={getSpecialist}
            setData={setSpecialistData}
          />
        </div>
        <div className="specialist-box">
          <div className="specialist-box-items">
            {isReadySpecialist &&
              specialistData !== "" &&
              specialistData.map(function (data) {
                if (data.photoUrl != null) {
                  return (
                    <SpecialistItem
                      id={data.id}
                      key={data.id}
                      fullname={data.firstName + " " + data.lastName}
                      position={data.specialities[0].title}
                      photo={data.photoUrl}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="admin-staff-sector">
        <div>
          <div className="admin-staff-label">Администрация портала</div>
        </div>
        <AdminStaff />
        <Footer />
      </div>
    </>
  );
}

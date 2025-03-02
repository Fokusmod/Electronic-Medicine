import "./Appointment.css";

import { useEffect, useRef, useState } from "react";

import ToTopBtn from "../Navigate-Btn/ToTopBtn";
import Footer from "../Footer/Footer";
import CustomDateSection from "./CustomDateSection";
import SelectProfileSpecialist from "./SelectProfileSpecialist";
import SelectSpecialist from "./SelectSpecialist";
import BackStep from "../Navigate-Btn/BackStep";
import Modal from "../Modal/Modal";
import { useLocation, useNavigate } from "react-router-dom";

export default function Appointment() {
  const styleOne = { top: "85px", left: "100px" };
  const styleTwo = { top: "-155px", left: "100px" };

  const navigation = useNavigate();
  const location = useLocation();

  const spec = useRef();
  const specialist = useRef();
  const date = useRef();

  const firstStep = useRef();
  const secondStep = useRef();
  const thirdStep = useRef();

  const [selectedSpec, setSelectedSpec] = useState(null);
  const [currentSpec, setCurrentSpec] = useState(false);
  const [openError, setOpenError] = useState(false);

  function closeModal() {
    setOpenError(false);
    navigation("/login");
  }

  let specialisation = null;
  if (localStorage.getItem("specialisation") !== null) {
    specialisation = localStorage.getItem("specialisation");
  }

  let username = null;
  if (sessionStorage.getItem("username") !== null) {
    username = sessionStorage.getItem("username");
  } else if (localStorage.getItem("username") !== null) {
    username = localStorage.getItem("username");
  }

  useEffect(() => {
    if (username === null) {
      setOpenError(true);
      localStorage.setItem("returnPath", location.pathname);
    }
  }, []);

  return (
    <>
      <ToTopBtn />
      <Modal
        open={openError}
        data={"Мы вас перенаправим на страницу авторизации."}
        onClose={closeModal}
        title={"Чтобы записаться на приём, нужно авторизоваться в системе"}
        message="Нажмите <OK> для продолжения."
      />
      <div className="appoint-head" id="modal">
        <div className="appoint-reserv">
          <div className="appoint-reserv-stage">
            <div ref={spec} className="stage-item">
              Направление
            </div>
            <div ref={specialist} className="stage-item hide">
              Специалист
            </div>
            <div ref={date} className="stage-item hide">
              Дата и время
            </div>
          </div>
          <div ref={firstStep} className="appoint-reserv-content">
            <SelectProfileSpecialist
              thisStage={spec}
              nextStage={specialist}
              firstStep={firstStep}
              nextStep={secondStep}
              setSpec={setSelectedSpec}
              defaultSpec={specialisation}
            />
          </div>

          <div ref={secondStep} className="appoint-reserv-content hide">
            <BackStep
              styled={styleOne}
              thisStage={specialist}
              thisSection={secondStep}
              prevStage={spec}
              prevSection={firstStep}
              removeStorage={true}
            />
            <SelectSpecialist
              thisStage={specialist}
              nextStage={date}
              thisSection={secondStep}
              nextSection={thirdStep}
              getSpec={selectedSpec}
              setCurrentSpec={setCurrentSpec}
            />
          </div>

          <div ref={thirdStep} className="appoint-reserv-content hide">
            <div className="appoint-reserv-title">Выберите дату посещения</div>
            <div className="about-date-time">
              Выберите дату и время. Доступное время отображает свободное время
              записи в выбраную вами дату. Время приёма с 10:00 до 18:00.
            </div>
            <BackStep
              styled={styleTwo}
              thisStage={date}
              thisSection={thirdStep}
              prevStage={specialist}
              prevSection={secondStep}
              removeStorage={false}
            />
            <CustomDateSection
              getSpec={selectedSpec}
              getCurrentSpec={currentSpec}
            />
          </div>
        </div>
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import "./Appointment.css";

let busyTimeSlot = [];
let timeSlot = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default function CustomDateSection(props) {
  const devApi = localStorage.getItem("host");

  const [specId, setSpecId] = useState(null);
  const [defaultDate, setDefaulDate] = useState(null);
  const [defaultTime, setDefaultTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [defaultDateValue, setDefaultDateValue] = useState(null);
  const [selectDate, setSelectDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [aviableTimeSlot, setAviableTimeSlot] = useState([]);

  const inputDate = useRef();
  const inputTime = useRef();
  const navigate = useNavigate();

  function checkDefaulDate() {
    let currentDateTime = new Date()
      .toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      })
      .split(",");

    if (currentDateTime[1] < timeSlot[timeSlot.length - 1]) {
      setDefaulDate(new Date());
    } else {
      let defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 1);
      setDefaulDate(defaultDate);
    }
  }

  useEffect(() => {
    checkDefaulDate();
  }, []);

  function defaultValueDate() {
    if (defaultDate !== null) {
      let date = defaultDate
        .toLocaleString("ru-RU", {
          timeZone: "Europe/Moscow",
        })
        .split(",")[0]
        .split(".");
      if (defaultDateValue !== date[2] + "-" + date[1] + "-" + date[0]) {
        setDefaultDateValue(date[2] + "-" + date[1] + "-" + date[0]);
        setSelectDate(date[2] + "-" + date[1] + "-" + date[0]);
      }
    }
  }

  useEffect(() => {
    defaultValueDate();
  }, [checkDefaulDate]);

  function defaultValueTime() {
    if (defaultDate !== null) {
      let defaultTime = null;
      let time = (defaultTime = defaultDate
        .toLocaleString("ru-RU", {
          timeZone: "Europe/Moscow",
        })
        .split(",")[1]
        .split(":"));
      defaultTime = parseInt(time[0]) + 1 + ":" + "00";
      if (defaultTime > timeSlot[timeSlot.length - 1]) {
        defaultTime = "10:00";
      }
      setDefaultTime(defaultTime);
    }
  }

  useEffect(() => {
    defaultValueTime();
  }, [defaultValueDate]);

  function setBusyDate(responce) {
    busyTimeSlot = [];
    if (responce === undefined) return;
    if (responce.length !== 0) {
      for (let i = 0; i < responce.length; i++) {
        busyTimeSlot.push(responce[i].date);
      }
    }
  }

  useEffect(() => {
    setAviableTime();
  }, [specId]);

  function setAviableTime() {
    if (aviableTimeSlot === null) return;
    let date = new Date() < new Date(selectDate) ? "10:00" : defaultTime;
    let aviableSlot = [];
    for (let i = 0; i < timeSlot.length; i++) {
      if (timeSlot[i] >= date) {
        if (!aviableSlot.includes(timeSlot[i])) {
          aviableSlot.push(timeSlot[i]);
        }
      }
    }
    for (let i = aviableSlot.length - 1; i >= 0; i--) {
      for (let y = busyTimeSlot.length - 1; y >= 0; y--) {
        if (aviableSlot[i] == busyTimeSlot[y]) {
          aviableSlot.splice(i, 1);
        }
      }
    }
    setAviableTimeSlot(aviableSlot);
  }

  useEffect(() => {
    getSpecialistReception();
  }, [props.getSpec, props.getCurrentSpec]);

  async function getSpecialistReception() {
    if (selectDate === null) return;
    let specialisation = props.getSpec;
    if (specialisation === null) return;
    let fullName =
      props.getCurrentSpec === false ? "false" : props.getCurrentSpec;
    if (selectDate == "") return;
    let date = new Date(selectDate);
    console.log(date);
    const response = await fetch(
      devApi +
        "/staff/getSpecialistReception/" +
        specialisation +
        "/" +
        fullName +
        "/" +
        date,
      {
        method: "GET",
      }
    );
    var responseBody = await response.json();
    if (response.status === 200) {
      setSpecId(responseBody.specId);
      setBusyDate(responseBody.list);
      return responseBody.list;
    } else {
      console.log(
        "Что пошло не так с загрузкой свободных слотов для записи на приём."
      );
    }
  }

  async function makeAnAppointment() {
    let requestBody = {
      id: specId,
      date: selectDate.toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      }),
      time: selectTime,
    };
    const response = await fetch(devApi + "/staff/setSpecialistReception", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    /* var responseBody = await response.json(); */
    if (response.status === 200) {
      setIsOpen(true);
      setModalData(
        "Время приёма: " + selectDate + " / " + inputTime.current.value
      );
      localStorage.removeItem("specImportant");
      localStorage.removeItem("specialisation");
    } else {
      console.log("Что пошло не так. Попробуйте заново.");
    }
  }

  function setNewDate() {
    setSelectDate(inputDate.current.value);
  }

  function changeTimeHandler() {
    setSelectTime(inputTime.current.value);
  }

  function closeModal() {
    setIsOpen(false);
    navigate("/");
  }

  function checkDateAndSetAviableTime() {
    if (specId !== null && aviableTimeSlot.length === 0) {
      let defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 1);
      setDefaulDate(defaultDate);
      setAviableTime();
    } else {
      if (defaultDate !== null) {
        if (aviableTimeSlot.length !== 0) {
          setSelectTime(aviableTimeSlot[0]);
        }
      }
    }
  }

  useEffect(() => {
    checkDateAndSetAviableTime();
  }, [aviableTimeSlot]);

  useEffect(() => {
    async function getData() {
      let data = await getSpecialistReception();
      setBusyDate(data);
      setAviableTime();
    }
    getData();
  }, [selectDate]);

  return (
    <>
      <div className="centered">
        <div className="centered-left">
          <input
            className="appoint-input"
            ref={inputDate}
            type="date"
            name="date"
            id="date"
            min={defaultDateValue}
            defaultValue={selectDate}
            onChange={setNewDate}
          />
        </div>
        <div className="centered-right">
          <input
            className="appoint-input"
            ref={inputTime}
            type="time"
            name="time"
            id="time"
            list="work-time"
            defaultValue={selectTime}
            onChange={changeTimeHandler}
          />
          <datalist id="work-time">
            {aviableTimeSlot !== null &&
              aviableTimeSlot.map((item, i) => {
                return <option key={i} value={item} />;
              })}
          </datalist>
        </div>
      </div>
      <div className="centered-end">
        <Button name="Записаться" func={makeAnAppointment} />
      </div>
      <Modal
        open={isOpen}
        data={modalData}
        onClose={closeModal}
        title="Вы были записаны на приём."
        message="Талон был отправлен вам на почту."
      />
    </>
  );
}

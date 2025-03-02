import { useEffect, useState } from "react";
import ToTopBtn from "../Navigate-Btn/ToTopBtn";
import ReactLoading from "react-loading";

import "./Reception.css";
import ReceptionItem from "./ReceptionItem";

export default function Reception() {
  const devApi = localStorage.getItem("host");

  const [specId, setSpecId] = useState(null);
  const [specContent, setSpecContent] = useState(null);
  const [specContentReady, setSpecContentReady] = useState(false);
  const [receptionContent, setReceptionContent] = useState(null);
  const [receptionContentReady, setReceptionContentReady] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  let storage = null;
  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  useEffect(() => {
    getReceptionSpecialist();
  }, []);

  async function getReceptionSpecialist() {
    const response = await fetch(
      devApi + "/staff/getSpecialist/" + storage.getItem("username"),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + storage.getItem("access"),
        },
      }
    );
    const responceBody = await response.json();
    if (response.status === 200) {
      setSpecContent(responceBody);
      setSpecId(responceBody.id);
      setSpecContentReady(true);
    }
  }

  useEffect(() => {
    defaultDate();
  }, [specContentReady]);

  function defaultDate() {
    let date = new Date()
      .toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      })
      .split(",")[0]
      .split(".");
    setCurrentDate(date[2] + "-" + date[1] + "-" + date[0]);
  }

  useEffect(() => {
    getReception();
  }, [currentDate, specContentReady]);

  async function getReception() {
    if (specContentReady === null || currentDate === null || specId === null)
      return;
    const response = await fetch(
      devApi +
        "/staff/getSpecialistReceptionByDate/" +
        specId +
        "/" +
        new Date(currentDate),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storage.getItem("access"),
        },
      }
    );
    const responceBody = await response.json();
    if (response.status === 200) {
      setReceptionContent(responceBody);
      setReceptionContentReady(true);
    }
  }

  function nextDay() {
    const date = new Date(currentDate);
    let nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    nextDate = nextDate
      .toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      })
      .split(",")[0]
      .split(".");
    setCurrentDate(nextDate[2] + "-" + nextDate[1] + "-" + nextDate[0]);
  }

  function prevDay() {
    const date = new Date(currentDate);
    let nextDate = new Date(date);
    nextDate.setDate(date.getDate() - 1);
    nextDate = nextDate
      .toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
      })
      .split(",")[0]
      .split(".");
    setCurrentDate(nextDate[2] + "-" + nextDate[1] + "-" + nextDate[0]);
  }

  function parseDateFormat(date) {
    let current = new Date(date);

    let options = {
      month: "long",
      day: "numeric",
      weekday: "long",
      timezone: "UTC",
    };
    return current.toLocaleString("ru", options);
  }

  return (
    <>
      <ToTopBtn />
      {specContentReady ? (
        <div className="reception-head">
          <div className="reception-navigate-date">
            <div className="doctor-name">
              {specContent.firstName + " " + specContent.lastName}
            </div>
            <div className="current-date">
              <button className="left-btn" onClick={prevDay}>
                &#10148;
              </button>
              <p>{parseDateFormat(currentDate)}</p>
              <button className="right-btn" onClick={nextDay}>
                &#10148;
              </button>
            </div>
            <div className="doctor-spec">
              {specContent.specialities[0].title}
            </div>
          </div>
          {receptionContentReady ? (
            <div className="reception-data">
              {receptionContent.list.length === 0 && (
                <div className="empty-data">Записей на текущую дату нет.</div>
              )}
              {receptionContent.list.map(function (data, i) {
                return (
                  <ReceptionItem
                    key={i}
                    name="Приём пациента"
                    timeSlot={data.date}
                  />
                );
              })}
            </div>
          ) : (
            <div className="loading-content">
              <ReactLoading
                type={"spin"}
                color={"silver"}
                height={50}
                width={50}
                className="margin-auth"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="loading-spinner">
          <ReactLoading
            type={"spin"}
            color={"silver"}
            height={50}
            width={50}
            className="margin-auth"
          />
        </div>
      )}
    </>
  );
}

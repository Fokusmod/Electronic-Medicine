import { useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import "./components.css";

export default function Section(props) {
  const devApi = localStorage.getItem("host");

  let storage = null;
  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  let dateMoscow = new Date().toLocaleDateString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  let dateMoscowPlusOneMonth = new Date();
  dateMoscowPlusOneMonth.setMonth(dateMoscowPlusOneMonth.getMonth() + 1);
  dateMoscowPlusOneMonth = dateMoscowPlusOneMonth.toLocaleDateString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  let date = dateMoscow.split(",")[0].split(".");
  let datePlusOneMonth = dateMoscowPlusOneMonth.split(",")[0].split(".");
  let currentDate = date[2] + "-" + date[1] + "-" + date[0];
  let currentDatePlusOneMonth =
    datePlusOneMonth[2] + "-" + datePlusOneMonth[1] + "-" + datePlusOneMonth[0];

  let from = useRef();
  let until = useRef();
  let selectSpec = useRef();
  let specialisation = useRef();
  let fromDate = null;
  let untilDate = null;

  function setFromDate() {
    fromDate = from.current.value;
  }
  function setUntilDate() {
    untilDate = until.current.value;
  }

  function resetDone() {
    specialisation.current.innerText = "";
  }

  function acceptVacation() {}

  async function setSpecialisation() {
    var text =
      selectSpec.current.options[selectSpec.current.selectedIndex].text;
    var id = props.id;
    const response = await fetch(
      devApi + "/spec/setSpecialisationUser/" + id + "/" + text,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storage.getItem("access"),
        },
      }
    );
    if (response.status === 200) {
      specialisation.current.innerText = "done!";
    } else {
      specialisation.current.innerText = "error...";
    }
  }

  async function setAdminRole() {
    const response = await fetch(devApi + "/staff/setAdminRole/" + props.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storage.getItem("access"),
      },
    });
    if (response.status !== 200) {
      console.log("Что то пошло не так");
    } else {
      window.location.reload();
    }
  }

  async function deleteAdminRole() {
    const response = await fetch(
      devApi + "/staff/deleteAdminRole/" + props.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storage.getItem("access"),
        },
      }
    );

    if (response.status !== 200) {
      console.log("Что то пошло не так");
    } else {
      window.location.reload();
    }
  }

  async function removeSpecialist() {
    const response = await fetch(
      devApi + "/staff/downgradeSpecialistToUser/" + props.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storage.getItem("access"),
        },
      }
    );
    if (response.status !== 200) {
      console.log("Что то пошло не так");
    } else {
      window.location.reload();
    }
  }

  return (
    <>
      <p className="section-title">Выберите нужные действия:</p>
      <div className="content-section ">
        <div className="left-side-section">
          <p className="section-title-name">Отпуск</p>
          <div className="rows-box">
            <p
              style={{
                marginLeft: "5%",
                paddingTop: "12px",
                color: "hsl(200, 85.2%, 15.9%)",
              }}
            >
              С:
            </p>
            <input
              ref={from}
              className="section-input"
              id="date"
              type="date"
              defaultValue={currentDate}
              onChange={setFromDate}
            />
            <p
              style={{
                color: "hsl(200, 85.2%, 15.9%)",
                paddingTop: "12px",
              }}
            >
              До:
            </p>
            <input
              ref={until}
              className="section-input"
              id="date"
              style={{ marginBottom: "30px" }}
              type="date"
              defaultValue={currentDatePlusOneMonth}
              onChange={setUntilDate}
            />
          </div>
          <Button name="Подтвердить" func={acceptVacation} />
        </div>
        <div className="middle-side-section">
          <div className="spec-section">
            <div className="section-title-name">Должность</div>
            <div ref={specialisation} className="done-section"></div>
          </div>

          <div className="middle-centered">
            <select
              ref={selectSpec}
              name="select-up"
              className="select-position"
              onChange={resetDone}
            >
              {props.specs.map(function (data, i) {
                return (
                  <option key={i} value="value1">
                    {data.title}
                  </option>
                );
              })}
            </select>
            <Button name="Назначить" func={setSpecialisation} />
          </div>
        </div>
        <div className="right-side-section">
          <p className="section-title-name">Прочее</p>
          {props.admin ? (
            <Button name="Убрать права" func={deleteAdminRole} />
          ) : (
            <Button name="Админ-права" func={setAdminRole} />
          )}
          <div className="section-line"></div>
          <Button name="Уволить" func={removeSpecialist} />
        </div>
      </div>
    </>
  );
}

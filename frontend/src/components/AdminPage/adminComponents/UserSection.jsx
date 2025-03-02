import { useRef } from "react";
import Button from "../../Button/Button";
import "./components.css";

export default function Section(props) {
  const devApi = localStorage.getItem("host");
  const selectSpec = useRef();
  const specialisation = useRef();

  let storage = null;
  if (sessionStorage.getItem("expire") !== null) {
    storage = sessionStorage;
  } else if (localStorage.getItem("expire") !== null) {
    storage = localStorage;
  }

  async function upgradeUserToSpecialist() {
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

  function resetDone() {
    specialisation.current.innerText = "";
  }

  return (
    <>
      <p className="section-title">Выберите нужные действия:</p>
      <div className="content-section ">
        <div className="left-side-section">
          <p className="section-title-name">Профиль</p>
          <div className="rows-box"></div>
          <Button name="Подтвердить пользователя" />
          <Button name="Посетить страницу" />
          <Button name="История болезни" />
        </div>
        <div className="middle-side-section">
          <div className="spec-section">
            <div className="section-title-name">Нанять на позицию</div>
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
            <Button name="Нанять" func={upgradeUserToSpecialist} />
          </div>
        </div>
        <div className="right-side-section">
          <p className="section-title-name">Прочее</p>
          {props.admin ? (
            <Button name="Убрать админ-права" func={deleteAdminRole} />
          ) : (
            <Button name="Админ-права" func={setAdminRole} />
          )}
          <div className="section-line"></div>
          <Button name="Исключить" />
        </div>
      </div>
    </>
  );
}

import "./Appointment.css";

import AppointSpesialistItem from "./AppointSpesialistItem";
import Button from "../Button/Button";

import { useState, useRef, useEffect } from "react";

export default function SelectSpecialist(props) {
  const devApi = localStorage.getItem("host");
  const specialistBox = useRef();
  const checkbox = useRef();
  const checkboxLabel = useRef();
  const nextStep = useRef();
  const notFoundDiv = useRef();
  const [isChecked, setIsChecked] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    getCurrentSpecialists();
  }, [props.getSpec]);

  async function getCurrentSpecialists() {
    if (props.getSpec == null) return;
    const response = await fetch(
      devApi + "/staff/getAllSpecialist/" + props.getSpec,
      {
        method: "GET",
      }
    );
    var responseBody = await response.json();
    if (response.status === 200) {
      if (responseBody.length == 0) {
        setNotFoundDiv();
        setContent(responseBody);
        if (!nextStep.current.classList.contains("hide")) {
          nextStep.current.classList.add("hide");
        }
        if (!checkbox.current.classList.contains("hide")) {
          checkbox.current.classList.add("hide");
        }
        if (!checkboxLabel.current.classList.contains("hide")) {
          checkboxLabel.current.classList.add("hide");
        }
      } else {
        removeNotFoundDiv();
        setContent(responseBody);
        if (nextStep.current.classList.contains("hide")) {
          nextStep.current.classList.remove("hide");
        }
        if (checkbox.current.classList.contains("hide")) {
          checkbox.current.classList.remove("hide");
        }
        if (checkboxLabel.current.classList.contains("hide")) {
          checkboxLabel.current.classList.remove("hide");
        }
      }
    } else {
      console.log("Что пошло не так с загрузкой специалистов.");
    }
  }

  function setNotFoundDiv() {
    notFoundDiv.current.classList.remove("hide");
  }

  function removeNotFoundDiv() {
    notFoundDiv.current.classList.add("hide");
  }

  useEffect(() => {
    if (localStorage.getItem("specImportant") !== "true") {
      specialistBox.current.nextSibling.checked = isChecked;
    } else {
      handleChange();
    }
  }, []);

  function handleChange() {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    if (isChecked === true) {
      if (!specialistBox.current.classList.contains("disabled")) {
        specialistBox.current.classList.add("disabled");
      }

      if (specialistBox.current.classList.contains("pointer")) {
        specialistBox.current.classList.remove("pointer");
      }

      if (nextStep.current.classList.contains("hide")) {
        nextStep.current.classList.remove("hide");
      }
    } else {
      if (specialistBox.current.classList.contains("disabled")) {
        specialistBox.current.classList.remove("disabled");
      }

      if (!specialistBox.current.classList.contains("pointer")) {
        specialistBox.current.classList.add("pointer");
      }

      if (!nextStep.current.classList.contains("hide")) {
        nextStep.current.classList.add("hide");
      }
    }
  }, [isChecked]);

  function stepTwo(
    isChecked,
    specialist,
    thisStage,
    nextStage,
    thisSection,
    nextSection
  ) {
    if (isChecked !== false) return;
    thisStage.current.classList.add("complete");
    nextStage.current.classList.remove("hide");
    thisSection.current.classList.add("hide");
    nextSection.current.classList.remove("hide");
    props.setCurrentSpec(specialist);
  }

  function nextStepButton(thisStage, nextStage, thisSection, nextSection) {
    thisStage.current.classList.add("complete");
    nextStage.current.classList.remove("hide");
    thisSection.current.classList.add("hide");
    nextSection.current.classList.remove("hide");
    props.setCurrentSpec(false);
  }

  return (
    <>
      <div className="appoint-reserv-title">Выберите Специалиста</div>
      <div ref={specialistBox} className="specialist-content">
        {content !== null &&
          content.map(function (data, i) {
            return (
              <AppointSpesialistItem
                key={i}
                name={data.firstName + " " + data.lastName}
                position={data.specialities[0].title}
                photo={data.photoUrl}
                func={() =>
                  stepTwo(
                    isChecked,
                    data.firstName + " " + data.lastName,
                    props.thisStage,
                    props.nextStage,
                    props.thisSection,
                    props.nextSection
                  )
                }
              />
            );
          })}

        <div ref={notFoundDiv} className="not-have-this-spec hide">
          На данный момент специалист недоступен на сервисе.
        </div>
      </div>
      <input
        ref={checkbox}
        className="appoint-checkbox"
        type="checkbox"
        id="important"
        name="important"
        onChange={handleChange}
      />
      <label ref={checkboxLabel} htmlFor="important" className="label">
        Специалист не важен
      </label>
      <div ref={nextStep} className="appoint-column">
        <Button
          name="Следующий шаг"
          func={() =>
            nextStepButton(
              props.thisStage,
              props.nextStage,
              props.thisSection,
              props.nextSection
            )
          }
        />
      </div>
    </>
  );
}

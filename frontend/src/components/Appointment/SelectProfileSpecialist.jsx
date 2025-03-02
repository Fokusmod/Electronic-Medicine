import { useEffect, useState } from "react";

export default function SelectProfileSpecialist(props) {
  const devApi = localStorage.getItem("host");
  const [content, setContent] = useState(null);

  function stepOne(specName, thisStage, nextStage, firstStep, nextStep) {
    thisStage.current.classList.add("complete");
    nextStage.current.classList.remove("hide");
    firstStep.current.classList.add("hide");
    nextStep.current.classList.remove("hide");
    props.setSpec(specName);
  }

  async function getSpecialisation() {
    const response = await fetch(devApi + "/spec/all", {
      method: "GET",
    });
    var responseBody = await response.json();
    if (response.status === 200) {
      setContent(responseBody);
    } else {
      console.log("Что пошло не так с загрузкой специалистов.");
    }
  }

  useEffect(() => {
    getSpecialisation();
  }, []);

  useEffect(() => {
    if (props.defaultSpec !== null) {
      stepOne(
        props.defaultSpec,
        props.thisStage,
        props.nextStage,
        props.firstStep,
        props.nextStep
      );
    }
  }, [content]);

  return (
    <>
      <div className="appoint-reserv-title">Выберите направление</div>
      <div className="appoint-reserv-data">
        {content !== null &&
          content.map(function (data, i) {
            return (
              <div
                key={i}
                className="data-item"
                onClick={() =>
                  stepOne(
                    data.title,
                    props.thisStage,
                    props.nextStage,
                    props.firstStep,
                    props.nextStep
                  )
                }
              >
                {data.title}
              </div>
            );
          })}
      </div>
    </>
  );
}

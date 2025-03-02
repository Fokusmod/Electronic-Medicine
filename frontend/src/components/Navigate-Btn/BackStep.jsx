export default function BackStep(props) {
  function returnBack(stage, section, prevStage, prevSection) {
    if (props.removeStorage === true) {
      localStorage.removeItem("specImportant");
      localStorage.removeItem("specialisation");
      stage.current.classList.add("hide");
      section.current.classList.add("hide");
      prevStage.current.classList.remove("complete");
      prevSection.current.classList.remove("hide");
    } else {
      stage.current.classList.add("hide");
      section.current.classList.add("hide");
      prevStage.current.classList.remove("complete");
      prevSection.current.classList.remove("hide");
    }
  }

  return (
    <>
      <div
        className="back-step"
        style={props.styled}
        onClick={() =>
          returnBack(
            props.thisStage,
            props.thisSection,
            props.prevStage,
            props.prevSection
          )
        }
      >
        Предыдущий шаг
      </div>
    </>
  );
}

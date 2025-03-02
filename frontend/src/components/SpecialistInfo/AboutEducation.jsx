import "./SpecialistInfo.css";

export default function AboutEducation(props) {
  let education = props.content;

  return (
    <>
      {education !== false &&
        education.map(function (data, i) {
          return (
            <div
              key={i}
              className="about-education-box"
              style={{ marginLeft: "0px" }}
            >
              <div className="about-item-title">
                Профессиональное образование / Повышение квалификации
              </div>
              <div className="about-item-data">{data.title}</div>
            </div>
          );
        })}
    </>
  );
}

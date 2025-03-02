import "./components.css";
import EmployyeSection from "./EmployyeSection";

export default function SectionItem(props) {
  function showSection(id) {
    let section = document.getElementById(id);
    let item = document.getElementById("item-" + id);

    if (section.classList.contains("visible-on")) {
      section.classList.remove("visible-on");
      item.classList.remove("emp-selected");
    } else {
      revomeAll();
      section.classList.add("visible-on");
      item.classList.add("emp-selected");
    }
  }

  function revomeAll() {
    let allSection = document.getElementsByClassName("emp-section");
    let allItems = document.getElementsByClassName("emp-item");
    for (let i = 0; i < allSection.length; i++) {
      allSection[i].classList.remove("visible-on");
      allItems[i].classList.remove("emp-selected");
    }
  }

  return (
    <>
      <div
        id={"item-" + props.id}
        className="emp-item"
        onClick={() => {
          showSection(props.id);
        }}
      >
        <div className="left-sector">
          <div className="name-data">
            {props.firstName + " " + props.lastName}
          </div>
        </div>
        <div className="right-sector">
          {props.roles.map(function (data, i) {
            if (data.title === "ADMIN") {
              return (
                <div key={i} className="emp-data">
                  {data.title}
                </div>
              );
            }
          })}
          <div className="emp-data">{props.position}</div>
          <div className="emp-data">{props.status}</div>
        </div>
      </div>
      <div className="emp-section" id={props.id}>
        <EmployyeSection
          specs={props.specs}
          id={props.id}
          admin={props.admin}
        />
      </div>
    </>
  );
}

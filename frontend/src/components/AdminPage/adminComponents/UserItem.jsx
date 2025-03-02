import "./components.css";
import UserSection from "./UserSection";

export default function UserItem(props) {
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
        <div className="left-sector-user">
          <div className="usr-data">{props.firstName}</div>
          <div className="usr-data">{props.lastName}</div>
          <div className="usr-data">{props.email}</div>
        </div>
        <div className="right-sector-user">
          <div className="usr-data">{props.approve}</div>
          <div className="usr-data">{props.position}</div>
        </div>
      </div>
      <div className="emp-section" id={props.id}>
        <UserSection specs={props.specs} id={props.id} admin={props.admin} />
      </div>
    </>
  );
}

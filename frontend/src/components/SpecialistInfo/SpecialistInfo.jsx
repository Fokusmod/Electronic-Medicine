import BackBtnHiddenOnScrollBottom from "../Navigate-Btn/BackBtnHiddenOnScrollBottom";
import ToTopBtn from "../Navigate-Btn/ToTopBtn";
import Footer from "../Footer/Footer";
import "./SpecialistInfo.css";

import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import AboutSpecialist from "./AboutSpesialist";
import AboutEducation from "./AboutEducation";
import AboutReview from "./AboutReview";
import SendReview from "./SendReview";

export default function SpecialistInfo() {
  const devApi = localStorage.getItem("host");
  const [content, setContent] = useState("");
  const [ready, setReady] = useState(false);
  const [activeBtn, setActiveBtn] = useState("about");

  const idParam = useParams().id;
  const about = useRef();
  const review = useRef();

  async function getSpecInfo() {
    const response = await fetch(
      devApi + "/staff/getSpecialistInfo/" + idParam,
      {
        method: "GET",
      }
    );
    var responseBody = await response.json();
    if (response.status === 200) {
      setContent(responseBody);
      setReady(true);
    } else {
      setReady(false);
    }
  }

  useEffect(() => {
    getSpecInfo();
  }, []);

  function showBlock(active) {
    setActiveBtn(active);
    if (active === "about") {
      about.current.classList.add("visible");
      review.current.classList.remove("visible");
    } else {
      review.current.classList.add("visible");
      about.current.classList.remove("visible");
    }
  }

  return (
    <>
      <BackBtnHiddenOnScrollBottom />
      <ToTopBtn />
      <div className="info-head">
        <AboutSpecialist
          content={ready && content}
          spec={content && content.specialities[0].title}
        />
        <div className="about-end" id="about-end">
          <div className="select-box">
            <div
              className={
                activeBtn === "about"
                  ? "select-box-bth active"
                  : "select-box-bth"
              }
              onClick={() => showBlock("about")}
            >
              О враче
            </div>
            <div
              className={
                activeBtn === "review"
                  ? "select-box-bth active"
                  : "select-box-bth"
              }
              onClick={() => showBlock("review")}
            >
              Отзывы
            </div>
          </div>
          <div ref={about} className="about-hidden-info visible">
            <AboutEducation content={ready && content.educations} />
          </div>
          <div ref={review} className="hidden-info-review">
            <AboutReview content={ready && content.reviews} />
          </div>
          <div className="send-review">
            <SendReview id={idParam} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

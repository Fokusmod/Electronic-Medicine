import Footer from "../Footer/Footer";
import AboutUs from "./AboutUs";
import HeadDescription from "./HeadDescription";
import Slider from "./Slider";
import UsefulLinks from "./UsefulLinks";
import ToTopBtn from "../Navigate-Btn/ToTopBtn";

export default function Head() {
  return (
    <>
      <div id="modal"></div>
      <div className="head">
        <div className="head-content">
          <ToTopBtn />
          <HeadDescription />
          <Slider />
          <AboutUs />
          <UsefulLinks />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default function AboutUs() {
  let registration = random(12456, 34500);
  let servises = random(4000, 7000);
  let employees = random(20, 60);
  let diagnoses = random(4000, 7000);

  function random(minValue, maxValue) {
    let min = Math.ceil(minValue);
    let max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <>
      <div className="about-us-div">
        <div className="infoHead">О нас в цифрах</div>
        <div className="about">
          <div className="about-item">
            <div className="about-count">{registration}</div>
            <div className="about-description">
              Регистраций пользователей на нашей платформе
            </div>
          </div>
          <div className="about-item">
            <div className="about-count">{servises}</div>
            <div className="about-description">
              Оказанных медицинских услуг, в том числе проведённых консультаций
            </div>
          </div>
          <div className="about-item">
            <div className="about-count">{employees}</div>
            <div className="about-description">
              Медицинских сотрудников оказывающих качественные услуги
            </div>
          </div>
          <div className="about-item">
            <div className="about-count">{diagnoses}</div>
            <div className="about-description">
              Поставлено достоверных диагнозов
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

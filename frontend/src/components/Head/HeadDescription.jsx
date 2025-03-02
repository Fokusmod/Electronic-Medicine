import { description } from "/src/components/Head/dataHead.js";

export default function HeadDescription() {
  return (
    <>
      <div className="info">
        <div className="infoHead">{description.title}</div>
        <p className="infoHeadDescription">{description.description}</p>
      </div>
    </>
  );
}

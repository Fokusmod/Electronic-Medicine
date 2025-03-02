import "./SpecialistInfo.css";

export default function AboutReview(props) {
  let review = props.content;
  return (
    <>
      {review !== false &&
        review !== undefined &&
        review.map(function (data, i) {
          return (
            <div key={i} className="review-item">
              <div className="review-row">
                <div className="review-left">
                  <div className="review-title">{data.author}</div>
                  <div className="review-title"></div>
                </div>
              </div>
              <div className="autor-review">{data.message}</div>
            </div>
          );
        })}
    </>
  );
}

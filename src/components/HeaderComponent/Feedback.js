import React from "react";
import { feedback } from "../../assets/imageFiles";
import "./Feedback.scss";
import StarRatingComponent from "react-star-rating-component";

export default function FeedbackDetails(props) {
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState();

  const submitFeedback = () => {
    const feedbackObj = {
      rating,
      text
    };
    props.submitUserFeedback(feedbackObj);
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-4">
      {!showFeedback && (
        <div
          className="d-flex align-items-center"
          onClick={() => setShowFeedback(true)}
        >
          <img src={feedback} alt="icons" className="icons-30" />
          <div className="ml-2">Give Feedback</div>
        </div>
      )}
      {showFeedback && (
        <div className="w-100">
          <textarea
            type="textarea"
            rows="4"
            className="form-control"
            placeholder="Please provide your feedback comments"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={nextValue => {
                  setRating(nextValue);
                }}
              />
            </div>
            <button
              className="animated-button float-right mt-2"
              onClick={() => submitFeedback()}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

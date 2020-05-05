import React from "react";
import { contactUs } from "../../assets/imageFiles";

export default function Cancellation(props) {
  const [showCancelDetails, setShowCancelDetails] = React.useState(false);

  return (
    <div className="d-flex align-items-center justify-content-center mt-4">
      {!showCancelDetails && (
        <div
          className="d-flex align-items-center"
          onClick={() => setShowCancelDetails(true)}
        >
          <img src={contactUs} alt="icons" className="icons-30" />
          <div className="ml-2">Request Cancellation</div>
        </div>
      )}
      {showCancelDetails && (
        <div className="w-100">
          <textarea
            type="textarea"
            rows="4"
            className="form-control"
            placeholder="Please mention your reason for cancelling the booking"
          ></textarea>
          <button
            className="animated-button float-right mt-2"
            onClick={() => props.cancel()}
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
}

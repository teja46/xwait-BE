import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./DisplayStoreFeedback.scss";
import getStoreReview from "../../dbCalls/getStoreFeedback";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
import { userLogo, backIcon } from "../../assets/imageFiles";

export default function DisplayStoreFeedback(props) {
  const [feedbackData, setFeedbackData] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    getStoreReview(props.storeDetails.id)
      .then(res => {
        setLoader(false);
        setFeedbackData(res.data);
      })
      .catch(err => {
        alert("Something went wrong");
      });
  }, [props.storeDetails.id]);

  return (
    <>
      {props.showReviews && (
        <Modal
          show={props.showReviews}
          onHide={() => props.hide()}
          className="store-reviews"
          id="store-reviews-show"
          backdropClassName="store-reviews-backdrop"
        >
          <Modal.Header>
            <Modal.Title>
              <img
                src={backIcon}
                className="back-icon"
                alt="back"
                onClick={() => props.hide()}
              />
              {props.storeDetails.name} Reviews
            </Modal.Title>
          </Modal.Header>
          <LoadingOverlay active={loader} spinner>
            <Modal.Body>
              <div className="bg-white br-10 p-4">
                {feedbackData &&
                  feedbackData.map(({ name, date, feedback, photoURL }) => (
                    <div className="feedback-card d-flex">
                      <div className="user-pic mr-2">
                        <img
                          src={
                            photoURL && photoURL.length ? photoURL : userLogo
                          }
                          className="user-img"
                          alt="user-pic"
                        />
                      </div>
                      <div>
                        <div className="reviewer-name">{name}</div>
                        <div className="reviewed-date">
                          {moment(date).fromNow()}
                        </div>
                        <div className="review">{feedback}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </Modal.Body>
          </LoadingOverlay>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.hide()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

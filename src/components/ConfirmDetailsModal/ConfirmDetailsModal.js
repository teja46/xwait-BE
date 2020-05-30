import React from "react";
import { Modal, Form } from "react-bootstrap";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import { backIcon, timeIcon, locationIcon } from "../../assets/imageFiles";
import distance from "../../utils/distance";
import checkAuthStatus from "../../dbCalls/checkAuthStatus";
import phoneSingup from "../../dbCalls/phoneNumberSignup";
import firebase from "firebase";

export default function ConfirmDetailsModal(props) {
  //   const [serviceDetails, setServiceDetails] = React.useState();
  const [loader, setLoader] = React.useState(props.loader);
  const [userDetails, setUserDetails] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [number, setNumber] = React.useState("+91");

  React.useState(() => {
    checkAuthStatus().then((res) => {
      if (res) {
        let user = {
          phoneNumber: res.phoneNumber,
          uid: res.uid,
        };
        setUserDetails(user);
        setNumber(res.phoneNumber);
        setIsLoggedIn(true);
      }
    });
  }, []);

  const login = () => {
    setLoader(true);
    let recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptchaVerifier)
      .then(function (res) {
        setLoader(false);
        let code = prompt("Plase enter OTP");
        res
          .confirm(code)
          .then(function (result) {
            setLoader(true);
            const userDetails = {
              phoneNumber: result.user.phoneNumber,
              uid: result.user.uid,
            };
            const messaging = firebase.messaging();
            messaging
              .requestPermission()
              .then(() => {
                return messaging.getToken();
              })
              .then((token) => {
                userDetails.token = token;
              })
              .catch((err) => {
                console.log(err);
              });
            setUserDetails(userDetails);
            return phoneSingup(userDetails);
          })
          .then((res) => {
            setLoader(false);
            setIsLoggedIn(true);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      show={props.showConfirmation}
      rootClose={true}
      id="show-confirmation-show"
      onHide={() => props.hideConfirmation(false)}
      className="show-confirmation-modal"
      backdropClassName="show-confirmation-backdrop"
      centered
    >
      <LoadingOverlay active={props.loader} spinner>
        <div className="confirmation d-flex flex-column">
          <div className="confirmation-details d-flex flex-column">
            <Modal.Header>
              <img
                src={backIcon}
                className="back-icon"
                alt="back"
                onClick={() => props.hideConfirmation(false)}
              />
              <Modal.Title>Confirm your booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="confirmation-content p-4 br-10">
                <div className="super-market-details d-flex align-items-start">
                  <div className="image-section">
                    <img
                      src={props.storeDetails.storeImage}
                      className="supermarket-logo store-img-icon"
                      alt="market-im"
                    />
                  </div>
                  <div className="store-address pr-0 mr-0 ml-2">
                    <div className="super-market-name">
                      {props.storeDetails.name}
                    </div>
                    <div className="super-market-location">
                      {props.storeDetails.storeAddress}
                    </div>
                    <div className="d-flex align-items-center justify-content-start mt-2">
                      <div className="mr-4">
                        <img
                          src={locationIcon}
                          alt="icons"
                          className="icons-15"
                        />
                        <span className="fs-12 ml-2">
                          {props.userLocation.latitude
                            ? distance(
                                props.userLocation.latitude,
                                props.userLocation.longitude,
                                props.storeDetails.latitude,
                                props.storeDetails.longitude
                              )
                            : "N/A"}{" "}
                          Km
                        </span>
                      </div>
                      <div>
                        <img src={timeIcon} alt="icons" className="icons-15" />
                        <span className="fs-12 ml-2">
                          {props.storeDetails.startTime} -{" "}
                          {props.storeDetails.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="date-time">
                  <div className="d-flex align-items-stretch justify-content-between mt-4 pt-2  pb-2 bt-grey bb-grey">
                    <div className="text-left w-50">
                      <div className="fs-14 dark-grey">SELECTED SERVICE</div>
                      <div className="fs-14 font-weight-bold">
                        {props.service.serviceDetails.serviceType}
                      </div>
                      <div className="fs-14 font-weight-bold">
                        &#8377; {props.service.serviceDetails.bookingPrice}
                      </div>
                    </div>
                    <div className="b-grey"></div>
                    <div className="w-50 ml-4 pl-2">
                      <div className="fs-14 dark-grey">SELECTED SLOT</div>
                      <div className="fs-14 font-weight-bold">
                        {moment(props.selectedSlot.data.slotDate).format(
                          "Do, MMMM YYYY"
                        )}
                      </div>
                      <div className="fs-14 font-weight-bold">
                        {moment(props.selectedSlot.data.slotTime).format(
                          "hh:mm a"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!isLoggedIn && (
                  <div>
                    <div className="mb-4">
                      Please login to confirm your booking
                    </div>
                    <Form>
                      <Form.Group controlId="formNumber">
                        <Form.Control
                          type="text"
                          placeholder="Your Phone Number"
                          value={number}
                          onChange={(e) =>
                            e.target.value.length < 3
                              ? setNumber("+91")
                              : setNumber(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Form>

                    <div id="recaptcha-container"></div>
                    <div className="mt-4 d-flex justify-content-end">
                      <button
                        className="animated-button"
                        onClick={() => login()}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
                {isLoggedIn && (
                  <>
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          //   value={userName}
                          //   onChange={(e) => setUserName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formNumber">
                        <Form.Control
                          type="text"
                          placeholder="Your Phone Number"
                          value={number}
                          disabled
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formInstructions">
                        <Form.Control
                          as="textarea"
                          rows="3"
                          maxLength={120}
                          placeholder="Any special Instructions to store?"
                          //   onChange={(e) => setInstructions(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                    <div className="confirm-action d-flex align-items-center justify-content-between">
                      <div className="fs-12">
                        By clicking on confirm booking you accept our terms and
                        conditions.
                      </div>
                      <button
                        className="animated-button"
                        onClick={() =>
                          props.confirmBooking(
                            props.selectedSlot,
                            props.storeDetails,
                            userDetails
                          )
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Modal.Body>
          </div>
        </div>
      </LoadingOverlay>
    </Modal>
  );
}

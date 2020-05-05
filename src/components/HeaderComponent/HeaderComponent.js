import React from "react";
import xWaitLogo from "../../assets/images/xwaitblack-logo.png";
import userLogo from "../../assets/images/user-icon.png";
import "./HeaderComponent.scss";
import { Overlay, Button, Modal, Nav } from "react-bootstrap";
import getBookedSlots from "../../dbCalls/getBookedSlots";
import moment from "moment";
// import redeemBooking from "../../dbCalls/redeemBooking";
import { sortSlotBookingDetails } from "../../utils/utils";
import cancelBooking from "../../dbCalls/cancelBooking";
import submitFeedback from "../../dbCalls/submitFeedback";
import LoadingOverlay from "react-loading-overlay";
import Cancellation from "./Cancellation";
import Feedback from "./Feedback";
import ContactUs from "../ContactUs/ContactUs";
import getDistance from "../../utils/distance";

import {
  locationIcon,
  timeIcon,
  backIcon,
  logoutIcon,
  bookingsIcon,
  contactUs
} from "../../assets/imageFiles";
// import data from "../../data/pincodes.json";
import "./SelectSearch.scss";
// import SelectSearch from "react-select-search";

function HeaderComponent(props) {
  console.log(props);
  const userMenu = React.useRef(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showBookings, setShowBookings] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [bookings, setBookings] = React.useState();
  const [showContactUs, setShowContactUs] = React.useState(false);
  const [bookingType, setBookingType] = React.useState("Current");

  React.useState(() => {}, []);
  const getBookings = type => {
    setBookingType(type);
    setLoader(true);
    setShowBookings(true);
    window.history.pushState(
      { page: "showMyBookingModal" },
      "title 1",
      "?page=1"
    );
    getBookedSlots(props.userId, type)
      .then(res => {
        const sortedDetails = sortSlotBookingDetails(res.data);
        setLoader(false);
        setBookings(sortedDetails);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };

  const cancel = booking => {
    setLoader(true);
    cancelBooking(booking)
      .then(res => {
        setLoader(false);
        alert("Booking Cancelled");
        setShowBookings(false);
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });
  };
  const submitUserFeedback = (booking, feedbackDetails) => {
    const feedbackObj = {
      name: props.userDetails.name,
      email: props.userDetails.email,
      feedback: feedbackDetails.text,
      storeId: booking.storeId,
      bookingId: booking.id,
      rating: feedbackDetails.rating,
      photoURL: props.userDetails.photoURL
    };
    setLoader(true);
    submitFeedback(feedbackObj)
      .then(res => {
        setLoader(false);
        alert("Feedback submitted successfully");
        setShowBookings(false);
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });
  };

  return (
    <div className=" d-flex align-items-center justify-content-between container">
      <div className="  d-flex align-items-center">
        <img src={xWaitLogo} alt="x-wait-img" className="x-wait-logo" />
        {/* <SelectSearch
          options={data}
          onChange={value => localStorage.setItem("value", value)}
          defaultValue={localStorage.getItem("value")}
          name="language"
          value={localStorage.getItem("value")}
          placeholder="Area"
          search={true}
        /> */}
      </div>
      <div className="d-flex align-items-center">
        <img
          src={bookingsIcon}
          alt="bookings"
          className="my-bookings mr-3"
          onClick={() => getBookings("Current")}
        />
        <img
          src={props.userDetails ? props.userDetails.photoURL : userLogo}
          alt="user"
          className="user-logo"
          ref={userMenu}
          onClick={() => setShowOverlay(true)}
        />
      </div>
      <Overlay
        target={userMenu.current}
        show={showOverlay}
        rootClose={true}
        onHide={() => setShowOverlay(false)}
        placement="bottom"
      >
        <div className="user-menu pl-3 pr-4 pb-2 pt-2">
          <div>
            <img src={bookingsIcon} alt="icons" className="icons" />
            <Button
              variant="link"
              onClick={() => {
                setShowOverlay(false);
                getBookings("Current");
              }}
            >
              My Bookings
            </Button>
          </div>
          <div>
            <img src={contactUs} alt="icons" className="icons" />
            <Button
              variant="link"
              onClick={() => {
                setShowOverlay(false);
                setShowContactUs(true);
              }}
            >
              Contact Us
            </Button>
          </div>
          <div>
            <img src={logoutIcon} alt="icons" className="icons" />
            <Button variant="link" onClick={() => props.logout()}>
              Logout
            </Button>
          </div>
        </div>
      </Overlay>
      <Modal
        show={showBookings}
        rootClose={true}
        id="bookings-modal-show"
        onHide={() => setShowBookings(false)}
        centered
        className="bookings-modal"
      >
        <LoadingOverlay active={loader} spinner>
          <Modal.Header>
            <img
              src={backIcon}
              className="back-icon"
              alt="back"
              onClick={() => setShowBookings(false)}
            />
            <Modal.Title>Your Bookings</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="confirmation d-flex flex-column br-10">
              <div className="tabs-pane mt-2">
                <Nav justify variant="tabs" defaultActiveKey="/current">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="/current"
                      className="font-weight-bold"
                      onClick={() => getBookings("Current")}
                    >
                      Current Bookings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="/history"
                      className="font-weight-bold"
                      onClick={() => getBookings("History")}
                    >
                      Past Bookings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="confirmation-details d-flex flex-column pl-3 pr-3 pt-0 mt-0">
                <div>
                  {bookings && !bookings.length && (
                    <div>Sorry!! You don't have any items booked</div>
                  )}
                  {bookings &&
                    bookings.map((booking, id) => (
                      <div className="booking-card b-white br-10 p-4 mb-4 mt-3">
                        <div className="d-flex">
                          <div>
                            <img
                              src={booking.storeImage}
                              alt="icons"
                              className="img-icon-std store-img-icon"
                            />
                          </div>
                          <div className="ml-2">
                            <div className="fs-16 font-weight-bold">
                              {booking.storeName}
                            </div>
                            <div className="fs-14">{booking.storeAddress}</div>
                            <div className="fs-12">
                              <img
                                src={locationIcon}
                                alt="rating"
                                className="icons-15 mr-2"
                              />{" "}
                              <span className="ratingDigit mr-4">
                                {props.userLocation.latitude
                                  ? getDistance(
                                      props.userLocation.latitude,
                                      props.userLocation.longitude,
                                      booking.storeLatitude,
                                      booking.storeLongitude
                                    )
                                  : "N/A"}{" "}
                                km
                              </span>
                              <img
                                src={timeIcon}
                                alt="rating"
                                className="icons-15 mr-2"
                              />
                              <span className="timing">
                                {booking.startTime} - {booking.endTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-stretch justify-content-between bt-grey bb-grey pt-4 pb-4 mt-4">
                          <div className="w-50">
                            <div className="dark-grey">Selected Service</div>
                            <div className="fs-14 font-weight-bold">
                              {booking.serviceType}
                            </div>
                            <div className="fs-14 font-weight-bold">
                              &#8377; {booking.servicePrice}
                            </div>
                          </div>
                          <div className="b-grey"></div>
                          <div className="w-50 ml-4 pl-2">
                            <div className="dark-grey">Selected Slot</div>
                            <div className="fs-14 font-weight-bold">
                              {moment(booking.slotDate).format("Do, MMMM YYYY")}
                            </div>
                            <div className="fs-14 font-weight-bold">
                              {moment(booking.slotTime).format("hh:mm a")}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-stretch justify-content-between bb-grey pb-4 mt-4">
                          <div className="w-50">
                            <div className="dark-grey">Booking ID</div>
                            <div className="fs-14 font-weight-bold">
                              {booking.bookingId}
                            </div>
                          </div>
                          <div className="b-grey"></div>
                          <div className="w-50 ml-4 pl-2">
                            <div className="dark-grey">Booking Status</div>
                            <div className="fs-14 font-weight-bold">
                              {booking.bookingStatus}
                            </div>
                          </div>
                        </div>
                        <div>
                          {bookingType === "Current" && (
                            <Cancellation cancel={() => cancel(booking)} />
                          )}
                          {bookingType === "History" && (
                            <Feedback
                              submitUserFeedback={feedbackObj =>
                                submitUserFeedback(booking, feedbackObj)
                              }
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Modal.Body>
        </LoadingOverlay>
      </Modal>
      {showContactUs && (
        <ContactUs
          show={showContactUs}
          userDetails={props.userDetails}
          onHide={() => setShowContactUs(false)}
        />
      )}
    </div>
  );
}

export default HeaderComponent;

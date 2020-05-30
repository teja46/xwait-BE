import React from "react";
import { Modal, Form } from "react-bootstrap";
import "./SlotBookingModal.scss";
import DatePicker from "react-horizontal-datepicker";
import getSlots from "../../dbCalls/getSlots";
import confirmSlot from "../../dbCalls/confirmSlot";
import checkAuthStatus from "../../dbCalls/checkAuthStatus";
import { backIcon, locationIcon, timeIcon } from "../../assets/imageFiles";
import ConfirmDetailsModal from "../ConfirmDetailsModal/ConfirmDetailsModal";
import moment from "moment";
import { sortSlotDetails } from "../../utils/utils";
import LoadingOverlay from "react-loading-overlay";
import distance from "../../utils/distance";
import "./datePicker.scss";

function SlotBookingModal(props) {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [slotDetails, setSlotDetails] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState();
  const [loader, setLoader] = React.useState(true);
  const [number, setNumber] = React.useState();
  const [instructions, setInstructions] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState(
    props.userDetails ? props.userDetails.name : ""
  );
  const [userEmail, setUserEmail] = React.useState(
    props.userDetails ? props.userDetails.email : ""
  );

  React.useEffect(() => {
    console.log(props);
    checkAuthStatus().then((res) => {
      console.log(res);
      if (res) {
        setIsLoggedIn(true);
      }
    });
  }, [props]);

  const selectedDay = (val) => {
    setLoader(true);
    getSlots(props.storeDetails.id, val.toDateString(), props.service.serviceId)
      .then((slots) => {
        const slotData = sortSlotDetails(slots.data.slots);
        setSlotDetails(slotData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmBooking = (slotData, storeDetails) => {
    setLoader(true);
    const slotDetails = {
      slotId: slotData.slotId,
      slotTime: slotData.data.slotTime,
      slotDate: slotData.data.slotDate,
      serviceId: props.service.serviceId,
      serviceType: props.service.serviceDetails.serviceType,
      servicePrice: props.service.serviceDetails.bookingPrice,
      startTime: storeDetails.startTime,
      endTime: storeDetails.endTime,
      storeId: slotData.data.storeId,
      storeName: storeDetails.name,
      storeImage: storeDetails.storeImage,
      storeAddress: storeDetails.storeAddress,
      userId: props.userId,
      storeLatitude: props.storeDetails.latitude,
      storeLongitude: props.storeDetails.longitude,
      userName,
      userEmail,
      number,
      instructions,
    };

    console.log(slotDetails);
    // confirmSlot(slotDetails)
    //   .then((res) => {
    //     setShowConfirmation(false);
    //     setLoader(false);
    //     props.bookingSuccess(res);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     console.log(err);
    //     alert(err.message);
    //   });
  };

  const showConfirmationModal = (slotData) => {
    setShowConfirmation(true);
    setSelectedSlot(slotData);
  };

  const isDisabled = (slotTime) => {
    const slotTimeDate = moment(slotTime).toDate();
    const today = moment().toDate();
    return today > slotTimeDate;
  };

  return (
    <div className="slot-booking">
      {props.showBooking && (
        <Modal
          id="slot-booking-show"
          show={props.showBooking}
          centered
          onHide={() => props.onHide()}
          size="xl"
          className={`slot-selection-modal ${
            showConfirmation ? "confirmation-show" : ""
          }`}
          backdropClassName={`slot-booking slotbooking-backdrop ${
            showConfirmation ? "confirmation-show" : ""
          }`}
        >
          <LoadingOverlay active={loader} spinner>
            <Modal.Header>
              <img
                src={backIcon}
                className="back-icon"
                alt="back"
                onClick={() => props.onHide()}
              />
              <Modal.Title>Select Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-start modal-body">
              <div className="slot-card p-4">
                <div className="super-market-details d-flex align-items-start">
                  <div className="image-section">
                    <img
                      src={props.storeDetails.storeImage}
                      className="supermarket-logo store-img-icon"
                      alt="market-im"
                    />
                  </div>
                  <div className="store-address">
                    <div className="super-market-name">
                      {props.storeDetails.name}
                    </div>
                    <div className="super-market-location">
                      <div>{props.storeDetails.storeAddress}</div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>
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
                          <img
                            src={timeIcon}
                            alt="icons"
                            className="icons-15"
                          />
                          <span className="fs-12 ml-2">
                            {props.storeDetails.startTime} -{" "}
                            {props.storeDetails.endTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="fs-14 font-weight-bold">
                    <div>{props.service.serviceDetails.serviceType}</div>
                    <div>
                      &#8377; {props.service.serviceDetails.bookingPrice}
                    </div>
                  </div>
                  <div>
                    <button
                      className="change-button"
                      onClick={() => props.onHide()}
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="date-picker p-2 b-grey br-10 mb-4">
                  <DatePicker
                    getSelectedDay={selectedDay}
                    labelFormat={"MMMM"}
                    color={"#374e8c"}
                  />
                </div>
                <div className="slots-spread">
                  {!loader &&
                    slotDetails.length === 0 &&
                    "Sorry!! No Slots found!!"}
                  {slotDetails &&
                    slotDetails.map(
                      (slot, id) =>
                        !isDisabled(slot.data.slotTime) && (
                          <button
                            disabled={!slot.data.remainingSlots}
                            onClick={() => showConfirmationModal(slot)}
                            key={id}
                          >
                            {moment(slot.data.slotTime).format("hh:mm a")}
                          </button>
                        )
                    )}
                </div>
              </div>
            </Modal.Body>
          </LoadingOverlay>
        </Modal>
      )}
      {showConfirmation && (
        <ConfirmDetailsModal
          showConfirmation={showConfirmation}
          selectedSlot={selectedSlot}
          storeDetails={props.storeDetails}
          userLocation={props.userLocation}
          service={props.service}
          hideConfirmation={() => setShowConfirmation(false)}
          confirmBooking={(selectedSlot, storeDetails) =>
            confirmBooking(selectedSlot, storeDetails)
          }
          loader={loader}
        />
      )}
      {/* {showConfirmation && isLoggedIn && (
        <Modal
          show={showConfirmation}
          rootClose={true}
          id="show-confirmation-show"
          onHide={() => setShowConfirmation(false)}
          className="show-confirmation-modal"
          backdropClassName="show-confirmation-backdrop"
          centered
        >
          <LoadingOverlay active={loader} spinner>
            <div className="confirmation d-flex flex-column">
              <div className="confirmation-details d-flex flex-column">
                <Modal.Header>
                  <img
                    src={backIcon}
                    className="back-icon"
                    alt="back"
                    onClick={() => setShowConfirmation(false)}
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
                            <img
                              src={timeIcon}
                              alt="icons"
                              className="icons-15"
                            />
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
                          <div className="fs-14 dark-grey">
                            SELECTED SERVICE
                          </div>
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
                            {moment(selectedSlot.data.slotDate).format(
                              "Do, MMMM YYYY"
                            )}
                          </div>
                          <div className="fs-14 font-weight-bold">
                            {moment(selectedSlot.data.slotTime).format(
                              "hh:mm a"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formNumber">
                        <Form.Control
                          type="number"
                          placeholder="Your Phone Number"
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formInstructions">
                        <Form.Control
                          as="textarea"
                          rows="3"
                          maxLength={120}
                          placeholder="Any special Instructions to store?"
                          onChange={(e) => setInstructions(e.target.value)}
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
                          confirmBooking(selectedSlot, props.storeDetails)
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </div>
            </div>
          </LoadingOverlay>
        </Modal>
      )} */}
    </div>
  );
}

export default SlotBookingModal;

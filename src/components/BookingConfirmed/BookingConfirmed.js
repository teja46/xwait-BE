import React from "react";
import { backIcon } from "../../assets/imageFiles";
import { Modal } from "react-bootstrap";
import getDistance from "../../utils/distance";
import "./BookingConfirmed.scss";
import moment from "moment";
import { timeIcon, locationIcon } from "../../assets/imageFiles";

export default function BookingConfirmed(props) {
  console.log(props);
  return (
    <Modal
      show={props.show}
      onHide={() => props.close()}
      className="booking-confirmed"
    >
      <Modal.Header>
        <img
          src={backIcon}
          className="back-icon"
          alt="back"
          onClick={() => props.close()}
        />
        <Modal.Title>Booking Placed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.bookingDetails && (
          <div className="modal-content-details b-white p-4 br-10">
            <div className="d-flex">
              <div>
                <img
                  src={props.bookingDetails.storeImage}
                  alt="store"
                  className="img-icon-std store-img-icon"
                />
              </div>
              <div className="ml-2">
                <div className="fs-16 font-weight-bold">
                  {props.bookingDetails.storeName}
                </div>
                <div className="fs-14">{props.bookingDetails.storeAddress}</div>
                <div>
                  <span>
                    <img
                      src={locationIcon}
                      alt="location"
                      className="icons-15 "
                    />
                    <span className="fs-12 ml-2">
                      {props.userLocation.latitude
                        ? getDistance(
                            props.userLocation.latitude,
                            props.userLocation.longitude,
                            props.bookingDetails.storeLatitude,
                            props.bookingDetails.storeLongitude
                          )
                        : "N/A"}{" "}
                      Km
                    </span>
                  </span>
                  <span className="ml-4">
                    <img src={timeIcon} alt="location" className="icons-15 " />
                    <span className="fs-12 ml-2">
                      {props.bookingDetails.startTime} -{" "}
                      {props.bookingDetails.endTime}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-stretch justify-content-between bt-grey bb-grey pt-4 pb-4 mt-4">
              <div className="w-50">
                <div className="dark-grey">Selected Service</div>
                <div className="fs-14 font-weight-bold">
                  {props.bookingDetails.serviceType}
                </div>
                <div className="fs-14 font-weight-bold">
                  &#8377; {props.bookingDetails.servicePrice}
                </div>
              </div>
              <div className="b-grey"></div>
              <div className="w-50 ml-4 pl-2">
                <div className="dark-grey">Selected Slot</div>
                <div className="fs-14 font-weight-bold">
                  {moment(props.bookingDetails.slotDate).format(
                    "Do, MMMM YYYY"
                  )}
                </div>
                <div className="fs-14 font-weight-bold">
                  {moment(props.bookingDetails.slotTime).format("hh:mm a")}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-stretch justify-content-between bb-grey pb-4 mt-4">
              <div className="w-50">
                <div className="dark-grey">Booking ID</div>
                <div className="fs-14 font-weight-bold">
                  {props.bookingDetails.bookindId}
                </div>
              </div>
              <div className="b-grey"></div>
              <div className="w-50 ml-4 pl-2">
                <div className="dark-grey">Booking Status</div>
                <div className="fs-14 font-weight-bold">
                  {props.bookingDetails.bookingStatus}
                </div>
              </div>
            </div>
            <div>
              {props.bookingDetails.userName && (
                <div className="bb-grey mt-2 mb-2 pb-2">
                  <div className="dark-grey">Booked For</div>
                  <div className="font-weight-bold">
                    {props.bookingDetails.userName}
                  </div>
                </div>
              )}
              <div className="bb-grey mt-2 mb-2 pb-2">
                <div className="dark-grey">Booking Phone Number</div>
                <div className="font-weight-bold">
                  {props.bookingDetails.phoneNumber}
                </div>
              </div>
              <div className="bb-grey mt-2 mb-2 pb-2">
                <div className="dark-grey">Special Instructions to store</div>
                <div className="font-weight-bold">
                  {props.bookingDetails.instructions}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

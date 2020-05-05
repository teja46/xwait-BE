import React from "react";
import { Modal } from "react-bootstrap";
import { backIcon, timeIcon, locationIcon } from "../../assets/imageFiles";
import "./StoreDetailsModal.scss";
import getServices from "../../dbCalls/getServices";
import LoadingOverlay from "react-loading-overlay";
import distance from "../../utils/distance";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal";
import DisplayStoreFeedback from "../DisplayStoreFeedback/DisplayStoreFeedback";
import StarRatingComponent from "react-star-rating-component";

export default function StoreDetailsModal(props) {
  const [services, setServices] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [serviceDetails, setServiceDetails] = React.useState();
  const [showBooking, setShowBooking] = React.useState(false);
  const [showReviews, setShowReviews] = React.useState(false);
  const [reviewCount, setReviewCount] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      getServices(props.storeDetails.id)
        .then(res => {
          console.log(res);
          setServices(res.data.serviceTypes);
          setReviewCount(res.data.reviews);
          setLoader(false);
        })
        .catch(err => {
          alert(err);
        });
    }
    fetchData();
  }, [props.storeDetails.id]);

  const showBookingModal = service => {
    window.history.pushState({ page: "bookingModal" }, "title 3", "?page=1");
    setServiceDetails(service);
    setShowBooking(true);
  };

  const showReviewModal = () => {
    window.history.pushState({ page: "showReview" }, "title 4", "?page=1");
    setShowReviews(true);
  };

  const bookingSuccess = res => {
    setShowBooking(false);
    props.bookingSuccess(res);
  };

  return (
    <Modal
      id="store-details-show"
      show={true}
      onHide={() => props.close()}
      className="store-details"
      backdropClassName="store-details-backdrop"
    >
      <Modal.Header>
        <img
          src={backIcon}
          className="back-icon"
          alt="back"
          onClick={() => props.close()}
        />
        <Modal.Title>Select Service</Modal.Title>
      </Modal.Header>
      <LoadingOverlay active={loader} spinner>
        <Modal.Body>
          <div className="modal-body-content p-4">
            <div className="d-flex mb-4">
              <div>
                <img
                  src={props.storeDetails.storeImage}
                  alt="store-icon"
                  className="store-img store-img-icon"
                />
              </div>
              <div className="ml-2">
                <div className="fs-16 font-weight-bold">
                  {props.storeDetails.name}
                </div>
                <div className="fs-14">{props.storeDetails.storeAddress}</div>
                <div className="d-flex">
                  <div className="mr-3">
                    <img
                      src={locationIcon}
                      alt="location"
                      className="icons-15"
                    />
                    <span className="ml-2 fs-12">
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
            <div className="d-flex bt-grey bb-grey mt-2 mb-2 align-items-center justify-content-between fs-14 pt-2 pb-2">
              <div className="d-flex align-items-center">
                <StarRatingComponent
                  name="comp3"
                  value={props.storeDetails.rating}
                  tarCount={5}
                />
                <span className="ml-2">
                  {props.storeDetails.rating === 0
                    ? "New"
                    : props.storeDetails.rating.toFixed(1)}
                </span>
              </div>
              <div>
                <div
                  className="review-count"
                  onClick={() => reviewCount > 0 && showReviewModal()}
                >
                  {reviewCount} Reviews
                </div>
              </div>
            </div>
            <div className="services-heading mb-4 fs-14">
              {props.storeDetails.storeDescription}
            </div>
            {services.length === 0 && !loader && (
              <div>Sorry!! No services found for this store</div>
            )}
            {services &&
              !loader &&
              services.map(service => (
                <div className="service-section br-10 p-3 mt-2 mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="service-name">
                        {service.serviceDetails.serviceType}
                      </div>
                      <div className="price font-weight-bold">
                        &#8377; {service.serviceDetails.bookingPrice}
                      </div>
                    </div>
                    <div>
                      <button
                        className="animated-button"
                        onClick={() => showBookingModal(service)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                  <div className="fs-14 mt-3">
                    {service.serviceDetails.serviceDescription}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <SlotBookingModal
          showBooking={showBooking}
          userDetails={props.userDetails}
          userLocation={props.userLocation}
          userId={props.userId}
          service={serviceDetails}
          storeDetails={props.storeDetails}
          onHide={() => setShowBooking(false)}
          bookingSuccess={res => bookingSuccess(res)}
        />
        {showReviews && (
          <DisplayStoreFeedback
            showReviews={showReviews}
            storeDetails={props.storeDetails}
            userDetails={props.userDetails}
            hide={() => setShowReviews(false)}
          />
        )}
      </LoadingOverlay>
    </Modal>
  );
}

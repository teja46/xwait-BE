import React from "react";
import { timeIcon, locationIcon } from "../../assets/imageFiles";
import "./StoreModal.scss";
import getLocation from "../../dbCalls/getLocation";
import getServices from "../../dbCalls/getStorePage";
// import checkAuthStatus from "../../dbCalls/checkAuthStatus";
import LoadingOverlay from "react-loading-overlay";
import distance from "../../utils/distance";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal";
import DisplayStoreFeedback from "../DisplayStoreFeedback/DisplayStoreFeedback";
import StarRatingComponent from "react-star-rating-component";
import BookingConfirmed from "../BookingConfirmed/BookingConfirmed";

export default function StoreDetailsModal(props) {
  const [services, setServices] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [serviceDetails, setServiceDetails] = React.useState();
  const [showBooking, setShowBooking] = React.useState(false);
  const [showReviews, setShowReviews] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState();
  const [reviewCount, setReviewCount] = React.useState(0);
  const [storeDetails, setStoreDetails] = React.useState();
  const [userLocation, setUserLocation] = React.useState();
  React.useEffect(() => {
    async function fetchData() {
      getServices(props.storeCode)
        .then((res) => {
          setServices(res.data.serviceTypes);
          setReviewCount(res.data.storeDetails.reviews);
          setStoreDetails(res.data.storeDetails);
          setLoader(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getLocation()
      .then((res) => {
        setUserLocation(res.coords);
        fetchData();
      })
      .catch((err) => {
        const coords = {
          latitude: 0,
          longitude: 0,
        };
        setUserLocation(coords);
        fetchData();
      });

    // checkAuthStatus()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const showBookingModal = (service) => {
    // window.history.pushState({ page: "bookingModal" }, "title 3", "?page=1");
    setServiceDetails(service);
    setShowBooking(true);
  };

  const showReviewModal = () => {
    // window.history.pushState({ page: "showReview" }, "title 4", "?page=1");
    setShowReviews(true);
  };

  const bookingSuccess = (res) => {
    setShowBooking(false);
    setBookingDetails(res.data);
    setShowToast(true);
    // props.bookingSuccess(res);
  };

  return (
    <LoadingOverlay active={loader} spinner>
      {!loader && (
        <div className="p-0">
          <img
            src={storeDetails.storeImage}
            alt="store-logo"
            className="w-100"
          />
          <div className="modal-body-content p-4">
            <div className="d-flex mb-4 text-center">
              <div className="w-100">
                <div className="fs-16 font-weight-bold">
                  {storeDetails.name}
                </div>
                <div className="fs-14">{storeDetails.storeAddress}</div>
                <div className="d-flex justify-content-center">
                  <div className="mr-3">
                    <img
                      src={locationIcon}
                      alt="location"
                      className="icons-15"
                    />
                    <span className="ml-2 fs-12">
                      {userLocation && userLocation.latitude
                        ? distance(
                            userLocation.latitude,
                            userLocation.longitude,
                            storeDetails.latitude,
                            storeDetails.longitude
                          )
                        : "N/A"}{" "}
                      Km
                    </span>
                  </div>
                  <div>
                    <img src={timeIcon} alt="icons" className="icons-15" />
                    <span className="fs-12 ml-2">
                      {storeDetails.startTime} - {storeDetails.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex bt-dark-grey bb-dark-grey mt-2 mb-2 align-items-center justify-content-between fs-14 pt-2 pb-2">
              <div className="d-flex align-items-center">
                <StarRatingComponent
                  name="comp3"
                  value={storeDetails.rating}
                  tarCount={5}
                />
                <span className="ml-2">
                  {storeDetails.rating === 0
                    ? "New"
                    : storeDetails.rating.toFixed(1)}
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
              {storeDetails.storeDescription}
            </div>
            {services.length === 0 && !loader && (
              <div>Sorry!! No services found for this store</div>
            )}
            {services &&
              !loader &&
              services.map((service) => (
                <div className="service-section br-10 p-3 mt-2 mb-4 b-white">
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

            <div className="d-flex justify-content-between align-items-center fs-12">
              <div>Powered by XWait</div>
              <div>
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showBooking && (
        <SlotBookingModal
          showBooking={showBooking}
          userDetails={props.userDetails}
          userLocation={userLocation}
          userId={props.userId}
          service={serviceDetails}
          storeDetails={storeDetails}
          onHide={() => setShowBooking(false)}
          bookingSuccess={(res) => bookingSuccess(res)}
        />
      )}
      {showReviews && (
        <DisplayStoreFeedback
          showReviews={showReviews}
          storeDetails={storeDetails}
          userDetails={props.userDetails}
          hide={() => setShowReviews(false)}
        />
      )}
      {showToast && (
        <BookingConfirmed
          show={showToast}
          bookingDetails={bookingDetails}
          userLocation={userLocation}
          close={() => setShowToast(false)}
        />
      )}
    </LoadingOverlay>
  );
}

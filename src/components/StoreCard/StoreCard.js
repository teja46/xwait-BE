import React from "react";
import "./StoreCard.scss";
import locationIcon from "../../assets/images/location-icon.png";
import timeIcon from "../../assets/images/time-icon.png";
import StoreDetailsModal from "../StoreDetailsModal/StoreDetailsModal";
import StoreModal from "../StoreModal/StoreModal";
import StarRatingComponent from "react-star-rating-component";
import getDistance from "../../utils/distance";
import { ellipsifyText } from "../../utils/utils";

function StoreCard(props) {
  const [showStoreDetailsModal, setShowStoreDetailsModal] = React.useState(
    false
  );

  const [showStoreModal, setShowStoreModal] = React.useState(false);

  // const [windowState, setWindowState] = React.useState("showStoreDetails");

  const displayShowDetailsModal = () => {
    // window.history.pushState(
    //   { page: "showStoreDetails" },
    //   "title 2",
    //   `?page=${props.storeDetails.name.split(" ")[0].toLowerCase()}`
    // );
    setShowStoreDetailsModal(true);
  };
  // console.log(locUrl);
  // console.log(storeName);
  React.useEffect(() => {
    const locUrl = window.location.search.split("page=")[1];
    const storeName = props.storeDetails.name.split(" ")[0].toLowerCase();
    if (locUrl && locUrl === storeName) {
      // setWindowState(locUrl);
      setShowStoreModal(true);
    }
  });

  const bookingSuccess = (res) => {
    setShowStoreDetailsModal(false);
    props.showToast(res);
  };
  return (
    <div className="col-sm-12 col-md-6 col-xs-12 col-lg-6 card-section">
      <div className="store-card mt-2 mb-2">
        <div
          className="row card-heading d-flex"
          onClick={() => displayShowDetailsModal()}
        >
          <div className="col-3 d-flex align-items-start pl-2 pb-2">
            <img
              src={props.storeDetails.storeImage}
              alt="store-logo"
              className="store-image store-img-icon"
            />
          </div>
          <div className="col-9 store-details pl-0 pr-2">
            <div className="store-name" title={props.storeDetails.name}>
              {ellipsifyText(props.storeDetails.name, 25)}
            </div>
            <div>
              <div
                className="store-location"
                title={props.storeDetails.storeAddress}
              >
                {ellipsifyText(props.storeDetails.storeAddress, 36)}
              </div>

              <div className="d-flex justify-content-start store-location mt-2 mb-2">
                <div className="store-distance d-flex align-items-center justify-content-between">
                  <img src={locationIcon} alt="rating" className="icons mr-2" />{" "}
                  <span className="ratingDigit">
                    {props.userLocation && props.userLocation.latitude
                      ? getDistance(
                          props.userLocation.latitude,
                          props.userLocation.longitude,
                          props.storeDetails.latitude,
                          props.storeDetails.longitude
                        )
                      : "N/A"}{" "}
                    km
                  </span>
                </div>
                <div className="store-timings d-flex align-items-center ml-4">
                  <img src={timeIcon} alt="rating" className="icons mr-2" />
                  <span className="timing">
                    {props.storeDetails.startTime} -{" "}
                    {props.storeDetails.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="store-description pt-2 ml-4 mr-4">
            {/* <div className="store-serve-items">Cafe, fastfood, deserts</div> */}
          </div>
        </div>
        <div className="card-action d-flex justify-content-between align-items-center">
          <div className="store-rating fs-12 font-weight-bold d-flex align-items-center justify-content-start pt-1 pb-1 pr-3 pl-2 mb-2">
            <StarRatingComponent value={1} starCount={1} name="comp2" />
            <span className="ml-1">
              {props.storeDetails.rating === 0
                ? "New"
                : props.storeDetails.rating.toFixed(1)}
            </span>
          </div>
          <div className="mr-2 mb-2 d-flex align-items-center">
            <div className="mr-2 font-weight-bold fs-14">
              &#8377; {props.storeDetails.startPrice} onwards
            </div>
            <button
              className="animated-button"
              onClick={() => displayShowDetailsModal()}
            >
              Book Slot
            </button>
          </div>
        </div>
      </div>

      {showStoreDetailsModal && (
        <StoreDetailsModal
          storeDetails={props.storeDetails}
          userDetails={props.userDetails}
          userLocation={props.userLocation}
          userId={props.userId}
          close={() => setShowStoreDetailsModal(false)}
          bookingSuccess={(res) => bookingSuccess(res)}
        />
      )}

      {showStoreModal && (
        <StoreModal
          storeDetails={props.storeDetails}
          userDetails={props.userDetails}
          userLocation={props.userLocation}
          userId={props.userId}
          close={() => setShowStoreDetailsModal(false)}
          bookingSuccess={(res) => bookingSuccess(res)}
        />
      )}
    </div>
  );
}

export default StoreCard;

import React from "react";
import "./HomePage.scss";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import StoreCard from "../../components/StoreCard/StoreCard";
import getStores from "../../dbCalls/getStores";
import getCategories from "../../dbCalls/getCategories";
import { searchIcon } from "../../assets/imageFiles";
import SearchResults from "../../components/SearchResults/SearchResults";
import BookingConfirmed from "../../components/BookingConfirmed/BookingConfirmed";
import LoadingOverlay from "react-loading-overlay";
import { filterResults } from "../../utils/utils";
import getLocation from "../../dbCalls/getLocation";

import {
  allCategoriesIcon,
  hospitalsIcon,
  storesIcon,
  beautyIcon,
  restaurantIcon,
  servicesIcon,
} from "../../assets/imageFiles";

function HomePage(props) {
  const [stores, setStores] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [allCategories, setAllCategories] = React.useState([]);
  const [categoryType, setCategoryType] = React.useState("All Categories");
  const [showToast, setShowToast] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [searchDataResults, setSearchDataResults] = React.useState([]);
  const [userLocation, setUserLocation] = React.useState();
  const [bookingDetails, setBookingDetails] = React.useState();
  //
  React.useEffect(() => {
    async function fetchData() {
      getLocation()
        .then((res) => {
          console.log(res);
          setUserLocation(res.coords);
          return getStores();
        })

        .catch((err) => {
          const coords = {
            latitude: 0,
            longitude: 0,
          };
          setUserLocation(coords);
          return getStores();
        })
        .then((res) => {
          setStores(res.data);
          setAllCategories(res.data);
          setLoader(false);
        });

      getStores()
        .then((res) => {
          setStores(res.data);
          setAllCategories(res.data);
          setLoader(false);
        })
        .catch((err) => {
          props.logout();
        });
    }
    fetchData();
  }, []);

  const searchFor = (type) => {
    setLoader(true);
    setCategoryType(type);
    getCategories(type)
      .then((res) => {
        setStores(res.data);
        setLoader(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getAllCategories = () => {
    setLoader(true);
    setCategoryType("All Categories");
    getStores()
      .then((res) => {
        setStores(res.data);
        setLoader(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const searchFields = () => {
    setLoader(true);
    let res = filterResults(allCategories, searchText);
    setSearchDataResults(res);
    setLoader(false);
    setShowSearchResults(true);
  };

  const searchForType = (event) => {
    if (event.key === "Enter") {
      searchFields();
    }
  };

  const showConfirmation = (res) => {
    setShowToast(true);
    setBookingDetails(res.data);
  };

  return (
    <LoadingOverlay active={loader} spinner>
      <div className="home-page">
        <div className="home-page-section">
          <div className="header-component">
            <HeaderComponent
              logout={() => props.logout()}
              userLocation={userLocation}
              userId={props.userId}
              userDetails={props.userDetails}
            />
          </div>
          <div className="store-types d-flex flex-column justify-content-around pt-4 pb-4">
            <div className="container">
              <div className="search-section d-flex pb-4">
                <input
                  minLength={2}
                  placeholder="Search Stores, Salons and more"
                  className="search-field"
                  onKeyPress={(event) => searchForType(event)}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <img
                  src={searchIcon}
                  alt="search"
                  className="search-icon"
                  onClick={() => searchText.length && searchFields()}
                />
              </div>
              <div className="d-none d-sm-none d-xs-none d-md-flex d-lg-flex align-items-center justify-content-around mt-4">
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => getAllCategories()}
                >
                  <div
                    className={
                      categoryType === "All Categories"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={allCategoriesIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">All</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("stores")}
                >
                  <div
                    className={
                      categoryType === "stores"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={storesIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Stores</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("hospitals")}
                >
                  <div
                    className={
                      categoryType === "hospitals"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={hospitalsIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Hospitals</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("restaurants")}
                >
                  <div
                    className={
                      categoryType === "restaurants"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={restaurantIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Food</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("beauty")}
                >
                  <div
                    className={
                      categoryType === "beauty"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={beautyIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Beauty</div>
                </div>
                <div
                  className="d-flex align-items-center flex-column category"
                  onClick={() => searchFor("services")}
                >
                  <div
                    className={
                      categoryType === "services"
                        ? "active-category "
                        : "category-section"
                    }
                  >
                    <img
                      className="store-image"
                      src={servicesIcon}
                      alt="categories"
                    />
                  </div>
                  <div className="titles">Services</div>
                </div>
              </div>
              <div className="d-flex d-sm-flex d-md-none d-xs-flex d-lg-none align-items-center justify-content-around mobile-categories">
                <div className="d-flex align-items-center flex-column">
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => getAllCategories()}
                  >
                    <div
                      className={
                        categoryType === "All Categories"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={allCategoriesIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">All</div>
                  </div>
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => searchFor("restaurants")}
                  >
                    <div
                      className={
                        categoryType === "restaurants"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={restaurantIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">Food</div>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-column">
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => searchFor("stores")}
                  >
                    <div
                      className={
                        categoryType === "stores"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={storesIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">Stores</div>
                  </div>
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => searchFor("hospitals")}
                  >
                    <div
                      className={
                        categoryType === "hospitals"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={hospitalsIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">Hospitals</div>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-column">
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => searchFor("beauty")}
                  >
                    <div
                      className={
                        categoryType === "beauty"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={beautyIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">Beauty</div>
                  </div>
                  <div
                    className="d-flex align-items-center flex-column category"
                    onClick={() => searchFor("services")}
                  >
                    <div
                      className={
                        categoryType === "services"
                          ? "active-category "
                          : "category-section"
                      }
                    >
                      <img
                        className="store-image"
                        src={servicesIcon}
                        alt="categories"
                      />
                    </div>
                    <div className="titles">Services</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container showPlaces">
          <div className="all-places d-flex">{categoryType}</div>

          <div className="cards-section row d-flex justify-content-start">
            {stores.length === 0 && !loader && "Sorry!! No Results Found!!"}
            {stores.map((store, id) => (
              <StoreCard
                key={id}
                storeDetails={store}
                userDetails={props.userDetails}
                userLocation={userLocation}
                userId={props.userId}
                showToast={(res) => showConfirmation(res)}
              />
            ))}{" "}
          </div>
        </div>
      </div>
      {showToast && (
        <BookingConfirmed
          show={showToast}
          bookingDetails={bookingDetails}
          userLocation={userLocation}
          close={() => setShowToast(false)}
        />
      )}
      {showSearchResults && (
        <SearchResults
          show={showSearchResults}
          searchText={searchText}
          userId={props.userId}
          userLocation={userLocation}
          stores={searchDataResults}
          userDetails={props.userDetails}
          showToast={() => setShowToast(true)}
          onHide={() => setShowSearchResults(false)}
        />
      )}
    </LoadingOverlay>
  );
}

export default HomePage;

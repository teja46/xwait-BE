import React from "react";
import { Modal, Button } from "react-bootstrap";
import StoreCard from "../StoreCard/StoreCard";
import { backIcon } from "../../assets/imageFiles";

export default function SearchResults(props) {
  window.history.pushState(
    { page: "showMyBookingModal" },
    "title 1",
    "?page=1"
  );
  return (
    <Modal show={props.show} onHide={() => props.onHide()}>
      <Modal.Header>
        <img
          src={backIcon}
          className="back-icon"
          alt="back"
          onClick={() => props.onHide()}
        />
        <Modal.Title>Search Results for "{props.searchText}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="b-white p-2 br-10">
          {props.stores &&
            props.stores.length === 0 &&
            "Sorry!! No Results Found!!"}
          {props.stores &&
            props.stores.map((store, id) => (
              <StoreCard
                key={id}
                storeDetails={store}
                userDetails={props.userDetails}
                userId={props.userId}
                userLocation={props.userLocation}
                showToast={() => props.setShowToast(true)}
              />
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

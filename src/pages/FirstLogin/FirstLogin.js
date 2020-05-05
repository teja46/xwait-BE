import React from "react";
import "./firstLogin.scss";
import { Button } from "react-bootstrap";
import { img1, img2, img3, img4 } from "../../assets/imageFiles";

export default function FirstLogin(props) {
  let images = [img1, img2, img3, img4];
  const [imageNumer, setImageNumber] = React.useState(0);
  let imgNo;
  const updateSlider = () => {
    imgNo = imageNumer;
    imgNo++;
    if (imgNo < images.length) {
      setImageNumber(imgNo);
    } else {
      props.exit();
    }
  };

  const imageDescription = [
    {
      title: "Welcome",
      desc1: "Everybody hates waiting",
      desc2: "We got a solution"
    },
    {
      title: "Find nearby",
      desc1: "Restaurants, Hospitals,",
      desc2: "Stores, Saloons etx"
    },
    {
      title: "Book Appointments",
      desc1: "Find & Book Services",
      desc2: "In available slots"
    },
    {
      title: "Relax Happily",
      desc1: "Everybody hates waiting",
      desc2: "We got a solution"
    }
  ];

  return (
    <div className="first-login-slider flex-column text-center d-flex align-items-center">
      <div
        className="img-bck"
        style={{ backgroundImage: `url("${images[imageNumer]}")` }}
      ></div>
      <div className="details d-flex justify-content-around flex-column">
        <div className="text-details">
          <div className="heading">{imageDescription[imageNumer].title}</div>
          <div className="description">
            <div>{imageDescription[imageNumer].desc1}</div>
            <div>{imageDescription[imageNumer].desc2}</div>
          </div>
        </div>
        <div>
          <Button onClick={() => updateSlider()}>
            {imageNumer < images.length - 1 ? "Next" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
}

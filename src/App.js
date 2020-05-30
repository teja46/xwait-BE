import React from "react";
import "./App.scss";
import xWaitLogo from "./assets/images/xwaitblack-logo.png";
import googleLogo from "./assets/images/google-logo.png";
import { Button } from "react-bootstrap";
import { googleLogin, appLogout } from "./login/googleLogin";
import HomePage from "./pages/HomePage/HomePage";
import updateUserToken from "./dbCalls/updateUserToken";
import firebase from "firebase";
import { getCookie, setCookie } from "./utils/utils";
import LoadingOverlay from "react-loading-overlay";
import FirstLogin from "./pages/FirstLogin/FirstLogin";
import Recaptcha from "react-recaptcha";

//Modal Closer With Back Button Support (Uses EventDelegation, so it works for ajax loaded content too.)

function App() {
  const [showHome, setShowHome] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [userId, setUserId] = React.useState();
  const [userDetails, setUserDetails] = React.useState();
  const [firstTime, setFirstTime] = React.useState(true);
  const [phNumber, setPhNumber] = React.useState("+91");
  // const loginWithGoogle = () => {
  //   setLoader(true);
  //   googleLogin()
  //     .then((res) => {
  //       setShowHome(true);
  //       setLoader(false);
  //     })
  //     .catch((err) => alert(err.message));
  // };

  React.useLayoutEffect(() => {}, []);

  // const loginWithNumber = () => {
  //   let recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha");
  //   // console.log("Login");

  //   // recaptchaVerifier.render();

  //   console.log(recaptchaVerifier);
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phNumber, recaptchaVerifier)
  //     .then(function (res) {
  //       let code = prompt("Plase enter OTP");
  //       console.log(res);
  //       res.confirm(code).then(function (result) {
  //         console.log(result);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const verifyCode = () => {};

  // const updateToken = (userId, token) => {
  //   updateUserToken(userId, token)
  //     .then((res) => {
  //       // console.log("updated");
  //     })
  //     .catch((err) => {
  //       console.log("Error!!");
  //     });
  // };

  React.useEffect(() => {
    if (getCookie("xwait-first").length) {
      setFirstTime(false);
    } else {
      setFirstTime(true);
      setCookie("firstTime");
    }

    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     setShowHome(true);
    //     setLoader(false);
    //     setUserId(user.uid);
    //     const userData = {
    //       name: user.displayName,
    //       email: user.email,
    //       photoURL: user.photoURL,
    //     };
    //     setUserDetails(userData);
    //     const messaging = firebase.messaging();
    //     messaging
    //       .requestPermission()
    //       .then(() => {
    //         return messaging.getToken();
    //       })
    //       .then((token) => {
    //         updateToken(user.uid, token);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     setShowHome(false);
    //     setLoader(false);
    //   }
    // });
  }, []);

  const logout = () => {
    appLogout();
    setShowHome(false);
  };

  window.onpopstate = (e) => {
    setShowHome(false);
    setShowHome(true);
  };

  return (
    <LoadingOverlay active={loader} spinner>
      <div className="app">
        {firstTime && <FirstLogin exit={() => setFirstTime(false)} />}

        {!firstTime && (
          <HomePage
            showBooking={showHome}
            logout={() => logout()}
            userId={userId}
            userDetails={userDetails}
          />
        )}
      </div>
    </LoadingOverlay>
  );
}

export default App;
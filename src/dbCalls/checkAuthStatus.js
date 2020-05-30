import firebase from "firebase";

const checkAuthStatus = (storeId, date, serviceId) => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};

export default checkAuthStatus;

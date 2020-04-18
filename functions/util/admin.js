const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccounts");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://xwaitsolution.firebaseio.com",
  storageBucket: "xwaitsolution.appspot.com"
});

const db = admin.firestore();

module.exports = {
  admin,
  db
};

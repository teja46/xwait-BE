const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

const { db, admin } = require("./util/admin");
// const FbAuth = require("./util/fbAuth");
const { signUp, login } = require("./users/users");
const { signupGoogleUser } = require("./users/signupGoogleUser");
const { updateUserToken } = require("./users/updateUserToken");
const { addStore } = require("./stores/addStore");
const { postSlot } = require("./stores/postSlot");
const { getSlots } = require("./stores/getSlots");
const { bookSlot } = require("./stores/bookSlot");
const { redeemBooking } = require("./stores/redeemBooking");
const { getBookedSlots } = require("./stores/getBookedSlots");
const { getStores } = require("./stores/getStores");
const { getCategories } = require("./stores/getCategories");
const { cancelBooking } = require("./stores/cancelBooking");
const { viewSlots } = require("./stores/viewSlots");
const { getServiceTypes } = require("./stores/getServiceTypes");
const { addServiceTypes } = require("./stores/addServiceTypes");
const { completeBooking } = require("./stores/completeBooking");
const { getPendingBookings } = require("./stores/getPendingBookings");
const { changeBookingStatus } = require("./stores/changeBookingStatus");
const { submitFeedback } = require("./stores/submitFeedback");

app.use(cors());
// User Login
app.post("/signup", signUp);
app.post("/signupGoogleUser", signupGoogleUser);
app.post("/login", login);
app.post("/updateUserToken", updateUserToken);

// store end and on boarding slots
app.post("/addStore", addStore);
app.post("/postSlot", postSlot);

// get available slots
app.get("/slots/:storeId/:slotDate/:serviceId", getSlots);

// book slots
app.post("/bookSlot", bookSlot);
//cancel booking
app.post("/cancelBooking", cancelBooking);

// get booked slots
app.get("/bookedSlots/:userId/:slotType", getBookedSlots);

// get stores
app.get("/getStores", getStores);

// add service types
app.post("/addServiceTypes", addServiceTypes);

// get service types
app.get("/getServiceTypes/:storeId", getServiceTypes);

// get specific stores
app.get("/getCategories/:type", getCategories);

//redeem booking
app.get("/redeemBooking/:bookingId", redeemBooking);

// get pending bookingStatus
app.get("/getPendingBookings/:storeId", getPendingBookings);

// for store viewing slots
app.get("/viewSlots/:storeId/:slotDate", viewSlots);

// redeem booking
app.post("/completeBooking", completeBooking);

// change booking status
app.post("/changeBookingStatus", changeBookingStatus);

app.post("/submitFeedback", submitFeedback);

exports.createNotificationOnCreate = functions.firestore
  .document(`bookSlot/{slotId}`)
  .onCreate(snapshot => {
    const data = snapshot.data();
    console.log(data);
  });

exports.createNotificationOnUpdate = functions.firestore
  .document(`bookSlot/{slotId}`)
  .onUpdate((snapshot, context) => {
    const updatedData = snapshot.after.data();
    if (
      updatedData.bookingStatus === "Accepted" ||
      updatedData.bookingStatus === "Rejected"
    ) {
      db.doc(`/users/${updatedData.userId}`)
        .get()
        .then(doc => {
          if (doc.data().token && doc.exists) {
            let messageBody = "";
            if (updatedData.bookingStatus === "Accepted") {
              messageBody = "Congrats, your booking has been accepted!!";
            } else if (updatedData.bookingStatus === "Rejected") {
              messageBody = "We are sorry! The store had rejected your booking";
            }
            let message = {
              notification: {
                title: "Booking Status Changed",
                body: messageBody
              },
              token: doc.data().token
            };
            admin
              .messaging()
              .send(message)
              .then(response => {
                // Response is a message ID string.
                console.log("Successfully sent message:", response);
              })
              .catch(error => {
                console.log("Error sending message:", error);
              });
          }
        })
        .catch(err => console.log(err));
    }
  });

// exports.sendAdminNotification = functions.firestore
//   .document("/bookSlot/{id}")
//   .onCreate(snapshot => {
//     var condition = "'New' in topics || 'industry-tech' in topics";
//     console.log("Updated...");
//     // See documentation on defining a message payload.
//     var message = {
//       notification: {
//         title: "$GOOG up 1.43% on the day",
//         body:
//           "$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day."
//       }
//     };

//     // Send a message to devices subscribed to the combination of topics
//     // specified by the provided condition.
//     admin
//       .messaging()
//       .send(message)
//       .then(response => {
//         // Response is a message ID string.
//         console.log("Successfully sent message:", response);
//       })
//       .catch(error => {
//         console.log("Error sending message:", error);
//       });
//   });

exports.api = functions.https.onRequest(app);

// exports.googleAuth = registerGoogleUser;

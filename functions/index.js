const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
// const FbAuth = require("./util/fbAuth");
const { signUp, login } = require("./users/users");
const { signupGoogleUser } = require("./users/signupGoogleUser");
const { addStore } = require("./stores/addStore");
const { postSlot } = require("./stores/postSlot");
const { getSlots } = require("./stores/getSlots");
const { bookSlot } = require("./stores/bookSlot");
const { redeemBooking } = require("./stores/redeemBooking");
const { getBookedSlots } = require("./stores/getBookedSlots");
const { getStores } = require("./stores/getStores");
app.use(cors());
// User Login
app.post("/signup", signUp);
app.post("/signupGoogleUser", signupGoogleUser);
app.post("/login", login);

// store end and on boarding slots
app.post("/addStore", addStore);
app.post("/postSlot/:storeId/:slotTime", postSlot);

// get available slots
app.get("/slots/:storeId/:slotDate", getSlots);

// book slots
app.post("/bookSlot", bookSlot);
// get booked slots
app.get("/bookedSlots/:userId", getBookedSlots);

// get stores
app.get("/getStores", getStores);

//redeem booking
app.get("/redeemBooking/:bookingId", redeemBooking);
exports.api = functions.https.onRequest(app);

// exports.googleAuth = registerGoogleUser;

const { db } = require("../util/admin");
const moment = require("moment");

exports.bookingHistory = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  db.collection("bookSlot")
    .where("storeId", "==", req.params.storeId)
    .where("slotDate", "==", req.params.bookingDate)
    .where("bookingStatus", "==", "Redeemed")
    .get()
    .then(data => {
      let booking = [];
      data.forEach(doc => {
        booking.push({
          id: doc.id,
          bookingId: doc.data().bookindId,
          userEmail: doc.data().userEmail,
          userName: doc.data().userName,
          bookingStatus: doc.data().bookingStatus
        });
      });
      return res.json(booking);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

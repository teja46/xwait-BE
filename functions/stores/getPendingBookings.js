const { db } = require("../util/admin");

exports.getPendingBookings = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  let slotData = {};

  db.doc(`/stores/${req.params.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
      return db
        .collection("bookSlot")
        .where("storeId", "==", req.params.storeId)
        .where("bookingStatus", "==", "Pending")
        .get();
    })
    .then(data => {
      bookingData = [];
      data.forEach(doc => {
        let bookingObj = {
          bookingStatus: doc.data().bookingStatus,
          slotDate: doc.data().slotDate,
          slotTime: doc.data().slotTime,
          id: doc.id,
          userName: doc.data().userName,
          userEmail: doc.data().userEmail,
          phoneNumber: doc.data().phoneNumber,
          bookingId: doc.data().bookindId
        };
        bookingData.push(bookingObj);
      });
      return res.json(bookingData);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

const { db } = require("../util/admin");

exports.getPendingBookings = (req, res) => {
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
          bookingId: doc.id
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

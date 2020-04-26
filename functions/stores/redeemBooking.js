const { db } = require("../util/admin");

exports.redeemBooking = (req, res) => {
  const bookingDoc = db.doc(`/bookSlot/${req.params.bookingId}`);
  bookingDoc
    .get()
    .then(doc => {
      if (doc.exists) {
        bookingDoc.update({
          bookingStatus: "Redeemed",
          createdAt: new Date().toISOString()
        });
        return res.json({ message: "updated successfully" });
      }
      return res.status(404).json({ error: "Booking not found" });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

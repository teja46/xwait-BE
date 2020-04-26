const { db } = require("../util/admin");

exports.changeBookingStatus = (req, res) => {
  db.doc(`/bookSlot/${req.body.bookingId}`)
    .get()
    .then(data => {
      if (data.exists) {
        db.doc(`/bookSlot/${req.body.bookingId}`).update({
          bookingStatus: req.body.bookingStatus
        });
        return res.json({ message: "Updated Successfully" });
      } else {
        return res.json({ message: "Booking Not found" });
      }
    })
    .catch(err => {
      return res.status(404).json({ error: err.code });
    });
};

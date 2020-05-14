const { db } = require("../util/admin");

exports.completeBooking = (req, res) => {
  const bookingDoc = db
    .collection("bookSlot")
    .where("bookindId", "==", req.body.bookingId)
    .limit(1);
  bookingDoc
    .get()
    .then(data => {
      if (!data.empty) {
        db.doc(`/bookSlot/${data.docs[0].id}`).update({
          bookingStatus: req.body.bookingStatus,
          createdAt: new Date().toISOString()
        });
        return res.json({ message: `${req.body.bookingStatus} successfully` });
      }
      return res.status(404).json({ error: "Booking not found" });
    })
    .catch(err => {
      return res.status(500).json({ error: err.code });
    });
};

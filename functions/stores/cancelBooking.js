const { db } = require("../util/admin");

exports.cancelBooking = (req, res) => {
  const bookDoc = db
    .collection("bookSlot")
    .where("userId", "==", req.body.userId)
    .where("slotId", "==", req.body.slotId)
    .limit(1);
  const slotDocument = db.doc(`/slots/${req.body.slotId}`);
  let slotData;
  slotDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        slotData = doc.data();
        slotData.id = doc.id;
        return bookDoc.get();
      } else {
        return res.status(404).json({ error: "Slot not found" });
      }
    })
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ error: "Slot not booked" });
      } else {
        db.doc(`/bookSlot/${data.docs[0].id}`).update({
          bookingStatus: "Cancelled",
          createdAt: new Date().toISOString()
        });

        slotData.remainingSlots++;
        slotDocument.update({ remainingSlots: slotData.remainingSlots });
        return res.json(slotData);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

const { db } = require("../util/admin");
const { makeId } = require("../util/randomId");

exports.bookSlot = (req, res) => {
  const bookDoc = db
    .collection("bookSlot")
    .where("userId", "==", req.body.userId)
    .where("slotId", "==", req.body.slotId)
    .limit(1);
  const slotDocument = db.doc(`/slots/${req.body.slotId}`);
  let slotData = {};
  slotDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        slotData = doc.data();
        slotData.id = doc.id;
        if (slotData.remainingSlots === 0) {
          return res
            .status(400)
            .json({ error: "Slots are full and booking cannot be done" });
        }
        return bookDoc.get();
      } else {
        return res.status(404).json({ error: "Slot not found" });
      }
    })
    .then(data => {
      if (data.empty) {
        return db
          .collection("bookSlot")
          .add({
            slotId: req.body.slotId,
            slotTime: req.body.slotTime,
            slotDate: req.body.slotDate,
            slotCompleted: false,
            storeId: req.body.storeId,
            userId: req.body.userId,
            storeName: req.body.storeName,
            storeAddress: req.body.storeAddress,
            bookindId: makeId(5),
            bookingStatus: false,
            createdAt: new Date().toISOString()
          })
          .then(() => {
            slotData.remainingSlots -= 1;
            return slotDocument.update({
              remainingSlots: slotData.remainingSlots
            });
          })
          .then(() => {
            return res.json(slotData);
          });
      } else {
        return res.status(400).json({ error: "Booking already created" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

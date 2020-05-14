const { db } = require("../util/admin");
const { makeId } = require("../util/randomId");

exports.bookSlot = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  const bookDoc = db
    .collection("bookSlot")
    .where("userId", "==", req.body.userId)
    .where("slotId", "==", req.body.slotId)
    .where("serviceId", "==", req.body.serviceId)
    .where("bookingStatus", "in", ["Accepted", "Redeemed", "Pending"])
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
        const bookingData = {
          slotId: req.body.slotId,
          slotTime: req.body.slotTime,
          slotDate: req.body.slotDate,
          storeId: req.body.storeId,
          userId: req.body.userId,
          storeName: req.body.storeName,
          serviceId: req.body.serviceId,
          serviceType: req.body.serviceType,
          storeAddress: req.body.storeAddress,
          servicePrice: req.body.servicePrice,
          startTime: req.body.startTime,
          storeImage: req.body.storeImage,
          endTime: req.body.endTime,
          phoneNumber: req.body.number ? req.body.number : "",
          instructions: req.body.instructions ? req.body.instructions : "",
          storeLatitude: req.body.storeLatitude ? req.body.storeLatitude : "",
          storeLongitude: req.body.storeLongitude
            ? req.body.storeLongitude
            : "",
          bookindId: makeId(5).toUpperCase(),
          bookingStatus: "Pending",
          userName: req.body.userName ? req.body.userName : "",
          userEmail: req.body.userEmail ? req.body.userEmail : "",
          createdAt: new Date().toISOString()
        };
        return db
          .collection("bookSlot")
          .add(bookingData)
          .then(() => {
            slotData.remainingSlots -= 1;
            return slotDocument.update({
              remainingSlots: slotData.remainingSlots
            });
          })
          .then(() => {
            return res.json(bookingData);
          });
      } else {
        return res.status(400).json({ message: "Booking already created" });
      }
    })
    .catch(err => {
      return res.status(500).json({ error: err.code });
    });
};

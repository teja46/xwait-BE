const { db } = require("../util/admin");

exports.getBookedSlots = (req, res) => {
  db.collection("bookSlot")
    .where("userId", "==", req.params.userId)
    .get()
    .then(data => {
      let slots = [];
      data.forEach(doc => {
        slots.push({
          id: doc.id,
          storeName: doc.data().storeName,
          storeAddress: doc.data().storeAddress,
          storeArea: doc.data().storeArea,
          slotId: doc.data().slotId,
          slotCompleted: doc.data().slotCompleted,
          slotTime: doc.data().slotTime,
          bookingId: doc.data().bookingId,
          slotDate: doc.data().slotDate,
          bookingStatus: doc.data().bookingStatus
        });
      });
      return res.json(slots);
    })
    .catch(err => {
      console.error(err);
    });
};

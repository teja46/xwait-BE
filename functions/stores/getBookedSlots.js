const { db } = require("../util/admin");

exports.getBookedSlots = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  let slotType = [];
  if (req.params.slotType === "Current") {
    slotType = ["Accepted", "Pending"];
  } else {
    slotType = ["Rejected", "Cancelled", "Redeemed"];
  }
  console.log(slotType);
  db.collection("bookSlot")
    .where("userId", "==", req.params.userId)
    .where("bookingStatus", "in", slotType)
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
          serviceId: doc.data().serviceId,
          serviceType: doc.data().serviceType,
          slotTime: doc.data().slotTime,
          storeId: doc.data().storeId,
          userId: doc.data().userId,
          bookingId: doc.data().bookindId,
          slotDate: doc.data().slotDate,
          bookingStatus: doc.data().bookingStatus,
          storeImage: doc.data().storeImage,
          storeLatitude: doc.data().storeLatitude,
          storeLongitude: doc.data().storeLongitude,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          servicePrice: doc.data().servicePrice
        });
      });
      return res.json(slots);
    })
    .catch(err => {
      console.error(err);
    });
};

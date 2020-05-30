const { db } = require("../util/admin");

exports.getSlots = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  let slotData = {};

  db.collection("slots")
    .where("storeId", "==", req.params.storeId)
    .where("slotDate", "==", req.params.slotDate)
    .where("serviceId", "==", req.params.serviceId)
    .get()
    .then((data) => {
      slotData.slots = [];
      data.forEach((doc) => {
        slotData.slots.push({ slotId: doc.id, data: doc.data() });
      });
      return res.json(slotData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

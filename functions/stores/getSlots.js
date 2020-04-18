const { db } = require("../util/admin");

exports.getSlots = (req, res) => {
  let slotData = {};

  db.doc(`/stores/${req.params.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
      return db
        .collection("slots")
        .where("storeId", "==", req.params.storeId)
        .where("slotDate", "==", req.params.slotDate)
        .get();
    })
    .then(data => {
      slotData.slots = [];
      data.forEach(doc => {
        slotData.slots.push({ slotId: doc.id, data: doc.data() });
      });
      return res.json(slotData);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

const { db } = require("../util/admin");
const moment = require("moment");

exports.postSlot = (req, res) => {
  const postSlot = {
    storeId: req.params.storeId,
    slotTime: req.params.slotTime,
    totalSlots: req.body.totalSlots,
    createdAt: new Date().toISOString(),
    remainingSlots: req.body.totalSlots
  };

  db.doc(`/stores/${req.params.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
      return db.collection("slots").add(postSlot);
    })
    .then(() => {
      return res.json(postSlot);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    });
};

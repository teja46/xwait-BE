const { db } = require("../util/admin");
const moment = require("moment");

exports.postSlot = (req, res) => {
  let dt = new Date(req.body.slotDate);
  console.log(dt);
  dt.setHours(0, 0, 0, 0);
  // let isoDate = dt.toISOString();
  const slots = req.body.slots;

  db.doc(`/stores/${req.body.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
      return slots.forEach(slot => db.collection("slots").add(slot));
    })
    .then(() => {
      return res.json(slots);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    });
};

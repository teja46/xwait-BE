const { db } = require("../util/admin");

exports.viewSlots = (req, res) => {
  db.collection("slots")
    .where("storeId", "==", req.params.storeId)
    .where("slotDate", "==", req.params.slotDate)
    .get()
    .then(data => {
      let slots = [];
      data.forEach(doc => {
        slots.push({
          id: doc.id,
          slotDate: doc.data().slotDate,
          slotTime: doc.data().slotTime,
          totalSlots: doc.data().totalSlots,
          remainingSlots: doc.data().remainingSlots
        });
      });
      return res.json(slots);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

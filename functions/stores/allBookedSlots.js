const { db } = require("../util/admin");

exports.allBookedSlots = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  db.collection("bookSlot")
    .get()
    .then(data => {
      let slots = [];
      data.forEach(doc => {
        slots.push({
          id: doc.id,
          data: doc.data()
        });
      });
      return res.json(slots);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

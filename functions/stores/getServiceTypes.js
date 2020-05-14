const { db } = require("../util/admin");

exports.getServiceTypes = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  let slotData = {};

  db.doc(`/stores/${req.params.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
      slotData.reviews = doc.data().reviews;
      return db
        .collection("serviceTypes")
        .where("storeId", "==", req.params.storeId)
        .get();
    })
    .then(data => {
      serviceTypes = [];
      data.forEach(doc => {
        serviceTypes.push({ serviceId: doc.id, serviceDetails: doc.data() });
      });
      slotData.serviceTypes = serviceTypes;
      return res.json(slotData);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

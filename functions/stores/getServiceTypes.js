const { db } = require("../util/admin");

exports.getServiceTypes = (req, res) => {
  let slotData = {};

  db.doc(`/stores/${req.params.storeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Store not found" });
      }
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
      return res.json(serviceTypes);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

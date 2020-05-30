const { db } = require("../util/admin");

exports.getServiceTypesStore = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  let serviceData = {};

  db.collection("stores")
    .where("storeCode", "==", req.params.storeCode)
    .get()
    .then((data) => {
      if (data.empty) {
        return res.status(404).json({ error: "Store not found" });
      }
      //   serviceData.storeDetails = doc[0].data();
      data.forEach((doc) => {
        serviceData.storeDetails = doc.data();
        serviceData.storeDetails.id = doc.id;
      });
      //   serviceData.storeDetails = data[0];
      return db
        .collection("serviceTypes")
        .where("storeCode", "==", req.params.storeCode)
        .get();
    })
    .then((data) => {
      serviceTypes = [];
      data.forEach((doc) => {
        serviceTypes.push({ serviceId: doc.id, serviceDetails: doc.data() });
      });
      serviceData.serviceTypes = serviceTypes;
      return res.json(serviceData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json({ error: err.code });
    });
};

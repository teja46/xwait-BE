const { db } = require("../util/admin");

exports.addServiceTypes = (req, res) => {
  const serviceTypeData = {
    storeId: req.body.storeId,
    serviceType: req.body.serviceType,
    bookingPrice: req.body.bookingPrice,
    serviceDescription: req.body.serviceDescription
  };

  db.collection("serviceTypes")
    .add(serviceTypeData)
    .then(doc => {
      const resService = serviceTypeData;
      resService.serviceId = doc.id;
      return res.json(resService);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

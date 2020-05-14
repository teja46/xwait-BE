const { db } = require("../util/admin");

exports.getStores = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  db.collection("stores")
    .get()
    .then(data => {
      let stores = [];
      data.forEach(doc => {
        stores.push({
          id: doc.id,
          name: doc.data().name,
          storeAddress: doc.data().storeAddress,
          storeArea: doc.data().storeAream,
          rating: doc.data().rating,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          startPrice: doc.data().startPrice,
          storeDescription: doc.data().description,
          storeImage: doc.data().storeImg
        });
      });
      return res.json(stores);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

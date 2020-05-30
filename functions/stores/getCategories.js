const { db } = require("../util/admin");

exports.getCategories = (req, res) => {
  db.collection("stores")
    .where("type", "==", req.params.type)
    .get()
    .then((data) => {
      let stores = [];
      data.forEach((doc) => {
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
          storeImage: doc.data().storeImage,
        });
      });
      return res.json(stores);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

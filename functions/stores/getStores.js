const { db } = require("../util/admin");

exports.getStores = (req, res) => {
  db.collection("stores")
    .get()
    .then(data => {
      let stores = [];
      data.forEach(doc => {
        stores.push({
          id: doc.id,
          name: doc.data().name,
          storeAddress: doc.data().storeAddress,
          storeArea: doc.data().storeAream
        });
      });
      return res.json(stores);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

const { db } = require("../util/admin");

exports.addStore = (req, res) => {
  const storeData = {
    name: req.body.name,
    storeAddress: req.body.storeAddress,
    storeArea: req.body.storeArea,
    createdAt: new Date().toISOString(),
    type: req.body.type
  };
  db.collection("stores")
    .add(storeData)
    .then(doc => {
      const resStore = storeData;
      resStore.storeId = doc.id;
      return res.json(resStore);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

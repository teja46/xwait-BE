const { db } = require("../util/admin");

exports.updateStoreToken = (req, res) => {
  db.doc(`/stores/${req.body.storeId}`)
    .get()
    .then(data => {
      if (data.exists) {
        db.doc(`/stores/${req.body.storeId}`).update({
          token: req.body.token
        });
        return res.json({ message: "Updated Successfully" });
      } else {
        return res.json({ message: "Store not found!!" });
      }
    })
    .catch(err => {
      return res.status(404).json({ error: err.code });
    });
};

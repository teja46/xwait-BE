const { db } = require("../util/admin");

exports.updateUserToken = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  db.doc(`/users/${req.body.userId}`)
    .get()
    .then(data => {
      if (data.exists) {
        db.doc(`/users/${req.body.userId}`).update({
          token: req.body.token
        });
        return res.json({ message: "Updated Successfully" });
      } else {
        return res.json({ message: "User not found!!" });
      }
    })
    .catch(err => {
      return res.status(404).json({ error: err.code });
    });
};

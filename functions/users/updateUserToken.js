const { db } = require("../util/admin");

exports.updateUserToken = (req, res) => {
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

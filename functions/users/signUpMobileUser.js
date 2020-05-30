const { db } = require("../util/admin");

exports.signUpMobileUser = (req, res) => {
  const postUser = {
    number: req.body.phoneNumber,
    token: req.body.token ? req.body.token : "",
    createdAt: new Date().toISOString(),
  };

  console.log(req.body);
  const docRef = db.doc(`/users/${req.body.uid}`);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(200);
      }
      db.doc(`/users/${req.body.uid}`).set(postUser);
      return res.json({ message: "userCreated" });
    })
    .then(() => {
      return res.json({ message: "userCreated" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const { db } = require("../util/admin");

exports.signupGoogleUser = (req, res) => {
  const postUser = {
    name: req.body.displayName,
    email: req.body.email,
    userId: req.body.userId
  };
  const docRef = db.doc(`/users/${req.body.userId}`);

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(200);
      }
      db.doc(`/users/${req.body.userId}`).set(postUser);
      return res.json({ message: "userCreated" });
    })
    .then(() => {
      return res.json({ message: "userCreated" });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

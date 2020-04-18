const firebase = require("firebase");
const config = require("../configs/firebaseConfig");
const {
  validateSignupData,
  validateLoginData
} = require("../validators/userValidators");
firebase.initializeApp(config);
const { db } = require("../util/admin");

// var provider = new firebase.auth.GoogleAuthProvider();

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    name: req.body.name,
    phone: req.body.phone,
    createdAt: new Date().toISOString()
  };
  let token, userId;
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) {
    return res.status(400).json(errors);
  }
  db.doc(`/users/${newUser.phone}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ phone: "This mobile number is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(IdToken => {
      token = IdToken;
      const userCredentials = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        name: newUser.name,
        phone: newUser.phone
      };
      return db.doc(`/users/${newUser.phone}`).set(userCredentials);
    })
    .then(data => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      }
      console.err(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) {
    return res.status(400).json(errors);
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => res.json({ token }))
    .catch(err => {
      if (err.code === "auth/wrong-password") {
        return res
          .status(500)
          .json({ general: "Wrong credentials please try again" });
      }
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

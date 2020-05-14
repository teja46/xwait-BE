const { db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../configs/firebaseConfig");

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

exports.addStore = (req, res) => {
  const storeData = db
    .collection("stores")
    .where("email", "==", req.body.email)
    .limit(1);
  let storeInfo;
  storeData
    .get()
    .then(data => {
      if (data.empty) {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(req.body.email, req.body.password);
      }
      return res
        .status(400)
        .json({ error: "Store with this email already exists" });
    })
    .then(store => {
      storeInfo = {
        name: req.body.name,
        storeAddress: req.body.address,
        storeArea: req.body.area,
        password: req.body.password,
        email: req.body.email,
        createdAt: new Date().toISOString(),
        type: req.body.type,
        startPrice: req.body.startPrice,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        reviews: 0,
        rating: 0,
        startTime: "8:00 AM",
        endTime: "5:00 PM",
        id: store.user.uid
      };
      return db.doc(`/stores/${store.user.uid}`).set(storeInfo);
    })
    .then(() => {
      return res.status(201).json({ message: storeInfo });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });

  // db.collection("stores")
  //   .add(storeData)
  //   .then(doc => {
  //     const resStore = storeData;
  //     resStore.storeId = doc.id;
  //     return res.json(resStore);
  //   })
};

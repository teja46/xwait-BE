const { db } = require("../util/admin");

exports.submitFeedback = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  const feedbackData = {
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
    storeId: req.body.storeId,
    bookingId: req.body.bookingId,
    rating: req.body.rating,
    photoURL: req.body.photoURL ? req.body.photoURL : "",
    createdAt: new Date().toISOString()
  };
  const storeDocument = db.doc(`/stores/${req.body.storeId}`);
  storeDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        const reviews = doc.data().reviews + 1;
        const rating = (doc.data().rating + req.body.rating) / 2;
        storeDocument.update({ reviews, rating });
        return db.collection("feedback").add(feedbackData);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    })
    .then(doc => {
      const resStore = feedbackData;
      resStore.storeId = doc.id;
      return res.json(resStore);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

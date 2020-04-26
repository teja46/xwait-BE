const { db } = require("../util/admin");

exports.submitFeedback = (req, res) => {
  const feedbackData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    feedback: req.body.feedback,
    storeId: req.body.storeId,
    bookingId: req.body.bookingId,
    createdAt: new Date().toISOString()
  };

  db.collection("feedback")
    .add(feedbackData)
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

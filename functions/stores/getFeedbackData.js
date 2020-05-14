const { db } = require("../util/admin");

exports.getFeedbackData = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  db.collection("feedback")
    .where("storeId", "==", req.params.storeId)
    .get()
    .then(data => {
      let feedbackData = [];
      data.forEach(doc => {
        feedbackData.push({
          id: doc.id,
          name: doc.data().name,
          feedback: doc.data().feedback,
          date: doc.data().createdAt,
          photoURL: doc.data().photoURL
        });
      });
      return res.json(feedbackData);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

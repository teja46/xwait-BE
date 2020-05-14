const { db } = require("../util/admin");

exports.contactUs = (req, res) => {
  const contactData = {
    queryType: req.body.queryType,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userNumber: req.body.userNumber,
    userMessage: req.body.userMessage,
    createdAt: new Date().toISOString()
  };

  db.collection("contactUs")
    .add(contactData)
    .then(() => {
      return res.json({ message: "Sent details successfully" });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

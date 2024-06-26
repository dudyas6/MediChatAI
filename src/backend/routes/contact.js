
const router = require("express").Router();
const ContactReport = require("../models/contact.report.js");


  router.post('/x', async (req, res) => {
    const { name, email,message } = req.body;
    try {
      const existingContact = await ContactReport.findOne({ message });

      if (existingContact) {
        return res.status(400).json({ error: "Message already exists in the database!" });
      }
  
      // Create new report
      const report = new ContactReport({
        name,
        email,
        message
      });
  
      // Save the new user to the database
      await report.save();
      res.json('Successfully registered!');
    } catch (err) {
      res.status(500).json('Error: ' + err.message);
    }
  });
  
  module.exports = router;
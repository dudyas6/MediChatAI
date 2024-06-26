const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false // Set unique to false to allow non-unique names
  },
  email: {
    type: String,
    required: true,
    unique: false // Set unique to false to allow non-unique names
  },
  message: {
    type: String,
    required: true
  }
 
}, { timestamps: false });



const ContactReport = mongoose.model("ContactReports", contactSchema);

module.exports = ContactReport;

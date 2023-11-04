// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  gstNumber: String,
  company: String,
  type: String, // 'b2b' or 'b2c'
  address: String,
});

module.exports = mongoose.model('Client', clientSchema);
